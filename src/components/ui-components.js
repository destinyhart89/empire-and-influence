/**
 * EMPIRE & INFLUENCE — UI Component Library
 *
 * Reusable vanilla JS component functions.
 * Each function returns an HTMLElement or HTML string.
 * All components follow the design system in design-system.css.
 */

import { createAssetImage, resolvePortraitPath, resolveMapPath, resolveNewspaperPath } from '../core/asset-loader.js';

// ═══════════════════════════════════════════════════════════
// 1. LAYOUT HELPERS
// ═══════════════════════════════════════════════════════════

/**
 * Build the app shell with top nav, optional sidebar, and content viewport.
 */
export function renderAppShell(container, { showSidebar = false, sidebarContent = '', navConfig = {} } = {}) {
  container.innerHTML = `
    <div class="app-shell">
      <nav class="top-nav" role="navigation" aria-label="Main navigation">
        <span class="top-nav__brand">${navConfig.brand || 'Empire & Influence'}</span>
        <div class="top-nav__center">
          ${navConfig.lessonTitle ? `
            <span class="top-nav__lesson-title">${navConfig.lessonTitle}</span>
            <span class="top-nav__lesson-era">${navConfig.era || ''}</span>
          ` : ''}
        </div>
        <div class="top-nav__right">
          ${navConfig.saveIndicator ? '<div class="save-indicator"><span class="save-indicator__dot"></span> <span>Saved</span></div>' : ''}
          ${navConfig.userName ? `<span class="top-nav__user">${navConfig.userName}</span>` : ''}
          ${navConfig.rightHtml || ''}
        </div>
      </nav>
      ${navConfig.showProgress ? '<div class="lesson-progress"><div class="lesson-progress__fill" id="lesson-progress-fill" style="width:0%"></div></div>' : ''}
      <div class="app-body">
        ${showSidebar ? `<aside class="sidebar" id="app-sidebar" role="complementary" aria-label="Lesson progression">${sidebarContent}</aside>` : ''}
        <div class="content-viewport" id="content-viewport">
          <div class="content-viewport__inner" id="viewport-inner"></div>
        </div>
      </div>
    </div>
  `;
  return container;
}

// ═══════════════════════════════════════════════════════════
// 2. LESSON PANELS
// ═══════════════════════════════════════════════════════════

/**
 * Briefing Panel — opening context for a lesson with map integration.
 */
export function createBriefingPanel({ title, subtitle, bodyHtml, mapSrc, mapAlt, mapCaption, lessonId, footerButtons = [] }) {
  const el = document.createElement('div');
  el.className = 'lesson-panel briefing-panel';
  el.setAttribute('role', 'region');
  el.setAttribute('aria-label', 'Mission briefing');

  const mapSlot = mapSrc
    ? `<div class="briefing-panel__map-slot">
         <div class="map-frame" id="briefing-map">
           <img class="map-frame__image" src="${mapSrc}" alt="${mapAlt || 'Lesson map'}" onerror="this.parentElement.innerHTML='<div class=\\'asset-placeholder asset-placeholder--map\\'><div>Map unavailable</div></div>'">
           ${mapCaption ? `<div class="map-frame__overlay"><div class="map-frame__caption">${mapCaption}</div></div>` : ''}
         </div>
       </div>`
    : '';

  el.innerHTML = `
    <div class="lesson-panel__header">
      <h2 class="lesson-panel__title">${title}</h2>
      ${subtitle ? `<p class="lesson-panel__subtitle">${subtitle}</p>` : ''}
    </div>
    ${mapSlot}
    <div class="lesson-panel__body">${bodyHtml}</div>
    ${footerButtons.length ? `
      <div class="lesson-panel__footer">
        ${footerButtons.map(b => `<button class="btn ${b.primary ? 'btn--primary' : 'btn--secondary'}" data-action="${b.action}">${b.label}</button>`).join('')}
      </div>
    ` : ''}
  `;
  return el;
}

/**
 * Context Panel — provides historical background with optional source badge.
 */
