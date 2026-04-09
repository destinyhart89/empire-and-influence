/**
 * EMPIRE & INFLUENCE — Lesson Flow Engine
 *
 * State-machine that drives progression through a lesson:
 *   INTRO → CONTEXT → DECISION → CONSEQUENCE → ... → OUTCOME → ASSESSMENT
 *
 * Supports:
 *   - Dynamic branching paths
 *   - Conditional progression
 *   - Re-entry from saved state
 *   - Event interruptions
 *   - Screen-type-based rendering delegation
 */

import { createMetricsState, createSnapshot, applyDeltas } from './metrics-system.js';
import { createAdvisorState, applyTrustCarryOver } from './advisor-system.js';
import { createFactionState } from './faction-system.js';
import { createIdeologyState } from './ideology-tracker.js';
import { createConsequenceQueue, processDelayed, evaluateConditionals } from './consequence-engine.js';
import { prepareDecision, executeDecision } from './decision-engine.js';
import { saveGameState, loadGameState } from './state-manager.js';

// ─── Screen Types ───────────────────────────────────────────

export const SCREEN_TYPES = {
  INTRO:       'intro',
  BRIEFING:    'briefing',
  CONTEXT:     'context',
  DECISION:    'decision',
  CONSEQUENCE: 'consequence',
  EVENT:       'event',
  OUTCOME:     'outcome',
  REFLECTION:  'reflection',
  ASSESSMENT:  'assessment',
};

// ─── Flow States ────────────────────────────────────────────

const FLOW_STATES = {
  IDLE:        'idle',
  LOADING:     'loading',
  PLAYING:     'playing',
  PAUSED:      'paused',
  COMPLETE:    'complete',
  ERROR:       'error',
};

// ─── Lesson Flow Controller ─────────────────────────────────

export class LessonFlow {
  constructor() {
    this.lessonData = null;
    this.gameState = null;
    this.flowState = FLOW_STATES.IDLE;
    this.currentScreen = null;
    this.screenHistory = [];
    this.listeners = new Set();
    this.pendingPreparedDecision = null;
  }

  // ─── Lifecycle ──────────────────────────────────────────

  /**
   * Initialize and start a lesson.
   * @param {Object} lessonData - Full lesson JSON
   * @param {Object} [savedState] - Previously saved state for re-entry
   * @param {Object} [globalState] - Cross-lesson carry-over (metrics, flags, ideology)
   */
  start(lessonData, savedState = null, globalState = null) {
    this.lessonData = lessonData;
    this.flowState = FLOW_STATES.LOADING;
    this.emit('flowStateChange', FLOW_STATES.LOADING);

    if (savedState && savedState.lessonId === lessonData.id) {
      // Re-entry from saved state
      this.gameState = savedState;
      this.currentScreen = this._findScreen(savedState.currentScreenId);
      this.screenHistory = savedState.screenHistory || [];
    } else {
      // Fresh start
      this.gameState = this._createInitialGameState(lessonData, globalState);
      this.currentScreen = lessonData.screens[0];
      this.screenHistory = [];
    }

    this.flowState = FLOW_STATES.PLAYING;
    this.emit('flowStateChange', FLOW_STATES.PLAYING);
    this._processScreen(this.currentScreen);
  }

  /**
   * Navigate to a specific screen by ID.
   */
  goToScreen(screenId) {
    const screen = this._findScreen(screenId);
    if (!screen) {
      console.error(`[LessonFlow] Screen not found: ${screenId}`);
      return;
    }

    this.screenHistory.push(this.currentScreen?.id);
    this.currentScreen = screen;
    this.gameState.currentScreenId = screenId;

    // Auto-save on screen transition
    this._autoSave();

    this._processScreen(screen);
  }

