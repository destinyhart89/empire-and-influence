/**
 * EMPIRE & INFLUENCE — Global State Store
 *
 * Lightweight pub/sub state management.
 * Modeled on Zustand's API but zero-dependency.
 * Persists to localStorage on every mutation.
 *
 * Architecture decision: Vanilla pub/sub over Redux/Zustand
 * WHY: Zero dependencies, works without a build step, ~60 lines of code,
 * and the game's state shape is well-defined and bounded (8 lessons × finite decisions).
 * TRADEOFF: No dev-tools integration. Acceptable for a classroom game.
 */

const STORAGE_KEY = 'empire_influence_state';

function createStore(initialState) {
  let state = structuredClone(initialState);
  const listeners = new Set();

  function getState() {
    return state;
  }

  function setState(updater) {
    const prev = state;
    if (typeof updater === 'function') {
      state = { ...state, ...updater(state) };
    } else {
      state = { ...state, ...updater };
    }
    persist();
    listeners.forEach(fn => fn(state, prev));
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[Store] localStorage write failed:', e.message);
    }
  }

  function hydrate() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = { ...initialState, ...parsed };
        listeners.forEach(fn => fn(state, initialState));
      }
    } catch (e) {
      console.warn('[Store] localStorage read failed:', e.message);
    }
  }

  function reset() {
    state = structuredClone(initialState);
    persist();
    listeners.forEach(fn => fn(state, initialState));
  }

  function exportData() {
    return JSON.stringify(state, null, 2);
  }

  return { getState, setState, subscribe, hydrate, reset, exportData };
}

// ─── Default Initial State ──────────────────────────────────

const defaultState = {
  // Session
  sessionId: null,
  startedAt: null,

  // Student identity
  student: {
    name: '',
    classCode: '',
    role: 'student', // 'student' | 'teacher'
  },

  // Lesson progression
  lessons: {
    // Keyed by lesson ID (1-8). Populated on first play.
    // Each entry: { unlocked, started, completed, currentScreen, decisions[], meterSnapshots[], advisorAffinity }
  },

  // Global meters (carried across lessons as legacy effects)
  globalMeters: {
    economicInfluence: 50,
    regionalStability: 50,
    globalReputation: 50,
  },

  // Cross-lesson flags
  flags: {
    // e.g., 'chose_military_l1': true, 'cia_coup_l5': true
    // Used for continuity references and conditional dialogue
  },

  // Assessment results
  assessments: {
    // Keyed by lesson ID. Each: { questions[], score, completedAt }
  },

  // Advisor affinity tracking (cumulative across lessons)
  advisorAffinity: {
    economic: 0,
    security: 0,
    diplomatic: 0,
  },

  // Teacher mode
  teacherMode: false,
};

// ─── Singleton Store ────────────────────────────────────────

export const store = createStore(defaultState);

// ─── Convenience Selectors ──────────────────────────────────

export function getStudent() {
  return store.getState().student;
}

export function getLessonState(lessonId) {
  return store.getState().lessons[lessonId] || null;
}

export function getMeters() {
  return store.getState().globalMeters;
}

export function getFlags() {
  return store.getState().flags;
}

export function isTeacher() {
  return store.getState().student.role === 'teacher';
}

// ─── Convenience Mutators ───────────────────────────────────

export function setStudent(name, classCode, role = 'student') {
  store.setState({
    student: { name, classCode, role },
    sessionId: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
  });
}

export function initLesson(lessonId) {
  const current = store.getState().lessons;
  if (current[lessonId]) return; // already initialized
  store.setState(s => ({
    lessons: {
      ...s.lessons,
      [lessonId]: {
        unlocked: true,
        started: true,
        completed: false,
        currentScreen: 0,
        decisions: [],
        meterSnapshots: [],
        advisorAffinity: { economic: 0, security: 0, diplomatic: 0 },
      }
    }
  }));
}

export function recordDecision(lessonId, decision) {
  store.setState(s => {
    const lesson = s.lessons[lessonId] || {};
    return {
      lessons: {
        ...s.lessons,
        [lessonId]: {
          ...lesson,
          decisions: [...(lesson.decisions || []), {
            ...decision,
            timestamp: new Date().toISOString(),
          }],
        }
      }
    };
  });
}

export function updateMeters(deltas) {
  store.setState(s => ({
    globalMeters: {
      economicInfluence: clamp(s.globalMeters.economicInfluence + (deltas.economic || 0), 0, 100),
      regionalStability: clamp(s.globalMeters.regionalStability + (deltas.stability || 0), 0, 100),
      globalReputation: clamp(s.globalMeters.globalReputation + (deltas.reputation || 0), 0, 100),
    }
  }));
}

export function setFlag(key, value = true) {
  store.setState(s => ({
    flags: { ...s.flags, [key]: value }
  }));
}

export function completeLesson(lessonId) {
  store.setState(s => ({
    lessons: {
      ...s.lessons,
      [lessonId]: {
        ...s.lessons[lessonId],
        completed: true,
      }
    }
  }));
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
