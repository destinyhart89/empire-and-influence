/**
 * EMPIRE & INFLUENCE — Mock Data Generator
 * Generates realistic demo data for teacher dashboard testing.
 * Covers all 4 ideology types, 4 L8 endings, all 19 continuity flags.
 */

import { createClass, addStudentsBulk, importStudentData, getStudents, getClass } from './core.js';

const STUDENT_NAMES = [
  'Aisha Johnson', 'Brandon Lee', 'Carlos Mendez', 'Diana Park',
  'Elijah Brown', 'Fatima Hassan', 'Gabriel Torres', 'Hannah Smith',
  'Isaiah Williams', 'Julia Kim', 'Kevin Martinez', 'Layla Ahmed',
  'Marcus Davis', 'Nadia Okonkwo', 'Omar Patel', 'Priya Singh',
  'Quincy Jackson', 'Rosa Vasquez', 'Samuel Chen', 'Tanya Moore',
];

// ─── Ideology profile builders ──────────────────────────────────────

function makeIdeologyState(type) {
  const base = { interventionist: 0, diplomatic: 0, economic_pragmatist: 0 };
  const history = [];
  const decisions = 14; // 14 ideology-bearing decisions across L5–L8

  // Distribution weights per type
  const weights = {
    interventionist:     [0.65, 0.20, 0.15], // [security%, diplomatic%, economic%]
    diplomatic:          [0.15, 0.65, 0.20],
    economic_pragmatist: [0.20, 0.20, 0.60],
    mixed:               [0.33, 0.34, 0.33],
  };

  const [wSec, wDip, wEco] = weights[type] || weights.mixed;

  for (let i = 0; i < decisions; i++) {
    const r = Math.random();
    let alignment;
    if      (r < wSec)              alignment = 'security';
    else if (r < wSec + wDip)       alignment = 'diplomatic';
    else                             alignment = 'economic';

    if (alignment === 'security')   base.interventionist     += 1;
    else if (alignment === 'diplomatic') base.diplomatic      += 1;
    else                                base.economic_pragmatist += 1;

    history.push({ decisionId: `d${i+1}`, alignment, weight: 1, timestamp: Date.now() - (decisions - i) * 3600000 });
  }

  return { scores: base, totalDecisions: decisions, history };
}

// ─── Flag builders ────────────────────────────────────────────────────

function makeFlags(type) {
  const f = {};
  if (type === 'interventionist') {
    // Hawkish set: coups, Contras, stonewall, invasion
    f.backed_corollary_l4         = true;
    f.covert_overthrow_approved   = true;
    f.backed_allende_coup         = true;
    f.cold_war_hawk               = true;
    f.backed_contras              = true;
    f.iran_contra_stonewall       = true;
    f.invasion_approved           = true;
    f.interventionist_doctrine_l7 = true;
  } else if (type === 'diplomatic') {
    // Reform set: rejected corollary, CIA reform, oppose Contras, multilateral
    f.rejected_corollary_l4       = true;
    f.prioritized_democracy       = true;
    f.supported_cia_reform_l5     = true;
    f.acknowledged_cia_role       = true;
    f.human_rights_priority_l6    = true;
    f.iran_contra_cooperated      = true;
    f.demanded_accountability_l6  = true;
    f.multilateral_standard_l7    = true;
    f.post_cold_war_precedent_set = true;
  } else if (type === 'economic_pragmatist') {
    // Trade/corporate set: corporate L4, backed Contras (limited), canal security
    f.corporate_backed_l4         = true;
    f.backed_contras              = true;   // limited support
    f.iran_contra_awareness       = true;   // acknowledged but didn't cooperate fully
    f.invasion_approved           = true;   // canal security
    f.post_cold_war_precedent_set = true;
  } else {
    // Mixed: random selection of 8–12 flags
    const all = [
      'backed_corollary_l4','rejected_corollary_l4','corporate_backed_l4',
      'covert_overthrow_approved','backed_allende_coup','cold_war_hawk',
      'prioritized_democracy','supported_cia_reform_l5','acknowledged_cia_role',
      'backed_contras','human_rights_priority_l6','iran_contra_stonewall',
      'iran_contra_cooperated','iran_contra_awareness','demanded_accountability_l6',
      'invasion_approved','multilateral_standard_l7','post_cold_war_precedent_set',
      'interventionist_doctrine_l7',
    ];
    all.forEach(id => { if (Math.random() > 0.45) f[id] = true; });
  }
  return f;
}

