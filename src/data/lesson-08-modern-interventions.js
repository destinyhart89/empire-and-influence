/**
 * EMPIRE & INFLUENCE — Lesson 8: Modern Interventions (1990–Present)
 *
 * THE FINAL SYNTHESIS LESSON
 *
 * Era: post-cold-war | Period 9
 * Students confront the long-term consequences of U.S. intervention in
 * Central America — connecting historical decisions to present-day realities.
 *
 * APUSH Standards: KC-9.3.I.A, KC-9.3.II.A, KC-9.6.I.A
 *
 * SPECIAL MECHANICS (unique to L8):
 *   1. FULL IDEOLOGY CLASSIFICATION — final ideology is revealed and named
 *   2. CUMULATIVE METRICS SUMMARY — all 8 lessons aggregated
 *   3. FOUR ENDINGS — determined by cumulative ideology + final decisions
 *   4. 8-LESSON CONTINUITY PAYOFFS — flags from all prior lessons surface
 *   5. LATIN AMERICAN PRESS ONLY — both newspapers are from El Faro (El Salvador)
 *      This is intentional: in L8, Latin American voices lead the narrative
 *
 * Available assets:
 *   Maps:       L08_MAP_01_Guatemala_MigrationAndHistoricalRoots.PNG (→ .png)
 *               L08_MAP_02_Honduras_ModernInstability.png
 *   Newspapers: L08_NEWS_01_InfluenciaSecreta_ElFaro.PNG (→ .png) — El Faro, El Salvador
 *               L08_NEWS_02_ElCostoHumano_ElFaro.png — El Faro, El Salvador
 *   Portraits:  L08_PORT_01_EconomicAdvisor_GlobalFinanceAdvisor.png
 *               L08_PORT_02_SecurityAdvisor_IntelligenceAnalyst.png
 *               L08_PORT_03_DiplomaticAdvisor_IntlRelationsAdvisor.png
 *
 * NOTE: Both L8 newspapers are from Latin American investigative press (El Faro).
 * This is intentional — L8 centers Latin American perspectives as primary sources.
 *
 * Continuity in from L7 (Panama 1989) + all prior lessons via global state:
 *   - interventionist_doctrine_l7 → synthesis framing shifts
 *   - human_rights_priority_l6 → diplomatic advisor references accountability record
 *   - prioritized_democracy → special ending unlocked
 *   - All accumulated flags and ideology scores produce differentiated outcomes
 *
 * ENDINGS:
 *   A — "The Reckoning" (high diplomatic, low interventionist)
 *   B — "The Strategist" (high economic, mixed ideology)
 *   C — "The Hawk" (high interventionist, low diplomatic)
 *   D — "The Mixed Record" (balanced or low scores)
 */

