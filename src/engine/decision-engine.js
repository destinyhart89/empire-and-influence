/**
 * EMPIRE & INFLUENCE — Decision Engine
 *
 * Orchestrates the decision-making process:
 *   1. Resolve available choices (apply gates/locks)
 *   2. Generate advisor recommendations
 *   3. Present options to player
 *   4. Process chosen option through consequence engine
 *   5. Update all systems (metrics, factions, ideology, advisors)
 *   6. Determine next screen
 *
 * Design principles:
 *   - NO dominant strategy — every choice has meaningful tradeoffs
 *   - At least 2 meters should move in opposing directions per choice
 *   - Risk/reward should be visible but not gamified
 */

import { generateRecommendations, processReactions, getAdvisorInfluence, checkAdvisorUnlocks } from './advisor-system.js';
import { processImmediate, resolveChoiceAvailability } from './consequence-engine.js';
import { recordIdeologyChoice } from './ideology-tracker.js';
import { createSnapshot, applyWeightedDeltas } from './metrics-system.js';

// ─── Decision Processing Pipeline ───────────────────────────

/**
 * Prepare a decision for presentation.
 * Resolves locks, generates advisor input, applies influence modifiers.
 *
 * @param {Object} decision - Decision node from lesson data
 * @param {Object} gameState - Current game state
 * @returns {Object} Prepared decision with resolved choices and recommendations
 */
export function prepareDecision(decision, gameState) {
  // 1. Resolve choice availability (lock/unlock based on state)
  let resolvedChoices = resolveChoiceAvailability(decision, gameState);

  // 2. Check advisor-trust unlocks
  const advisorUnlocks = checkAdvisorUnlocks(gameState.advisors, decision);
  for (const choice of resolvedChoices) {
    if (choice.locked && advisorUnlocks.includes(choice.id)) {
      choice.locked = false;
      choice.lockReason = null;
      choice.unlockedByAdvisor = true;
    }
  }

  // 3. Generate advisor recommendations
  const recommendations = generateRecommendations(gameState.advisors, decision, gameState);

  // 4. Apply advisor influence modifiers (risk perception, effect previews)
  const advisorInfluence = getAdvisorInfluence(gameState.advisors);
  resolvedChoices = applyInfluenceModifiers(resolvedChoices, advisorInfluence);

  return {
    id: decision.id,
    title: decision.title,
    prompt: decision.prompt || decision.text,
    context: decision.context || null,
    choices: resolvedChoices,
    recommendations,
    advisorInfluence,
    mapRef: decision.map || null,
    newspaperRef: decision.newspaper || null,
  };
}

/**
 * Apply advisor influence modifiers to choices.
 * Trusted advisors make their preferred paths appear less risky.
 */
function applyInfluenceModifiers(choices, advisorInfluence) {
  return choices.map(choice => {
    const modified = { ...choice };

    if (choice.advisorAlignment && advisorInfluence[choice.advisorAlignment]) {
      const influence = advisorInfluence[choice.advisorAlignment];

      // Risk modifier — trusted advisor reduces perceived risk on their path
      if (modified.riskLevel && influence.riskModifier) {
        const riskLevels = ['low', 'medium', 'high'];
        const currentIdx = riskLevels.indexOf(modified.riskLevel);
        const newIdx = Math.max(0, Math.min(2, currentIdx + influence.riskModifier));
        modified.displayRiskLevel = riskLevels[newIdx];
      }

      // Hint — trusted advisor reveals hidden info
      if (influence.hintsAvailable && choice.hiddenHint) {
        modified.revealedHint = choice.hiddenHint;
      }

      // Unreliable advisor — mark their recommendation as uncertain
      if (influence.unreliable) {
        modified.advisorReliabilityWarning = true;
      }
    }

    return modified;
  });
}

// ─── Execute Decision ───────────────────────────────────────

/**
 * Execute a player's decision choice.
 * This is the CORE game loop step.
 *
 * @param {string} choiceId - ID of the chosen option
 * @param {Object} decision - The decision node
 * @param {Object} recommendations - Advisor recommendations (from prepareDecision)
 * @param {Object} gameState - Current game state (MUTATED)
 * @returns {Object} Full result package for UI rendering
 */
