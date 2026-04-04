/**
 * EMPIRE & INFLUENCE — Resource / Metrics System
 *
 * Tracks 4 core meters + provides threshold gating, delta processing,
 * and cross-lesson persistence.
 *
 * Meters:
 *   influence  — U.S. Influence (global power projection)
 *   stability  — Regional Stability (local order)
 *   economic   — Economic Gain (trade, investment)
 *   support    — Public Support (domestic opinion)
 *
 * Design principles (MDA):
 *   - Meters are the primary FEEDBACK LOOP for decisions
 *   - Every decision should move at least 2 meters in opposing directions
 *   - No decision should universally raise or lower all meters (balance)
 *   - Thresholds gate future options, creating meaningful consequences
 */

// ─── Constants ──────────────────────────────────────────────

export const METER_KEYS = ['influence', 'stability', 'economic', 'support'];

export const METER_LABELS = {
  influence: 'U.S. Influence',
  stability: 'Regional Stability',
  economic:  'Economic Gain',
  support:   'Public Support',
};

const MIN_VALUE = 0;
const MAX_VALUE = 100;
const DEFAULT_VALUE = 50;

// ─── Metrics State ──────────────────────────────────────────

/**
 * Create a fresh metrics state object.
 * @param {Object} [overrides] - Optional initial values
 * @returns {Object} Metrics state
 */
export function createMetricsState(overrides = {}) {
  return {
    influence: overrides.influence ?? DEFAULT_VALUE,
    stability: overrides.stability ?? DEFAULT_VALUE,
    economic:  overrides.economic  ?? DEFAULT_VALUE,
    support:   overrides.support   ?? DEFAULT_VALUE,
  };
}

/**
 * Deep clone a metrics state.
 */
export function cloneMetrics(metrics) {
  return { ...metrics };
}

// ─── Core Operations ────────────────────────────────────────

/**
 * Apply a set of deltas to metrics, clamping to [0, 100].
 * Returns a new metrics object + the actual deltas applied (after clamping).
 *
 * @param {Object} metrics - Current metrics state
 * @param {Object} deltas  - { influence: +10, stability: -5, ... }
 * @returns {{ metrics: Object, applied: Object }}
 */
export function applyDeltas(metrics, deltas) {
  const newMetrics = cloneMetrics(metrics);
  const applied = {};

  for (const key of METER_KEYS) {
    if (deltas[key] != null && deltas[key] !== 0) {
      const oldVal = newMetrics[key];
      const rawNew = oldVal + deltas[key];
      newMetrics[key] = clamp(rawNew, MIN_VALUE, MAX_VALUE);
      applied[key] = newMetrics[key] - oldVal; // actual delta after clamping
    }
  }

  return { metrics: newMetrics, applied };
}

/**
 * Apply weighted deltas — used when advisor influence modifies outcome strength.
 * @param {Object} metrics
 * @param {Object} deltas - base deltas
 * @param {number} weight - multiplier (0.5 = half strength, 1.5 = 50% stronger)
 */
export function applyWeightedDeltas(metrics, deltas, weight = 1.0) {
  const weighted = {};
  for (const key of METER_KEYS) {
    if (deltas[key] != null) {
      weighted[key] = Math.round(deltas[key] * weight);
    }
  }
  return applyDeltas(metrics, weighted);
}

// ─── Threshold & Gating ─────────────────────────────────────

/**
 * Check if a meter meets a threshold condition.
 * @param {Object} metrics
 * @param {Object} condition - { meter: 'influence', operator: '>=', value: 60 }
 * @returns {boolean}
 */
export function checkThreshold(metrics, condition) {
  const val = metrics[condition.meter];
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
 * Check multiple threshold conditions (AND logic).
 * @param {Object} metrics
 * @param {Array<Object>} conditions
 * @returns {boolean}
 */
export function checkAllThresholds(metrics, conditions) {
  if (!conditions || conditions.length === 0) return true;
  return conditions.every(c => checkThreshold(metrics, c));
}

/**
 * Check multiple conditions (OR logic).
 */
export function checkAnyThreshold(metrics, conditions) {
  if (!conditions || conditions.length === 0) return true;
  return conditions.some(c => checkThreshold(metrics, c));
}

// ─── Analysis Helpers ───────────────────────────────────────

/**
 * Get the dominant meter (highest value).
 */
export function getDominantMeter(metrics) {
  let max = -1;
  let dominant = null;
  for (const key of METER_KEYS) {
    if (metrics[key] > max) {
      max = metrics[key];
      dominant = key;
    }
  }
  return { meter: dominant, value: max };
}

/**
 * Get the weakest meter (lowest value).
 */
export function getWeakestMeter(metrics) {
  let min = 101;
  let weakest = null;
  for (const key of METER_KEYS) {
    if (metrics[key] < min) {
      min = metrics[key];
      weakest = key;
    }
  }
  return { meter: weakest, value: min };
}

/**
 * Calculate overall "health" score (average of all meters).
 */
export function getOverallHealth(metrics) {
  const sum = METER_KEYS.reduce((acc, k) => acc + metrics[k], 0);
  return Math.round(sum / METER_KEYS.length);
}

/**
 * Get a snapshot of metrics for logging / state history.
 */
export function createSnapshot(metrics, label = '') {
  return {
    ...cloneMetrics(metrics),
    timestamp: Date.now(),
    label,
  };
}

/**
 * Determine if the player is in a "crisis" state (any meter below threshold).
 */
export function checkCrisisState(metrics, crisisThreshold = 20) {
  for (const key of METER_KEYS) {
    if (metrics[key] <= crisisThreshold) {
      return { crisis: true, meter: key, value: metrics[key] };
    }
  }
  return { crisis: false };
}

// ─── Utility ────────────────────────────────────────────────

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
