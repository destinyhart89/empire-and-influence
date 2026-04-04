/**
 * EMPIRE & INFLUENCE — Game Renderer (Engine ↔ UI Bridge)
 *
 * Connects the Phase 3 game engine (LessonFlow events) to the
 * Phase 2 UI component library.
 *
 * Listens for engine events and renders the appropriate UI components
 * into the lesson viewport. This is the ONLY file that bridges
 * the engine and the UI — no direct coupling between them.
 *
 * Architecture:
 *   LessonFlow (engine) → emits events → GameRenderer (this) → calls UI components → DOM
 */

import { LessonFlow, getLessonFlow, resetLessonFlow, SCREEN_TYPES } from '../engine/lesson-flow.js';
import { evaluateCondition } from '../engine/consequence-engine.js';
import { loadGameState, loadGlobalState, saveGlobalState, initSession, updateGlobalAfterLesson } from '../engine/state-manager.js';
import { METER_KEYS, METER_LABELS } from '../engine/metrics-system.js';
import { getTrustLevel } from '../engine/advisor-system.js';
import { getDominantIdeology, getIdeologyBreakdown } from '../engine/ideology-tracker.js';
import { resolveAssetPath, resolvePortraitPath, resolveMapPath, resolveNewspaperPath, preloadLessonAssets } from '../core/asset-loader.js';

import {
  renderAppShell,
  createBriefingPanel,
  createContextPanel,
  createDecisionPanel,
  createConsequencePanel,
  createOutcomePanel,
  createAdvisorDialogue,
  createAdvisorDock,
  createResourceBar,
  animateMeterChange,
  createFactionDisplay,
  createQuestionCard,
  createMCOption,
  createShortResponse,
  createAssessmentFeedback,
  showNewspaperModal,
  showEventPopup,
  showAdvisorInterruption,
  showToast,
  renderLoadingState,
  renderErrorState,
} from './ui-components.js';

import { buildLessonSidebar, updateSidebarActiveStep, markSidebarStepCompleted } from './sidebar.js';
import { navigate } from '../core/router.js';

// ═══════════════════════════════════════════════════════════
// GAME RENDERER
// ═══════════════════════════════════════════════════════════

export class GameRenderer {
  constructor() {
    this.flow = null;
    this.lessonData = null;
    this.container = null;
    this.viewport = null;
    this.sidebarEl = null;
    this.metersContainer = null;
    this.advisorDockContainer = null;
    this.completedScreens = new Set();
    this.unsubscribers = [];
    this.assessmentState = { currentIndex: 0, score: 0, answers: [] };
  }

  // ─── Lifecycle ──────────────────────────────────────────

  /**
   * Initialize and start rendering a lesson.
   * @param {HTMLElement} container - The root container (#app-main or similar)
   * @param {Object} lessonData - Full lesson data object
   * @param {Object} [options] - { playerName, classCode }
   */
  async start(container, lessonData, options = {}) {
    this.container = container;
    this.lessonData = lessonData;

    // Show loading state
    renderLoadingState(container, 'Preparing mission briefing...');

    // Preload assets
    try {
      await preloadLessonAssets(lessonData);
    } catch (e) {
      console.warn('[GameRenderer] Asset preload partial failure:', e);
    }

    // Build the app shell with sidebar
    const sidebarSteps = this._buildSidebarSteps(lessonData);
    const sidebarHtml = buildLessonSidebar({
      steps: sidebarSteps,
      currentStepId: lessonData.screens[0]?.id,
      completedStepIds: [],
      lessonMeta: {
        id: lessonData.id,
        title: lessonData.title,
        era: lessonData.era,
      },
    });

    renderAppShell(container, {
      showSidebar: true,
      sidebarContent: sidebarHtml,
      navConfig: {
        brand: 'Empire & Influence',
        lessonTitle: `Lesson ${lessonData.id}: ${lessonData.title}`,
        era: lessonData.subtitle || '',
        saveIndicator: true,
        userName: options.playerName || '',
        showProgress: true,
        rightHtml: `<button class="btn btn--secondary" id="btn-exit-lesson" style="font-size:0.75rem; padding:0.25rem 0.75rem;">Exit</button>`,
      },
    });

    // Cache DOM references
    this.viewport = container.querySelector('#viewport-inner');
    this.sidebarEl = container.querySelector('#app-sidebar');
    this.metersContainer = container.querySelector('#sidebar-meters');
    this.advisorDockContainer = container.querySelector('#sidebar-advisors');

    // Wire exit button
    container.querySelector('#btn-exit-lesson')?.addEventListener('click', () => {
      if (confirm('Leave this lesson? Your progress is saved.')) {
        this.destroy();
        navigate('/dashboard');
      }
    });

    // Create and start the engine
    resetLessonFlow();
    this.flow = getLessonFlow();

    // Subscribe to all engine events
    this._subscribeToEngine();

    // Load saved state or start fresh
    const globalState = loadGlobalState();
    const savedState = loadGameState(lessonData.id);

    this.flow.start(lessonData, savedState, globalState);

    // Render initial sidebar meters and advisors
    this._renderSidebarMeters();
    this._renderSidebarAdvisors();
  }

