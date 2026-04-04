/**
 * EMPIRE & INFLUENCE — Consequence Engine
 *
 * Processes three types of consequences:
 *   A. Immediate — stat changes, advisor reactions, narrative feedback
 *   B. Delayed   — triggered later in lesson or in future lessons
 *   C. Conditional — gated by prior decisions, thresholds, or alignments
 *
 * Design principle: Every decision should have consequences that
 * extend beyond the immediate moment. Players should feel the weight
 * of choices they made 2-3 decisions ago.
 */

import { applyDeltas, checkThreshold, checkAllThresholds } from './metrics-system.js';
import { applyFactionDeltas, checkFactionGate } from './faction-system.js';

// ─── Consequence Types ──────────────────────────────────────

export const CONSEQUENCE_TYPES = {
  IMMEDIATE: 'immediate',
  DELAYED:   'delayed',
  CONDITIONAL: 'conditional',
};

// ─── Pending Consequences Queue ─────────────────────────────

/**
 * Create a consequence queue for tracking delayed/conditional effects.
 */
export function createConsequenceQueue() {
  return {
    pending: [],    // Delayed consequences waiting to fire
    fired: [],      // Consequences that have already triggered
    suppressed: [], // Consequences that were blocked by conditions
  };
}

// ─── A. Process Immediate Consequences ──────────────────────

/**
 * Process the immediate consequences of a choice.
 * @param {Object} choice - The chosen option from decision data
 * @param {Object} gameState - Current game state
 * @returns {Object} result with metric changes, faction changes, flags, narrative
 */
export function processImmediate(choice, gameState) {
  const result = {
    metricDeltas: {},
    metricApplied: {},
    factionDeltas: {},
    factionApplied: {},
    flagsSet: {},
    narrative: choice.consequenceText || '',
    events: [],
  };

  // Metric effects
  if (choice.effects) {
    const { metrics, applied } = applyDeltas(gameState.metrics, choice.effects);
    result.metricDeltas = choice.effects;
    result.metricApplied = applied;
    gameState.metrics = metrics;
  }

  // Faction effects
  if (choice.factionEffects) {
    const { applied } = applyFactionDeltas(gameState.factions, choice.factionEffects, choice.id);
    result.factionDeltas = choice.factionEffects;
    result.factionApplied = applied;
  }

  // Flags
  if (choice.flags) {
    for (const [key, value] of Object.entries(choice.flags)) {
      gameState.flags[key] = value;
      result.flagsSet[key] = value;
    }
  }

  // Queue delayed consequences
  if (choice.delayedConsequences) {
    for (const dc of choice.delayedConsequences) {
      gameState.consequenceQueue.pending.push({
        ...dc,
        sourceDecision: choice.id,
        queuedAt: Date.now(),
      });
    }
  }

  // Check for triggered events
  if (choice.triggersEvent) {
    result.events.push(choice.triggersEvent);
  }

  return result;
}

// ─── B. Process Delayed Consequences ────────────────────────

/**
 * Check and fire any delayed consequences whose trigger conditions are met.
 * Called at the start of each new screen/decision point.
 *
 * @param {Object} gameState
 * @param {string} currentScreenId - Current screen in the lesson
 * @returns {Array} List of fired consequences
 */
export function processDelayed(gameState, currentScreenId) {
  const fired = [];
  const stillPending = [];

  for (const dc of gameState.consequenceQueue.pending) {
    let shouldFire = false;

    switch (dc.trigger) {
      case 'screen':
        // Fire when we reach a specific screen
        shouldFire = dc.triggerScreenId === currentScreenId;
        break;

      case 'turns_after':
        // Fire N decisions after it was queued
        shouldFire = (gameState.decisionCount - (dc.queuedAtDecision || 0)) >= dc.turnsDelay;
        break;

      case 'meter_threshold':
        // Fire when a meter crosses a threshold
        shouldFire = checkThreshold(gameState.metrics, dc.condition);
        break;

      case 'flag':
        // Fire when a specific flag is set
        shouldFire = !!gameState.flags[dc.conditionFlag];
        break;

      case 'next_lesson':
        // Fire at start of next lesson (cross-lesson hook)
        shouldFire = dc.targetLesson === gameState.currentLessonId;
        break;

      default:
        break;
    }

    if (shouldFire) {
      const result = fireDelayedConsequence(dc, gameState);
      fired.push({ ...dc, result });
      gameState.consequenceQueue.fired.push(dc);
    } else {
      stillPending.push(dc);
    }
  }

  gameState.consequenceQueue.pending = stillPending;
  return fired;
}

/**
 * Fire a single delayed consequence.
 */
