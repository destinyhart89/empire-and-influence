# EMPIRE & INFLUENCE — Application Architecture (Phase 1)

**Date:** March 24, 2026
**Status:** Foundation complete. Ready for Phase 2 (lesson content build).

---

## 1. TECH STACK

| Layer | Choice | Rationale |
|---|---|---|
| **Frontend** | Vanilla JavaScript (ES6 modules) | Zero build step, runs directly on any web server or file:// protocol. No Node.js, Webpack, or Vite required. Perfect for classroom deployment where IT may restrict tooling. Any teacher can serve this from a USB drive, Google Drive, or school web server. |
| **State Management** | Custom pub/sub store (~60 lines) | Modeled on Zustand's API but zero-dependency. The game's state shape is bounded (8 lessons × finite decisions), so a full state library is unnecessary overhead. Persists to localStorage automatically. |
| **Routing** | Custom hash-based router (~50 lines) | Hash routing (#/path) works on file:// protocol and doesn't require server-side fallback routing. Critical for Captivate/SCORM deployment where the app runs inside an iframe from an arbitrary origin. |
| **Styling** | CSS custom properties + plain CSS | No SASS/LESS build step. Custom properties enable runtime era-based theming (early-imperial vs cold-war LUT switching). The entire design system—including the LUT overlay system from the Dual CSS Implementation Guide—is integrated. |
| **Data Storage** | localStorage (session) + JSON export (reporting) | Students' progress persists across browser sessions via localStorage. Teacher reporting uses JSON export for gradebook integration. Phase 3 can add a server backend if needed. |
| **Auth** | Lightweight name + class code entry | No external auth service. Students enter their name and class code. Teachers have a separate entry point. Suitable for classroom use where students are physically present and trust is managed by the teacher. |

**Why not React/Vue/Svelte?** Frameworks add a build step, toolchain complexity, and a learning curve for maintenance. This game has ~20 unique views total, bounded state, and no real-time collaboration. The complexity threshold for a framework is not met. If it were, Preact (3KB, React API) would be the choice.

**Why not separate HTML files (original plan)?** The shift to a unified app enables: shared state across lessons, cumulative meter tracking, unlockable progression, a teacher dashboard, and consistent assessment tracking — none of which are possible with 8 independent HTML files.

---

## 2. PROJECT STRUCTURE

```
empire-influence/
├── index.html                          # Entry point — single HTML file
├── ARCHITECTURE.md                     # This document
├── src/
│   ├── app.js                          # Boot: hydrate store, register routes, start router
│   ├── core/
│   │   ├── store.js                    # Global state management (pub/sub + localStorage)
│   │   ├── router.js                   # Hash-based SPA router
│   │   └── lesson-engine.js            # Lesson interpreter: loads JSON, drives gameplay
│   ├── components/
│   │   └── views.js                    # View renderers (login, dashboard, lesson player, teacher)
│   ├── data/
│   │   ├── lessons-index.js            # Lesson metadata registry (titles, descriptions, unlock rules)
│   │   ├── schema.js                   # Data model documentation (JSDoc reference)
│   │   └── lessons/                    # [Phase 2] Individual lesson JSON files
│   │       ├── lesson-01-cuba.json
│   │       ├── lesson-02-panama.json
│   │       └── ...
│   ├── lessons/                        # [Phase 2] Lesson-specific component overrides
│   ├── assessments/                    # [Phase 2] Assessment engine
│   ├── teacher/                        # [Phase 3] Teacher dashboard logic
│   ├── utils/                          # Shared utilities
│   └── styles/
│       ├── variables.css               # Design system tokens (colors, spacing, typography)
│       ├── base.css                    # Reset + foundation + LUT system + component styles
│       └── views.css                   # View-specific layout styles
└── public/
    └── assets/                         # Symlink or copy of Assets_Organized/
        ├── L01_Cuba/
        ├── L02_Panama/
        ├── ...
        └── shared/
```

**Asset Integration:** The `public/assets/` directory should contain (or symlink to) the `Assets_Organized/` folder structure. Asset paths in lesson data files are relative to this root.

---

## 3. GLOBAL STATE ARCHITECTURE

The store tracks everything needed for gameplay continuity and teacher reporting:

```
{
  sessionId          — UUID generated on login
  startedAt          — ISO timestamp

  student: {
    name             — Student's display name
    classCode        — Teacher's class identifier
    role             — 'student' | 'teacher'
  }

  lessons: {
    [lessonId]: {
      unlocked       — Can this lesson be accessed?
      started        — Has the student entered this lesson?
      completed      — Has the student finished this lesson?
      currentScreen  — Screen ID for resume capability
      decisions[]    — Array of { screenId, choiceId, label, advisorAlignment, timestamp }
      meterSnapshots — Meter state at key decision points
      advisorAffinity — Per-lesson { economic, security, diplomatic } counts
    }
  }

  globalMeters: {
    economicInfluence  — 0-100, starts at 50
    regionalStability  — 0-100, starts at 50
    globalReputation   — 0-100, starts at 50
  }

  flags: {
    [key]: boolean     — Cross-lesson continuity flags
                         e.g., 'chose_military_l1', 'cia_coup_l5'
                         Used for conditional dialogue and branching references
  }

  assessments: {
    [lessonId]: {
      questions[]      — Answers with correctness
      score            — 0-100
      completedAt      — ISO timestamp
    }
  }

  advisorAffinity: {
    economic           — Cumulative alignment score
    security           — Cumulative alignment score
    diplomatic         — Cumulative alignment score
  }

  teacherMode          — Boolean
}
```

**Persistence:** Every `setState()` call automatically writes to `localStorage`. On app load, `store.hydrate()` restores the previous session. Students can close their Chromebook and resume later.

**Export:** `store.exportData()` returns the full state as JSON. The teacher dashboard uses this for reporting and can trigger a file download.

---

## 4. LESSON ENGINE ARCHITECTURE

Lessons are **data, not code**. Each lesson is a JSON file defining screens, decisions, events, and consequences. The Lesson Engine interprets this data.

**Lesson lifecycle:**
1. Student selects lesson from dashboard
2. Engine loads the lesson JSON file
3. Engine renders the first screen
4. Player progresses through screens via narrative flow or decision choices
5. Each decision: records to store, applies meter effects, sets flags, updates advisor affinity
6. Events fire based on triggers (meter thresholds, decision flags, chain sequences)
7. Newspapers display as modal overlays at defined trigger points
8. Assessment runs after the final narrative screen
9. Lesson marked complete; next lesson unlocked

**Screen types:**
- `narrative` — Text + optional map/newspaper + advisor dialogue + "Continue" button
- `decision` — Choice cards with meter effects and branching
- `event` — Event card display with meter effects (chained)
- `outcome` — Post-decision consequence narrative
- `reflection` — Cross-lesson comparison or counter-perspective display
- `assessment` — AP-aligned questions

**Event chain system:** Events define a `chainNext` field pointing to the next event ID. The engine follows the chain sequentially, checking trigger conditions at each step.

**Dynamic system (L8):** Lesson 8 uses meter-based event selection rather than fixed chains. Events are tagged with trigger conditions (e.g., `economicInfluence > 70`) and the engine selects dynamically.

---

## 5. ROUTING / NAVIGATION

| Route | View | Access |
|---|---|---|
| `#/` | Login/Entry | Always |
| `#/dashboard` | Student Lesson Selector | Logged-in students |
| `#/lesson/:id` | Lesson Player | Unlocked lessons |
| `#/teacher` | Teacher Dashboard | Teacher role |
| `#/teacher/reports` | Detailed Reports | Teacher role (Phase 3) |

**Progression locking:** Lessons unlock sequentially. Lesson 1 is always available. Each subsequent lesson requires the previous one to be marked `completed`. The `isLessonUnlocked()` function checks against the student's completion list.

**Resume:** If a student leaves mid-lesson, their `currentScreen` is saved. On re-entry, the engine can resume from that screen.

---

## 6. DATA SCHEMAS

Fully documented in `src/data/schema.js`. Key models:

- **Student** — name, classCode, role
- **Lesson Definition** — id, era, advisors, screens[], events[], assessment
- **Screen** — type, text, map, newspaper, choices, advisorDialogue
- **Choice** — meterEffects, flags, advisorAlignment, next screen
- **Event** — trigger, card asset, meterEffects, chain linkage
- **Assessment** — questions with AP standard tags, skill tags, explanations
- **Teacher Report** — class-level aggregation of decisions, scores, patterns

---

## 7. UI FOUNDATION

**Design system:** Dark navy (#0A1326) + gold (#D4A843) palette. Georgia serif for display text, system sans-serif for body. Matches the established visual identity from the asset library.

**LUT integration:** The full CSS LUT system from the Dual CSS Implementation Guide is built into `base.css`. Three era classes:
- `.lut-early-imperial` — Lessons 1-5 (warm sepia, gilded)
- `.lut-cold-war` — Lessons 6-7 (cool, sharp, higher contrast)
- `.lut-base` — Lesson 8 (neutral)

Applied to `.asset-frame` wrappers only, never to UI text or buttons.

**Asset plug-in points:**
- Maps: `<div class="asset-frame lut-base lut-{era}"><img src="assets/{path}"></div>`
- Newspapers: Same frame, displayed inside `.news-modal` overlay
- Portraits: `.advisor-card` with primary/secondary scaling

**Chromebook optimization:**
- 44px minimum touch targets on all interactive elements
- Responsive breakpoints for 1366×768 (common Chromebook resolution)
- No heavy animations or WebGL — CSS transitions only
- All fonts are system fonts (no web font loading)

---

## 8. FILES CREATED

| File | Purpose | Lines |
|---|---|---|
| `index.html` | Application entry point | 30 |
| `src/app.js` | Bootstrap: hydrate, routes, header | 60 |
| `src/core/store.js` | Global state management | 180 |
| `src/core/router.js` | Hash-based SPA router | 90 |
| `src/core/lesson-engine.js` | Lesson interpreter skeleton | 220 |
| `src/data/lessons-index.js` | 8-lesson metadata registry | 120 |
| `src/data/schema.js` | Data model documentation | 130 |
| `src/components/views.js` | Login, dashboard, lesson player, teacher views | 300 |
| `src/styles/variables.css` | Design system tokens | 100 |
| `src/styles/base.css` | Foundation styles + LUT system | 350 |
| `src/styles/views.css` | View-specific layouts | 250 |

**Total:** ~1,830 lines of production code across 11 files.

---

## 9. ASSUMPTIONS

1. **Sequential lesson access** — Students must complete lessons in order (1→2→3→...→8). This matches the chronological curriculum structure.
2. **Single-device persistence** — Student progress is tied to the browser's localStorage on their device. No cloud sync in Phase 1.
3. **No concurrent editing** — Only one student uses a given browser/device at a time.
4. **Teacher trust model** — Teacher access is via a separate login path, not password-protected in Phase 1. Phase 3 can add authentication.
5. **Asset hosting** — The `Assets_Organized/` folder will be copied or symlinked into `public/assets/` before deployment.
6. **Chromebook primary target** — All design decisions optimize for Chrome on ChromeOS at 1366×768 or higher.

---

## 10. HOW TO RUN / TEST

```bash
# Option 1: Python (available on most systems)
cd empire-influence
python3 -m http.server 8080
# Open http://localhost:8080

# Option 2: Node.js (if available)
npx serve .

# Option 3: Direct file
# Open index.html in Chrome (some modules may require a server)
```

The app loads the login screen. Enter a name and class code to access the student dashboard. Click any unlocked lesson to enter the lesson player (Phase 1 placeholder content). Click "Teacher Dashboard" for the teacher view.

---

## 11. PHASE 2 RECOMMENDATION

Phase 2 should build the **lesson content layer**:

1. **Lesson JSON files** — Create `lesson-01-cuba.json` through `lesson-08-modern.json` with full screen definitions, decision trees, meter effects, event chains, and newspaper triggers. Use the existing design documents (Event System V4, Newspaper System V4, Map System V5, Advisor Deployment Guide V3) as the source of truth.

2. **Lesson engine rendering** — Upgrade the placeholder screen renderers in `lesson-engine.js` to full implementations: map display with hotspots, advisor panel with dialogue, newspaper modal system, event card display.

3. **Assessment engine** — Build the assessment component supporting multiple-choice, short-answer, and document-analysis question types with AP standard tagging.

4. **Asset integration** — Copy `Assets_Organized/` into `public/assets/` and verify all asset paths resolve correctly.

5. **Newspaper modal system** — Full implementation of the queued modal overlay with 40% dim, scale-in animation, and oppositional newspaper support.

Phase 2 deliverable: **Lesson 1 (Cuba) fully playable end-to-end** as the proof of concept, with the remaining 7 lessons following the same pattern.
