/**
 * EMPIRE & INFLUENCE — Lesson 2: The Canal Question (1901–1914)
 *
 * Follows the Lesson 1 gold-standard template EXACTLY.
 * Extends with: pre-assessment, reflection, historical comparison.
 * Difficulty: slightly more complex than L1 (4 decision rounds).
 *
 * ASSETS (confirmed from Assets_Organized/L02_Panama/):
 *   Maps      : L02_MAP_01_CanalRoutes_PanamaVsNicaragua.png
 *   Newspapers: L02_NEWS_01_RevoltInPanama_DailyNews.png
 *               L02_NEWS_02_TroopsSecureCanalZone_BostonGlobe.png
 *               L02_NEWS_03_TraicionEnPanama_ElColombiano.png  [oppositional]
 *   Portraits : L02_PORT_01_EconomicAdvisor_CanalCompanyLawyer.png
 *               L02_PORT_02_SecurityAdvisor_ExpansionistMilitaryLeader.png
 *               L02_PORT_03_DiplomaticAdvisor_SecretaryOfState.png
 *
 * CONTINUITY IN  (flags read from global state, set by Lesson 1):
 *   aggressive_start          → Security advisor initialTrust +1
 *   chose_diplomacy_l1        → Diplomatic advisor initialTrust +1
 *   legacy_expansionist       → Narrative framing references Cuba mandate
 *   cuba_full_independence_legacy → influence starts –5 (applied via engine)
 *   platt_amendment           → Economic advisor references Cuba precedent
 *
 * CONTINUITY OUT (flags set here, read by Lessons 3–4):
 *   chose_panama_route        → L3/L4 narrative frames canal as strategic asset
 *   chose_nicaragua_route     → L3/L4 less strategic leverage
 *   supported_panama_revolution → L3 diplomatic advisor notes sovereignty concerns
 *   canal_zone_harsh          → L3 economic advisor references precedent
 *   canal_zone_generous       → L3 local populations start +5
 *   diplomatic_canal_path     → L4 diplomatic advisor references restraint
 */

