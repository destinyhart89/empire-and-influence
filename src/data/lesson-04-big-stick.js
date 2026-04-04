/**
 * EMPIRE & INFLUENCE — Lesson 4: Big Stick Diplomacy (1904–1934)
 *
 * Follows the Lesson 1 gold-standard template EXACTLY.
 * Extends with: pre-assessment, reflection, historical comparison.
 * Difficulty: highest strategic complexity in L1–L4 arc (4 decisions,
 * deeper gating conditions, richer continuity effects, preview of Cold War).
 *
 * ASSETS (confirmed from Assets_Organized/L04_BigStick/):
 *   Maps      : L04_MAP_01_Nicaragua_USMilitaryIntervention.png
 *               L04_MAP_02_DominicanRepublic_OccupationZones.png
 *   Newspapers: L04_NEWS_01_MarinesInNicaragua_DailyTelegraph.png
 *               L04_NEWS_02_USOccupiesDR_Chronicle.png
 *               L04_NEWS_03_StopUSEmpireBuilding_AntiImperialistRecord.png  [oppositional]
 *   Portraits : L04_PORT_01_EconomicAdvisor_WallStreetBanker.png
 *               L04_PORT_02_SecurityAdvisor_OccupationOfficer.png
 *               L04_PORT_03_DiplomaticAdvisor_PresidentialPolicyAdvisor.png
 *
 * CONTINUITY IN (flags from Lessons 1–3):
 *   legacy_expansionist       → Security advisor initial trust +1; "mandate" framing in intro
 *   diplomatic_canal_path     → Diplomatic advisor initial trust +1
 *   labor_reform_l3           → Diplomatic advisor references labor precedent
 *   marine_intervention_l3    → Security advisor notes successful suppression model
 *   crushed_workers_legacy    → Instability starts –5
 *   reform_legacy_l3          → Local populations start +5
 *   coup_legacy_l3            → Stability starts –5; intro references regional blowback
 *   sovereignty_legacy_l3     → International actors start +8
 *   platt_amendment           → Economic advisor references legal control precedent
 *
 * CONTINUITY OUT (flags for Lesson 5 and beyond):
 *   corollary_aggressive      → L5 CIA operative advisor warmer; covert action unlocked earlier
 *   dollar_diplomacy_l4       → L5 corporate strategist trust +1
 *   good_neighbor_preview     → L5 has additional diplomatic options
 *   full_interventionism_l4   → L5/L6 difficulty harder (more regional blowback)
 *   reform_continuity_l4      → L5 diplomatic options broader
 */

