/**
 * EMPIRE & INFLUENCE — Content Loader
 *
 * Fetches lesson JSON content at runtime and merges it into
 * the JS lesson object. If fetch fails for any reason (network
 * error, missing file, bad JSON), returns the JS object unchanged.
 *
 * Pattern: JS lesson files = logic + fallback text
 *          JSON content files = live text overlay (content-only updates)
 *
 * Usage:
 *   import { loadLesson, loadShared } from './content-loader.js';
 *
 *   // In lesson player (views.js):
 *   const lesson = await loadLesson(lessonModule.default);
 *
 *   // In app boot (app.js):
 *   const shared = await loadShared();
 *   setSharedContent(shared); // pass to advisor-system.js
 */

// ─── Cache-bust version ──────────────────────────────────────
// UPDATE THIS STRING on every content deploy (match index.html version).
const VERSION = '20260331';

// ─── Public API ─────────────────────────────────────────────

/**
 * Load and merge JSON content for a lesson.
 * Returns the JS object unchanged if JSON cannot be loaded.
 *
 * @param {Object} lessonJs - The imported JS lesson object (logic + fallback)
 * @param {string} [ver]    - Cache-bust version (defaults to module constant)
 * @returns {Promise<Object>} Merged lesson object, or original JS object on failure
 */
export async function loadLesson(lessonJs, ver = VERSION) {
  const id = String(lessonJs?.id ?? '').padStart(2, '0');
  if (!id || id === '00') return lessonJs;

  try {
    const url = `content/lesson-${id}.json?v=${ver}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const json = await res.json();
    return _mergeContent(lessonJs, json);
  } catch (err) {
    console.warn(`[content-loader] Lesson ${lessonJs.id}: using JS fallback. (${err.message})`);
    return lessonJs;
  }
}

/**
 * Load shared content (role labels + advisor fallback strings).
 * Returns null if the file cannot be loaded — callers must handle null gracefully.
 *
 * @param {string} [ver]
 * @returns {Promise<Object|null>}
 */
export async function loadShared(ver = VERSION) {
  try {
    const res = await fetch(`content/shared.json?v=${ver}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[content-loader] shared.json: using JS fallbacks. (${err.message})`);
    return null;
  }
}

// ─── Merge Engine ────────────────────────────────────────────

/**
 * Merge a JSON content patch into a JS lesson object.
 *
 * Rules:
 *   - Only text fields are patched. All logic fields (effects, flags,
 *     conditions, trustDelta, correctIndex, etc.) are NEVER touched.
 *   - Screens are matched by their `id` property (array → object lookup).
 *   - Choices are matched by their `id` property within each screen.
 *   - advisorReactions: only `dialogue` is patched; `trustDelta` is preserved.
 *   - Advisor quotes: merged shallowly (JSON key overwrites JS key).
 *   - Missing JSON keys silently fall through to JS values.
 *
 * @param {Object} lesson - JS lesson object (never mutated — returns new object)
 * @param {Object} patch  - Parsed JSON content patch
 * @returns {Object}      New merged lesson object
 */
function _mergeContent(lesson, patch) {
  // Top-level clone — never mutate the imported JS module
  const merged = { ...lesson };

  // ── Screens ───────────────────────────────────────────────
  if (patch.screens && Array.isArray(lesson.screens)) {
    merged.screens = lesson.screens.map(screen => {
      const sp = patch.screens[screen.id];
      if (!sp) return screen; // no patch for this screen

      const s = { ...screen };

      // Simple text fields
      if (sp.title    !== undefined) s.title    = sp.title;
      if (sp.subtitle !== undefined) s.subtitle = sp.subtitle;
      if (sp.text     !== undefined) s.text     = sp.text;
      if (sp.prompt   !== undefined) s.prompt   = sp.prompt;

      // Nested objects — shallow merge so asset filenames are preserved
      if (sp.map)             s.map             = { ...screen.map,             ...sp.map };
      if (sp.newspaper)       s.newspaper       = { ...screen.newspaper,       ...sp.newspaper };
      if (sp.advisorDialogue) s.advisorDialogue = { ...screen.advisorDialogue, ...sp.advisorDialogue };

      // Choices (decision screens)
      if (sp.choices && Array.isArray(s.choices)) {
        s.choices = s.choices.map(choice => {
          const cp = sp.choices[choice.id];
          if (!cp) return choice;

          const c = { ...choice };
          if (cp.label           !== undefined) c.label           = cp.label;
          if (cp.description     !== undefined) c.description     = cp.description;
          if (cp.consequenceText !== undefined) c.consequenceText = cp.consequenceText;
          if (cp.lockMessage     !== undefined) c.lockMessage     = cp.lockMessage;

          // advisorReactions — patch dialogue string only; trustDelta stays in JS
          if (cp.advisorReactions) {
            c.advisorReactions = { ...choice.advisorReactions };
            for (const role of ['economic', 'security', 'diplomatic']) {
              if (cp.advisorReactions[role] !== undefined) {
                c.advisorReactions[role] = {
                  ...choice.advisorReactions[role],
                  dialogue: cp.advisorReactions[role],
                };
              }
            }
          }

          return c;
        });
      }

      return s;
    });
  }

  // ── Advisors ──────────────────────────────────────────────
  if (patch.advisors && lesson.advisors) {
    merged.advisors = { ...lesson.advisors };
    for (const role of ['economic', 'security', 'diplomatic']) {
      if (!patch.advisors[role]) continue;
      const ap = patch.advisors[role];
      merged.advisors[role] = {
        ...lesson.advisors[role],
        // name and title are text fields — allow override
        ...(ap.name  !== undefined ? { name:  ap.name  } : {}),
        ...(ap.title !== undefined ? { title: ap.title } : {}),
        // Quotes: shallow merge so JS keys not in JSON are preserved as fallback
        quotes: { ...lesson.advisors[role].quotes, ...ap.quotes },
      };
    }
  }

  return merged;
}
