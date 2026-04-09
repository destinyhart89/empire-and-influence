/**
 * EMPIRE & INFLUENCE — Faction / Reputation System
 *
 * Tracks how different groups perceive the player.
 * Factions influence narrative tone, gate options, and shape outcomes.
 *
 * Factions:
 *   localPopulations   — People in the affected region
 *   usGovernment       — U.S. federal leadership & Congress
 *   corporations       — American business interests abroad
 *   internationalActors — European powers, international community
 */

// ─── Constants ──────────────────────────────────────────────

export const FACTION_KEYS = ['localPopulations', 'usGovernment', 'corporations', 'internationalActors'];

export const FACTION_LABELS = {
  localPopulations:    'Local Populations',
  usGovernment:        'U.S. Government',
  corporations:        'Corporations',
  internationalActors: 'International Actors',
};

const REPUTATION_MIN = -50;
const REPUTATION_MAX = 50;
const REPUTATION_DEFAULT = 0;

// Reputation level breakpoints
const REPUTATION_LEVELS = {
  hostile:  { min: -50, max: -30 },
  negative: { min: -29, max: -10 },
  neutral:  { min: -9,  max: 9 },
  positive: { min: 10,  max: 29 },
  allied:   { min: 30,  max: 50 },
};

// ─── State Factory ──────────────────────────────────────────

export function createFactionState(overrides = {}) {
  const o = overrides ?? {};  // guard against null (globalState.factions initialises as null)
  const state = {};
  for (const key of FACTION_KEYS) {
    state[key] = {
      reputation: o[key]?.reputation ?? REPUTATION_DEFAULT,
      history: [],  // { decisionId, delta, timestamp }
    };
  }
  return state;
}

export function cloneFactionState(state) {
  const clone = {};
  for (const key of FACTION_KEYS) {
    clone[key] = {
      reputation: state[key].reputation,
      history: [...state[key].history],
    };
  }
  return clone;
}

// ─── Core Operations ────────────────────────────────────────

/**
 * Apply faction reputation changes.
 * @param {Object} factionState
 * @param {Object} deltas - { localPopulations: -10, corporations: +5, ... }
 * @param {string} decisionId - For audit trail
 * @returns {{ factionState: Object, applied: Object }}
 */
export function applyFactionDeltas(factionState, deltas, decisionId = '') {
  const applied = {};

  for (const key of FACTION_KEYS) {
    if (deltas[key] != null && deltas[key] !== 0) {
      const oldVal = factionState[key].reputation;
      factionState[key].reputation = clamp(oldVal + deltas[key], REPUTATION_MIN, REPUTATION_MAX);
      applied[key] = factionState[key].reputation - oldVal;

      factionState[key].history.push({
        decisionId,
        delta: applied[key],
        newValue: factionState[key].reputation,
        timestamp: Date.now(),
      });
    }
  }

  return { factionState, applied };
}

// ─── Reputation Queries ─────────────────────────────────────

export function getReputationLevel(value) {
  if (value >= REPUTATION_LEVELS.allied.min)   return 'allied';
  if (value >= REPUTATION_LEVELS.positive.min) return 'positive';
  if (value >= REPUTATION_LEVELS.neutral.min)  return 'neutral';
  if (value >= REPUTATION_LEVELS.negative.min) return 'negative';
  return 'hostile';
}

export function getFactionSummary(factionState) {
  const summary = {};
  for (const key of FACTION_KEYS) {
    summary[key] = {
      reputation: factionState[key].reputation,
      level: getReputationLevel(factionState[key].reputation),
      label: FACTION_LABELS[key],
    };
  }
  return summary;
}

/**
 * Check if a faction-based gate is met.
 * @param {Object} factionState
 * @param {Object} condition - { faction: 'localPopulations', operator: '>=', value: 10 }
 */
export function checkFactionGate(factionState, condition) {
  const val = factionState[condition.faction]?.reputation;
  if (val == null) return false;

  switch (condition.operator) {
    case '>=': return val >= condition.value;
    case '<=': return val <= condition.value;
    case '>':  return val > condition.value;
    case '<':  return val < condition.value;
    case '==': return val === condition.value;
    default:   return false;
  }
}

/**
 * Get the most allied and most hostile factions.
 */
export function getFactionExtremes(factionState) {
  let bestKey = null, bestVal = -Infinity;
  let worstKey = null, worstVal = Infinity;

  for (const key of FACTION_KEYS) {
    const val = factionState[key].reputation;
    if (val > bestVal) { bestVal = val; bestKey = key; }
    if (val < worstVal) { worstVal = val; worstKey = key; }
  }

  return {
    mostAllied: { faction: bestKey, reputation: bestVal, level: getReputationLevel(bestVal) },
    mostHostile: { faction: worstKey, reputation: worstVal, level: getReputationLevel(worstVal) },
  };
}

// ─── Narrative Helpers ──────────────────────────────────────

/**
 * Select a narrative tone variant based on faction reputation.
 * Used by the lesson engine to pick between narrative versions.
 */
export function getNarrativeTone(factionState, faction) {
  const level = getReputationLevel(factionState[faction]?.reputation ?? 0);
  return level; // Lesson data can key narrative variants on this
}

// ─── Utility ────────────────────────────────────────────────

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
