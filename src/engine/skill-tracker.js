/**
 * EMPIRE & INFLUENCE — APUSH Skill Tagging & Tracking System
 *
 * Tracks student performance across 8 AP Historical Thinking Skills
 * plus content knowledge and imperialism-specific themes.
 *
 * Every question, knowledge check, and reflection is tagged with one
 * or more skills. The tracker accumulates performance data per skill,
 * enabling adaptive scaffolding and teacher reporting.
 *
 * Based on the College Board's AP U.S. History Course & Exam Description.
 */

// ═══════════════════════════════════════════════════════════
// APUSH SKILL DEFINITIONS
// ═══════════════════════════════════════════════════════════

export const APUSH_SKILLS = {
  CAUSATION:            'causation',
  CONTINUITY_CHANGE:    'continuity_change',
  COMPARISON:           'comparison',
  CONTEXTUALIZATION:    'contextualization',
  ARGUMENTATION:        'argumentation',
  USE_OF_EVIDENCE:      'use_of_evidence',
  CONTENT_KNOWLEDGE:    'content_knowledge',
  IMPERIALISM_THEMES:   'imperialism_themes',
};

export const SKILL_LABELS = {
  causation:            'Causation',
  continuity_change:    'Continuity & Change Over Time',
  comparison:           'Comparison',
  contextualization:    'Contextualization',
  argumentation:        'Argumentation',
  use_of_evidence:      'Use of Evidence',
  content_knowledge:    'Content Knowledge',
  imperialism_themes:   'Imperialism Themes',
};

/**
 * Detailed descriptors for each skill — used in scaffolding hints
 * and student feedback.
 */
export const SKILL_DESCRIPTORS = {
  causation: {
    label: 'Causation',
    description: 'Identify and explain the causes and effects of historical events.',
    verbs: ['caused', 'led to', 'resulted in', 'because', 'therefore'],
    commonErrors: [
      'Confusing correlation with causation',
      'Oversimplifying multi-causal events to a single cause',
      'Ignoring unintended consequences',
    ],
    scaffoldHint: 'Think about BOTH the immediate triggers and the long-term conditions that made this event possible.',
  },
  continuity_change: {
    label: 'Continuity & Change Over Time',
    description: 'Analyze what stayed the same and what changed across historical periods.',
    verbs: ['continued', 'shifted', 'evolved', 'persisted', 'transformed'],
    commonErrors: [
      'Assuming everything changed at once',
      'Missing continuities in power structures',
      'Treating historical periods as completely separate',
    ],
    scaffoldHint: 'Look for what STAYED THE SAME even as other things changed. Continuities are often as important as changes.',
  },
  comparison: {
    label: 'Comparison',
    description: 'Compare and contrast historical events, policies, or perspectives.',
    verbs: ['similar to', 'different from', 'both', 'whereas', 'unlike'],
    commonErrors: [
      'Making surface-level comparisons only',
      'Comparing without considering context',
      'Missing that similar outcomes can have different causes',
    ],
    scaffoldHint: 'When comparing, look at BOTH similarities AND differences. Consider WHY they are similar or different.',
  },
  contextualization: {
    label: 'Contextualization',
    description: 'Place events within their broader historical context.',
    verbs: ['at the time', 'during this era', 'in the context of', 'given that'],
    commonErrors: [
      'Applying modern values to historical actors (presentism)',
      'Ignoring global context',
      'Not connecting local events to broader trends',
    ],
    scaffoldHint: 'Think about what ELSE was happening at this time — in the U.S., in the region, and in the world.',
  },
  argumentation: {
    label: 'Argumentation',
    description: 'Construct and evaluate historical arguments with evidence.',
    verbs: ['argues', 'claims', 'supports', 'counters', 'evidence suggests'],
    commonErrors: [
      'Stating opinions without evidence',
      'Ignoring counter-arguments',
      'Confusing description with analysis',
    ],
    scaffoldHint: 'A strong argument needs a CLAIM, EVIDENCE to support it, and consideration of COUNTER-ARGUMENTS.',
  },
  use_of_evidence: {
    label: 'Use of Evidence',
    description: 'Interpret primary and secondary sources as evidence.',
    verbs: ['according to', 'the source shows', 'this document reveals', 'evidence indicates'],
    commonErrors: [
      'Taking sources at face value without considering bias',
      'Using evidence selectively to support a predetermined conclusion',
      'Not identifying the source\'s purpose or audience',
    ],
    scaffoldHint: 'Always ask: WHO created this source? WHY? For WHAT audience? What might they have left out?',
  },
  content_knowledge: {
    label: 'Content Knowledge',
    description: 'Demonstrate factual knowledge of U.S. imperialism in Latin America.',
    verbs: [],
    commonErrors: [
      'Confusing chronological order of events',
      'Mixing up key figures and their roles',
      'Incorrect geographic knowledge',
    ],
    scaffoldHint: 'Review the key dates, people, and places for this period.',
  },
  imperialism_themes: {
    label: 'Imperialism Themes',
    description: 'Recognize and analyze recurring patterns of U.S. imperialism.',
    verbs: ['empire', 'intervention', 'sovereignty', 'sphere of influence', 'regime change'],
    commonErrors: [
      'Viewing U.S. actions as purely benevolent or purely malicious',
      'Ignoring local agency and resistance',
      'Not recognizing economic motivations behind political actions',
    ],
    scaffoldHint: 'Look for patterns: economic interests, strategic control, ideological justification. How do these repeat across different interventions?',
  },
};

