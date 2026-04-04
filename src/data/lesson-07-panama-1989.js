/**
 * EMPIRE & INFLUENCE — Lesson 7: Panama 1989 (Operation Just Cause)
 *
 * Era: cold-war | Period 8 / Bridge to Period 9
 * The last Cold War–era U.S. military intervention in Latin America.
 * Students navigate the decision to invade Panama and remove Manuel Noriega.
 *
 * APUSH Standards: KC-9.3.I.A, KC-9.3.II.A
 *
 * Available assets:
 *   Maps:       L07_MAP_01_Panama_OperationJustCause.png
 *               (L07_MAP_02 MISSING — noted in documentation)
 *   Newspapers: L07_NEWS_01_InvasionOfPanama_NYRecord.png
 *               (L07_NEWS_02 + oppositional newspaper MISSING — noted)
 *   Portraits:  L07_PORT_01_EconomicAdvisor_TradeCanalStrategist.png
 *               L07_PORT_02_SecurityAdvisor_USMilitaryCommander.png
 *               L07_PORT_03_DiplomaticAdvisor_StateDeptOfficial.png
 *
 * Continuity in from L6 (Contra Wars):
 *   - backed_contras → military commander references operational experience
 *   - human_rights_priority_l6 → diplomatic advisor starts with +1 trust
 *   - iran_contra_stonewall → stability starts lower
 *   - iran_contra_awareness → diplomatic advisor references accountability
 *
 * Continuity out to L8 (Modern Interventions):
 *   - flags: invasion_approved, supported_noriega_removal, sought_legal_pathway,
 *            prioritized_canal_security, post_cold_war_precedent_set
 *   - delayed consequences: post–Cold War precedent questions in L8
 */

