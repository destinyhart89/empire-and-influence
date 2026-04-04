/**
 * EMPIRE & INFLUENCE — Data Schema Definitions
 *
 * Reference file documenting the shape of all data models.
 * These are not enforced at runtime (no TypeScript) but serve as
 * the contract between lesson data files and the engine.
 *
 * ─── STUDENT ────────────────────────────────────────────────
 *
 * {
 *   name: string,
 *   classCode: string,
 *   role: 'student' | 'teacher',
 * }
 *
 * ─── LESSON DEFINITION ─────────────────────────────────────
 *
 * {
 *   id: number (1-8),
 *   title: string,
 *   subtitle: string,
 *   era: 'early-imperial' | 'cold-war' | 'base',
 *   advisors: {
 *     economic:   AdvisorDef,
 *     security:   AdvisorDef,
 *     diplomatic: AdvisorDef,
 *   },
 *   screens: ScreenDef[],
 *   events: EventDef[],
 *   assessment: AssessmentDef,
 * }
 *
 * ─── ADVISOR DEFINITION ────────────────────────────────────
 *
 * {
 *   name: string,           // e.g., "Industrial Investor"
 *   title: string,          // e.g., "Economic Advisor"
 *   role: 'economic' | 'security' | 'diplomatic',
 *   portrait: string,       // asset path
 *   quotes: string[],       // pool of dialogue lines
 *   specialRules: {         // optional per-lesson rules
 *     persistScreens: number,  // e.g., CIA operative persists 2 extra screens
 *     visualMod: string,       // e.g., "fedora-silhouette"
 *   },
 * }
 *
 * ─── SCREEN DEFINITION ─────────────────────────────────────
 *
 * {
 *   id: string,             // unique within lesson, e.g., "opening", "decision_1"
 *   type: 'narrative' | 'decision' | 'event' | 'outcome' | 'reflection' | 'assessment',
 *   title: string,
 *   text: string,           // main body text (supports basic HTML)
 *   map: MapRef | null,
 *   newspaper: NewspaperRef | null,
 *   advisorPrimary: 'economic' | 'security' | 'diplomatic',
 *   advisorDialogue: {
 *     economic: string,
 *     security: string,
 *     diplomatic: string,
 *   },
 *   next: string | null,     // screen ID for linear flow
 *   choices: ChoiceDef[] | null,  // for decision screens
 *   condition: ConditionDef | null,  // optional gate
 * }
 *
 * ─── CHOICE DEFINITION ─────────────────────────────────────
 *
 * {
 *   id: string,
 *   label: string,
 *   description: string,     // tooltip / expanded text
 *   advisorAlignment: 'economic' | 'security' | 'diplomatic',
 *   meterEffects: {
 *     economic: number,      // positive or negative delta
 *     stability: number,
 *     reputation: number,
 *   },
 *   flags: { [key]: boolean },
 *   next: string,            // screen ID after choice
 *   newspaper: NewspaperRef | null,
 * }
 *
 * ─── MAP REFERENCE ──────────────────────────────────────────
 *
 * {
 *   asset: string,           // path relative to assets root
 *   hotspots: [
 *     { x: number, y: number, label: string, tooltip: string },
 *   ],
 *   animation: string | null,  // e.g., "blockade-ring", "route-pulse"
 * }
 *
 * ─── NEWSPAPER REFERENCE ────────────────────────────────────
 *
 * {
 *   asset: string,
 *   trigger: string,         // when to show: "immediate" | "after-decision" | "outcome"
 *   perspective: string,     // e.g., "U.S. reformist", "Cuban oppositional"
 *   isOppositional: boolean,
 *   meterEffects: { economic, stability, reputation } | null,
 * }
 *
 * ─── EVENT DEFINITION ───────────────────────────────────────
 *
 * {
 *   id: string,
 *   card: string,            // event card asset path
 *   trigger: string,         // "scenario-start" | "after-decision" | "meter-threshold"
 *   triggerCondition: ConditionDef | null,
 *   meterEffects: { economic, stability, reputation },
 *   advisorPrimary: string,
 *   uiBehavior: string,      // "fade-in" | "newspaper-overlay" | "map-swap" | "dark-overlay"
 *   chainNext: string | null,  // next event ID in chain
 * }
 *
 * ─── CONDITION DEFINITION ───────────────────────────────────
 *
 * {
 *   type: 'flag' | 'meter' | 'decision' | 'lesson-complete',
 *   key: string,
 *   operator: '==' | '>' | '<' | '>=' | '<=',
 *   value: any,
 * }
 *
 * ─── ASSESSMENT DEFINITION ──────────────────────────────────
 *
 * {
 *   questions: [
 *     {
 *       id: string,
 *       type: 'multiple_choice' | 'short_answer' | 'document_analysis',
 *       prompt: string,
 *       context: string | null,   // document excerpt or image for DBQ-style
 *       options: string[],        // for multiple choice
 *       correctIndex: number,     // for multiple choice
 *       rubric: string | null,    // for short answer grading guidance
 *       explanation: string,      // shown after answer
 *       apStandard: string,       // e.g., "KC-7.3.II.A"
 *       skillTag: string,         // e.g., "Causation", "Comparison"
 *     },
 *   ],
 * }
 *
 * ─── ASSESSMENT RESULT ──────────────────────────────────────
 *
 * {
 *   lessonId: number,
 *   completedAt: string (ISO),
 *   answers: [
 *     { questionId, selectedIndex, isCorrect, timeSpent },
 *   ],
 *   score: number (0-100),
 *   skillBreakdown: { [skillTag]: { correct, total } },
 * }
 *
 * ─── TEACHER REPORT ─────────────────────────────────────────
 *
 * {
 *   classCode: string,
 *   generatedAt: string (ISO),
 *   students: [
 *     {
 *       name: string,
 *       lessonsCompleted: number[],
 *       overallScore: number,
 *       dominantAdvisor: string,
 *       decisionPattern: string,  // "interventionist" | "diplomatic" | "economic" | "mixed"
 *       flagsTriggered: string[],
 *       assessmentScores: { [lessonId]: number },
 *       skillGaps: string[],
 *     },
 *   ],
 *   classAverages: {
 *     completionRate: number,
 *     avgScore: number,
 *     commonDecisions: { [choiceId]: number },
 *     skillDistribution: { [skillTag]: number },
 *   },
 * }
 */

// This file is documentation-only. No executable code.
// Import this file for JSDoc reference if desired.
export default {};