  /**
   * Clean up all listeners and state.
   */
  destroy() {
    for (const unsub of this.unsubscribers) {
      if (typeof unsub === 'function') unsub();
    }
    this.unsubscribers = [];
    this.flow = null;
    this.lessonData = null;
    this.viewport = null;
    this.sidebarEl = null;
    this.completedScreens.clear();
    resetLessonFlow();
  }

  // ─── Engine Event Subscriptions ─────────────────────────

  _subscribeToEngine() {
    const flow = this.flow;

    // Narrative screens (intro, briefing, context, consequence, reflection)
    this.unsubscribers.push(
      flow.on('renderScreen', (data) => this._renderNarrativeScreen(data))
    );

    // Decision screens
    this.unsubscribers.push(
      flow.on('renderDecision', (data) => this._renderDecisionScreen(data))
    );

    // Decision result (after player chooses)
    this.unsubscribers.push(
      flow.on('decisionResult', (result) => this._renderDecisionResult(result))
    );

    // Awaiting continue (after consequence shown)
    this.unsubscribers.push(
      flow.on('awaitingContinue', (nextScreen) => this._showContinueButton(nextScreen))
    );

    // Event screens
    this.unsubscribers.push(
      flow.on('renderEvent', (data) => this._renderEventScreen(data))
    );

    // Outcome screen
    this.unsubscribers.push(
      flow.on('renderOutcome', (data) => this._renderOutcomeScreen(data))
    );

    // Assessment screen
    this.unsubscribers.push(
      flow.on('renderAssessment', (data) => this._renderAssessmentScreen(data))
    );

    // Metrics changed (from event auto-effects)
    this.unsubscribers.push(
      flow.on('metricsChanged', (data) => this._onMetricsChanged(data))
    );

    // Delayed consequences fired
    this.unsubscribers.push(
      flow.on('delayedConsequences', (consequences) => this._onDelayedConsequences(consequences))
    );

    // Auto-save
    this.unsubscribers.push(
      flow.on('autoSave', () => this._flashSaveIndicator())
    );

    // Lesson complete
    this.unsubscribers.push(
      flow.on('lessonComplete', (result) => this._onLessonComplete(result))
    );

    // Errors
    this.unsubscribers.push(
      flow.on('error', (msg) => showToast(msg, 'error'))
    );
  }

  // ─── Screen Renderers ───────────────────────────────────

  /**
   * Render narrative screen types: intro, briefing, context, consequence, reflection.
   */
  _renderNarrativeScreen({ screen, gameState }) {
    this._updateProgress(screen);

    const lessonId = this.lessonData.id;

    // Resolve map asset
    let mapSrc = null;
    let mapCaption = null;
    if (screen.map) {
      mapSrc = resolveMapPath(lessonId, screen.map.asset);
      mapCaption = screen.map.caption;
    }

    // Resolve advisor dialogue
    let advisorDialogueEls = [];
    if (screen.advisorDialogue) {
      advisorDialogueEls = this._buildAdvisorDialogues(screen.advisorDialogue, screen.advisorPrimary, gameState);
    }

    let panel;

    if (screen.type === 'intro' || screen.type === 'briefing') {
      panel = createBriefingPanel({
        title: screen.title,
        subtitle: screen.subtitle || '',
        bodyHtml: screen.text,
        mapSrc,
        mapAlt: `Map for ${screen.title}`,
        mapCaption,
        lessonId,
        footerButtons: [{ label: 'Continue', primary: true, action: 'continue' }],
      });
    } else if (screen.type === 'context') {
      // Build asset HTML for context screens (could be newspaper or map)
      let assetHtml = '';
      if (mapSrc) {
        assetHtml = `<div class="map-frame"><img class="map-frame__image" src="${mapSrc}" alt="Context map" onerror="this.parentElement.innerHTML='<div class=\\'asset-placeholder asset-placeholder--map\\'><div>Map unavailable</div></div>'">
        ${mapCaption ? `<div class="map-frame__overlay"><div class="map-frame__caption">${mapCaption}</div></div>` : ''}</div>`;
      }

      panel = createContextPanel({
        title: screen.title,
        sourceBadge: screen.subtitle || null,
        bodyHtml: screen.text,
        assetHtml,
        footerButtons: [{ label: 'Continue', primary: true, action: 'continue' }],
      });
    } else if (screen.type === 'consequence') {
      // Consequence screens show metric deltas and narrative
      const meterChanges = [];
      if (screen.autoEffects) {
        for (const [key, val] of Object.entries(screen.autoEffects)) {
          if (val !== 0) {
            meterChanges.push({ label: METER_LABELS[key] || key, value: val });
          }
        }
      }

      panel = createConsequencePanel({
        title: screen.title || 'Consequences',
        bodyHtml: screen.text,
        meterChanges,
        footerButtons: [{ label: 'Continue', primary: true, action: 'continue' }],
      });
    } else {
      // Reflection or generic narrative
      panel = createContextPanel({
        title: screen.title,
        bodyHtml: screen.text,
        footerButtons: [{ label: 'Continue', primary: true, action: 'continue' }],
      });
    }

    // Clear viewport and render
    this.viewport.innerHTML = '';
    this.viewport.appendChild(panel);

    // Append advisor dialogues below the panel
    if (advisorDialogueEls.length > 0) {
      const advisorSection = document.createElement('div');
      advisorSection.className = 'advisor-dialogue-section';
      advisorSection.style.cssText = 'display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem;';
      for (const el of advisorDialogueEls) {
        advisorSection.appendChild(el);
      }
      this.viewport.appendChild(advisorSection);
    }

    // Check for newspaper trigger
    if (screen.newspaper && screen.newspaper.trigger === 'immediate') {
      this._showNewspaper(screen.newspaper);
    }

    // Wire continue button
    this._wireContinueButtons(panel);

    // Scroll viewport to top
    this.viewport.scrollTop = 0;
  }