export function createContextPanel({ title, sourceBadge, bodyHtml, assetHtml, footerButtons = [] }) {
  const el = document.createElement('div');
  el.className = 'lesson-panel context-panel';
  el.setAttribute('role', 'region');
  el.setAttribute('aria-label', 'Historical context');

  el.innerHTML = `
    <div class="lesson-panel__header">
      ${sourceBadge ? `<div class="context-panel__source-badge">${sourceBadge}</div>` : ''}
      <h2 class="lesson-panel__title">${title}</h2>
    </div>
    ${assetHtml ? `<div class="context-panel__asset">${assetHtml}</div>` : ''}
    <div class="lesson-panel__body">${bodyHtml}</div>
    ${footerButtons.length ? `
      <div class="lesson-panel__footer">
        ${footerButtons.map(b => `<button class="btn ${b.primary ? 'btn--primary' : 'btn--secondary'}" data-action="${b.action}">${b.label}</button>`).join('')}
      </div>
    ` : ''}
  `;
  return el;
}

/**
 * Decision Panel — presents choices with advisor alignment.
 */
export function createDecisionPanel({ title, promptHtml, choices = [], advisorDialogues = {} }) {
  const el = document.createElement('div');
  el.className = 'lesson-panel decision-panel';
  el.setAttribute('role', 'region');
  el.setAttribute('aria-label', 'Decision point');

  const choicesHtml = choices.map((c, i) => `
    <div class="decision-option" role="button" tabindex="0" data-choice-id="${c.id}" aria-label="${c.label}">
      <div class="decision-option__label">${c.label}</div>
      ${c.description ? `<div class="decision-option__desc">${c.description}</div>` : ''}
      <div class="decision-option__meta">
        ${c.advisorAlignment ? `
          <span class="decision-option__advisor-tag decision-option__advisor-tag--${c.advisorAlignment}">
            ${c.advisorAlignment}
          </span>
        ` : ''}
        ${c.riskLevel ? `
          <span class="decision-option__risk" aria-label="Risk level: ${c.riskLevel}">
            ${renderRiskDots(c.riskLevel)}
          </span>
        ` : ''}
      </div>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="lesson-panel__header">
      <h2 class="lesson-panel__title">${title}</h2>
    </div>
    <div class="decision-panel__prompt">${promptHtml}</div>
    <div class="decision-panel__options" role="group" aria-label="Available choices">
      ${choicesHtml}
    </div>
  `;

  // Keyboard support for options
  el.querySelectorAll('.decision-option').forEach(opt => {
    opt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        opt.click();
      }
    });
  });

  return el;
}

/**
 * Consequence Panel — shows the result of a decision.
 */
export function createConsequencePanel({ title, bodyHtml, meterChanges = [], newspaperHtml, footerButtons = [] }) {
  const el = document.createElement('div');
  el.className = 'lesson-panel consequence-panel';
  el.setAttribute('role', 'region');
  el.setAttribute('aria-label', 'Decision consequences');

  const deltasHtml = meterChanges.map(m => {
    const sign = m.value > 0 ? '+' : '';
    const cls = m.value > 0 ? 'positive' : 'negative';
    return `<span class="consequence-panel__delta consequence-panel__delta--${cls}">${m.label}: ${sign}${m.value}</span>`;
  }).join('');

  el.innerHTML = `
    <div class="lesson-panel__header">
      <h2 class="lesson-panel__title">${title || 'Consequences'}</h2>
    </div>
    <div class="lesson-panel__body">${bodyHtml}</div>
    ${deltasHtml ? `<div class="consequence-panel__meter-changes">${deltasHtml}</div>` : ''}
    ${newspaperHtml ? `<div class="consequence-panel__newspaper mt-md">${newspaperHtml}</div>` : ''}
    ${footerButtons.length ? `
      <div class="lesson-panel__footer">
        ${footerButtons.map(b => `<button class="btn ${b.primary ? 'btn--primary' : 'btn--secondary'}" data-action="${b.action}">${b.label}</button>`).join('')}
      </div>
    ` : ''}
  `;
  return el;
}

/**
 * Outcome Summary Panel — end-of-lesson summary with stats.
 */