// ─── Assessment score builders ─────────────────────────────────────────

function makeAssessments(completedLessons, quality) {
  // POST-lesson scores (graded)
  const post = {};
  // PRE-lesson scores (diagnostic, not graded)
  const pre  = {};

  const totals = { 1:5, 2:5, 3:5, 4:5, 5:5, 6:5, 7:5, 8:7 };
  const baseTime = Date.now();

  completedLessons.forEach((lid, i) => {
    const total = totals[lid] || 5;
    const offset = (completedLessons.length - i) * 2 * 86400000; // 2 days per lesson

    // Pre score: quality - 15% to quality - 5% (always below post)
    const prePct  = Math.max(0.2, quality - 0.10 - Math.random() * 0.10);
    const postPct = Math.min(1.0, quality + Math.random() * 0.08);

    pre[lid]  = { score: Math.round(prePct  * total), total, completedAt: baseTime - offset - 86400000 };
    post[lid] = { score: Math.round(postPct * total), total, completedAt: baseTime - offset };
  });

  return { post, pre };
}

// ─── Decision history builders ─────────────────────────────────────────

const DECISION_TEMPLATES = {
  1: [
    { id: 'd1', int: 'Support U.S. military intervention in Cuba',   dip: 'Support Cuban independence and self-determination',  eco: 'Prioritize U.S. economic interests in Cuba' },
    { id: 'd2', int: 'Impose the Platt Amendment',                    dip: 'Negotiate limited sovereignty protections',           eco: 'Protect U.S. sugar industry interests' },
    { id: 'd3', int: 'Maintain occupation forces in Cuba',            dip: 'Honor Cuban independence after Spanish-American War', eco: 'Secure U.S. business contracts before withdrawal' },
  ],
  2: [
    { id: 'd1', int: 'Back U.S. backed Panama revolution',            dip: 'Negotiate treaty with Colombia directly',             eco: 'Prioritize fastest route for U.S. commerce' },
    { id: 'd2', int: 'Impose canal zone control terms on Panama',     dip: 'Negotiate equitable canal treaty',                   eco: 'Secure favorable toll and access terms' },
    { id: 'd3', int: 'Station military in Canal Zone permanently',    dip: 'Agree to joint administration with Panama',           eco: 'Ensure canal profitability for U.S. investors' },
  ],
  3: [
    { id: 'd1', int: 'Side with United Fruit Company against unions', dip: 'Recognize labor rights of banana workers',           eco: 'Support UFCO to protect U.S. investments' },
    { id: 'd2', int: 'Deploy Marines to protect U.S. plantations',   dip: 'Pursue diplomatic resolution of labor conflict',      eco: 'Renegotiate plantation contracts for stability' },
    { id: 'd3', int: 'Back Conservative government against reformers', dip: 'Support democratic reform movements',               eco: 'Maintain economic stability over political change' },
  ],
  4: [
    { id: 'd1', int: 'Endorse the Roosevelt Corollary fully',        dip: 'Reject U.S. right to intervene in hemisphere',       eco: 'Apply corollary only to protect U.S. investments' },
    { id: 'd2', int: 'Use military force to collect debts in Haiti', dip: 'Support debt mediation through international bodies', eco: 'Pursue debt restructuring favorable to U.S. banks' },
    { id: 'd3', int: 'Occupy Nicaragua indefinitely',                 dip: 'Negotiate withdrawal and self-determination',         eco: 'Maintain financial supervision without troops' },
  ],
  5: [
    { id: 'd1', int: 'Authorize PBSUCCESS CIA operation in Guatemala', dip: 'Reject covert CIA operation; support Árbenz',      eco: 'Demand more intelligence before deciding' },
    { id: 'd2', int: 'Use economic coercion to destabilize Allende',  dip: 'Accept Allende\'s democratic election result',      eco: 'Apply targeted pressure on Chilean copper' },
    { id: 'd3', int: 'Recognize Pinochet junta immediately',           dip: 'Condemn coup; acknowledge U.S. role',               eco: 'Secure U.S. business interests before recognizing' },
    { id: 'd4', int: 'Defend covert operations program in Congress',  dip: 'Support CIA reform after Church Committee',          eco: 'Limit reform to protect operational capacity' },
  ],
  6: [
    { id: 'd1', int: 'Fully fund the Contra program',                 dip: 'Oppose all Contra funding',                          eco: 'Authorize limited Contra support' },
    { id: 'd2', int: 'Certify El Salvador human rights compliance',  dip: 'Suspend military aid over El Mozote massacre',       eco: 'Condition aid on measurable HR improvements' },
    { id: 'd3', int: 'Stonewall Iran-Contra congressional inquiry',   dip: 'Fully cooperate with Iran-Contra investigation',     eco: 'Acknowledge Iran-Contra but protect sources' },
  ],
  7: [
    { id: 'd1', int: 'Authorize Operation Just Cause invasion',       dip: 'Pursue legal/diplomatic pressure on Noriega',        eco: 'Canal security operation only' },
    { id: 'd2', int: 'Install Endara government immediately',          dip: 'Support Panamanian transition framework',            eco: 'Secure canal agreement before government change' },
    { id: 'd3', int: 'Assert U.S. right to intervene unilaterally',  dip: 'Establish multilateral intervention standard',       eco: 'Case-by-case doctrine based on U.S. interests' },
  ],
  8: [
    { id: 'd1', int: 'Deny U.S. responsibility for Northern Triangle instability', dip: 'Fully acknowledge U.S. historical role', eco: 'Partial acknowledgment — focus on current solutions' },
    { id: 'd2', int: 'Give unconditioned military aid to Honduras',   dip: 'Condition aid on human rights accountability',       eco: 'Support CICIG anti-corruption model' },
    { id: 'd3', int: 'Security-first border enforcement policy',       dip: 'Invest in root cause economic development',         eco: 'Balanced trade and security approach' },
  ],
};

