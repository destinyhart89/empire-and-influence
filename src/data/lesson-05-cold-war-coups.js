/**
 * EMPIRE & INFLUENCE — Lesson 5: Cold War Coups (1954–1973)
 *
 * Era shift: early-imperial → cold-war
 * Students take on roles during two CIA-backed interventions:
 *   • Guatemala 1954 — Operation PBSUCCESS (overthrow of Árbenz)
 *   • Chile 1973 — U.S. destabilization of Allende government
 *
 * APUSH Standards: KC-8.1.I.B, KC-8.1.II.B, KC-8.1.II.C
 * Era: cold-war | Period 8
 *
 * Available assets:
 *   Maps:       L05_MAP_01_Guatemala_CIA_PBSUCCESS.png
 *               L05_MAP_02_Chile_AllendeOverthrow_1973.png
 *   Newspapers: L05_NEWS_01_CoupInGuatemala_WeeklyJournal.png
 *               L05_NEWS_02_CrisisInChile_MorningPost.png
 *   Portraits:  L05_PORT_01_EconomicAdvisor_CorporateStrategist.png
 *               L05_PORT_02_SecurityAdvisor_CovertIntelOperative.png
 *               L05_PORT_03_DiplomaticAdvisor_ColdWarPolicyAdvisor.png
 *
 * Continuity in from L4 (Big Stick):
 *   - Interventionist legacy flags inform early Cold War framing
 *   - High prior influence boosts corporate pressure narrative
 *
 * Continuity out to L6 (Contra Wars):
 *   - flags: covert_overthrow_approved, backed_allende_coup, prioritized_democracy,
 *            accepted_cia_briefing, cold_war_hawk, cold_war_dove
 *   - delayed consequences: U.S. reputation consequences in L6 and beyond
 */