  /**
   * Handle a player's choice on a decision screen.
   * @param {string} choiceId
   */
  makeChoice(choiceId) {
    if (this.currentScreen?.type !== SCREEN_TYPES.DECISION) {
      console.warn('[LessonFlow] makeChoice called on non-decision screen');
      return;
    }

    if (!this.pendingPreparedDecision) {
      console.error('[LessonFlow] No prepared decision available');
      return;
    }

    try {
      const result = executeDecision(
        choiceId,
        this.currentScreen,
        this.pendingPreparedDecision.recommendations,
        this.gameState
      );

      this.pendingPreparedDecision = null;

      // Emit the decision result for UI rendering
      this.emit('decisionResult', result);

      // Navigate to next screen after a short delay (let UI show consequence)
      if (result.nextScreen) {
        // The UI layer calls goToScreen when the player clicks "Continue"
        // Store the pending next screen
        this.gameState.pendingNextScreen = result.nextScreen;
        this.emit('awaitingContinue', result.nextScreen);
      }
    } catch (err) {
      console.error('[LessonFlow] Decision execution failed:', err);
      this.emit('error', err.message);
    }
  }

  /**
   * Player clicks "Continue" after seeing consequences.
   */
  continue() {
    const next = this.gameState.pendingNextScreen;
    if (next) {
      this.gameState.pendingNextScreen = null;
      this.goToScreen(next);
    } else if (this.currentScreen?.next) {
      this.goToScreen(this.currentScreen.next);
    }
  }

  /**
   * Complete the lesson.
   * Collects cross-lesson delayed consequences (trigger: 'next_lesson') for
   * carry-over into global state so they fire at the start of the target lesson.
   */
  complete() {
    this.flowState = FLOW_STATES.COMPLETE;
    this.emit('flowStateChange', FLOW_STATES.COMPLETE);

    // Gather cross-lesson pending consequences (next_lesson triggers)
    const crossLessonConsequences = (this.gameState.consequenceQueue?.pending || [])
      .filter(dc => dc.trigger === 'next_lesson');

    this.emit('lessonComplete', {
      lessonId: this.lessonData.id,
      metrics: createSnapshot(this.gameState.metrics, 'lesson_complete'),
      decisions: this.gameState.decisions,
      ideology: this.gameState.ideology,
      advisorAffinities: this._getAdvisorAffinities(),
      pendingDelayedConsequences: crossLessonConsequences,
    });
    this._autoSave();
  }

  /**
   * Get current game state (for save/UI sync).
   */
  getState() {
    return this.gameState;
  }

  /**
   * Get current lesson data.
   */
  getLessonData() {
    return this.lessonData;
  }

  /**
   * Get the current screen.
   */
  getCurrentScreen() {
    return this.currentScreen;
  }

  /**
   * Get the prepared decision (for decision screens).
   */
  getPreparedDecision() {
    return this.pendingPreparedDecision;
  }

  // ─── Event System ─────────────────────────────────────

  on(event, handler) {
    const ref = { event, handler };
    this.listeners.add(ref);
    return () => this.listeners.delete(ref);
  }

  emit(event, data) {
    for (const l of this.listeners) {
      if (l.event === event) {
        try { l.handler(data); } catch (e) { console.error(`[LessonFlow] Listener error:`, e); }
      }
    }
  }

  // ─── Internal: Screen Processing ──────────────────────

  _processScreen(screen) {
    if (!screen) return;

    // Check for delayed consequences that should fire
    const firedConsequences = processDelayed(this.gameState, screen.id);
    if (firedConsequences.length > 0) {
      this.emit('delayedConsequences', firedConsequences);
    }

    // Check for conditional content variants
    if (screen.conditionalContent) {
      const variant = evaluateConditionals(screen.conditionalContent, this.gameState);
      if (variant) {
        // Merge variant into screen (override text, title, etc.)
        screen = { ...screen, ...variant };
      }
    }

    // Process by screen type
    switch (screen.type) {
      case SCREEN_TYPES.DECISION:
        this._processDecisionScreen(screen);
        break;

      case SCREEN_TYPES.EVENT:
        this._processEventScreen(screen);
        break;

      case SCREEN_TYPES.ASSESSMENT:
        this._processAssessmentScreen(screen);
        break;

      case SCREEN_TYPES.OUTCOME:
        this._processOutcomeScreen(screen);
        break;

      default:
        // Narrative types: intro, briefing, context, consequence, reflection
        this.emit('renderScreen', { screen, gameState: this.gameState });
        break;
    }
  }