function choiceForType(d, type) {
  if (type === 'interventionist') return { choice: `int_${d.id}`, label: d.int, ideology: 'security' };
  if (type === 'diplomatic')      return { choice: `dip_${d.id}`, label: d.dip, ideology: 'diplomatic' };
  if (type === 'economic_pragmatist') return { choice: `eco_${d.id}`, label: d.eco, ideology: 'economic' };
  // Mixed: random
  const opts = ['int','dip','eco'];
  const pick = opts[Math.floor(Math.random() * 3)];
  return { choice: `${pick}_${d.id}`, label: d[pick], ideology: pick === 'int' ? 'security' : pick };
}

function makeDecisionHistory(completedLessons, type) {
  const lessons = {};
  completedLessons.forEach(lid => {
    const templates = DECISION_TEMPLATES[lid] || [];
    lessons[lid] = {
      decisions: templates.map(d => {
        const chosen = choiceForType(d, type);
        // Map decision to continuity flags where applicable
        const flagMap = {
          'd1_5_int': 'covert_overthrow_approved', 'd2_5_int': 'backed_allende_coup',
          'd3_5_int': null, 'd4_5_int': null,
          'd1_5_dip': null, 'd4_5_dip': 'supported_cia_reform_l5',
          'd3_5_dip': 'acknowledged_cia_role',
          'd1_6_int': null, // backed_contras set by flag builder
          'd3_6_dip': 'iran_contra_cooperated',
          'd3_6_int': 'iran_contra_stonewall',
          'd1_7_int': 'invasion_approved', 'd3_7_dip': 'multilateral_standard_l7',
          'd3_7_int': 'interventionist_doctrine_l7',
        };
        const flagKey = `d${d.id.replace('d','')}_${lid}_${chosen.choice.split('_')[0]}`;
        return {
          id: `${d.id}_l${lid}`,
          choice: chosen.choice,
          label: chosen.label,
          ideology: chosen.ideology,
          flagSet: flagMap[flagKey] || null,
        };
      }),
      metrics: {
        stability: 55 + Math.floor(Math.random() * 30),
        support:   50 + Math.floor(Math.random() * 35),
        resources: 60 + Math.floor(Math.random() * 25),
      },
      advisorAffinities: {
        economic:   Math.floor(1 + Math.random() * 4),
        security:   Math.floor(1 + Math.random() * 4),
        diplomatic: Math.floor(1 + Math.random() * 4),
      },
      completed: true,
    };
  });
  return lessons;
}

// ─── Full student game export builder ─────────────────────────────────

function makeStudentExport(name, classCode, type, numCompleted, quality) {
  const completed = Array.from({ length: Math.min(numCompleted, 8) }, (_, i) => i + 1);
  const { post, pre } = makeAssessments(completed, quality);
  const flags    = makeFlags(type);
  const ideology = makeIdeologyState(type);
  const lessons  = makeDecisionHistory(completed, type);

  return {
    player:     { name, classCode, role: 'student', sessionId: `mock_${Date.now().toString(36)}` },
    progress:   { completedLessons: completed, ideology, flags },
    assessments:    post,
    preAssessments: pre,
    lessons,
    exportedAt: new Date().toISOString(),
  };
}