export function executeDecision(choiceId, decision, recommendations, gameState) {
  const choice = decision.choices.find(c => c.id === choiceId);
  if (!choice) {
    throw new Error(`[DecisionEngine] Choice "${choiceId}" not found in decision "${decision.id}"`);
  }

  if (choice.locked) {
    throw new Error(`[DecisionEngine] Choice "${choiceId}" is locked`);
  }

  // Snapshot metrics before
  const metricsBefore = createSnapshot(gameState.metrics, `before_${decision.id}`);

  // 1. Process immediate consequences (metrics, factions, flags)
  const immediateResult = processImmediate(choice, gameState);

  // 2. Process advisor reactions (trust changes)
  const reactions = processReactions(gameState.advisors, choiceId, decision, recommendations);

  // 3. Apply advisor trust-based effect multiplier
  if (choice.advisorAlignment && immediateResult.metricApplied) {
    const influence = getAdvisorInfluence(gameState.advisors);
    const multiplier = influence[choice.advisorAlignment]?.effectMultiplier || 1.0;
    if (multiplier !== 1.0) {
      // Re-apply the metrics with the trust multiplier from the pre-consequence state
      const { metrics: adjusted, applied: adjustedDeltas } = applyWeightedDeltas(
        metricsBefore, immediateResult.metricApplied, multiplier
      );
      // Update game state metrics to reflect the trust-weighted result
      Object.assign(gameState.metrics, adjusted);
      immediateResult.metricApplied = adjustedDeltas;
    }
  }

  // 4. Update ideology tracker
  recordIdeologyChoice(gameState.ideology, choice.advisorAlignment || 'mixed', decision.id, choice.ideologyWeight || 1);

  // 5. Record decision in history
  const decisionRecord = {
    decisionId: decision.id,
    choiceId,
    choiceLabel: choice.label,
    advisorAlignment: choice.advisorAlignment,
    metricsBefore: metricsBefore,
    metricsAfter: createSnapshot(gameState.metrics, `after_${decision.id}`),
    timestamp: Date.now(),
  };
  gameState.decisions.push(decisionRecord);
  gameState.decisionCount += 1;

  // 6. Snapshot for UI
  const metricsAfter = createSnapshot(gameState.metrics, `after_${decision.id}`);

  // 7. Determine next screen
  const nextScreen = resolveNextScreen(choice, gameState);

  // 8. Auto-save
  gameState.lastSaveTimestamp = Date.now();

  return {
    choiceId,
    choiceLabel: choice.label,
    advisorAlignment: choice.advisorAlignment,

    // Immediate effects for UI
    metricDeltas: immediateResult.metricApplied,
    factionDeltas: immediateResult.factionApplied,
    flagsSet: immediateResult.flagsSet,
    narrative: immediateResult.narrative,

    // Advisor reactions for UI
    reactions,

    // Events triggered
    events: immediateResult.events,

    // Navigation
    nextScreen,

    // State snapshots
    metricsBefore,
    metricsAfter,
  };
}

// ─── Next Screen Resolution ─────────────────────────────────

/**
 * Determine the next screen after a decision.
 * Supports: static next, conditional branching, fallback.
 */
function resolveNextScreen(choice, gameState) {
  // 1. Check conditional next screens
  if (choice.conditionalNext && choice.conditionalNext.length > 0) {
    for (const cn of choice.conditionalNext) {
      if (evaluateSimpleConditions(cn.conditions, gameState)) {
        return cn.screenId;
      }
    }
  }

  // 2. Static next screen
  if (choice.next) {
    return choice.next;
  }

  // 3. Fallback — shouldn't happen in well-authored lessons
  console.warn(`[DecisionEngine] No next screen defined for choice "${choice.id}"`);
  return null;
}

/**
 * Simplified condition evaluator for next-screen branching.
 */
function evaluateSimpleConditions(conditions, gameState) {
  if (!conditions || conditions.length === 0) return true;

  return conditions.every(cond => {
    switch (cond.type) {
      case 'flag':
        return !!gameState.flags[cond.key] === cond.value;
      case 'meter':
        const mVal = gameState.metrics[cond.meter];
        return compareOp(mVal, cond.operator, cond.value);
      default:
        return false;
    }
  });
}

function compareOp(a, op, b) {
  switch (op) {
    case '>=': return a >= b;
    case '<=': return a <= b;
    case '>':  return a > b;
    case '<':  return a < b;
    case '==': return a === b;
    default:   return false;
  }
}
