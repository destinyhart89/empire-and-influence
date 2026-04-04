/**
 * EMPIRE & INFLUENCE — Application State Bridge
 *
 * Thin wrapper around state-manager.js that provides a simple
 * subscribe/update interface for UI components (header, views).
 *
 * This module exists to break the circular dependency between
 * app.js (which registers routes/views) and views.js (which
 * needs to read/write app state). Both import from this shared module.
 */

import {
  loadGlobalState,
  saveGlobalState,
  createGlobalState,
  resetAllData,
} from '../engine/state-manager.js';

let _appState = null;
const _listeners = new Set();

/**
 * Get the current global app state.
 */
export function getAppState() {
  if (!_appState) {
    _appState = loadGlobalState() || createGlobalState();
  }
  return _appState;
}

/**
 * Merge updates into app state and persist.
 */
export function setAppState(updates) {
  _appState = { ..._appState, ...updates };
  saveGlobalState(_appState);
  _listeners.forEach(fn => {
    try { fn(_appState); } catch (e) { console.error('[AppState] Listener error:', e); }
  });
}

/**
 * Subscribe to state changes. Returns an unsubscribe function.
 */
export function subscribeAppState(fn) {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}

/**
 * Full reset — wipes all data and returns to default state.
 */
export function resetAppState() {
  resetAllData();
  _appState = createGlobalState();
  _listeners.forEach(fn => {
    try { fn(_appState); } catch (e) { console.error('[AppState] Listener error:', e); }
  });
}

/**
 * Force-hydrate app state from localStorage.
 * Call on app boot.
 */
export function hydrateAppState() {
  _appState = loadGlobalState() || createGlobalState();
  return _appState;
}