// ─── Demo Class Initializer ───────────────────────────────────────────

/**
 * Creates a demo class with 20 students and realistic mock data.
 * Call this to populate the dashboard for testing / demo.
 * Returns the class ID.
 */
export function initDemoClass() {
  // Check if demo class already exists to avoid duplicates
  const existing = JSON.parse(localStorage.getItem('ei_teacher_db') || '{}');
  const demo = Object.values(existing.classes || {}).find(c => c.name.includes('Demo'));
  if (demo) return demo.id;

  const cls = createClass({
    name:            'APUSH Period 3 — Demo Class',
    grade:           '11',
    period:          '3',
    pacingMode:      'standard',
    startDate:       '2026-01-15',
    assignedLessons: [1,2,3,4,5,6,7,8],
  });

  addStudentsBulk(cls.id, STUDENT_NAMES);
  const students = getStudents(cls.id);

  // Student profile mix:
  // 4 interventionist (ending C), 5 diplomatic (ending A), 4 economic (ending B), 7 mixed (ending D)
  // Completion: 4 students at 100%, 10 at 6–7 lessons, 6 at 3–5 lessons (realistic mid-semester)
  // Quality spread: 3 excelling (90%), 10 on-track (70–80%), 5 developing (60%), 2 struggling (45%)
  const configs = [
    // name index → [type, lessonsCompleted, quality]
    { type: 'interventionist',     completed: 8, quality: 0.91 }, // Aisha
    { type: 'diplomatic',          completed: 8, quality: 0.88 }, // Brandon
    { type: 'economic_pragmatist', completed: 8, quality: 0.94 }, // Carlos
    { type: 'mixed',               completed: 8, quality: 0.73 }, // Diana
    { type: 'interventionist',     completed: 7, quality: 0.79 }, // Elijah
    { type: 'diplomatic',          completed: 7, quality: 0.83 }, // Fatima
    { type: 'economic_pragmatist', completed: 7, quality: 0.66 }, // Gabriel
    { type: 'mixed',               completed: 7, quality: 0.71 }, // Hannah
    { type: 'interventionist',     completed: 6, quality: 0.58 }, // Isaiah — struggling
    { type: 'diplomatic',          completed: 6, quality: 0.75 }, // Julia
    { type: 'economic_pragmatist', completed: 6, quality: 0.69 }, // Kevin
    { type: 'mixed',               completed: 6, quality: 0.77 }, // Layla
    { type: 'interventionist',     completed: 5, quality: 0.62 }, // Marcus
    { type: 'diplomatic',          completed: 5, quality: 0.86 }, // Nadia
    { type: 'mixed',               completed: 5, quality: 0.44 }, // Omar — needs support
    { type: 'diplomatic',          completed: 4, quality: 0.81 }, // Priya
    { type: 'mixed',               completed: 4, quality: 0.68 }, // Quincy
    { type: 'economic_pragmatist', completed: 3, quality: 0.55 }, // Rosa
    { type: 'mixed',               completed: 3, quality: 0.47 }, // Samuel — needs support
    { type: 'interventionist',     completed: 7, quality: 0.72 }, // Tanya
  ];

  students.forEach((student, i) => {
    const cfg = configs[i] || { type: 'mixed', completed: 4, quality: 0.65 };
    const gameExport = makeStudentExport(student.name, cls.code, cfg.type, cfg.completed, cfg.quality);
    importStudentData(student.id, gameExport);
  });

  console.log(`[MockData] Demo class "${cls.name}" created with ${students.length} students. Code: ${cls.code}`);
  return cls.id;
}

/**
 * Load mock data into an existing class (for teacher-created classes during testing).
 */
export function loadMockDataIntoClass(classId) {
  const cls      = getClass(classId);
  const students = getStudents(classId);
  if (!cls || !students.length) return false;

  const types   = ['interventionist','diplomatic','economic_pragmatist','mixed'];
  const quality = [0.88, 0.75, 0.62, 0.92, 0.55, 0.79, 0.66, 0.84, 0.50, 0.73];

  students.forEach((student, i) => {
    const type      = types[i % types.length];
    const q         = quality[i % quality.length];
    const completed = Math.max(2, 8 - Math.floor(i / 5));
    const gameExport = makeStudentExport(student.name, cls.code, type, completed, q);
    importStudentData(student.id, gameExport);
  });

  return true;
}
