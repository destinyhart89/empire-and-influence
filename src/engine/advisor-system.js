/**
 * EMPIRE & INFLUENCE — Advisor System
 *
 * The CORE feature of the game. Three advisors (Economic, Security, Diplomatic)
 * provide competing perspectives on every decision.
 *
 * Sub-systems:
 *   A. Advisor Profiles       — identity, bias, priority weights
 *   B. Advisor Input Engine    — generates recommendations per decision
 *   C. Advisor Reaction System — reacts to choices, adjusts trust
 *   D. Advisor Influence System — trust gates unlocks, modifies framing
 *
 * Design principles:
 *   - Advisors are NOT neutral. Each has a clear ideological bias.
 *   - Following one advisor consistently should feel strategic AND costly.
 *   - The player should feel tension between advisors on every decision.
 *   - High trust unlocks deeper insights; low trust means colder responses.
 */

// ─── Advisor Role Constants ─────────────────────────────────

export const ADVISOR_ROLES = ['economic', 'security', 'diplomatic'];

export const ROLE_LABELS = {
  economic:   'Economic Advisor',
  security:   'Security Advisor',
  diplomatic: 'Diplomatic Advisor',
};

// ─── Shared Content (loaded at boot from shared.json) ────────
// Allows role labels and fallback strings to be updated via JSON
// without touching JS. If shared.json never loads, the hardcoded
// values above and below remain active — no user-facing impact.

let _shared = null;

/**
 * Called once at app boot with the result of loadShared().
 * Accepts null gracefully (shared.json failed to load).
 * @param {Object|null} shared
 */
export function setSharedContent(shared) {
  if (!shared) return;
  _shared = shared;
  // Mutate ROLE_LABELS in-place so all existing imports stay valid
  if (shared.roleLabels) {
    for (const [role, label] of Object.entries(shared.roleLabels)) {
      if (Object.prototype.hasOwnProperty.call(ROLE_LABELS, role)) {
        ROLE_LABELS[role] = label;
      }
    }
  }
}

// ─── Trust / Affinity Thresholds ────────────────────────────

const TRUST_MIN = -10;
const TRUST_MAX = 10;
const TRUST_DEFAULT = 0;

// Trust level breakpoints
const TRUST_LEVELS = {
  hostile:   { min: -10, max: -6 },
  cold:      { min: -5,  max: -2 },
  neutral:   { min: -1,  max: 1 },
  warm:      { min: 2,   max: 5 },
  trusted:   { min: 6,   max: 10 },
};

// ─── Advisor State Factory ──────────────────────────────────

/**
 * Create initial advisor state for a lesson.
 * @param {Object} lessonAdvisors - Advisor definitions from lesson data
 * @returns {Object} advisorState keyed by role
 */
export function createAdvisorState(lessonAdvisors = {}) {
  const state = {};

  for (const role of ADVISOR_ROLES) {
    const def = lessonAdvisors[role] || {};
    state[role] = {
      // Identity
      role,
      name: def.name || ROLE_LABELS[role],
      title: def.title || '',
      portrait: def.portrait || null,

      // Bias & weights — how strongly this advisor values each metric
      // Range: 0.0 (doesn't care) to 2.0 (deeply cares)
      metricWeights: def.metricWeights || getDefaultWeights(role),

      // Ideological bias — what this advisor always pushes toward
      bias: def.bias || getDefaultBias(role),

      // Trust / affinity — starts neutral, shifts with decisions
      trust: def.initialTrust ?? TRUST_DEFAULT,

      // Dialogue pool — keyed by context
      quotes: def.quotes || {},

      // Special rules (e.g., CIA operative has persistence)
      specialRules: def.specialRules || null,

      // Reaction history this lesson
      reactions: [],
    };
  }

  return state;
}

/**
 * Default metric weights per role.
 * Each role cares most about "their" metrics.
 */
function getDefaultWeights(role) {
  switch (role) {
    case 'economic':
      return { influence: 0.8, stability: 0.4, economic: 1.8, support: 0.6 };
    case 'security':
      return { influence: 1.6, stability: 1.2, economic: 0.4, support: 0.8 };
    case 'diplomatic':
      return { influence: 0.6, stability: 1.6, economic: 0.4, support: 1.4 };
    default:
      return { influence: 1, stability: 1, economic: 1, support: 1 };
  }
}