  /**
   * Render a decision screen with advisor recommendations.
   */
  _renderDecisionScreen({ screen, prepared, gameState }) {
    this._updateProgress(screen);

    // Build choices with lock/hint info from prepared decision
    const choices = prepared.choices.map(c => ({
      id: c.id,
      label: c.label,
      description: c.description,
      advisorAlignment: c.advisorAlignment,
      riskLevel: c.displayRiskLevel || c.riskLevel,
      locked: c.locked,
      lockMessage: c.lockMessage || c.lockReason,
      revealedHint: c.revealedHint,
      unlockedByAdvisor: c.unlockedByAdvisor,
    }));

    // Build advisor recommendation dialogues
    const advisorDialogues = {};
    if (prepared.recommendations) {
      for (const [role, rec] of Object.entries(prepared.recommendations)) {
        const advisor = this.lessonData.advisors[role];
        if (advisor && rec.dialogue) {
          advisorDialogues[role] = rec.dialogue;
        }
      }
    }

    const panel = createDecisionPanel({
      title: screen.title,
      promptHtml: prepared.prompt || screen.text,
      choices,
      advisorDialogues,
    });

    // Clear and render
    this.viewport.innerHTML = '';
    this.viewport.appendChild(panel);

    // Add advisor recommendation cards below the decision
    const recsSection = document.createElement('div');
    recsSection.className = 'advisor-recs-section';
    recsSection.style.cssText = 'display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem;';

    for (const [role, rec] of Object.entries(prepared.recommendations || {})) {
      const advisor = this.lessonData.advisors[role];
      if (!advisor || !rec.dialogue) continue;

      const portraitSrc = resolvePortraitPath(this.lessonData.id, advisor.portrait);
      const stanceLabel = rec.stance ? rec.stance.replace('_', ' ') : '';

      const el = createAdvisorDialogue({
        name: advisor.name,
        role,
        portraitSrc,
        text: `<em>[${stanceLabel}]</em> ${rec.dialogue}`,
      });
      recsSection.appendChild(el);
    }
    this.viewport.appendChild(recsSection);

    // Show revealed hints
    for (const c of choices) {
      if (c.revealedHint) {
        const hintEl = panel.querySelector(`[data-choice-id="${c.id}"]`);
        if (hintEl) {
          const hint = document.createElement('div');
          hint.className = 'decision-option__hint';
          hint.style.cssText = 'font-size:0.75rem; color:var(--ds-gold); margin-top:0.25rem; font-style:italic;';
          hint.textContent = `Advisor insight: ${c.revealedHint}`;
          hintEl.appendChild(hint);
        }
      }
    }

    // Mark locked choices
    for (const c of choices) {
      if (c.locked) {
        const el = panel.querySelector(`[data-choice-id="${c.id}"]`);
        if (el) {
          el.classList.add('decision-option--locked');
          el.removeAttribute('tabindex');
          if (c.lockMessage) {
            const lockMsg = document.createElement('div');
            lockMsg.className = 'decision-option__lock-msg';
            lockMsg.style.cssText = 'font-size:0.75rem; color:var(--ds-text-muted); margin-top:0.25rem;';
            lockMsg.textContent = c.lockMessage;
            el.appendChild(lockMsg);
          }
        }
      }
    }

    // Wire choice click handlers
    panel.querySelectorAll('.decision-option:not(.decision-option--locked)').forEach(opt => {
      opt.addEventListener('click', () => {
        const choiceId = opt.dataset.choiceId;

        // Visual selection
        panel.querySelectorAll('.decision-option').forEach(o => o.classList.remove('decision-option--selected'));
        opt.classList.add('decision-option--selected');

        // Confirm button (add if not present)
        let confirmBtn = panel.querySelector('#confirm-choice');
        if (!confirmBtn) {
          confirmBtn = document.createElement('button');
          confirmBtn.id = 'confirm-choice';
          confirmBtn.className = 'btn btn--primary';
          confirmBtn.style.cssText = 'margin-top:1rem; width:100%;';
          confirmBtn.textContent = 'Confirm Decision';
          panel.querySelector('.decision-panel__options')?.after(confirmBtn);
        }

        confirmBtn.onclick = () => {
          confirmBtn.disabled = true;
          confirmBtn.textContent = 'Processing...';
          this.flow.makeChoice(choiceId);
        };
      });
    });

    // Newspaper trigger if present on screen
    if (screen.newspaper && screen.newspaper.trigger === 'immediate') {
      this._showNewspaper(screen.newspaper);
    }

    this.viewport.scrollTop = 0;
  }