const lesson08 = {
  id: 8,
  title: 'Modern Interventions',
  subtitle: '1990–Present: The Long Consequences',
  era: 'post-cold-war',
  period: 'Period 9',
  apStandards: ['KC-9.3.I.A', 'KC-9.3.II.A', 'KC-9.6.I.A'],

  // ═══════════════════════════════════════════════════════
  // CONTINUITY IN (from L7 + accumulated 8-lesson arc)
  // ═══════════════════════════════════════════════════════

  continuityIn: {
    advisorTrustBonuses: [
      { ifFlag: 'human_rights_priority_l6', advisor: 'diplomatic', delta: 2 },
      { ifFlag: 'interventionist_doctrine_l7', advisor: 'security', delta: 1 },
      { ifFlag: 'multilateral_standard_l7', advisor: 'diplomatic', delta: 1 },
      { ifFlag: 'prioritized_democracy', advisor: 'diplomatic', delta: 1 },
    ],
    metricAdjustments: [
      // Cumulative interventionist legacy
      { ifFlag: 'interventionist_doctrine_l7', effects: { stability: -10, influence: +10 } },
      // Accumulated accountability record
      { ifFlag: 'demanded_accountability_l6', effects: { support: +8, stability: +5 } },
      // Panama delayed consequence
      { ifFlag: 'post_cold_war_precedent_set', effects: { influence: +5, stability: -5 } },
    ],
    narrativeContext: {
      ifFlag: 'interventionist_doctrine_l7',
      text: 'The doctrine of unilateral intervention you helped formalize has been invoked several times since Panama. The post–Cold War world has been shaped by that precedent.',
    },
  },

  // ═══════════════════════════════════════════════════════
  // ADVISORS (Post–Cold War framing — more nuanced roles)
  // ═══════════════════════════════════════════════════════

  advisors: {
    economic: {
      name: 'Global Finance Advisor',
      title: 'Economic Advisor',
      portrait: 'L08_PORT_01_EconomicAdvisor_GlobalFinanceAdvisor.png',
      initialTrust: 0,
      metricWeights: { influence: 0.6, stability: 0.8, economic: 1.8, support: 0.5 },
      bias: { primary: 'neoliberal_stability', secondary: 'trade_access', aversion: 'aid_dependency' },
      quotes: {
        decision_1: 'Central American migration is fundamentally an economic problem. The solution is investment — CAFTA, development aid, foreign direct investment. People migrate when there\'s no economic opportunity. Give them opportunity.',
        decision_2: 'The Washington Consensus reforms we promoted in the 1990s — privatization, deregulation, fiscal austerity — increased inequality without creating sustainable growth in some cases. An honest assessment requires acknowledging that.',
        decision_3: 'The Northern Triangle\'s gang problem is partly a U.S. export. We deported tens of thousands of gang members from Los Angeles to El Salvador and Guatemala in the 1990s — into societies with no infrastructure to absorb them. We made this problem.',
        decision_4: 'Economic development in the Northern Triangle requires long-term investment, not just security funding. A Marshall Plan for Central America would be costly — but cheaper than the domestic political costs of continued migration.',
        reaction_approve: [
          'Economically sound. This addresses root causes.',
          'The long-term investment case is compelling.',
          'Good. We\'re thinking about this properly.',
        ],
        reaction_disapprove: [
          'Short-term security thinking doesn\'t solve the underlying problem.',
          'We\'ll revisit this in five years when nothing has changed.',
          'The economics don\'t support this approach.',
        ],
        default: 'Migration is a symptom. Economic desperation is the disease.',
      },
    },

    security: {
      name: 'Intelligence Analyst',
      title: 'Security Advisor',
      portrait: 'L08_PORT_02_SecurityAdvisor_IntelligenceAnalyst.png',
      initialTrust: 0,
      metricWeights: { influence: 1.5, stability: 1.2, economic: 0.3, support: 0.6 },
      bias: { primary: 'threat_reduction', secondary: 'stability', aversion: 'open_border' },
      quotes: {
        decision_1: 'MS-13 and Barrio 18 are transnational criminal organizations operating from the Northern Triangle into the United States. The gangs extort 70% of businesses in some Honduran cities. This is a security crisis, not merely a development problem.',
        decision_2: 'The Central American gangs recruit from displaced youth — people who have no other economic options and no institutional protection. Security without economic development doesn\'t work. I recognize that.',
        decision_3: 'Our intelligence cooperation with Northern Triangle governments has produced mixed results. Some of our partners are themselves involved in criminal networks. CICIG — the UN anti-corruption commission in Guatemala — was more effective than most of what we\'ve tried bilaterally.',
        decision_4: 'Migration pressure at the U.S. border is partly a consequence of the security vacuum we helped create. The most cost-effective security investment is addressing that vacuum at source.',
        reaction_approve: [
          'This addresses the threat at its source.',
          'Intelligence-led policy. This is the right framework.',
          'Good. We\'re approaching this analytically.',
        ],
        reaction_disapprove: [
          'The security threat doesn\'t disappear because we\'re not addressing it.',
          'Short-term focus. The security consequences will compound.',
          'We\'ll regret not acting on this.',
        ],
        default: 'Security is not just about hard power. The instability we\'re managing has roots we helped plant.',
      },
    },

    diplomatic: {
      name: 'International Relations Advisor',
      title: 'Diplomatic Advisor',
      portrait: 'L08_PORT_03_DiplomaticAdvisor_IntlRelationsAdvisor.png',
      initialTrust: 0,
      metricWeights: { influence: 0.4, stability: 1.2, economic: 0.4, support: 2.0 },
      bias: { primary: 'accountability', secondary: 'multilateralism', aversion: 'impunity' },
      quotes: {
        decision_1: 'We need to say clearly what the historical record shows: the migration crisis we face today was shaped by decisions made in this building between 1954 and 1990. Operation PBSUCCESS. The Contra Wars. The El Salvador certifications. The institutional devastation created the conditions for gang violence and economic desperation.',
        decision_2: 'CICIG — the UN anti-corruption commission — was the most effective anti-corruption institution Central America had ever seen. We supported it under Obama and then abandoned it under Trump when it began investigating our allies. That was a catastrophic error.',
        decision_3: 'Asylum law exists precisely for people fleeing the conditions the U.S. helped create. An honest reading of our obligations includes that history.',
        decision_4: 'A genuine reckoning requires naming what happened: U.S. policy in Latin America, over a century, prioritized economic and strategic interests over the welfare and democratic aspirations of Central American people. Until we say that clearly, our development policy is just managing the symptoms of our own choices.',
        reaction_approve: [
          'Historical honesty is the foundation of effective policy.',
          'This is the kind of leadership that actually changes outcomes.',
          'Accountability, even uncomfortable accountability, is what distinguishes principled foreign policy.',
        ],
        reaction_disapprove: [
          'We\'ve chosen comfort over honesty. The consequences will continue.',
          'The region will remember which version of America showed up.',
          'I\'ve noted my disagreement in writing. Again.',
        ],
        default: 'The past isn\'t past. It\'s right here at the border.',
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
      title: 'Before We Begin: The Long Consequences',
      questions: [
        {
          id: 'pre_l8_q1',
          type: 'multiple_choice',
          prompt: 'The "Northern Triangle" refers to which three Central American countries most associated with current migration patterns to the United States?',
          options: [
            'Mexico, Panama, Costa Rica',
            'Guatemala, Honduras, El Salvador',
            'Nicaragua, Belize, Guatemala',
            'Honduras, Cuba, Dominican Republic',
          ],
          correctIndex: 1,
          skillTags: ['KC'],
          difficulty: 1,
          explanation: 'Guatemala, Honduras, and El Salvador form the "Northern Triangle" — the primary source countries for Central American migration to the United States. All three were directly affected by U.S. intervention during the Cold War era covered in previous lessons.',
        },
        {
          id: 'pre_l8_q2',
          type: 'multiple_choice',
          prompt: 'CAFTA-DR (2005) was a free trade agreement between the U.S. and Central American countries. Critics argued it harmed Central American economies by:',
          options: [
            'Preventing Central American countries from trading with each other',
            'Allowing subsidized U.S. agricultural products to undercut Central American farmers',
            'Requiring Central American countries to privatize their militaries',
            'Prohibiting labor unions in Central American manufacturing sectors',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'CAUS'],
          difficulty: 3,
          explanation: 'CAFTA-DR critics argued that U.S. agricultural subsidies allowed American products (especially corn) to flood Central American markets at prices below local production costs, devastating rural agricultural communities and contributing to displacement and migration.',
        },
        {
          id: 'pre_l8_q3',
          type: 'multiple_choice',
          prompt: 'The 2009 Honduran coup ousted President Manuel Zelaya. The Obama administration\'s response was significant because:',
          options: [
            'The U.S. immediately and unequivocally condemned the coup and cut off all aid',
            'The U.S. recognized the coup government, breaking from regional consensus that condemned it',
            'The U.S. led a military intervention to restore Zelaya to power',
            'The U.S. had no involvement or relationship with Honduras at the time',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'CCT'],
          difficulty: 3,
          explanation: 'The U.S. response to the 2009 Honduran coup was contested — the Obama administration ultimately recognized the coup government and continued military aid, breaking from OAS consensus. Hillary Clinton\'s memoir described efforts to prevent Zelaya\'s return. Critics argued this represented continuity with Cold War interventionist patterns.',
        },
      ],
      next: 'intro',
    },

    // ─── Introduction ────────────────────────────────────
    {
      id: 'intro',
      type: 'intro',
      title: 'Modern Interventions',
      subtitle: 'The Past Is Still Present',
      text: `<p>The year is 2019. You are a senior policy advisor on Central American affairs. The "border crisis" dominates domestic politics. Thousands of Central Americans — most from Guatemala, Honduras, and El Salvador — are seeking asylum at the U.S. southern border.</p>

<p>What most Americans don't know: this story begins with decisions made in this building — and its predecessors — over the previous century. Operation PBSUCCESS, 1954. The El Mozote certification, 1982. The Contra Wars. The gang deportations of the 1990s.</p>

<p>The people arriving at the border are, in many cases, the grandchildren of the communities those policies devastated. The migration is not random. It follows the historical map of U.S. intervention.</p>

<p>You must now decide how to respond — and whether to name the history that created this moment.</p>`,
      advisorDialogue: {
        economic: 'The economics are clear: people migrate from the Northern Triangle because there\'s no economic opportunity. The question is what created that vacuum.',
        security: 'MS-13 and Barrio 18 are real threats with roots in these countries. But our intelligence shows those roots run through our own deportation policies of the 1990s.',
        diplomatic: 'I\'ve read every cable from Guatemala City since 1954. The people at the border today are living in the consequences of our decisions. I think we should say that.',
      },
      advisorPrimary: 'diplomatic',
      next: 'context_northern_triangle',
    },

    // ─── Context: Northern Triangle ──────────────────────
    {
      id: 'context_northern_triangle',
      type: 'context',
      title: 'The Northern Triangle: Why People Flee',
      subtitle: 'State Department Comprehensive Assessment, 2019',
      text: `<p>Guatemala, Honduras, and El Salvador rank among the most dangerous countries in the world outside of active war zones. The causes are layered — and historical:</p>

<p><strong>Guatemala:</strong> The 1954 coup (Operation PBSUCCESS) triggered a 36-year civil war. 200,000 killed. Indigenous communities targeted. Institutional destruction. In 2015, a UN anti-corruption commission (CICIG) began dismantling criminal networks embedded in the state — before being shut down in 2019 under pressure from Guatemalan elites with U.S. connections.</p>

<p><strong>Honduras:</strong> U.S.-backed right-wing governments throughout the Cold War. The 2009 coup against President Zelaya — recognized by the U.S., condemned by the OAS — returned power to security forces with documented human rights records. Gang violence expanded into the institutional void. The U.S. designated Honduras as a major drug transit zone while continuing security assistance.</p>

<p><strong>El Salvador:</strong> 75,000 killed in the U.S.-supported civil war (1979–1992). The El Mozote massacre. In the 1990s, the U.S. deported thousands of Salvadoran gang members — including MS-13 members born and raised in Los Angeles — to a country with no infrastructure to manage them. The gangs metastasized.</p>`,
      map: {
        asset: 'L08_MAP_01_Guatemala_MigrationAndHistoricalRoots.png',
        caption: 'Northern Triangle — current migration routes overlaid with historical U.S. intervention sites (1954–2009)',
      },
      next: 'decision_1',
    },

    // ─── Decision 1: U.S. Responsibility ─────────────────
    {
      id: 'decision_1',
      type: 'decision',
      title: 'Decision Point 1 — Acknowledging Historical Responsibility',
      text: 'A Senate hearing on Central American migration has asked the State Department to provide historical context. The question before you: how does the U.S. publicly characterize its role in creating current conditions?',
      choices: [
        {
          id: 'd1_acknowledge_history',
          label: 'Formally acknowledge U.S. historical responsibility',
          description: 'Provide a full historical account: PBSUCCESS, Contra Wars, El Salvador certifications, gang deportations. Acknowledge that U.S. policy contributed to current instability. Frame aid as partial remediation.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: -8, stability: +15, economic: 0, support: +18 },
            flags: { acknowledged_history_l8: true },
            narrative: 'The State Department issues a formal historical statement. Congressional reactions are mixed — support from the Democratic caucus, outrage from Republicans who call it an "apology tour." Internationally, the statement is received as a significant diplomatic gesture.',
          },
          reactions: {
            economic: { trustDelta: 0, dialogue: 'Honest accounting. Long-term, this may enable more effective development policy.' },
            security: { trustDelta: -1, dialogue: 'This will be used by anti-American actors for a generation. I understand the impulse, but the strategic cost is real.' },
            diplomatic: { trustDelta: +3, dialogue: 'The truth — finally. This changes what\'s possible in the relationship.' },
          },
        },
        {
          id: 'd1_partial_acknowledgment',
          label: 'Acknowledge specific policy failures without broader admission',
          description: 'Acknowledge documented policy failures — the gang deportation programs, El Mozote — while framing current migration as primarily driven by present-day conditions, not historical ones.',
          advisorAlignment: 'economic',
          riskLevel: 'low',
          immediate: {
            effects: { influence: -2, stability: +5, economic: 0, support: +5 },
            flags: { partial_acknowledgment_l8: true },
            narrative: 'A calibrated response: specific failures named, broader pattern not acknowledged. Human rights organizations call it insufficient. Domestic political coverage is manageable.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Achievable and defensible. We acknowledge what we can\'t credibly deny.' },
            security: { trustDelta: 0, dialogue: 'Workable. Specific rather than sweeping.' },
            diplomatic: { trustDelta: +1, dialogue: 'More than nothing. Less than what\'s true. But a start.' },
          },
        },
        {
          id: 'd1_deny_responsibility',
          label: 'Frame migration as a governance problem, not a U.S. responsibility',
          description: 'Testify that Central American migration is caused by domestic governance failures — corruption, crime — and is not the result of U.S. historical policy.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          immediate: {
            effects: { influence: +5, stability: -10, economic: +3, support: -15 },
            flags: { denied_responsibility_l8: true },
            narrative: 'The testimony denies historical causation. FOIA-released cables and historical documents immediately contradict the testimony in press coverage. The statement damages credibility with regional partners.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Protects short-term domestic political standing.' },
            security: { trustDelta: +1, dialogue: 'Consistent with the dominant domestic narrative.' },
            diplomatic: { trustDelta: -3, dialogue: 'I will not sign this testimony. I am putting my objection in writing.' },
          },
        },
      ],
      next: 'consequence_1',
    },

    // ─── Consequence 1 ────────────────────────────────────
    {
      id: 'consequence_1',
      type: 'consequence',
      title: 'El Faro Reports',
      text: `<p>El Faro — Central America's leading investigative news outlet — publishes a comprehensive analysis of U.S. testimony on Central American migration. Their investigative team has access to declassified CIA and State Department cables that contradict many U.S. official positions.</p>

<p>The report connects the 1954 Guatemala coup to current instability, traces the gang crisis to the 1990s deportation programs, and documents ongoing U.S. security assistance to governments with documented human rights violations.</p>

<p>The report is read by 2 million people across Central America. It becomes the primary source for the next round of international hearings on Central American policy.</p>`,
      newspaper: {
        asset: 'L08_NEWS_01_InfluenciaSecreta_ElFaro.png',
        trigger: 'immediate',
        headline: 'INFLUENCIA SECRETA: 60 Years of U.S. Intervention in Central America',
        perspective: 'Latin American investigative press (El Faro, El Salvador)',
        bodyText: 'An investigative report connecting declassified U.S. documents to current migration patterns. From PBSUCCESS to gang deportations — El Faro traces the unbroken thread.',
      },
      autoEffects: {},
      next: 'context_honduras',
    },

    // ─── Context: Honduras 2009 ───────────────────────────
    {
      id: 'context_honduras',
      type: 'context',
      title: 'Honduras: The Coup We Recognized',
      subtitle: 'OAS Conflict Records / State Department Cables',
      text: `<p>In June 2009, Honduran President Manuel Zelaya was removed by the military in a coup — arrested in his pajamas and flown to Costa Rica. He had proposed a non-binding referendum on whether to convene a constitutional assembly. The military and Supreme Court declared this illegal.</p>

<p>The OAS voted to suspend Honduras. The UN General Assembly called for Zelaya's restoration. The United States did neither. The Obama administration — advised by Secretary of State Hillary Clinton — declined to call it a coup (which would have automatically triggered an aid cutoff under U.S. law) and recognized the subsequent elections held under the coup government.</p>

<p>The U.S. also helped negotiate the Tegucigalpa-San José Accord, which provided a framework that allowed the coup government to remain in power.</p>

<p>The post-coup Honduran governments were marked by expanded military power, increased drug trafficking (Honduras became a primary transit country), and systematic human rights violations. Between 2010 and 2019, Honduras saw some of the highest murder rates in the world — and became a primary source of northward migration.</p>`,
      map: {
        asset: 'L08_MAP_02_Honduras_ModernInstability.png',
        caption: 'Honduras — gang territory, drug trafficking corridors, displacement patterns, and historical U.S. security cooperation zones (2009–2019)',
      },
      next: 'decision_2',
    },

    // ─── Decision 2: Honduras Aid Conditions ─────────────
    {
      id: 'decision_2',
      type: 'decision',
      title: 'Decision Point 2 — Honduras Security Aid',
      text: 'Congress is reviewing the $750 million Northern Triangle aid package. A provision would condition security aid to Honduras on human rights benchmarks — including accountability for the 2009 coup government and current drug trafficking by security forces. How do you advise?',
      choices: [
        {
          id: 'd2_condition_aid',
          label: 'Support strong human rights conditions on aid',
          description: 'Advocate for meaningful conditionality: aid to Honduras cut pending investigation of security force involvement in drug trafficking, and accountability for abuses under post-coup governments.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: -5, stability: +12, economic: 0, support: +10 },
            flags: { conditioned_aid_l8: true, human_rights_accountability: true },
            narrative: 'Conditionality supported. Honduras initially resists. Some security aid is paused. An independent accountability mechanism is established. Several security commanders implicated in trafficking are removed.',
          },
          reactions: {
            economic: { trustDelta: 0, dialogue: 'Conditions create uncertainty for development investment — but unconditioned aid has been ineffective.' },
            security: { trustDelta: -1, dialogue: 'Conditionality weakens our partners at exactly the moment we need them. The drug threat doesn\'t pause for human rights reviews.' },
            diplomatic: { trustDelta: +2, dialogue: 'Conditions with teeth. This is what accountability looks like in practice.' },
          },
          delayed: [
            {
              trigger: 'next_lesson',
              targetLesson: 8,
              narrative: null,
              effects: {},
            },
          ],
        },
        {
          id: 'd2_unconditioned_aid',
          label: 'Continue unconditioned security aid',
          description: 'Maintain the security aid relationship without conditions. The security threat is real; conditionality weakens partners we need.',
          advisorAlignment: 'security',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: +8, stability: -8, economic: +3, support: -10 },
            flags: { unconditioned_aid_l8: true },
            narrative: 'Aid continues without conditions. Security cooperation yields some counternarcotics results. Human rights organizations document continued abuses. Migration from Honduras does not decrease.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Stability for investment maintained. The security relationship preserves business continuity.' },
            security: { trustDelta: +2, dialogue: 'Reliable partners, maintained relationships. The counternarcotics results are real.' },
            diplomatic: { trustDelta: -2, dialogue: 'We are funding documented abusers. Again. The pattern holds.' },
          },
        },
        {
          id: 'd2_pivot_to_cicig',
          label: 'Support multilateral anti-corruption mechanisms',
          description: 'Shift from bilateral security aid to multilateral anti-corruption support. Revive CICIG-style commissions in Honduras and El Salvador. Anti-corruption is the root of stability.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'high',
          immediate: {
            effects: { influence: -8, stability: +18, economic: -5, support: +15 },
            flags: { cicig_support_l8: true, human_rights_accountability: true },
            narrative: 'CICIG-model commissions supported. Initial results are significant — prosecutions of corrupt officials across all three governments. Elites push back hard. The commissions face political resistance.',
          },
          reactions: {
            economic: { trustDelta: -1, dialogue: 'Anti-corruption creates short-term uncertainty for established business relationships. Long-term, it\'s essential for investment climate.' },
            security: { trustDelta: -1, dialogue: 'CICIG prosecuted the security forces we depend on. It creates friction. But I acknowledge it was effective.' },
            diplomatic: { trustDelta: +3, dialogue: 'Anti-corruption at the institutional level is the only thing that actually works. This is the right investment.' },
          },
        },
      ],
      next: 'consequence_2',
    },

    // ─── Consequence 2 ────────────────────────────────────
    {
      id: 'consequence_2',
      type: 'consequence',
      title: 'Root Causes and Hard Truths',
      text: `<p>Whatever policy choices you've made in this lesson and across the game's arc, the data is consistent: migration from the Northern Triangle is driven by a combination of violence, economic desperation, and institutional failure — conditions that are historically connected to U.S. policy in the region.</p>

<p>A 2020 American Immigration Council study found that 47% of migrants from the Northern Triangle cited violence as the primary reason for leaving, and 28% cited economic conditions. Both factors track directly to the instability created or worsened by Cold War–era interventions and subsequent development policies.</p>

<p>The question is not whether U.S. policy had consequences. The question is what to do now that you know.</p>`,
      newspaper: {
        asset: 'L08_NEWS_02_ElCostoHumano_ElFaro.png',
        trigger: 'immediate',
        headline: 'EL COSTO HUMANO: The Human Price of 60 Years of U.S. Policy',
        perspective: 'Latin American investigative press (El Faro, El Salvador)',
        bodyText: 'El Faro\'s final report in the series: interviews with families in Guatemala City, Tegucigalpa, and San Salvador who trace their displacement to documented historical events.',
      },
      autoEffects: {},
      next: 'decision_3',
    },

    // ─── Decision 3: Policy Response ─────────────────────
    {
      id: 'decision_3',
      type: 'decision',
      title: 'Decision Point 3 — A Policy for the Present',
      text: 'You must advise the administration on a comprehensive Central American policy. What should be the primary framework?',
      choices: [
        {
          id: 'd3_root_cause_investment',
          label: 'Root cause investment — a Marshall Plan for Central America',
          description: 'Advocate for a 10-year, $5 billion investment in Northern Triangle economic development, anti-corruption institutions, and governance reform. Name it as remediation for historical harms.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'high',
          immediate: {
            effects: { influence: -10, stability: +20, economic: -8, support: +20 },
            flags: { root_cause_investment: true },
            narrative: 'A comprehensive development program is proposed. It passes with bipartisan support — unusual given the domestic political climate. Implementation begins. It will take a decade to show results.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Long-term investment thesis is sound. The economic returns on stability are real.' },
            security: { trustDelta: 0, dialogue: 'Necessary but slow. The security situation doesn\'t wait for ten-year development programs.' },
            diplomatic: { trustDelta: +3, dialogue: 'This is the right policy. Named correctly. Funded adequately. Ten years from now, this matters.' },
          },
        },
        {
          id: 'd3_security_first',
          label: 'Security-first — counter-gang, counter-narcotics priority',
          description: 'Prioritize gang suppression and narcotics interdiction. Security is the prerequisite for development. Fund Salvadoran and Honduran security forces with training and equipment.',
          advisorAlignment: 'security',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: +10, stability: -5, economic: +5, support: -8 },
            flags: { security_first_l8: true },
            narrative: 'Security assistance packages expanded. Some counternarcotics results achieved. Gang violence temporarily suppresses in some areas. Human rights reports increase. Migration does not decrease.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Security is the foundation of investment. This approach protects economic assets.' },
            security: { trustDelta: +2, dialogue: 'This is what actually works in the short term. We stop the bleeding first.' },
            diplomatic: { trustDelta: -2, dialogue: 'We have tried security-first for 30 years. The conditions haven\'t improved. The definition of insanity applies here.' },
          },
        },
        {
          id: 'd3_balanced_approach',
          label: 'Balanced approach — security, development, and accountability simultaneously',
          description: 'Pursue all three tracks: targeted security assistance with conditions, economic development investment, and anti-corruption support. No single track is sufficient alone.',
          advisorAlignment: 'economic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: 0, stability: +10, economic: 0, support: +8 },
            flags: { balanced_approach_l8: true },
            narrative: 'A three-track strategy is implemented. Progress is uneven — accountability provisions create friction with security partnerships, development investments take time, and security gains are partial. But the framework is more honest about the complexity.',
          },
          reactions: {
            economic: { trustDelta: +2, dialogue: 'The complexity of the approach matches the complexity of the problem. This is realistic.' },
            security: { trustDelta: 0, dialogue: 'Three tracks means no single track dominates. Some things we need will be deprioritized.' },
            diplomatic: { trustDelta: +1, dialogue: 'More comprehensive than any prior approach. The accountability track matters.' },
          },
        },
      ],
      next: 'outcome',
    },

    // ─── Outcome (with 4 Endings) ─────────────────────────
    {
      id: 'outcome',
      type: 'outcome',
      title: 'The Verdict of History',
      text: `<p>You have navigated eight lessons of American imperial history — from the Cuba crisis of 1898 to the Central American migration crisis of 2019. Across those 120 years, U.S. policy in Latin America has combined strategic calculation, economic interest, Cold War ideology, and democratic aspiration — in varying proportions, with varying consequences.</p>

<p>The Central Americans arriving at the border today are the inheritors of those decisions. So are you.</p>

<p>The question is not whether history matters. It does. The question is what you do when you finally see the whole picture.</p>`,
      conditionalContent: [
        {
          condition: { ideology: 'diplomatic', minConfidence: 0.4 },
          title: 'Ending A: The Reckoning',
          text: `<p>Across eight lessons, you consistently prioritized democratic legitimacy, human rights, and historical accountability over short-term strategic or economic gains. You were frequently in the minority position within your administration.</p>

<p>Your record: you rejected PBSUCCESS or demanded independent verification. You opposed the Contra program on human rights grounds. You refused to certify El Salvador's human rights record despite pressure. You pursued legal pathways in Panama. And in 2019, you named the history clearly.</p>

<p>History's verdict on this approach is still being written. But in 2021, the Biden administration's "Root Causes Strategy" for Central America — the most comprehensive acknowledgment of historical responsibility ever articulated by a sitting U.S. administration — reflected exactly the framework you advocated across all eight lessons. Whether it was too little too late is a question the next generation will answer.</p>

<p><strong>Your APUSH legacy:</strong> You exemplified the tradition of dissent within American foreign policy — those who saw the contradiction between stated values and actual practice, named it, and paid the political cost of doing so.</p>`,
        },
        {
          condition: { ideology: 'economic_pragmatist', minConfidence: 0.3 },
          title: 'Ending B: The Strategist',
          text: `<p>Across eight lessons, you consistently prioritized economic stability, market access, and material American interests. You were the voice of pragmatism — distinguishing between what was ideal and what was achievable.</p>

<p>Your record: you supported interventions when the economic case was clear, questioned them when it wasn't. You recognized, eventually, that economic development requires institutional stability — and that U.S. policy had often destroyed the institutions it needed.</p>

<p>The honest economic accounting of American policy in Latin America is damning but recoverable. The investments required — in anti-corruption, in development, in institutional capacity — are large but finite. You understood the problem correctly. The question was always whether the political will existed to fund the solution.</p>

<p><strong>Your APUSH legacy:</strong> You exemplified the tradition of economic realism in American foreign policy — capable of honest assessment when interests aligned, but constrained by what economic interests could accept.</p>`,
        },
        {
          condition: { ideology: 'interventionist', minConfidence: 0.4 },
          title: 'Ending C: The Hawk',
          text: `<p>Across eight lessons, you consistently supported interventionist options — authorizing covert operations, backing proxy forces, and using military action to shape the regional order. You were the voice of American power, applied decisively.</p>

<p>Your record: you got results on your own terms. Communist governments were removed or contained. U.S. influence expanded. The Panama Canal was secured. But the human cost of those results was enormous — and the instability you helped create in Central America produced consequences that arrived at the American border decades later.</p>

<p>The interventionist tradition in U.S. foreign policy has a coherent logic: power used decisively prevents worse outcomes. What this tradition has consistently underestimated is the durability of the resentment it generates — and the long-term costs of building regional order on coercion rather than consent.</p>

<p><strong>Your APUSH legacy:</strong> You exemplified the dominant tradition of American foreign policy in the 20th century — and you will spend time in the 21st century managing its consequences.</p>`,
        },
        {
          condition: { ideology: 'mixed' },
          title: 'Ending D: The Mixed Record',
          text: `<p>Across eight lessons, your decisions reflected the actual complexity of American foreign policy: no consistent ideology, competing pressures, sometimes principled and sometimes expedient. You were, in other words, realistic about the difficulty of power.</p>

<p>Your mixed record is actually the most historically accurate portrait of American foreign policy in Latin America: not a simple story of imperialism, not a simple story of principled democracy promotion — but a complicated human record of calculated interests, ideological commitments, genuine idealism, and genuine atrocity, held together by the conviction that American power was, on balance, a force for good.</p>

<p>Whether that conviction is justified by the evidence across the eight lessons of this game is a question you can answer better now than when you started.</p>

<p><strong>Your APUSH legacy:</strong> You exemplified the complexity that resists simple historical narratives — and demonstrated why the most important historical thinking skill is the willingness to hold contradictions without resolving them prematurely.</p>`,
        },
      ],
      next: 'reflection',
    },

    // ─── Reflection (FINAL) ──────────────────────────────
    {
      id: 'reflection',
      type: 'reflection',
      title: 'The Long View: 120 Years of American Empire',
      text: `<p><strong>The APUSH question this game asks:</strong> How did the United States expand its economic and political influence over Latin America between 1898 and the present — and what were the short-term and long-term consequences for the United States and for Latin America?</p>

<p><strong>The throughline:</strong> From the Spanish-American War to Operation Just Cause, from the Roosevelt Corollary to the Reagan Doctrine, from banana republic to Cold War coup — U.S. policy in Latin America followed a recognizable pattern. The justifications changed. The interests were consistent.</p>

<p><strong>The consequences are present:</strong> The people arriving at the U.S. southern border today are, in many cases, living in the downstream consequences of the decisions you made — and that real U.S. policymakers made — across eight lessons of American imperial history. Migration is not random. It follows the map of intervention.</p>

<p><strong>The most important historical thinking skill:</strong> Seeing the connection between past decisions and present conditions. The APUSH long essay question asks you to "evaluate the extent to which" a given factor explains a historical development. The game has been asking you to do exactly that — across 120 years.</p>

<p><strong>What do you do with this knowledge?</strong> That question belongs to the generation studying this history now — yours.</p>`,
      advisorDialogue: {
        diplomatic: 'You\'ve seen the whole picture now. That\'s where accountability begins.',
        economic: 'The ledger balances differently depending on what you count. You\'ve seen both columns now.',
        security: 'Power has consequences. The question is whether you\'re willing to own them.',
      },
      next: 'historical_comparison',
    },

    // ─── Final Historical Synthesis ───────────────────────
    {
      id: 'historical_comparison',
      type: 'context',
      title: 'The Complete Arc: 1898–Present',
      subtitle: 'APUSH Synthesis — 8-Lesson Continuity and Change',
      text: `<p><strong>Period 7 (Lessons 1–4: 1898–1934):</strong> U.S. military intervention in Cuba, Panama, and throughout Central America justified by economic interest, civilizationist ideology, and the Roosevelt Corollary. Pattern established: U.S. determines which governments are acceptable; force is the enforcement mechanism.</p>

<p><strong>Period 8 (Lessons 5–7: 1954–1990):</strong> Cold War anti-communism replaces economic imperialism as the justification; covert action replaces direct military intervention as the primary tool. The pattern is identical. The outcomes — regime change, authoritarian installation, human rights violations — are consistent.</p>

<p><strong>Period 9 (Lesson 8: 1990–present):</strong> The Cold War ends. The justifications fragment. Democracy promotion, drug war, anti-terrorism, anti-corruption. The interventionist infrastructure remains. The region bears the cumulative weight of a century of decisions.</p>

<p><strong>The APUSH synthesis question:</strong> "To what extent did U.S. foreign policy in Latin America reflect a consistent set of underlying interests despite changing justifications?" The answer — and your evidence from eight lessons — is your APUSH long essay.</p>`,
      next: 'assessment',
    },

    // ─── Final Assessment (comprehensive, 7 questions) ───
    {
      id: 'assessment',
      type: 'assessment',
      isPreAssessment: false,
      title: 'Final Assessment: Empire & Influence — 8-Lesson Synthesis',
      questions: [
        {
          id: 'l8_q1',
          type: 'multiple_choice',
          prompt: 'Which of the following BEST explains the primary motivation for U.S. military intervention in Cuba in 1898?',
          options: [
            'Humanitarian concern for Cuban civilians under Spanish rule',
            'A combination of economic interests, strategic considerations, and public pressure from yellow journalism',
            'Commitment to the democratic principle of self-determination for all peoples',
            'Fear of direct Spanish military attack on the U.S. mainland',
          ],
          correctIndex: 1,
          skillTags: ['ARG', 'CAUS'],
          difficulty: 2,
          apStandards: ['KC-7.3.II.A'],
          explanation: 'Historians generally attribute the Spanish-American War to a combination of American economic investment in Cuba, strategic interest in Caribbean naval bases, and public pressure whipped up by sensationalist "yellow journalism." Pure humanitarian motivation was secondary — as the Platt Amendment\'s conditions on Cuban sovereignty demonstrated.',
        },
        {
          id: 'l8_q2',
          type: 'multiple_choice',
          prompt: 'The Roosevelt Corollary (1904) to the Monroe Doctrine most directly claimed U.S. authority to:',
          options: [
            'Extend U.S. citizenship to Latin American residents',
            'Intervene militarily in Latin American countries to enforce debt repayment and prevent European intervention',
            'Establish free trade agreements throughout the Western Hemisphere',
            'Prevent all foreign investment in Latin American countries',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'HE'],
          difficulty: 2,
          apStandards: ['KC-7.3.II.A', 'KC-7.3.III.B'],
          explanation: 'The Roosevelt Corollary declared the U.S. the "policeman" of the Western Hemisphere — asserting the right to intervene in Latin American countries to prevent instability that might invite European intervention or debt default enforcement. This directly justified subsequent interventions in Nicaragua, Haiti, the Dominican Republic, and beyond.',
        },
        {
          id: 'l8_q3',
          type: 'multiple_choice',
          prompt: 'Which of the following BEST characterizes the shift in U.S. Latin American policy between the 1930s (Good Neighbor Policy) and the 1950s (Operation PBSUCCESS)?',
          options: [
            'U.S. policy became less interventionist after World War II due to Cold War alliances',
            'Cold War ideology replaced economic imperialism as the primary justification for intervention, but the interventionist pattern continued under a new rationale',
            'The U.S. abandoned all intervention in Latin America after 1933',
            'The Good Neighbor Policy was a complete reversal of all prior U.S. policy that lasted until the present',
          ],
          correctIndex: 1,
          skillTags: ['COMP', 'CCT'],
          difficulty: 3,
          apStandards: ['KC-8.1.II.B'],
          explanation: 'The Good Neighbor Policy (FDR, 1933) formally renounced military intervention and represented a genuine shift in approach. However, by the 1950s, the Cold War created new justifications — anti-communism — that enabled the same interventionist pattern to resume. PBSUCCESS (1954) demonstrates that the principle of non-intervention was conditional on governments not threatening U.S. interests.',
        },
        {
          id: 'l8_q4',
          type: 'cause_effect',
          prompt: 'Place the following in the correct causal order — from the earliest historical cause to the most recent effect:',
          items: [
            { id: 'item_a', text: 'U.S. supports the 1954 coup against Árbenz; Guatemala enters 36-year civil war' },
            { id: 'item_b', text: 'Institutional destruction and economic collapse in the Northern Triangle' },
            { id: 'item_c', text: 'U.S. backs Salvadoran military during civil war (1979–1992); 75,000 killed, institutions destroyed' },
            { id: 'item_d', text: 'Mass migration from Guatemala, Honduras, and El Salvador to the U.S. (2010s–present)' },
            { id: 'item_e', text: 'U.S. deports Central American gang members to El Salvador (1990s); gangs metastasize' },
          ],
          correctOrder: ['item_a', 'item_c', 'item_e', 'item_b', 'item_d'],
          skillTags: ['CAUS', 'CCT'],
          difficulty: 4,
          apStandards: ['KC-8.1.II.B', 'KC-9.3.I.A', 'KC-9.6.I.A'],
          explanation: 'The causal chain runs: Guatemala coup (1954) → Salvadoran civil war support (1979–1992) → gang deportations (1990s) → institutional/economic collapse → mass migration (2010s). This is the full arc of U.S. intervention consequences across the game.',
          correctFeedback: 'You correctly sequenced the 60-year causal chain from Cold War intervention to present-day migration patterns.',
          partialFeedback: 'Close — review the specific dates and causal relationships between U.S. interventions and their downstream effects.',
          incorrectFeedback: 'This sequence represents the core APUSH causation argument of the game. Review each lesson and how U.S. actions created conditions for subsequent events.',
        },
        {
          id: 'l8_q5',
          type: 'source_based',
          prompt: 'Based on this excerpt, what argument does the source make about the relationship between U.S. policy and Central American migration?',
          source: {
            title: 'El Faro Investigative Report on U.S. Policy in Central America',
            author: 'Carlos Dada, El Faro (El Salvador)',
            date: '2019',
            type: 'investigative journalism',
            text: '"The migration crisis that the United States calls a border emergency did not begin at the border. It began in 1954 in Guatemala City, when the CIA overthrew a government that dared to redistribute land from a U.S. corporation to indigenous farmers. It continued in 1982 in El Mozote, when U.S.-trained soldiers massacred 900 civilians in a village whose name most Americans do not know. It continued in the 1990s, when the U.S. deported gang members to countries unable to absorb them. The caravans at the border are not a foreign invasion. They are a bill that has come due."',
          },
          options: [
            'Central American migration is caused entirely by domestic corruption unrelated to foreign policy',
            'U.S. foreign policy interventions created the conditions that now drive Central American migration to the United States',
            'The U.S. should have intervened more in Central America to prevent instability',
            'Migration can be solved through border security measures alone',
          ],
          correctIndex: 1,
          skillTags: ['HE', 'ARG', 'CAUS'],
          difficulty: 3,
          apStandards: ['KC-9.6.I.A'],
          explanation: 'This source presents the historical causation argument that is central to the game\'s thesis: that present-day migration patterns are the downstream consequence of specific, documented U.S. foreign policy decisions. This is the perspective of Latin American investigative journalism — placed here as primary source evidence for APUSH argumentation.',
        },
        {
          id: 'l8_q6',
          type: 'short_response',
          prompt: 'Using evidence from at least THREE different historical periods covered in this game (1898–1989), construct an argument about the extent to which U.S. foreign policy in Latin America served democratic versus economic or strategic interests.',
          skillTags: ['ARG', 'HE', 'COMP', 'CCT'],
          difficulty: 4,
          apStandards: ['KC-7.3.II.A', 'KC-8.1.II.B', 'KC-9.3.I.A'],
          rubric: {
            keywords: ['democracy', 'economic', 'intervention', 'interests', 'corollary', 'containment', 'platt', 'pbsuccess', 'chile', 'contra', 'panama'],
            criteria: 'Student constructs a clear argument; uses specific evidence from at least three periods; acknowledges complexity rather than presenting a one-sided account',
            maxScore: 4,
          },
          explanation: 'Model answer: U.S. foreign policy in Latin America claimed democratic justifications (civilizing mission, freedom fighters, democracy restoration) while consistently producing outcomes that served economic and strategic interests at the expense of democratic self-determination. Evidence from three periods: (1) Platt Amendment 1901 — protectorate over Cuba contradicted independence promise; (2) Operation PBSUCCESS 1954 — overthrow of elected government to protect UFCO; (3) El Salvador certification 1982 — endorsing documented atrocities to maintain anti-communist partner. Complexity: the Good Neighbor Policy (1933) represents a genuine exception; Cold War containment had legitimate strategic rationale; Panama operation produced a democratic transition. The most defensible argument acknowledges both the pattern and the genuine tensions within it.',
          scaffoldHint: 'Consider: what did the U.S. say it was doing vs. what did it actually do? Look for cases where these diverge.',
        },
        {
          id: 'l8_q7',
          type: 'multiple_choice',
          prompt: 'The decision to play this game and analyze U.S. foreign policy from multiple perspectives — including the perspectives of the people affected by U.S. intervention — most directly develops which APUSH historical thinking skill?',
          options: [
            'Periodization — dividing history into meaningful time segments',
            'Argumentation — constructing and evaluating historical arguments',
            'Historical empathy and perspective-taking — understanding historical actors\' motivations and experiences in their own context',
            'Quantification — analyzing statistical data about historical trends',
          ],
          correctIndex: 2,
          skillTags: ['HE', 'COMP'],
          difficulty: 2,
          apStandards: ['KC-7.3.II.A'],
          explanation: 'Playing advisors with different ideological commitments, reading newspapers from Latin American perspectives (El Faro, La Voz de Cuba, El Colombiano), and confronting the human consequences of policy decisions develops historical empathy — the capacity to understand historical actors\' perspectives, motivations, and experiences in their own historical context.',
        },
      ],
      next: null,
    },

  ],
};

export default lesson08;
