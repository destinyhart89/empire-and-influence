/**
 * EMPIRE & INFLUENCE — Player Ideology Tracker
 *
 * Tracks cumulative player tendencies across all decisions.
 * Categories: interventionist, diplomatic, economic_pragmatist, mixed
 *
 * The ideology system:
 *   - Updates based on decision advisor-alignment tags
 *   - Influences advisor tone (advisors respond to your patterns)
 *   - Affects future scenario framing
 *   - Feeds into the outcome narrative
 */

// ─── Ideology Axes ──────────────────────────────────────────

export const IDEOLOGY_AXES = {
  interventionist:     { label: 'Interventionist',     alignsWith: 'security' },
  diplomatic:          { label: 'Diplomatic',           alignsWith: 'diplomatic' },
  economic_pragmatist: { label: 'Economic Pragmatist',  alignsWith: 'economic' },
};

// ─── State Factory ──────────────────────────────────────────

export function createIdeologyState() {
  return {
    // Raw scores — increment each time a decision aligns
    scores: {
      interventionist: 0,
      diplomatic: 0,
      economic_pragmatist: 0,
    },
    // Total decisions tracked
    totalDecisions: 0,
    // History of ideology shifts
    history: [],
  };
}

// ─── Core Operations ────────────────────────────────────────

/**
 * Record a decision's ideology impact.
 * @param {Object} ideologyState
 * @param {string} advisorAlignment - 'economic' | 'security' | 'diplomatic'
 * @param {string} decisionId
 * @param {number} weight - Optional weight (default 1, major decisions can be 2)
 */
export function recordIdeologyChoice(ideologyState, advisorAlignment, decisionId, weight = 1) {
  ideologyState.totalDecisions += 1;

  // Map advisor alignment to ideology axis
  switch (advisorAlignment) {
    case 'security':
      ideologyState.scores.interventionist += weight;
      break;
    case 'diplomatic':
      ideologyState.scores.diplomatic += weight;
      break;
    case 'economic':
      ideologyState.scores.economic_pragmatist += weight;
      break;
    default:
      // Mixed or unaligned decision — small bump to all
      ideologyState.scores.interventionist += 0.25;
      ideologyState.scores.diplomatic += 0.25;
      ideologyState.scores.economic_pragmatist += 0.25;
      break;
  }

  ideologyState.history.push({
    decisionId,
    alignment: advisorAlignment,
    weight,
    timestamp: Date.now(),
  });

  return ideologyState;
}

// ─── Analysis ───────────────────────────────────────────────

/**
 * Get the player's dominant ideology.
 * Returns 'mixed' if no clear leader.
 */
export function getDominantIdeology(ideologyState) {
  const { scores, totalDecisions } = ideologyState;

  if (totalDecisions === 0) return { ideology: 'mixed', confidence: 0 };

  const entries = Object.entries(scores);
  entries.sort((a, b) => b[1] - a[1]);

  const [topKey, topVal] = entries[0];
  const [, secondVal] = entries[1];

  // Need at least 30% lead over second place to not be "mixed"
  const gap = topVal - secondVal;
  const threshold = totalDecisions * 0.3;

  if (gap < threshold || topVal < 2) {
    return { ideology: 'mixed', confidence: 0, scores };
  }

  const confidence = Math.min(1, gap / totalDecisions);

  return {
    ideology: topKey,
    label: IDEOLOGY_AXES[topKey]?.label || topKey,
    confidence: Math.round(confidence * 100) / 100,
    scores,
  };
}

/**
 * Get ideology percentages for display.
 */
export function getIdeologyBreakdown(ideologyState) {
  const { scores, totalDecisions } = ideologyState;

  if (totalDecisions === 0) {
    return {
      interventionist: 33,
      diplomatic: 33,
      economic_pragmatist: 34,
    };
  }

  const total = scores.interventionist + scores.diplomatic + scores.economic_pragmatist;
  if (total === 0) {
    return { interventionist: 33, diplomatic: 33, economic_pragmatist: 34 };
  }

  return {
    interventionist: Math.round((scores.interventionist / total) * 100),
    diplomatic: Math.round((scores.diplomatic / total) * 100),
    economic_pragmatist: Math.round((scores.economic_pragmatist / total) * 100),
  };
}

/**
 * Get the ideology modifier for advisor tone.
 * Advisors who match the player's ideology are warmer.
 */
export function getIdeologyAdvisorModifier(ideologyState, advisorRole) {
  const dominant = getDominantIdeology(ideologyState);
  const alignment = IDEOLOGY_AXES[dominant.ideology]?.alignsWith;

  if (alignment === advisorRole) {
    return { toneShift: 'warm', trustBonus: 1 };
  }

  // If player is consistently ignoring this advisor type
  const { scores } = ideologyState;
  const roleScore = advisorRole === 'security' ? scores.interventionist
    : advisorRole === 'diplomatic' ? scores.diplomatic
    : scores.economic_pragmatist;

  if (ideologyState.totalDecisions > 3 && roleScore === 0) {
    return { toneShift: 'cold', trustBonus: -1 };
  }

  return { toneShift: 'neutral', trustBonus: 0 };
}