  /**
   * Render the result of a decision (consequence overlay / transition).
   */
  _renderDecisionResult(result) {
    // Build consequence narrative
    const narrativeHtml = result.narrative || 'Your decision has been recorded.';

    // Build meter deltas display
    const meterChanges = [];
    if (result.metricDeltas) {
      for (const [key, val] of Object.entries(result.metricDeltas)) {
        if (val !== 0) {
          meterChanges.push({ label: METER_LABELS[key] || key, value: val });
        }
      }
    }

    // Build advisor reaction dialogues
    const reactionEls = [];
    if (result.reactions) {
      for (const [role, reaction] of Object.entries(result.reactions)) {
        const advisor = this.lessonData.advisors[role];
        if (!advisor) continue;

        const portraitSrc = resolvePortraitPath(this.lessonData.id, advisor.portrait);
        const reactionType = reaction.trustDelta > 0 ? 'approve' : reaction.trustDelta < 0 ? 'disapprove' : 'neutral';

        const el = createAdvisorDialogue({
          name: advisor.name,
          role,
          portraitSrc,
          text: reaction.dialogue || '',
          reaction: reactionType,
        });
        reactionEls.push(el);
      }
    }

    // Check for choice-triggered newspaper
    const choiceData = this._findChoiceInCurrentScreen(result.choiceId);
    let newspaperHtml = '';
    if (choiceData?.newspaper) {
      // Will show as modal after consequence is visible
      setTimeout(() => this._showNewspaper(choiceData.newspaper), 1500);
    }

    // Render consequence panel in viewport
    const panel = createConsequencePanel({
      title: `Decision: ${result.choiceLabel}`,
      bodyHtml: narrativeHtml,
      meterChanges,
      newspaperHtml,
      footerButtons: [], // Continue button added by awaitingContinue event
    });

    this.viewport.innerHTML = '';
    this.viewport.appendChild(panel);

    // Add advisor reactions
    if (reactionEls.length > 0) {
      const reactionSection = document.createElement('div');
      reactionSection.className = 'advisor-reactions-section';
      reactionSection.style.cssText = 'display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem;';
      for (const el of reactionEls) {
        reactionSection.appendChild(el);
      }
      this.viewport.appendChild(reactionSection);
    }

    // Animate sidebar meters
    this._renderSidebarMeters();
    this._renderSidebarAdvisors();

    this.viewport.scrollTop = 0;
  }

  /**
   * Show continue button after consequence is displayed.
   */
  _showContinueButton(nextScreenId) {
    const footer = document.createElement('div');
    footer.className = 'lesson-panel__footer';
    footer.style.cssText = 'margin-top:1.5rem;';
    footer.innerHTML = '<button class="btn btn--primary" id="btn-continue-after-decision">Continue</button>';
    this.viewport.appendChild(footer);

    footer.querySelector('#btn-continue-after-decision').addEventListener('click', () => {
      this.flow.continue();
    });
  }