/**
 * Default ideological bias per role.
 * Describes what this advisor pushes toward.
 */
function getDefaultBias(role) {
  switch (role) {
    case 'economic':
      return { primary: 'profit', secondary: 'expansion', aversion: 'regulation' };
    case 'security':
      return { primary: 'control', secondary: 'dominance', aversion: 'withdrawal' };
    case 'diplomatic':
      return { primary: 'cooperation', secondary: 'stability', aversion: 'unilateral_force' };
    default:
      return { primary: 'balance' };
  }
}

// ─── B. Advisor Input Engine ────────────────────────────────

/**
 * Generate advisor recommendations for a decision.
 * Each advisor evaluates the options and provides a recommendation + dialogue.
 *
 * @param {Object} advisorState - Current advisor states (keyed by role)
 * @param {Object} decision     - Decision node from lesson data
 * @param {Object} gameState    - Current game state (metrics, flags, etc.)
 * @returns {Object} recommendations keyed by role
 */
export function generateRecommendations(advisorState, decision, gameState) {
  const recommendations = {};

  for (const role of ADVISOR_ROLES) {
    const advisor = advisorState[role];
    if (!advisor) continue;

    const preferred = evaluatePreferredOption(advisor, decision.choices, gameState);
    const trustLevel = getTrustLevel(advisor.trust);

    // Select dialogue based on trust level and decision context
    const dialogue = selectDialogue(advisor, decision, preferred, trustLevel, gameState);

    recommendations[role] = {
      role,
      name: advisor.name,
      preferredChoice: preferred.choiceId,
      confidence: preferred.score,
      reaction: preferred.stance,  // 'strongly_favor' | 'favor' | 'neutral' | 'oppose' | 'strongly_oppose'
      dialogue,
      trustLevel,
      portrait: advisor.portrait,
    };
  }

  return recommendations;
}

/**
 * Evaluate which option an advisor prefers based on their metric weights.
 * This is the core "AI" of the advisor system.
 */
function evaluatePreferredOption(advisor, choices, gameState) {
  let bestScore = -Infinity;
  let bestChoice = null;

  for (const choice of choices) {
    if (choice.locked) continue;

    let score = 0;
    const effects = choice.effects || {};

    // Score based on metric weights — advisor favors options that boost metrics they care about
    for (const [metric, weight] of Object.entries(advisor.metricWeights)) {
      const delta = effects[metric] || 0;
      score += delta * weight;
    }

    // Bias bonus — if this choice aligns with advisor's ideology
    if (choice.advisorAlignment === advisor.role) {
      score += 3; // alignment bonus
    }

    // Penalty for opposing advisor's aversion
    if (choice.tags && choice.tags.includes(advisor.bias.aversion)) {
      score -= 5;
    }

    // Trust modifier — high-trust advisor's preferences are more decisive
    score *= (1 + advisor.trust * 0.05);

    if (score > bestScore) {
      bestScore = score;
      bestChoice = choice.id;
    }
  }

  // Determine stance strength
  let stance;
  if (bestScore > 8) stance = 'strongly_favor';
  else if (bestScore > 3) stance = 'favor';
  else if (bestScore > -3) stance = 'neutral';
  else if (bestScore > -8) stance = 'oppose';
  else stance = 'strongly_oppose';

  return { choiceId: bestChoice, score: bestScore, stance };
}

/**
 * Select appropriate dialogue text for the advisor.
 * Uses context from the decision node and trust level.
 */
function selectDialogue(advisor, decision, preference, trustLevel, gameState) {
  const decisionId = decision.id;
  const quotes = advisor.quotes;

  // Priority: specific dialogue for this decision > trust-based > generic
  if (quotes[decisionId]) {
    // Decision-specific dialogue (authored in lesson data)
    const pool = quotes[decisionId];
    if (typeof pool === 'string') return pool;
    if (Array.isArray(pool)) return pool[Math.floor(Math.random() * pool.length)];
    // If keyed by trust level
    if (pool[trustLevel]) return pool[trustLevel];
    return pool.default || '';
  }

  // Trust-based generic dialogue
  if (quotes[trustLevel]) {
    const pool = quotes[trustLevel];
    if (typeof pool === 'string') return pool;
    if (Array.isArray(pool)) return pool[Math.floor(Math.random() * pool.length)];
  }

  // Stance-based fallback
  if (quotes[preference.stance]) {
    return quotes[preference.stance];
  }

  // Generic fallback
  return quotes.default ||
    _shared?.advisorFallbacks?.defaultRecommendation ||
    'I recommend considering this carefully.';
}