const lesson02 = {
  id: 2,
  title: 'The Canal Question',
  subtitle: '1901–1914',
  era: 'early-imperial',
  period: 'Period 7',
  apStandards: ['KC-7.3.II.A', 'KC-7.3.II.B', 'KC-7.3.III.B'],

  // ═══════════════════════════════════════════════════════
  // CONTINUITY — Trust adjustments applied by engine on load
  // ═══════════════════════════════════════════════════════

  continuityIn: {
    advisorTrustBonuses: [
      { ifFlag: 'aggressive_start',   advisor: 'security',   delta: 1 },
      { ifFlag: 'chose_diplomacy_l1', advisor: 'diplomatic', delta: 1 },
      { ifFlag: 'legacy_expansionist',advisor: 'security',   delta: 1 },
      { ifFlag: 'platt_amendment',    advisor: 'economic',   delta: 1 },
    ],
    metricAdjustments: [
      { ifFlag: 'cuba_full_independence_legacy', effects: { influence: -5 } },
      { ifFlag: 'full_independence_l1',          effects: { stability: 5 } },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // ADVISORS
  // ═══════════════════════════════════════════════════════

  advisors: {
    economic: {
      name: 'Canal Company Lawyer',
      title: 'Economic Advisor',
      portrait: 'L02_PORT_01_EconomicAdvisor_CanalCompanyLawyer.png',
      initialTrust: 0,
      metricWeights: { influence: 0.5, stability: 0.4, economic: 2.0, support: 0.4 },
      bias: { primary: 'profit', secondary: 'control', aversion: 'delay' },
      quotes: {
        decision_1: {
          default: 'The New Panama Canal Company holds $109 million in assets and needs a buyer. The Panama route is the only logical choice — shorter, already partially excavated. Nicaragua is a consolation prize.',
          trusted: 'Between us? The French canal company is desperate. We buy their assets cheap, build through Panama, and own the most strategically profitable waterway on earth. The math is simple.',
          cold: 'I\'ll give you the business case — but whether you act on it is up to you. Panama saves time and money. Every delay costs American commerce $400,000 per day.',
        },
        decision_2: 'Colombia is playing games. Their senate rejected the Hay-Herrán Treaty because they want more money — pure extortion. We should not negotiate with extortionists. Other options exist.',
        decision_3: 'The Panamanians want independence. We want a canal. These are complementary interests. What happens in Bogotá is Colombia\'s problem, not ours.',
        decision_4: 'The canal zone terms must protect our investment permanently. We cannot build a $375 million project and then negotiate access rights every decade. Lock in sovereignty. Protect the asset.',
        reaction_approve: [
          'Now that is thinking like an investor.',
          'Commerce and strategy aligned. Shareholders will be delighted.',
          'Exactly. The canal pays for itself within twenty years if we play this right.',
        ],
        reaction_disapprove: [
          'You\'re letting sentiment get in the way of infrastructure.',
          'Every year of delay costs American trade $150 million. I hope your principles are worth that.',
          'History rewards the decisive. We are not being decisive today.',
        ],
        default: 'The canal is the single most important economic investment America has ever considered. Let\'s not fumble it.',
      },
    },

    security: {
      name: 'Expansionist Military Leader',
      title: 'Security Advisor',
      portrait: 'L02_PORT_02_SecurityAdvisor_ExpansionistMilitaryLeader.png',
      initialTrust: 0,
      metricWeights: { influence: 2.0, stability: 0.8, economic: 0.4, support: 0.8 },
      bias: { primary: 'dominance', secondary: 'control', aversion: 'compromise' },
      quotes: {
        decision_1: {
          default: 'Panama. No question. The Nicaragua route is 500 miles longer and vulnerable to volcanic activity — Mount Momotombo erupted in 1902. A canal is a strategic military asset. We need the shortest, most defensible route.',
          trusted: 'I\'ll be blunt: whoever controls an isthmus canal controls the entire Western Hemisphere\'s naval calculus. Panama puts us in that seat. Nicaragua is a fallback for people who lack ambition.',
          cold: 'You want strategic analysis? Panama. The route is shorter, the defenses are more natural, and Alfred Thayer Mahan himself said so. That should be enough.',
        },
        decision_2: 'Colombia\'s senate thinks they can hold the United States hostage. President Roosevelt should not tolerate this. A great power does not beg for permission to build its own strategic infrastructure.',
        decision_3: 'The Panama revolt is a gift. If we position a warship in the harbor to prevent Colombian troops from landing, independence succeeds in 48 hours. We don\'t even have to fire a shot.',
        decision_4: 'Sovereign control over the canal zone is non-negotiable. This is a military installation, not a trade post. We need the right to defend it, expand it, and deny access to enemies. Full sovereignty. Nothing less.',
        reaction_approve: [
          'Decisive. That\'s what the situation demands.',
          'Our naval position in the Pacific just got considerably stronger.',
          'Finally. History will remember this as the moment America grew up.',
        ],
        reaction_disapprove: [
          'Hesitation at this moment is a strategic error we will spend decades correcting.',
          'You\'re surrendering leverage that nations spend wars trying to acquire.',
          'I\'ve watched great powers fail because they were polite at the wrong moment. We are being polite at the wrong moment.',
        ],
        default: 'The canal is a military matter first and an economic matter second. Let\'s not confuse the two.',
      },
    },

    diplomatic: {
      name: 'Secretary of State',
      title: 'Diplomatic Advisor',
      portrait: 'L02_PORT_03_DiplomaticAdvisor_SecretaryOfState.png',
      initialTrust: 0,
      metricWeights: { influence: 0.6, stability: 1.8, economic: 0.3, support: 1.6 },
      bias: { primary: 'cooperation', secondary: 'stability', aversion: 'unilateral_force' },
      quotes: {
        decision_1: {
          default: 'Both routes have merit. But I urge you to consider the diplomatic dimension: Panama is sovereign Colombian territory. Building there requires a treaty in good faith. Nicaragua offers a cleaner legal situation.',
          trusted: 'I\'ll be honest — Panama is probably the right route. But the path to a Panama canal must go through Bogotá. If we bypass Colombia, we will spend the next century managing the consequences.',
          cold: 'You want my professional opinion? Nicaragua is safer diplomatically. Panama requires Colombia\'s cooperation, and Colombia is already suspicious of our motives.',
        },
        decision_2: 'Colombia\'s senate had every right to reject the Hay-Herrán Treaty — the original terms were frankly insulting. We offered $10 million once and $250,000 annually. A more generous proposal might succeed.',
        decision_3: 'If we recognize a Panama revolution that our own naval vessels enabled, we will have committed an act of political aggression against a sovereign nation. The world will take note. Latin America will not forget.',
        decision_4: 'Panama deserves sovereignty over its own territory. We can build and operate the canal with a long-term lease and mutual defense guarantees — without making Panama a permanent American protectorate.',
        reaction_approve: [
          'International law preserved. That matters more than it seems today.',
          'Restraint is always the harder path. You chose it anyway.',
          'Panama will remember this. Goodwill is the most durable currency in diplomacy.',
        ],
        reaction_disapprove: [
          'We have just told every nation in Latin America that their sovereignty is conditional on our approval.',
          'The next generation of diplomats will spend careers untangling what we\'ve just done.',
          'I understand the strategic logic. I am simply noting that strategy without legitimacy is coercion.',
        ],
        default: 'The canal will outlast every administration involved in building it. The terms we set now will echo for a century.',
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
      subtitle: 'Answer based on what you already know — no pressure.',
      questions: [
        {
          id: 'pq1',
          type: 'multiple_choice',
          prompt: 'Why did the United States want to build a canal across Central America in the early 1900s?',
          options: [
            'To export American agricultural goods to Asia',
            'To connect the Atlantic and Pacific Oceans for faster naval and commercial transit',
            'To establish a colony in Central America',
            'To prevent British ships from accessing the Pacific',
          ],
          correctIndex: 1,
          explanation: 'A canal would dramatically shorten the route between the Atlantic and Pacific, with major military and commercial benefits.',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'pq2',
          type: 'multiple_choice',
          prompt: 'Which country controlled the territory of Panama before Panamanian independence in 1903?',
          options: ['Venezuela', 'Peru', 'Colombia', 'Nicaragua'],
          correctIndex: 2,
          explanation: 'Panama was a province of Colombia until the 1903 independence movement — which the U.S. supported.',
          apStandard: 'KC-7.3.II.B',
          skillTags: ['Contextualization'],
          difficulty: 2,
        },
        {
          id: 'pq3',
          type: 'multiple_choice',
          prompt: 'What was the Monroe Doctrine\'s original purpose?',
          options: [
            'To authorize U.S. military intervention in Latin America',
            'To warn European powers against new colonization in the Western Hemisphere',
            'To establish trade agreements with Central American nations',
            'To assert U.S. sovereignty over the Caribbean islands',
          ],
          correctIndex: 1,
          explanation: 'President Monroe\'s 1823 doctrine warned Europe against new colonial ventures in the Americas — a principle later extended far beyond its original scope.',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Contextualization'],
          difficulty: 2,
        },
      ],
      next: 'intro',
    },

    // ─── INTRO ──────────────────────────────────────────
    {
      id: 'intro',
      type: 'intro',
      title: 'The Canal Question',
      subtitle: '1901–1914',
      text: '<p>The year is 1901. The Spanish-American War proved what Alfred Thayer Mahan had argued for a decade: America needs a two-ocean navy — and a navy needs a canal.</p><p>During the war, the battleship USS Oregon took 68 days to sail from San Francisco around Cape Horn to join the fleet off Cuba. With a canal across Central America, that journey would take two weeks.</p><p>You are a senior policy advisor to President Theodore Roosevelt. The canal will be built. The question is <em>where</em>, <em>how</em>, and at what cost to American credibility abroad.</p>',
      map: {
        asset: 'L02_MAP_01_CanalRoutes_PanamaVsNicaragua.png',
        caption: 'Proposed canal routes, 1901 — Panama (French excavation site) and Nicaragua',
        hotspots: [
          { x: 42, y: 55, label: 'Panama Route', tooltip: 'French de Lesseps excavation, 1880–1889. Partially dug. 50 miles across.' },
          { x: 35, y: 42, label: 'Nicaragua Route', tooltip: 'Longer but no existing excavation. Volcanic lake route. 170 miles.' },
          { x: 70, y: 60, label: 'Caribbean Shipping Lanes', tooltip: 'Primary Atlantic-to-Canal approach routes.' },
        ],
      },
      advisorDialogue: {
        economic: 'The New Panama Canal Company is selling its French assets for $40 million. That\'s our entry point.',
        security: 'The Isthmian Canal Commission has studied both routes. Panama wins on every strategic metric.',
        diplomatic: 'Whichever route we choose, we will need treaties with sovereign nations. The process matters as much as the outcome.',
      },
      advisorPrimary: 'economic',
      next: 'context_1',
    },

    // ─── CONTEXT 1 ───────────────────────────────────────
    {
      id: 'context_1',
      type: 'context',
      title: 'Two Routes, One Nation\'s Future',
      text: '<p>Two serious canal routes are on the table. The <strong>Panama route</strong> offers a shorter crossing — 50 miles — and benefits from partial French excavation begun by Ferdinand de Lesseps in the 1880s before the project collapsed in scandal. The New Panama Canal Company, desperate to recover its investment, is willing to sell its assets for $40 million.</p><p>The <strong>Nicaragua route</strong> is longer — 170 miles — but legally simpler. Nicaragua has no prior canal agreements and is eager to negotiate. Crucially, it runs through a volcanic region: Mount Momotombo erupted in 1902, and Congressman William Hepburn is circulating a Nicaraguan postage stamp featuring the volcano in eruption to scare colleagues away from the route.</p><p>The Isthmian Canal Commission has shifted its recommendation from Nicaragua to Panama — but Congress and the public remain divided.</p>',
      advisorDialogue: {
        economic: 'The commission changed its recommendation for a reason. Forty million for French assets is cheap. The total Panama project cost will be far lower than Nicaragua.',
        security: 'Volcanic instability aside, Panama\'s Caribbean terminus at Colón and Pacific terminus at Panama City are more defensible than anything Nicaragua offers.',
        diplomatic: 'Consider what the Nicaraguan option signals: respect for process, negotiation from strength, and a clean legal slate. That has long-term value.',
      },
      advisorPrimary: 'economic',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'legacy_expansionist', value: true }],
          outcome: {
            text: '<p>Two serious canal routes are on the table. Fresh from the Cuba precedent — where America demonstrated the will to project power — your advisors frame the Panama question in expansionist terms. The canal is not just infrastructure; it is the next step in American hemispheric dominance.</p><p>The <strong>Panama route</strong> is shorter, strategically superior, and partially excavated. The <strong>Nicaragua route</strong> is safer legally but strategically weaker.</p>',
          },
        },
      ],
      next: 'decision_1',
    },

    // ─── DECISION 1: Canal Route ─────────────────────────
    {
      id: 'decision_1',
      type: 'decision',
      title: 'The Route Decision',
      prompt: 'The Isthmian Canal Commission has submitted its recommendation. Congress is ready to vote. Which canal route do you advise the President to pursue?',
      text: 'This decision will shape the entire Panama strategy — and your relationship with Colombia.',

      choices: [
        {
          id: 'd1_panama',
          label: 'Panama: Buy French Assets, Negotiate with Colombia',
          description: 'Purchase the New Panama Canal Company\'s assets for $40 million and negotiate a treaty with Colombia for rights to build across their province of Panama.',
          advisorAlignment: 'economic',
          riskLevel: 'high',
          tags: ['profit', 'expansion', 'bilateral'],
          effects: { influence: 8, stability: -5, economic: 12, support: 3 },
          factionEffects: { localPopulations: -5, usGovernment: 8, corporations: 15, internationalActors: -8 },
          flags: { chose_panama_route: true },
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Excellent. I\'ll begin negotiations with the canal company immediately. The French shareholders will be relieved.' },
            security: { trustDelta: 2, dialogue: 'The strategically superior choice. Panama secures our Pacific position in a way Nicaragua never could.' },
            diplomatic: { trustDelta: -1, dialogue: 'Panama requires Colombia\'s agreement. I hope we\'re prepared to negotiate in good faith with Bogotá.' },
          },
          consequenceText: 'Congress passes the Spooner Act, authorizing the Panama route. The New Panama Canal Company sells its assets to the U.S. for $40 million. Negotiations with Colombia begin. The Hay-Herrán Treaty takes shape — offering Colombia $10 million and $250,000 annually.',
          next: 'consequence_1',
          delayedConsequences: [
            {
              id: 'dc_panama_strategic',
              trigger: 'screen',
              triggerScreenId: 'decision_3',
              narrative: 'American naval strategists are thrilled with the Panama route. The canal\'s defensibility and shorter transit time represent a generational improvement in American naval power.',
              effects: { influence: 5 },
              factionEffects: { usGovernment: 5 },
            },
          ],
        },
        {
          id: 'd1_nicaragua',
          label: 'Nicaragua: Clean Slate, Direct Negotiation',
          description: 'Choose the Nicaragua route. Negotiate directly with Nicaragua for a canal rights treaty — avoiding the complications of Colombian sovereignty and French corporate interests.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'multilateral'],
          effects: { influence: -3, stability: 8, economic: 3, support: 5 },
          factionEffects: { localPopulations: 5, usGovernment: 0, corporations: -8, internationalActors: 10 },
          flags: { chose_nicaragua_route: true },
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'We\'re leaving $40 million in French assets on the table and choosing a route that adds 120 miles to every crossing. This is a mistake.' },
            security: { trustDelta: -2, dialogue: 'Nicaragua is geographically inferior and volcanically unstable. This is the wrong call for American security.' },
            diplomatic: { trustDelta: 2, dialogue: 'The clean diplomatic option. Nicaragua\'s government is cooperative and the legal framework is simpler. Sometimes the easier path is the right one.' },
          },
          consequenceText: 'The Hepburn Bill passes, authorizing the Nicaragua route. Negotiations begin with Managua. The process is smoother than Panama would have been — but the strategic advantages are smaller, and the French canal company walks away with nothing.',
          next: 'consequence_1',
          delayedConsequences: [
            {
              id: 'dc_nicaragua_stability',
              trigger: 'screen',
              triggerScreenId: 'decision_3',
              narrative: 'The Nicaragua route negotiations proceed steadily, but military advisors continue to note the strategic limitations compared to Panama.',
              effects: { stability: 5, influence: -3 },
            },
          ],
        },
        {
          id: 'd1_delay',
          label: 'Commission Further Study — Delay Decision',
          description: 'The commission\'s recommendation change from Nicaragua to Panama is too recent. Request additional engineering and diplomatic analysis before committing.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'deliberation'],
          effects: { influence: -8, stability: 5, economic: -5, support: -3 },
          factionEffects: { localPopulations: 2, usGovernment: -8, corporations: -12, internationalActors: 5 },
          flags: { delayed_canal_decision: true },
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'Every year of delay costs American commerce $150 million in Pacific trade. Caution has a price tag.' },
            security: { trustDelta: -1, dialogue: 'Hesitation signals weakness. Other powers are watching — and some of them also want a canal.' },
            diplomatic: { trustDelta: 1, dialogue: 'Deliberate decisions are durable decisions. I\'d rather we take an extra six months and get this right.' },
          },
          consequenceText: 'The administration commissions additional study. Congress is frustrated. The delay opens political space for debate — but costs diplomatic momentum. When the decision finally comes, it will be Panama, but under greater pressure.',
          next: 'consequence_1',
        },
      ],
    },

    // ─── CONSEQUENCE 1 ──────────────────────────────────
    {
      id: 'consequence_1',
      type: 'consequence',
      title: 'The Colombian Problem',
      text: '<p>Whether by choice or default, the canal question now centers on Panama — and Panama is part of Colombia.</p><p>Secretary of State John Hay negotiates the Hay-Herrán Treaty with Colombian diplomats: the United States will pay $10 million upfront and $250,000 per year for a 100-year lease on a canal zone. The Colombian government tentatively supports it.</p><p>Then the unthinkable happens: the Colombian senate unanimously <em>rejects</em> the treaty. Colombian senators argue the payment is inadequate, the terms undermine sovereignty, and they want the $40 million the U.S. paid the French canal company instead.</p><p>President Roosevelt is furious. He calls Colombian legislators "contemptible little creatures" in private correspondence. Your advisors have different interpretations of what comes next.</p>',
      map: {
        asset: 'L02_MAP_01_CanalRoutes_PanamaVsNicaragua.png',
        caption: 'Panama province (Colombia) — site of the proposed canal zone',
      },
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'chose_nicaragua_route', value: true }],
          outcome: {
            text: '<p>The Nicaragua route negotiations are proceeding smoothly when news arrives from Bogotá: Colombia has rejected the Hay-Herrán Treaty, cutting off the Panama option for anyone still considering it. Your advisors note this validates the Nicaragua choice — but some in Washington argue it\'s a sign that a determined President could have forced the Panama option anyway.</p>',
          },
        },
      ],
      next: 'decision_2',
    },

    // ─── DECISION 2: Response to Colombian Rejection ─────
    {
      id: 'decision_2',
      type: 'decision',
      title: 'Colombia Says No',
      prompt: 'The Colombian senate has rejected the Hay-Herrán Treaty. Roosevelt calls it blackmail. What do you advise the President to do?',
      text: 'A Panamanian independence movement has been quietly organizing. The canal company\'s legal representative, Philippe Bunau-Varilla, has been in contact with Panamanian separatists.',

      choices: [
        {
          id: 'd2_renegotiate',
          label: 'Renegotiate — Offer Colombia Better Terms',
          description: 'Return to the table. Offer Colombia a larger upfront payment or a share of future canal revenues to secure the treaty.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'bilateral'],
          effects: { influence: -5, stability: 10, economic: -3, support: -5 },
          factionEffects: { localPopulations: 8, usGovernment: -5, corporations: -8, internationalActors: 12 },
          flags: { renegotiated_colombia: true, diplomatic_canal_path: true },
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'Paying more for what we already negotiated sets a terrible precedent. Every nation will hold us hostage.' },
            security: { trustDelta: -2, dialogue: 'You\'re rewarding Colombia for extortion. The word will spread. Great powers don\'t beg.' },
            diplomatic: { trustDelta: 2, dialogue: 'Renegotiation is not weakness — it\'s leadership. Colombia has legitimate sovereignty concerns. Address them honestly.' },
          },
          consequenceText: 'The U.S. returns to negotiations with a more generous offer. Colombia eventually accepts revised terms. The process takes eight more months — and the canal opens three years later than planned. But the legal foundation is solid, and Colombia remains a neutral party to U.S. interests.',
          next: 'consequence_2',
        },
        {
          id: 'd2_pressure',
          label: 'Pressure Colombia — Threaten to Choose Nicaragua',
          description: 'Warn Colombia that the United States will simply build in Nicaragua if they refuse to ratify. Use the threat as leverage.',
          advisorAlignment: 'security',
          riskLevel: 'medium',
          tags: ['coercion', 'bilateral'],
          effects: { influence: 5, stability: -3, economic: 2, support: 0 },
          factionEffects: { localPopulations: -5, usGovernment: 5, corporations: 3, internationalActors: -5 },
          flags: { pressured_colombia: true },
          advisorReactions: {
            economic: { trustDelta: 0, dialogue: 'Leverage is leverage. It may work. But if it doesn\'t, we\'ve committed to a worse outcome.' },
            security: { trustDelta: 1, dialogue: 'Finally. A credible threat has a way of clarifying minds in Bogotá.' },
            diplomatic: { trustDelta: -1, dialogue: 'Threats work right up until they don\'t. If Colombia calls our bluff, we either capitulate or escalate. Neither is comfortable.' },
          },
          consequenceText: 'The U.S. delivers an ultimatum: ratify or lose the canal project entirely. Colombia\'s senate is unmoved — and internal Panamanian separatist sentiment begins to crystallize. The situation is about to become more complicated.',
          next: 'consequence_2',
          delayedConsequences: [
            {
              id: 'dc_colombia_pressure_blowback',
              trigger: 'screen',
              triggerScreenId: 'decision_3',
              narrative: 'Colombia\'s rejection of American pressure has stiffened their resolve — and emboldened Panamanian separatists who believe U.S. frustration with Bogotá will translate into support for independence.',
              effects: { stability: -3 },
              factionEffects: { internationalActors: -5 },
            },
          ],
        },
        {
          id: 'd2_enable_revolution',
          label: 'Support Panamanian Independence — Quietly',
          description: 'Work through back channels to encourage and enable a Panamanian independence movement. If Panama separates from Colombia, a treaty becomes possible.',
          advisorAlignment: 'economic',
          riskLevel: 'high',
          tags: ['covert', 'expansion', 'unilateral_force'],
          effects: { influence: 12, stability: -10, economic: 10, support: 5 },
          factionEffects: { localPopulations: -8, usGovernment: 8, corporations: 12, internationalActors: -15 },
          flags: { enabled_panama_revolution: true },
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Practical. Bunau-Varilla has already been in contact with the separatists. The machinery is in motion. We simply don\'t interfere with it.' },
            security: { trustDelta: 2, dialogue: 'A new nation, grateful for our role in its birth, sharing a canal zone with us permanently. The strategic upside is enormous.' },
            diplomatic: { trustDelta: -2, dialogue: 'We are about to dismember a sovereign nation for a waterway. Whatever we tell ourselves, that is what this is.' },
          },
          consequenceText: 'U.S. naval vessels, conveniently positioned near Colón, block Colombian troop transports from landing when the revolution begins. Panama declares independence on November 3, 1903. The U.S. recognizes the new nation within 72 hours.',
          next: 'consequence_2',
          newspaper: {
            asset: 'L02_NEWS_01_RevoltInPanama_DailyNews.png',
            headline: 'PANAMA REVOLTS! Independence Declared',
            perspective: 'American Interventionist Press',
            bodyText: 'Panamanians have declared independence from Colombia. U.S. warships in the harbor prevented Colombian forces from suppressing the revolt.',
          },
        },
        {
          id: 'd2_nicaragua_pivot',
          label: 'Abandon Panama — Build in Nicaragua',
          description: 'Colombia\'s rejection is final. Cut losses and pivot fully to the Nicaragua route.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          tags: ['cooperation', 'withdrawal'],
          conditions: [{ type: 'flag', key: 'chose_nicaragua_route', value: true }],
          lockMessage: 'This option requires having selected the Nicaragua route in Decision 1.',
          effects: { influence: -5, stability: 8, economic: -5, support: 3 },
          factionEffects: { localPopulations: 5, usGovernment: -5, corporations: -15, internationalActors: 8 },
          flags: { built_nicaragua_canal: true, chose_nicaragua_route: true },
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'We\'ve already paid $40 million for French assets we now can\'t use. This is an expensive lesson in diplomatic persistence.' },
            security: { trustDelta: -2, dialogue: 'The strategic case for Panama was overwhelming. We\'re settling for less than we needed.' },
            diplomatic: { trustDelta: 1, dialogue: 'Given Colombia\'s firm rejection, Nicaragua is the principled path forward. We honor what we can negotiate rather than taking what we want.' },
          },
          consequenceText: 'The United States pivots to Nicaragua. Negotiations succeed within six months. The canal opens in 1919 — two years later than the Panama route would have allowed, and 20% longer per transit. But the legal foundation is clean.',
          next: 'consequence_2',
        },
      ],
    },

    // ─── CONSEQUENCE 2 ──────────────────────────────────
    {
      id: 'consequence_2',
      type: 'consequence',
      title: 'The New Nation of Panama',
      text: '<p>Panama exists. Whether through revolution enabled by the U.S., renegotiation with Colombia, or the Nicaragua pivot, the canal path is now clear.</p><p>If Panama is independent, Philippe Bunau-Varilla — the French canal company\'s representative — has been appointed Panama\'s minister to Washington. He will negotiate the canal zone treaty. The Panamanians are thrilled, but slightly uneasy about how quickly their independence became an American diplomatic asset.</p><p>The Hay-Bunau-Varilla Treaty is on the table. Now comes the hardest question: what does America get, and at what cost to Panamanian sovereignty?</p>',
      newspaper: {
        asset: 'L02_NEWS_02_TroopsSecureCanalZone_BostonGlobe.png',
        headline: 'U.S. Troops Secure Panama Canal Zone',
        perspective: 'American Mainstream Press',
        bodyText: 'American forces have established control of the Canal Zone. Construction is set to begin. The great engineering project of the century moves forward.',
        trigger: 'after-continue',
      },
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'renegotiated_colombia', value: true }],
          outcome: {
            text: '<p>Renegotiation with Colombia has succeeded. Panama remains part of Colombia — but the U.S. has secured a 100-year canal lease with more generous terms. The Panamanian independence movement never activated. Construction can begin on a solid legal foundation.</p><p>Your diplomatic patience is noted internationally. Latin American governments are watching — and the restraint has earned quiet respect. Your advisors now turn to the terms of construction and operation.</p>',
          },
        },
      ],
      next: 'decision_3',
    },

    // ─── DECISION 3: Panama Revolution / Canal Zone Entry ──
    {
      id: 'decision_3',
      type: 'decision',
      title: 'Terms of the Canal Zone',
      prompt: 'The Hay-Bunau-Varilla Treaty gives the U.S. rights "in perpetuity" over a 10-mile-wide canal zone — as if the United States were sovereign. Panama\'s new leaders are uncomfortable with some provisions. How do you frame the final terms?',
      text: 'The treaty Bunau-Varilla signed on Panama\'s behalf was not reviewed by the Panamanian government before signing. Some Panamanian leaders call the process a betrayal.',

      choices: [
        {
          id: 'd3_full_sovereignty',
          label: 'Maintain Full Treaty Terms — U.S. Sovereignty "As If" Over the Zone',
          description: 'Accept the Hay-Bunau-Varilla Treaty as signed. The U.S. controls the canal zone in perpetuity, as if sovereign. Maximum control, maximum security.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['control', 'dominance', 'unilateral_force'],
          effects: { influence: 12, stability: -8, economic: 10, support: 3 },
          factionEffects: { localPopulations: -20, usGovernment: 10, corporations: 12, internationalActors: -10 },
          flags: { canal_zone_harsh: true, full_sovereignty_canal: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Perpetual sovereignty protects our $375 million investment permanently. This is the only arrangement that makes financial sense.' },
            security: { trustDelta: 2, dialogue: 'We hold the zone in perpetuity, we control access, we defend it as American territory. This is exactly what the strategic situation requires.' },
            diplomatic: { trustDelta: -2, dialogue: 'We are telling Panama — a nation we just midwifed into existence — that its own territory is not truly its own. The resentment this builds will outlast the canal.' },
          },
          consequenceText: 'The Hay-Bunau-Varilla Treaty is ratified. The Canal Zone is formally established as U.S. territory "in perpetuity." Construction begins under the Army Corps of Engineers. The canal opens in 1914 — a triumph of engineering. But in Panama City, Panamanian nationalists begin a decades-long campaign to reclaim their land.',
          next: 'consequence_3',
          delayedConsequences: [
            {
              id: 'dc_panama_resentment',
              trigger: 'next_lesson',
              targetLesson: 3,
              narrative: 'Panama\'s resentment of the Canal Zone terms creates a model: American-controlled enclaves inside sovereign nations. Other governments in the region take note.',
              effects: { stability: -5 },
              factionEffects: { localPopulations: -8 },
              flags: { canal_zone_legacy_harsh: true },
            },
          ],
        },
        {
          id: 'd3_modified_terms',
          label: 'Modify Treaty — Shared Governance with Panama',
          description: 'Renegotiate limited aspects of the treaty: retain operational control and defense rights, but acknowledge Panamanian sovereignty within the zone and establish a joint governance commission.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          tags: ['cooperation', 'bilateral'],
          effects: { influence: 5, stability: 5, economic: 5, support: 5 },
          factionEffects: { localPopulations: 5, usGovernment: 3, corporations: 5, internationalActors: 5 },
          flags: { canal_zone_moderate: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 0, dialogue: 'Shared governance adds complexity, but the canal still gets built and we still control operations. I can live with this.' },
            security: { trustDelta: -1, dialogue: 'Shared governance means shared decisions. In a crisis, shared decisions become slow decisions. I\'d prefer cleaner authority.' },
            diplomatic: { trustDelta: 2, dialogue: 'This is the model that survives. Panama maintains dignity; we maintain operations. Both parties have something to protect.' },
          },
          consequenceText: 'A modified treaty establishes the Canal Zone with U.S. operational control but Panamanian sovereignty acknowledged. Construction begins. Panamanian leaders are cautiously satisfied — they have a canal, American investment, and national pride intact. The canal opens in 1914.',
          next: 'consequence_3',
          delayedConsequences: [
            {
              id: 'dc_panama_goodwill',
              trigger: 'next_lesson',
              targetLesson: 3,
              narrative: 'Panama\'s positive experience with the canal treaty creates a rare example of functional U.S.-Latin American partnership. Other nations notice.',
              effects: { stability: 5 },
              factionEffects: { localPopulations: 5, internationalActors: 5 },
              flags: { canal_zone_legacy_moderate: true },
            },
          ],
        },
        {
          id: 'd3_generous_terms',
          label: 'Generous Treaty — Long-Term Lease, Full Panamanian Sovereignty',
          description: 'Restructure the treaty as a long-term lease rather than perpetual sovereignty. Panama retains full sovereignty; the U.S. leases the zone for 99 years with renewal options.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'multilateral'],
          effects: { influence: -5, stability: 12, economic: 3, support: 10 },
          factionEffects: { localPopulations: 15, usGovernment: -8, corporations: -5, internationalActors: 15 },
          flags: { canal_zone_generous: true, diplomatic_canal_path: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'A 99-year lease with renewal means we\'re negotiating this again in 2002. We\'ll have forgotten why the original terms mattered by then.' },
            security: { trustDelta: -2, dialogue: 'We\'re leasing our most important strategic asset rather than owning it. When that lease becomes a bargaining chip, we\'ll regret this.' },
            diplomatic: { trustDelta: 2, dialogue: 'Panama gets a genuine independence. We get a functioning canal. And in 1999, when the lease ends, we can negotiate as equals rather than fighting a liberation movement.' },
          },
          consequenceText: 'The lease-based treaty is ratified. Panama celebrates genuine independence. The canal opens in 1914 on schedule. The generous terms draw praise from international observers — and quiet criticism from military and corporate interests who call it naive.',
          next: 'consequence_3',
          delayedConsequences: [
            {
              id: 'dc_generous_legacy',
              trigger: 'next_lesson',
              targetLesson: 3,
              narrative: 'The canal treaty\'s generous terms create a positive precedent — but they also signal that American interests can be negotiated with, leading to more assertive local governments in the region.',
              effects: { stability: 8, influence: -5 },
              factionEffects: { localPopulations: 10 },
              flags: { canal_zone_legacy_generous: true },
            },
          ],
        },
      ],
    },

    // ─── CONSEQUENCE 3 ──────────────────────────────────
    {
      id: 'consequence_3',
      type: 'consequence',
      title: 'Construction Begins',
      text: '<p>The canal is underway. Ten years of construction will transform the isthmus — blasting through the Culebra Cut, building the Gatún Dam (at its completion, the largest dam on earth), and installing the Miraflores and Gatún locks.</p><p>The human cost is real: over 5,600 workers die during construction, many from yellow fever and malaria until Dr. William Gorgas implements mosquito eradication measures. The workforce is largely Caribbean and West Indian laborers, paid at lower "silver roll" rates than white American workers.</p><p>The canal opens on August 15, 1914 — the same week that World War I begins in Europe. The strategic timing could not be more significant.</p>',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'canal_zone_harsh', value: true }],
          outcome: {
            text: '<p>Construction proceeds under full U.S. authority. Efficient, well-organized, effective. But Panamanian workers in the zone are subject to American segregation laws — separate pay scales, separate facilities, separate futures.</p><p>The canal opens in August 1914. It is a triumph of engineering. And in Panama City, the first protest signs appear outside the Zone gates.</p>',
          },
        },
      ],
      next: 'decision_4',
    },

    // ─── DECISION 4: Long-term Canal Policy ──────────────
    {
      id: 'decision_4',
      type: 'decision',
      title: 'The Canal\'s Strategic Purpose',
      prompt: 'The Panama Canal is open. As you prepare your policy legacy document, how should the U.S. frame the canal\'s long-term role in American foreign policy?',
      text: 'The canal is operational. The question now is doctrine: what does this achievement mean for America\'s role in the Western Hemisphere?',

      choices: [
        {
          id: 'd4_strategic_weapon',
          label: '"The Canal Is a Military Asset — America Guards the Western Hemisphere"',
          description: 'Frame the canal as proof that the U.S. has both the right and responsibility to control strategic waterways. Set the precedent for interventionism.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['dominance', 'unilateral_force'],
          effects: { influence: 12, stability: -8, economic: 5, support: 5 },
          factionEffects: { localPopulations: -10, usGovernment: 12, corporations: 8, internationalActors: -12 },
          flags: { canal_as_weapon: true, legacy_interventionist_l2: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 1, dialogue: 'Military framing protects the economic asset. I\'ll accept the sequencing.' },
            security: { trustDelta: 2, dialogue: 'This is exactly right. The canal is the cornerstone of American naval supremacy in both oceans. Every policy should flow from that reality.' },
            diplomatic: { trustDelta: -2, dialogue: 'We\'ve just told every nation in Latin America they live in our strategic zone. That\'s not a partnership. That\'s hegemony.' },
          },
          consequenceText: 'The canal doctrine becomes official: the waterway is a U.S. strategic asset, and the U.S. will take whatever action necessary to protect it. Roosevelt cites the canal when drafting the Roosevelt Corollary to the Monroe Doctrine. A new era of American interventionism has official architecture.',
          next: 'outcome',
        },
        {
          id: 'd4_commercial_hub',
          label: '"The Canal Is a Commercial Asset — America Leads Global Trade"',
          description: 'Frame the canal as a triumph of American enterprise and engineering — a commercial hub that benefits all trading nations, not a military fortress.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          tags: ['profit', 'multilateral'],
          effects: { influence: 5, stability: 5, economic: 15, support: 3 },
          factionEffects: { localPopulations: -3, usGovernment: 5, corporations: 15, internationalActors: 5 },
          flags: { canal_as_commerce: true, legacy_economic_l2: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Trade framing opens the canal to commercial diplomacy. Every nation that profits from the canal becomes a stake-holder in American-led order.' },
            security: { trustDelta: 0, dialogue: 'Commercial framing still requires military defense. I can work within that — as long as the defense budget reflects the asset\'s value.' },
            diplomatic: { trustDelta: 1, dialogue: 'Commercial framing is more palatable internationally. It positions the canal as a gift to global trade rather than a tool of American dominance.' },
          },
          consequenceText: 'The canal opens to all commercial vessels under equal terms. Global shipping patterns shift almost immediately — the Panama route cuts 8,000 miles from Pacific-to-Atlantic voyages. American trade leadership is established not through force but through infrastructure.',
          next: 'outcome',
        },
        {
          id: 'd4_shared_asset',
          label: '"The Canal Belongs to the Hemisphere — Build a Framework for Shared Governance"',
          description: 'Propose an international framework under which Panama and the U.S. jointly administer the canal, with revenue shared regionally.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'multilateral'],
          effects: { influence: -3, stability: 12, economic: 5, support: 12 },
          factionEffects: { localPopulations: 15, usGovernment: -8, corporations: -5, internationalActors: 18 },
          flags: { canal_as_shared: true, diplomatic_canal_path: true, legacy_diplomatic_l2: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'Shared governance means shared decisions — and shared revenues. American investment deserves American returns.' },
            security: { trustDelta: -2, dialogue: 'An international canal in a contested hemisphere is a security nightmare. Who defends it when the "framework" collapses?' },
            diplomatic: { trustDelta: 2, dialogue: 'If the canal is truly a gift to commerce, then a framework of shared stewardship is the only honest structure. It also pre-empts generations of conflict over sovereignty.' },
          },
          consequenceText: 'The U.S. proposes a joint governance framework. Most nations receive it skeptically — American military presence remains — but the symbolic architecture of shared stewardship softens Latin American perceptions of U.S. motives.',
          next: 'outcome',
        },
      ],
    },

    // ─── OUTCOME ────────────────────────────────────────
    {
      id: 'outcome',
      type: 'outcome',
      title: 'Lesson Complete: The Canal Question',
      text: '<p>The Panama Canal opens on August 15, 1914. It is one of the greatest engineering achievements in human history — and one of the most politically complicated.</p><p>The decisions you made will echo forward. How the U.S. secured the canal — through renegotiation, covert revolution, or diplomatic creativity — establishes a template for American behavior in Latin America. The terms of the Canal Zone treaty will shape Panamanian nationalism for decades.</p><p>Your advisors will carry their trust levels into the next lesson. The ideological profile you\'ve built — interventionist, diplomatic, or economic — will influence how they respond to the even more complex challenges of corporate empire in Central America.</p>',
      newspaper: {
        asset: 'L02_NEWS_03_TraicionEnPanama_ElColombiano.png',
        headline: 'Traición en Panamá — Colombia Mourns a Stolen Province',
        perspective: 'Colombian Counter-Perspective (El Colombiano)',
        bodyText: 'Colombia decries American intervention in Panama as a betrayal of international law. "They took our province for a waterway and call it liberation." The wound will not heal quickly.',
        trigger: 'with-consequence',
      },
      next: 'reflection',
    },

    // ─── REFLECTION ─────────────────────────────────────
    {
      id: 'reflection',
      type: 'reflection',
      title: 'Reflect: The Price of the Canal',
      text: '<p>The Panama Canal is an extraordinary accomplishment — but consider the full picture.</p><p>A sovereign nation (Colombia) lost a province it had governed for decades. A new nation (Panama) was born partly through U.S. covert support. A treaty was signed by a French businessman rather than Panamanian leaders. Workers — mostly Caribbean and West Indian — died by the thousands under conditions shaped by American-style racial segregation.</p><p>The canal reduced shipping times by thousands of miles and transformed global commerce. It also established a model for how American power would operate in the 20th century: economic incentives backed by military presence, strategic assets protected by legal frameworks that prioritized U.S. control.</p>',
      advisorDialogue: {
        economic: 'The canal pays for itself. Within 20 years, it generates more revenue than it cost to build. Whatever the political complications, the economic case is vindicated.',
        security: 'The strategic value is incalculable. The 1914 opening — the same week as World War I — could not be better timed. America now commands both oceans.',
        diplomatic: 'Colombia still hasn\'t forgiven us. Panama\'s nationalists have been protesting since the ink dried. We built something magnificent on a cracked foundation.',
      },
      advisorPrimary: 'diplomatic',
      questions: [
        {
          id: 'rq1',
          type: 'short_answer',
          prompt: 'In your own words: Was the way the United States acquired the Panama Canal justified? What competing values were in tension?',
          explanation: 'Strong responses should acknowledge the tension between strategic/economic gains and the violation of Colombian sovereignty. Consider the Teller Amendment parallel from L1: the U.S. repeatedly made promises it later qualified.',
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
      text: '<p><strong>What actually happened:</strong> President Roosevelt chose the Panama route and, when Colombia\'s senate rejected the Hay-Herrán Treaty, tacitly supported a Panamanian independence movement. U.S. warships blocked Colombian troops from suppressing the revolt. Panama declared independence November 3, 1903, and was recognized by the U.S. within 72 hours.</p><p>Philippe Bunau-Varilla — who was not Panamanian — signed the Hay-Bunau-Varilla Treaty giving the U.S. control over a 10-mile canal zone "in perpetuity, as if sovereign." Panamanian leaders who arrived in Washington the next day were presented with a signed treaty they hadn\'t reviewed.</p><p>The canal opened August 15, 1914. The Canal Zone remained under U.S. control until 1999, when the Torrijos-Carter Treaties (1977) took full effect — 96 years after independence.</p><p><strong>How did your decisions compare?</strong></p>',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'renegotiated_colombia', value: true }],
          outcome: {
            text: '<p><strong>Your path diverged from history</strong> when you chose to renegotiate with Colombia rather than enable revolution. In reality, Roosevelt viewed Colombia\'s rejection as intolerable and supported the independence movement. Your diplomatic approach would have avoided the sovereignty violation — but at the cost of the speed and legal certainty Roosevelt preferred.</p>',
          },
        },
        {
          conditions: [{ type: 'flag', key: 'canal_zone_generous', value: true }],
          outcome: {
            text: '<p><strong>Your canal zone terms were more generous than history</strong>. The actual Hay-Bunau-Varilla Treaty gave the U.S. perpetual sovereignty "as if" over the zone. Panamanian nationalists would spend decades fighting to recover control — culminating in a 1964 riot in which 21 Panamanians and 3 U.S. soldiers died, and ultimately in the 1977 Torrijos-Carter Treaties returning the canal.</p>',
          },
        },
      ],
      next: 'assessment',
    },

    // ─── ASSESSMENT (POST) ───────────────────────────────
    {
      id: 'assessment',
      type: 'assessment',
      title: 'Assessment: The Canal Question',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          prompt: 'Why did the Colombian senate reject the Hay-Herrán Treaty in 1903?',
          options: [
            'Colombia preferred to build its own canal without American involvement',
            'Colombian senators believed the compensation was inadequate and the terms undermined their sovereignty',
            'The United States withdrew the treaty before Colombia could vote on it',
            'Colombia had already signed a canal treaty with Britain',
          ],
          correctIndex: 1,
          explanation: 'Colombian senators objected to the $10 million payment (compared to the $40 million paid to the French canal company) and the sovereignty implications of a U.S.-controlled zone on Colombian territory. (KC-7.3.II.B)',
          apStandard: 'KC-7.3.II.B',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          prompt: 'How did the United States respond to the Colombian rejection of the Hay-Herrán Treaty?',
          options: [
            'It began construction on the Nicaragua canal instead',
            'It offered Colombia a larger payment and the treaty was eventually ratified',
            'It tacitly supported a Panamanian independence movement and recognized the new nation within 72 hours',
            'It submitted the dispute to international arbitration',
          ],
          correctIndex: 2,
          explanation: 'Roosevelt supported the Panamanian revolution diplomatically, with U.S. warships preventing Colombian troops from suppressing it. The U.S. recognized Panama within three days of independence. (KC-7.3.II.B)',
          apStandard: 'KC-7.3.II.B',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          prompt: 'What was controversial about the Hay-Bunau-Varilla Treaty?',
          options: [
            'It gave the canal to Britain to operate',
            'It was signed by a French citizen rather than a Panamanian leader, without Panamanian review',
            'It required the United States to pay Colombia an annual indemnity',
            'It limited U.S. military presence in the Canal Zone',
          ],
          correctIndex: 1,
          explanation: 'Philippe Bunau-Varilla, a French engineer and canal company representative, signed the treaty as Panama\'s minister to the U.S. — before the actual Panamanian delegation arrived in Washington. Panamanians had no input on terms that would govern their country for nearly a century. (KC-7.3.III.B)',
          apStandard: 'KC-7.3.III.B',
          skillTags: ['Argumentation'],
          difficulty: 2,
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          prompt: 'Which of the following best describes the relationship between the Panama Canal and the Roosevelt Corollary?',
          options: [
            'The Roosevelt Corollary was created to justify the canal\'s construction costs',
            'The canal\'s strategic importance reinforced Roosevelt\'s argument that the U.S. must police the Western Hemisphere to protect its interests',
            'The Roosevelt Corollary replaced the Monroe Doctrine after the canal opened',
            'The canal zone was established under the authority of the Roosevelt Corollary',
          ],
          correctIndex: 1,
          explanation: 'The canal\'s strategic and economic value heightened the perceived need to protect American investments and infrastructure in the region — a rationale that directly supported the Roosevelt Corollary\'s claim of U.S. policing rights. (KC-7.3.II.A)',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Comparison'],
          difficulty: 2,
        },
        {
          id: 'q5',
          type: 'short_answer',
          prompt: 'Analyze the following perspectives: (1) Roosevelt called Colombia\'s rejection "highway robbery." (2) Colombian senators argued they were defending their sovereignty. Using historical evidence, evaluate which perspective is better supported.',
          context: 'The Hay-Herrán Treaty offered Colombia $10 million and $250,000 annually for a 100-year lease on a canal zone. The New Panama Canal Company received $40 million for its assets. The U.S. had rejected Colombia\'s request for a larger payment.',
          explanation: 'Strong responses recognize that Colombia had genuine sovereignty concerns and that the compensation disparity (between what the U.S. paid the French company vs. Colombia) was a legitimate grievance. Roosevelt\'s framing as "robbery" served domestic political purposes. Both perspectives reflect real interests. APUSH standard: complexity of perspective.',
          apStandard: 'KC-7.3.III.B',
          skillTags: ['Argumentation'],
          difficulty: 2,
        },
      ],
    },
  ],
};

export default lesson02;
