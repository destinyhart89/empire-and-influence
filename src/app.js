/**
 * EMPIRE & INFLUENCE — Application Entry Point
 *
 * Initializes the application state, registers routes, and starts the router.
 * Uses state-manager.js (Phase 3) exclusively for persistence.
 */

import {
  getAppState,
  subscribeAppState,
  hydrateAppState,
} from './core/app-state.js';
import { loadShared } from './core/content-loader.js';
import { setSharedContent } from './engine/advisor-system.js';
import { route, setNotFound, startRouter } from './core/router.js';
import {
  renderLogin,
  renderDashboard,
  renderLessonPlayer,
  renderTeacherDashboard,
  renderNotFound,
} from './components/views.js';

// ─── Initialize ─────────────────────────────────────────────

async function init() {
  // Load shared content (role labels, advisor fallback strings) from JSON.
  // Must complete before any lesson renders. Fails silently — JS fallbacks remain active.
  const shared = await loadShared();
  setSharedContent(shared);

  // Load existing state (returning student)
  hydrateAppState();

  // Register routes
  route('/', renderLogin);
  route('/dashboard', renderDashboard);
  route('/lesson/:id', renderLessonPlayer);
  route('/teacher', renderTeacherDashboard);
  route('/teacher/reports', renderTeacherDashboard);
  setNotFound(renderNotFound);

  // Mount router
  const mountPoint = document.getElementById('app-main');
  if (!mountPoint) {
    console.error('[App] Mount point #app-main not found');
    return;
  }
  startRouter(mountPoint);

  // Render header
  renderHeader();

  // Subscribe to state changes for header updates
  subscribeAppState(() => renderHeader());

  console.log('[Empire & Influence] Application initialized.');
}

// ─── Header ─────────────────────────────────────────────────

function renderHeader() {
  const header = document.getElementById('app-header');
  if (!header) return;

  const state = getAppState();
  const isLoggedIn = !!state.playerName;

  header.innerHTML = `
    <span class="app-header__title">Empire & Influence</span>
    <nav class="app-header__nav">
      ${isLoggedIn ? `
        <a href="#/dashboard" class="app-header__link">Dashboard</a>
        ${state.role === 'teacher' ? '<a href="#/teacher" class="app-header__link">Teacher</a>' : ''}
        <span class="app-header__link text-muted">${state.playerName}</span>
      ` : ''}
    </nav>
  `;
}

// ─── Boot ───────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