  /**
   * Render an event screen (auto-effects + popup).
   */
  _renderEventScreen({ screen, gameState }) {
    this._updateProgress(screen);

    const effects = [];
    if (screen.autoEffects) {
      for (const [key, val] of Object.entries(screen.autoEffects)) {
        if (val !== 0) {
          effects.push({ label: METER_LABELS[key] || key, value: val });
        }
      }
    }

    showEventPopup({
      title: screen.title,
      text: screen.text,
      effects,
      onContinue: () => {
        this._renderSidebarMeters();
        this.flow.continue();
      },
    });
  }

  /**
   * Render the outcome / summary screen.
   */
  _renderOutcomeScreen({ screen, summary, gameState }) {
    this._updateProgress(screen);

    // Build stats from summary
    const stats = [
      { label: 'U.S. Influence', value: summary.metrics?.influence ?? '—' },
      { label: 'Regional Stability', value: summary.metrics?.stability ?? '—' },
      { label: 'Economic Gain', value: summary.metrics?.economic ?? '—' },
      { label: 'Public Support', value: summary.metrics?.support ?? '—' },
    ];

    // Add ideology
    const ideology = summary.ideology ? getDominantIdeology(summary.ideology) : 'mixed';
    stats.push({ label: 'Ideology Tendency', value: ideology.replace('_', ' ') });

    // Decisions made count
    stats.push({ label: 'Decisions Made', value: summary.decisions?.length || 0 });

    const panel = createOutcomePanel({
      title: screen.title || 'Mission Outcome',
      bodyHtml: screen.text,
      stats,
      footerButtons: [
        { label: 'View Assessment', primary: true, action: 'assessment' },
        { label: 'Return to Dashboard', primary: false, action: 'dashboard' },
      ],
    });

    this.viewport.innerHTML = '';
    this.viewport.appendChild(panel);

    // Add advisor affinity summary
    const advisorSummary = document.createElement('div');
    advisorSummary.style.cssText = 'margin-top:1.5rem;';
    const affinities = {};
    if (gameState.advisors) {
      for (const [role, a] of Object.entries(gameState.advisors)) {
        affinities[role] = a.trust;
      }
    }
    advisorSummary.appendChild(createFactionDisplay(affinities));
    this.viewport.appendChild(advisorSummary);

    // Wire buttons
    panel.querySelector('[data-action="assessment"]')?.addEventListener('click', () => {
      const assessmentScreen = this.lessonData.screens.find(s => s.type === 'assessment');
      if (assessmentScreen) {
        this.flow.goToScreen(assessmentScreen.id);
      }
    });

    panel.querySelector('[data-action="dashboard"]')?.addEventListener('click', () => {
      this.flow.complete();
      this.destroy();
      navigate('/dashboard');
    });

    this.viewport.scrollTop = 0;
  }

  /**
   * Render the assessment / quiz screen.
   */
  _renderAssessmentScreen({ screen, gameState }) {
    this._updateProgress(screen);
    this.assessmentState = { currentIndex: 0, score: 0, answers: [] };

    if (!screen.questions || screen.questions.length === 0) {
      this.viewport.innerHTML = '<div class="lesson-panel"><p>No assessment questions available.</p></div>';
      return;
    }

    this._renderAssessmentQuestion(screen, 0);
  }

