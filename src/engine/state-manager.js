/**
 * EMPIRE & INFLUENCE — State / Save Manager
 *
 * Handles:
 *   - Per-lesson save/load (localStorage)
 *   - Cross-lesson global state persistence
 *   - Session management
 *   - Data export for teacher dashboard
 *
 * Storage strategy:
 *   - Each lesson save: empire_lesson_{id}
 *   - Global state: empire_global
 *   - Session meta: empire_session
 */

const KEYS = {
  global:  'empire_global',
  session: 'empire_session',
  lessonPrefix: 'empire_lesson_',
};

// ─── Global State (Cross-Lesson) ────────────────────────────

/**
 * Create a fresh global state.
 */
export function createGlobalState() {
  return {
    // Player identity
    playerName: '',
    classCode: '',
    role: 'student',

    // Cross-lesson persistent data
    metrics: null,                     // Carried from last completed lesson
    flags: {},                         // Accumulated across all lessons
    ideology: null,                    // Accumulated ideology tracker
    factions: null,                    // Carried forward
    advisorAffinities: {},             // Last lesson's advisor trust (for carry-over)
    completedLessons: [],              // Array of lesson IDs
    pendingDelayedConsequences: [],    // Cross-lesson delayed consequences queued for future lessons

    // Assessment scores
    assessmentScores: {},     // { lessonId: { score, total, completedAt } }  — post-lesson only
    preAssessmentScores: {},  // { lessonId: { score, total, completedAt } }  — pre-lesson baseline, not graded

    // Session meta
    sessionId: null,
    startedAt: null,
    lastActiveAt: null,
  };
}

// ─── Save / Load Operations ─────────────────────────────────

/**
 * Save a lesson's game state.
 */
export function saveGameState(lessonId, gameState) {
  try {
    const key = KEYS.lessonPrefix + lessonId;
    const serialized = JSON.stringify(gameState);
    localStorage.setItem(key, serialized);
    return true;
  } catch (e) {
    console.warn('[StateManager] Failed to save lesson state:', e.message);
    return false;
  }
}

/**
 * Load a lesson's game state.
 * @returns {Object|null}
 */
export function loadGameState(lessonId) {
  try {
    const key = KEYS.lessonPrefix + lessonId;
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    console.warn('[StateManager] Failed to load lesson state:', e.message);
    return null;
  }
}

/**
 * Clear a lesson's saved state.
 */
export function clearLessonState(lessonId) {
  try {
    localStorage.removeItem(KEYS.lessonPrefix + lessonId);
  } catch (e) {
    // Silent fail
  }
}

/**
 * Check if a lesson has a saved state.
 */
export function hasSavedState(lessonId) {
  return !!localStorage.getItem(KEYS.lessonPrefix + lessonId);
}

// ─── Global State Persistence ───────────────────────────────

/**
 * Save global state.
 */
export function saveGlobalState(globalState) {
  try {
    globalState.lastActiveAt = Date.now();
    localStorage.setItem(KEYS.global, JSON.stringify(globalState));
    return true;
  } catch (e) {
    console.warn('[StateManager] Failed to save global state:', e.message);
    return false;
  }
}

/**
 * Load global state.
 */
export function loadGlobalState() {
  try {
    const data = localStorage.getItem(KEYS.global);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    console.warn('[StateManager] Failed to load global state:', e.message);
    return null;
  }
}

/**
 * Update global state after completing a lesson.
 * Carries forward metrics, flags, ideology, etc.
 *
 * @param {Object} lessonResult - Result from LessonFlow.complete()
 */