// ═══════════════════════════════════════════════════════════
// DIFFICULTY LEVELS
// ═══════════════════════════════════════════════════════════

export const DIFFICULTY = {
  FOUNDATIONAL: 1,   // Recall, basic comprehension
  DEVELOPING:   2,   // Application, simple analysis
  PROFICIENT:   3,   // Analysis, evaluation
  ADVANCED:     4,   // Synthesis, complex reasoning
};

export const DIFFICULTY_LABELS = {
  1: 'Foundational',
  2: 'Developing',
  3: 'Proficient',
  4: 'Advanced',
};

// ═══════════════════════════════════════════════════════════
// SKILL TRACKER STATE
// ═══════════════════════════════════════════════════════════

/**
 * Create a fresh skill tracker state.
 * Tracks per-skill performance across the entire session.
 */
export function createSkillTrackerState() {
  const skills = {};

  for (const key of Object.values(APUSH_SKILLS)) {
    skills[key] = {
      attempts: 0,
      correct: 0,
      totalScore: 0,        // Sum of weighted scores (difficulty * correct)
      maxPossible: 0,       // Sum of max possible weighted scores
      recentResults: [],     // Last 5 results for trend detection
      byDifficulty: {
        1: { attempts: 0, correct: 0 },
        2: { attempts: 0, correct: 0 },
        3: { attempts: 0, correct: 0 },
        4: { attempts: 0, correct: 0 },
      },
      misconceptions: [],    // Flagged misconception IDs
      lastAttemptAt: null,
    };
  }

  return {
    skills,
    overallAttempts: 0,
    overallCorrect: 0,
    sessionStarted: Date.now(),
    lastUpdated: null,
  };
}

// ═══════════════════════════════════════════════════════════
// RECORDING RESULTS
// ═══════════════════════════════════════════════════════════

/**
 * Record a question attempt against the skill tracker.
 *
 * @param {Object} tracker - Skill tracker state
 * @param {Object} result - {
 *   skillTags: string[],       // Array of APUSH_SKILLS keys
 *   difficulty: number,        // 1-4
 *   correct: boolean,
 *   questionId: string,
 *   misconceptionId?: string,  // If incorrect, which misconception was triggered
 *   timeSpent?: number,        // ms
 * }
 * @returns {Object} Updated tracker
 */
export function recordSkillResult(tracker, result) {
  const { skillTags = [], difficulty = 2, correct, misconceptionId } = result;
  const weight = difficulty; // Higher difficulty = more impact

  tracker.overallAttempts++;
  if (correct) tracker.overallCorrect++;
  tracker.lastUpdated = Date.now();

  for (const skill of skillTags) {
    const s = tracker.skills[skill];
    if (!s) continue;

    s.attempts++;
    if (correct) s.correct++;
    s.totalScore += correct ? weight : 0;
    s.maxPossible += weight;
    s.lastAttemptAt = Date.now();

    // Track by difficulty
    const diffBucket = s.byDifficulty[difficulty];
    if (diffBucket) {
      diffBucket.attempts++;
      if (correct) diffBucket.correct++;
    }

    // Recent results (keep last 5)
    s.recentResults.push({ correct, difficulty, timestamp: Date.now() });
    if (s.recentResults.length > 5) s.recentResults.shift();

    // Track misconception
    if (!correct && misconceptionId && !s.misconceptions.includes(misconceptionId)) {
      s.misconceptions.push(misconceptionId);
    }
  }

  return tracker;
}