export function createOutcomePanel({ title, bodyHtml, stats = [], footerButtons = [] }) {
  const el = document.createElement('div');
  el.className = 'lesson-panel outcome-panel';
  el.setAttribute('role', 'region');
  el.setAttribute('aria-label', 'Lesson outcome summary');

  const statsHtml = stats.map(s => `
    <div class="outcome-stat">
      <div class="outcome-stat__value">${s.value}</div>
      <div class="outcome-stat__label">${s.label}</div>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="lesson-panel__header">
      <h2 class="lesson-panel__title">${title || 'Outcome Summary'}</h2>
    </div>
    <div class="lesson-panel__body">${bodyHtml}</div>
    ${statsHtml ? `<div class="outcome-panel__stats">${statsHtml}</div>` : ''}
    ${footerButtons.length ? `
      <div class="lesson-panel__footer">
        ${footerButtons.map(b => `<button class="btn ${b.primary ? 'btn--primary' : 'btn--secondary'}" data-action="${b.action}">${b.label}</button>`).join('')}
      </div>
    ` : ''}
  `;
  return el;
}

// ═══════════════════════════════════════════════════════════
// 3. ADVISOR COMPONENTS
// ═══════════════════════════════════════════════════════════

/**
 * Advisor Selection Card — used during advisor selection screens.
 */
export function createAdvisorSelectCard({ name, role, portraitSrc, selected = false }) {
  const el = document.createElement('div');
  el.className = `advisor-select-card ${selected ? 'advisor-select-card--selected' : ''}`;
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-pressed', selected.toString());
  el.dataset.role = role;

  const imgHtml = portraitSrc
    ? `<img class="advisor-select-card__portrait" src="${portraitSrc}" alt="Portrait of ${name}" onerror="this.outerHTML='<div class=\\'asset-placeholder asset-placeholder--portrait\\'><div>Portrait</div></div>'">`
    : `<div class="asset-placeholder asset-placeholder--portrait"><div>Portrait</div></div>`;

  el.innerHTML = `
    ${imgHtml}
    <div class="advisor-select-card__name">${name}</div>
    <div class="advisor-select-card__role advisor-select-card__role--${role}">${role}</div>
  `;

  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
  });

  return el;
}

/**
 * Advisor Dialogue Box — shows advisor speaking.
 */
export function createAdvisorDialogue({ name, role, portraitSrc, text, reaction }) {
  const el = document.createElement('div');
  el.className = 'advisor-dialogue';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');

  const imgHtml = portraitSrc
    ? `<div class="advisor-dialogue__portrait-wrap"><img class="advisor-dialogue__portrait" src="${portraitSrc}" alt="${name}" onerror="this.outerHTML='<div class=\\'asset-placeholder asset-placeholder--portrait\\'></div>'"></div>`
    : `<div class="advisor-dialogue__portrait-wrap"><div class="asset-placeholder asset-placeholder--portrait" style="width:100%;height:100%;"></div></div>`;

  const reactionHtml = reaction ? createReactionBadgeHtml(reaction) : '';

  el.innerHTML = `
    ${imgHtml}
    <div class="advisor-dialogue__content">
      <div class="advisor-dialogue__name advisor-dialogue__name--${role}">${name} ${reactionHtml}</div>
      <div class="advisor-dialogue__text">${text}</div>
    </div>
  `;
  return el;
}

/**
 * Advisor Reaction Badge.
 */
function createReactionBadgeHtml(reaction) {
  const icons = { approve: '\u2713', disapprove: '\u2717', neutral: '\u2014' };
  return `<span class="advisor-reaction advisor-reaction--${reaction}">
    <span class="advisor-reaction__icon">${icons[reaction] || ''}</span>
    ${reaction}
  </span>`;
}

/**
 * Advisor Dock — persistent advisor strip at bottom of lesson.
 */
