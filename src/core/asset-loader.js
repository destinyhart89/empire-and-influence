/**
 * EMPIRE & INFLUENCE — Asset Loader & Hook System
 *
 * Defines HOW assets are loaded, passed into components, rendered,
 * and how fallback behavior works when assets are missing.
 *
 * Asset types: maps, newspapers, portraits, events
 * All assets live under Assets_Organized/ with the structure:
 *   Assets_Organized/L{NN}_{Name}/{type}/{filename}
 *
 * Example paths:
 *   Assets_Organized/L01_Cuba/maps/L01_MAP_01_Cuba_SugarEconomy_NavalBlockade.png
 *   Assets_Organized/L01_Cuba/newspapers/L01_NEWS_01_ReconcentrationCamps_NYHerald.png
 *   Assets_Organized/L01_Cuba/portraits/IndustrialInvestor.png
 */

// ─── Configuration ──────────────────────────────────────────

// Determine asset base dynamically based on current page location
// This handles both the main app (empire-influence/) and dashboard (empire-influence/dashboard/)
const ASSET_BASE = (() => {
  const path = window.location.pathname;
  if (path.includes('/dashboard/')) {
    return '../../Assets_Organized';
  }
  return '../Assets_Organized';
})();

const LESSON_FOLDERS = {
  1: 'L01_Cuba',
  2: 'L02_Panama',
  3: 'L03_BananaRepublics',
  4: 'L04_BigStick',
  5: 'L05_ColdWarCoups',
  6: 'L06_ContraWars',
  7: 'L07_Panama1989',
  8: 'L08_ModernInterventions',
};

const ASSET_TYPES = {
  MAP: 'maps',
  NEWSPAPER: 'newspapers',
  PORTRAIT: 'portraits',
  EVENT: 'events',
};

// ─── Asset Resolution ───────────────────────────────────────

/**
 * Resolve a full asset path from lesson ID, type, and filename.
 * @param {number} lessonId
 * @param {string} assetType - One of ASSET_TYPES values
 * @param {string} filename
 * @returns {string} Resolved path relative to app root
 */
export function resolveAssetPath(lessonId, assetType, filename) {
  const folder = LESSON_FOLDERS[lessonId];
  if (!folder) {
    console.warn(`[AssetLoader] Unknown lesson ID: ${lessonId}`);
    return '';
  }
  return `${ASSET_BASE}/${folder}/${assetType}/${filename}`;
}

/**
 * Resolve a portrait path for a named advisor.
 * Advisor portrait filenames may vary; this tries common patterns.
 * @param {number} lessonId
 * @param {string} advisorFilename - Direct filename from lesson data
 * @returns {string}
 */
export function resolvePortraitPath(lessonId, advisorFilename) {
  return resolveAssetPath(lessonId, ASSET_TYPES.PORTRAIT, advisorFilename);
}

/**
 * Resolve a map path.
 */
export function resolveMapPath(lessonId, mapFilename) {
  return resolveAssetPath(lessonId, ASSET_TYPES.MAP, mapFilename);
}

/**
 * Resolve a newspaper path.
 */
export function resolveNewspaperPath(lessonId, newspaperFilename) {
  return resolveAssetPath(lessonId, ASSET_TYPES.NEWSPAPER, newspaperFilename);
}

/**
 * Resolve a shared event card asset path.
 * All event cards live under Assets_Organized/shared/events/ with EVT_ prefix.
 * @param {string} evtFilename - e.g. 'EVT_YellowJournalism.png'
 * @returns {string}
 */
export function resolveSharedEventPath(evtFilename) {
  return `${ASSET_BASE}/shared/events/${evtFilename}`;
}

// ─── Asset Cache ────────────────────────────────────────────

const assetCache = new Map();
const failedAssets = new Set();