function fireDelayedConsequence(dc, gameState) {
  const result = {
    id: dc.id,
    narrative: dc.narrative || '',
    metricApplied: {},
    factionApplied: {},
    flagsSet: {},
  };

  if (dc.effects) {
    const { metrics, applied } = applyDeltas(gameState.metrics, dc.effects);
    result.metricApplied = applied;
    gameState.metrics = metrics;
  }

  if (dc.factionEffects) {
    const { applied } = applyFactionDeltas(gameState.factions, dc.factionEffects, dc.id);
    result.factionApplied = applied;
  }

  if (dc.flags) {
    for (const [key, value] of Object.entries(dc.flags)) {
      gameState.flags[key] = value;
      result.flagsSet[key] = value;
    }
  }

  return result;
}

// ─── C. Process Conditional Consequences ────────────────────

/**
 * Evaluate conditional outcomes for a screen/narrative.
 * Used to select between variant narratives or outcomes based on state.
 *
 * @param {Array} conditionals - Array of { conditions, outcome }
 * @param {Object} gameState
 * @returns {Object|null} The first matching outcome, or null
 */
export function evaluateConditionals(conditionals, gameState) {
  if (!conditionals || conditionals.length === 0) return null;

  for (const conditional of conditionals) {
    if (evaluateConditionSet(conditional.conditions, gameState)) {
      return conditional.outcome;
    }
  }

  // Return default if present
  const defaultConditional = conditionals.find(c => c.isDefault);
  return defaultConditional?.outcome || null;
}

/**
 * Evaluate a set of conditions against game state.
 * All conditions must be true (AND logic).
 */
export function evaluateConditionSet(conditions, gameState) {
  if (!conditions || conditions.length === 0) return true;

  return conditions.every(cond => evaluateCondition(cond, gameState));
}

/**
 * Evaluate a single condition.
 */
export function evaluateCondition(condition, gameState) {
  switch (condition.type) {
    case 'flag':
      return evaluateFlagCondition(condition, gameState.flags);

    case 'meter':
      return checkThreshold(gameState.metrics, {
        meter: condition.meter,
        operator: condition.operator,
        value: condition.value,
      });

    case 'faction':
      return checkFactionGate(gameState.factions, {
        faction: condition.faction,
        operator: condition.operator,
        value: condition.value,
      });

    case 'decision':
      return gameState.decisions.some(d =>
        d.decisionId === condition.decisionId && d.choiceId === condition.choiceId
      );

    case 'advisor_trust':
      const advisor = gameState.advisors[condition.role];
      if (!advisor) return false;
      return compareValues(advisor.trust, condition.operator, condition.value);

    case 'ideology':
      const { ideology } = getDominantIdeologyForCondition(gameState);
      return ideology === condition.value;

    case 'lesson_complete':
      return gameState.completedLessons?.includes(condition.lessonId);

    default:
      console.warn(`[ConsequenceEngine] Unknown condition type: ${condition.type}`);
      return false;
  }
}

// ─── Gate Checking (for decisions) ──────────────────────────

/**
 * Determine which choices in a decision are available based on conditions.
 * @param {Object} decision - Decision node with choices
 * @param {Object} gameState
 * @returns {Array} Choices with `locked` and `lockReason` fields added
 */
export function resolveChoiceAvailability(decision, gameState) {
  return decision.choices.map(choice => {
    const resolved = { ...choice };

    // Check gate conditions
    if (choice.conditions && choice.conditions.length > 0) {
      const met = evaluateConditionSet(choice.conditions, gameState);
      if (!met) {
        resolved.locked = true;
        resolved.lockReason = choice.lockMessage || 'This option is not available based on your prior decisions.';
        return resolved;
      }
    }

    // Check advisor trust gates
    if (choice.requiresAdvisorTrust) {
      const { role, minTrust } = choice.requiresAdvisorTrust;
      const advisor = gameState.advisors[role];
      if (!advisor || advisor.trust < minTrust) {
        resolved.locked = true;
        resolved.lockReason = `Requires higher trust with your ${role} advisor.`;
        return resolved;
      }
    }

    // Check meter gates
    if (choice.requiresMeters) {
      const met = checkAllThresholds(gameState.metrics, choice.requiresMeters);
      if (!met) {
        resolved.locked = true;
        resolved.lockReason = choice.lockMessage || 'Resource levels are insufficient for this option.';
        return resolved;
      }
    }

    resolved.locked = false;
    return resolved;
  });
}

// ─── Helpers ────────────────────────────────────────────────

function compareValues(a, operator, b) {
  switch (operator) {
    case '>=': return a >= b;
    case '<=': return a <= b;
    case '>':  return a > b;
    case '<':  return a < b;
    case '==': return a === b;
    case '!=': return a !== b;
    default:   return false;
  }
}

// Inline to avoid circular dependency with ideology-tracker
function getDominantIdeologyForCondition(gameState) {
  if (!gameState.ideology) return { ideology: 'mixed' };
  const { scores } = gameState.ideology;
  const entries = Object.entries(scores);
  entries.sort((a, b) => b[1] - a[1]);
  const [topKey, topVal] = entries[0];
  const [, secondVal] = entries[1];
  if (topVal - secondVal < 2) return { ideology: 'mixed' };
  return { ideology: topKey };
}
