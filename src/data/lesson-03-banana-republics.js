/**
 * EMPIRE & INFLUENCE — Lesson 3: Banana Republics & Corporate Imperialism (1899–1934)
 *
 * Follows the Lesson 1 gold-standard template EXACTLY.
 * Extends with: pre-assessment, reflection, historical comparison.
 * Difficulty: deeper economic/political tension than L2 (4 decisions, richer branching).
 *
 * ASSETS (confirmed from Assets_Organized/L03_BananaRepublics/):
 *   Maps      : L03_MAP_01_UFCO_LandHoldings_Guatemala.png
 *               L03_MAP_02_UFCO_BananaStrikeRegions.png
 *   Newspapers: L03_NEWS_01_TurmoilInGuatemala_WeeklyJournal.png
 *               L03_NEWS_02_CoupInHonduras_DailyNewsReport.png
 *               L03_NEWS_03_YankisArruinanNuestraTierra_LaPrensaGuatemala.png  [oppositional]
 *   Portraits : L03_PORT_01_EconomicAdvisor_FruitCompanyExec.png
 *               L03_PORT_02_SecurityAdvisor_USMarineOfficer.png
 *               L03_PORT_03_DiplomaticAdvisor_LaborAndReformAdvocate.png
 *
 * CONTINUITY IN (flags from Lessons 1–2):
 *   chose_panama_route           → Economic advisor notes canal as precedent for corporate protection
 *   canal_zone_harsh             → Diplomatic advisor more guarded; stability starts –3
 *   canal_zone_generous          → Local populations faction starts +5
 *   legacy_expansionist          → Security advisor initial trust +1
 *   diplomatic_canal_path        → Diplomatic advisor initial trust +1
 *   cuba_full_independence_legacy → Diplomatic advisor references restraint precedent
 *
 * CONTINUITY OUT (flags for Lesson 4):
 *   backed_ufco                  → L4 economic advisor trust +1; Wall Street framing
 *   labor_reform_l3              → L4 diplomatic advisor references reform precedent
 *   marine_intervention_l3       → L4 security advisor notes regional precedent
 *   crushed_workers_l3           → L4 instability starts –5 (delayed consequence)
 *   reform_minded_l3             → L4 local populations start +5
 *   corporate_capture_l3         → L4 economic choices include dollar diplomacy
 */