const lesson04 = {
  id: 4,
  title: 'Big Stick Diplomacy',
  subtitle: '1904–1934',
  era: 'early-imperial',
  period: 'Period 7',
  apStandards: ['KC-7.3.II.A', 'KC-7.3.II.B', 'KC-7.3.III.B'],

  // ═══════════════════════════════════════════════════════
  // CONTINUITY — Applied by engine on load
  // ═══════════════════════════════════════════════════════

  continuityIn: {
    advisorTrustBonuses: [
      { ifFlag: 'legacy_expansionist',    advisor: 'security',   delta: 1 },
      { ifFlag: 'diplomatic_canal_path',  advisor: 'diplomatic', delta: 1 },
      { ifFlag: 'marine_intervention_l3', advisor: 'security',   delta: 1 },
      { ifFlag: 'labor_reform_l3',        advisor: 'diplomatic', delta: 1 },
      { ifFlag: 'platt_amendment',        advisor: 'economic',   delta: 1 },
    ],
    metricAdjustments: [
      { ifFlag: 'crushed_workers_legacy',  effects: { stability: -5 } },
      { ifFlag: 'reform_legacy_l3',        factionEffects: { localPopulations: 5 } },
      { ifFlag: 'coup_legacy_l3',          effects: { stability: -5 } },
      { ifFlag: 'sovereignty_legacy_l3',   factionEffects: { internationalActors: 8 } },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // ADVISORS
  // ═══════════════════════════════════════════════════════

  advisors: {
    economic: {
      name: 'Wall Street Banker',
      title: 'Economic Advisor',
      portrait: 'L04_PORT_01_EconomicAdvisor_WallStreetBanker.png',
      initialTrust: 0,
      metricWeights: { influence: 0.6, stability: 0.5, economic: 2.0, support: 0.3 },
      bias: { primary: 'profit', secondary: 'stability', aversion: 'default' },
      quotes: {
        decision_1: {
          default: 'The Dominican Republic owes $32 million to European creditors. European navies have already threatened debt collection through force. If we don\'t step in and manage that debt, the Monroe Doctrine becomes a historical footnote. We keep Europe out and our banks take over the loan portfolio. Win-win.',
          trusted: 'Here\'s the mechanism: we take over Dominican customs collection, pay the Europeans, keep the rest for Dominican government operating costs. American banks refinance the debt on better terms. The Dominican treasury is stabilized, and Wall Street earns a reasonable spread on $32 million. Nobody\'s shooting anyone.',
          cold: 'The financial case is simple: American banks step in before European banks demand gunboat enforcement. The Monroe Doctrine only works if we back it with something concrete.',
        },
        decision_2: 'Nicaragua\'s government is defaulting on loans from British and European banks. If we don\'t refinance through American institutions, British naval vessels appear in the harbor. We\'ve seen this before. Marine deployment plus American financial control equals stable investment climate. That\'s the formula.',
        decision_3: 'The Corollary gives us the legal framework to protect American investments across the hemisphere. When a government defaults on debts or nationalizes American property, we intervene, stabilize, collect. It\'s not imperialism — it\'s debt enforcement with a flag.',
        decision_4: 'Good Neighbor Policy sounds nice. But when you tell American banks their investments are no longer backed by U.S. military force, investment capital leaves. Then you get the economic instability you were trying to prevent with the Good Neighbor Policy. The circle is vicious.',
        reaction_approve: [
          'The markets will open a point up on this.',
          'Clean and profitable. I can work with this.',
          'Our bond analysts will sleep better tonight.',
        ],
        reaction_disapprove: [
          'You\'re telling Wall Street to operate in a hemisphere without a backstop. Capital will find safer addresses.',
          'I\'ve seen idealism cost more than interventionism, in the long run.',
          'I\'ll note this in my report to the investment committee.',
        ],
        default: 'Capital flows toward stability. Our job is to supply both — and collect the spread.',
      },
    },

    security: {
      name: 'Occupation Officer',
      title: 'Security Advisor',
      portrait: 'L04_PORT_02_SecurityAdvisor_OccupationOfficer.png',
      initialTrust: 0,
      metricWeights: { influence: 2.0, stability: 1.0, economic: 0.3, support: 0.6 },
      bias: { primary: 'control', secondary: 'dominance', aversion: 'withdrawal' },
      quotes: {
        decision_1: {
          default: 'The Dominican Republic is a test case. European powers are watching to see if the Monroe Doctrine has teeth. If we let them collect debts by force in the Caribbean, we\'ve surrendered the hemisphere. The Corollary is not optional — it\'s doctrine.',
          trusted: 'Between commanders: the real threat isn\'t the Dominican debt. It\'s the precedent. Let Germany or Britain deploy a gunboat to Santo Domingo, and every capital in Latin America recalculates who the real power is. We cannot afford that calculation.',
          cold: 'The strategic analysis is unambiguous: deploy, stabilize, control the customs. That\'s how you enforce a doctrine.',
        },
        decision_2: 'Nicaragua is a strategic keystone. We can\'t allow instability near the Panama Canal — which we just spent $375 million building. Marine occupation of Nicaragua is not optional. It\'s basic strategic hygiene.',
        decision_3: 'I\'ll be direct: the Roosevelt Corollary is either universal or it\'s useless. If we apply it selectively — only when convenient, only when there\'s no political cost — other nations will probe every case where we don\'t apply it. Consistency is the doctrine.',
        decision_4: 'Good Neighbor Policy is what you call it when you\'ve run out of Marines. Wilson retreated from it. Hoover flirted with it. FDR is going to implement it. Every time we pull back, we spend a decade explaining to the region why we\'re back. The cycle is expensive.',
        reaction_approve: [
          'Marines will be ready within 48 hours.',
          'The region respects this kind of clarity.',
          'Decisive application of doctrine. Textbook.',
        ],
        reaction_disapprove: [
          'Every time we show restraint, the next crisis is larger.',
          'Withdrawal creates vacuums. Vacuums get filled. Not always by friends.',
          'I hope the diplomatic path works. I\'ll keep the deployment plans current either way.',
        ],
        default: 'Speak softly and carry a big stick. Most of my career has been the second half of that sentence.',
      },
    },

    diplomatic: {
      name: 'Presidential Policy Advisor',
      title: 'Diplomatic Advisor',
      portrait: 'L04_PORT_03_DiplomaticAdvisor_PresidentialPolicyAdvisor.png',
      initialTrust: 0,
      metricWeights: { influence: 0.6, stability: 1.8, economic: 0.5, support: 1.6 },
      bias: { primary: 'cooperation', secondary: 'stability', aversion: 'unilateral_force' },
      quotes: {
        decision_1: {
          default: 'The Roosevelt Corollary to the Monroe Doctrine is a logical extension if we accept its premise — that the U.S. has the right to intervene in sovereign nations to prevent European interference. But I want us to be honest about what we\'re claiming: the right to govern nations that haven\'t asked to be governed.',
          trusted: 'My honest advice: the Corollary will work for 30 years, and then it will produce exactly the anti-American movements it was meant to prevent. We should build an exit strategy into the doctrine from the beginning.',
          cold: 'The legal question is unresolved. Does the Monroe Doctrine grant the U.S. intervention rights, or merely the right to exclude European powers? There\'s daylight between those interpretations, and it matters.',
        },
        decision_2: 'Nicaragua has a government. It may be dysfunctional. It may be corrupt. It may be unable to pay its debts. But it is still a government. If we occupy it and replace its institutions with American Marine officers, we\'ve crossed a line that will be very difficult to uncross.',
        decision_3: 'The history of the Corollary is a history of good intentions escalating into occupation. Haiti since 1915. Nicaragua since 1912. Dominican Republic since 1905. Every intervention began with a financial crisis and ended with American military administration for decades. Something about the mechanism is broken.',
        decision_4: 'The Good Neighbor Policy is the most important foreign policy shift since the Monroe Doctrine. We\'re acknowledging that intervention doesn\'t work — that occupied nations don\'t prosper, that resentment is more durable than control. FDR is right. The question is whether we commit to it fully or use it as a retreat position.',
        reaction_approve: [
          'This is the harder path. I respect the choice.',
          'The region is watching. This matters beyond this one decision.',
          'I\'ll be able to brief allied governments more honestly because of this.',
        ],
        reaction_disapprove: [
          'We\'ve added another chapter to the book that future historians will call "The American Empire."',
          'The pattern is established. The cost will be paid by people who had no voice in this room.',
          'I understand the pressure. I\'m still going to note my objection for the record.',
        ],
        default: 'There\'s a version of American leadership that doesn\'t require occupation. I keep trying to find it.',
      },
    },
  },

  // ═══════════════════════════════════════════════════════
  // SCREENS
  // ═══════════════════════════════════════════════════════

  screens: [

    // ─── PRE-ASSESSMENT ─────────────────────────────────
    {
      id: 'pre_assessment',
      type: 'assessment',
      isPreAssessment: true,
      title: 'Before We Begin: What Do You Know?',
      subtitle: 'Probe your prior knowledge — no stakes here.',
      questions: [
        {
          id: 'pq1',
          type: 'multiple_choice',
          prompt: 'What is the Roosevelt Corollary to the Monroe Doctrine?',
          options: [
            'A promise by the U.S. to defend Latin American nations from attack',
            'An assertion that the U.S. had the right to intervene in Latin American nations to stabilize their affairs',
            'A trade agreement between the U.S. and Caribbean nations',
            'A military alliance between the U.S. and European powers',
          ],
          correctIndex: 1,
          explanation: 'Theodore Roosevelt\'s 1904 corollary extended the Monroe Doctrine to claim that the U.S. had the right — and responsibility — to intervene in Western Hemisphere nations that could not manage their own affairs.',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Contextualization'],
          difficulty: 2,
        },
        {
          id: 'pq2',
          type: 'multiple_choice',
          prompt: 'Theodore Roosevelt\'s "Speak softly and carry a big stick" referred to:',
          options: [
            'A policy of negotiation backed by the threat of military force',
            'The U.S. Army\'s official policy on diplomatic negotiations',
            'A metaphor for the Monroe Doctrine itself',
            'Roosevelt\'s personal philosophy about leadership, unrelated to foreign policy',
          ],
          correctIndex: 0,
          explanation: 'The phrase described Roosevelt\'s approach to foreign policy: use diplomatic language while maintaining the credible threat of military action as leverage.',
          apStandard: 'KC-7.3.II.B',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'pq3',
          type: 'multiple_choice',
          prompt: 'What was the primary U.S. justification for interventions in Haiti, Nicaragua, and the Dominican Republic in the early 1900s?',
          options: [
            'Spreading democracy and self-governance',
            'Preventing European powers from using debt collection as a pretext for military presence',
            'Establishing permanent colonies in the Caribbean',
            'Responding to attacks on American citizens',
          ],
          correctIndex: 1,
          explanation: 'The U.S. repeatedly justified Caribbean interventions as necessary to prevent European creditors from deploying warships for debt collection — a direct threat to the Monroe Doctrine. (KC-7.3.II.A)',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
      ],
      next: 'intro',
    },

    // ─── INTRO ──────────────────────────────────────────
    {
      id: 'intro',
      type: 'intro',
      title: 'Big Stick Diplomacy',
      subtitle: '1904–1934',
      text: '<p>The year is 1904. The Panama Canal is under construction. The United Fruit Company is consolidating its grip on Central America. And the Caribbean nations — many of them heavily indebted to European creditors — are on the verge of debt defaults that could invite European military intervention.</p><p>Theodore Roosevelt has a solution. In his annual message to Congress, he announces what will become known as the Roosevelt Corollary to the Monroe Doctrine: if Latin American nations cannot maintain order or honor their debts, the United States will step in as "an international police power."</p><p>You are a senior policy advisor navigating the implementation of this doctrine across three decades, four presidents, and dozens of interventions. The big stick is ready. The question is when — and how hard — to swing it.</p>',
      map: {
        asset: 'L04_MAP_01_Nicaragua_USMilitaryIntervention.png',
        caption: 'U.S. military intervention zones in Central America and the Caribbean, 1898–1934',
        hotspots: [
          { x: 35, y: 50, label: 'Nicaragua', tooltip: 'U.S. Marines occupied 1912–1933, with brief gaps. Somoza family dynasty installed.' },
          { x: 55, y: 35, label: 'Dominican Republic', tooltip: 'U.S. customs control 1905–1940. Military occupation 1916–1924.' },
          { x: 60, y: 40, label: 'Haiti', tooltip: 'U.S. occupation 1915–1934. Longest continuous Caribbean occupation.' },
          { x: 45, y: 30, label: 'Cuba', tooltip: 'Platt Amendment in force 1901–1934. Multiple military interventions.' },
        ],
      },
      advisorDialogue: {
        economic: 'Debt defaults invite European gunboats. European gunboats threaten the Monroe Doctrine. The Corollary is preventive medicine — we manage the patient before the disease spreads.',
        security: 'This is what doctrine looks like when it has teeth. The Corollary turns the Monroe Doctrine from a statement into a policy.',
        diplomatic: 'We\'re claiming the right to police sovereign nations. That\'s a significant claim. I want us to be clear about what we\'re committing to — and for how long.',
      },
      advisorPrimary: 'security',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'coup_legacy_l3', value: true }],
          outcome: {
            text: '<p>The coup you authorized in Guatemala has not gone unnoticed. As Roosevelt announces the Corollary, diplomatic cables from across the hemisphere arrive with a common subtext: Latin American governments now understand that the U.S. will not merely protect American interests — it will remove governments that threaten them.</p><p>The Corollary arrives in this climate as confirmation of a pattern, not a new announcement.</p>',
          },
        },
        {
          conditions: [{ type: 'flag', key: 'sovereignty_legacy_l3', value: true }],
          outcome: {
            text: '<p>Your decision to respect Guatemalan sovereignty in Lesson 3 has created a complicated backdrop for the Corollary. Some Latin American governments are quietly hopeful that American policy might be moving toward genuine respect for sovereignty. The Corollary announcement is a cold splash of water on that hope.</p>',
          },
        },
      ],
      next: 'context_1',
    },

    // ─── CONTEXT 1 ───────────────────────────────────────
    {
      id: 'context_1',
      type: 'context',
      title: 'The Dominican Debt Crisis',
      text: '<p>The Dominican Republic owes $32 million to creditors in France, Belgium, Germany, Italy, and Spain. Its government is dysfunctional: between 1899 and 1916, the country has seven presidents — most removed by coup or assassination.</p><p>European governments have already used debt enforcement as a pretext for naval presence in the hemisphere. In 1902, Germany and Britain blockaded Venezuela to collect debts. Roosevelt was furious — and alarmed. If European powers could blockade Caribbean nations at will, the Monroe Doctrine was meaningless.</p><p>The Corollary proposes a solution: the U.S. takes over the Dominican Republic\'s customs collections, pays European creditors from the proceeds, and guarantees Dominican debt. The Dominican Republic remains technically sovereign — but its primary revenue source is under American administration.</p>',
      advisorDialogue: {
        economic: 'This is financial architecture, not imperialism. American banks refinance the debt; Europeans get paid; Dominicans keep their government. The spread is manageable.',
        security: 'The key point: if we manage Dominican customs, European warships have no pretext. That\'s the real victory. The debt is just the mechanism.',
        diplomatic: 'Taking over a nation\'s customs administration is an extraordinary act. The Dominicans haven\'t asked for this. Are we solving their problem, or ours?',
      },
      advisorPrimary: 'security',
      next: 'decision_1',
    },

    // ─── DECISION 1: Roosevelt Corollary / Dominican Republic ──
    {
      id: 'decision_1',
      type: 'decision',
      title: 'The Corollary in Action',
      prompt: 'The Dominican Republic\'s debt crisis has arrived. Roosevelt wants to implement the Corollary — take over Dominican customs, pay European creditors, stabilize the government. What do you advise regarding scope and permanence?',
      text: 'The Roosevelt Corollary is about to be tested for the first time. How it is applied here will define the doctrine for decades.',

      choices: [
        {
          id: 'd1_full_corollary',
          label: 'Full Implementation — U.S. Controls Dominican Customs Indefinitely',
          description: 'Apply the Corollary completely: U.S. officials take over Dominican customs, refinance the debt through American banks, and maintain customs control until the debt is fully retired.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['dominance', 'unilateral_force'],
          effects: { influence: 15, stability: -5, economic: 10, support: 5 },
          factionEffects: { localPopulations: -15, usGovernment: 12, corporations: 10, internationalActors: -10 },
          flags: { full_corollary_l4: true, corollary_aggressive: true },
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Full implementation protects the debt structure and keeps European powers out. This is exactly what Wall Street needs to invest confidently in the hemisphere.' },
            security: { trustDelta: 2, dialogue: 'This is doctrine executed. Every Caribbean government now knows: default on your debts, and the U.S. administers your customs. The message is clear.' },
            diplomatic: { trustDelta: -2, dialogue: 'We\'ve just established that the U.S. can take over the financial administration of sovereign nations without their meaningful consent. The precedent is worse than the policy.' },
          },
          consequenceText: 'U.S. customs officials arrive in Santo Domingo. Dominican revenues now flow through American hands. European creditors are paid. The Dominican government is simultaneously protected and humiliated. The Senate approves the customs treaty in 1907. Full military occupation will follow in 1916.',
          next: 'consequence_1',
          delayedConsequences: [
            {
              id: 'dc_corollary_escalation',
              trigger: 'screen',
              triggerScreenId: 'decision_2',
              narrative: 'The Dominican customs model has been noted in Nicaragua, Haiti, and Cuba. Creditors and corporate investors across the hemisphere are now factoring American customs-takeover as a viable enforcement mechanism.',
              effects: { economic: 5, stability: -3 },
              factionEffects: { internationalActors: -8 },
            },
          ],
        },
        {
          id: 'd1_limited_corollary',
          label: 'Limited Implementation — Temporary Financial Assistance with Exit Timeline',
          description: 'Apply the Corollary narrowly: assist with the immediate debt crisis through loan refinancing, but require a specific timeline for restoring Dominican financial sovereignty.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          tags: ['bilateral', 'profit'],
          effects: { influence: 8, stability: 3, economic: 8, support: 3 },
          factionEffects: { localPopulations: -5, usGovernment: 5, corporations: 8, internationalActors: 3 },
          flags: { limited_corollary_l4: true, dollar_diplomacy_l4: true },
          advisorReactions: {
            economic: { trustDelta: 1, dialogue: 'A timeline limits our ability to protect investments indefinitely, but it also limits liability. A defensible middle ground.' },
            security: { trustDelta: 0, dialogue: 'Limited implementation with a timeline is riskier than I\'d like. But if it prevents the Dominican crisis from becoming Nicaraguan, it might be worth it.' },
            diplomatic: { trustDelta: 1, dialogue: 'An exit strategy built into the doctrine is the most important thing we could do. The problem with the Corollary is that nothing triggers a withdrawal. A timeline changes that.' },
          },
          consequenceText: 'The U.S. assists with Dominican debt refinancing with a stated 15-year timeline. Implementation is messy — American officials stay longer than planned — but the explicit acknowledgment that the arrangement is temporary sets a precedent for future discussions about sovereignty restoration.',
          next: 'consequence_1',
        },
        {
          id: 'd1_reject_corollary',
          label: 'Oppose the Corollary — Support Dominican Sovereignty',
          description: 'Advise against the Corollary. Recommend instead that the U.S. help negotiate a debt restructuring between the Dominican Republic and its creditors — without U.S. takeover of customs.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'multilateral'],
          effects: { influence: -8, stability: 8, economic: -5, support: 8 },
          factionEffects: { localPopulations: 12, usGovernment: -8, corporations: -8, internationalActors: 15 },
          flags: { rejected_corollary_l4: true, good_neighbor_preview: true },
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'Rejecting the Corollary means we can\'t protect American investments in defaulting nations. European creditors and gunboats become the enforcer. We lose the hemisphere.' },
            security: { trustDelta: -2, dialogue: 'Without the Corollary, the Monroe Doctrine has no enforcement mechanism. You\'re trading short-term diplomatic credit for long-term strategic weakness.' },
            diplomatic: { trustDelta: 2, dialogue: 'Negotiated debt restructuring between sovereign parties is the only framework consistent with international law. We help as a mediator, not a manager. This is the right approach.' },
          },
          consequenceText: 'The U.S. declines to invoke the Corollary, instead facilitating direct negotiations between the Dominican Republic and its European creditors. A restructuring agreement is eventually reached. It takes longer and leaves European banks temporarily dissatisfied — but the Dominican Republic retains financial sovereignty.',
          next: 'consequence_1',
          delayedConsequences: [
            {
              id: 'dc_corollary_rejected_goodwill',
              trigger: 'next_lesson',
              targetLesson: 5,
              narrative: 'Your rejection of the Corollary has created space for genuine diplomatic relationships across Latin America. When the Cold War arrives, the groundwork for cooperation rather than coercion has been partially laid.',
              effects: { stability: 8 },
              factionEffects: { localPopulations: 10, internationalActors: 12 },
              flags: { good_neighbor_legacy: true },
            },
          ],
        },
      ],
    },

    // ─── CONSEQUENCE 1 ──────────────────────────────────
    {
      id: 'consequence_1',
      type: 'consequence',
      title: 'The Corollary Spreads',
      text: '<p>The Dominican intervention — whatever form it took — has established a template. Within a decade, similar logic will be applied to Nicaragua, Haiti, and Cuba.</p><p>Nicaragua is the next test case. Since 1912, U.S. Marines have been stationed in Managua. The Conservative government there is friendly to American interests — but its hold on power is precarious. A Liberal revolution is gathering strength.</p><p>The Bryan-Chamorro Treaty (1916) gives the U.S. the right to build a canal through Nicaragua (a strategic hedge against Panama) and a 99-year lease on naval base sites. In exchange: $3 million paid directly to the Nicaraguan government. Critics call it a sellout of Nicaraguan sovereignty for pocket change.</p>',
      map: {
        asset: 'L04_MAP_02_DominicanRepublic_OccupationZones.png',
        caption: 'U.S. occupation and intervention zones in the Dominican Republic and Caribbean, 1905–1924',
      },
      newspaper: {
        asset: 'L04_NEWS_02_USOccupiesDR_Chronicle.png',
        headline: 'U.S. Assumes Control of Dominican Customs — "Financial Protectorate" Established',
        perspective: 'American Mainstream Press',
        bodyText: 'American officials have taken over the collection of Dominican customs revenues. Officials call the arrangement a "temporary stabilization measure." Critics call it a protectorate.',
        trigger: 'after-continue',
      },
      advisorDialogue: {
        economic: 'Nicaragua is the next stabilization opportunity. The Bryan-Chamorro Treaty is cheap insurance.',
        security: 'Nicaragua is more complex than the Dominican Republic. The Liberal resistance is better organized. Marines are already deployed — the question is the scope of our mission.',
        diplomatic: 'We\'re being asked to occupy one country and treaty-lock another. I want us to slow down and ask: what is our exit strategy?',
      },
      advisorPrimary: 'security',
      next: 'decision_2',
    },

    // ─── DECISION 2: Nicaragua ────────────────────────────
    {
      id: 'decision_2',
      type: 'decision',
      title: 'The Nicaragua Question',
      prompt: 'U.S. Marines have been in Nicaragua since 1912. The Conservative government they\'re supporting is losing popular support. A Liberal revolution led by Augusto Sandino is gaining momentum. What is the mission?',
      text: 'The Sandino uprising has turned a "stabilization mission" into a guerrilla war. Marines have been fighting Sandino\'s forces in the Nicaraguan interior for three years.',

      choices: [
        {
          id: 'd2_full_occupation',
          label: 'Expand the Occupation — Defeat Sandino, Install Stable Government',
          description: 'Commit to defeating Sandino\'s resistance movement and installing a reliable government. Establish a U.S.-trained National Guard under a loyalist leader.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['dominance', 'unilateral_force'],
          effects: { influence: 12, stability: -12, economic: 5, support: 0 },
          factionEffects: { localPopulations: -20, usGovernment: 8, corporations: 8, internationalActors: -12 },
          flags: { full_occupation_nicaragua: true, corollary_aggressive: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 1, dialogue: 'Defeating the resistance and installing a National Guard stabilizes the investment environment permanently. Worth the short-term cost.' },
            security: { trustDelta: 2, dialogue: 'Sandino is a communist agitator. Defeating him and leaving a strong National Guard under Somoza protects American interests for a generation.' },
            diplomatic: { trustDelta: -2, dialogue: 'We\'re going to defeat a popular resistance movement, kill its leader, and hand power to a dictator. And we\'re going to call this protecting democracy. I cannot support this.' },
          },
          consequenceText: 'The expanded occupation fails to defeat Sandino militarily — his guerrilla tactics are too effective in jungle terrain. Eventually, Sandino is lured into negotiations and assassinated by the U.S.-trained National Guard under Anastasio Somoza. Somoza becomes dictator. FDR will call him "a son of a bitch, but our son of a bitch."',
          next: 'consequence_2',
          newspaper: {
            asset: 'L04_NEWS_01_MarinesInNicaragua_DailyTelegraph.png',
            headline: 'Marines Battle Rebels in Nicaraguan Jungle — War Without Declaration',
            perspective: 'Critical American Press',
            bodyText: 'American forces are fighting what critics call an undeclared war against Nicaraguan nationalists. Sandino\'s forces continue to resist despite significant U.S. military pressure.',
          },
          delayedConsequences: [
            {
              id: 'dc_somoza_legacy',
              trigger: 'next_lesson',
              targetLesson: 5,
              narrative: 'The Somoza dynasty, installed by American-trained National Guard forces, will rule Nicaragua for 45 years — until the 1979 Sandinista revolution. The pattern of American-installed dictatorships is now fully established.',
              effects: { stability: -5, influence: 5 },
              factionEffects: { localPopulations: -12 },
              flags: { somoza_legacy: true, full_interventionism_l4: true },
            },
          ],
        },
        {
          id: 'd2_limited_mission',
          label: 'Limit the Mission — Withdraw Marines, Support Elections',
          description: 'Withdraw combat forces from the Nicaraguan interior. Support internationally monitored elections that include Liberal participation. Accept that the outcome may not favor American preferences.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          tags: ['cooperation', 'withdrawal'],
          effects: { influence: -5, stability: 5, economic: -3, support: 8 },
          factionEffects: { localPopulations: 10, usGovernment: -5, corporations: -5, internationalActors: 10 },
          flags: { limited_mission_nicaragua: true, good_neighbor_preview: true },
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'Monitored elections that include Liberal candidates risk a government hostile to American investment. That\'s a significant gamble.' },
            security: { trustDelta: -1, dialogue: 'We spent five years fighting Sandino\'s forces, and now we\'re going to let the political wing of his movement participate in elections? The signal that sends is troubling.' },
            diplomatic: { trustDelta: 2, dialogue: 'Nicaragua needs a government its own people elected. That\'s the only kind that produces stability without permanent American occupation. Monitored elections are the right call.' },
          },
          consequenceText: 'Marines withdraw to Managua and then begin phased withdrawal. The 1928 elections, observed by 5,000 U.S. personnel, are the most closely monitored in Nicaraguan history. The Liberal candidate wins. Sandino suspends guerrilla operations. American investment continues under a nationalist government that at least has popular legitimacy.',
          next: 'consequence_2',
          delayedConsequences: [
            {
              id: 'dc_nicaragua_elections_legacy',
              trigger: 'next_lesson',
              targetLesson: 5,
              narrative: 'Nicaragua\'s monitored elections created a functional moderate government. When the Cold War arrives, Nicaragua\'s government cooperates with American anti-communist efforts — because it owes its existence to a legitimate democratic process, not a U.S.-installed coup.',
              effects: { stability: 5 },
              factionEffects: { localPopulations: 8, internationalActors: 5 },
              flags: { reform_continuity_l4: true },
            },
          ],
        },
        {
          id: 'd2_immediate_withdrawal',
          label: 'Immediate Withdrawal — End the Occupation Completely',
          description: 'Withdraw all Marines immediately. Issue a formal statement that the U.S. does not support the current Conservative government and will not intervene in the outcome of Nicaraguan political competition.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'withdrawal', 'multilateral'],
          effects: { influence: -10, stability: 3, economic: -5, support: 12 },
          factionEffects: { localPopulations: 15, usGovernment: -10, corporations: -10, internationalActors: 15 },
          flags: { withdrew_nicaragua: true, good_neighbor_preview: true },
          conditions: [{ type: 'flag', key: 'rejected_corollary_l4', value: true }],
          lockMessage: 'Immediate withdrawal requires having previously rejected full Corollary implementation.',
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'This signals to every indebted nation in the hemisphere that American occupation has an unconditional exit. Capital will react.' },
            security: { trustDelta: -2, dialogue: 'Immediate withdrawal while Sandino is still in the field will be read as a military defeat. We are not retreating — but we will look like we are.' },
            diplomatic: { trustDelta: 2, dialogue: 'Consistent. If we rejected the Corollary in the Dominican Republic, we should reject its application in Nicaragua. This is principled policy.' },
          },
          consequenceText: 'Marines begin immediate withdrawal. Sandino\'s forces control most of rural Nicaragua within six months. The eventual outcome is a Liberal government — elected, though in contested circumstances. Anti-American sentiment in the region drops sharply. The precedent for voluntary withdrawal is established.',
          next: 'consequence_2',
        },
      ],
    },

    // ─── CONSEQUENCE 2 ──────────────────────────────────
    {
      id: 'consequence_2',
      type: 'consequence',
      title: 'The Occupation Model',
      text: '<p>Across thirty years, the logic of the Roosevelt Corollary has produced a consistent pattern:</p><p>1. A Caribbean or Central American government faces financial crisis or political instability.<br>2. The U.S. invokes the Corollary to prevent European intervention.<br>3. American customs officers or Marines arrive.<br>4. The "temporary" stabilization mission extends for years — sometimes decades.<br>5. A new government, favorable to American interests, is established or installed.<br>6. American forces eventually withdraw, leaving behind a dependent economic and political structure.</p><p>Haiti has been under U.S. occupation since 1915. Cuba remains effectively a protectorate under the Platt Amendment. The Dominican Republic will be occupied militarily from 1916–1924. Nicaragua\'s Marines will remain until the 1930s.</p><p>The question your advisors are now raising: is this working?</p>',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'full_occupation_nicaragua', value: true }],
          outcome: {
            text: '<p>The expanded Nicaragua occupation has not defeated Sandino. His guerrilla forces continue operating from jungle bases. Congressional critics are calling it an undeclared war. Former Marine General Smedley Butler — a decorated veteran of multiple Caribbean interventions — will soon write: "I was a racketeer, a gangster for capitalism." The dissent is growing from inside the military itself.</p>',
          },
        },
      ],
      next: 'decision_3',
    },

    // ─── DECISION 3: Monroe Doctrine Scope ───────────────
    {
      id: 'decision_3',
      type: 'decision',
      title: 'The Doctrine\'s Limits',
      prompt: 'After 25 years of Corollary-based interventions, you must advise the President on the doctrine\'s scope. Anti-American sentiment is rising across Latin America. The League of Nations has criticized U.S. intervention practices. How should the Monroe Doctrine be defined going forward?',
      text: 'It\'s 1928. Herbert Hoover is about to be elected. FDR will follow in 1933 with the Good Neighbor Policy. The doctrinal moment is now.',

      choices: [
        {
          id: 'd3_universal_corollary',
          label: 'Affirm Universal Corollary — U.S. Polices the Hemisphere Without Limit',
          description: 'Formally reaffirm the Corollary in its broadest interpretation: the U.S. reserves the right to intervene whenever it judges a Latin American nation\'s affairs to be sufficiently disordered.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['dominance', 'unilateral_force'],
          effects: { influence: 15, stability: -12, economic: 5, support: -5 },
          factionEffects: { localPopulations: -18, usGovernment: 10, corporations: 10, internationalActors: -15 },
          flags: { universal_corollary: true, full_interventionism_l4: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 1, dialogue: 'A strong commitment to hemispheric policing reassures investors. Clear doctrine is better than ambiguity, even at diplomatic cost.' },
            security: { trustDelta: 2, dialogue: 'This is the correct posture. Unlimited authority to intervene means unlimited deterrence. No crisis spirals because everyone knows we\'ll step in.' },
            diplomatic: { trustDelta: -2, dialogue: 'We have just told 300 million people in Latin America that their governments are permanently provisional — subject to American veto. The next generation of their leaders will be defined by resistance to exactly this statement.' },
          },
          consequenceText: 'The reaffirmed Corollary sparks a firestorm at the 1928 Pan-American Conference. Latin American delegates present a counter-resolution affirming the right of non-intervention. The U.S. is isolated. FDR\'s Good Neighbor Policy in 1933 will be a direct retreat from this position.',
          next: 'consequence_3',
          delayedConsequences: [
            {
              id: 'dc_universal_corollary_blowback',
              trigger: 'next_lesson',
              targetLesson: 5,
              narrative: 'The universal Corollary doctrine has hardened anti-American sentiment across the hemisphere. When the Cold War arrives, the U.S. starts from a position of deep regional distrust.',
              effects: { stability: -8, influence: 5 },
              factionEffects: { localPopulations: -15, internationalActors: -10 },
              flags: { hemispheric_blowback_l4: true },
            },
          ],
        },
        {
          id: 'd3_narrow_corollary',
          label: 'Narrow the Corollary — Limit to Preventing European Military Presence',
          description: 'Reinterpret the Corollary in its narrowest original form: the U.S. acts only to prevent European military presence, not to police internal governance.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          tags: ['bilateral', 'multilateral'],
          effects: { influence: 3, stability: 5, economic: 5, support: 5 },
          factionEffects: { localPopulations: 8, usGovernment: 3, corporations: 5, internationalActors: 8 },
          flags: { narrow_corollary: true, dollar_diplomacy_l4: true },
          advisorReactions: {
            economic: { trustDelta: 1, dialogue: 'A narrower Corollary is still enough to protect American investments from European naval enforcement. I can operate within this boundary.' },
            security: { trustDelta: -1, dialogue: 'Limiting the Corollary to European military exclusion leaves internal crises — coups, defaults, nationalizations — without a U.S. response doctrine. Problematic.' },
            diplomatic: { trustDelta: 1, dialogue: 'This returns the Monroe Doctrine to something closer to its original meaning. Not a full retreat — but a significant and principled clarification.' },
          },
          consequenceText: 'The narrowed Corollary is received cautiously but positively at the Pan-American Conference. Latin American governments note the shift. The U.S. retains the right to act against European military presence while acknowledging limits on intervening in domestic governance.',
          next: 'consequence_3',
        },
        {
          id: 'd3_abandon_corollary',
          label: 'Abandon the Corollary — Commit to Non-Intervention',
          description: 'Formally renounce the Roosevelt Corollary. The U.S. will not intervene in Latin American internal affairs. Sovereignty is absolute.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'multilateral'],
          effects: { influence: -10, stability: 12, economic: -3, support: 15 },
          factionEffects: { localPopulations: 20, usGovernment: -10, corporations: -8, internationalActors: 20 },
          flags: { abandoned_corollary: true, good_neighbor_preview: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'Non-intervention is a fine principle until a government defaults on American bonds or expropriates American property. Then it\'s a trap.' },
            security: { trustDelta: -2, dialogue: 'We\'re renouncing thirty years of strategic infrastructure in the hemisphere. European and eventually Soviet influence will fill the space we\'re vacating.' },
            diplomatic: { trustDelta: 2, dialogue: 'This is what FDR\'s Good Neighbor Policy will actually say in 1933. We\'re just saying it five years earlier. The Latin American response will be historic — and genuinely positive.' },
          },
          consequenceText: 'The Corollary renunciation triggers the most enthusiastic Latin American response to U.S. foreign policy in thirty years. Pan-American solidarity agreements are signed. FDR\'s subsequent Good Neighbor Policy builds on this foundation. The era of routine Marine deployments is over — a generation early.',
          next: 'consequence_3',
          delayedConsequences: [
            {
              id: 'dc_non_intervention_legacy',
              trigger: 'next_lesson',
              targetLesson: 5,
              narrative: 'The non-intervention commitment has produced genuine hemispheric cooperation. When the Cold War arrives, the U.S. can ask Latin American governments for help — and many will provide it, because they trust the relationship.',
              effects: { stability: 10, influence: -5 },
              factionEffects: { localPopulations: 12, internationalActors: 15 },
              flags: { good_neighbor_legacy: true, reform_continuity_l4: true },
            },
          ],
        },
      ],
    },

    // ─── CONSEQUENCE 3 ──────────────────────────────────
    {
      id: 'consequence_3',
      type: 'consequence',
      title: 'The Good Neighbor Horizon',
      text: '<p>Franklin Roosevelt\'s Good Neighbor Policy (1933) will formally end the era of routine U.S. military intervention in Latin America. Marines will be withdrawn from Haiti (1934), Nicaragua (1933), and the Platt Amendment will be abrogated (1934).</p><p>Whether Roosevelt\'s shift comes as relief or capitulation depends on the decisions you\'ve made. The ideology your policy has expressed — interventionist, economic pragmatist, or diplomatic — will shape the context in which the Cold War arrives twenty years later.</p><p>One final question remains in this era.</p>',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'full_occupation_nicaragua', value: true }],
          outcome: {
            text: '<p>The Somoza dynasty — product of the National Guard the U.S. trained and empowered — will rule Nicaragua from 1937 to 1979. The Good Neighbor Policy ends the Marine occupations, but it cannot undo the political structures they left behind. FDR\'s remark that Somoza is "a son of a bitch, but our son of a bitch" captures the compromise perfectly.</p>',
          },
        },
        {
          conditions: [{ type: 'flag', key: 'good_neighbor_preview', value: true }],
          outcome: {
            text: '<p>Your consistent movement toward restraint and sovereignty has created conditions in which the Good Neighbor Policy feels like continuity rather than reversal. Roosevelt\'s 1933 announcement will build on foundations you\'ve helped establish rather than repudiating them.</p>',
          },
        },
      ],
      next: 'decision_4',
    },

    // ─── DECISION 4: Legacy and Exit Strategy ─────────────
    {
      id: 'decision_4',
      type: 'decision',
      title: 'The Legacy Question',
      prompt: 'The era of Big Stick diplomacy is drawing to a close. As you prepare your policy legacy memorandum, how should the U.S. frame the Corollary era for future policymakers — and what should come next?',
      text: 'This memorandum will be read by the next generation of American foreign policy planners — including the architects of Cold War policy.',

      choices: [
        {
          id: 'd4_big_stick_permanent',
          label: '"The Big Stick Must Be Permanent — Military Supremacy Is the Foundation of Policy"',
          description: 'Frame the Corollary era as proof that American military supremacy is the only reliable guarantee of hemispheric stability. Future policy should maintain and expand these intervention capabilities.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['dominance', 'unilateral_force'],
          effects: { influence: 12, stability: -10, economic: 5, support: 0 },
          factionEffects: { localPopulations: -12, usGovernment: 12, corporations: 8, internationalActors: -12 },
          flags: { full_interventionism_l4: true, corollary_aggressive: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 1, dialogue: 'Military supremacy backstops economic investment. I support this framing.' },
            security: { trustDelta: 2, dialogue: 'The next generation needs to hear this clearly: without the stick, the hemisphere drifts. This is the honest lesson of the Corollary era.' },
            diplomatic: { trustDelta: -2, dialogue: 'We are writing instructions for the CIA. This memorandum will be cited in 1954 in Guatemala, in 1973 in Chile, and in every covert action brief for the next fifty years. I want that on record.' },
          },
          consequenceText: 'The memorandum frames American military supremacy as the permanent foundation of hemispheric policy. The Cold War generation of planners will read it alongside Kennan\'s "Long Telegram" and draw a direct line from the Corollary to containment. Covert action, not just military deployment, becomes the new tool of the doctrine.',
          next: 'outcome',
        },
        {
          id: 'd4_dollar_diplomacy_transition',
          label: '"Financial Engagement, Not Military Occupation — Dollar Diplomacy as the New Model"',
          description: 'Frame the future as dollar diplomacy: American economic engagement — loans, investment, trade — rather than military occupation as the primary tool of hemispheric influence.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          tags: ['profit', 'bilateral'],
          effects: { influence: 5, stability: 3, economic: 12, support: 5 },
          factionEffects: { localPopulations: -5, usGovernment: 5, corporations: 15, internationalActors: 3 },
          flags: { dollar_diplomacy_l4: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Dollar diplomacy is the most sophisticated version of American foreign policy. Economic dependency is more durable than military occupation — and cheaper.' },
            security: { trustDelta: 0, dialogue: 'Financial engagement can work in stable environments. But dollar diplomacy still needs military backstop. I hope the memorandum acknowledges that.' },
            diplomatic: { trustDelta: 1, dialogue: 'Economic engagement without military threat is a genuine improvement over the Corollary model. It\'s not ideal — but it\'s progress.' },
          },
          consequenceText: 'The transition to dollar diplomacy reduces the visible military footprint in Latin America. American banks and corporations become the primary instrument of influence. The approach is more palatable internationally — but when financial interests are threatened, the logic of intervention remains available.',
          next: 'outcome',
        },
        {
          id: 'd4_good_neighbor',
          label: '"The Good Neighbor Policy Is the Right Path — Sovereignty and Cooperation"',
          description: 'Formally endorse and advance the Good Neighbor Policy framework: non-intervention, mutual respect for sovereignty, cooperation through multilateral institutions.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'multilateral'],
          effects: { influence: -5, stability: 15, economic: 5, support: 15 },
          factionEffects: { localPopulations: 20, usGovernment: -8, corporations: -5, internationalActors: 20 },
          flags: { good_neighbor_preview: true, reform_continuity_l4: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'Non-intervention is fine until the next nationalization crisis. I hope the framework includes a mechanism for protecting American property rights.' },
            security: { trustDelta: -1, dialogue: 'The Good Neighbor Policy is idealism with a price tag we won\'t discover for twenty years. But I acknowledge that the Big Stick has created as many problems as it solved.' },
            diplomatic: { trustDelta: 2, dialogue: 'This is the framework that was always correct. It took thirty years of occupation, resentment, and violence to get here. But getting here is still better than not getting here.' },
          },
          consequenceText: 'Your memorandum advocates for the Good Neighbor Policy as the permanent successor to the Corollary. FDR\'s State Department will read it and find their instincts confirmed. The policy is formalized in 1933. Latin American response is positive. The corollary era ends with something that looks, imperfectly, like respect.',
          next: 'outcome',
        },
      ],
    },

    // ─── OUTCOME ────────────────────────────────────────
    {
      id: 'outcome',
      type: 'outcome',
      title: 'Lesson Complete: Big Stick Diplomacy',
      text: '<p>The era of Big Stick diplomacy is over — or is it? The tools change: from Marines and customs officers to CIA operatives and Cold War client governments. But the underlying logic of the Corollary — the U.S. reserves the right to intervene when its interests are threatened — persists through the Cold War and beyond.</p><p>The decisions you made across Lessons 1–4 have built a cumulative profile: how aggressively the U.S. pursues influence, how much it respects sovereignty, how it weighs corporate interests against human ones. That profile will define the strategic context you enter in Lesson 5 — Cold War Coups — where the tools of intervention become covert and the stakes become existential.</p><p>Your advisors have watched you operate across three decades. Some trust you more than when this began. Others less. The ideology your choices express will shape what options are available when the Cold War arrives.</p>',
      newspaper: {
        asset: 'L04_NEWS_03_StopUSEmpireBuilding_AntiImperialistRecord.png',
        headline: 'Stop the Empire Building — Anti-Imperialist League Condemns Corollary Occupations',
        perspective: 'American Anti-Imperialist Counter-Perspective',
        bodyText: '"We cannot preach democracy at home and practice occupation abroad. Haiti, Nicaragua, the Dominican Republic — these are not stabilization missions. They are empires in everything but name." — Anti-Imperialist League, 1927.',
        trigger: 'with-consequence',
      },
      next: 'reflection',
    },

    // ─── REFLECTION ─────────────────────────────────────
    {
      id: 'reflection',
      type: 'reflection',
      title: 'Reflect: The Costs of the Big Stick',
      text: '<p>Between 1898 and 1934, the United States sent military forces into Latin America more than 20 times. Haiti was occupied for 19 years. Nicaragua\'s Marines stayed for 21 years. The Dominican Republic hosted American customs officials for 35 years.</p><p>The stated goal was stability. The result was structural dependency: governments that depended on American support couldn\'t build the institutions they needed to govern independently. When the Marines left, they often left behind authoritarian structures — like the Somoza dynasty in Nicaragua — that their presence had installed.</p><p>Marine General Smedley Butler, who participated in multiple Caribbean interventions, wrote in 1935: "I was a racketeer, a gangster for capitalism. I helped make Mexico safe for American oil interests in 1914. I helped make Haiti and Cuba a decent place for the National City Bank boys to collect revenues in. I helped in the raping of half a dozen Central American republics for the benefit of Wall Street."</p><p>Butler was awarded the Medal of Honor twice. He also became one of the most articulate critics of the era he helped create.</p>',
      advisorDialogue: {
        economic: 'Butler\'s rhetoric is colorful. But the economic infrastructure those interventions built still exists — railroads, ports, telegraph systems. The investment happened.',
        security: 'Butler served with distinction. His politics in retirement were his own business. The strategic question — did the interventions preserve American hemispheric supremacy? Yes. They did.',
        diplomatic: 'A decorated general calling U.S. foreign policy racketeering for capitalism. That\'s not a radical statement — it\'s a career summary. We should take it seriously.',
      },
      advisorPrimary: 'diplomatic',
      questions: [
        {
          id: 'rq1',
          type: 'short_answer',
          prompt: 'In your own words: Do you agree with Smedley Butler\'s characterization of U.S. military interventions as "racketeering for capitalism"? What evidence from this lesson supports or challenges his view?',
          explanation: 'Strong responses should engage with both the economic motivations Butler identifies (protecting corporate investment, collecting debts) and the stated strategic rationales (preventing European naval presence, preserving the Monroe Doctrine). Nuanced responses will acknowledge that both can be true simultaneously.',
          apStandard: 'KC-7.3.III.B',
          skillTags: ['Argumentation'],
          difficulty: 2,
        },
      ],
      next: 'historical_comparison',
    },

    // ─── HISTORICAL COMPARISON ───────────────────────────
    {
      id: 'historical_comparison',
      type: 'reflection',
      title: 'Historical Comparison: What Actually Happened',
      text: '<p><strong>What actually happened:</strong> The Roosevelt Corollary (1904) produced a pattern of U.S. military interventions across the Caribbean and Central America for the next thirty years. Marines occupied the Dominican Republic (1916–1924), Haiti (1915–1934), and Nicaragua (1912–1933, with brief gaps). Cuba remained effectively a protectorate until 1934.</p><p>The Good Neighbor Policy, announced by FDR in 1933, formally ended routine military interventions and abrogated the Platt Amendment. U.S. forces withdrew from Haiti and Nicaragua. Pan-American diplomatic relations improved dramatically.</p><p>However, the infrastructure of intervention — National Guards trained by the U.S., economic dependencies created by decades of occupation — remained. Nicaragua\'s Somoza dynasty (installed by a U.S.-trained National Guard) ruled until 1979. The Duvalier dynasty in Haiti drew on structures the occupation created. The Good Neighbor Policy ended the visible occupation; it didn\'t undo the political legacy.</p><p>The Cold War era (Lesson 5) would discover that covert action could accomplish what overt military occupation had done, with lower visibility but similar long-term consequences.</p>',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'abandoned_corollary', value: true }],
          outcome: {
            text: '<p><strong>Your path diverged from history</strong> when you abandoned the Corollary before FDR\'s Good Neighbor Policy. You arrived at the same destination roughly five years earlier — and with less accumulated resentment. The historical path of continued intervention until 1933 left deeper structural damage in the nations occupied.</p>',
          },
        },
        {
          conditions: [{ type: 'flag', key: 'full_interventionism_l4', value: true }],
          outcome: {
            text: '<p><strong>Your path closely tracked history</strong> in its most interventionist form. The actual doctrine, as applied from 1904–1934, was aggressive and comprehensive. The consequences — entrenched authoritarian governments, deep anti-American sentiment, structural economic dependency — also closely track the historical record.</p>',
          },
        },
      ],
      next: 'assessment',
    },

    // ─── ASSESSMENT (POST) ───────────────────────────────
    {
      id: 'assessment',
      type: 'assessment',
      title: 'Assessment: Big Stick Diplomacy',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          prompt: 'What was the Roosevelt Corollary\'s primary claim?',
          options: [
            'The United States had the right to annex Caribbean nations',
            'The United States would serve as an "international police power" in the Western Hemisphere to prevent European intervention',
            'European nations had the right to collect debts from Latin American countries using military force',
            'The Monroe Doctrine applied only to North America, not Central America or the Caribbean',
          ],
          correctIndex: 1,
          explanation: 'The 1904 Corollary extended the Monroe Doctrine to claim that the U.S. — not Europe — would intervene when Latin American nations couldn\'t maintain order or honor their debts. (KC-7.3.II.A)',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          prompt: 'How did the Good Neighbor Policy represent a change from the Roosevelt Corollary?',
          options: [
            'It authorized more military interventions but required congressional approval',
            'It formally renounced the right of unilateral U.S. intervention in Latin American affairs',
            'It replaced military interventions with economic sanctions',
            'It transferred U.S. intervention authority to the League of Nations',
          ],
          correctIndex: 1,
          explanation: 'FDR\'s Good Neighbor Policy (1933) formally ended the era of unilateral military intervention, abrogated the Platt Amendment, and withdrew U.S. forces from Haiti and Nicaragua. (KC-7.3.II.B)',
          apStandard: 'KC-7.3.II.B',
          skillTags: ['Comparison'],
          difficulty: 2,
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          prompt: 'Smedley Butler\'s description of himself as "a gangster for capitalism" most directly supports which historical interpretation?',
          options: [
            'U.S. military interventions were genuinely motivated by defending democracy',
            'U.S. military power was used primarily to protect corporate and financial interests rather than stated democratic principles',
            'Butler was a poor soldier who resented his military service',
            'U.S. interventions were always welcomed by local populations',
          ],
          correctIndex: 1,
          explanation: 'Butler\'s critique directly supports the historical interpretation that U.S. military force in the Caribbean served economic and corporate interests — protecting American investments — rather than the democratic ideals used to justify interventions. (KC-7.3.III.B)',
          apStandard: 'KC-7.3.III.B',
          skillTags: ['Argumentation'],
          difficulty: 2,
        },
        {
          id: 'q4',
          type: 'multi_select',
          prompt: 'Select ALL factors that help explain why U.S. military occupations of Haiti, Nicaragua, and the Dominican Republic lasted for decades rather than years. (Select all that apply)',
          options: [
            'European powers continued threatening military action throughout the occupation periods',
            'American-installed or supported governments depended on U.S. presence to remain in power',
            'Local populations repeatedly requested extended U.S. military presence',
            'American corporations with investments in the occupied nations lobbied for continued presence',
            'U.S. officials consistently underestimated how long "stabilization" would take',
          ],
          correctIndices: [1, 3, 4],
          explanation: 'Three factors drove the duration: dependent client governments, corporate lobbying for protection of investments, and bureaucratic/strategic underestimation of stabilization timelines. European threats had largely dissipated by 1910; local populations generally opposed rather than requested continued presence. (KC-7.3.II.A, KC-7.3.II.B)',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'q5',
          type: 'short_answer',
          prompt: 'Using evidence from this lesson, evaluate this claim: "The Roosevelt Corollary was a defensive policy designed to protect Latin American sovereignty from European interference." Agree, disagree, or qualify — and support your argument.',
          context: 'The Dominican customs takeover lasted 35 years. The U.S. Marine occupation of Haiti lasted 19 years. Nicaragua was occupied intermittently for 21 years. The Somoza dynasty, installed by a U.S.-trained National Guard, ruled Nicaragua for 42 years.',
          explanation: 'Strong responses should: (1) acknowledge the genuine defensive logic (preventing European gunboat diplomacy); (2) note that the "defensive" framing was contradicted by the long-term occupation outcomes; (3) identify whose sovereignty was actually protected (American investors, friendly governments) versus whose was violated (Dominican, Haitian, Nicaraguan populations). This is a "both/and" question, not "either/or."',
          apStandard: 'KC-7.3.III.B',
          skillTags: ['Argumentation'],
          difficulty: 2,
        },
      ],
    },
  ],
};

export default lesson04;
