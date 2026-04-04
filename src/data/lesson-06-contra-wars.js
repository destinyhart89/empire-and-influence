/**
 * EMPIRE & INFLUENCE — Lesson 6: Contra Wars (1979–1990)
 *
 * Era: cold-war | Period 8
 * Students navigate Reagan-era proxy warfare in Central America:
 *   • Nicaragua — U.S. support for the Contras against the Sandinista government
 *   • El Salvador — U.S. support for a right-wing government against the FMLN
 *
 * APUSH Standards: KC-8.1.II.B, KC-8.1.II.C, KC-9.3.II.A
 *
 * Available assets:
 *   Maps:       L06_MAP_01_Nicaragua_ContraOperations.png
 *               (L06_MAP_02 MISSING — placeholder handled gracefully)
 *   Newspapers: L06_NEWS_01_ContrasStrike_CapitalTimes.png
 *               L06_NEWS_02_WarInElSalvador_Standard.png
 *               (No oppositional newspaper for L6 — gap noted in documentation)
 *   Portraits:  L06_PORT_01_EconomicAdvisor_DefenseContractor.png
 *               L06_PORT_02_SecurityAdvisor_CovertMilitaryAdvisor.png
 *               L06_PORT_03_DiplomaticAdvisor_HumanRightsOfficial.png
 *
 * Continuity in from L5 (Cold War Coups):
 *   - covert_overthrow_approved → Contras receive stronger initial funding
 *   - cold_war_hawk → Security advisor starts with +1 trust
 *   - cold_war_dove → Diplomatic advisor starts with +1 trust, human rights flags more visible
 *   - backed_allende_coup delayed consequence fires here
 *
 * Continuity out to L7 (Panama 1989):
 *   - flags: backed_contras, opposed_contras, iran_contra_awareness, el_salvador_support,
 *            human_rights_priority_l6
 *   - delayed consequences for L7 and L8
 */

