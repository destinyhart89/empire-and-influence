/**
 * EMPIRE & INFLUENCE — View Components
 *
 * Each view is a function that receives a container element and renders into it.
 * Uses state-manager.js (Phase 3) exclusively for state management.
 */

import {
  loadGlobalState,
  createGlobalState,
  initSession,
  exportAllData,
} from '../engine/state-manager.js';
import {
  getAppState,
  setAppState,
  resetAppState,
} from '../core/app-state.js';
import { navigate } from '../core/router.js';
import { loadLesson } from '../core/content-loader.js';
import { LESSONS, isLessonUnlocked } from '../data/lessons-index.js';
import { getGameRenderer, resetGameRenderer } from './game-renderer.js';
import { METER_KEYS, METER_LABELS } from '../engine/metrics-system.js';

// ─── Login / Entry Screen ───────────────────────────────────

export function renderLogin(params, container) {
  container.innerHTML = `
    <div class="login-screen">
      <div class="login-screen__hero">
        <h1 class="login-screen__title">Empire & Influence</h1>
        <p class="login-screen__subtitle">The Advisor</p>
        <p class="login-screen__tagline">A Strategy Game of U.S. Imperialism in Latin America</p>
        <p class="login-screen__period text-muted">AP U.S. History — Periods 7–9</p>
      </div>

      <div class="login-screen__form card">
        <h3 class="mb-md">Enter the Game</h3>

        <div class="form-group">
          <label for="student-name">Your Name</label>
          <input type="text" id="student-name" placeholder="First and Last Name" class="form-input" autocomplete="name">
        </div>

        <div class="form-group">
          <label for="class-code">Class Code</label>
          <input type="text" id="class-code" placeholder="e.g., APUSH-3B" class="form-input" autocomplete="off">
        </div>

        <button class="btn btn--primary login-screen__submit" id="btn-student-login">
          Start as Student
        </button>

        <div class="login-screen__divider">
          <span>or</span>
        </div>

        <button class="btn btn--secondary" id="btn-teacher-login">
          Teacher Dashboard
        </button>
      </div>

      <p class="login-screen__credit text-muted text-center mt-lg">
        Catalyst 4 Curiosity
      </p>
    </div>
  `;

  // Hydrate if returning student
  const state = getAppState();
  if (state.playerName) {
    container.querySelector('#student-name').value = state.playerName;
    container.querySelector('#class-code').value = state.classCode || '';
  }

  container.querySelector('#btn-student-login').addEventListener('click', () => {
    const name = container.querySelector('#student-name').value.trim();
    const code = container.querySelector('#class-code').value.trim();
    if (!name) {
      container.querySelector('#student-name').focus();
      return;
    }
    // Initialize session via state-manager
    const global = initSession(name, code, 'student');
    setAppState(global);
    navigate('/dashboard');
  });

  container.querySelector('#btn-teacher-login').addEventListener('click', () => {
    const global = initSession('Teacher', '', 'teacher');
    setAppState(global);
    navigate('/teacher');
  });

  // Allow Enter key
  container.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') container.querySelector('#btn-student-login').click();
    });
  });
}

// ─── Student Dashboard (Lesson Selector) ────────────────────