export function createAdvisorDock(advisors = [], activeRole = null) {
  const el = document.createElement('div');
  el.className = 'advisor-dock';
  el.setAttribute('role', 'toolbar');
  el.setAttribute('aria-label', 'Your advisors');

  el.innerHTML = advisors.map(a => `
    <div class="advisor-dock__item ${a.role === activeRole ? 'advisor-dock__item--active' : ''}" data-role="${a.role}" role="button" tabindex="0">
      <div class="advisor-dock__thumb-wrap">
        ${a.portraitSrc
          ? `<img class="advisor-dock__thumb" src="${a.portraitSrc}" alt="${a.name}" onerror="this.style.display='none'">`
          : `<div class="advisor-dock__thumb" style="background:var(--ds-light);"></div>`
        }
      </div>
      <span class="advisor-dock__name">${a.name}</span>
    </div>
  `).join('');

  return el;
}

// ═══════════════════════════════════════════════════════════
// 4. RESOURCE METERS
// ═══════════════════════════════════════════════════════════

/**
 * Resource Bar — full meter display with 4 tracked resources.
 */
export function createResourceBar(meters, layout = 'vertical') {
  const el = document.createElement('div');
  el.className = `resource-bar ${layout === 'horizontal' ? 'resource-bar--horizontal' : ''}`;
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', 'Resource meters');

  const meterConfigs = [
    { key: 'influence',  label: 'U.S. Influence', color: 'influence' },
    { key: 'stability',  label: 'Regional Stability', color: 'stability' },
    { key: 'economic',   label: 'Economic Gain', color: 'economic' },
    { key: 'support',    label: 'Public Support', color: 'support' },
  ];

  el.innerHTML = meterConfigs.map(cfg => {
    const value = meters[cfg.key] ?? 50;
    return `
      <div class="resource-meter" data-meter="${cfg.key}" role="meter" aria-label="${cfg.label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}">
        <div class="resource-meter__header">
          <span class="resource-meter__label">${cfg.label}</span>
          <span class="resource-meter__value resource-meter__value--${cfg.color}">${value}</span>
        </div>
        <div class="resource-meter__track">
          <div class="resource-meter__fill resource-meter__fill--${cfg.color}" style="width: ${value}%"></div>
        </div>
      </div>
    `;
  }).join('');

  return el;
}

/**
 * Animate a meter change with delta flash.
 */
export function animateMeterChange(meterEl, newValue, delta) {
  const fill = meterEl.querySelector('.resource-meter__fill');
  const valueEl = meterEl.querySelector('.resource-meter__value');

  if (fill) fill.style.width = `${newValue}%`;
  if (valueEl) valueEl.textContent = newValue;
  meterEl.setAttribute('aria-valuenow', newValue);

  if (delta !== 0) {
    const deltaEl = document.createElement('span');
    deltaEl.className = `resource-meter__delta resource-meter__delta--${delta > 0 ? 'up' : 'down'}`;
    deltaEl.textContent = `${delta > 0 ? '+' : ''}${delta}`;
    const track = meterEl.querySelector('.resource-meter__track');
    if (track) {
      track.style.position = 'relative';
      track.appendChild(deltaEl);
      setTimeout(() => deltaEl.remove(), 1300);
    }
  }
}

/**
 * Faction / Advisor Affinity Display.
 */
export function createFactionDisplay(affinities) {
  const el = document.createElement('div');
  el.className = 'faction-display';
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', 'Advisor affinity');

  const roles = [
    { key: 'economic', label: 'Economic' },
    { key: 'security', label: 'Security' },
    { key: 'diplomatic', label: 'Diplomatic' },
  ];

  el.innerHTML = roles.map(r => `
    <div class="faction-badge">
      <span class="faction-badge__dot faction-badge__dot--${r.key}"></span>
      ${r.label}:
      <span class="faction-badge__value">${affinities[r.key] || 0}</span>
    </div>
  `).join('');

  return el;
}

// ═══════════════════════════════════════════════════════════
// 5. ASSESSMENT COMPONENTS
// ═══════════════════════════════════════════════════════════

/**
 * Question Card — wraps a single assessment question.
 */
