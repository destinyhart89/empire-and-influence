/**
 * EMPIRE & INFLUENCE — Sidebar / Lesson Progression Panel
 *
 * Renders the lesson step sidebar showing current position,
 * completed steps, and upcoming steps.
 */

/**
 * Build sidebar HTML for a lesson.
 * @param {Object} options
 * @param {Array} options.steps - Array of { id, label, type }
 * @param {string} options.currentStepId - Active step ID
 * @param {Set|Array} options.completedStepIds - Completed step IDs
 * @param {Object} options.lessonMeta - { id, title, era }
 * @returns {string} HTML string
 */
export function buildLessonSidebar({ steps = [], currentStepId, completedStepIds = [], lessonMeta = {} }) {
  const completed = new Set(completedStepIds);

  const stepsHtml = steps.map(step => {
    const isCurrent = step.id === currentStepId;
    const isCompleted = completed.has(step.id);
    const isLocked = !isCurrent && !isCompleted && steps.indexOf(step) > steps.findIndex(s => s.id === currentStepId);

    let cls = 'sidebar-step';
    if (isCurrent) cls += ' sidebar-step--active';
    else if (isCompleted) cls += ' sidebar-step--completed';
    else if (isLocked) cls += ' sidebar-step--locked';

    const icon = isCompleted ? '\u2713' : isCurrent ? '\u25CF' : '\u25CB';

    return `
      <div class="${cls}" data-step-id="${step.id}" ${!isLocked ? 'role="button" tabindex="0"' : ''}>
        <span class="sidebar-step__dot" aria-hidden="true"></span>
        <span>${step.label}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="sidebar__section">
      <div class="sidebar__heading">
        Lesson ${lessonMeta.id || ''}
      </div>
      <div style="font-size:0.875rem; color:var(--ds-text); margin-bottom:0.25rem; font-weight:600;">
        ${lessonMeta.title || ''}
      </div>
      <div style="font-size:0.6875rem; color:var(--ds-text-muted); text-transform:uppercase; letter-spacing:1px;">
        ${lessonMeta.era || ''}
      </div>
    </div>

    <div class="sidebar__section">
      <div class="sidebar__heading">Progress</div>
      ${stepsHtml}
    </div>

    <div class="sidebar__section" id="sidebar-advisor-dock">
      <div class="sidebar__heading">Advisors</div>
      <div id="sidebar-advisors" style="display:flex; flex-direction:column; gap:0.5rem;">
        <!-- Advisor dock items injected by lesson engine -->
      </div>
    </div>

    <div class="sidebar__section" id="sidebar-events-section" style="display:none;">
      <div class="sidebar__heading">Triggered Events</div>
      <div class="triggered-events" id="sidebar-triggered-events">
        <!-- Triggered event cards injected here -->
      </div>
    </div>

    <div class="sidebar__section" style="margin-top:auto;">
      <div class="sidebar__heading">Resources</div>
      <div id="sidebar-meters">
        <!-- Resource meters injected here -->
      </div>
    </div>
  `;
}

/**
 * Update sidebar step active state.
 */
export function updateSidebarActiveStep(sidebarEl, newStepId) {
  if (!sidebarEl) return;
  sidebarEl.querySelectorAll('.sidebar-step').forEach(el => {
    el.classList.remove('sidebar-step--active');
    if (el.dataset.stepId === newStepId) {
      el.classList.add('sidebar-step--active');
    }
  });
}

/**
 * Mark a step as completed in the sidebar.
 */
export function markSidebarStepCompleted(sidebarEl, stepId) {
  if (!sidebarEl) return;
  const step = sidebarEl.querySelector(`[data-step-id="${stepId}"]`);
  if (step) {
    step.classList.remove('sidebar-step--active', 'sidebar-step--locked');
    step.classList.add('sidebar-step--completed');
  }
}