// ═══════════════════════════════════════════════════════════
// SKILL ANALYSIS
// ═══════════════════════════════════════════════════════════

/**
 * Get accuracy rate for a specific skill.
 * @returns {number} 0.0 – 1.0 (or null if no attempts)
 */
export function getSkillAccuracy(tracker, skill) {
  const s = tracker.skills[skill];
  if (!s || s.attempts === 0) return null;
  return s.correct / s.attempts;
}

/**
 * Get weighted mastery score for a skill (accounts for difficulty).
 * @returns {number} 0.0 – 1.0 (or null if no attempts)
 */
export function getSkillMastery(tracker, skill) {
  const s = tracker.skills[skill];
  if (!s || s.maxPossible === 0) return null;
  return s.totalScore / s.maxPossible;
}

/**
 * Get overall accuracy across all skills.
 */
export function getOverallAccuracy(tracker) {
  if (tracker.overallAttempts === 0) return null;
  return tracker.overallCorrect / tracker.overallAttempts;
}

/**
 * Get a full skill profile — sorted by mastery, with strengths and weaknesses.
 */
export function getSkillProfile(tracker) {
  const profile = [];

  for (const [skill, data] of Object.entries(tracker.skills)) {
    if (data.attempts === 0) continue;

    const accuracy = data.correct / data.attempts;
    const mastery = data.maxPossible > 0 ? data.totalScore / data.maxPossible : 0;

    // Trend detection from recent results
    let trend = 'stable';
    if (data.recentResults.length >= 3) {
      const recent3 = data.recentResults.slice(-3);
      const correctCount = recent3.filter(r => r.correct).length;
      if (correctCount >= 3) trend = 'improving';
      else if (correctCount <= 1) trend = 'declining';
    }

    profile.push({
      skill,
      label: SKILL_LABELS[skill],
      attempts: data.attempts,
      accuracy,
      mastery,
      trend,
      misconceptions: data.misconceptions,
    });
  }

  // Sort by mastery (lowest first for identifying weaknesses)
  profile.sort((a, b) => a.mastery - b.mastery);

  return profile;
}

/**
 * Get the student's strongest and weakest skills.
 * @returns {{ strengths: string[], weaknesses: string[] }}
 */
export function getStrengthsAndWeaknesses(tracker, minAttempts = 2) {
  const profile = getSkillProfile(tracker);
  const qualified = profile.filter(p => p.attempts >= minAttempts);

  if (qualified.length === 0) {
    return { strengths: [], weaknesses: [] };
  }

  const weaknesses = qualified.filter(p => p.mastery < 0.5).map(p => p.skill);
  const strengths = qualified.filter(p => p.mastery >= 0.75).map(p => p.skill);

  return { strengths, weaknesses };
}

/**
 * Get the maximum difficulty level the student is ready for on a given skill.
 * Based on accuracy at current difficulty levels.
 */
export function getRecommendedDifficulty(tracker, skill) {
  const s = tracker.skills[skill];
  if (!s || s.attempts === 0) return DIFFICULTY.DEVELOPING;

  // Check from highest difficulty down
  for (let d = 4; d >= 1; d--) {
    const bucket = s.byDifficulty[d];
    if (bucket.attempts >= 2 && bucket.correct / bucket.attempts >= 0.7) {
      return Math.min(d + 1, 4); // Ready for next level
    }
  }

  // Check overall accuracy
  const accuracy = s.correct / s.attempts;
  if (accuracy >= 0.8) return DIFFICULTY.PROFICIENT;
  if (accuracy >= 0.6) return DIFFICULTY.DEVELOPING;
  return DIFFICULTY.FOUNDATIONAL;
}

/**
 * Get a compact summary for teacher data export.
 */
export function exportSkillData(tracker) {
  const result = {};

  for (const [skill, data] of Object.entries(tracker.skills)) {
    if (data.attempts === 0) continue;
    result[skill] = {
      attempts: data.attempts,
      correct: data.correct,
      accuracy: Math.round((data.correct / data.attempts) * 100),
      mastery: data.maxPossible > 0 ? Math.round((data.totalScore / data.maxPossible) * 100) : 0,
      misconceptions: data.misconceptions,
    };
  }

  return result;
}