const lesson07 = {
  id: 7,
  title: 'Operation Just Cause',
  subtitle: 'Panama, 1989',
  era: 'cold-war',
  period: 'Period 8 / 9',
  apStandards: ['KC-9.3.I.A', 'KC-9.3.II.A'],

  // ═══════════════════════════════════════════════════════
  // CONTINUITY IN (from L6 Contra Wars)
  // ═══════════════════════════════════════════════════════

  continuityIn: {
    advisorTrustBonuses: [
      { ifFlag: 'human_rights_priority_l6', advisor: 'diplomatic', delta: 1 },
      { ifFlag: 'backed_contras', advisor: 'security', delta: 1 },
      { ifFlag: 'demanded_accountability_l6', advisor: 'diplomatic', delta: 1 },
    ],
    metricAdjustments: [
      { ifFlag: 'iran_contra_stonewall', effects: { stability: -8, support: -5 } },
      { ifFlag: 'iran_contra_awareness', effects: { support: +3 } },
      { ifFlag: 'iran_contra_cooperated', effects: { support: +5, stability: +3 } },
    ],
    narrativeContext: {
      ifFlag: 'iran_contra_stonewall',
      text: 'The Iran-Contra fallout has damaged the administration\'s credibility. The Bush team is inheriting an intelligence community under scrutiny.',
    },
  },

  // ═══════════════════════════════════════════════════════
  // ADVISORS
  // ═══════════════════════════════════════════════════════

  advisors: {
    economic: {
      name: 'Trade Canal Strategist',
      title: 'Economic Advisor',
      portrait: 'L07_PORT_01_EconomicAdvisor_TradeCanalStrategist.png',
      initialTrust: 0,
      metricWeights: { influence: 0.8, stability: 0.5, economic: 1.8, support: 0.5 },
      bias: { primary: 'canal_access', secondary: 'trade_stability', aversion: 'disruption' },
      quotes: {
        decision_1: 'The Panama Canal handles 5% of world trade. Noriega has declared war on the United States and is actively threatening canal operations. Our shipping clients — every major American importer and exporter — cannot operate under this uncertainty.',
        decision_2: 'The treaties require we hand the canal to Panama by 1999. But the terms assume a stable Panamanian government. A Noriega-controlled canal is an operational and strategic liability.',
        decision_3: 'Whoever controls Panama City controls the canal. The Endara government, installed under U.S. protection, is economically pragmatic. Relations with them will be productive.',
        decision_4: 'The Post-Cold War era is primarily about trade, not ideology. Panama\'s value is entirely economic. Maintaining canal stability is the only metric that matters long-term.',
        reaction_approve: [
          'The canal is secured. Shipping firms will be relieved.',
          'This is what maintaining strategic infrastructure looks like.',
          'Good. The economic interests are protected.',
        ],
        reaction_disapprove: [
          'Without canal security, this is a hollow victory.',
          'The canal was the whole point. I hope you haven\'t gambled with it.',
          'Long-term, I\'ll need reassurances about treaty compliance.',
        ],
        default: 'Five percent of world trade passes through those locks. That\'s not strategic — it\'s essential.',
      },
    },

    security: {
      name: 'U.S. Military Commander',
      title: 'Security Advisor',
      portrait: 'L07_PORT_02_SecurityAdvisor_USMilitaryCommander.png',
      initialTrust: 0,
      metricWeights: { influence: 2.0, stability: 1.0, economic: 0.3, support: 0.6 },
      bias: { primary: 'force_superiority', secondary: 'rapid_decision', aversion: 'negotiation' },
      quotes: {
        decision_1: 'Noriega declared war on the United States on December 15th. One of our Marines was killed. Another was beaten, his wife sexually threatened at a checkpoint. This is not a negotiation situation. We have 10,000 troops already in country. We give the order at 1:00 AM and it\'s over in 72 hours.',
        decision_2: 'Operation Blue Spoon — renamed Just Cause — is ready. 27,000 troops, air assaults on Noriega compounds, simultaneous operations across 27 targets. Speed and force eliminate the risk of a prolonged engagement.',
        decision_3: 'Noriega is hiding in the Vatican Embassy. We surround it. We play rock music at high volume. He gives himself up in ten days. The operation is complete.',
        decision_4: 'This is what decisive American military action looks like — minimal casualties on our side, objective achieved in 72 hours. This is the template.',
        reaction_approve: [
          'The troops are ready. We move at 0100.',
          'Decisive action. That\'s how you end it.',
          'Noriega has no counter to 27,000 troops. This is done.',
        ],
        reaction_disapprove: [
          'Negotiation with a man who declared war on us? That\'s not a negotiation — it\'s a surrender.',
          'Every hour we delay, our credibility erodes.',
          'The window closes fast. Act now or it gets complicated.',
        ],
        default: 'Speed and force will ensure success. Hesitation invites resistance.',
      },
    },

    diplomatic: {
      name: 'State Department Official',
      title: 'Diplomatic Advisor',
      portrait: 'L07_PORT_03_DiplomaticAdvisor_StateDeptOfficial.png',
      initialTrust: 0,
      metricWeights: { influence: 0.3, stability: 1.5, economic: 0.3, support: 1.8 },
      bias: { primary: 'legal_process', secondary: 'regional_standing', aversion: 'unilateral_force' },
      quotes: {
        decision_1: 'Noriega has been indicted on drug charges in a U.S. federal court. We have a legal case to make to the OAS, to the UN, to the international community. An invasion without multilateral authorization will set a precedent we\'ll spend years managing.',
        decision_2: 'We installed a Panamanian government on a U.S. military base before the invasion and then claimed we were restoring democracy. The OAS condemned this 20–1. Our regional relationships will absorb this damage for years.',
        decision_3: 'The civilian death toll needs independent verification. The Panamanian government says 516 civilians killed. The human rights organizations say much higher. We have an obligation to investigate.',
        decision_4: 'The Cold War is ending. With it, the anti-communist justification for intervention. What precedent are we setting for the post–Cold War world? That was the question I wanted us to ask before we invaded.',
        reaction_approve: [
          'The legal approach was the right approach. Thank you.',
          'History will judge the process as much as the outcome.',
          'We can live with this decision.',
        ],
        reaction_disapprove: [
          'The OAS vote was 20–1 against us. We should note that.',
          'The post–Cold War precedent concerns me deeply.',
          'We\'ve established that unilateral invasion is acceptable when we decide it is.',
        ],
        default: 'The Cold War ending changes everything. What we do in Panama sets the template for what comes next.',
      },
    },
  },

  // ═══════════════════════════════════════════════════════
  // SCREENS
  // ═══════════════════════════════════════════════════════

  screens: [

    // ─── Pre-Assessment ──────────────────────────────────
    {
      id: 'pre_assessment',
      type: 'assessment',
      isPreAssessment: true,
      title: 'Before We Begin: Panama and the End of the Cold War',
      questions: [
        {
          id: 'pre_l7_q1',
          type: 'multiple_choice',
          prompt: 'The Panama Canal was originally built under U.S. direction beginning in 1904 after the U.S. supported Panama\'s independence from:',
          options: [
            'Spain',
            'Colombia',
            'Venezuela',
            'Nicaragua',
          ],
          correctIndex: 1,
          skillTags: ['KC'],
          difficulty: 1,
          explanation: 'Panama was a province of Colombia until 1903, when the U.S. supported Panamanian independence in exchange for canal rights. This was the direct outcome of the events in Lesson 2 (The Canal Question).',
        },
        {
          id: 'pre_l7_q2',
          type: 'multiple_choice',
          prompt: 'The 1977 Torrijos-Carter Treaties committed the U.S. to:',
          options: [
            'Maintaining military bases in Panama indefinitely',
            'Transferring full control of the Panama Canal to Panama by December 31, 1999',
            'Providing Panama with $1 billion in annual military aid',
            'Granting Panamanian citizens U.S. residency rights',
          ],
          correctIndex: 1,
          skillTags: ['KC'],
          difficulty: 2,
          explanation: 'The Torrijos-Carter Treaties (1977) were a landmark — the U.S. agreed to transfer control of the Canal Zone to Panama on December 31, 1999. This was controversial in the U.S. but seen as necessary to maintain regional goodwill.',
        },
        {
          id: 'pre_l7_q3',
          type: 'multiple_choice',
          prompt: 'Manuel Noriega\'s relationship with the United States before 1988 is best described as:',
          options: [
            'Hostile — Noriega had always opposed U.S. interests',
            'Cooperative — Noriega was a CIA asset who had worked with U.S. intelligence for years',
            'Neutral — the U.S. had no relationship with Noriega before his drug indictment',
            'Adversarial — Noriega aligned with the Soviet Union throughout the Cold War',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'COMP'],
          difficulty: 3,
          explanation: 'Noriega was a CIA asset dating back to the 1960s and had been on the CIA payroll. His drug trafficking and human rights abuses were known but tolerated due to his intelligence value and anti-communist stance. His 1988 U.S. drug indictment came after this relationship broke down.',
        },
      ],
      next: 'intro',
    },

    // ─── Introduction ────────────────────────────────────
    {
      id: 'intro',
      type: 'intro',
      title: 'Operation Just Cause',
      subtitle: 'The Cold War\'s Final Latin American Act',
      text: `<p>December 1989. The Berlin Wall has fallen. The Soviet Union is disintegrating. President George H.W. Bush is navigating the transition from Cold War to whatever comes next.</p>

<p>In Panama, General Manuel Noriega — former CIA asset, former U.S. ally — has declared "a state of war" with the United States. A U.S. Marine has been killed at a checkpoint. Another has been beaten, his wife threatened. Noriega has been indicted on drug trafficking charges in a U.S. federal court.</p>

<p>The Cold War justification — anti-communism — barely applies here. Noriega is not a Communist. But the Panama Canal, U.S. military installations, and 35,000 American citizens are at stake.</p>

<p>Bush must decide: direct military intervention, or a legal and diplomatic path?</p>`,
      advisorDialogue: {
        security: 'We have 10,000 troops already in country under the canal treaties. One Marine is dead. Noriega declared war on us. We move at 0100.',
        economic: 'The canal handles 5% of world trade. Noriega is threatening operations. Our shipping clients need certainty.',
        diplomatic: 'Noriega is a criminal we helped create. An invasion sets a post–Cold War precedent we haven\'t thought through.',
      },
      advisorPrimary: 'security',
      map: {
        asset: 'L07_MAP_01_Panama_OperationJustCause.png',
        caption: 'Operation Just Cause — 27 simultaneous target areas, air assault routes, and canal zone operational boundaries (December 20, 1989)',
      },
      next: 'context_noriega',
    },

    // ─── Context: Noriega Background ─────────────────────
    {
      id: 'context_noriega',
      type: 'context',
      title: 'The Man We Made',
      subtitle: 'CIA Relationship File — Declassified',
      text: `<p>Manuel Noriega's relationship with U.S. intelligence spans three decades. He was first recruited by the U.S. Army School of the Americas in the 1960s. He became a CIA asset in 1967, paid up to $200,000 per year for intelligence on Latin American political movements — including reporting on his own country's politicians.</p>

<p>His drug trafficking was known by the 1970s. George H.W. Bush, as CIA Director in 1976, was briefed on Noriega's narcotics connections. The relationship continued. During the Contra Wars, Noriega provided logistics for CIA operations, despite his drug trafficking expanding dramatically.</p>

<p>By 1988, he was indicted on federal drug charges in Florida and Miami. The Reagan and Bush administrations first attempted to negotiate his removal, offering to drop the indictments. Noriega refused.</p>

<p>On December 15, 1989, Noriega's National Assembly declared a state of war with the United States. On December 16, Marines were harassed at checkpoints — one killed, others beaten. President Bush authorized Operation Just Cause for December 20.</p>`,
      next: 'decision_1',
    },

    // ─── Decision 1: Invasion Authorization ──────────────
    {
      id: 'decision_1',
      type: 'decision',
      title: 'Decision Point 1 — Authorize the Invasion?',
      text: 'Noriega has declared war. A Marine is dead. 27,000 troops are positioned. The operational window is tonight. How do you proceed?',
      choices: [
        {
          id: 'd1_authorize_invasion',
          label: 'Authorize Operation Just Cause — full invasion',
          description: 'Authorize the 27-target simultaneous operation. 27,000 troops. Air assaults on command centers. Operation begins at 0100, December 20.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          immediate: {
            effects: { influence: +20, stability: -12, economic: +8, support: +5 },
            flags: { invasion_approved: true, post_cold_war_precedent_set: true },
            narrative: 'Operation Just Cause begins. 27,000 U.S. troops launch simultaneous operations across Panama City. Within 72 hours, most military resistance collapses. Noriega goes into hiding.',
          },
          reactions: {
            economic: { trustDelta: +2, dialogue: 'Canal secured. Endara government in place. Trade can proceed normally.' },
            security: { trustDelta: +2, dialogue: 'Textbook operation. 23 American KIA, estimated 500 Panamanian military. Noriega in the wind, but the government is neutralized.' },
            diplomatic: { trustDelta: -2, dialogue: 'OAS condemned this 20–1. We\'ve established that unilateral intervention is acceptable when we decide it is. The post–Cold War world will remember this.' },
          },
          delayed: [
            {
              trigger: 'next_lesson',
              targetLesson: 8,
              narrative: 'The Panama invasion precedent — unilateral action justified by drug trafficking and democracy restoration — creates a template debated in post-Cold War foreign policy discussions.',
              effects: { influence: +5, stability: -5 },
            },
          ],
        },
        {
          id: 'd1_limited_operation',
          label: 'Limited operation — capture Noriega only',
          description: 'Authorize a surgical operation targeting Noriega specifically. No general invasion. Minimize civilian casualties and collateral damage.',
          advisorAlignment: 'security',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: +10, stability: -5, economic: +5, support: +3 },
            flags: { invasion_approved: true, limited_operation_l7: true },
            narrative: 'A surgical strike is authorized. Special Forces target Noriega\'s known locations. The broader military apparatus is not engaged. Noriega initially evades but the operation reduces civilian casualties significantly.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'A measured approach. Less disruption to civilian infrastructure means faster economic normalization.' },
            security: { trustDelta: 0, dialogue: 'Noriega is still in the wind. Without the broader operation, he can regroup from the Vatican Embassy indefinitely.' },
            diplomatic: { trustDelta: +1, dialogue: 'More proportionate. The legal principle is still problematic, but the restraint matters.' },
          },
        },
        {
          id: 'd1_demand_legal_pathway',
          label: 'Pursue legal pathway — extradition, not invasion',
          description: 'Decline to invade. Work through international legal channels: extradition treaty, UN Security Council sanctions, OAS pressure. Noriega\'s federal indictment provides a legal basis.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          immediate: {
            effects: { influence: -10, stability: +12, economic: -3, support: -5 },
            flags: { sought_legal_pathway: true },
            narrative: 'The administration pursues diplomatic and legal channels. The UN Security Council considers sanctions. Panama\'s canal is placed under international monitoring. The process is slow — but Noriega is contained.',
          },
          reactions: {
            economic: { trustDelta: -1, dialogue: 'Extended uncertainty is bad for trade. But a prolonged invasion would be worse.' },
            security: { trustDelta: -2, dialogue: 'We\'ve just told every government in the Western Hemisphere that killing our Marines costs nothing. This is a strategic error.' },
            diplomatic: { trustDelta: +3, dialogue: 'We have a federal indictment. We have treaty mechanisms. We should use them. Thank you.' },
          },
        },
      ],
      next: 'consequence_1',
    },

    // ─── Consequence 1 ────────────────────────────────────
    {
      id: 'consequence_1',
      type: 'consequence',
      title: 'Panama City Burns',
      text: `<p>Operation Just Cause is a military success. Within 72 hours, the Panamanian Defence Forces collapse. The elected government of Guillermo Endara — who had been installed on a U.S. military base the night before the invasion — assumes power.</p>

<p>The costs: 23 U.S. military killed. Estimates of Panamanian military deaths range from 314 (U.S.) to 600+ (independent). Civilian deaths are more contested — the U.S. says 516, human rights organizations suggest significantly higher. The neighborhood of El Chorrillo, near the PDF headquarters, is burned and largely destroyed. 15,000–20,000 Panamanians are displaced.</p>

<p>Noriega takes refuge in the Vatican Embassy.</p>`,
      newspaper: {
        asset: 'L07_NEWS_01_InvasionOfPanama_NYRecord.png',
        trigger: 'immediate',
        headline: 'U.S. INVADES PANAMA — Noriega Flees as 27,000 Troops Seize Capital',
        perspective: 'U.S. press',
        bodyText: 'Operation Just Cause concluded within 72 hours. The Noriega government has collapsed. Elected President Guillermo Endara has taken office. Noriega\'s location unknown.',
        showCondition: { flag: 'invasion_approved' },
      },
      autoEffects: {},
      next: 'decision_2',
    },

    // ─── Decision 2: Post-Invasion Governance ─────────────
    {
      id: 'decision_2',
      type: 'decision',
      title: 'Decision Point 2 — Post-Invasion Governance',
      text: 'Noriega is in the Vatican Embassy. The new Endara government is installed but fragile. The U.S. must navigate the post-invasion transition.',
      choices: [
        {
          id: 'd2_rapid_transition',
          label: 'Rapid handover to Endara government',
          description: 'Commit to rapid democratic transition. Withdraw most U.S. forces within 60 days. Support the Endara government\'s reconstruction. Honor the 1999 canal transfer timeline.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          immediate: {
            effects: { influence: +5, stability: +8, economic: +5, support: +8 },
            flags: { rapid_transition_l7: true, prioritized_canal_security: true },
            narrative: 'The administration commits to rapid transition. U.S. forces begin drawing down. Endara\'s government begins reconstruction. International criticism softens.',
          },
          reactions: {
            economic: { trustDelta: +2, dialogue: 'The canal transfer remains on schedule. Trade relationships normalized.' },
            security: { trustDelta: 0, dialogue: 'Endara is weak, but manageable. The real question is whether he can hold the country.' },
            diplomatic: { trustDelta: +2, dialogue: 'Rapid transition limits the occupation footprint. This is the right approach.' },
          },
        },
        {
          id: 'd2_extended_presence',
          label: 'Extended U.S. presence — rebuild institutions',
          description: 'Maintain a substantial U.S. military and civilian presence for 18 months to rebuild Panamanian institutions, train a new security force, and manage the transition.',
          advisorAlignment: 'security',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: +10, stability: +3, economic: -3, support: -5 },
            flags: { extended_presence_l7: true, prioritized_canal_security: true },
            narrative: 'U.S. forces remain in significant numbers. Nation-building operations begin. Regional allies express concern about occupation precedent.',
          },
          reactions: {
            economic: { trustDelta: 0, dialogue: 'Stability maintained, but the cost of the extended presence is real.' },
            security: { trustDelta: +1, dialogue: 'We\'re building a government that can actually govern. This is the right investment.' },
            diplomatic: { trustDelta: -1, dialogue: 'The longer we stay, the more it looks like occupation. The OAS is watching.' },
          },
        },
      ],
      next: 'consequence_2',
    },

    // ─── Consequence 2 ────────────────────────────────────
    {
      id: 'consequence_2',
      type: 'consequence',
      title: 'Noriega Surrenders — The War Ends',
      text: `<p>After ten days of psychological pressure — U.S. troops blasting rock music at the Vatican Embassy — Manuel Noriega surrenders on January 3, 1990. He is flown to Florida, tried, and convicted on eight counts of drug trafficking, racketeering, and money laundering. He serves 17 years in U.S. federal prison.</p>

<p>The Panama Canal is transferred to full Panamanian control on December 31, 1999 — on schedule as per the Torrijos-Carter Treaties.</p>

<p>The broader question: what precedent has Operation Just Cause set? The Cold War is ending. The justification for the next intervention — wherever it comes — will be different. But the template for acting unilaterally, with military force, to remove a foreign leader the U.S. finds unacceptable has been established — or reinforced.</p>`,
      autoEffects: {},
      next: 'decision_3',
    },

    // ─── Decision 3: Post–Cold War Doctrine ───────────────
    {
      id: 'decision_3',
      type: 'decision',
      title: 'Decision Point 3 — Defining the Post–Cold War Doctrine',
      text: 'The Cold War is ending. Bush administration officials are drafting guidance for post–Cold War U.S. foreign policy. Panama has established a precedent — what should the doctrine say about future interventions?',
      choices: [
        {
          id: 'd3_interventionist_doctrine',
          label: 'Define unilateral intervention as a standing option',
          description: 'The Panama model — unilateral military intervention to restore democracy or remove criminal governments — should be explicit U.S. doctrine for the post–Cold War era.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          immediate: {
            effects: { influence: +15, stability: -10, economic: +3, support: -5 },
            flags: { interventionist_doctrine_l7: true, post_cold_war_precedent_set: true },
            narrative: 'The doctrine is formalized. U.S. military planning explicitly includes unilateral intervention for "restoration of democracy" and "protection of U.S. citizens and interests."',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Clarity is good for markets. We know where we stand.' },
            security: { trustDelta: +2, dialogue: 'This is the template. We know it works. Let\'s be honest about it.' },
            diplomatic: { trustDelta: -2, dialogue: 'We\'ve written a blank check for future administrations to use military force whenever they determine a government is sufficiently criminal or undemocratic. The consequences will be felt for decades.' },
          },
          delayed: [
            {
              trigger: 'next_lesson',
              targetLesson: 8,
              narrative: 'The formalized interventionist doctrine creates the justificatory framework that future administrations use for military action far beyond Latin America.',
              effects: { influence: +8, stability: -12 },
            },
          ],
        },
        {
          id: 'd3_multilateral_preference',
          label: 'Multilateral authorization as the preferred standard',
          description: 'Panama was an exceptional case. Establish that future interventions should require multilateral authorization — UN Security Council, OAS, or NATO — except in cases of direct attack on U.S. citizens.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: -5, stability: +12, economic: 0, support: +8 },
            flags: { multilateral_standard_l7: true },
            narrative: 'The doctrine emphasizes multilateral frameworks. U.S. foreign policy planning begins including OAS and UN processes as preferred — though not required — pathways.',
          },
          reactions: {
            economic: { trustDelta: 0, dialogue: 'Multilateral processes are slower but produce more stable outcomes for business.' },
            security: { trustDelta: -1, dialogue: 'Waiting for UN consensus will cost us operational speed in future crises.' },
            diplomatic: { trustDelta: +3, dialogue: 'This is the right framework for the post–Cold War world. Thank you.' },
          },
        },
        {
          id: 'd3_narrow_criteria',
          label: 'Narrow the criteria for future intervention',
          description: 'Panama will be treated as sui generis — uniquely justified. Future interventions require specific criteria: direct threat to U.S. lives, verifiable criminal activity, and exhaustion of legal remedies.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          immediate: {
            effects: { influence: 0, stability: +8, economic: 0, support: +5 },
            flags: { narrow_criteria_l7: true },
            narrative: 'Narrow criteria established. The doctrine creates a high bar for future unilateral military intervention, treating Panama as exceptional.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Clear criteria reduce uncertainty. Predictability is valuable.' },
            security: { trustDelta: 0, dialogue: 'The criteria are defensible. We\'ve preserved flexibility where it matters.' },
            diplomatic: { trustDelta: +2, dialogue: 'A high bar for intervention is appropriate. The Panama precedent is constrained.' },
          },
        },
      ],
      next: 'outcome',
    },

    // ─── Outcome ─────────────────────────────────────────
    {
      id: 'outcome',
      type: 'outcome',
      title: 'The End of an Era — The Beginning of Another',
      text: `<p>Operation Just Cause was the last Cold War–era U.S. military intervention in Latin America. With the Soviet Union collapsing, the anti-communist justification that had underpinned U.S. policy since the 1950s was dissolving.</p>

<p>But the interventionist pattern — and the institutional capability — remained. The military machine built for Cold War proxy warfare was looking for new missions. The drug war. Democracy promotion. Humanitarian intervention. The justifications were changing; the capability was not.</p>

<p>The next lesson takes us to the present: Guatemala, Honduras, El Salvador — and the question of what responsibility the United States bears for the consequences of a century of intervention.</p>`,
      conditionalContent: [
        {
          condition: { flag: 'sought_legal_pathway' },
          title: 'The Path Not Taken',
          text: '<p>Your decision to pursue legal channels rather than military action represented a genuine departure from the century-long pattern. Whether it would have worked is unclear — but the precedent you did not set matters for what comes next.</p>',
        },
        {
          condition: { flag: 'interventionist_doctrine_l7' },
          title: 'The Template Is Set',
          text: '<p>You have formalized what U.S. policymakers had practiced for a century: unilateral military intervention as a standard tool of foreign policy. The next administration to inherit this doctrine will use it. The question is where and to what end.</p>',
        },
      ],
      next: 'reflection',
    },

    // ─── Reflection ──────────────────────────────────────
    {
      id: 'reflection',
      type: 'reflection',
      title: 'Historical Reflection: Continuity from Big Stick to Just Cause',
      text: `<p><strong>The APUSH question this lesson asks:</strong> What connects the interventionist patterns of the early 20th century to Cold War and post–Cold War operations?</p>

<p>From the Spanish-American War (1898) to Operation Just Cause (1989), U.S. military interventions in Latin America followed a consistent pattern: a justification (civilization, anti-communism, drug trafficking, democracy), a target (Spain, Árbenz, Allende, Noriega), and a result (regime change, installation of a favorable government, strategic asset protection).</p>

<p>The justifications changed. The anti-communism of the Cold War replaced the civilizationist and economic imperatives of the early 20th century. But the underlying structure — U.S. determination of which governments are acceptable — remained constant.</p>

<p><strong>Think about:</strong> Is Operation Just Cause best understood as a Cold War operation, a post–Cold War operation, or a continuation of a much longer pattern? What does the Noriega case — a former CIA asset removed by the country that built him — tell us about the sustainability of U.S. interventionist strategy?</p>`,
      next: 'historical_comparison',
    },

    // ─── Historical Comparison ───────────────────────────
    {
      id: 'historical_comparison',
      type: 'context',
      title: 'Eight Lessons, One Pattern',
      subtitle: 'APUSH Long-Range Synthesis',
      text: `<p>Across the eight scenarios in this game — from Cuba 1898 to Panama 1989 — a consistent pattern emerges:</p>

<p><strong>The structure of U.S. intervention in Latin America:</strong> (1) A U.S. interest is threatened — economic investment, strategic asset, ideological alignment; (2) A justification is constructed — civilization, stability, anti-communism, drug trafficking; (3) A method is chosen — military, covert, economic pressure; (4) A government is removed or constrained; (5) A more favorable government is installed or strengthened; (6) Short-term U.S. objectives are met; (7) Long-term consequences — instability, anti-Americanism, authoritarian entrenchment — accumulate.</p>

<p><strong>The final lesson asks:</strong> Are we still in this pattern? Guatemala, Honduras, and El Salvador in the 21st century — the Central American countries most affected by 20th-century U.S. intervention — are the primary sources of contemporary Central American migration. This is not coincidental. It is the final consequence of decisions made across eight lessons of American imperial history.</p>`,
      next: 'assessment',
    },

    // ─── Assessment ──────────────────────────────────────
    {
      id: 'assessment',
      type: 'assessment',
      isPreAssessment: false,
      title: 'Lesson 7 Assessment: Panama 1989',
      questions: [
        {
          id: 'l7_q1',
          type: 'multiple_choice',
          prompt: 'The stated justifications for Operation Just Cause included all of the following EXCEPT:',
          options: [
            'Protecting the lives of U.S. citizens in Panama',
            'Arresting Manuel Noriega on existing U.S. drug trafficking charges',
            'Defending Panama from a Cuban military invasion',
            'Restoring democratic government after Noriega\'s election fraud',
          ],
          correctIndex: 2,
          skillTags: ['KC'],
          difficulty: 2,
          apStandards: ['KC-9.3.I.A'],
          explanation: 'The four stated justifications for Operation Just Cause were: protecting U.S. lives, defending the Canal treaties, restoring democracy, and bringing Noriega to justice on drug charges. Cuba was not involved — Noriega was not aligned with Cuba or the Soviet Union.',
        },
        {
          id: 'l7_q2',
          type: 'multiple_choice',
          prompt: 'Operation Just Cause (1989) is historically notable as a precedent because it:',
          options: [
            'Was the first U.S. military operation conducted without congressional authorization',
            'Established "democracy restoration" and criminal prosecution as post–Cold War justifications for unilateral military intervention',
            'Demonstrated that the U.S. military could not sustain operations in urban environments',
            'Marked the first time the U.S. used air power in Latin America',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'CAUS'],
          difficulty: 3,
          apStandards: ['KC-9.3.I.A', 'KC-9.3.II.A'],
          explanation: 'With the Cold War ending and anti-communism losing its justificatory power, Panama established a new template: the U.S. could intervene militarily to remove a government it deemed criminal or undemocratic. This "democracy restoration" justification would be invoked in subsequent interventions.',
        },
        {
          id: 'l7_q3',
          type: 'source_based',
          prompt: 'How does this OAS vote best illustrate the tension in post–Cold War U.S. foreign policy?',
          source: {
            title: 'OAS Resolution on Panama, December 22, 1989',
            author: 'Organization of American States',
            date: 'December 22, 1989',
            type: 'international organization resolution',
            text: '"The General Assembly deeply deplores the military intervention in Panama and urges the withdrawal of U.S. troops from that country." The resolution passed 20–1, with only the United States voting against.',
          },
          options: [
            'The U.S. prioritized democratic elections over military concerns',
            'Latin American nations uniformly opposed all U.S. foreign policy initiatives',
            'The U.S. presented itself as defending democracy while being internationally condemned for violating sovereignty',
            'The OAS had become an ineffective forum for regional diplomacy',
          ],
          correctIndex: 2,
          skillTags: ['HE', 'ARG'],
          difficulty: 3,
          apStandards: ['KC-9.3.I.A'],
          explanation: 'The 20–1 OAS vote reveals the gap between U.S. justifications (democracy restoration) and regional reception (sovereignty violation). Latin American nations — many of whom had experienced U.S. intervention firsthand — viewed the invasion differently from the U.S. self-description.',
        },
        {
          id: 'l7_q4',
          type: 'multiple_choice',
          prompt: 'The fact that Manuel Noriega had been a CIA asset before his 1988 drug indictment best illustrates which pattern in U.S. foreign policy?',
          options: [
            'The U.S. consistently applied human rights standards to all allies regardless of their intelligence value',
            'U.S. foreign policy often prioritized short-term strategic utility over long-term accountability for partner behavior',
            'The CIA operated without presidential knowledge or oversight during the Cold War',
            'Panama was the only country where the U.S. supported a government later found to be criminal',
          ],
          correctIndex: 1,
          skillTags: ['ARG', 'CAUS'],
          difficulty: 3,
          apStandards: ['KC-9.3.II.A'],
          explanation: 'The Noriega case exemplifies a consistent pattern: the U.S. tolerated and supported governments or individuals whose behavior violated stated American values when they served strategic purposes. This pattern repeats across lessons 1–7: from Batista in Cuba, to the Somozas in Nicaragua, to the Shah in Iran, to Pinochet in Chile.',
        },
        {
          id: 'l7_q5',
          type: 'multiple_choice',
          prompt: 'Across the eight lessons of this game (1898–1989), the most consistent connecting thread of U.S. policy toward Latin America is:',
          options: [
            'Opposition to all forms of European involvement in the Western Hemisphere',
            'Prioritization of free democratic elections over economic interests',
            'A pattern of intervention, justified by changing rationales, to install or preserve governments favorable to U.S. interests',
            'Consistent application of international law and multilateral authorization for military action',
          ],
          correctIndex: 2,
          skillTags: ['COMP', 'CAUS', 'CCT'],
          difficulty: 3,
          apStandards: ['KC-7.3.II.A', 'KC-8.1.II.B', 'KC-9.3.I.A'],
          explanation: 'From the Spanish-American War to Operation Just Cause, the dominant pattern is consistent: U.S. intervention — covert or overt, military or economic — to shape Latin American governments toward outcomes favorable to U.S. interests. The justifications (civilization, anti-communism, democracy promotion, drug war) changed with the era, but the underlying structure did not. This is the central thesis of the game\'s 8-lesson arc.',
        },
      ],
      next: null,
    },

  ],
};

export default lesson07;