  _renderAssessmentQuestion(screen, index) {
    const q = screen.questions[index];
    if (!q) return;

    const total = screen.questions.length;
    const card = createQuestionCard({
      number: index + 1,
      total,
      prompt: q.prompt,
      contextHtml: q.context || null,
    });

    this.viewport.innerHTML = '';
    this.viewport.appendChild(card);

    const optionsContainer = card.querySelector(`#question-options-${index + 1}`);
    const feedbackContainer = card.querySelector(`#question-feedback-${index + 1}`);

    if (q.type === 'multiple_choice' && q.options) {
      const letters = ['A', 'B', 'C', 'D', 'E'];
      q.options.forEach((text, i) => {
        const opt = createMCOption({ index: i, text, letter: letters[i] });
        opt.addEventListener('click', () => {
          // Disable all options
          optionsContainer.querySelectorAll('.mc-option').forEach(o => {
            o.style.pointerEvents = 'none';
          });

          // Mark correct/incorrect
          const correct = i === q.correctIndex;
          opt.classList.add(correct ? 'mc-option--correct' : 'mc-option--incorrect');
          if (!correct) {
            optionsContainer.querySelectorAll('.mc-option')[q.correctIndex]?.classList.add('mc-option--correct');
          }

          if (correct) this.assessmentState.score++;
          this.assessmentState.answers.push({ questionId: q.id, chosen: i, correct });

          // Show feedback
          const feedback = createAssessmentFeedback({ correct, explanation: q.explanation });
          feedbackContainer.appendChild(feedback);

          // Next button
          const nextBtn = document.createElement('button');
          nextBtn.className = 'btn btn--primary';
          nextBtn.style.cssText = 'margin-top:1rem;';
          nextBtn.textContent = index < total - 1 ? 'Next Question' : 'See Results';
          feedbackContainer.appendChild(nextBtn);

          nextBtn.addEventListener('click', () => {
            if (index < total - 1) {
              this._renderAssessmentQuestion(screen, index + 1);
            } else {
              this._renderAssessmentResults(screen);
            }
          });
        });
        optionsContainer.appendChild(opt);
      });
    } else if (q.type === 'multi_select' && q.options) {
      const letters = ['A', 'B', 'C', 'D', 'E'];
      const selected = new Set();

      q.options.forEach((text, i) => {
        const opt = createMCOption({ index: i, text, letter: letters[i] });
        opt.setAttribute('role', 'checkbox');
        opt.addEventListener('click', () => {
          if (selected.has(i)) {
            selected.delete(i);
            opt.classList.remove('mc-option--selected');
          } else {
            selected.add(i);
            opt.classList.add('mc-option--selected');
          }
        });
        optionsContainer.appendChild(opt);
      });

      // Submit button for multi-select
      const submitBtn = document.createElement('button');
      submitBtn.className = 'btn btn--primary';
      submitBtn.style.cssText = 'margin-top:1rem;';
      submitBtn.textContent = 'Submit Answer';
      optionsContainer.appendChild(submitBtn);

      submitBtn.addEventListener('click', () => {
        submitBtn.disabled = true;
        optionsContainer.querySelectorAll('.mc-option').forEach(o => {
          o.style.pointerEvents = 'none';
        });

        const correctSet = new Set(q.correctIndices || []);
        const isCorrect = selected.size === correctSet.size && [...selected].every(s => correctSet.has(s));

        if (isCorrect) this.assessmentState.score++;
        this.assessmentState.answers.push({ questionId: q.id, chosen: [...selected], correct: isCorrect });

        // Highlight correct/incorrect
        optionsContainer.querySelectorAll('.mc-option').forEach((o, i) => {
          if (correctSet.has(i)) o.classList.add('mc-option--correct');
          else if (selected.has(i)) o.classList.add('mc-option--incorrect');
        });

        const feedback = createAssessmentFeedback({ correct: isCorrect, explanation: q.explanation });
        feedbackContainer.appendChild(feedback);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn--primary';
        nextBtn.style.cssText = 'margin-top:1rem;';
        nextBtn.textContent = index < screen.questions.length - 1 ? 'Next Question' : 'See Results';
        feedbackContainer.appendChild(nextBtn);

        nextBtn.addEventListener('click', () => {
          if (index < screen.questions.length - 1) {
            this._renderAssessmentQuestion(screen, index + 1);
          } else {
            this._renderAssessmentResults(screen);
          }
        });
      });
    } else if (q.type === 'short_answer') {
      const textarea = createShortResponse('Type your response here...');
      optionsContainer.appendChild(textarea);

      const submitBtn = document.createElement('button');
      submitBtn.className = 'btn btn--primary';
      submitBtn.style.cssText = 'margin-top:1rem;';
      submitBtn.textContent = 'Submit Response';
      optionsContainer.appendChild(submitBtn);

      submitBtn.addEventListener('click', () => {
        submitBtn.disabled = true;
        textarea.disabled = true;

        const response = textarea.value.trim();
        this.assessmentState.answers.push({ questionId: q.id, response, correct: null });

        const feedback = createAssessmentFeedback({
          correct: true,
          explanation: q.explanation || 'Your response has been recorded. Your teacher will review it.',
        });
        feedbackContainer.appendChild(feedback);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn--primary';
        nextBtn.style.cssText = 'margin-top:1rem;';
        nextBtn.textContent = index < screen.questions.length - 1 ? 'Next Question' : 'See Results';
        feedbackContainer.appendChild(nextBtn);

        nextBtn.addEventListener('click', () => {
          if (index < screen.questions.length - 1) {
            this._renderAssessmentQuestion(screen, index + 1);
          } else {
            this._renderAssessmentResults(screen);
          }
        });
      });
    }

    this.viewport.scrollTop = 0;
  }