export function updateGlobalAfterLesson(lessonResult) {
  let global = loadGlobalState() || createGlobalState();

  // Mark lesson complete
  if (!global.completedLessons.includes(lessonResult.lessonId)) {
    global.completedLessons.push(lessonResult.lessonId);
  }

  // Carry forward metrics
  if (lessonResult.metrics) {
    global.metrics = { ...lessonResult.metrics };
  }

  // Merge flags
  if (lessonResult.flags) {
    global.flags = { ...global.flags, ...lessonResult.flags };
  }

  // Carry forward ideology
  if (lessonResult.ideology) {
    global.ideology = lessonResult.ideology;
  }

  // Carry forward advisor affinities
  if (lessonResult.advisorAffinities) {
    global.advisorAffinities = lessonResult.advisorAffinities;
  }

  // Merge cross-lesson delayed consequences
  // Remove any previously-queued consequences that targeted the just-completed lesson
  // (they've already fired or were missed), then append the new ones from this lesson.
  if (!Array.isArray(global.pendingDelayedConsequences)) {
    global.pendingDelayedConsequences = [];
  }
  // Drop stale entries targeting the completed lesson
  global.pendingDelayedConsequences = global.pendingDelayedConsequences.filter(
    dc => dc.targetLesson !== lessonResult.lessonId
  );
  // Append new cross-lesson consequences from this lesson
  if (Array.isArray(lessonResult.pendingDelayedConsequences) && lessonResult.pendingDelayedConsequences.length > 0) {
    global.pendingDelayedConsequences.push(...lessonResult.pendingDelayedConsequences);
  }

  // Save post-lesson assessment score (the canonical lesson grade)
  if (lessonResult.assessmentScore != null) {
    global.assessmentScores[lessonResult.lessonId] = {
      score: lessonResult.assessmentScore,
      total: lessonResult.assessmentTotal,
      completedAt: Date.now(),
    };
  }

  // Save pre-assessment score separately (baseline knowledge check — not graded)
  if (lessonResult.preAssessmentScore != null) {
    if (!global.preAssessmentScores) global.preAssessmentScores = {};
    global.preAssessmentScores[lessonResult.lessonId] = {
      score: lessonResult.preAssessmentScore,
      total: lessonResult.preAssessmentTotal,
      completedAt: Date.now(),
    };
  }

  saveGlobalState(global);
  return global;
}

// ─── Session Management ─────────────────────────────────────

/**
 * Initialize or resume a session.
 */
export function initSession(playerName, classCode, role = 'student') {
  let global = loadGlobalState();

  if (global && global.playerName === playerName && global.classCode === classCode) {
    // Resume existing session
    global.lastActiveAt = Date.now();
    saveGlobalState(global);
    return global;
  }

  // New session
  global = createGlobalState();
  global.playerName = playerName;
  global.classCode = classCode;
  global.role = role;
  global.sessionId = generateSessionId();
  global.startedAt = Date.now();
  global.lastActiveAt = Date.now();

  saveGlobalState(global);
  return global;
}

/**
 * Reset all saved data (full wipe).
 */
export function resetAllData() {
  try {
    // Clear all lesson saves
    for (let i = 1; i <= 8; i++) {
      localStorage.removeItem(KEYS.lessonPrefix + i);
    }
    localStorage.removeItem(KEYS.global);
    localStorage.removeItem(KEYS.session);
    // Also clear the Phase 1 store key
    localStorage.removeItem('empire_influence_state');
  } catch (e) {
    console.warn('[StateManager] Reset failed:', e.message);
  }
}

// ─── Data Export ─────────────────────────────────────────────

/**
 * Export all player data as a structured object.
 * Used by teacher dashboard and data export features.
 */
export function exportAllData() {
  const global = loadGlobalState() || createGlobalState();

  const lessonStates = {};
  for (let i = 1; i <= 8; i++) {
    const state = loadGameState(i);
    if (state) {
      lessonStates[i] = {
        decisions: state.decisions || [],
        metrics: state.metrics || {},
        advisorAffinities: extractAffinities(state.advisors),
        completed: global.completedLessons.includes(i),
      };
    }
  }

  return {
    player: {
      name: global.playerName,
      classCode: global.classCode,
      role: global.role,
      sessionId: global.sessionId,
    },
    progress: {
      completedLessons: global.completedLessons,
      currentMetrics: global.metrics,
      ideology: global.ideology,
      flags: global.flags,
    },
    assessments: global.assessmentScores,
    preAssessments: global.preAssessmentScores || {},
    lessons: lessonStates,
    exportedAt: new Date().toISOString(),
  };
}

// ─── Helpers ────────────────────────────────────────────────

function generateSessionId() {
  return 'session_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function extractAffinities(advisors) {
  if (!advisors) return {};
  const affinities = {};
  for (const [role, advisor] of Object.entries(advisors)) {
    affinities[role] = advisor?.trust ?? 0;
  }
  return affinities;
}
