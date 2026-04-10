/**
 * EMPIRE & INFLUENCE — Lesson 1: The Cuba Crisis (1895–1902)
 *
 * SAMPLE LESSON — Proves the engine works end-to-end.
 * Contains: intro, context, 3 decision points, consequences,
 * delayed effects, conditional content, outcome, assessment.
 */

const lesson01 = {
  id: 1,
  title: 'The Cuba Crisis',
  subtitle: '1895–1902',
  era: 'early-imperial',
  period: 'Period 7',
  apStandards: ['KC-7.3.II.A', 'KC-7.3.II.B', 'KC-7.3.III.B'],

  // ═══════════════════════════════════════════════════════
  // ADVISORS
  // ═══════════════════════════════════════════════════════

  advisors: {
    economic: {
      name: 'Industrial Investor',
      title: 'Economic Advisor',
      portrait: 'L01_PORT_01_EconomicAdvisor_IndustrialInvestor.png',
      initialTrust: 0,
      metricWeights: { influence: 0.6, stability: 0.3, economic: 2.0, support: 0.5 },
      bias: { primary: 'profit', secondary: 'expansion', aversion: 'regulation' },
      quotes: {
        decision_1: 'Our sugar investments in Cuba exceed $50 million. We cannot allow instability to destroy American enterprise. Whatever course we take, our financial interests must be protected.',
        decision_2: 'The spoils of war should include economic control. We have an opportunity to shape Cuba\'s economy in America\'s image — and profit handsomely in the process.',
        decision_3: 'Consider this: the Platt Amendment gives us the legal framework to protect our investments indefinitely. The terms are favorable. Lock them in.',
        reaction_approve: [
          'A sound investment in America\'s future.',
          'Now that is the kind of thinking that builds empires.',
          'Excellent. Our shareholders will be pleased.',
        ],
        reaction_disapprove: [
          'You\'re leaving money on the table. Our investors won\'t forget this.',
          'This course jeopardizes everything we\'ve built in Cuba.',
          'Idealism is expensive. I hope you can afford it.',
        ],
        default: 'Every decision has a price tag. Let\'s make sure we\'re on the right side of the ledger.',
      },
    },

    security: {
      name: 'Naval Strategy Officer',
      title: 'Security Advisor',
      portrait: 'L01_PORT_02_SecurityAdvisor_NavalStrategyOfficer.png',
      initialTrust: 0,
      metricWeights: { influence: 1.8, stability: 1.0, economic: 0.3, support: 0.8 },
      bias: { primary: 'control', secondary: 'dominance', aversion: 'withdrawal' },
      quotes: {
        decision_1: 'The destruction of the Maine cannot go unanswered. 266 American sailors are dead. Our naval forces are positioned and ready. This is the moment to establish American dominance in the Caribbean.',
        decision_2: 'We\'ve won the war in record time. Now we must consolidate. A military presence in Cuba ensures no European power — or local faction — can threaten our position.',
        decision_3: 'Guantánamo Bay is strategically vital. A permanent naval base there gives us control over the Caribbean approaches. This is non-negotiable for national security.',
        reaction_approve: [
          'Decisive action. That\'s what wins wars.',
          'Our forces stand ready to execute.',
          'The military option is always the most honest one.',
        ],
        reaction_disapprove: [
          'Weakness invites aggression. History will judge this harshly.',
          'We\'re surrendering strategic advantage for... what? Goodwill?',
          'I\'ve seen what happens when great powers hesitate. It\'s never pretty.',
        ],
        default: 'In matters of national security, hesitation is the enemy.',
      },
    },

    diplomatic: {
      name: 'Anti-Imperialist Senator',
      title: 'Diplomatic Advisor',
      portrait: 'L01_PORT_03_DiplomaticAdvisor_AntiImperialistSenator.png',
      initialTrust: 0,
      metricWeights: { influence: 0.4, stability: 1.8, economic: 0.3, support: 1.6 },
      bias: { primary: 'cooperation', secondary: 'stability', aversion: 'unilateral_force' },
      quotes: {
        decision_1: 'We fought our own revolution to be free of empire. Will we now become the very thing we rebelled against? There are paths to influence that don\'t require American boys dying in foreign harbors.',
        decision_2: 'We promised Cuba liberty — the Teller Amendment says so explicitly. If we occupy Cuba now, we betray the very principles that justified this war.',
        decision_3: 'The Platt Amendment is imperialism wearing a legal disguise. We can protect American interests without making Cuba a protectorate. True allies are more valuable than resentful subjects.',
        reaction_approve: [
          'There may be hope for the Republic yet.',
          'Restraint takes more courage than force. Well done.',
          'This is the America the world should see.',
        ],
        reaction_disapprove: [
          'We\'re planting the seeds of resentment that will grow for a century.',
          'Mark my words — this decision will haunt us.',
          'The people of Cuba will remember this. And not fondly.',
        ],
        default: 'The measure of a great nation is not what it can take, but what it chooses not to.',
      },
    },
  },

  // ═══════════════════════════════════════════════════════
  // TRIGGERED EVENTS — fire after decisions based on conditions
  // ═══════════════════════════════════════════════════════

  triggeredEvents: [
    {
      id: 'yellow_journalism_frenzy',
      trigger: (state) => state.decisions?.some(d => d.choiceId === 'd1_war'),
      title: 'Yellow Press Frenzy',
      desc: 'Hearst and Pulitzer seize on the war declaration — headlines scream with patriotic fervor.',
      effects: { stability: -3, support: -2 },
      asset: 'EVT_YellowJournalism.png',
    },
    {
      id: 'economic_panic',
      trigger: (state) => state.decisions?.some(d => d.choiceId === 'd1_economic'),
      title: 'Wall Street Reacts',
      desc: 'Markets stabilize around American naval presence, but critics warn of corporate entanglement.',
      effects: { economic: +3, support: -2 },
      asset: 'EVT_BusinessInterests.png',
    },
    {
      id: 'marine_incident',
      trigger: (state) => state.decisions?.some(d => d.choiceId === 'd2_occupy'),
      title: 'U.S. Marine Killed at Checkpoint',
      desc: 'Tensions escalate as violence spills into direct conflict during occupation.',
      effects: { stability: -5, support: -3 },
      asset: 'EVT_MilitaryIntervention.png',
    },
    {
      id: 'european_criticism',
      trigger: (state) => (state.metrics?.support ?? 50) < 35,
      title: 'European Powers Condemn U.S.',
      desc: 'Britain and France issue joint statement questioning American motives in the Caribbean.',
      effects: { support: -4 },
      asset: 'EVT_DiplomaticMission.png',
    },
    {
      id: 'sugar_baron_pressure',
      trigger: (state) => (state.metrics?.economic ?? 50) >= 65,
      title: 'Sugar Barons Demand More Access',
      desc: 'American corporations lobby Washington for exclusive Cuban trade concessions.',
      effects: { economic: +3, stability: -2 },
      asset: 'EVT_BusinessInterests.png',
    },
    {
      id: 'cuban_protest',
      trigger: (state) => state.decisions?.some(d => d.choiceId === 'd2_occupy') && state.decisions?.some(d => d.choiceId === 'd3_expand'),
      title: 'Cuban Nationalist Uprising',
      desc: 'Occupation combined with expansionist rhetoric provokes mass protests across the island.',
      effects: { stability: -8, support: -5 },
      asset: 'EVT_NativeUnrest.png',
    },
    {
      id: 'latin_backlash',
      trigger: (state) => (state.metrics?.support ?? 50) < 25,
      title: 'Latin American Backlash',
      desc: 'Regional governments condemn U.S. interference and recall ambassadors.',
      effects: { stability: -4 },
      asset: 'EVT_PoliticalCrisis.png',
    },
  ],

  // ═══════════════════════════════════════════════════════
  // SCREENS
  // ═══════════════════════════════════════════════════════

  screens: [
    // ─── INTRO ──────────────────────────────────────────
    {
      id: 'intro',
      type: 'intro',
      title: 'The Cuba Crisis',
      subtitle: '1895–1902',
      text: '<p>The year is 1898. Cuba is fighting for independence from Spain. American sugar investments on the island exceed $50 million, and the newspapers are howling for war.</p><p>As a senior policy advisor to the President, you will shape America\'s response to the crisis — and in doing so, set the course of U.S. foreign policy for the next century.</p><p>Three advisors will guide you. Each has their own agenda. Choose wisely.</p>',
      map: {
        asset: 'L01_MAP_01_Cuba_SugarEconomy_NavalBlockade.png',
        caption: 'Cuba and the Caribbean, 1898 — U.S. sugar investments and naval positions',
      },
      next: 'pre_assessment',
    },

    // ─── PRE-ASSESSMENT (baseline knowledge check) ─────
    {
      id: 'pre_assessment',
      type: 'assessment',
      title: 'Pre-Lesson Knowledge Check',
      isPreAssessment: true,
      questions: [
        {
          id: 'pre_q1',
          type: 'multiple_choice',
          prompt: 'Which country controlled Cuba before 1898?',
          options: [
            'France',
            'Spain',
            'Great Britain',
            'Portugal',
          ],
          correctIndex: 1,
          explanation: 'Cuba was a Spanish colony for nearly 400 years until the Spanish-American War of 1898.',
          skillTags: ['Content Knowledge'],
          difficulty: 1,
        },
        {
          id: 'pre_q2',
          type: 'multiple_choice',
          prompt: 'What was "yellow journalism"?',
          options: [
            'Newspapers printed on low-quality yellow paper',
            'Sensational, exaggerated newspaper reporting designed to sell papers',
            'Government-controlled propaganda newspapers',
            'Journalism practiced by immigrant reporters',
          ],
          correctIndex: 1,
          explanation: 'Yellow journalism refers to the sensational and often exaggerated reporting by publishers like Hearst and Pulitzer, used to inflame public opinion.',
          skillTags: ['Contextualization'],
          difficulty: 1,
        },
        {
          id: 'pre_q3',
          type: 'multiple_choice',
          prompt: 'What does the term "imperialism" most closely mean?',
          options: [
            'Trading goods with other nations',
            'A policy of extending a country\'s power and influence through colonization or military force',
            'Diplomatic negotiations between equal nations',
            'The industrial development of a nation\'s economy',
          ],
          correctIndex: 1,
          explanation: 'Imperialism is a policy where a nation extends its power over other territories through military force, economic control, or political influence.',
          skillTags: ['Content Knowledge'],
          difficulty: 1,
        },
      ],
      next: 'context_1',
    },

    // ─── CONTEXT ────────────────────────────────────────
    {
      id: 'context_1',
      type: 'context',
      title: 'Rising Tensions',
      text: '<p>Spain has ruled Cuba for nearly four centuries. Cuban rebels have been fighting for independence since 1895, but Spain\'s brutal reconcentration camps have drawn international condemnation.</p><p>In the United States, yellow journalism — sensational newspaper coverage by publishers like William Randolph Hearst and Joseph Pulitzer — has inflamed public opinion against Spain.</p><p>On February 15, 1898, the USS Maine explodes in Havana Harbor, killing 266 American sailors. The cause is unclear, but the newspapers have already decided: "Remember the Maine!"</p>',
      newspaper: {
        asset: 'L01_NEWS_01_ReconcentrationCamps_NYHerald.png',
        headline: 'REMEMBER THE MAINE!',
        perspective: 'U.S. Interventionist Press',
        bodyText: 'The destruction of the battleship Maine in Havana Harbor has shocked the nation. 266 American sailors lost. Spain must answer for this outrage.',
        trigger: 'immediate',
      },
      advisorDialogue: {
        economic: 'Our sugar investments are at risk. Instability in Cuba threatens millions in American capital.',
        security: 'The Maine demands a response. Our naval honor is at stake.',
        diplomatic: 'Before we rush to judgment, let us remember — the cause of the explosion is still undetermined.',
      },
      advisorPrimary: 'security',
      next: 'decision_1',
    },

    // ─── DECISION 1: Response to the Maine ──────────────
    {
      id: 'decision_1',
      type: 'decision',
      title: 'The Response',
      prompt: 'The USS Maine has exploded in Havana Harbor. 266 American sailors are dead. Congress is demanding action. What course do you advise the President to take?',
      text: 'Your advisors are divided. The nation watches.',

      choices: [
        {
          id: 'd1_war',
          label: 'Declare War on Spain',
          description: 'Rally Congress and the public behind military action. Send the Navy to liberate Cuba — and establish American power in the Caribbean.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['unilateral_force', 'military'],
          effects: { influence: 15, stability: -12, economic: 5, support: 10 },
          factionEffects: { localPopulations: -5, usGovernment: 10, corporations: 5, internationalActors: -10 },
          flags: { chose_war_l1: true, aggressive_start: true },
          advisorReactions: {
            economic: { trustDelta: 1, dialogue: 'War will disrupt trade in the short term, but the long-term opportunities are... considerable.' },
            security: { trustDelta: 2, dialogue: 'Now we\'re talking. The fleet is ready. Cuba will be free — and America will be dominant.' },
            diplomatic: { trustDelta: -2, dialogue: 'God help us. We\'ve just started down a road there\'s no coming back from.' },
          },
          consequenceText: 'Congress votes overwhelmingly for war. The Teller Amendment passes alongside it — a promise that the United States will not annex Cuba. American forces mobilize rapidly.',
          next: 'consequence_1_war',
          delayedConsequences: [
            {
              id: 'dc_war_reputation',
              trigger: 'screen',
              triggerScreenId: 'decision_2',
              narrative: 'News of the rapid American victory spreads worldwide. European powers take notice of this new military force.',
              effects: { influence: 5, support: 5 },
            },
          ],
        },
        {
          id: 'd1_diplomacy',
          label: 'Pursue Diplomatic Channels',
          description: 'Demand Spain grant Cuba autonomy through international negotiation. Avoid war while protecting American interests through pressure.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'multilateral'],
          effects: { influence: -5, stability: 10, economic: -3, support: -8 },
          factionEffects: { localPopulations: 5, usGovernment: -5, corporations: -5, internationalActors: 15 },
          flags: { chose_diplomacy_l1: true },
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'Diplomacy takes time we may not have. Our investments bleed while diplomats talk.' },
            security: { trustDelta: -2, dialogue: 'Diplomacy? After the Maine? The world will see us as weak.' },
            diplomatic: { trustDelta: 2, dialogue: 'Courage comes in many forms. This is the harder path, but the right one.' },
          },
          consequenceText: 'The United States enters negotiations with Spain, demanding Cuban autonomy. Public opinion is divided — many see this as weakness, while others praise American restraint.',
          next: 'consequence_1_diplomacy',
          delayedConsequences: [
            {
              id: 'dc_diplomacy_trust',
              trigger: 'screen',
              triggerScreenId: 'decision_2',
              narrative: 'Your diplomatic approach has earned grudging respect from international observers — but hawkish newspapers continue to mock the administration.',
              effects: { stability: 5, support: -3 },
              factionEffects: { internationalActors: 5 },
            },
          ],
        },
        {
          id: 'd1_economic',
          label: 'Protect Economic Interests Only',
          description: 'Deploy naval vessels to protect American sugar plantations and shipping routes, but avoid broader military commitment.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          tags: ['profit', 'limited_engagement'],
          effects: { influence: 3, stability: 2, economic: 12, support: -5 },
          factionEffects: { localPopulations: -10, usGovernment: -3, corporations: 15, internationalActors: 0 },
          flags: { chose_economic_l1: true },
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Practical and profitable. Protect what matters, avoid what doesn\'t.' },
            security: { trustDelta: -1, dialogue: 'A half-measure. We protect sugar while ignoring our dead sailors?' },
            diplomatic: { trustDelta: -1, dialogue: 'Transparent self-interest. The Cubans will see through this in an instant.' },
          },
          consequenceText: 'The U.S. deploys naval assets to protect American commercial interests in Cuba. The public is confused — are we intervening or aren\'t we? Cubans view American motives with suspicion.',
          next: 'consequence_1_economic',
        },
      ],
    },

    // ─── CONSEQUENCES FOR DECISION 1 ────────────────────
    {
      id: 'consequence_1_war',
      type: 'consequence',
      title: 'The Splendid Little War',
      text: '<p>The Spanish-American War is short and decisive. In just 113 days, American forces — aided by Cuban rebels — defeat Spain. Santiago falls. The Spanish fleet is destroyed.</p><p>The Treaty of Paris gives the United States control of Cuba, Puerto Rico, Guam, and the Philippines. America is now an imperial power.</p><p>But the Teller Amendment promised Cuban independence. How will America square that promise with the reality of occupation?</p>',
      map: {
        asset: 'L01_MAP_01_Cuba_SugarEconomy_NavalBlockade.png',
        caption: 'American military operations in Cuba, 1898',
      },
      newspaper: {
        asset: 'L01_NEWS_04_YankisInvadenNuestraIsla_LaVozDeCuba.png',
        headline: '¡Yankis Invaden Nuestra Isla!',
        source: 'La Voz de Cuba',
        perspective: 'Cuban oppositional',
        trigger: 'immediate',
      },
      next: 'context_2',
    },

    {
      id: 'consequence_1_diplomacy',
      type: 'consequence',
      title: 'A Fragile Peace',
      text: '<p>Negotiations with Spain proceed slowly. Madrid agrees to limited Cuban autonomy, but rebel leaders reject the terms as insufficient. Fighting continues.</p><p>American newspapers attack the administration for weakness. "While diplomats dine, sailors rot in Havana Harbor," writes Hearst.</p><p>Spain eventually concedes under pressure, granting Cuban self-governance — but American influence in the region remains limited compared to what a military victory might have achieved.</p>',
      conditionalContent: [
        {
          conditions: [{ type: 'meter', meter: 'support', operator: '<', value: 40 }],
          outcome: {
            text: '<p>Negotiations with Spain drag on for months. Domestic support for your approach is crumbling. Hearst\'s newspapers run daily editorials calling the administration cowardly.</p><p>Eventually, a compromise is reached — but it satisfies no one. Cuba gains limited autonomy. America gains nothing tangible. Your critics smell blood.</p>',
          },
        },
      ],
      next: 'context_2',
    },

    {
      id: 'consequence_1_economic',
      type: 'consequence',
      title: 'The Business of Empire',
      text: '<p>American warships patrol the waters around Cuba, protecting sugar shipments and American property. But the broader conflict continues.</p><p>Cuban rebels view the American "protection" as self-serving. Spain protests the naval presence. Congress demands a clearer policy.</p><p>Your economic-first approach has preserved American investments — but at the cost of clarity and moral authority.</p>',
      next: 'context_2',
    },

    // ─── CONTEXT 2 ──────────────────────────────────────
    {
      id: 'context_2',
      type: 'context',
      title: 'The Aftermath',
      text: '<p>The fighting is over, one way or another. Cuba is free from Spain — but the question of its relationship with the United States remains unresolved.</p><p>American troops occupy parts of the island. Cuban rebels, who fought alongside U.S. forces, expect full independence. Business interests expect continued access to sugar profits.</p><p>Your advisors have strong opinions about what comes next.</p>',
      advisorDialogue: {
        economic: 'The sugar market is ours if we play this right. Cuba needs American capital to rebuild.',
        security: 'We need a permanent military presence. Guantánamo Bay is the key to Caribbean security.',
        diplomatic: 'We promised independence. The Teller Amendment isn\'t a suggestion — it\'s law.',
      },
      advisorPrimary: 'diplomatic',
      next: 'decision_2',
    },

    // ─── DECISION 2: Post-War Cuba ──────────────────────
    {
      id: 'decision_2',
      type: 'decision',
      title: 'Shaping Post-War Cuba',
      prompt: 'The war is over. Cuba must rebuild. How should the United States structure its relationship with the newly independent nation?',

      choices: [
        {
          id: 'd2_occupy',
          label: 'Maintain Military Occupation',
          description: 'Keep American troops in Cuba to maintain order, rebuild infrastructure, and protect U.S. interests. Set conditions before granting independence.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['control', 'unilateral_force'],
          effects: { influence: 12, stability: -8, economic: 8, support: -5 },
          factionEffects: { localPopulations: -15, usGovernment: 8, corporations: 10, internationalActors: -8 },
          flags: { chose_occupation_l1: true },
          advisorReactions: {
            economic: { trustDelta: 1, dialogue: 'Occupation means stability, and stability means profits. I can work with this.' },
            security: { trustDelta: 2, dialogue: 'Exactly right. We control the situation until we\'re confident in the outcome.' },
            diplomatic: { trustDelta: -2, dialogue: 'This is occupation, not liberation. We\'ve become what we said we were fighting.' },
          },
          consequenceText: 'American military government takes control of Cuba. Infrastructure improves, but Cuban resentment grows. The Teller Amendment\'s promise of independence feels increasingly hollow.',
          next: 'consequence_2',
        },
        {
          id: 'd2_platt',
          label: 'Grant Limited Independence (Platt Amendment)',
          description: 'Allow Cuban self-governance, but with conditions: the U.S. retains the right to intervene, lease naval bases, and approve foreign treaties.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          tags: ['profit', 'limited_engagement'],
          effects: { influence: 8, stability: 3, economic: 10, support: 0 },
          factionEffects: { localPopulations: -8, usGovernment: 5, corporations: 12, internationalActors: -5 },
          flags: { platt_amendment: true },
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Brilliant. Legal authority to protect our investments, wrapped in the language of self-determination. The shareholders will love this.' },
            security: { trustDelta: 1, dialogue: 'The naval base provision is acceptable. We keep Guantánamo. That\'s what matters.' },
            diplomatic: { trustDelta: -1, dialogue: 'Independence with conditions isn\'t independence. But... it could have been worse.' },
          },
          consequenceText: 'The Platt Amendment is imposed on Cuba\'s new constitution. Cuba governs itself — on paper. In practice, the United States holds the strings. It\'s a compromise that pleases investors and satisfies hawks, but plants seeds of deep resentment.',
          next: 'consequence_2',
          newspaper: {
            asset: 'L01_NEWS_02_USSMaineExplodes_EveningTimes.png',
            headline: 'Cuba Gets "Independence" — With Conditions',
            perspective: 'Mixed domestic reaction',
            bodyText: 'The Platt Amendment grants Cuba formal independence while reserving American intervention rights. Cuban leaders reluctantly accept.',
          },
        },
        {
          id: 'd2_full_independence',
          label: 'Grant Full Independence',
          description: 'Honor the Teller Amendment completely. Withdraw American forces and let Cuba chart its own course.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          tags: ['cooperation', 'withdrawal'],
          effects: { influence: -10, stability: 8, economic: -8, support: 8 },
          factionEffects: { localPopulations: 20, usGovernment: -8, corporations: -15, internationalActors: 12 },
          flags: { full_independence_l1: true },
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'You\'re handing away $50 million in investments on principle alone. History will not be kind to this decision.' },
            security: { trustDelta: -2, dialogue: 'We\'re abandoning a strategic position we won with American blood. This is a catastrophic error.' },
            diplomatic: { trustDelta: 2, dialogue: 'This is what America should be. A nation that keeps its promises. The world is watching, and today they see something worth admiring.' },
          },
          consequenceText: 'American forces withdraw from Cuba. The island celebrates its hard-won independence. But powerful interests in Washington and on Wall Street begin planning their next move. Freedom, they argue, is bad for business.',
          next: 'consequence_2',
          delayedConsequences: [
            {
              id: 'dc_full_independence_blowback',
              trigger: 'next_lesson',
              targetLesson: 2,
              narrative: 'Your decision to grant Cuba full independence has weakened American leverage in the Caribbean. Other nations in the region take note — the U.S. may not be the dominant force everyone assumed.',
              effects: { influence: -5 },
              flags: { cuba_full_independence_legacy: true },
            },
          ],
        },
        {
          id: 'd2_negotiate',
          label: 'Negotiate a Partnership Treaty',
          description: 'Work with Cuban leaders as equals to establish a mutual defense and trade agreement — no unilateral conditions.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          conditions: [{ type: 'flag', key: 'chose_diplomacy_l1', value: true }],
          lockMessage: 'This option requires a diplomatic approach in the previous decision.',
          tags: ['cooperation', 'multilateral'],
          effects: { influence: 2, stability: 12, economic: 3, support: 5 },
          factionEffects: { localPopulations: 15, usGovernment: -3, corporations: 0, internationalActors: 10 },
          flags: { partnership_treaty_l1: true },
          advisorReactions: {
            economic: { trustDelta: 0, dialogue: 'Interesting. Not what I\'d choose, but I can find opportunities here.' },
            security: { trustDelta: -1, dialogue: 'A partnership? With a nation we just helped free? We should be leading, not negotiating as equals.' },
            diplomatic: { trustDelta: 2, dialogue: 'This is exactly right. True partnerships outlast occupations.' },
          },
          consequenceText: 'The U.S. and Cuba sign a groundbreaking bilateral treaty — mutual defense, favorable trade terms, but no unilateral intervention rights. It\'s slower and less profitable than the alternatives, but it creates genuine goodwill.',
          next: 'consequence_2',
        },
      ],
    },

    // ─── CONSEQUENCE 2 ──────────────────────────────────
    {
      id: 'consequence_2',
      type: 'consequence',
      title: 'The New Order',
      text: '<p>Your decisions are shaping a new American relationship with Latin America. The precedent you set in Cuba will echo through decades of U.S. foreign policy.</p><p>But one more question remains before this chapter closes.</p>',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'platt_amendment', value: true }],
          outcome: {
            text: '<p>The Platt Amendment is now embedded in Cuban law. American businesses pour investment into the island, protected by the legal right to intervene at will. But Cuban nationalists are organizing against what they call "Yankee imperialism."</p><p>The precedent has been set. Other nations in the region are watching nervously.</p>',
          },
        },
        {
          conditions: [{ type: 'flag', key: 'chose_occupation_l1', value: true }],
          outcome: {
            text: '<p>Military occupation brings order but breeds resentment. American engineers build roads and hospitals — but American soldiers patrol the streets. Cubans begin to wonder: did they trade one master for another?</p>',
          },
        },
      ],
      next: 'decision_3',
    },

    // ─── DECISION 3: Legacy Question ────────────────────
    {
      id: 'decision_3',
      type: 'decision',
      title: 'Setting the Precedent',
      prompt: 'As you prepare your final report to the President, you must frame the Cuba experience for future policy. What lesson should America take from Cuba?',

      choices: [
        {
          id: 'd3_expand',
          label: '"Cuba Proves America\'s Destiny as a World Power"',
          description: 'Frame the intervention as proof that the United States has the right and responsibility to project power globally.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          effects: { influence: 10, stability: -8, economic: 5, support: 5 },
          factionEffects: { localPopulations: -10, usGovernment: 10, corporations: 8, internationalActors: -12 },
          flags: { legacy_expansionist: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 1, dialogue: 'Empire and profit walk hand in hand. I like where this is going.' },
            security: { trustDelta: 2, dialogue: 'This is what I\'ve been saying from the start. We are the dominant power in this hemisphere.' },
            diplomatic: { trustDelta: -2, dialogue: 'You\'re writing a blank check for future interventions. One day, the bill will come due.' },
          },
          consequenceText: 'Your report frames Cuba as the dawn of an American century. Hawks in Congress cite it to justify expanded military budgets and further territorial ambitions. The era of Big Stick diplomacy has begun.',
          next: 'outcome',
        },
        {
          id: 'd3_caution',
          label: '"Cuba Shows the Costs of Intervention"',
          description: 'Warn that military intervention, while sometimes necessary, carries deep costs and moral consequences.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          effects: { influence: -3, stability: 8, economic: -2, support: 8 },
          factionEffects: { localPopulations: 8, usGovernment: -5, corporations: -5, internationalActors: 10 },
          flags: { legacy_cautionary: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'Cautionary tales don\'t build empires — or portfolios.' },
            security: { trustDelta: -1, dialogue: 'Self-doubt is a luxury great powers cannot afford.' },
            diplomatic: { trustDelta: 2, dialogue: 'If even one future president reads this and hesitates before sending troops, it will have been worth it.' },
          },
          consequenceText: 'Your report acknowledges the success of the military campaign but warns of long-term consequences. Some in Washington call it prescient. Others call it weakness. History will take decades to decide.',
          next: 'outcome',
        },
        {
          id: 'd3_economic_model',
          label: '"Cuba Demonstrates the Power of Economic Influence"',
          description: 'Argue that American commercial interests are the most effective tool of foreign policy — more durable than armies, more persuasive than diplomats.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          effects: { influence: 5, stability: 3, economic: 10, support: 0 },
          factionEffects: { localPopulations: -5, usGovernment: 3, corporations: 12, internationalActors: -3 },
          flags: { legacy_economic: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Perfect. Let commerce be our cannon and trade agreements our treaties. The returns are far better.' },
            security: { trustDelta: 0, dialogue: 'Economic power has its uses. But it needs military power behind it to mean anything.' },
            diplomatic: { trustDelta: 0, dialogue: 'At least it\'s not explicitly militaristic. But economic control is still control.' },
          },
          consequenceText: 'Your report frames economic engagement as America\'s most powerful foreign policy tool. It will influence a generation of "dollar diplomacy" — where American banks and corporations become the vanguard of empire.',
          next: 'outcome',
        },
      ],
    },

    // ─── OUTCOME ────────────────────────────────────────
    {
      id: 'outcome',
      type: 'outcome',
      title: 'Lesson Complete: The Cuba Crisis',
      text: '<p>Your decisions have shaped America\'s first major imperial adventure. The Spanish-American War transformed the United States from a continental power into a global one.</p><p>The precedents you set — intervention or restraint, occupation or partnership, profit or principle — will echo through the next seven chapters of American foreign policy in Latin America.</p><p>Your advisors will remember your choices. Some will trust you more. Others, less. And the decisions you made here will create conditions that future lessons inherit.</p>',
      next: 'assessment',
    },

    // ─── ASSESSMENT ─────────────────────────────────────
    {
      id: 'assessment',
      type: 'assessment',
      title: 'Assessment: The Cuba Crisis',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          prompt: 'Which economic factor most strongly motivated U.S. interest in Cuba during the 1890s?',
          options: [
            'Gold mining operations in eastern Cuba',
            'American sugar plantation investments exceeding $50 million',
            'Tobacco export tariffs imposed by Spain',
            'Access to Cuban oil reserves',
          ],
          correctIndex: 1,
          explanation: 'By 1895, American investors had over $50 million in Cuban sugar plantations, making sugar the dominant economic driver of U.S. interest in Cuba. (KC-7.3.II.A)',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          prompt: 'What was the significance of the Teller Amendment?',
          options: [
            'It authorized the President to declare war on Spain',
            'It promised that the United States would not annex Cuba after the war',
            'It established the terms for Cuban independence',
            'It created the framework for the Platt Amendment',
          ],
          correctIndex: 1,
          explanation: 'The Teller Amendment (1898) stated that the U.S. would not exercise sovereignty over Cuba and would leave the island\'s governance to its people. It represented an anti-imperialist check on expansionist ambitions. (KC-7.3.III.B)',
          apStandard: 'KC-7.3.III.B',
          skillTags: ['Contextualization'],
          difficulty: 2,
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          prompt: 'How did yellow journalism contribute to the Spanish-American War?',
          options: [
            'It provided accurate, investigative reporting on conditions in Cuba',
            'It published classified military documents that forced Congress to act',
            'It used sensational and exaggerated reporting to inflame public opinion against Spain',
            'It advocated for diplomatic negotiations with Spain',
          ],
          correctIndex: 2,
          explanation: 'Publishers like Hearst and Pulitzer used sensational headlines and exaggerated stories about Spanish atrocities to drive public support for war. The explosion of the Maine was exploited regardless of the actual cause. (KC-7.3.II.B)',
          apStandard: 'KC-7.3.II.B',
          skillTags: ['Argumentation'],
          difficulty: 2,
        },
        {
          id: 'q4',
          type: 'short_answer',
          prompt: 'In 2-3 sentences, explain how the Platt Amendment contradicted the principles of the Teller Amendment. What does this reveal about competing interests in American foreign policy?',
          explanation: 'Strong answers should note that the Teller Amendment promised Cuban sovereignty while the Platt Amendment imposed conditions that limited it (intervention rights, lease of naval bases, treaty approval). This reveals tension between anti-imperialist principles and the economic/strategic interests that pushed for continued control.',
          apStandard: 'KC-7.3.III.B',
          skillTags: ['Comparison'],
          difficulty: 2,
        },
      ],
    },
  ],
};

export default lesson01;
