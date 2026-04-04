/**
 * EMPIRE & INFLUENCE — Client-Side Router
 *
 * Hash-based SPA router (~50 lines). No dependencies.
 *
 * Architecture decision: Hash routing (#/path) over History API
 * WHY: Works on file:// protocol, no server config needed, Captivate/SCORM
 * web objects serve from arbitrary origins. History API requires server-side
 * fallback routing which adds deployment complexity for a teacher.
 * TRADEOFF: URLs have # prefix. Acceptable for a classroom tool.
 */

const routes = new Map();
let notFoundHandler = null;
let currentRoute = null;
let rootEl = null;

/**
 * Register a route.
 * @param {string} pattern — e.g., '/lesson/:id'
 * @param {Function} handler — receives (params, rootEl)
 */
export function route(pattern, handler) {
  routes.set(pattern, handler);
}

export function setNotFound(handler) {
  notFoundHandler = handler;
}

/**
 * Initialize the router. Call once on app boot.
 * @param {HTMLElement} mountPoint — where views render
 */
export function startRouter(mountPoint) {
  rootEl = mountPoint;
  window.addEventListener('hashchange', () => resolve());
  resolve();
}

/**
 * Programmatic navigation.
 */
export function navigate(path) {
  window.location.hash = path;
}

/**
 * Get current route path.
 */
export function getCurrentPath() {
  return window.location.hash.slice(1) || '/';
}

// ─── Internal ───────────────────────────────────────────────

function resolve() {
  const path = getCurrentPath();
  if (path === currentRoute) return;
  currentRoute = path;

  for (const [pattern, handler] of routes) {
    const params = matchRoute(pattern, path);
    if (params !== null) {
      rootEl.innerHTML = '';
      handler(params, rootEl);
      window.scrollTo(0, 0);
      return;
    }
  }

  // No match
  if (notFoundHandler) {
    rootEl.innerHTML = '';
    notFoundHandler({}, rootEl);
  }
}

function matchRoute(pattern, path) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) return null;

  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
}