export function createQuestionCard({ number, total, prompt, contextHtml }) {
  const el = document.createElement('div');
  el.className = 'assessment-card';
  el.setAttribute('role', 'group');
  el.setAttribute('aria-label', `Question ${number} of ${total}`);

  el.innerHTML = `
    <div class="assessment-card__number">Question ${number} of ${total}</div>
    ${contextHtml ? `<div class="assessment-card__context">${contextHtml}</div>` : ''}
    <div class="assessment-card__prompt">${prompt}</div>
    <div class="assessment-card__options" id="question-options-${number}"></div>
    <div class="assessment-card__feedback" id="question-feedback-${number}"></div>
  `;
  return el;
}

/**
 * Multiple Choice Option.
 */
export function createMCOption({ index, text, letter }) {
  const el = document.createElement('div');
  el.className = 'mc-option';
  el.setAttribute('role', 'radio');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-checked', 'false');
  el.dataset.index = index;

  el.innerHTML = `
    <div class="mc-option__marker"></div>
    <div class="mc-option__text">${letter ? `<strong>${letter}.</strong> ` : ''}${text}</div>
  `;

  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
  });

  return el;
}

/**
 * Short Response Input.
 */
export function createShortResponse(placeholder = 'Type your response...') {
  const el = document.createElement('textarea');
  el.className = 'short-response';
  el.placeholder = placeholder;
  el.setAttribute('aria-label', 'Your response');
  return el;
}

/**
 * Assessment Feedback.
 */
export function createAssessmentFeedback({ correct, explanation }) {
  const el = document.createElement('div');
  el.className = `assessment-feedback assessment-feedback--${correct ? 'correct' : 'incorrect'}`;
  el.innerHTML = `
    <strong>${correct ? 'Correct!' : 'Not quite.'}</strong>
    ${explanation ? `<div class="assessment-feedback__explanation">${explanation}</div>` : ''}
  `;
  return el;
}

// ═══════════════════════════════════════════════════════════
// 6. MODAL + OVERLAY SYSTEM
// ═══════════════════════════════════════════════════════════

let activeModal = null;

/**
 * Show a modal overlay. Returns a reference for programmatic close.
 */
export function showModal(contentEl, { onClose, size = 'default' } = {}) {
  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  // Create modal wrapper
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal__close';
  closeBtn.innerHTML = '\u00D7';
  closeBtn.setAttribute('aria-label', 'Close');

  modal.appendChild(closeBtn);
  modal.appendChild(contentEl);

  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  // Trigger animation
  requestAnimationFrame(() => {
    backdrop.classList.add('modal-backdrop--visible');
    modal.classList.add('modal--visible');
  });

  // Close handlers
  function close() {
    backdrop.classList.remove('modal-backdrop--visible');
    modal.classList.remove('modal--visible');
    setTimeout(() => {
      backdrop.remove();
      modal.remove();
      activeModal = null;
      if (onClose) onClose();
    }, 300);
  }

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  modal.addEventListener('click', (e) => e.stopPropagation());

  // Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
  };
  document.addEventListener('keydown', escHandler);

  activeModal = { close, modal, backdrop };
  return activeModal;
}

/**
 * Show a newspaper overlay modal.
 */
export function showNewspaperModal({ imageSrc, headline, perspective, bodyText, onClose }) {
  const content = document.createElement('div');
  content.className = 'newspaper-modal';

  content.innerHTML = `
    <div class="newspaper-modal__image-frame">
      <img src="${imageSrc}" alt="Newspaper: ${headline || ''}" onerror="this.outerHTML='<div class=\\'asset-placeholder asset-placeholder--newspaper\\'><div>Newspaper unavailable</div></div>'">
    </div>
    ${headline ? `<div class="newspaper-modal__headline">${headline}</div>` : ''}
    ${perspective ? `<div class="newspaper-modal__perspective">${perspective}</div>` : ''}
    ${bodyText ? `<div class="newspaper-modal__body">${bodyText}</div>` : ''}
  `;

  return showModal(content, { onClose });
}

/**
 * Show an event popup modal.
 */