const lesson06 = {
  id: 6,
  title: 'Contra Wars',
  subtitle: '1979–1990',
  era: 'cold-war',
  period: 'Period 8',
  apStandards: ['KC-8.1.II.B', 'KC-8.1.II.C', 'KC-9.3.II.A'],

  // ═══════════════════════════════════════════════════════
  // CONTINUITY IN (from L5 Cold War Coups)
  // ═══════════════════════════════════════════════════════

  continuityIn: {
    advisorTrustBonuses: [
      { ifFlag: 'cold_war_hawk', advisor: 'security', delta: 1 },
      { ifFlag: 'cold_war_dove', advisor: 'diplomatic', delta: 1 },
      { ifFlag: 'covert_overthrow_approved', advisor: 'economic', delta: 1 },
    ],
    metricAdjustments: [
      // Delayed consequence from L5: Chile coup backlash
      { ifFlag: 'backed_allende_coup', effects: { support: -8, stability: -5 } },
      // CIA reform created accountability frameworks that affected operations
      { ifFlag: 'supported_cia_reform_l5', effects: { stability: +5 } },
    ],
    narrativeContext: {
      ifFlag: 'covert_overthrow_approved',
      text: 'The precedents you set in Guatemala and Chile have shaped the Reagan administration\'s confidence in covert action. The new CIA Director cites your record.',
    },
  },

  // ═══════════════════════════════════════════════════════
  // ADVISORS
  // ═══════════════════════════════════════════════════════

  advisors: {
    economic: {
      name: 'Defense Contractor',
      title: 'Economic Advisor',
      portrait: 'L06_PORT_01_EconomicAdvisor_DefenseContractor.png',
      initialTrust: 0,
      metricWeights: { influence: 0.6, stability: 0.3, economic: 1.8, support: 0.5 },
      bias: { primary: 'defense_contracts', secondary: 'market_access', aversion: 'sanctions' },
      quotes: {
        decision_1: 'The Sandinistas nationalized American businesses and invited Soviet military advisors. Our defense industry has $400 million in contracts tied to Central American stability. The Contras are a cost-effective alternative to direct intervention.',
        decision_2: 'Reagan\'s $100 million Contra aid package will employ American defense suppliers and keep the Soviets occupied in a region far from Europe. This is strategic investment.',
        decision_3: 'El Salvador\'s government may not be perfect, but it\'s the government that allows American companies to operate. FMLN control would mean nationalization.',
        decision_4: 'The Iran-Contra arrangement was entrepreneurial — perhaps legally complicated, but strategically sound. Pity it became public.',
        reaction_approve: [
          'The defense industry thanks you.',
          'Smart. Keep the pressure on, keep the contracts flowing.',
          'This is what strategic thinking looks like.',
        ],
        reaction_disapprove: [
          'You\'ve just handed the Sandinistas a victory and our defense suppliers a problem.',
          'The cost of principle is measured in lost contracts.',
          'I hope your conscience can pay the bills.',
        ],
        default: 'War is expensive. But the alternative — Communist Latin America — costs more.',
      },
    },

    security: {
      name: 'Covert Military Advisor',
      title: 'Security Advisor',
      portrait: 'L06_PORT_02_SecurityAdvisor_CovertMilitaryAdvisor.png',
      initialTrust: 0,
      metricWeights: { influence: 1.8, stability: 1.0, economic: 0.3, support: 0.5 },
      bias: { primary: 'proxy_warfare', secondary: 'containment', aversion: 'restraint' },
      quotes: {
        decision_1: 'The Sandinistas are Marxists with Cubans and Soviets advising them. The Contras are freedom fighters. If Congress won\'t fund them, we find another way. The domino theory is real — Nicaragua is the first tile.',
        decision_2: 'We can\'t fight the Soviets everywhere conventionally. Proxy warfare in Nicaragua ties down Cuban and Soviet resources. The Contras are bleeding them white at a fraction of the cost of a direct confrontation.',
        decision_3: 'El Salvador is a line in the sand. If the FMLN takes San Salvador, the next domino is Guatemala, then Mexico. We cannot allow a Communist government 1,500 miles from Texas.',
        decision_4: 'Oliver North did what had to be done. Congressional restrictions on national security are an overreach. The executive must retain flexibility to protect American interests.',
        reaction_approve: [
          'That\'s the Reagan Doctrine in action.',
          'The Soviets understand only strength. This sends the right message.',
          'Freedom fighters don\'t come cheap, but they\'re cheaper than American soldiers.',
        ],
        reaction_disapprove: [
          'We\'ve just told Moscow that Congress runs U.S. foreign policy.',
          'The Sandinistas will consolidate power. This is our Cuba, and we chose to let it happen.',
          'History won\'t be kind to this decision.',
        ],
        default: 'We\'re in a global struggle. Central America is the current front.',
      },
    },

    diplomatic: {
      name: 'Human Rights Official',
      title: 'Diplomatic Advisor',
      portrait: 'L06_PORT_03_DiplomaticAdvisor_HumanRightsOfficial.png',
      initialTrust: 0,
      metricWeights: { influence: 0.4, stability: 1.2, economic: 0.2, support: 2.0 },
      bias: { primary: 'human_rights', secondary: 'international_law', aversion: 'atrocity_support' },
      quotes: {
        decision_1: 'The Contras have been documented murdering civilians, mining harbors, attacking hospitals, and raping women. Amnesty International and Human Rights Watch have verified these reports. We are funding war crimes.',
        decision_2: 'Congress passed the Boland Amendment specifically to prohibit Contra funding. The Reagan administration\'s determination to work around it is a constitutional crisis in the making.',
        decision_3: 'The El Salvador government we\'re supporting is responsible for the assassination of Archbishop Romero, the rape and murder of four American nuns, and the El Mozote massacre — 900 civilians. We are funding atrocity.',
        decision_4: 'The Iran-Contra affair confirms what we feared: the administration has created a shadow government that bypasses democratic oversight. This isn\'t a foreign policy failure. It\'s a constitutional one.',
        reaction_approve: [
          'There may be accountability yet.',
          'This is what principled policy looks like.',
          'Amnesty International will note this. As will history.',
        ],
        reaction_disapprove: [
          'Another atrocity. Another strategic justification.',
          'I\'ve submitted my dissent in writing. Again.',
          'We are creating the conditions for the next generation of anti-American sentiment.',
        ],
        default: 'There are no free wars. Someone always pays — and it\'s never the people who make the decision.',
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
      title: 'Before We Begin: Reagan\'s Central America',
      questions: [
        {
          id: 'pre_l6_q1',
          type: 'multiple_choice',
          prompt: 'The "Reagan Doctrine" referred to U.S. policy of:',
          options: [
            'Cutting all foreign aid to Latin American nations',
            'Supporting anti-communist resistance movements worldwide, including proxy fighters',
            'Deploying U.S. troops directly to combat Soviet expansion',
            'Withdrawing from Cold War engagement following the Vietnam defeat',
          ],
          correctIndex: 1,
          skillTags: ['KC'],
          difficulty: 2,
          explanation: 'The Reagan Doctrine committed the U.S. to supporting anti-communist insurgencies worldwide, including the Contras in Nicaragua, UNITA in Angola, and the Mujahideen in Afghanistan.',
        },
        {
          id: 'pre_l6_q2',
          type: 'multiple_choice',
          prompt: 'The Boland Amendment (1982, 1984) prohibited:',
          options: [
            'U.S. military intervention in El Salvador',
            'CIA operations in any country without congressional notification',
            'Federal funds from being used to support the Contras in Nicaragua',
            'Arms sales to authoritarian governments in Latin America',
          ],
          correctIndex: 2,
          skillTags: ['KC'],
          difficulty: 2,
          explanation: 'The Boland Amendment(s) prohibited CIA and Department of Defense funds from being used to support the Contras. The Reagan administration found ways around it, culminating in the Iran-Contra affair.',
        },
        {
          id: 'pre_l6_q3',
          type: 'multiple_choice',
          prompt: 'The Sandinistas came to power in Nicaragua in 1979 by:',
          options: [
            'Winning a free and fair democratic election',
            'Overthrowing the Somoza dictatorship through armed revolution',
            'Being installed by Cuban military forces',
            'Seizing power in a military coup endorsed by the Soviet Union',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'COMP'],
          difficulty: 1,
          explanation: 'The FSLN (Sandinistas) overthrew the Somoza dynasty — a U.S.-backed authoritarian family that had ruled Nicaragua since 1936. Somoza fled in July 1979. The Sandinistas\' revolutionary origins influenced their policies, including land reform and nationalization of Somoza-linked businesses.',
        },
      ],
      next: 'intro',
    },

    // ─── Introduction ────────────────────────────────────
    {
      id: 'intro',
      type: 'intro',
      title: 'Contra Wars',
      subtitle: 'Fighting Communism by Proxy — At What Cost?',
      text: `<p>It is 1981. Ronald Reagan has been elected on a platform of restoring American strength after Vietnam, Watergate, and the Iran hostage crisis. His administration believes the U.S. lost in Vietnam because of political weakness at home — not military failure in the field.</p>

<p>Central America is the new test. In Nicaragua, the Sandinista revolution has ousted the Somoza dictatorship and invited Cuban and Soviet advisors. In El Salvador, a Marxist guerrilla movement — the FMLN — is fighting the U.S.-backed government.</p>

<p>Reagan's solution: the Contra rebels in Nicaragua, armed and funded by the CIA. And in El Salvador, $1 billion in military aid to a government accused of mass atrocities.</p>

<p>But Congress, scarred by Vietnam and disturbed by reports of Contra human rights abuses, is moving to cut off the funding.</p>`,
      advisorDialogue: {
        security: 'Nicaragua is Cuba 1959 redux. We cannot let the Soviets build another Caribbean platform. The Contras are our answer.',
        economic: 'The defense contracts are significant. Central American stability is worth protecting — and the Contra program employs American suppliers.',
        diplomatic: 'I have 40 verified reports of Contra atrocities on my desk. We are funding war crimes. I need the room to hear that.',
      },
      advisorPrimary: 'security',
      next: 'context_nicaragua',
    },

    // ─── Context: Nicaragua ──────────────────────────────
    {
      id: 'context_nicaragua',
      type: 'context',
      title: 'Nicaragua: Sandinistas and Contras',
      subtitle: 'CIA Intelligence Briefing — December 1981',
      text: `<p>The Sandinista government has nationalized Somoza-linked businesses, established close relationships with Cuba and the Soviet Union, and begun building a 50,000-person army. Reagan sees this as unacceptable — a Communist beachhead 1,500 miles from Texas.</p>

<p>The CIA has assembled a force of ex-Somoza National Guard members — the Contras (counter-revolutionaries). Their mission: destabilize the Sandinista government through sabotage, economic disruption, and armed attacks.</p>

<p>Human Rights Watch and Amnesty International have already filed reports: the Contras have murdered civilians, tortured prisoners, attacked health clinics, and raped women. CIA training manuals advise on "neutralizing" government officials.</p>

<p>The Boland Amendment (1982) prohibits using U.S. funds to overthrow the Nicaraguan government. The Reagan administration interprets this as a constraint on direct action — not on covert support.</p>`,
      map: {
        asset: 'L06_MAP_01_Nicaragua_ContraOperations.png',
        caption: 'Nicaragua — Contra operational areas, CIA supply routes from Honduras and Costa Rica, and Sandinista defensive positions (1981–1988)',
      },
      next: 'decision_1',
    },

    // ─── Decision 1: Contra Funding ──────────────────────
    {
      id: 'decision_1',
      type: 'decision',
      title: 'Decision Point 1 — Contra Funding',
      text: 'Congress is debating the Boland Amendment. Before it passes, the administration must determine its Contra policy.',
      choices: [
        {
          id: 'd1_full_support',
          label: 'Full CIA support for the Contras',
          description: 'Commit to comprehensive Contra support: funding, training, intelligence, air resupply, and "plausible deniability" cover. Ignore the human rights reports.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          immediate: {
            effects: { influence: +15, stability: -15, economic: +8, support: -10 },
            flags: { backed_contras: true, full_contra_support: true },
            narrative: 'Full support authorized. CIA Director Casey personally oversees the Contra program. Mining of Nicaraguan harbors is added to the operation — later revealed to be a CIA operation.',
          },
          reactions: {
            economic: { trustDelta: +2, dialogue: 'Defense contracts are secured. The program is running.' },
            security: { trustDelta: +2, dialogue: 'Excellent. The Sandinistas will feel the pressure by spring.' },
            diplomatic: { trustDelta: -3, dialogue: 'We have committed to funding a documented war crimes operation. I am filing a formal dissent.' },
          },
          delayed: [
            {
              trigger: 'next_lesson',
              targetLesson: 7,
              narrative: 'The Contra program\'s human rights abuses have become internationally known. The U.S. is condemned at the International Court of Justice for mining Nicaraguan harbors.',
              effects: { support: -10, stability: -8 },
            },
          ],
        },
        {
          id: 'd1_limited_support',
          label: 'Limited support — intelligence and logistics only',
          description: 'Provide CIA intelligence and logistics to the Contras, but withhold direct funding for military operations pending a human rights review.',
          advisorAlignment: 'security',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: +6, stability: -5, economic: +3, support: -3 },
            flags: { backed_contras: true, limited_contra_support: true },
            narrative: 'Limited covert support authorized. CIA provides targeting intelligence and logistics. Direct combat operations are left to the Contras — maintaining a formal separation.',
          },
          reactions: {
            economic: { trustDelta: +1, dialogue: 'Workable. Not ideal, but keeps the program alive.' },
            security: { trustDelta: 0, dialogue: 'Half-measures. The Contras need direct support to put real pressure on Managua.' },
            diplomatic: { trustDelta: -1, dialogue: 'We\'re still complicit in atrocities. The intelligence we\'re providing is used for targeting.' },
          },
        },
        {
          id: 'd1_oppose_contras',
          label: 'Oppose Contra funding — support the Boland Amendment',
          description: 'Refuse to support the Contra program on human rights grounds. Work with Congress on the Boland Amendment. Pursue diplomatic engagement with the Sandinistas.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'low',
          immediate: {
            effects: { influence: -12, stability: +15, economic: -5, support: +12 },
            flags: { opposed_contras: true, human_rights_priority_l6: true },
            narrative: 'The administration declines to fund the Contras. Diplomatic talks open. Congress passes the Boland Amendment with administration acquiescence.',
          },
          reactions: {
            economic: { trustDelta: -2, dialogue: 'The defense contractors are furious. We\'ve left them out in the cold.' },
            security: { trustDelta: -3, dialogue: 'We\'ve just told the Sandinistas they won. The dominoes will fall.' },
            diplomatic: { trustDelta: +3, dialogue: 'The right call. Human rights must be a real constraint, not a talking point.' },
          },
        },
      ],
      next: 'consequence_1',
    },

    // ─── Consequence 1 ────────────────────────────────────
    {
      id: 'consequence_1',
      type: 'consequence',
      title: 'The Boland Amendment',
      text: `<p>Congress passes the Boland Amendment (1982), prohibiting federal funds from being used to overthrow the Nicaraguan government. A stronger version passes in 1984.</p>

<p>For those who authorized Contra support: the Reagan administration, led by National Security Advisor John Poindexter and NSC staffer Oliver North, begins looking for ways to fund the Contras outside of the congressional appropriations process. Arms sales to Iran, profits routed through secret accounts, third-country funding from Saudi Arabia and Brunei — the architecture of what becomes the Iran-Contra affair is taking shape.</p>

<p>For those who opposed Contra funding: Nicaragua's Sandinista government consolidates. Soviet and Cuban military advisors remain. Regional tensions continue.</p>`,
      newspaper: {
        asset: 'L06_NEWS_01_ContrasStrike_CapitalTimes.png',
        trigger: 'immediate',
        headline: 'CONTRA FORCES ATTACK NORTHERN NICARAGUA — Congress Debates Aid Package',
        perspective: 'U.S. press',
        bodyText: 'Rebel forces backed by CIA training continue operations in northern Nicaragua. Senate debate on the Boland Amendment begins this week.',
        showCondition: { flag: 'backed_contras' },
      },
      autoEffects: {},
      next: 'context_el_salvador',
    },

    // ─── Context: El Salvador ────────────────────────────
    {
      id: 'context_el_salvador',
      type: 'context',
      title: 'El Salvador: War Without a Name',
      subtitle: 'State Department Country Report — 1982',
      text: `<p>While Nicaragua dominates the headlines, a parallel war is underway in El Salvador. The FMLN (Farabundo Martí National Liberation Front) is a coalition of Marxist guerrilla movements fighting the U.S.-backed government junta.</p>

<p>The Reagan administration provides $1 billion in military aid to El Salvador between 1981 and 1990. The Salvadoran military and allied death squads have been documented killing civilians on an industrial scale:</p>

<p>• <strong>Archbishop Romero</strong> (1980): Shot while celebrating Mass. Salvadoran death squads, linked to major Roberto D'Aubuisson, are responsible. The U.S. continues aid.</p>

<p>• <strong>Four American churchwomen</strong> (1980): Raped and murdered by Salvadoran National Guard soldiers. Two years later, five guardsmen are convicted. U.S. aid continues.</p>

<p>• <strong>El Mozote massacre</strong> (December 1981): The Atlacatl Battalion — trained by U.S. Special Forces — kills approximately 900 civilians in the village of El Mozote. The State Department initially denies it occurred.</p>`,
      advisorDialogue: {
        diplomatic: 'I need the administration to hear what I\'m saying: these are not isolated incidents. These are systematic, U.S.-funded atrocities. El Mozote. The churchwomen. Romero. We own this.',
        security: 'The FMLN would establish a Communist state 1,500 miles from Texas. Every atrocity the Salvadoran military commits is a tragedy — but a Communist El Salvador is a strategic catastrophe.',
        economic: 'The Salvadoran government is the government of record. El Salvador has significant agricultural exports. Stability serves economic interests.',
      },
      next: 'decision_2',
    },

    // ─── Decision 2: El Salvador Policy ──────────────────
    {
      id: 'decision_2',
      type: 'decision',
      title: 'Decision Point 2 — El Salvador Military Aid',
      text: 'Congress is conditioning military aid to El Salvador on "human rights certification." The administration must decide whether to certify.',
      choices: [
        {
          id: 'd2_certify_el_salvador',
          label: 'Certify El Salvador\'s human rights progress',
          description: 'Sign the certification that El Salvador is making progress on human rights, allowing $82 million in military aid to flow. U.S. advisors remain in-country.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          immediate: {
            effects: { influence: +10, stability: -12, economic: +6, support: -12 },
            flags: { el_salvador_support: true, certified_human_rights: true },
            narrative: 'Certification signed. Military aid resumes. State Department cables describing El Mozote are classified. Human rights organizations condemn the decision.',
          },
          reactions: {
            economic: { trustDelta: +2, dialogue: 'Aid keeps El Salvador stable. Agricultural contracts can continue.' },
            security: { trustDelta: +2, dialogue: 'The FMLN will not take San Salvador. We\'ve held the line.' },
            diplomatic: { trustDelta: -3, dialogue: 'We have formally lied about El Mozote. 900 people were murdered and we called it progress.' },
          },
        },
        {
          id: 'd2_condition_aid',
          label: 'Condition aid on specific reforms',
          description: 'Provide partial military aid contingent on concrete steps: arrest of death squad leaders, accountability for the churchwomen\'s murders, prosecution of El Mozote perpetrators.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: 0, stability: -3, economic: 0, support: +3 },
            flags: { el_salvador_conditioned: true },
            narrative: 'Conditions attached. The Salvadoran government makes token gestures. Some mid-level officers are prosecuted. Death squad activity continues at reduced pace.',
          },
          reactions: {
            economic: { trustDelta: 0, dialogue: 'Pragmatic compromise. Some uncertainty for investors, but maintains the relationship.' },
            security: { trustDelta: -1, dialogue: 'The FMLN will read conditions as weakness. We\'ve introduced uncertainty in a critical ally.' },
            diplomatic: { trustDelta: +1, dialogue: 'Not ideal — but it moves the needle. Conditions with consequences matter.' },
          },
        },
        {
          id: 'd2_suspend_military_aid',
          label: 'Suspend military aid pending accountability',
          description: 'Refuse to certify. Suspend military aid until El Salvador prosecutes those responsible for the churchwomen\'s murders, acknowledges El Mozote, and disbands documented death squads.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: -12, stability: +10, economic: -5, support: +15 },
            flags: { el_salvador_aid_suspended: true, human_rights_priority_l6: true },
            narrative: 'Aid suspended. The Salvadoran government is furious. Congress applauds. The FMLN continues operations. The State Department receives a formal protest from San Salvador.',
          },
          reactions: {
            economic: { trustDelta: -2, dialogue: 'Agricultural exports from El Salvador depend on stability. This disrupts those relationships.' },
            security: { trustDelta: -2, dialogue: 'We\'ve just told the FMLN we won\'t fully back their enemy. This is a strategic error.' },
            diplomatic: { trustDelta: +3, dialogue: 'Human rights conditions mean nothing if there are no consequences for violations. This is exactly right.' },
          },
        },
      ],
      next: 'consequence_2',
    },

    // ─── Consequence 2 ────────────────────────────────────
    {
      id: 'consequence_2',
      type: 'consequence',
      title: 'War Without End',
      text: `<p>The El Salvador conflict continues until 1992. Over 75,000 people are killed. The UN Truth Commission (1993) attributes 85% of documented atrocities to the Salvadoran military and allied death squads — forces the U.S. trained, funded, and certified as human rights compliant.</p>

<p>In Nicaragua, the Contra war drags on. The International Court of Justice rules in 1986 that the U.S. violated international law by mining Nicaraguan harbors and supporting the Contras — the only time the U.S. has been found guilty of aggression by the ICJ. The Reagan administration rejects the ruling and withdraws from the compulsory jurisdiction of the court.</p>`,
      newspaper: {
        asset: 'L06_NEWS_02_WarInElSalvador_Standard.png',
        trigger: 'immediate',
        headline: 'EL SALVADOR WAR DRAGS INTO SECOND DECADE — Peace Talks Stall',
        perspective: 'U.S. press',
        bodyText: 'Civil conflict in El Salvador shows no signs of resolution as U.S. military advisors continue training operations. Human rights groups have filed new reports with the State Department.',
      },
      autoEffects: {},
      next: 'decision_3',
    },

    // ─── Decision 3: Iran-Contra ─────────────────────────
    {
      id: 'decision_3',
      type: 'decision',
      title: 'Decision Point 3 — The Iran-Contra Revelation',
      text: 'November 1986: The Lebanese newspaper Al-Shiraa reveals that the U.S. secretly sold arms to Iran (then under an arms embargo) and used profits to fund the Contras, circumventing the Boland Amendment. The question is how to respond.',
      choices: [
        {
          id: 'd3_stonewall',
          label: 'Deny and minimize — stonewall the investigation',
          description: 'Maintain that the President was unaware of the diversion of funds. Protect Oliver North and John Poindexter. Resist congressional investigation.',
          advisorAlignment: 'security',
          riskLevel: 'high',
          immediate: {
            effects: { influence: +5, stability: -15, economic: 0, support: -18 },
            flags: { iran_contra_stonewall: true },
            narrative: 'The administration stonewalls. Oliver North shreds documents. Reagan delivers his "I don\'t recall" testimony. The Tower Commission criticizes administration management. Reagan\'s approval rating drops 21 points overnight.',
          },
          reactions: {
            economic: { trustDelta: 0, dialogue: 'A political crisis, but markets are resilient. The underlying strategy was sound.' },
            security: { trustDelta: +1, dialogue: 'North did what needed to be done. Some things are too important to leave to democratic processes.' },
            diplomatic: { trustDelta: -3, dialogue: 'We have sold arms to the state that attacked our embassy, and funded war crimes with the profit. And we\'re lying about it.' },
          },
        },
        {
          id: 'd3_cooperate_investigation',
          label: 'Cooperate with congressional investigation',
          description: 'Advise full cooperation with the Tower Commission and congressional investigation. Dismiss North and Poindexter. Acknowledge wrongdoing.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'medium',
          immediate: {
            effects: { influence: -8, stability: +8, economic: 0, support: +5 },
            flags: { iran_contra_cooperated: true, iran_contra_awareness: true },
            narrative: 'Cooperation with the investigation allows for partial accountability. Convictions result, though most are later overturned on appeal. The constitutional crisis is managed — but the policy is fully exposed.',
          },
          reactions: {
            economic: { trustDelta: -1, dialogue: 'Short-term turbulence, but investors appreciate the transparency. Uncertainty resolved faster.' },
            security: { trustDelta: -2, dialogue: 'We\'ve handed Congress the ammunition to gut the CIA and NSC for a generation.' },
            diplomatic: { trustDelta: +2, dialogue: 'Democratic accountability survived. That matters more than the short-term political cost.' },
          },
          delayed: [
            {
              trigger: 'next_lesson',
              targetLesson: 7,
              narrative: 'Post-Iran-Contra reforms have created oversight structures that constrain but do not eliminate covert action. The lesson learned is about getting caught, not about what was wrong.',
              effects: { stability: +5 },
            },
          ],
        },
        {
          id: 'd3_demand_accountability',
          label: 'Demand full accountability — push for special prosecutor',
          description: 'Go further than cooperation: actively advocate for a special prosecutor and full public accounting. Accept the political damage.',
          advisorAlignment: 'diplomatic',
          riskLevel: 'high',
          immediate: {
            effects: { influence: -15, stability: +15, economic: -3, support: +15 },
            flags: { iran_contra_awareness: true, demanded_accountability_l6: true, human_rights_priority_l6: true },
            narrative: 'A special prosecutor is appointed. Lawrence Walsh\'s investigation runs until 1993. Fourteen individuals are charged. The constitutional implications of the Boland circumvention are fully aired.',
          },
          reactions: {
            economic: { trustDelta: -2, dialogue: 'A prolonged investigation creates uncertainty. But the legal exposure eventually resolves.' },
            security: { trustDelta: -3, dialogue: 'You\'ve handed a weapon to every future Congress that wants to constrain executive power.' },
            diplomatic: { trustDelta: +3, dialogue: 'Accountability is what distinguishes a democracy from the governments we claim to oppose. This is right.' },
          },
        },
      ],
      next: 'consequence_3',
    },

    // ─── Consequence 3 ────────────────────────────────────
    {
      id: 'consequence_3',
      type: 'consequence',
      title: 'The Decade\'s Balance Sheet',
      text: `<p>The Contra Wars end when the Sandinistas agree to free elections in 1990 — and lose. Violeta Chamorro wins the presidency. The Contras demobilize. Whether the decade of Contra pressure caused the Sandinistas' election defeat — or whether it was domestic exhaustion — remains debated.</p>

<p>In El Salvador, the peace accords are signed in 1992. The UN Truth Commission documents 75,000 deaths, attributing 85% to state and paramilitary forces. The Atlacatl Battalion — U.S.-trained — is responsible for the most documented atrocities.</p>

<p>The Iran-Contra convictions are largely overturned or pardoned. No senior official serves significant prison time. Oliver North runs for Senate in 1994.</p>`,
      autoEffects: {},
      next: 'outcome',
    },

    // ─── Outcome ─────────────────────────────────────────
    {
      id: 'outcome',
      type: 'outcome',
      title: 'Central America: Legacy of the Proxy Wars',
      text: `<p>The Contra Wars represent the Reagan Doctrine's most explicit application: using proxy forces to bleed Soviet-aligned governments while maintaining American deniability. The strategy succeeded by some measures — the Sandinistas left power. But the cost, measured in lives, constitutional violations, and regional instability, was enormous.</p>

<p>Central America in the 1990s is devastated. Economic collapse, institutional destruction, and hundreds of thousands of deaths have created the conditions for the gang violence and migration crises that will define the region for the next 30 years.</p>

<p>The next lesson brings us to Panama, 1989 — where a different kind of Cold War intervention, direct military action, brings the era to its final act.</p>`,
      conditionalContent: [
        {
          condition: { flag: 'human_rights_priority_l6' },
          title: 'The Cost of Principle',
          text: '<p>Your consistent prioritization of human rights standards came at political cost but set a precedent: American foreign policy can be held accountable. The congressional oversight frameworks you supported become the foundation for post-Cold War accountability mechanisms.</p>',
        },
        {
          condition: { flag: 'backed_contras' },
          title: 'The Price of Proxy War',
          text: '<p>The strategy worked — in the narrow sense. The Sandinistas left power. But the human cost and the constitutional damage of Iran-Contra left deep scars. The region you were supposedly stabilizing became the source of the largest migration crisis in American history 30 years later.</p>',
        },
      ],
      next: 'reflection',
    },

    // ─── Reflection ──────────────────────────────────────
    {
      id: 'reflection',
      type: 'reflection',
      title: 'Historical Reflection: Democratic Values and Proxy Wars',
      text: `<p><strong>The APUSH question this lesson asks:</strong> How did Cold War ideology and anti-communism shape U.S. policy decisions, including decisions that undermined democratic institutions at home and abroad?</p>

<p>Iran-Contra was not just a scandal — it was a constitutional crisis. The Reagan administration created a secret foreign policy apparatus that bypassed congressional oversight, using arms sales to a state sponsor of terrorism to fund proxy forces that Congress had explicitly defunded.</p>

<p><strong>The pattern continues:</strong> The same logic that justified PBSUCCESS in 1954 justified the Contras in 1981. The difference was scale, constitutional violation, and the presence of a functioning press and Congress willing to investigate.</p>

<p><strong>Think about:</strong> What does Iran-Contra reveal about the balance of power between the executive and legislative branches? How does the "national security" justification function as a limit on democratic accountability? What is the long-term relationship between the Contra Wars and the migration patterns from Central America today?</p>`,
      next: 'historical_comparison',
    },

    // ─── Historical Comparison ───────────────────────────
    {
      id: 'historical_comparison',
      type: 'context',
      title: 'Continuity and Change: Cold War to Post-Cold War',
      subtitle: 'APUSH Continuity and Change Over Time',
      text: `<p><strong>What changed:</strong> By the 1980s, there was a functioning oversight infrastructure — the Church Committee reforms, the Boland Amendment, a press corps that had broken Watergate. This created friction that didn't exist in 1954. The Contra program was exposed and debated. This matters.</p>

<p><strong>What stayed the same:</strong> The fundamental pattern of using covert force to remove or undermine governments the U.S. found ideologically threatening, regardless of their democratic legitimacy.</p>

<p><strong>The long tail:</strong> The devastation of Central America in the 1980s — the violence, displacement, and institutional collapse — created the economic and security conditions that produced the migration patterns the U.S. would debate as a "border crisis" 30 years later. This is a direct causal chain from U.S. foreign policy decision-making to domestic policy consequences. This is the kind of historical causation APUSH long essay questions ask about.</p>`,
      next: 'assessment',
    },

    // ─── Assessment ──────────────────────────────────────
    {
      id: 'assessment',
      type: 'assessment',
      isPreAssessment: false,
      title: 'Lesson 6 Assessment: Contra Wars',
      questions: [
        {
          id: 'l6_q1',
          type: 'multiple_choice',
          prompt: 'The Iran-Contra affair involved which of the following actions?',
          options: [
            'CIA agents assassinating a Nicaraguan general without presidential authorization',
            'Secret arms sales to Iran with profits diverted to fund Nicaraguan Contras, circumventing the Boland Amendment',
            'U.S. military forces directly fighting alongside the Contras in Nicaragua',
            'Congress authorizing the CIA to mine Nicaraguan harbors',
          ],
          correctIndex: 1,
          skillTags: ['KC', 'HE'],
          difficulty: 2,
          apStandards: ['KC-9.3.II.A'],
          explanation: 'Iran-Contra involved secret arms sales to Iran (under arms embargo) with profits covertly routed to the Contras — explicitly prohibited by the Boland Amendment. This violated both U.S. law and the constitutional separation of powers.',
        },
        {
          id: 'l6_q2',
          type: 'source_based',
          prompt: 'Based on this congressional testimony, what constitutional principle does the speaker argue was violated?',
          source: {
            title: 'Senate Select Committee on the Iran-Contra Affair, 1987',
            author: 'Senator Daniel Inouye (D-Hawaii), Committee Chair',
            date: '1987',
            type: 'government testimony',
            text: '"There are those who argue that even if the Boland Amendment was applicable, it was a constitutional usurpation of executive prerogative... I believe the Framers would have found it incomprehensible that a president could conduct a war, provide weapons to hostile nations, and operate a covert foreign policy — all without the knowledge or authorization of Congress."',
          },
          options: [
            'The president violated the First Amendment by suppressing press coverage',
            'Congress had unconstitutionally restricted presidential war powers',
            'The executive branch violated the constitutional separation of powers by conducting foreign policy without congressional authorization',
            'The CIA had exceeded its charter by operating within the United States',
          ],
          correctIndex: 2,
          skillTags: ['HE', 'ARG'],
          difficulty: 3,
          apStandards: ['KC-9.3.II.A'],
          explanation: 'Inouye argues that the Iran-Contra arrangement violated the constitutional separation of powers — specifically the power of Congress to control appropriations and authorize military action. This is the core constitutional issue of Iran-Contra.',
        },
        {
          id: 'l6_q3',
          type: 'multiple_choice',
          prompt: 'The "Reagan Doctrine" most directly continued which earlier U.S. foreign policy tradition?',
          options: [
            'The Open Door Policy — asserting equal trade access in foreign markets',
            'Wilsonian idealism — promoting democracy through multilateral institutions',
            'The Cold War policy of containment — preventing communist government expansion using proxy forces',
            'Dollar Diplomacy — using economic investment to stabilize Latin American governments',
          ],
          correctIndex: 2,
          skillTags: ['COMP', 'CAUS'],
          difficulty: 2,
          apStandards: ['KC-8.1.II.B'],
          explanation: 'The Reagan Doctrine extended containment by actively supporting anti-communist insurgencies worldwide. Unlike Truman-era containment (which was primarily defensive), the Reagan Doctrine was offensive — attempting to "roll back" existing communist governments using proxy forces.',
        },
        {
          id: 'l6_q4',
          type: 'multiple_choice',
          prompt: 'How did U.S. policy in El Salvador (1981–1992) most directly contradict stated American foreign policy values?',
          options: [
            'The U.S. allied with El Salvador\'s Communist government against the FMLN',
            'The U.S. provided military aid to a government documented committing systematic atrocities, while certifying it for human rights compliance',
            'The U.S. refused all military engagement in El Salvador, allowing the FMLN to advance',
            'The U.S. funded El Salvador\'s guerrilla forces rather than the government',
          ],
          correctIndex: 1,
          skillTags: ['ARG', 'COMP'],
          difficulty: 3,
          apStandards: ['KC-8.1.II.C'],
          explanation: 'The U.S. legally certified El Salvador\'s human rights progress while possessing documentation of systematic atrocities including the El Mozote massacre (1981). This contradiction between stated values and actual practice mirrors the earlier pattern in Guatemala and Chile.',
        },
        {
          id: 'l6_q5',
          type: 'multiple_choice',
          prompt: 'The long-term relationship between 1980s U.S. policy in Central America and 21st-century Central American migration patterns represents which APUSH historical thinking skill?',
          options: [
            'Periodization — identifying when Cold War policy began and ended',
            'Causation — identifying how past policy decisions created conditions leading to later consequences',
            'Contextualization — comparing U.S. policy to Soviet policy in the same period',
            'Argumentation — evaluating whether the Reagan Doctrine succeeded on its own terms',
          ],
          correctIndex: 1,
          skillTags: ['CAUS', 'CCT'],
          difficulty: 3,
          apStandards: ['KC-8.1.II.B', 'KC-8.1.II.C'],
          explanation: 'The destruction of Central American economic and institutional infrastructure in the 1980s — through proxy war, death squads, and economic sabotage — created conditions that produced the migration patterns Americans debate today. This is a direct causal chain across historical periods.',
        },
      ],
      next: null,
    },

  ],
};

export default lesson06;