// ─── C. Advisor Reaction System ─────────────────────────────

/**
 * Process advisor reactions to a player's decision.
 * Updates trust, records reaction, returns reaction data.
 *
 * @param {Object} advisorState - Mutable advisor state
 * @param {string} chosenOptionId - The choice the player made
 * @param {Object} decision - The decision node
 * @param {Object} recommendations - What advisors recommended
 * @returns {Object} reactions keyed by role
 */
export function processReactions(advisorState, chosenOptionId, decision, recommendations) {
  const reactions = {};
  const chosenOption = decision.choices.find(c => c.id === chosenOptionId);
  if (!chosenOption) return reactions;

  for (const role of ADVISOR_ROLES) {
    const advisor = advisorState[role];
    const rec = recommendations[role];
    if (!advisor || !rec) continue;

    const aligned = rec.preferredChoice === chosenOptionId;
    const directAlignment = chosenOption.advisorAlignment === role;

    // Calculate trust delta
    let trustDelta = 0;
    if (directAlignment) {
      trustDelta = 2;  // Chose their aligned path
    } else if (aligned) {
      trustDelta = 1;  // Chose what they recommended
    } else if (rec.reaction === 'strongly_oppose') {
      trustDelta = -2; // Directly opposed their strong recommendation
    } else {
      trustDelta = -1; // Chose something else
    }

    // Apply special reaction modifiers from lesson data
    if (chosenOption.advisorReactions && chosenOption.advisorReactions[role]) {
      trustDelta = chosenOption.advisorReactions[role].trustDelta ?? trustDelta;
    }

    // Update trust
    advisor.trust = clamp(advisor.trust + trustDelta, TRUST_MIN, TRUST_MAX);

    // Determine reaction type
    let reactionType;
    if (trustDelta >= 2) reactionType = 'approve';
    else if (trustDelta > 0) reactionType = 'approve';
    else if (trustDelta === 0) reactionType = 'neutral';
    else reactionType = 'disapprove';

    // Get reaction dialogue
    const reactionDialogue = getReactionDialogue(advisor, chosenOption, reactionType);

    // Record in history
    const reactionRecord = {
      decisionId: decision.id,
      choiceId: chosenOptionId,
      reactionType,
      trustDelta,
      newTrust: advisor.trust,
      dialogue: reactionDialogue,
      timestamp: Date.now(),
    };

    advisor.reactions.push(reactionRecord);

    reactions[role] = {
      role,
      name: advisor.name,
      portrait: advisor.portrait,
      reactionType,
      trustDelta,
      trustLevel: getTrustLevel(advisor.trust),
      dialogue: reactionDialogue,
    };
  }

  return reactions;
}

/**
 * Get reaction dialogue for an advisor.
 */
function getReactionDialogue(advisor, chosenOption, reactionType) {
  // Check for specific reaction dialogue in the choice data
  if (chosenOption.advisorReactions &&
      chosenOption.advisorReactions[advisor.role] &&
      chosenOption.advisorReactions[advisor.role].dialogue) {
    return chosenOption.advisorReactions[advisor.role].dialogue;
  }

  // Check advisor's quote pool for reaction-type dialogue
  if (advisor.quotes[`reaction_${reactionType}`]) {
    const pool = advisor.quotes[`reaction_${reactionType}`];
    if (typeof pool === 'string') return pool;
    if (Array.isArray(pool)) return pool[Math.floor(Math.random() * pool.length)];
  }

  // Fallback — use shared.json strings if loaded, otherwise use hardcoded defaults
  const fallbacks = {
    approve:    _shared?.advisorFallbacks?.reactionApprove    || 'A wise decision. This aligns with our priorities.',
    disapprove: _shared?.advisorFallbacks?.reactionDisapprove || 'I must register my disagreement with this course of action.',
    neutral:    _shared?.advisorFallbacks?.reactionNeutral    || 'Noted. We will see how this plays out.',
  };
  return fallbacks[reactionType] || fallbacks.neutral;
}