export function showEventPopup({ iconSrc, title, text, effects = [], onClose, onContinue }) {
  const content = document.createElement('div');
  content.className = 'event-popup';

  const effectsHtml = effects.map(e => {
    const sign = e.value > 0 ? '+' : '';
    const cls = e.value > 0 ? 'positive' : 'negative';
    return `<span class="consequence-panel__delta consequence-panel__delta--${cls}">${e.label}: ${sign}${e.value}</span>`;
  }).join('');

  content.innerHTML = `
    ${iconSrc ? `<img class="event-popup__icon" src="${iconSrc}" alt="Event icon" onerror="this.style.display='none'">` : ''}
    <div class="event-popup__title">${title}</div>
    <div class="event-popup__text">${text}</div>
    ${effectsHtml ? `<div class="event-popup__effects">${effectsHtml}</div>` : ''}
    <div class="lesson-panel__footer">
      <button class="btn btn--primary" id="event-continue">Continue</button>
    </div>
  `;

  const ref = showModal(content, { onClose });
  content.querySelector('#event-continue')?.addEventListener('click', () => {
    ref.close();
    if (onContinue) onContinue();
  });
  return ref;
}

/**
 * Show advisor interruption modal.
 */
export function showAdvisorInterruption({ name, role, portraitSrc, text, onClose }) {
  const dialogue = createAdvisorDialogue({ name, role, portraitSrc, text });
  const wrapper = document.createElement('div');
  wrapper.className = 'advisor-interruption';
  wrapper.appendChild(dialogue);

  const footer = document.createElement('div');
  footer.className = 'lesson-panel__footer';
  footer.innerHTML = '<button class="btn btn--primary" id="interruption-dismiss">Understood</button>';
  wrapper.appendChild(footer);

  const ref = showModal(wrapper, { onClose });
  footer.querySelector('#interruption-dismiss')?.addEventListener('click', () => ref.close());
  return ref;
}

// ═══════════════════════════════════════════════════════════
// 7. TOAST / NOTIFICATION SYSTEM
// ═══════════════════════════════════════════════════════════

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Show a toast notification.
 * @param {string} message
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {number} duration - ms before auto-dismiss
 */
export function showToast(message, type = 'info', duration = 3500) {
  const container = ensureToastContainer();
  const icons = { success: '\u2713', error: '\u2717', warning: '\u26A0', info: '\u2139' };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || ''}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast--exiting');
    setTimeout(() => toast.remove(), 300);
  }, duration);

  return toast;
}

// ═══════════════════════════════════════════════════════════
// 8. SYSTEM STATES
// ═══════════════════════════════════════════════════════════

export function renderLoadingState(container, text = 'Loading...') {
  container.innerHTML = `
    <div class="state-loading">
      <div class="state-loading__spinner" role="status" aria-label="Loading"></div>
      <div class="state-loading__text">${text}</div>
    </div>
  `;
}

export function renderEmptyState(container, { icon = '', title = 'Nothing here yet', desc = '' } = {}) {
  container.innerHTML = `
    <div class="state-empty">
      ${icon ? `<div class="state-empty__icon">${icon}</div>` : ''}
      <div class="state-empty__title">${title}</div>
      ${desc ? `<div class="state-empty__desc">${desc}</div>` : ''}
    </div>
  `;
}

export function renderErrorState(container, { title = 'Something went wrong', desc = '', retryAction } = {}) {
  container.innerHTML = `
    <div class="state-error">
      <div class="state-error__icon">\u2717</div>
      <div class="state-error__title">${title}</div>
      ${desc ? `<div class="state-error__desc">${desc}</div>` : ''}
      ${retryAction ? '<button class="btn btn--secondary mt-md" id="retry-btn">Try Again</button>' : ''}
    </div>
  `;
  if (retryAction) {
    container.querySelector('#retry-btn')?.addEventListener('click', retryAction);
  }
}

export function renderNoDataState(container, text = 'No data available') {
  container.innerHTML = `
    <div class="state-nodata">
      <div class="state-nodata__text">${text}</div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════

function renderRiskDots(level) {
  const levels = { low: 1, medium: 2, high: 3 };
  const count = levels[level] || 0;
  return Array.from({ length: 3 }, (_, i) =>
    `<span class="decision-option__risk-dot ${i < count ? `decision-option__risk-dot--${level === 'high' ? 'high' : level === 'medium' ? 'med' : 'low'}` : ''}"></span>`
  ).join('');
}
