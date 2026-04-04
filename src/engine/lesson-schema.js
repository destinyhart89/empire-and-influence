/**
 * EMPIRE & INFLUENCE — Lesson Data Schema Reference
 *
 * This file documents the required shape for lesson JSON files.
 * All 8 lessons must conform to this schema.
 *
 * ═══════════════════════════════════════════════════════════
 * LESSON DATA SCHEMA
 * ═══════════════════════════════════════════════════════════
 *
 * {
 *   id: number,               // Lesson number (1-8)
 *   title: string,            // "The Cuba Crisis"
 *   subtitle: string,         // "1895–1902"
 *   era: string,              // "early-imperial" | "cold-war" | "base"
 *   period: string,           // "Period 7" | "Period 8" | "Period 9"
 *   apStandards: string[],    // ["KC-7.3.II.A", "KC-7.3.II.B"]
 *
 *   // ─── ADVISOR DEFINITIONS ──────────────────────────────
 *   advisors: {
 *     economic: {
 *       name: string,         // "Industrial Investor"
 *       title: string,        // "Economic Advisor"
 *       portrait: string,     // Filename in portraits folder
 *       initialTrust: number, // Starting trust (-10 to 10), default 0
 *       metricWeights: {      // How much this advisor values each metric
 *         influence: number,  // 0.0–2.0
 *         stability: number,
 *         economic: number,
 *         support: number,
 *       },
 *       bias: {
 *         primary: string,    // Core motivation
 *         secondary: string,
 *         aversion: string,   // What they hate
 *       },
 *       quotes: {
 *         // Keyed by: decision ID, trust level, reaction type, or "default"
 *         "decision_1": string | string[] | { trusted: string, cold: string },
 *         "reaction_approve": string | string[],
 *         "reaction_disapprove": string | string[],
 *         "default": string,
 *       },
 *       specialRules: {       // Optional per-lesson rules
 *         persistScreens: number,
 *         visualMod: string,
 *       } | null,
 *     },
 *     security: { ... },      // Same shape
 *     diplomatic: { ... },    // Same shape
 *   },
 *
 *   // ─── SCREENS ──────────────────────────────────────────
 *   // Ordered array. Engine processes them by ID references, not array order.
 *   screens: [
 *     {
 *       id: string,           // Unique within lesson: "intro", "decision_1", etc.
 *       type: string,         // "intro" | "briefing" | "context" | "decision" |
 *                             // "consequence" | "event" | "outcome" | "reflection" | "assessment"
 *       title: string,
 *       text: string,         // Main body text (can include basic HTML)
 *       subtitle: string,     // Optional subtitle
 *
 *       // ─── Asset References ─────────────────────────────
 *       map: {
 *         asset: string,      // Filename in maps folder
 *         caption: string,
 *         hotspots: [         // Optional interactive points
 *           { x: number, y: number, label: string, tooltip: string },
 *         ],
 *       } | null,
 *
 *       newspaper: {
 *         asset: string,      // Filename in newspapers folder
 *         headline: string,
 *         perspective: string,
 *         bodyText: string,
 *         trigger: string,    // "immediate" | "after-continue" | "with-consequence"
 *       } | null,
 *
 *       // ─── Advisor Dialogue ─────────────────────────────
 *       advisorDialogue: {
 *         economic: string,
 *         security: string,
 *         diplomatic: string,
 *       } | null,
 *       advisorPrimary: string, // Which advisor speaks prominently
 *
 *       // ─── Navigation ───────────────────────────────────
 *       next: string | null,    // Next screen ID (for linear flow)
 *
 *       // ─── Conditional Content Variants ──────────────────
 *       conditionalContent: [
 *         {
 *           conditions: [
 *             { type: "flag", key: "chose_military_l1", value: true },
 *           ],
 *           outcome: {
 *             text: "Alternative text when condition is met...",
 *             // Can override any screen field
 *           },
 *           isDefault: false,
 *         },
 *       ] | null,
 *
 *       // ─── Auto Effects (for event screens) ──────────────
 *       autoEffects: { influence, stability, economic, support } | null,
 *
 *       // ═══ DECISION-SPECIFIC FIELDS ═════════════════════
 *       // Only present when type === "decision"
 *       prompt: string,        // The question posed to the player
 *       choices: [
 *         {
 *           id: string,        // Unique within decision
 *           label: string,     // Short label: "Declare War"
 *           description: string, // Longer explanation
 *           advisorAlignment: string, // "economic" | "security" | "diplomatic"
 *
 *           // ─── Effects ──────────────────────────────────
 *           effects: {         // Immediate metric changes
 *             influence: number,
 *             stability: number,
 *             economic: number,
 *             support: number,
 *           },
 *           factionEffects: {  // Immediate faction changes
 *             localPopulations: number,
 *             usGovernment: number,
 *             corporations: number,
 *             internationalActors: number,
 *           },
 *           flags: { [key]: boolean },
 *
 *           // ─── Advisor Reactions ─────────────────────────
 *           advisorReactions: {
 *             economic: { trustDelta: number, dialogue: string },
 *             security: { trustDelta: number, dialogue: string },
 *             diplomatic: { trustDelta: number, dialogue: string },
 *           },
 *
 *           // ─── Consequence Text ──────────────────────────
 *           consequenceText: string,
 *
 *           // ─── Navigation ────────────────────────────────
 *           next: string,      // Next screen after this choice
 *           conditionalNext: [ // Conditional branching
 *             {
 *               conditions: [{ type, key/meter/faction, operator, value }],
 *               screenId: string,
 *             },
 *           ],
 *
 *           // ─── Delayed Consequences ──────────────────────
 *           delayedConsequences: [
 *             {
 *               id: string,
 *               trigger: "screen" | "turns_after" | "meter_threshold" | "flag" | "next_lesson",
 *               triggerScreenId: string,    // For "screen" trigger
 *               turnsDelay: number,         // For "turns_after" trigger
 *               condition: {},              // For "meter_threshold" trigger
 *               conditionFlag: string,      // For "flag" trigger
 *               targetLesson: number,       // For "next_lesson" trigger
 *               narrative: string,
 *               effects: { influence, stability, economic, support },
 *               factionEffects: {},
 *               flags: {},
 *             },
 *           ],
 *
 *           // ─── Gating / Locking ──────────────────────────
 *           conditions: [{ type, ... }],         // Conditions to unlock
 *           requiresAdvisorTrust: { role: string, minTrust: number },
 *           requiresMeters: [{ meter, operator, value }],
 *           lockMessage: string,
 *
 *           // ─── Display ───────────────────────────────────
 *           riskLevel: "low" | "medium" | "high",
 *           hiddenHint: string,            // Revealed only by trusted advisor
 *           ideologyWeight: number,        // Default 1, major decisions can be 2
 *           tags: string[],                // For advisor bias matching
 *
 *           // ─── Newspaper Trigger ─────────────────────────
 *           newspaper: { asset, headline, perspective, bodyText },
 *           triggersEvent: string,          // Event screen ID
 *         },
 *       ],
 *
 *       // ═══ ASSESSMENT-SPECIFIC FIELDS ═══════════════════
 *       // Only present when type === "assessment"
 *       questions: [
 *         {
 *           id: string,
 *           type: "multiple_choice" | "multi_select" | "short_answer",
 *           prompt: string,
 *           context: string | null,  // Document excerpt / source material
 *           options: string[],       // For multiple_choice / multi_select
 *           correctIndex: number,    // For multiple_choice
 *           correctIndices: number[], // For multi_select
 *           explanation: string,
 *           apStandard: string,
 *           skillTag: string,
 *         },
 *       ],
 *     },
 *   ],
 * }
 *
 * ═══════════════════════════════════════════════════════════
 * AUTHORING GUIDE
 * ═══════════════════════════════════════════════════════════
 *
 * To create a new lesson:
 *
 * 1. Copy the sample lesson (lesson-01-cuba.js) as a template
 * 2. Update id, title, subtitle, era, period
 * 3. Define 3 advisor profiles with unique names, biases, and quotes
 * 4. Build screens in order:
 *    - Start with "intro" (sets the scene)
 *    - Add 1-2 "context" or "briefing" screens
 *    - Add 2-3 "decision" screens (these are the core gameplay)
 *    - Add "consequence" screens after each decision
 *    - End with "outcome" screen (summary)
 *    - Add "assessment" screen (quiz)
 *
 * 5. BALANCE CHECKLIST:
 *    [ ] Every decision has at least 3 options
 *    [ ] No option is universally best (raises all metrics)
 *    [ ] Each option moves at least 2 metrics in opposing directions
 *    [ ] Each advisor aligns with a different option
 *    [ ] At least one delayed consequence exists
 *    [ ] At least one conditional content variant exists
 *    [ ] Risk levels vary across options (not all high, not all low)
 *
 * 6. Link screens via `next` and choice `next` fields
 * 7. Add flags for cross-lesson continuity
 * 8. Add assessment questions (3-5 per lesson)
 * 9. Test by loading the lesson into LessonFlow.start()
 */

export default {};