/**
 * Preload an image and cache it.
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
export function preloadImage(src) {
  if (assetCache.has(src)) {
    return Promise.resolve(assetCache.get(src));
  }
  if (failedAssets.has(src)) {
    return Promise.reject(new Error(`Asset previously failed: ${src}`));
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      assetCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => {
      failedAssets.add(src);
      console.warn(`[AssetLoader] Failed to load: ${src}`);
      reject(new Error(`Failed to load: ${src}`));
    };
    img.src = src;
  });
}

/**
 * Preload all assets for a lesson (maps, portraits, newspapers).
 * Non-blocking — failures are logged but don't halt.
 * @param {Object} lessonData - Full lesson data object
 * @returns {Promise<{loaded: string[], failed: string[]}>}
 */
export async function preloadLessonAssets(lessonData) {
  const paths = [];

  // Gather all referenced asset paths from the lesson
  if (lessonData.advisors) {
    for (const advisor of Object.values(lessonData.advisors)) {
      if (advisor.portrait) {
        paths.push(resolvePortraitPath(lessonData.id, advisor.portrait));
      }
    }
  }

  if (lessonData.screens) {
    for (const screen of lessonData.screens) {
      if (screen.map?.asset) {
        paths.push(resolveMapPath(lessonData.id, screen.map.asset));
      }
      if (screen.newspaper?.asset) {
        paths.push(resolveNewspaperPath(lessonData.id, screen.newspaper.asset));
      }
      if (screen.choices) {
        for (const choice of screen.choices) {
          if (choice.newspaper?.asset) {
            paths.push(resolveNewspaperPath(lessonData.id, choice.newspaper.asset));
          }
        }
      }
    }
  }

  const loaded = [];
  const failed = [];

  await Promise.allSettled(
    paths.map(async (path) => {
      try {
        await preloadImage(path);
        loaded.push(path);
      } catch {
        failed.push(path);
      }
    })
  );

  return { loaded, failed };
}

// ─── Asset Rendering Helpers ────────────────────────────────

/**
 * Create an asset image element with built-in fallback.
 * If the image fails to load, renders a styled placeholder instead.
 *
 * @param {string} src - Asset path
 * @param {string} alt - Alt text for accessibility
 * @param {string} type - 'map' | 'portrait' | 'newspaper' | 'event'
 * @param {Object} [options] - Additional options
 * @param {string} [options.className] - Extra CSS class
 * @param {Function} [options.onLoad] - Callback on successful load
 * @returns {HTMLElement}
 */
export function createAssetImage(src, alt, type, options = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = `asset-wrapper asset-wrapper--${type} ${options.className || ''}`;

  if (!src) {
    wrapper.innerHTML = createPlaceholderHtml(type, alt);
    return wrapper;
  }

  const img = document.createElement('img');
  img.alt = alt;
  img.loading = 'lazy';
  img.className = `asset-image asset-image--${type}`;

  // Start with loading state
  img.classList.add('asset-image--loading');

  img.onload = () => {
    img.classList.remove('asset-image--loading');
    if (options.onLoad) options.onLoad(img);
  };

  img.onerror = () => {
    // Replace with placeholder on error
    wrapper.innerHTML = createPlaceholderHtml(type, alt);
    failedAssets.add(src);
  };

  img.src = src;
  wrapper.appendChild(img);
  return wrapper;
}

/**
 * Generate HTML for a placeholder when an asset is missing.
 */
function createPlaceholderHtml(type, label) {
  const icons = {
    map: '\u{1F5FA}',       // world map emoji
    portrait: '\u{1F464}',  // bust silhouette
    newspaper: '\u{1F4F0}', // newspaper
    event: '\u{26A1}',      // lightning bolt
  };

  return `
    <div class="asset-placeholder asset-placeholder--${type}" role="img" aria-label="${label || 'Asset unavailable'}">
      <div>
        <span style="font-size:1.5rem;">${icons[type] || '\u{1F4C4}'}</span>
        <div style="margin-top:0.25rem; font-size:0.6875rem;">${label || 'Asset unavailable'}</div>
      </div>
    </div>
  `;
}

// ─── Exports ────────────────────────────────────────────────

export { ASSET_BASE, LESSON_FOLDERS, ASSET_TYPES };