const lesson03 = {
  id: 3,
  title: 'Banana Republics',
  subtitle: '1899–1934',
  era: 'early-imperial',
  period: 'Period 7',
  apStandards: ['KC-7.3.II.A', 'KC-7.3.II.B', 'KC-7.3.III.A', 'KC-7.3.III.B'],

  // ═══════════════════════════════════════════════════════
  // CONTINUITY — Applied by engine on load
  // ═══════════════════════════════════════════════════════

  continuityIn: {
    advisorTrustBonuses: [
      { ifFlag: 'legacy_expansionist',    advisor: 'security',   delta: 1 },
      { ifFlag: 'diplomatic_canal_path',  advisor: 'diplomatic', delta: 1 },
      { ifFlag: 'backed_ufco',            advisor: 'economic',   delta: 1 },
      { ifFlag: 'canal_zone_generous',    advisor: 'diplomatic', delta: 1 },
    ],
    metricAdjustments: [
      { ifFlag: 'canal_zone_harsh',      effects: { stability: -3 } },
      { ifFlag: 'canal_zone_generous',   effects: { stability: 5 } },
      { ifFlag: 'canal_zone_legacy_harsh', factionEffects: { localPopulations: -8 } },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // ADVISORS
  // ═══════════════════════════════════════════════════════

  advisors: {
    economic: {
      name: 'Fruit Company Executive',
      title: 'Economic Advisor',
      portrait: 'L03_PORT_01_EconomicAdvisor_FruitCompanyExec.png',
      initialTrust: 0,
      metricWeights: { influence: 0.5, stability: 0.3, economic: 2.0, support: 0.3 },
      bias: { primary: 'profit', secondary: 'control', aversion: 'labor_rights' },
      quotes: {
        decision_1: {
          default: 'The United Fruit Company employs 20,000 people across Central America, operates the only functional railroads in Guatemala and Honduras, and controls the port facilities that connect these economies to the world. When we ask for land concessions, we\'re asking for the ability to continue that investment.',
          trusted: 'Look — the Central American governments need us more than we need them. If we pull out, their export economy collapses within a year. The land concessions are a bargain for everyone involved.',
          cold: 'I\'ll give you the numbers: UFCO\'s banana exports generated $7 million in Guatemalan government revenues last year alone. That\'s 40% of their budget. The concessions aren\'t charity — they\'re the cost of doing business at scale.',
        },
        decision_2: 'Labor agitators are disrupting harvests worth $12 million annually. The workers have legitimate grievances about wages, yes — but organized labor will destroy the business model that employs them. Crush the strike. Quickly.',
        decision_3: 'A government that nationalizes UFCO\'s banana holdings is a government that\'s declared war on American investment across the region. We cannot allow that precedent to stand. Whatever it takes.',
        decision_4: 'Dollar diplomacy is the most efficient system ever devised. American banks loan money to Central American governments; American companies get trade concessions; everyone prospers — as long as no one rocks the boat.',
        reaction_approve: [
          'Now you\'re thinking like a businessman.',
          'The banana market waits for no one. Good call.',
          'Our shareholders will notice this. In a good way.',
        ],
        reaction_disapprove: [
          'Sentiment is expensive. I hope you have a plan for what comes next.',
          'We\'ve just told every labor agitator in the hemisphere that disruption pays.',
          'I\'m making a note of this decision for the board meeting.',
        ],
        default: 'Commerce doesn\'t sleep, and neither do I. There\'s always a profitable path forward — if you\'re willing to take it.',
      },
    },

    security: {
      name: 'U.S. Marine Officer',
      title: 'Security Advisor',
      portrait: 'L03_PORT_02_SecurityAdvisor_USMarineOfficer.png',
      initialTrust: 0,
      metricWeights: { influence: 2.0, stability: 0.8, economic: 0.5, support: 0.6 },
      bias: { primary: 'control', secondary: 'dominance', aversion: 'instability' },
      quotes: {
        decision_1: {
          default: 'The Marines have been in and out of Central America for twenty years. UFCO\'s infrastructure — the railroads, the ports, the telegraphs — is the backbone of our logistical network in the region. Protecting it is a national security interest, not just a corporate one.',
          trusted: 'I\'ll tell you what I tell the general: Central America is strategically quiet right now because American companies are running it. The moment that changes, we\'re looking at chaos — and then intervention anyway, but more expensive.',
          cold: 'The military position is simple: stable business operations mean stable governments, and stable governments mean no Marine deployments. Protect UFCO\'s concessions.',
        },
        decision_2: 'Strike suppression is a standard operation. We\'ve done it in Nicaragua, we\'ve done it in Honduras. Deploy a company of Marines to the banana zone, arrest the organizers, and the workers will return within a week.',
        decision_3: 'If the government of Guatemala nationalizes American property, the only credible response is regime change. We have the assets in place. A coup can be managed in 48 hours. I\'ve done harder things before breakfast.',
        decision_4: 'Marine deployments protect American interests. Dollar diplomacy is fine until a government decides to default or nationalize. Then you need boots on the ground. Always keep the boots ready.',
        reaction_approve: [
          'Decisive. The region respects strength.',
          'Marines will move within 24 hours if needed.',
          'Order maintained. Exactly what the situation required.',
        ],
        reaction_disapprove: [
          'You\'re creating a vacuum. Someone else will fill it.',
          'Every time we choose restraint, the next crisis is bigger.',
          'I hope you understand what you\'re handing the labor movement.',
        ],
        default: 'Stability is the product. Violence is sometimes the price. I\'m comfortable with that math.',
      },
    },

    diplomatic: {
      name: 'Labor & Reform Advocate',
      title: 'Diplomatic Advisor',
      portrait: 'L03_PORT_03_DiplomaticAdvisor_LaborAndReformAdvocate.png',
      initialTrust: 0,
      metricWeights: { influence: 0.5, stability: 2.0, economic: 0.3, support: 1.8 },
      bias: { primary: 'cooperation', secondary: 'labor_rights', aversion: 'corporate_capture' },
      quotes: {
        decision_1: {
          default: 'UFCO controls 42% of Guatemala\'s arable land. They pay no export tax. They use the government\'s railroad at private rates they set themselves. When they ask for more land concessions, they are asking to become the government. We should not allow that.',
          trusted: 'I\'m going to be direct: the United Fruit Company isn\'t a business operating in Guatemala. It is an extralegal government replacing Guatemala. If we keep granting concessions, we will eventually have to choose between UFCO and the Guatemalan people. We should choose the latter now, before the choice becomes violent.',
          cold: 'The policy question is straightforward: should a private corporation have more power than the elected government of a sovereign nation? If the answer is no, then we limit the concessions.',
        },
        decision_2: 'The banana workers are asking for three things: an eight-hour workday, a rest day each week, and payment in cash rather than company scrip. These are not radical demands. They are human ones. We have the moral authority to support them.',
        decision_3: 'If Guatemala nationalizes UFCO\'s unused land holdings — land that sits idle while rural families go hungry — we should support their right to do so under international law. Property rights do not supersede the right of people to eat.',
        decision_4: 'Dollar diplomacy is colonialism with better accounting. We loan money, extract concessions, and when governments default, we send the Marines. The result is the same as the Spanish empire — just with better infrastructure.',
        reaction_approve: [
          'I didn\'t expect that. Well done.',
          'This is the America that can actually lead.',
          'The workers will remember this. So will their children.',
        ],
        reaction_disapprove: [
          'We have just proved that American law protects corporations but not people.',
          'History has a long memory. And a poor memory for economic justifications.',
          'I understand the pressure you\'re under. I still think this is wrong.',
        ],
        default: 'Every empire in history told itself the same story: we\'re here for their benefit. The story never survives close examination.',
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
      subtitle: 'No pressure — answer based on existing knowledge.',
      questions: [
        {
          id: 'pq1',
          type: 'multiple_choice',
          prompt: 'The term "banana republic" originally referred to:',
          options: [
            'A country that grew bananas for export and was dominated by foreign corporations',
            'A democratic republic in Central America founded in the 1890s',
            'A U.S. policy of protecting fruit-growing regions',
            'A banana-based currency system used in Guatemala',
          ],
          correctIndex: 0,
          explanation: 'The term, coined by O. Henry in 1904, described small, unstable nations whose economies and governments were controlled by large American corporations, particularly United Fruit Company.',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Contextualization'],
          difficulty: 2,
        },
        {
          id: 'pq2',
          type: 'multiple_choice',
          prompt: 'What was "dollar diplomacy"?',
          options: [
            'A policy of using American currency to stabilize Latin American economies',
            'A strategy of using American financial investment to secure political influence without military force',
            'A tax on Latin American goods to protect American farmers',
            'The use of dollars to bribe foreign officials',
          ],
          correctIndex: 1,
          explanation: 'Dollar diplomacy, associated with President Taft, used American loans and business investment as tools to extend U.S. influence in Latin America and Asia.',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'pq3',
          type: 'multiple_choice',
          prompt: 'Which of the following best describes the economic relationship between the United Fruit Company and Central American governments in the early 1900s?',
          options: [
            'UFCO paid high taxes and wages, contributing fairly to local economies',
            'UFCO received massive land concessions and operated near-monopolies with few local benefits',
            'UFCO was jointly owned by American and Central American investors',
            'UFCO operated only in Colombia and was unrelated to Central America',
          ],
          correctIndex: 1,
          explanation: 'UFCO accumulated millions of acres of land, often held idle, while controlling railroads, ports, and communications — and paid minimal taxes. This created extreme economic dependence.',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Comparison'],
          difficulty: 2,
        },
      ],
      next: 'intro',
    },

    // ─── INTRO ──────────────────────────────────────────
    {
      id: 'intro',
      type: 'intro',
      title: 'Banana Republics',
      subtitle: '1899–1934',
      text: '<p>The year is 1910. The United Fruit Company controls more land in Guatemala than the Guatemalan government. It runs the only functioning railroad, the telegraph system, and the port at Puerto Barrios. In Honduras, it is the largest landowner, employer, and creditor.</p><p>The term "banana republic" didn\'t exist yet — but the reality it would describe was already taking shape. American corporations weren\'t just operating in Central America; in many ways, they were replacing the state.</p><p>You are a senior policy advisor operating across the region. The banana economy is booming. Workers are organizing. Governments are watching American corporate power with a mixture of dependence and resentment. The decisions you make about corporations, labor, and intervention will define American foreign policy\'s moral character for a generation.</p>',
      map: {
        asset: 'L03_MAP_01_UFCO_LandHoldings_Guatemala.png',
        caption: 'UFCO land holdings in Guatemala, ca. 1910 — shaded areas show company-controlled territory',
        hotspots: [
          { x: 55, y: 40, label: 'Puerto Barrios', tooltip: 'UFCO-controlled port — sole Atlantic export hub for Guatemala.' },
          { x: 40, y: 55, label: 'Banana Zone', tooltip: 'Primary banana cultivation region. UFCO controls 42% of arable land.' },
          { x: 30, y: 35, label: 'Guatemala City', tooltip: 'Capital. Government heavily dependent on UFCO rail concessions.' },
        ],
      },
      advisorDialogue: {
        economic: 'UFCO\'s Central American operations generate $50 million annually. That\'s more than most of these governments collect in taxes. We are the economy, not just a part of it.',
        security: 'Stability in Central America = American business operating without disruption. My job is to make sure it stays that way.',
        diplomatic: 'We\'re watching a corporation replace a government in real time. Whether that troubles you or not should shape everything that follows.',
      },
      advisorPrimary: 'economic',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'chose_panama_route', value: true }],
          outcome: {
            text: '<p>The Panama Canal has just opened, and the strategic logic of American control over Central American infrastructure feels vindicated. The canal made the case for corporate partnership with the U.S. government. UFCO\'s railroad networks and port facilities complement the canal\'s commercial mission.</p><p>But as you review the maps of UFCO\'s landholdings, a question forms: where does legitimate business end and political control begin?</p>',
          },
        },
      ],
      next: 'context_1',
    },

    // ─── CONTEXT 1 ───────────────────────────────────────
    {
      id: 'context_1',
      type: 'context',
      title: 'The Fruit Empires',
      text: '<p>The United Fruit Company, founded in 1899 through a merger of several banana operations, has become the prototype of corporate imperialism. In Guatemala, it controls:</p><p>— 42% of all arable land (most held idle to prevent competition)<br>— The only Atlantic railroad<br>— Puerto Barrios, the only Atlantic port<br>— The telegraph and radio network</p><p>In Honduras, UFCO and competitor Standard Fruit together control the banana export economy and have secured "concession zones" — areas where local labor law and tax codes don\'t apply to the companies.</p><p>The Guatemalan and Honduran governments are structurally dependent: UFCO\'s railroad concessions are so favorable that the government cannot build competing rail lines. Export taxes are zero. Land taxes are minimal. In exchange, UFCO promises investment, employment, and infrastructure.</p><p>Now UFCO is requesting additional land concessions — another 250,000 acres — for "future expansion."</p>',
      advisorDialogue: {
        economic: 'Those 250,000 acres are primarily held as a strategic reserve. Yes, most will sit idle. That\'s how the business works — you need more land than you\'re using.',
        security: 'The larger UFCO\'s footprint, the more American infrastructure there is to protect. This is strategically favorable.',
        diplomatic: 'We\'re being asked to grant a private company more land than the country of Rhode Island. Ask yourself: who is the sovereign here?',
      },
      advisorPrimary: 'diplomatic',
      next: 'decision_1',
    },

    // ─── DECISION 1: UFCO Land Concessions ──────────────
    {
      id: 'decision_1',
      type: 'decision',
      title: 'The Concession Request',
      prompt: 'UFCO has formally requested an additional 250,000 acres of land concessions from the Guatemalan government — conditional on U.S. government diplomatic support. How do you advise the State Department to respond?',
      text: 'The Guatemalan government is asking Washington: does the U.S. officially endorse this concession request?',

      choices: [
        {
          id: 'd1_full_support',
          label: 'Fully Support UFCO — Endorse All Concession Requests',
          description: 'The State Department formally endorses UFCO\'s land requests. American diplomatic pressure ensures the Guatemalan government complies.',
          advisorAlignment: 'economic',
          riskLevel: 'high',
          tags: ['profit', 'corporate_capture'],
          effects: { influence: 8, stability: -10, economic: 15, support: 0 },
          factionEffects: { localPopulations: -18, usGovernment: 8, corporations: 20, internationalActors: -5 },
          flags: { backed_ufco: true, corporate_capture_l3: true },
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'This is exactly right. American corporations are America\'s best foreign policy. The State Department as corporate advocate — perfect.' },
            security: { trustDelta: 1, dialogue: 'More American economic footprint means more to defend — but also more to leverage. Favorable.' },
            diplomatic: { trustDelta: -2, dialogue: 'We have just officially merged the State Department with the boardroom. I hope the shareholders are pleased, because the Guatemalan peasants certainly won\'t be.' },
          },
          consequenceText: 'The State Department backs UFCO. The Guatemalan government, dependent on U.S. diplomatic support, approves the concession. UFCO\'s landholdings increase to 55% of arable land. Rural Guatemalans who depended on those lands are displaced. In banana-zone villages, labor organizers begin meeting in secret.',
          next: 'consequence_1',
          delayedConsequences: [
            {
              id: 'dc_ufco_resentment',
              trigger: 'screen',
              triggerScreenId: 'decision_2',
              narrative: 'Peasant displacement from the expanded UFCO concessions has fed the labor movement. The banana zone strike is larger and more organized than it might otherwise have been.',
              effects: { stability: -5 },
              factionEffects: { localPopulations: -10 },
            },
          ],
        },
        {
          id: 'd1_partial_support',
          label: 'Conditional Support — Endorse Limited Concessions with Labor Provisions',
          description: 'Support UFCO\'s expansion, but require that any new concession agreement include minimum wage guarantees, some taxation, and basic worker rights in exchange for land grants.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          tags: ['profit', 'labor_rights', 'bilateral'],
          effects: { influence: 3, stability: 3, economic: 8, support: 5 },
          factionEffects: { localPopulations: 3, usGovernment: 3, corporations: 5, internationalActors: 5 },
          flags: { conditional_ufco_backing: true },
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'Labor provisions raise operating costs by 15%. That\'s not a concession — it\'s a tax. But I can live with it if it buys stability.' },
            security: { trustDelta: 0, dialogue: 'Conditions on concessions add complexity, but labor stability actually serves our security interests. Acceptable.' },
            diplomatic: { trustDelta: 1, dialogue: 'Imperfect, but better. Minimum standards attached to corporate expansion is at least an acknowledgment that workers are human. A start.' },
          },
          consequenceText: 'UFCO receives partial concessions with labor provisions attached. The company complies minimally — wages barely meet the stated floor, enforcement is weak. But the principle that American diplomatic support is conditional on worker treatment has been established.',
          next: 'consequence_1',
        },
        {
          id: 'd1_oppose',
          label: 'Oppose the Concession — Enforce Existing Land Limits',
          description: 'Decline to support UFCO\'s new concession request. Advise that existing holdings are sufficient and that further land concentration is contrary to regional stability.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'labor_rights', 'stability'],
          effects: { influence: -5, stability: 10, economic: -8, support: 12 },
          factionEffects: { localPopulations: 15, usGovernment: -8, corporations: -18, internationalActors: 10 },
          flags: { opposed_ufco: true, reform_minded_l3: true },
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'You\'ve just told the most important American employer in Central America that the U.S. government won\'t back its legitimate business requests. UFCO\'s board will be in the Secretary of State\'s office by morning.' },
            security: { trustDelta: -1, dialogue: 'Limiting UFCO\'s footprint reduces the strategic assets we have to work with. Problematic.' },
            diplomatic: { trustDelta: 2, dialogue: 'The Guatemalan government needed to hear that American support has limits. This is the most important thing we\'ve done in Central America in a decade.' },
          },
          consequenceText: 'The State Department declines to support the new concession. UFCO\'s board is furious. The Guatemalan government, freed from American corporate pressure, implements modest land reform. UFCO\'s profits dip — but regional stability improves, and local governments begin to trust American statements about sovereignty.',
          next: 'consequence_1',
          delayedConsequences: [
            {
              id: 'dc_reform_goodwill',
              trigger: 'next_lesson',
              targetLesson: 4,
              narrative: 'Limiting UFCO\'s concessions has created a rare positive signal in the region. Local governments are cautiously more cooperative with American policy when it doesn\'t come attached to corporate demands.',
              effects: { stability: 5 },
              factionEffects: { localPopulations: 8, internationalActors: 5 },
              flags: { reform_legacy_l3: true },
            },
          ],
        },
      ],
    },

    // ─── CONSEQUENCE 1 ──────────────────────────────────
    {
      id: 'consequence_1',
      type: 'consequence',
      title: 'The Banana Zones',
      text: '<p>Whatever the concession decision, UFCO\'s dominance in the region continues. The banana zones are a world unto themselves — American enclaves within sovereign nations, with their own labor camps, company stores, segregated dining halls, and private security forces.</p><p>Workers in the banana zones are paid in company scrip — tokens redeemable only at UFCO stores, at prices UFCO sets. An eight-hour workday is a dream. Sundays are work days. Organizing is prohibited.</p><p>In 1910, workers across UFCO\'s Guatemalan and Honduran operations begin a coordinated strike. It starts small — wages, scrip, Sundays. It spreads quickly.</p>',
      map: {
        asset: 'L03_MAP_02_UFCO_BananaStrikeRegions.png',
        caption: 'UFCO banana zone strike regions, 1910–1930 — shaded areas show active labor organizing',
        hotspots: [
          { x: 55, y: 50, label: 'Atlantic Coast Banana Zone', tooltip: 'Primary strike region. 15,000 workers affected.' },
          { x: 40, y: 40, label: 'Pacific Coast Operations', tooltip: 'Secondary strike. Workers demanding cash wages.' },
        ],
      },
      newspaper: {
        asset: 'L03_NEWS_01_TurmoilInGuatemala_WeeklyJournal.png',
        headline: 'TURMOIL IN GUATEMALA: Labor Unrest Spreads Across Banana Zones',
        perspective: 'American Business Press',
        bodyText: 'UFCO operations disrupted as workers walk off. Company estimates $2 million in daily losses. Calls on Washington for "stability measures."',
        trigger: 'immediate',
      },
      advisorDialogue: {
        economic: 'We\'re losing $2 million a day. UFCO needs a response — now. This is not about workers\' rights. This is about American investment.',
        security: 'My Marines have handled this before. Say the word.',
        diplomatic: 'Three demands: an eight-hour day, cash wages, one rest day per week. I\'ve seen factory workers in Pittsburgh win worse battles than this. These are not unreasonable people.',
      },
      advisorPrimary: 'economic',
      next: 'decision_2',
    },

    // ─── DECISION 2: Strike Response ────────────────────
    {
      id: 'decision_2',
      type: 'decision',
      title: 'The Strike',
      prompt: 'UFCO\'s banana operations are halted across Guatemala and Honduras. Company executives are demanding military intervention. Labor organizers say they\'ll settle for an 8-hour day and cash wages. What do you advise?',
      text: 'The State Department is receiving simultaneous requests from UFCO\'s board, the Guatemalan government, and labor advocates. Their proposed solutions are incompatible.',

      choices: [
        {
          id: 'd2_crush',
          label: 'Deploy Marines — Suppress the Strike',
          description: 'Send a company of Marines to the banana zones to restore order, arrest strike organizers, and allow UFCO to resume operations.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['unilateral_force', 'corporate_capture'],
          effects: { influence: 5, stability: -15, economic: 10, support: -10 },
          factionEffects: { localPopulations: -25, usGovernment: 5, corporations: 15, internationalActors: -8 },
          flags: { marine_intervention_l3: true, crushed_workers_l3: true },
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'Order restored. Operations resume. That\'s the result we needed. Whatever else happens, the market is satisfied.' },
            security: { trustDelta: 2, dialogue: 'Textbook operation. Strike broken in 72 hours, organizers in custody, workers back on the job. The message is clear across the region.' },
            diplomatic: { trustDelta: -2, dialogue: 'We just sent the U.S. military to arrest people asking for an eight-hour workday. I cannot frame this as anything other than what it is.' },
          },
          consequenceText: 'Marines move into the banana zones. The strike is broken in three days. Organizers are arrested; several are killed in confrontations with troops. Workers return to the same conditions. The short-term loss to UFCO is avoided. But the stories will travel — to Mexico City, to Buenos Aires, to working-class neighborhoods in New York.',
          next: 'consequence_2',
          delayedConsequences: [
            {
              id: 'dc_strike_suppression_legacy',
              trigger: 'next_lesson',
              targetLesson: 4,
              narrative: 'Memories of the banana zone massacre have not faded. Anti-American sentiment in Central America has hardened. Local governments are simultaneously more dependent on and more resentful of Washington.',
              effects: { stability: -5, support: -5 },
              factionEffects: { localPopulations: -12 },
              flags: { crushed_workers_legacy: true },
            },
          ],
        },
        {
          id: 'd2_negotiate',
          label: 'Pressure UFCO to Negotiate — Accept Modest Worker Demands',
          description: 'Decline to deploy the military. Instead, pressure UFCO to negotiate directly with strike leaders and accept an eight-hour day and cash wage payment.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          tags: ['cooperation', 'labor_rights'],
          effects: { influence: -3, stability: 8, economic: -5, support: 10 },
          factionEffects: { localPopulations: 18, usGovernment: -5, corporations: -12, internationalActors: 8 },
          flags: { labor_reform_l3: true, negotiated_strike: true },
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'Negotiating with labor organizers sets a precedent. Next year it\'s a 40-hour week, then profit sharing. Where does it end?' },
            security: { trustDelta: -1, dialogue: 'I understand the reasoning. I\'m just noting that "negotiate under pressure" doesn\'t always stay negotiated.' },
            diplomatic: { trustDelta: 2, dialogue: 'The workers asked for an eight-hour day and cash wages. We told a corporation to accept basic human decency. This is what American leadership should look like.' },
          },
          consequenceText: 'UFCO, under State Department pressure, accepts a settlement: an eight-hour workday, cash wages for 60% of workers (scrip for the remainder), and recognition of a workers\' committee. The strike ends in two weeks. UFCO\'s quarterly profits dip. Labor organizers across Central America take note — negotiation works.',
          next: 'consequence_2',
          delayedConsequences: [
            {
              id: 'dc_labor_reform_goodwill',
              trigger: 'next_lesson',
              targetLesson: 4,
              narrative: 'The banana zone settlement is celebrated in progressive circles across the hemisphere. The U.S. government has demonstrated, once, that it can intervene on behalf of workers rather than corporations.',
              effects: { stability: 5 },
              factionEffects: { localPopulations: 8 },
              flags: { labor_reform_legacy: true },
            },
          ],
        },
        {
          id: 'd2_non_intervention',
          label: 'Stay Out — Let UFCO and Workers Resolve It',
          description: 'Decline both Marine deployment and diplomatic pressure. This is an internal labor dispute between a private company and its workers. The U.S. government should not intervene.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'withdrawal'],
          effects: { influence: -8, stability: 3, economic: -3, support: 5 },
          factionEffects: { localPopulations: 8, usGovernment: -8, corporations: -8, internationalActors: 5 },
          flags: { non_intervention_strike: true },
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'UFCO employed twenty thousand people on the assumption that the U.S. government would back American business interests. You\'re breaking that agreement.' },
            security: { trustDelta: -1, dialogue: 'Non-intervention signals that the U.S. won\'t protect its corporate assets. That\'s a message other governments will hear and remember.' },
            diplomatic: { trustDelta: 1, dialogue: 'A private labor dispute should involve the government only if the government\'s interests are directly at stake. They\'re not. A principled non-intervention.' },
          },
          consequenceText: 'The U.S. stays out. UFCO negotiates reluctantly under the pressure of ongoing production losses. The strike ends after three weeks with modest gains. UFCO is furious. The workers are cautiously satisfied. The Guatemalan and Honduran governments learn something important: American military backing is not automatic.',
          next: 'consequence_2',
        },
      ],
    },

    // ─── CONSEQUENCE 2 ──────────────────────────────────
    {
      id: 'consequence_2',
      type: 'consequence',
      title: 'The Government Problem',
      text: '<p>The strike crisis has passed. But it has also revealed something: the Central American governments, watching the struggle between American corporate power and their own workers, are beginning to reassess their positions.</p><p>In Guatemala, a new reform-minded president — backed by peasant and labor coalitions — has won election on a platform that includes land reform. His first act: a proposal to levy an export tax on UFCO\'s banana shipments and reclaim idle UFCO-held land for redistribution.</p><p>UFCO\'s executives are at the State Department within 48 hours. They use a word the department has become very familiar with: "communism." The president, they argue, is either a communist or a communist dupe. He must be removed.</p>',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'crushed_workers_l3', value: true }],
          outcome: {
            text: '<p>The memories of the Marine intervention in the banana zones are still raw when the new Guatemalan president launches his reform program. His coalition is explicitly anti-American-corporate — the strike suppression gave the reform movement exactly the political fuel it needed. The UFCO threat calculation is now harder: this president has genuine popular support, and any intervention will be seen as a continuation of the banana zone crackdown.</p>',
          },
        },
        {
          conditions: [{ type: 'flag', key: 'labor_reform_l3', value: true }],
          outcome: {
            text: '<p>The banana zone settlement built exactly the kind of moderate labor coalition that the new Guatemalan president represents. His reform program is measured: export taxes, land redistribution of truly idle holdings, basic worker rights. Your previous decision to support negotiation has created this political space — a moderate alternative to the radical options on both ends of the spectrum.</p>',
          },
        },
      ],
      next: 'decision_3',
    },

    // ─── DECISION 3: Nationalization Threat / Coup ────────
    {
      id: 'decision_3',
      type: 'decision',
      title: 'The Reform Government',
      prompt: 'Guatemala\'s reform president wants to tax UFCO\'s exports and redistribute idle land. UFCO calls him a communist and demands his removal. The CIA says it can organize a coup within 30 days. What do you advise?',
      text: 'The stakes are highest they\'ve been. Your previous decisions have shaped the political landscape you\'re now navigating.',

      choices: [
        {
          id: 'd3_support_coup',
          label: 'Authorize Covert Coup — Remove the Reform Government',
          description: 'Support a CIA-coordinated coup to remove the Guatemalan president. Install a pro-American government. Protect UFCO\'s holdings.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          tags: ['covert', 'unilateral_force', 'corporate_capture'],
          effects: { influence: 10, stability: -15, economic: 12, support: -5 },
          factionEffects: { localPopulations: -25, usGovernment: 8, corporations: 18, internationalActors: -12 },
          flags: { backed_coup_l3: true, corporate_capture_l3: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'A reform government that taxes UFCO is a threat to every American investment in the hemisphere. Removing it is risk management, not aggression.' },
            security: { trustDelta: 2, dialogue: 'A communist-adjacent government, 90 miles from the Panama Canal. Covert action is the obvious play. Forty-eight hours and this problem disappears.' },
            diplomatic: { trustDelta: -2, dialogue: 'We are about to overthrow a democratically elected government because a fruit company told us to. I want that written down somewhere. I want someone to remember that this is what we did.' },
          },
          consequenceText: 'Operation PBFORTUNE (the prototype for the later PBSUCCESS) is authorized. The reform president is removed. A military government — friendly to UFCO and American interests — takes power. UFCO\'s land reform is cancelled. The CIA model of "corporate protection through regime change" is born, and will be deployed again in 1954, 1973, and beyond.',
          next: 'consequence_3',
          delayedConsequences: [
            {
              id: 'dc_coup_legacy',
              trigger: 'next_lesson',
              targetLesson: 4,
              narrative: 'Word of the covert coup has spread through diplomatic channels. Latin American governments now understand: reform that threatens American corporate interests invites removal. The lesson will produce more radical movements, not fewer.',
              effects: { stability: -8, influence: 5 },
              factionEffects: { localPopulations: -15, internationalActors: -8 },
              flags: { coup_legacy_l3: true },
            },
          ],
        },
        {
          id: 'd3_pressure_diplomatically',
          label: 'Apply Diplomatic Pressure — Negotiate Compensation for UFCO',
          description: 'Oppose the land redistribution diplomatically, but through legal channels: demand compensation for any seized land at market value and negotiate tax rates.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          tags: ['bilateral', 'profit'],
          effects: { influence: 3, stability: 3, economic: 5, support: 3 },
          factionEffects: { localPopulations: 3, usGovernment: 3, corporations: 3, internationalActors: 5 },
          flags: { diplomatic_pressure_l3: true },
          advisorReactions: {
            economic: { trustDelta: 0, dialogue: 'Compensation negotiations are slow and uncertain. But at least it\'s legal framework, not expropriation without recourse.' },
            security: { trustDelta: -1, dialogue: 'We\'re letting a reform government stay in power and negotiate with us as equals. That sets a precedent I don\'t love.' },
            diplomatic: { trustDelta: 1, dialogue: 'This is the correct approach: if UFCO has legitimate property rights, defend them through international law — not covert action.' },
          },
          consequenceText: 'The U.S. presses Guatemala to compensate UFCO for any redistributed land at fair market value. The reform president agrees — though UFCO disputes the valuation. A tense negotiation proceeds. The land reform is scaled back. No coup occurs. The government remains in power. The outcome is imperfect for everyone — which often means it\'s roughly just.',
          next: 'consequence_3',
        },
        {
          id: 'd3_recognize_sovereignty',
          label: 'Recognize Guatemalan Sovereignty — Accept Land Reform',
          description: 'Decline to intervene. Recognize Guatemala\'s right to regulate corporations operating on its territory. Accept that UFCO may face taxation and land redistribution.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'labor_rights'],
          effects: { influence: -10, stability: 12, economic: -12, support: 15 },
          factionEffects: { localPopulations: 22, usGovernment: -10, corporations: -20, internationalActors: 18 },
          flags: { recognized_sovereignty_l3: true, reform_minded_l3: true },
          ideologyWeight: 2,
          conditions: [{ type: 'flag', key: 'opposed_ufco', value: true }],
          lockMessage: 'This option is only available if you previously declined to fully support UFCO\'s concession requests.',
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'We\'ve just told every government in Latin America that nationalizing American companies is acceptable policy. This will cost us billions before it\'s over.' },
            security: { trustDelta: -2, dialogue: 'A reform government that knows America won\'t intervene is a government that will push further next year. This is a dangerous signal to send.' },
            diplomatic: { trustDelta: 2, dialogue: 'This is what respecting sovereignty actually looks like. Guatemala has the right to regulate companies operating on its soil. Today, that principle wins.' },
          },
          consequenceText: 'The U.S. declines to intervene. Guatemala\'s land reform proceeds. UFCO loses approximately 200,000 acres of idle land. The company\'s operations continue, reduced but functional. The Guatemalan government celebrates. Across the hemisphere, reform movements take note — American restraint is possible, if you build the right coalitions.',
          next: 'consequence_3',
          delayedConsequences: [
            {
              id: 'dc_sovereignty_goodwill',
              trigger: 'next_lesson',
              targetLesson: 4,
              narrative: 'Word that the U.S. respected Guatemalan sovereignty has created genuine goodwill. Local governments are more cooperative with American diplomatic initiatives — not because they\'re afraid, but because they see America as a fair actor.',
              effects: { stability: 8, influence: -3 },
              factionEffects: { localPopulations: 12, internationalActors: 10 },
              flags: { sovereignty_legacy_l3: true },
            },
          ],
        },
      ],
    },

    // ─── CONSEQUENCE 3 ──────────────────────────────────
    {
      id: 'consequence_3',
      type: 'consequence',
      title: 'The Corporate Republic',
      text: '<p>The banana zone crisis has revealed the central tension of American imperialism in this era: the line between protecting legitimate business interests and becoming the enforcement arm of private corporations is dangerously thin.</p><p>The term "banana republic" will enter the English language — O. Henry coined it in 1904 to describe exactly what you\'ve been navigating. A state where corporate power and governmental power are indistinguishable.</p><p>One more question remains before this chapter closes.</p>',
      newspaper: {
        asset: 'L03_NEWS_02_CoupInHonduras_DailyNewsReport.png',
        headline: 'COUP IN HONDURAS — Military Ousts Reform Government',
        perspective: 'American Business Press',
        bodyText: 'A military government has taken power in Honduras following the removal of the reform-aligned president. American fruit company officials report operations have "returned to normal." The new government has cancelled all proposed land reform measures.',
        trigger: 'with-consequence',
        showCondition: { flag: 'backed_coup_l3' },
      },
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'backed_coup_l3', value: true }],
          outcome: {
            text: '<p>The coup government is in place. UFCO\'s profits are protected. American corporate interests in the region are secure — for now. But in the banana zones, among the workers who watched their president removed at corporate request, something has shifted. The moderates who believed in American good faith have lost that argument.</p>',
          },
        },
        {
          conditions: [{ type: 'flag', key: 'labor_reform_l3', value: true }],
          outcome: {
            text: '<p>The labor settlement and the negotiated land reform have produced something unusual in this region: a functional moderate government, a partially satisfied labor movement, and an American corporate interest that is smaller but more sustainable. It\'s not a victory for anyone\'s ideological purity — but it might be a template for something that actually works.</p>',
          },
        },
      ],
      next: 'decision_4',
    },

    // ─── DECISION 4: Long-term Corporate Policy ──────────
    {
      id: 'decision_4',
      type: 'decision',
      title: 'Setting the Policy Framework',
      prompt: 'As you prepare your regional policy report, how should the U.S. frame its relationship between government power and American corporate interests in Central America?',
      text: 'This is a foundational question: should American foreign policy serve American business, or should it be independent of it?',

      choices: [
        {
          id: 'd4_dollar_diplomacy',
          label: '"American Business IS American Foreign Policy — Dollar Diplomacy"',
          description: 'Formally establish the doctrine that protecting American corporate investment is a core national security interest. American banks loan to governments; corporations get concessions; U.S. Marines back the system.',
          advisorAlignment: 'economic',
          riskLevel: 'high',
          tags: ['profit', 'corporate_capture', 'dominance'],
          effects: { influence: 10, stability: -10, economic: 18, support: -5 },
          factionEffects: { localPopulations: -15, usGovernment: 10, corporations: 20, internationalActors: -10 },
          flags: { corporate_capture_l3: true, dollar_diplomacy_doctrine: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: 2, dialogue: 'This is what I\'ve been arguing for since 1899. When American business thrives, America thrives. There\'s no daylight between them.' },
            security: { trustDelta: 1, dialogue: 'Clear doctrine makes our mission easier. Protect the investments, project the power. I can brief the Marines on that in thirty seconds.' },
            diplomatic: { trustDelta: -2, dialogue: 'Dollar diplomacy will produce exactly the anti-American movements it claims to prevent. We\'re building the next generation of our own enemies right now.' },
          },
          consequenceText: 'Dollar diplomacy becomes official doctrine under Presidents Taft and Wilson. American banks extend loans to Central American governments; UFCO and Standard Fruit continue expanding; Marine deployments become routine. The system is profitable, stable on paper, and building a slow-burning resentment that will detonate in the 1950s.',
          next: 'outcome',
        },
        {
          id: 'd4_regulated_engagement',
          label: '"Engagement With Standards — Protect Legitimate Business, Not Exploitation"',
          description: 'Draw a distinction: the U.S. will protect legitimate American business interests, but will not use diplomatic or military power to enforce exploitative concession arrangements or suppress labor organizing.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          tags: ['bilateral', 'labor_rights'],
          effects: { influence: 2, stability: 8, economic: 5, support: 8 },
          factionEffects: { localPopulations: 10, usGovernment: 0, corporations: -5, internationalActors: 8 },
          flags: { regulated_engagement_l3: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: -1, dialogue: 'A fine distinction in theory. In practice, every corporate attorney will spend the next decade arguing about what counts as "exploitation." But I can work within it.' },
            security: { trustDelta: 0, dialogue: 'Nuance in doctrine is harder to execute than clarity. But the instability dollar diplomacy is creating is also a security problem. I\'ll take it.' },
            diplomatic: { trustDelta: 2, dialogue: 'This is the framework that might actually hold. Business operates; government provides standards; Marines stay home. It\'s what respect looks like.' },
          },
          consequenceText: 'The State Department issues guidance distinguishing legitimate business protection from corporate-state capture. Implementation is inconsistent — some ambassadors enforce the distinction rigorously, others ignore it. But the principle exists, and occasionally, it matters.',
          next: 'outcome',
        },
        {
          id: 'd4_separation',
          label: '"Business and Government Are Separate — No State Enforcement of Private Interests"',
          description: 'Formally separate American diplomatic and military power from private corporate interests. American corporations operate in Central America at their own risk, under local law.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          tags: ['cooperation', 'labor_rights', 'multilateral'],
          effects: { influence: -8, stability: 15, economic: -10, support: 15 },
          factionEffects: { localPopulations: 20, usGovernment: -12, corporations: -20, internationalActors: 18 },
          flags: { separation_doctrine_l3: true, reform_minded_l3: true },
          ideologyWeight: 2,
          advisorReactions: {
            economic: { trustDelta: -2, dialogue: 'You\'ve just told American companies their country won\'t back them when foreign governments threaten their property. American investment in the region will collapse within five years.' },
            security: { trustDelta: -2, dialogue: 'Withdrawing the government\'s backing from American corporations creates a power vacuum. Something will fill it. Probably not something we like.' },
            diplomatic: { trustDelta: 2, dialogue: 'This is the only doctrine consistent with the principles America claims to stand for. Corporate interests are not national interests. Saying it out loud is already an act of courage in this administration.' },
          },
          consequenceText: 'The formal separation doctrine is announced. American corporations lobby furiously against it. Implementation is partial and contested. But in Guatemala and Honduras, local governments begin legislating on labor and land without checking with Washington first. The banana republic era, at least in this version of history, begins to end sooner.',
          next: 'outcome',
        },
      ],
    },

    // ─── OUTCOME ────────────────────────────────────────
    {
      id: 'outcome',
      type: 'outcome',
      title: 'Lesson Complete: Banana Republics',
      text: '<p>The corporate empire you helped manage — or constrain — defined the relationship between American power and Latin American sovereignty for generations.</p><p>The choices you made reveal the central moral tension of this era: the interests of American shareholders, American workers, Central American workers, and Central American governments were not the same. Choosing between them was not a technocratic exercise — it was a choice about whose lives matter and whose government counts as legitimate.</p><p>Your advisors carry forward the trust and ideology patterns you\'ve built. The decisions you\'ve made about labor, sovereignty, and corporate power will shape the available options in Lesson 4 — as Roosevelt, Taft, and Wilson struggle to define what "protecting American interests" really means.</p>',
      newspaper: {
        asset: 'L03_NEWS_03_YankisArruinanNuestraTierra_LaPrensaGuatemala.png',
        headline: 'Yankis Arruinan Nuestra Tierra — American Companies Destroying Our Land',
        perspective: 'Guatemalan Counter-Perspective (La Prensa Guatemala)',
        bodyText: 'La Prensa documents the displacement of thousands of Guatemalan families from their ancestral land by United Fruit Company concessions backed by American diplomatic pressure. "They call it investment. We call it theft."',
        trigger: 'with-consequence',
      },
      next: 'reflection',
    },

    // ─── REFLECTION ─────────────────────────────────────
    {
      id: 'reflection',
      type: 'reflection',
      title: 'Reflect: Corporate Imperialism',
      text: '<p>You\'ve been making decisions about the United Fruit Company — but consider the scale. By 1930, UFCO controlled more land in Central America than it could ever farm, owned the only railroads and ports, and had more political influence over several governments than those governments had over themselves.</p><p>The people most affected — the banana workers, the rural peasants displaced from company-held land, the indigenous communities whose land was taken — had no seat at the table where decisions about their lives were made.</p><p>What does it mean to call something "American foreign policy" when its primary beneficiary is a private company? Who should have the right to make decisions that affect entire populations?</p>',
      advisorDialogue: {
        economic: 'The banana economy lifted Central America\'s GDP by 40% in two decades. You can argue about distribution, but the development happened.',
        security: 'UFCO\'s infrastructure — the railroads, the ports, the telegraphs — was more functional than anything the local governments built. Stability has a value.',
        diplomatic: 'The banana zone workers lived in company barracks, shopped at company stores, and could be arrested by company security. We called their country independent.',
      },
      advisorPrimary: 'diplomatic',
      questions: [
        {
          id: 'rq1',
          type: 'short_answer',
          prompt: 'In your own words: What is the difference between "protecting American business interests" and "corporate imperialism"? Is that a meaningful distinction?',
          explanation: 'Strong responses should grapple with the distinction between protecting legitimate contracts vs. using state power to enforce exploitative arrangements. The key tension is between property rights and human rights, between investment and extraction.',
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
      text: '<p><strong>What actually happened:</strong> United Fruit Company grew to control millions of acres across Guatemala, Honduras, Costa Rica, and Panama. The U.S. government repeatedly used diplomatic and military pressure to protect UFCO\'s interests. Marine deployments to Central America occurred in 1903, 1907, 1909, 1910, 1912, 1919, 1920, 1924, 1925, and 1926.</p><p>When Guatemala\'s President Jacobo Árbenz launched a land reform in 1952 — distributing UFCO\'s idle land — the CIA organized a coup (Operation PBSUCCESS, 1954) that removed him and installed a military government. The coup was authorized by the Eisenhower administration largely due to UFCO lobbying. Árbenz\'s land reform was legal and compensated UFCO at its own declared tax value.</p><p>The 1954 coup inaugurated decades of military rule and civil war in Guatemala. An estimated 200,000 people died in the Guatemalan Civil War (1960–1996), a direct legacy of the 1954 intervention.</p>',
      conditionalContent: [
        {
          conditions: [{ type: 'flag', key: 'backed_coup_l3', value: true }],
          outcome: {
            text: '<p><strong>Your path aligned closely with history.</strong> The corporate-backed coup model you authorized was the path the U.S. actually took — amplified in the 1954 Operation PBSUCCESS, the 1973 coup in Chile, and throughout the Cold War. The pattern you enabled here became doctrine.</p>',
          },
        },
        {
          conditions: [{ type: 'flag', key: 'recognized_sovereignty_l3', value: true }],
          outcome: {
            text: '<p><strong>Your path diverged sharply from history.</strong> Recognizing Guatemalan sovereignty over UFCO land was the option the U.S. never took. In 1954, the Eisenhower administration chose corporate protection over sovereignty — authorizing the CIA coup despite knowing the land reform was both legal and compensated. Your choice represents what might have been.</p>',
          },
        },
      ],
      next: 'assessment',
    },

    // ─── ASSESSMENT (POST) ───────────────────────────────
    {
      id: 'assessment',
      type: 'assessment',
      title: 'Assessment: Banana Republics',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          prompt: 'What economic practice made Central American nations "banana republics"?',
          options: [
            'Local governments over-taxed American corporations, causing poverty',
            'American corporations received such sweeping concessions that they effectively replaced government functions in host countries',
            'Central American nations exported only bananas, making their economies unnecessarily simple',
            'American missionaries introduced banana cultivation as a development program',
          ],
          correctIndex: 1,
          explanation: 'UFCO and similar companies received land grants, tax exemptions, and railroad monopolies so extensive that they controlled more economic levers than the elected governments of the countries they operated in. (KC-7.3.II.A)',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          prompt: 'What was "dollar diplomacy" as practiced by Presidents Taft and Wilson?',
          options: [
            'Using American currency as a diplomatic gift to foreign governments',
            'Using American investment and loans to extend U.S. influence, backed by the threat of military intervention',
            'A policy of providing foreign aid to developing nations without conditions',
            'Establishing a single currency for all Western Hemisphere trade',
          ],
          correctIndex: 1,
          explanation: 'Dollar diplomacy used American financial power — loans, investment, corporate operations — as the primary tool of foreign policy, with military deployments as the backstop when financial leverage failed. (KC-7.3.II.A)',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'q3',
          type: 'multiple_choice',
          prompt: 'How did the United Fruit Company\'s use of company scrip represent economic control?',
          options: [
            'Company scrip was more valuable than local currency, benefiting workers',
            'Workers paid in scrip could only spend it at company stores, keeping their wages within the company\'s economic system',
            'Scrip was used to fund infrastructure projects that helped local communities',
            'Company scrip was a form of savings account that workers could cash out when they left',
          ],
          correctIndex: 1,
          explanation: 'Company scrip, redeemable only at company stores at company-set prices, created a closed economic loop that kept workers in a state of managed dependency — wages were effectively returned to the company. (KC-7.3.III.A)',
          apStandard: 'KC-7.3.III.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'q4',
          type: 'multi_select',
          prompt: 'Select ALL factors that explain why Central American governments granted such extensive concessions to UFCO. (Select all that apply)',
          options: [
            'UFCO built and controlled the only functional railroad and port infrastructure',
            'U.S. diplomatic and military pressure backed corporate requests',
            'Central American governments were legally required to accept all American corporate requests',
            'UFCO\'s banana exports provided a significant portion of government revenue',
            'Central American governments feared European colonization if they refused American corporate partnerships',
          ],
          correctIndices: [0, 1, 3],
          explanation: 'Three factors were primary: UFCO\'s control of essential infrastructure, U.S. government backing, and the fiscal dependence of small governments on export revenues. There was no legal requirement, and European colonization was already prevented by the Monroe Doctrine. (KC-7.3.II.A, KC-7.3.II.B)',
          apStandard: 'KC-7.3.II.A',
          skillTags: ['Causation'],
          difficulty: 2,
        },
        {
          id: 'q5',
          type: 'short_answer',
          prompt: 'Analyze how the banana republic system contradicted the stated values of American democracy. Use at least two specific examples from this lesson.',
          explanation: 'Strong answers should identify: (1) that American diplomatic/military power defended private exploitation rather than democratic rights; (2) that workers and local populations had no political voice in decisions affecting them; (3) that sovereignty was recognized for American corporations but not for Central American governments. Connect to APUSH KC-7.3.III.B: segments of the population questioned U.S. imperial policies.',
          apStandard: 'KC-7.3.III.B',
          skillTags: ['Argumentation'],
          difficulty: 2,
        },
      ],
    },
  ],
};

export default lesson03;