// ─── D. Advisor Influence System ────────────────────────────

/**
 * Get available influence effects based on trust levels.
 * High-trust advisors provide bonuses; low-trust ones may withhold info.
 *
 * @param {Object} advisorState
 * @returns {Object} influence effects per role
 */
export function getAdvisorInfluence(advisorState) {
  const influence = {};

  for (const role of ADVISOR_ROLES) {
    const advisor = advisorState[role];
    if (!advisor) continue;

    const level = getTrustLevel(advisor.trust);

    influence[role] = {
      role,
      trustLevel: level,
      trust: advisor.trust,

      // Unlocks at trusted level
      hintsAvailable: level === 'trusted',

      // At warm+, advisor provides additional context
      extendedDialogue: level === 'warm' || level === 'trusted',

      // At cold or hostile, advisor may withhold information
      withholdInfo: level === 'cold' || level === 'hostile',

      // Hostile advisors may actively mislead (shown as unreliable)
      unreliable: level === 'hostile',

      // Influence on perceived risk — trusted advisors make their path seem safer
      riskModifier: getRiskModifier(level),

      // Influence on meter effects — trusted advisor's path gets a bonus
      effectMultiplier: getEffectMultiplier(level),
    };
  }

  return influence;
}

/**
 * Check if a trusted advisor unlocks a hidden option.
 * @param {Object} advisorState
 * @param {Object} decision - Decision node with possible gated options
 * @returns {Array} List of option IDs that should be unlocked
 */
export function checkAdvisorUnlocks(advisorState, decision) {
  const unlocked = [];

  for (const choice of decision.choices) {
    if (!choice.requiresAdvisorTrust) continue;

    const { role, minTrust } = choice.requiresAdvisorTrust;
    const advisor = advisorState[role];

    if (advisor && advisor.trust >= minTrust) {
      unlocked.push(choice.id);
    }
  }

  return unlocked;
}

// ─── Trust Utilities ────────────────────────────────────────

/**
 * Get the trust level label for a numeric trust value.
 */
export function getTrustLevel(trustValue) {
  if (trustValue >= TRUST_LEVELS.trusted.min) return 'trusted';
  if (trustValue >= TRUST_LEVELS.warm.min)    return 'warm';
  if (trustValue >= TRUST_LEVELS.neutral.min) return 'neutral';
  if (trustValue >= TRUST_LEVELS.cold.min)    return 'cold';
  return 'hostile';
}

/**
 * Get cumulative advisor affinities (for cross-lesson tracking).
 */
export function getAffinitySummary(advisorState) {
  const summary = {};
  for (const role of ADVISOR_ROLES) {
    if (advisorState[role]) {
      summary[role] = advisorState[role].trust;
    }
  }
  return summary;
}

/**
 * Apply cross-lesson trust carry-over.
 * Previous lesson trust carries at 50% to new lesson.
 */
export function applyTrustCarryOver(advisorState, previousAffinities) {
  if (!previousAffinities) return;

  for (const role of ADVISOR_ROLES) {
    if (advisorState[role] && previousAffinities[role] != null) {
      const carryOver = Math.round(previousAffinities[role] * 0.5);
      advisorState[role].trust = clamp(
        advisorState[role].trust + carryOver,
        TRUST_MIN,
        TRUST_MAX
      );
    }
  }
}

// ─── Internal Helpers ───────────────────────────────────────

function getRiskModifier(trustLevel) {
  switch (trustLevel) {
    case 'trusted':  return -1;  // Makes aligned options feel less risky
    case 'warm':     return 0;
    case 'neutral':  return 0;
    case 'cold':     return 0;
    case 'hostile':  return 1;   // Makes aligned options feel riskier (unreliable)
    default:         return 0;
  }
}

function getEffectMultiplier(trustLevel) {
  switch (trustLevel) {
    case 'trusted':  return 1.15; // 15% bonus on aligned path effects
    case 'warm':     return 1.05;
    case 'neutral':  return 1.0;
    case 'cold':     return 0.95;
    case 'hostile':  return 0.85; // 15% penalty on aligned path effects
    default:         return 1.0;
  }
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