const lesson05 = {
  id: 5,
  title: 'Cold War Coups',
  subtitle: '1954–1973',
  era: 'cold-war',
  period: 'Period 8',
  apStandards: ['KC-8.1.I.B', 'KC-8.1.II.B', 'KC-8.1.II.C'],

  // ═══════════════════════════════════════════════════════
  // CONTINUITY IN (from L4 Big Stick)
  // ═══════════════════════════════════════════════════════

  continuityIn: {
    advisorTrustBonuses: [
      // If player backed Big Stick interventions, security advisor arrives with credibility
      { ifFlag: 'backed_corollary_l4', advisor: 'security', delta: 1 },
      // If player opposed interventions, diplomatic advisor arrives with credibility
      { ifFlag: 'rejected_corollary_l4', advisor: 'diplomatic', delta: 1 },
      // If player maximized economic extraction, corporate strategist is enthusiastic
      { ifFlag: 'corporate_backed_l4', advisor: 'economic', delta: 1 },
    ],
    metricAdjustments: [
      // Long history of intervention has raised global scrutiny
      { ifFlag: 'backed_corollary_l4', effects: { stability: -5 } },
    ],
    narrativeContext: {
      ifFlag: 'backed_corollary_l4',
      text: 'Your record of strong interventionism precedes you. The CIA briefers have noted your predecessor\'s approach.',
    },
  },

  // ═══════════════════════════════════════════════════════
  // ADVISORS
  // ═══════════════════════════════════════════════════════

  advisors: {
    economic: {
      name: 'Corporate Strategist',
      title: 'Economic Advisor',
      portrait: 'L05_PORT_01_EconomicAdvisor_CorporateStrategist.png',
      initialTrust: 0,
      metricWeights: { influence: 0.5, stability: 0.2, economic: 2.0, support: 0.5 },
      bias: { primary: 'profit', secondary: 'market_access', aversion: 'nationalization' },
      quotes: {
        decision_1: 'United Fruit has $60 million in assets in Guatemala. Árbenz\'s land reform threatens every American company operating in Latin America. If we allow this expropriation to stand, we set a precedent that will spread across the hemisphere.',
        decision_2: 'The CIA operation is cost-effective — far cheaper than a military deployment. A stabilizing government that protects foreign investment is in America\'s economic interest.',
        decision_3: 'Chile\'s copper nationalization under Allende is worth $1 billion in American assets. ITT Corporation and Anaconda Copper are asking for protection. Economic pressure is less costly than covert action — but both must be on the table.',
        decision_4: 'Pinochet\'s regime, whatever its methods, has reversed the nationalization and opened Chile\'s markets. The economic results speak for themselves.',
        reaction_approve: [
          'American business thanks you.',
          'Excellent — our shareholders will sleep soundly.',
          'You understand what really drives stability: capital.',
        ],
        reaction_disapprove: [
          'The cost of this decision will be borne by American investors.',
          'You\'ve just signaled that nationalizations carry no consequence.',
          'Principled, perhaps. Profitable? No.',
        ],
        default: 'Every government decision is, at its core, an economic decision.',
      },
    },

    security: {
      name: 'Covert Intel Operative',
      title: 'Security Advisor',
      portrait: 'L05_PORT_02_SecurityAdvisor_CovertIntelOperative.png',
      initialTrust: 0,
      metricWeights: { influence: 1.8, stability: 0.9, economic: 0.3, support: 0.6 },
      bias: { primary: 'containment', secondary: 'regime_change', aversion: 'communist_spread' },
      quotes: {
        decision_1: 'Árbenz has Communist Party members in his cabinet and is receiving arms from Soviet-aligned sources. Guatemala is 1,000 miles from the Panama Canal. We cannot allow a Communist beachhead in Central America. Operation PBSUCCESS is ready.',
        decision_2: 'Arbenz must go. The operation is surgical — no American boots on the ground. We back a rebel force under Castillo Armas, provide air cover, and psychological warfare. He folds in two weeks. The Agency has done this before.',
        decision_3: 'Allende won a democratic election — but he\'s dismantling the structures that protect free markets and U.S. strategic interests. Kissinger is right: we can\'t allow Chile to go the way of Cuba. We make the economy scream.',
        decision_4: 'September 11, 1973. The Chilean military has acted. The operation succeeded. Whether Pinochet\'s methods are agreeable is beside the point — Communist expansion in South America has been stopped.',
        reaction_approve: [
          'Good. The Agency will execute.',
          'Containment requires difficult choices. You\'ve made one.',
          'History will vindicate this.',
        ],
        reaction_disapprove: [
          'We\'ve lost the initiative. Communists read hesitation as invitation.',
          'Every day of inaction is a day the Soviets gain ground.',
          'I understand your reluctance. I don\'t share it.',
        ],
        default: 'In the Cold War, there is no neutral ground.',
      },
    },

    diplomatic: {
      name: 'Cold War Policy Advisor',
      title: 'Diplomatic Advisor',
      portrait: 'L05_PORT_03_DiplomaticAdvisor_ColdWarPolicyAdvisor.png',
      initialTrust: 0,
      metricWeights: { influence: 0.5, stability: 1.5, economic: 0.3, support: 1.8 },
      bias: { primary: 'legitimacy', secondary: 'multilateralism', aversion: 'covert_unilateralism' },
      quotes: {
        decision_1: 'Árbenz was democratically elected. His land reform program redistributes land from large landowners — including United Fruit. If we overthrow a democracy because it threatens corporate profits, we lose the moral authority that differentiates us from the Soviets.',
        decision_2: 'PBSUCCESS will work tactically and damage us strategically. Every government in Latin America will now know that American companies can override democratic outcomes. We will reap this whirlwind.',
        decision_3: 'Allende is a democratic socialist, not a Soviet agent. Chile has 25 years of democratic tradition. Covert destabilization of a freely-elected government contradicts everything the Monroe Doctrine was supposed to protect.',
        decision_4: 'We have helped bring a military dictatorship to power. Thousands of Chileans will be detained, tortured, disappeared. This will define American foreign policy in Latin America for a generation.',
        reaction_approve: [
          'This is what American leadership should look like.',
          'You\'ve chosen the harder, better path.',
          'History is watching. We have acted with integrity.',
        ],
        reaction_disapprove: [
          'We will spend decades explaining this decision.',
          'The people of Guatemala — and Chile — will not forget.',
          'Short-term gain. Generational cost.',
        ],
        default: 'A democracy that overthrows democracies is a contradiction.',
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
      title: 'Before We Begin: Cold War Thinking',
      questions: [
        {
          id: 'pre_l5_q1',
          type: 'multiple_choice',
          prompt: 'The U.S. policy of preventing the spread of communism during the Cold War was known as:',
          options: [
            'The Monroe Doctrine',
            'Containment',
            'Dollar Diplomacy',
            'The Truman Doctrine\'s predecessor',
          ],
          correctIndex: 1,
          skillTags: ['KC'],
          difficulty: 1,
          explanation: 'Containment, articulated by George Kennan, was the foundational U.S. Cold War strategy of preventing Soviet expansion without direct military confrontation.',
        },
        {
          id: 'pre_l5_q2',
          type: 'multiple_choice',
          prompt: 'In 1954, the CIA operation to overthrow Guatemalan President Jacobo Árbenz was code-named:',
          options: [
            'Operation Mongoose',
            'Operation Cyclone',
            'PBSUCCESS',
            'Operation Condor',
          ],
          correctIndex: 2,
          skillTags: ['KC'],
          difficulty: 2,
          explanation: 'Operation PBSUCCESS was the CIA covert operation that successfully overthrew Árbenz in 1954, largely at the behest of United Fruit Company and anti-communist policy makers.',
        },
        {
          id: 'pre_l5_q3',
          type: 'multiple_choice',
          prompt: 'Salvador Allende was significant in 1970 because he:',
          options: [
            'Launched a military coup in Chile',
            'Was the first democratically elected Marxist head of government in Latin America',
            'Founded the Sandinista movement in Nicaragua',
            'Nationalized Cuban sugar production',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'COMP'],
          difficulty: 2,
          explanation: 'Allende\'s election in Chile in 1970 alarmed U.S. policymakers who feared a democratic path to socialism would be more persuasive to other Latin American nations than Cuba\'s revolutionary path.',
        },
      ],
      next: 'intro',
    },

    // ─── Introduction ────────────────────────────────────
    {
      id: 'intro',
      type: 'intro',
      title: 'Cold War Coups',
      subtitle: 'Two operations. Twenty years apart. The same logic.',
      text: `<p>The year is 1953. You are a senior policy advisor in the Eisenhower administration. The Cold War is no longer a European standoff — it has arrived in Latin America.</p>

<p>In Guatemala, President Jacobo Árbenz has launched an agrarian reform that has seized unused land from the United Fruit Company — an American corporation with 550,000 acres and the ear of the Secretary of State. The CIA warns of Communist influence in his cabinet.</p>

<p>Two decades later, you will face a similar decision in Chile, where a democratically-elected Marxist, Salvador Allende, has won the presidency and begun nationalizing copper mines owned by American companies.</p>

<p>In both cases, you must weigh American economic interests, Cold War strategy, and the democracy you claim to defend — against the governments of sovereign nations.</p>`,
      advisorDialogue: {
        security: 'Guatemala is 1,000 miles from the Panama Canal. Árbenz has Communist advisors. We cannot allow this to stand.',
        economic: 'United Fruit Company has been operating in Guatemala for fifty years. Their assets — and our investors — are counting on us.',
        diplomatic: 'Árbenz was elected. His land reform is modeled on our own New Deal. We must be very careful here.',
      },
      advisorPrimary: 'security',
      next: 'context_guatemala',
    },

    // ─── Context: Guatemala ──────────────────────────────
    {
      id: 'context_guatemala',
      type: 'context',
      title: 'Guatemala, 1954: Operation PBSUCCESS',
      subtitle: 'CIA Intelligence Briefing — CLASSIFIED',
      text: `<p>President Jacobo Árbenz won Guatemala's 1950 election by a wide margin. His agrarian reform, Decree 900, redistributes uncultivated land from large estates — targeting United Fruit Company above all others.</p>

<p>The United Fruit Company is not merely a corporation. Its board of directors includes former Secretary of State John Foster Dulles and his brother, CIA Director Allen Dulles. UFCO calls Árbenz a Communist. The CIA has prepared Operation PBSUCCESS: a covert program to arm, train, and insert a rebel force under Colonel Castillo Armas.</p>

<p>The plan: arm a rebel force in neighboring Honduras, conduct psychological warfare via CIA-run radio stations, provide air cover with U.S. pilots flying unmarked planes, and demoralize the Guatemalan military until Árbenz resigns.</p>

<p><strong>What the CIA briefing does not mention:</strong> Árbenz is not a Communist. He has proposed to compensate United Fruit for the expropriated land at its own declared tax value — the company inflated its value after the fact for the compensation claim.</p>`,
      map: {
        asset: 'L05_MAP_01_Guatemala_CIA_PBSUCCESS.png',
        caption: 'CIA Operation PBSUCCESS — covert insertion routes, rebel staging areas, and psychological warfare radio broadcasts (1954)',
      },
      next: 'decision_1',
    },

    // ─── Decision 1: Authorize PBSUCCESS ────────────────
    {
      id: 'decision_1',
      type: 'decision',
      title: 'Decision Point 1 — Operation PBSUCCESS',
      text: 'The CIA has presented Operation PBSUCCESS. The Eisenhower administration must decide whether to authorize the covert overthrow of Guatemala\'s elected president.',
      choices: [
        {
          id: 'd1_authorize_cia',
          label: 'Authorize Operation PBSUCCESS',
          description: 'Approve the covert CIA operation. Arm Castillo Armas, provide air cover, run psychological warfare. No American troops on the ground.',
          advisorAlignment: 'security',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: +15, stability: -10, economic: +8, support: -5 },
            flags: { covert_overthrow_approved: true, cold_war_hawk: true },
            narrative: 'Operation PBSUCCESS is authorized. The CIA begins arming rebel forces in Honduras. Psychological warfare radio begins broadcasting false reports of rebel advances.',
          },
          reactions: {
            economic: { trustDelta: +2, dialogue: 'United Fruit\'s board will be pleased. Guatemala will be stable for business.' },
            security: { trustDelta: +2, dialogue: 'The operation is clean. No American fingerprints. Árbenz won\'t last a month.' },
            diplomatic: { trustDelta: -2, dialogue: 'We have just overthrown a democracy. The precedent we set today will haunt this hemisphere.' },
          },
          delayed: [
            {
              trigger: 'next_lesson',
              targetLesson: 6,
              narrative: 'The 1954 Guatemalan coup is remembered across Latin America. Governments view U.S. promises of non-intervention with deep skepticism.',
              effects: { stability: -8, support: -5 },
            },
          ],
        },
        {
          id: 'd1_reject_cia',
          label: 'Reject the covert operation',
          description: 'Refuse to authorize PBSUCCESS. Pursue diplomatic and economic pressure instead — sanctions, OAS complaints, trade restrictions.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: -5, stability: +10, economic: -5, support: +8 },
            flags: { rejected_covert_l5: true, cold_war_dove: true },
            narrative: 'The CIA operation is shelved. The administration pursues multilateral pressure through the OAS while accepting that Árbenz\'s land reform will proceed.',
          },
          reactions: {
            economic: { trustDelta: -2, dialogue: 'United Fruit is furious. We\'ve abandoned American investors to socialist expropriation.' },
            security: { trustDelta: -2, dialogue: 'We\'ve just told every Communist government in Latin America that democracy is our shield, not their constraint.' },
            diplomatic: { trustDelta: +2, dialogue: 'We\'ve chosen the harder path. Guatemala will remember which America showed up today.' },
          },
        },
        {
          id: 'd1_demand_intel',
          label: 'Request independent verification of Communist threat',
          description: 'The CIA\'s evidence is presented by officials with direct financial ties to United Fruit. Demand an independent intelligence assessment before deciding.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          immediate: {
            effects: { influence: -3, stability: +5, economic: 0, support: +3 },
            flags: { demanded_intel_l5: true, cold_war_dove: true },
            narrative: 'The administration requests independent review. The CIA delays. Diplomatic channels are kept open while the operation is postponed — but pressure mounts from corporate interests.',
          },
          reactions: {
            economic: { trustDelta: -1, dialogue: 'Due diligence is fine. But every day we wait, United Fruit loses leverage.' },
            security: { trustDelta: -1, dialogue: 'The Soviets don\'t take six weeks to verify. This hesitation is itself a strategic message.' },
            diplomatic: { trustDelta: +1, dialogue: 'A reasonable approach. If the evidence is solid, the operation may still be justified. If not — we\'ve avoided a catastrophic mistake.' },
          },
        },
      ],
      next: 'consequence_1',
    },

    // ─── Consequence 1 ────────────────────────────────────
    {
      id: 'consequence_1',
      type: 'consequence',
      title: 'The Fall of Árbenz',
      text: `<p>In June 1954, Guatemalan President Jacobo Árbenz resigns under pressure from the CIA operation and threats of U.S. air power. Colonel Castillo Armas, installed with CIA support, reverses the land reform, returns UFCO's land, and begins arresting members of opposition parties.</p>

<p>In the years that follow, Guatemala descends into a 36-year civil war. An estimated 200,000 people are killed — the majority Indigenous Guatemalans killed by U.S.-backed military governments. The 1999 UN Truth Commission finds that U.S. training and support enabled acts of genocide.</p>

<p>At the time, however, the Eisenhower administration celebrates PBSUCCESS as a triumph of covert action over Communism.</p>`,
      newspaper: {
        asset: 'L05_NEWS_01_CoupInGuatemala_WeeklyJournal.png',
        trigger: 'immediate',
        headline: 'ÁRBENZ OUSTED — Military Government Restores Order in Guatemala',
        perspective: 'U.S. press',
        bodyText: 'Colonel Castillo Armas assumes control as Árbenz flees. State Department officials deny U.S. involvement in the change of government.',
      },
      autoEffects: {},
      next: 'context_chile',
    },

    // ─── Context: Chile ───────────────────────────────────
    {
      id: 'context_chile',
      type: 'context',
      title: 'Chile, 1970–1973: The Road to September 11',
      subtitle: 'National Security Council Briefing — SENSITIVE',
      text: `<p>On September 4, 1970, Salvador Allende wins Chile's presidential election with 36% of the vote — a plurality in a three-way race. He is the world's first freely-elected Marxist head of state.</p>

<p>President Nixon orders the CIA to prevent Allende from taking office: "Make the economy scream." The CIA's Track I attempts to persuade the Chilean Congress to ratify the runner-up instead. Track II authorizes the CIA to foment a military coup — bypassing even the State Department.</p>

<p>Between 1970 and 1973, the U.S. supports opposition media, funds strikes, and arms coup plotters. Henry Kissinger tells the Forty Committee: "I don't see why we need to stand by and watch a country go communist due to the irresponsibility of its own people."</p>

<p>On September 11, 1973, the Chilean military bombs the presidential palace. Allende dies. General Augusto Pinochet takes power.</p>`,
      map: {
        asset: 'L05_MAP_02_Chile_AllendeOverthrow_1973.png',
        caption: 'Chile 1973 — economic disruption zones, CIA media assets, and military coup coordination sites',
      },
      next: 'decision_2',
    },

    // ─── Decision 2: Chile Strategy ──────────────────────
    {
      id: 'decision_2',
      type: 'decision',
      title: 'Decision Point 2 — Chile Policy',
      text: 'Allende has been elected. The Nixon administration must choose its response to a democratically-elected Marxist government in Chile.',
      choices: [
        {
          id: 'd2_make_economy_scream',
          label: '"Make the economy scream"',
          description: 'Pursue economic destabilization: cut U.S. aid, pressure multilateral banks, fund opposition strikes and media, block Chilean loans.',
          advisorAlignment: 'economic',
          riskLevel: 'high',
          immediate: {
            effects: { influence: +8, stability: -15, economic: +5, support: -8 },
            flags: { backed_allende_coup: true, cold_war_hawk: true },
            narrative: 'The administration adopts Kissinger\'s strategy. Economic pressure, CIA media funding, and covert support to opposition groups begins.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Economic warfare is efficient. It creates pressure without direct exposure.' },
            security: { trustDelta: +2, dialogue: 'The Chilean military is watching. When the economy collapses, they\'ll act. This is chess, not checkers.' },
            diplomatic: { trustDelta: -2, dialogue: 'We are deliberately destabilizing a democracy. This isn\'t containment. This is empire.' },
          },
          delayed: [
            {
              trigger: 'next_lesson',
              targetLesson: 6,
              narrative: 'Chile\'s Pinochet dictatorship becomes internationally associated with U.S.-backed human rights abuses. Congressional investigations of CIA activities in Latin America will begin in 1975.',
              effects: { support: -8, stability: -5 },
            },
          ],
        },
        {
          id: 'd2_accept_allende',
          label: 'Accept the democratic outcome',
          description: 'Treat Allende\'s election as legitimate. Pursue normal diplomatic relations while protecting U.S. interests through legal channels.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: -10, stability: +15, economic: -8, support: +10 },
            flags: { accepted_democratic_outcome: true, cold_war_dove: true, prioritized_democracy: true },
            narrative: 'The administration recognizes Allende\'s government. Diplomatic channels remain open. Allende pursues nationalization through legal means; compensation negotiations begin.',
          },
          reactions: {
            economic: { trustDelta: -2, dialogue: 'ITT and Anaconda Copper are furious. We\'ve abandoned American investors to Marxist expropriation.' },
            security: { trustDelta: -2, dialogue: 'You\'ve just sent a message to every Communist movement in Latin America that the ballot box is safe.' },
            diplomatic: { trustDelta: +3, dialogue: 'Chile has 25 years of democratic tradition. We\'ve chosen to respect that. This is the right call.' },
          },
        },
        {
          id: 'd2_limit_track_one',
          label: 'Covert pressure, not coup — Track I only',
          description: 'Authorize Track I (political pressure, election manipulation) but not Track II (military coup). Draw the line at direct overthrow.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          immediate: {
            effects: { influence: +3, stability: -8, economic: +2, support: -3 },
            flags: { limited_covert_l5: true },
            narrative: 'Track I authorized, Track II withheld. CIA supports opposition media and funding, but direct military coup planning is off limits.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Pragmatic. We apply pressure without the exposure of direct intervention.' },
            security: { trustDelta: 0, dialogue: 'Half measures. If Track I fails, we\'ll be back here anyway — having wasted time.' },
            diplomatic: { trustDelta: -1, dialogue: 'We\'re still subverting a democracy, just more carefully. The principle remains compromised.' },
          },
        },
      ],
      next: 'consequence_2',
    },

    // ─── Consequence 2 ────────────────────────────────────
    {
      id: 'consequence_2',
      type: 'consequence',
      title: 'September 11, 1973',
      text: `<p>On September 11, 1973, the Chilean Air Force bombs the Palacio de La Moneda as tanks surround the presidential palace. Salvador Allende dies inside — whether by suicide or assassination remains disputed.</p>

<p>General Augusto Pinochet assumes control of a military junta. In the weeks that follow, over 40,000 people are detained. Thousands are tortured and executed at the National Stadium and Villa Grimaldi detention center. Chile's 50-year democratic tradition ends overnight.</p>

<p>The Church Committee investigations of 1975 will reveal U.S. involvement in both the 1954 Guatemalan coup and Chile destabilization. The revelation fundamentally shifts American public opinion on covert action.</p>`,
      newspaper: {
        asset: 'L05_NEWS_02_CrisisInChile_MorningPost.png',
        trigger: 'immediate',
        headline: 'MILITARY SEIZES CHILE — Allende Dead as Junta Takes Control',
        perspective: 'U.S. press',
        bodyText: 'A military junta led by General Pinochet has seized power in Chile. State Department declines to confirm or deny any prior knowledge of coup planning.',
      },
      autoEffects: {},
      next: 'decision_3',
    },

    // ─── Decision 3: Post-Coup Recognition ───────────────
    {
      id: 'decision_3',
      type: 'decision',
      title: 'Decision Point 3 — Post-Coup Recognition',
      text: 'The Pinochet military junta has taken power. The U.S. must decide how to respond internationally — and whether to acknowledge any role in what occurred.',
      choices: [
        {
          id: 'd3_recognize_junta',
          label: 'Recognize the Pinochet government immediately',
          description: 'Extend swift diplomatic recognition. Resume normal relations. The priority is stability and anti-communism — not the method of transition.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: +10, stability: +5, economic: +10, support: -12 },
            flags: { recognized_pinochet: true, cold_war_hawk: true },
            narrative: 'The U.S. extends immediate recognition. American aid flows resume. Pinochet begins the Chicago Boys\' economic shock therapy program, reversing Allende\'s nationalizations.',
          },
          reactions: {
            economic: { trustDelta: +2, dialogue: 'Stability restored. Markets are opening. The right call.' },
            security: { trustDelta: +1, dialogue: 'We can work with Pinochet. His anti-communism is reliable.' },
            diplomatic: { trustDelta: -3, dialogue: 'We have formally blessed a murderous dictatorship. We will be explaining this for decades.' },
          },
        },
        {
          id: 'd3_conditional_recognition',
          label: 'Conditional recognition — human rights conditions',
          description: 'Extend recognition but attach human rights conditions. Press privately for the release of political prisoners while maintaining the relationship.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          immediate: {
            effects: { influence: +2, stability: +2, economic: +5, support: -3 },
            flags: { conditional_recognition_l5: true },
            narrative: 'The U.S. recognizes the junta with private messages about human rights. Pinochet proceeds with the detention program regardless.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Reasonable compromise — stable enough for investment, but with cover for congressional scrutiny.' },
            security: { trustDelta: 0, dialogue: 'The conditions are unenforceable. Pinochet knows it. But the optics work.' },
            diplomatic: { trustDelta: 0, dialogue: 'The conditions are largely symbolic — but not entirely useless. It\'s a start.' },
          },
        },
        {
          id: 'd3_acknowledge_role',
          label: 'Acknowledge U.S. involvement — begin transition to civilian rule',
          description: 'Break from past practice: publicly acknowledge U.S. destabilization. Push Pinochet for rapid transition back to civilian rule and accountability.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'high',
          immediate: {
            effects: { influence: -15, stability: +10, economic: -8, support: +15 },
            flags: { acknowledged_cia_role: true, cold_war_dove: true, prioritized_democracy: true },
            narrative: 'An extraordinary step: the administration acknowledges prior interference. International standing improves dramatically — but Pinochet is furious and Congress begins investigations.',
          },
          reactions: {
            economic: { trustDelta: -3, dialogue: 'This has torpedoed our investment case in the entire region. Investors won\'t risk capital in a country whose protector apologizes.' },
            security: { trustDelta: -2, dialogue: 'You\'ve handed the Church Committee everything they need. Our entire covert operations program is now in jeopardy.' },
            diplomatic: { trustDelta: +3, dialogue: 'A rare act of honesty in foreign policy. Latin America noticed. This changes the long game.' },
          },
        },
      ],
      next: 'consequence_3',
    },

    // ─── Consequence 3 ────────────────────────────────────
    {
      id: 'consequence_3',
      type: 'consequence',
      title: 'The Legacy of Covert Action',
      text: `<p>The 1975 Church Committee reveals the full scope of CIA covert operations in Latin America — including PBSUCCESS in Guatemala and the Track I/Track II operations in Chile. The American public is confronted with the gap between Cold War rhetoric and Cold War practice.</p>

<p>Pinochet's regime continues until 1990. During his 17-year rule, over 3,000 people are killed or disappeared, and 40,000 are tortured. His regime also participates in Operation Condor — a coordinated program of political assassination across South America, coordinated with the CIA.</p>

<p>In Guatemala, civil war will continue until 1996. The UN Truth Commission ultimately finds that 83% of documented victims were Mayan Indigenous people, and that the Guatemalan army committed acts of genocide — with knowledge and support from the U.S. government.</p>`,
      autoEffects: {},
      next: 'decision_4',
    },

    // ─── Decision 4: Cold War Reflection ─────────────────
    {
      id: 'decision_4',
      type: 'decision',
      title: 'Decision Point 4 — The Church Committee',
      text: 'Congressional investigations have revealed the full scope of CIA covert operations. How should U.S. policy respond to the revelations?',
      choices: [
        {
          id: 'd4_defend_covert_ops',
          label: 'Defend covert operations as necessary Cold War tools',
          description: 'Argue that in the face of Soviet expansion, covert operations were justified. The alternative was Communist governments throughout Latin America.',
          advisorAlignment: 'security',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: +5, stability: -5, economic: +3, support: -10 },
            flags: { defended_covert_ops_l5: true },
            narrative: 'The administration frames the Church Committee as an attack on national security. The ideological debate over covert action will continue through the Reagan era.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Necessary. The alternative history — Communist Latin America — would have been far more costly.' },
            security: { trustDelta: +2, dialogue: 'We were right. The methods were unfortunate. The outcomes were necessary.' },
            diplomatic: { trustDelta: -2, dialogue: 'We\'ve chosen to entrench rather than reckon. The cycle will continue.' },
          },
        },
        {
          id: 'd4_reform_cia_oversight',
          label: 'Support CIA reform and congressional oversight',
          description: 'Cooperate with the Church Committee. Support new oversight structures: the Senate Intelligence Committee, executive orders limiting assassination plots.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          immediate: {
            effects: { influence: -5, stability: +10, economic: 0, support: +10 },
            flags: { supported_cia_reform_l5: true, cold_war_dove: true },
            narrative: 'The administration cooperates with reform. President Ford signs Executive Order 11905 banning U.S.-sanctioned assassinations. The Senate Intelligence Committee is established.',
          },
          reactions: {
            economic: { trustDelta: 0, dialogue: 'The reforms are manageable. Some tools are off the table, but the essential interests are protected.' },
            security: { trustDelta: -2, dialogue: 'We\'ve handcuffed the Agency. Our adversaries are celebrating in Moscow.' },
            diplomatic: { trustDelta: +2, dialogue: 'A genuine step toward accountability. Reform is possible without surrender.' },
          },
          delayed: [
            {
              trigger: 'next_lesson',
              targetLesson: 6,
              narrative: 'The post-Church Committee reforms constrain but do not eliminate covert operations. Reagan\'s team will find ways around the new oversight structures in Nicaragua.',
              effects: { stability: +5 },
            },
          ],
        },
      ],
      next: 'outcome',
    },

    // ─── Outcome ─────────────────────────────────────────
    {
      id: 'outcome',
      type: 'outcome',
      title: 'Cold War Balance Sheet',
      text: `<p>Your Cold War covert action decisions have shaped the trajectory of U.S. engagement in Latin America. Whether you defended or questioned these operations, you have confronted the central tension of American Cold War policy: the gap between democratic ideals and geopolitical practice.</p>

<p>The consequences of Guatemala 1954 and Chile 1973 echo for decades. They fuel anti-American sentiment, inspire revolutionary movements, and create a generation of Latin Americans who have experienced U.S. "support for democracy" as something very different from its stated meaning.</p>

<p>The next chapter — Nicaragua, El Salvador, and the Contra Wars — will test whether the lessons of covert action were learned, or simply refined.</p>`,
      conditionalContent: [
        {
          condition: { flag: 'prioritized_democracy' },
          title: 'The Road Not Taken',
          text: '<p>Your choices consistently prioritized democratic legitimacy over Cold War expediency. This made you an outlier in your administration — but it also preserved a moral foundation that would matter enormously in the 1980s debates over Nicaragua.</p>',
        },
        {
          condition: { flag: 'cold_war_hawk' },
          title: 'The Price of Containment',
          text: '<p>Your commitment to containment produced strategic outcomes — Communist governments were kept out of power — but at a human cost that remains deeply contested. The Church Committee revelations will define how future generations judge this era of American foreign policy.</p>',
        },
      ],
      next: 'reflection',
    },

    // ─── Reflection ──────────────────────────────────────
    {
      id: 'reflection',
      type: 'reflection',
      title: 'Historical Reflection: Covert Action and Democratic Values',
      text: `<p><strong>The APUSH question this lesson asks:</strong> How did Cold War ideology justify actions that contradicted American democratic principles?</p>

<p>Both PBSUCCESS (1954) and the Chile operations (1970–73) were defended by U.S. officials as necessary to prevent Communist governments. Both resulted in the overthrow of democratically-elected presidents. Both led to military dictatorships that committed widespread human rights abuses.</p>

<p><strong>The pattern:</strong> Anti-communism as ideology provided justification for behavior that, applied to the Soviet Union, U.S. officials condemned as imperialism. The gap between stated values and actual practice became a defining feature of Cold War U.S. foreign policy.</p>

<p><strong>Think about:</strong> How did American officials reconcile defending democracy abroad while undermining it covertly? What does the Church Committee's response tell us about democratic self-correction? How did these events shape Latin American responses to U.S. foreign policy in the 1980s and beyond?</p>`,
      advisorDialogue: {
        security: 'The Cold War demanded choices no one wanted to make. History will judge whether we were right.',
        economic: 'Markets are open. Communism retreated. The ledger has two sides.',
        diplomatic: 'We built a generation of anti-Americanism with these operations. The Contra Wars will be our reckoning.',
      },
      next: 'historical_comparison',
    },

    // ─── Historical Comparison ───────────────────────────
    {
      id: 'historical_comparison',
      type: 'context',
      title: 'Connecting the Eras: Monroe Doctrine to Cold War',
      subtitle: 'APUSH Continuity and Change Over Time',
      text: `<p><strong>What changed:</strong> The rationale. In the early 20th century, U.S. intervention in Latin America was justified by economic interest and regional stability (Roosevelt Corollary). In the Cold War, the same interventions were justified by anti-communism — a global ideological conflict.</p>

<p><strong>What stayed the same:</strong> The pattern. U.S. corporations, government officials, and military/intelligence assets combined to remove governments that threatened American interests. The mechanism was covert rather than military, but the result — regime change — was identical.</p>

<p><strong>The key historiographical debate:</strong> Was U.S. Cold War intervention in Latin America primarily about anti-communism, or was it, as historian Stephen Rabe and others argue, fundamentally about protecting economic interests under an ideological cover?</p>

<p><strong>APUSH Connection:</strong> This is Period 8 content (KC-8.1.II.B): "U.S. policymakers ... sometimes led the U.S. to support non-democratic governments that professed anti-communism." Your decisions in this lesson illustrate exactly this tension.</p>`,
      next: 'assessment',
    },

    // ─── Assessment ──────────────────────────────────────
    {
      id: 'assessment',
      type: 'assessment',
      isPreAssessment: false,
      title: 'Lesson 5 Assessment: Cold War Coups',
      questions: [
        {
          id: 'l5_q1',
          type: 'multiple_choice',
          prompt: 'Operation PBSUCCESS (1954) is historically significant because it:',
          options: [
            'Was the first successful use of U.S. military force in Latin America',
            'Established the precedent for CIA-backed regime change in Latin America during the Cold War',
            'Demonstrated that Soviet influence had reached Central America',
            'Was the only covert operation the U.S. conducted during the Eisenhower administration',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'CAUS'],
          difficulty: 2,
          apStandards: ['KC-8.1.II.B'],
          explanation: 'PBSUCCESS established the CIA as a Cold War instrument for regime change, creating a template used repeatedly in the following decades, including in Chile (1973), Iran (1953), and beyond.',
          misconceptions: {
            0: { id: 'first_force', text: 'U.S. military force in Latin America predates 1954 by decades — the Big Stick and Marine interventions were earlier.', feedback: 'U.S. military force in Latin America predates 1954 significantly. Consider what made PBSUCCESS distinctive.' },
            2: { id: 'soviet_reach', text: 'While anti-communism was the justification, Árbenz was not a Communist and there was no confirmed Soviet presence in Guatemala.', feedback: 'The CIA\'s evidence of Soviet influence was contested. Focus on what PBSUCCESS established as a precedent, not just its stated rationale.' },
          },
        },
        {
          id: 'l5_q2',
          type: 'multiple_choice',
          prompt: 'Henry Kissinger\'s statement "I don\'t see why we need to stand by and watch a country go communist due to the irresponsibility of its own people" reflects which Cold War assumption?',
          options: [
            'That the Monroe Doctrine should be extended to cover ideological threats',
            'That democracy is only legitimate when it produces outcomes aligned with U.S. interests',
            'That the Soviet Union was directly controlling Latin American elections',
            'That the U.S. had a legal obligation to intervene under the Rio Treaty',
          ],
          correctIndex: 1,
          skillTags: ['ARG', 'COMP'],
          difficulty: 3,
          apStandards: ['KC-8.1.II.B', 'KC-8.1.II.C'],
          explanation: 'Kissinger\'s statement reveals the contradiction at the heart of Cold War intervention: the U.S. positioned itself as the defender of democracy while being willing to override democratic outcomes it disliked.',
        },
        {
          id: 'l5_q3',
          type: 'multiple_choice',
          prompt: 'The 1975 Church Committee investigations primarily revealed:',
          options: [
            'That the Soviet Union had more nuclear weapons than previously believed',
            'That CIA covert operations in Latin America had violated democratic principles and resulted in human rights abuses',
            'That the Vietnam War had been conducted without congressional authorization',
            'That United Fruit Company had secretly funded congressional campaigns',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'HE'],
          difficulty: 2,
          apStandards: ['KC-8.1.I.B'],
          explanation: 'The Church Committee (formally the Senate Select Committee to Study Governmental Operations with Respect to Intelligence Activities) exposed CIA assassination plots, covert regime change, and domestic surveillance — fundamentally changing public understanding of Cold War policy.',
        },
        {
          id: 'l5_q4',
          type: 'source_based',
          prompt: 'Based on this excerpt, what tension does this source reveal about U.S. Cold War foreign policy?',
          source: {
            title: 'Church Committee Final Report, 1975',
            author: 'U.S. Senate Select Committee',
            date: '1975',
            type: 'government document',
            text: '"The United States has a large amount of covert power it can bring to bear to influence the internal affairs of foreign countries... [These activities] raise fundamental questions about the compatibility of covert action with democratic principles and the rule of law."',
          },
          options: [
            'The U.S. used its economic power to influence other nations in violation of treaties',
            'The American democratic system could not provide adequate oversight of executive power',
            'Covert operations designed to undermine democratic governance abroad were incompatible with democratic principles at home',
            'The CIA had exceeded its legal authority by operating without presidential authorization',
          ],
          correctIndex: 2,
          skillTags: ['HE', 'ARG'],
          difficulty: 3,
          apStandards: ['KC-8.1.I.B', 'KC-8.1.II.B'],
          explanation: 'The Church Committee directly identified the central paradox: a democratic nation was using undemocratic means to shape foreign governments, creating a fundamental tension between stated values and actual practice.',
        },
        {
          id: 'l5_q5',
          type: 'multiple_choice',
          prompt: 'How do the U.S. interventions in Guatemala (1954) and Chile (1973) most directly connect to the earlier patterns of the Big Stick era (1900–1934)?',
          options: [
            'Both periods used direct military invasion rather than covert means',
            'Both periods justified intervention in terms of protecting American economic interests and regional stability, while denying the affected nation\'s sovereignty',
            'Both periods operated under explicit congressional authorization',
            'Both periods targeted Communist governments that had allied with the Soviet Union',
          ],
          correctIndex: 1,
          skillTags: ['COMP', 'CAUS'],
          difficulty: 3,
          apStandards: ['KC-8.1.II.B'],
          explanation: 'Despite the shift from overt military intervention to covert operations, and from economic-stability rationale to anti-communist rationale, the fundamental pattern — U.S. intervention to remove governments threatening American interests — remained consistent across both eras. This is a key APUSH continuity-and-change question.',
        },
      ],
      next: null,
    },

  ],
};

export default lesson05;