  _renderAssessmentResults(screen) {
    const total = screen.questions.length;
    const { score, answers } = this.assessmentState;
    const pct = Math.round((score / total) * 100);
    const isPreAssessment = !!screen.isPreAssessment;

    const title = isPreAssessment ? 'Pre-Lesson Check Complete' : 'Assessment Complete';
    const description = isPreAssessment
      ? `<p>You answered <strong>${score} of ${total}</strong> correctly (${pct}%). This baseline helps track what you learn during the lesson.</p><p>Your score here does <strong>not</strong> count toward your lesson grade.</p>`
      : `<p>You scored <strong>${score} out of ${total}</strong> (${pct}%) on the post-lesson assessment.</p>`;

    const nextButtonLabel = isPreAssessment ? 'Begin Lesson' : 'Complete Lesson';
    const nextAction = isPreAssessment ? 'continue' : 'complete';

    const panel = createOutcomePanel({
      title,
      bodyHtml: description,
      stats: [
        { label: 'Score', value: `${score}/${total}` },
        { label: 'Percentage', value: `${pct}%` },
      ],
      footerButtons: [
        { label: nextButtonLabel, primary: true, action: nextAction },
      ],
    });

    this.viewport.innerHTML = '';
    this.viewport.appendChild(panel);

    panel.querySelector(`[data-action="${nextAction}"]`)?.addEventListener('click', () => {
      const gameState = this.flow.getState();
      if (gameState) {
        if (isPreAssessment) {
          // Store pre-assessment separately — never overwrites post-assessment score
          gameState.preAssessmentScore = score;
          gameState.preAssessmentTotal = total;
          gameState.preAssessmentAnswers = answers;
        } else {
          // Post-lesson assessment — the canonical lesson score
          gameState.assessmentScore = score;
          gameState.assessmentTotal = total;
          gameState.assessmentAnswers = answers;
        }
      }

      if (isPreAssessment) {
        // Continue into the lesson (advance past the pre-assessment screen)
        this.flow.continue();
      } else {
        this.flow.complete();
      }
    });

    this.viewport.scrollTop = 0;
  }

  // ─── Event Handlers ─────────────────────────────────────

  _onMetricsChanged({ deltas, source }) {
    this._renderSidebarMeters();
    if (source === 'event') {
      showToast('Resources updated by external event', 'warning');
    }
  }

  _onDelayedConsequences(consequences) {
    for (const c of consequences) {
      if (c.narrative) {
        showToast(c.narrative, 'warning', 5000);
      }
    }
    this._renderSidebarMeters();
  }

  _flashSaveIndicator() {
    const dot = this.container?.querySelector('.save-indicator__dot');
    if (dot) {
      dot.classList.add('save-indicator__dot--active');
      setTimeout(() => dot.classList.remove('save-indicator__dot--active'), 1500);
    }
  }

  _onLessonComplete(result) {
    // Update global state
    updateGlobalAfterLesson({
      lessonId: result.lessonId,
      metrics: result.metrics,
      flags: this.flow.getState()?.flags,
      ideology: result.ideology,
      advisorAffinities: result.advisorAffinities,
      pendingDelayedConsequences: result.pendingDelayedConsequences,
      assessmentScore: this.flow.getState()?.assessmentScore,
      assessmentTotal: this.flow.getState()?.assessmentTotal,
      preAssessmentScore: this.flow.getState()?.preAssessmentScore,
      preAssessmentTotal: this.flow.getState()?.preAssessmentTotal,
    });

    showToast('Lesson complete! Your progress has been saved.', 'success');

    // Navigate back to dashboard after brief delay
    setTimeout(() => {
      this.destroy();
      navigate('/dashboard');
    }, 2000);
  }

  // ─── Helpers ────────────────────────────────────────────

  /**
   * Build sidebar step data from lesson screens.
   */
  _buildSidebarSteps(lessonData) {
    return lessonData.screens.map(s => {
      const typeLabels = {
        intro: 'Introduction',
        briefing: 'Briefing',
        context: 'Context',
        decision: 'Decision Point',
        consequence: 'Consequences',
        event: 'Event',
        outcome: 'Outcome',
        reflection: 'Reflection',
        assessment: 'Assessment',
      };
      return {
        id: s.id,
        label: s.title || typeLabels[s.type] || s.type,
        type: s.type,
      };
    });
  }

  /**
   * Update sidebar and progress bar on screen change.
   */
  _updateProgress(screen) {
    if (!screen) return;

    // Mark previous screen completed
    if (this.flow?.getCurrentScreen()?.id && this.flow.getCurrentScreen().id !== screen.id) {
      this.completedScreens.add(this.flow.getCurrentScreen().id);
    }
    // Also mark this screen's previous as completed
    const screens = this.lessonData.screens;
    const idx = screens.findIndex(s => s.id === screen.id);
    for (let i = 0; i < idx; i++) {
      this.completedScreens.add(screens[i].id);
    }

    // Update sidebar active step
    updateSidebarActiveStep(this.sidebarEl, screen.id);

    // Mark completed steps
    for (const id of this.completedScreens) {
      markSidebarStepCompleted(this.sidebarEl, id);
    }

    // Update progress bar
    const totalScreens = screens.length;
    const progressPct = Math.round(((idx + 1) / totalScreens) * 100);
    const progressFill = this.container?.querySelector('#lesson-progress-fill');
    if (progressFill) {
      progressFill.style.width = `${progressPct}%`;
    }
  }