  _processDecisionScreen(screen) {
    // Prepare the decision (resolve locks, generate advisor recommendations)
    const prepared = prepareDecision(screen, this.gameState);
    this.pendingPreparedDecision = prepared;

    this.emit('renderDecision', {
      screen,
      prepared,
      gameState: this.gameState,
    });
  }

  _processEventScreen(screen) {
    // Events may have effects that auto-apply
    if (screen.autoEffects) {
      const { metrics, applied } = applyDeltas(
        this.gameState.metrics, screen.autoEffects
      );
      this.gameState.metrics = metrics;
      this.emit('metricsChanged', { deltas: applied, source: 'event' });
    }

    this.emit('renderEvent', { screen, gameState: this.gameState });
  }

  _processAssessmentScreen(screen) {
    this.emit('renderAssessment', { screen, gameState: this.gameState });
  }

  _processOutcomeScreen(screen) {
    // Generate outcome summary data
    const summary = {
      metrics: createSnapshot(this.gameState.metrics, 'outcome'),
      decisions: this.gameState.decisions,
      advisorAffinities: this._getAdvisorAffinities(),
      ideology: this.gameState.ideology,
      factions: this.gameState.factions,
    };

    this.emit('renderOutcome', { screen, summary, gameState: this.gameState });
  }

  // ─── Internal: State Management ───────────────────────

  _createInitialGameState(lessonData, globalState) {
    const state = {
      // Identity
      lessonId: lessonData.id,
      currentScreenId: lessonData.screens[0]?.id || null,
      pendingNextScreen: null,

      // Core systems
      metrics: createMetricsState(globalState?.metrics),
      advisors: createAdvisorState(lessonData.advisors),
      factions: createFactionState(globalState?.factions),
      ideology: globalState?.ideology || createIdeologyState(),
      consequenceQueue: createConsequenceQueue(),

      // Decision history (this lesson)
      decisions: [],
      decisionCount: 0,

      // Global flags (accumulated across lessons)
      flags: { ...(globalState?.flags || {}) },

      // Completed lessons (for cross-lesson conditions)
      completedLessons: globalState?.completedLessons || [],

      // Screen history
      screenHistory: [],

      // Save metadata
      lastSaveTimestamp: null,
      startedAt: Date.now(),
    };

    // Apply cross-lesson trust carry-over
    if (globalState?.advisorAffinities) {
      applyTrustCarryOver(state.advisors, globalState.advisorAffinities);
    }

    // Load cross-lesson delayed consequences targeting this lesson into the queue
    if (Array.isArray(globalState?.pendingDelayedConsequences)) {
      const forThisLesson = globalState.pendingDelayedConsequences.filter(
        dc => dc.targetLesson === lessonData.id
      );
      if (forThisLesson.length > 0) {
        state.consequenceQueue.pending.push(...forThisLesson);
      }
    }

    return state;
  }

  _findScreen(screenId) {
    return this.lessonData?.screens?.find(s => s.id === screenId) || null;
  }

  _getAdvisorAffinities() {
    const affinities = {};
    for (const [role, advisor] of Object.entries(this.gameState.advisors)) {
      affinities[role] = advisor.trust;
    }
    return affinities;
  }

  _autoSave() {
    this.gameState.lastSaveTimestamp = Date.now();
    this.gameState.currentScreenId = this.currentScreen?.id;
    this.gameState.screenHistory = [...this.screenHistory];
    saveGameState(this.lessonData.id, this.gameState);
    this.emit('autoSave', { timestamp: this.gameState.lastSaveTimestamp });
  }
}

// ─── Singleton Factory ──────────────────────────────────────

let activeLessonFlow = null;

export function getLessonFlow() {
  if (!activeLessonFlow) {
    activeLessonFlow = new LessonFlow();
  }
  return activeLessonFlow;
}

export function resetLessonFlow() {
  activeLessonFlow = null;
}