export function renderDashboard(params, container) {
  const state = getAppState();

  if (!state.playerName) {
    navigate('/');
    return;
  }

  const completedLessons = state.completedLessons || [];
  const metrics = state.metrics || { influence: 50, stability: 50, economic: 50, support: 50 };

  const metersHtml = renderMetersHtml(metrics);
  const lessonsHtml = LESSONS.map(lesson => {
    const unlocked = isLessonUnlocked(lesson.id, completedLessons);
    const completed = completedLessons.includes(lesson.id);
    const statusClass = completed ? 'card--completed' : unlocked ? '' : 'card--locked';
    const statusBadge = completed ? '<span class="badge badge--success">Complete</span>'
      : unlocked ? '<span class="badge badge--active">Available</span>'
      : '<span class="badge badge--locked">Locked</span>';

    return `
      <div class="lesson-card card ${statusClass}" data-lesson-id="${lesson.id}" ${unlocked ? 'role="button" tabindex="0"' : ''}>
        <div class="lesson-card__header">
          <span class="lesson-card__number">Lesson ${lesson.id}</span>
          ${statusBadge}
        </div>
        <h3 class="lesson-card__title">${lesson.title}</h3>
        <p class="lesson-card__subtitle text-muted">${lesson.subtitle} — ${lesson.period}</p>
        <p class="lesson-card__desc">${lesson.description}</p>
        <div class="lesson-card__advisors text-muted">
          Advisors: ${lesson.advisors.join(' · ')}
        </div>
        <div class="lesson-card__era">
          <span class="era-badge era-badge--${lesson.era}">${lesson.era.replace('-', ' ')}</span>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="dashboard">
      <div class="dashboard__header">
        <div>
          <h2>Welcome, ${state.playerName}</h2>
          <p class="text-muted">${state.classCode ? `Class: ${state.classCode}` : 'No class code'}</p>
        </div>
        <div class="dashboard__actions">
          <button class="btn btn--secondary" id="btn-export-progress" title="Download your progress">Download Progress</button>
          <button class="btn btn--secondary" id="btn-logout">Log Out</button>
        </div>
      </div>

      <div class="dashboard__meters">
        <h4 class="text-gold mb-md">Global Standing</h4>
        ${metersHtml}
      </div>

      <div class="dashboard__progress">
        <p class="text-muted">${completedLessons.length} of 8 lessons completed</p>
        <div class="progress-bar">
          <div class="progress-bar__fill" style="width: ${(completedLessons.length / 8) * 100}%"></div>
        </div>
      </div>

      <h3 class="mt-lg mb-md">Lessons</h3>
      <div class="lesson-grid">
        ${lessonsHtml}
      </div>
    </div>
  `;

  // Lesson click handlers
  container.querySelectorAll('.lesson-card[role="button"]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.lessonId;
      navigate(`/lesson/${id}`);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Export progress button (FIX 4 — cross-device data)
  container.querySelector('#btn-export-progress')?.addEventListener('click', () => {
    const exportData = exportAllData();
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `empire_influence_${state.playerName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  container.querySelector('#btn-logout').addEventListener('click', () => {
    resetAppState();
    navigate('/');
  });
}

// ─── Lesson Player View ─────────────────────────────────────

export function renderLessonPlayer(params, container) {
  const lessonId = parseInt(params.id);
  const lesson = LESSONS.find(l => l.id === lessonId);

  if (!lesson) {
    container.innerHTML = '<p>Lesson not found.</p>';
    return;
  }

  const state = getAppState();
  const metrics = state.metrics || { influence: 50, stability: 50, economic: 50, support: 50 };
  const metersHtml = renderMetersHtml(metrics);

  container.innerHTML = `
    <div class="lesson-player">
      <div class="lesson-player__header">
        <button class="btn btn--secondary" id="btn-back-dashboard">&larr; Dashboard</button>
        <div class="lesson-player__info">
          <span class="text-gold">Lesson ${lesson.id}</span>
          <span>${lesson.title}</span>
          <span class="text-muted">${lesson.subtitle}</span>
        </div>
      </div>

      <div class="lesson-player__meters">
        ${metersHtml}
      </div>

      <div class="lesson-player__content" id="lesson-content">
        <div class="lesson-placeholder">
          <div class="lesson-placeholder__icon">\u2694\uFE0F</div>
          <h2>${lesson.title}</h2>
          <p class="text-muted">${lesson.subtitle}</p>
          <p>${lesson.description}</p>
          <div class="advisor-preview">
            <p class="text-gold">Your Advisors:</p>
            <div class="advisor-preview__list">
              ${lesson.advisors.map((a, i) => `
                <div class="advisor-preview__item">
                  <span class="advisor-preview__role">${['Economic', 'Security', 'Diplomatic'][i]}</span>
                  <span>${a}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <button class="btn btn--primary mt-lg" id="btn-begin-lesson">Begin Lesson</button>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-back-dashboard').addEventListener('click', () => {
    navigate('/dashboard');
  });

  container.querySelector('#btn-begin-lesson')?.addEventListener('click', async () => {
    // Load lesson data dynamically
    const content = container.querySelector('#lesson-content');
    content.innerHTML = `<div class="text-center" style="padding:2rem;"><p class="text-muted">Loading lesson data...</p></div>`;

    try {
      // Dynamic import of lesson data, then overlay JSON content
      const lessonModule = await import(`../data/lesson-0${lesson.id}-${getLessonSlug(lesson.id)}.js`);
      const lessonData = await loadLesson(lessonModule.default);

      if (!lessonData || !lessonData.screens) {
        content.innerHTML = `<div class="text-center" style="padding:2rem;">
          <p class="text-gold">Lesson data not yet available.</p>
          <p class="text-muted mt-md">This lesson's content is still being authored.</p>
          <button class="btn btn--secondary mt-lg" id="btn-back-fallback">Return to Dashboard</button>
        </div>`;
        content.querySelector('#btn-back-fallback')?.addEventListener('click', () => navigate('/dashboard'));
        return;
      }

      // Launch the game renderer — it takes over the entire container
      resetGameRenderer();
      const renderer = getGameRenderer();
      renderer.start(container, lessonData, {
        playerName: state.playerName || '',
        classCode: state.classCode || '',
      });

    } catch (err) {
      console.warn('[LessonPlayer] Failed to load lesson data:', err);
      content.innerHTML = `<div class="text-center" style="padding:2rem;">
        <p class="text-gold">Lesson Not Ready</p>
        <p class="text-muted mt-md">Lesson ${lesson.id} content is still being developed.</p>
        <button class="btn btn--secondary mt-lg" id="btn-back-fallback">Return to Dashboard</button>
      </div>`;
      content.querySelector('#btn-back-fallback')?.addEventListener('click', () => navigate('/dashboard'));
    }
  });
}

// ─── Teacher Dashboard ──────────────────────────────────────

export function renderTeacherDashboard(params, container) {
  container.innerHTML = `
    <div class="teacher-dashboard">
      <div class="teacher-dashboard__header">
        <h2>Teacher Dashboard</h2>
        <div style="display:flex; gap:0.5rem;">
          <a href="dashboard/index.html" target="_blank" class="btn btn--primary" id="btn-full-dashboard">Open Full Dashboard</a>
          <button class="btn btn--secondary" id="btn-teacher-logout">Log Out</button>
        </div>
      </div>

      <div class="teacher-dashboard__grid">
        <div class="card">
          <h3 class="text-gold">Full Analytics Dashboard</h3>
          <p class="text-muted mt-md">Access the full teacher analytics dashboard with class management, ideology charts, ending distribution, continuity flag tracking, and detailed student reports.</p>
          <a href="dashboard/index.html" target="_blank" class="btn btn--primary mt-md">Open Dashboard</a>
        </div>

        <div class="card">
          <h3 class="text-gold">Import Student Data</h3>
          <p class="text-muted mt-md">Import student progress files (JSON) to view their data in the dashboard. Students can export their progress from their Dashboard page.</p>
          <input type="file" id="import-student-file" accept=".json" class="form-input mt-md" multiple>
          <div id="import-status" class="mt-md"></div>
        </div>

        <div class="card">
          <h3 class="text-gold">Export All Data</h3>
          <p class="text-muted mt-md">Export all locally stored student data as JSON for backup or gradebook integration.</p>
          <button class="btn btn--secondary mt-md" id="btn-export-data">Export Current Data (JSON)</button>
        </div>

        <div class="card">
          <h3 class="text-gold">Quick Stats</h3>
          <div id="quick-stats" class="mt-md text-muted">Loading...</div>
        </div>
      </div>
    </div>
  `;

  // Quick stats
  const statsEl = container.querySelector('#quick-stats');
  try {
    const teacherDb = JSON.parse(localStorage.getItem('ei_teacher_db') || '{}');
    const students = teacherDb.students || {};
    const count = Object.keys(students).length;
    statsEl.innerHTML = `<p>${count} student(s) in local database</p>`;
  } catch {
    statsEl.innerHTML = '<p>No student data available yet.</p>';
  }

  container.querySelector('#btn-teacher-logout').addEventListener('click', () => {
    navigate('/');
  });

  // Export handler
  container.querySelector('#btn-export-data').addEventListener('click', () => {
    const data = exportAllData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `empire_influence_teacher_export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Import handler (FIX 4 — teacher import)
  container.querySelector('#import-student-file')?.addEventListener('change', async (e) => {
    const statusEl = container.querySelector('#import-status');
    const files = e.target.files;
    if (!files.length) return;

    let imported = 0;
    let errors = 0;

    for (const file of files) {
      try {
        const text = await file.text();
        const studentData = JSON.parse(text);

        // Validate it looks like exported student data
        if (!studentData.player?.name) {
          errors++;
          continue;
        }

        // Store in teacher dashboard DB
        let teacherDb = {};
        try {
          teacherDb = JSON.parse(localStorage.getItem('ei_teacher_db') || '{}');
        } catch { teacherDb = {}; }

        if (!teacherDb.students) teacherDb.students = {};

        const studentKey = `${studentData.player.name}_${studentData.player.classCode || 'none'}`;
        teacherDb.students[studentKey] = {
          name: studentData.player.name,
          classCode: studentData.player.classCode,
          progress: studentData.progress,
          assessments: studentData.assessments,
          preAssessments: studentData.preAssessments,
          lessons: studentData.lessons,
          importedAt: new Date().toISOString(),
        };

        localStorage.setItem('ei_teacher_db', JSON.stringify(teacherDb));
        imported++;
      } catch (err) {
        console.warn('[Import] Failed to process file:', file.name, err);
        errors++;
      }
    }

    statusEl.innerHTML = `<p class="text-gold">${imported} student file(s) imported successfully.${errors > 0 ? ` ${errors} file(s) had errors.` : ''}</p>`;
  });
}

// ─── 404 Not Found ──────────────────────────────────────────

export function renderNotFound(params, container) {
  container.innerHTML = `
    <div class="text-center" style="padding: 4rem 0;">
      <h2 class="text-gold">Page Not Found</h2>
      <p class="text-muted mt-md">The route you requested doesn't exist.</p>
      <button class="btn btn--primary mt-lg" id="btn-go-home">Return Home</button>
    </div>
  `;
  container.querySelector('#btn-go-home').addEventListener('click', () => navigate('/'));
}

// ─── Helpers ────────────────────────────────────────────────

/**
 * Map lesson IDs to their file slugs for dynamic import.
 */
function getLessonSlug(lessonId) {
  const slugs = {
    1: 'cuba',
    2: 'panama',
    3: 'banana-republics',
    4: 'big-stick',
    5: 'cold-war-coups',
    6: 'contra-wars',
    7: 'panama-1989',
    8: 'modern-interventions',
  };
  return slugs[lessonId] || 'unknown';
}

function renderMetersHtml(metrics) {
  // Use the unified 4-meter system
  return `
    <div class="meters">
      <div class="meter meter--influence">
        <span class="meter__label">${METER_LABELS.influence}</span>
        <div class="meter__bar"><div class="meter__fill" style="width: ${metrics.influence ?? 50}%"></div></div>
        <span class="meter__value">${metrics.influence ?? 50}/100</span>
      </div>
      <div class="meter meter--stability">
        <span class="meter__label">${METER_LABELS.stability}</span>
        <div class="meter__bar"><div class="meter__fill" style="width: ${metrics.stability ?? 50}%"></div></div>
        <span class="meter__value">${metrics.stability ?? 50}/100</span>
      </div>
      <div class="meter meter--economic">
        <span class="meter__label">${METER_LABELS.economic}</span>
        <div class="meter__bar"><div class="meter__fill" style="width: ${metrics.economic ?? 50}%"></div></div>
        <span class="meter__value">${metrics.economic ?? 50}/100</span>
      </div>
      <div class="meter meter--support">
        <span class="meter__label">${METER_LABELS.support}</span>
        <div class="meter__bar"><div class="meter__fill" style="width: ${metrics.support ?? 50}%"></div></div>
        <span class="meter__value">${metrics.support ?? 50}/100</span>
      </div>
    </div>
  `;
}