  /**
   * Render resource meters in the sidebar.
   */
  _renderSidebarMeters() {
    if (!this.metersContainer || !this.flow) return;

    const gameState = this.flow.getState();
    if (!gameState?.metrics) return;

    const metersEl = createResourceBar(gameState.metrics, 'vertical');
    this.metersContainer.innerHTML = '';
    this.metersContainer.appendChild(metersEl);
  }

  /**
   * Render advisor dock items in the sidebar.
   */
  _renderSidebarAdvisors() {
    if (!this.advisorDockContainer || !this.flow) return;

    const gameState = this.flow.getState();
    const lessonAdvisors = this.lessonData.advisors;
    if (!gameState?.advisors || !lessonAdvisors) return;

    this.advisorDockContainer.innerHTML = '';

    for (const [role, data] of Object.entries(lessonAdvisors)) {
      const trust = gameState.advisors[role]?.trust ?? 0;
      const trustLevel = getTrustLevel(trust);
      const portraitSrc = resolvePortraitPath(this.lessonData.id, data.portrait);

      const item = document.createElement('div');
      item.className = 'advisor-dock__item';
      item.style.cssText = 'display:flex; align-items:center; gap:0.5rem; padding:0.25rem 0;';
      item.innerHTML = `
        <div style="width:32px; height:32px; border-radius:50%; overflow:hidden; flex-shrink:0; border:2px solid var(--ds-border);">
          <img src="${portraitSrc}" alt="${data.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'">
        </div>
        <div style="flex:1; min-width:0;">
          <div style="font-size:0.75rem; font-weight:600; color:var(--ds-text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${data.name}</div>
          <div style="font-size:0.625rem; color:var(--ds-text-muted); text-transform:capitalize;">${trustLevel} (${trust > 0 ? '+' : ''}${trust})</div>
        </div>
      `;
      this.advisorDockContainer.appendChild(item);
    }
  }

  /**
   * Build advisor dialogue elements from screen data.
   */
  _buildAdvisorDialogues(dialogueMap, primaryRole, gameState) {
    const els = [];
    const roles = primaryRole ? [primaryRole, ...Object.keys(dialogueMap).filter(r => r !== primaryRole)] : Object.keys(dialogueMap);

    for (const role of roles) {
      const text = dialogueMap[role];
      if (!text) continue;

      const advisor = this.lessonData.advisors[role];
      if (!advisor) continue;

      const portraitSrc = resolvePortraitPath(this.lessonData.id, advisor.portrait);
      const el = createAdvisorDialogue({
        name: advisor.name,
        role,
        portraitSrc,
        text,
      });
      els.push(el);
    }

    return els;
  }

  /**
   * Show a newspaper modal.
   * Respects `newspaper.showCondition` — if present, evaluates against current
   * game state before displaying. Suppresses the modal if the condition is false.
   *
   * @param {Object} newspaper - Newspaper data from screen/choice definition
   */
  _showNewspaper(newspaper) {
    if (!newspaper) return;

    // Evaluate showCondition before displaying
    if (newspaper.showCondition) {
      const gameState = this.flow?.getState();
      if (!gameState) return;
      const conditionMet = evaluateCondition(newspaper.showCondition, gameState);
      if (!conditionMet) return;
    }

    const imageSrc = newspaper.asset
      ? resolveNewspaperPath(this.lessonData.id, newspaper.asset)
      : '';

    showNewspaperModal({
      imageSrc,
      headline: newspaper.headline,
      perspective: newspaper.perspective,
      bodyText: newspaper.bodyText,
    });
  }

  /**
   * Wire continue buttons on panels.
   */
  _wireContinueButtons(panel) {
    panel.querySelectorAll('[data-action="continue"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.flow.continue();
      });
    });
  }

  /**
   * Find a choice object in the current decision screen.
   */
  _findChoiceInCurrentScreen(choiceId) {
    const screen = this.flow?.getCurrentScreen();
    if (!screen?.choices) return null;
    return screen.choices.find(c => c.id === choiceId);
  }
}

// ─── Singleton ──────────────────────────────────────────

let activeRenderer = null;

export function getGameRenderer() {
  if (!activeRenderer) {
    activeRenderer = new GameRenderer();
  }
  return activeRenderer;
}

export function resetGameRenderer() {
  if (activeRenderer) {
    activeRenderer.destroy();
  }
  activeRenderer = null;
}
