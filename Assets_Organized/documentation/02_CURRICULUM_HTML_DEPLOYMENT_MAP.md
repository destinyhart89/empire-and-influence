# EMPIRE & INFLUENCE — CURRICULUM / HTML DEPLOYMENT MAP

**Date:** March 24, 2026 (Updated)
**Purpose:** Maps every asset to its lesson, curriculum role, HTML file, and exact in-game placement.
**Update Notes:** Added oppositional newspapers (L1-L4), L3 diplomatic portrait, L8 maps + newspapers.

---

## LESSON 1 — THE CUBA CRISIS (1895–1902)
**HTML File:** `Lesson1_Cuba.html`
**LUT Class:** `lut-early-imperial`
**Advisors:** Economic=Industrial Investor, Security=Naval Strategy Officer, Diplomatic=Anti-Imperialist Senator

### Maps

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Advisor Pairing |
|---|---|---|---|---|---|
| L01_Cuba/maps/L01_MAP_01_Cuba_SugarEconomy_NavalBlockade.png | Opening context hero map | Screen 1 — full-width hero above scenario text | Lesson start (immediate) | All branches | Economic primary, Security secondary |

**Missing:** L01_MAP_02 — USS Maine Explosion in Havana Harbor (Decision Point 2 replacement map)

### Newspapers

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Perspective |
|---|---|---|---|---|---|
| L01_Cuba/newspapers/L01_NEWS_01_ReconcentrationCamps_NYHerald.png | Opening crisis overlay modal | After opening briefing, Screen 1 | First modal after map; blocks input | Pre-decision (moral frame) | U.S. reformist |
| L01_Cuba/newspapers/L01_NEWS_02_USSMaineExplodes_EveningTimes.png | Escalation trigger modal | Decision Point 2 | After Maine event reveal | All paths | U.S. sensational |
| L01_Cuba/newspapers/L01_NEWS_03_WarDeclaredOnSpain_WashGazette.png | Consequence modal | After intervention decision | Military path chosen | Military branch only | U.S. national |
| L01_Cuba/newspapers/L01_NEWS_04_YankisInvadenNuestraIsla_LaVozDeCuba.png | **Counter-perspective modal** | After U.S. action decision | After intervention/occupation outcome | All outcome branches | **Cuban oppositional** — APUSH "Complexity and Perspective" |

### Portraits

| Asset Path | In-Game Function | Screen/Section | Always/Branch |
|---|---|---|---|
| L01_Cuba/portraits/L01_PORT_01_EconomicAdvisor_IndustrialInvestor.png | Role-select card + recurring quote panel | Role Selection Screen + all scenario screens | Always shown |
| L01_Cuba/portraits/L01_PORT_02_SecurityAdvisor_NavalStrategyOfficer.png | Role-select card + recurring quote panel | Role Selection Screen + all scenario screens | Always shown |
| L01_Cuba/portraits/L01_PORT_03_DiplomaticAdvisor_AntiImperialistSenator.png | Role-select card + recurring quote panel | Role Selection Screen + all scenario screens | Always shown |

### Event Cards Used

| Asset Path | Event Chain Position | Trigger |
|---|---|---|
| shared/events/EVT_PoliticalCrisis.png | Chain opener | Scenario start |
| shared/events/EVT_YellowJournalism.png | Chain #2 | After USS Maine decision |
| shared/events/EVT_NavalBlockade.png | Chain #3 (military path) | Military path chosen |
| shared/events/EVT_MilitaryIntervention.png | Chain #4 (military path) | War declared |
| shared/events/EVT_HumanitarianAid.png | Chain #4 (diplomacy path) | Diplomacy path chosen |

---

## LESSON 2 — THE CANAL QUESTION (1901–1914)
**HTML File:** `Lesson2_Panama.html`
**LUT Class:** `lut-early-imperial`
**Advisors:** Economic=Canal Company Lawyer, Security=Expansionist Military Leader, Diplomatic=Secretary of State

### Maps

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Advisor Pairing |
|---|---|---|---|---|---|
| L02_Panama/maps/L02_MAP_01_CanalRoutes_PanamaVsNicaragua.png | Opening route-selection hero map | Screen 1 — full-width hero | Before Decision 1 | All branches | Economic primary, Diplomatic secondary |

**Missing:** L02_MAP_02 — Panama Revolution, USS Nashville (decision point map)

### Newspapers

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Perspective |
|---|---|---|---|---|---|
| L02_Panama/newspapers/L02_NEWS_01_RevoltInPanama_DailyNews.png | Independence decision trigger modal | After revolution event | Intervention path | Intervention branch | U.S. establishment |
| L02_Panama/newspapers/L02_NEWS_02_TroopsSecureCanalZone_BostonGlobe.png | Post-success outcome modal | After treaty/control outcome | Success path | Success branch | U.S. strategic |
| L02_Panama/newspapers/L02_NEWS_03_TraicionEnPanama_ElColombiano.png | **Counter-perspective modal** | After canal zone secured | Post-outcome reflection | All outcome branches | **Colombian oppositional** — APUSH "Complexity and Perspective" |

### Portraits

| Asset Path | In-Game Function | Screen/Section | Always/Branch |
|---|---|---|---|
| L02_Panama/portraits/L02_PORT_01_EconomicAdvisor_CanalCompanyLawyer.png | Role-select + quote panel | Role Selection + all screens | Always |
| L02_Panama/portraits/L02_PORT_02_SecurityAdvisor_ExpansionistMilitaryLeader.png | Role-select + quote panel | Role Selection + all screens | Always |
| L02_Panama/portraits/L02_PORT_03_DiplomaticAdvisor_SecretaryOfState.png | Role-select + quote panel | Role Selection + all screens | Always |

---

## LESSON 3 — BANANA REPUBLICS & BUSINESS POWER (1899–1934)
**HTML File:** `Lesson3_BananaRepublics.html`
**LUT Class:** `lut-early-imperial`
**Advisors:** Economic=Fruit Company Executive, Security=US Marine Officer, Diplomatic=Labor & Reform Advocate ✅

### Maps

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Advisor Pairing |
|---|---|---|---|---|---|
| L03_BananaRepublics/maps/L03_MAP_01_UFCO_LandHoldings_Guatemala.png | Opening context map — corporate holdings | Screen 1 hero | Lesson start | All branches | Economic primary |
| L03_BananaRepublics/maps/L03_MAP_02_UFCO_BananaStrikeRegions.png | Escalation map — labor unrest | Screen 2 (after strike event) | After unrest event | Strike/repression branches | Diplomatic primary |

### Newspapers

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Perspective |
|---|---|---|---|---|---|
| L03_BananaRepublics/newspapers/L03_NEWS_01_TurmoilInGuatemala_WeeklyJournal.png | Labor unrest overlay | During strike phase | After Local Resistance event | Pre-decision | U.S. establishment |
| L03_BananaRepublics/newspapers/L03_NEWS_02_CoupInHonduras_DailyNewsReport.png | Intervention outcome modal | After corporate/military decision | Intervention branch | Intervention outcome | U.S. business-aligned |
| L03_BananaRepublics/newspapers/L03_NEWS_03_YankisArruinanNuestraTierra_LaPrensaGuatemala.png | **Counter-perspective modal** | After UFCO outcome | Post-intervention reflection | All outcome branches | **Guatemalan oppositional** — APUSH "Complexity and Perspective" |

### Portraits

| Asset Path | In-Game Function | Screen/Section | Always/Branch |
|---|---|---|---|
| L03_BananaRepublics/portraits/L03_PORT_01_EconomicAdvisor_FruitCompanyExec.png | Role-select + quote panel | All screens | Always |
| L03_BananaRepublics/portraits/L03_PORT_02_SecurityAdvisor_USMarineOfficer.png | Role-select + quote panel | All screens | Always |
| L03_BananaRepublics/portraits/L03_PORT_03_DiplomaticAdvisor_LaborAndReformAdvocate.png | Role-select + quote panel | All screens | Always ✅ **NEW** — previously MISSING |

### Event Cards Used

| Asset Path | Event Chain Position | Trigger |
|---|---|---|
| shared/events/EVT_ResourceExtraction.png | Chain opener | Scenario start |
| shared/events/EVT_LocalResistance.png | Chain #2 | After extraction consequences |
| shared/events/EVT_NativeUnrest.png | Chain #3 | Escalation |
| shared/events/EVT_MilitaryIntervention.png | Chain #4 (force path) | Military intervention chosen |

---

## LESSON 4 — BIG STICK DIPLOMACY (1904–1934)
**HTML File:** `Lesson4_BigStick.html`
**LUT Class:** `lut-early-imperial`
**Advisors:** Economic=Wall Street Banker, Security=Occupation Officer, Diplomatic=Presidential Policy Advisor

### Maps

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Advisor Pairing |
|---|---|---|---|---|---|
| L04_BigStick/maps/L04_MAP_01_Nicaragua_USMilitaryIntervention.png | Escalation map — repeated intervention | Screen 2 | After doctrine explanation | Intervention branches | Security primary, Diplomatic secondary |
| L04_BigStick/maps/L04_MAP_02_DominicanRepublic_OccupationZones.png | Outcome map — occupation control | Screen 3 | After occupation decision | Occupation-success branches | Security primary, Economic secondary |

**Note:** No opening context map exists for L4. Consider using L04_MAP_01 as the opener or creating a Caribbean Basin overview map.

### Newspapers

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Perspective |
|---|---|---|---|---|---|
| L04_BigStick/newspapers/L04_NEWS_01_MarinesInNicaragua_DailyTelegraph.png | Escalation modal | After troop deployment decision | Escalation branch | U.S. establishment |
| L04_BigStick/newspapers/L04_NEWS_02_USOccupiesDR_Chronicle.png | Enforcement outcome modal | After occupation/customs control | Enforcement branch | U.S. official |
| L04_BigStick/newspapers/L04_NEWS_03_StopUSEmpireBuilding_AntiImperialistRecord.png | **Counter-perspective modal** | After Roosevelt Corollary enforcement | Post-intervention reflection | All outcome branches | **Anti-imperialist oppositional** — APUSH "Complexity and Perspective" |

### Portraits

| Asset Path | In-Game Function | Always/Branch |
|---|---|---|
| L04_BigStick/portraits/L04_PORT_01_EconomicAdvisor_WallStreetBanker.png | Role-select + quote panel | Always |
| L04_BigStick/portraits/L04_PORT_02_SecurityAdvisor_OccupationOfficer.png | Role-select + quote panel | Always |
| L04_BigStick/portraits/L04_PORT_03_DiplomaticAdvisor_PresidentialPolicyAdvisor.png | Role-select + quote panel | Always |

---

## LESSON 5 — COLD WAR COUPS (1954–1973)
**HTML File:** `Lesson5_ColdWarCoups.html`
**LUT Class:** `lut-cold-war`
**Advisors:** Economic=Corporate Strategist, Security=Covert Intelligence Operative (CIA), Diplomatic=Cold War Policy Advisor

### Maps

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Advisor Pairing |
|---|---|---|---|---|---|
| L05_ColdWarCoups/maps/L05_MAP_01_Guatemala_CIA_PBSUCCESS.png | Coup execution map | Screen 3 | After covert action authorized | Covert coup branch only | Security (CIA) primary |
| L05_ColdWarCoups/maps/L05_MAP_02_Chile_AllendeOverthrow_1973.png | Reflection/comparison map | Final reflection screen | After Guatemala outcome | Comparison/reflection | Diplomatic primary |

### Newspapers

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Perspective |
|---|---|---|---|---|---|
| L05_ColdWarCoups/newspapers/L05_NEWS_01_CoupInGuatemala_WeeklyJournal.png | CIA decision outcome modal | After covert action | Covert branch | U.S. establishment |
| L05_ColdWarCoups/newspapers/L05_NEWS_02_CrisisInChile_MorningPost.png | Extended consequence modal | After Guatemala outcome | Reflection/global | International |

**Missing:** L05_NEWS_03 oppositional newspaper — file was generated but found CORRUPT. Quarantined in `uncertain_review/`. Needs re-export from ChatGPT.

### Portraits

| Asset Path | In-Game Function | Always/Branch |
|---|---|---|
| L05_ColdWarCoups/portraits/L05_PORT_01_EconomicAdvisor_CorporateStrategist.png | Role-select + quote panel | Always |
| L05_ColdWarCoups/portraits/L05_PORT_02_SecurityAdvisor_CovertIntelOperative.png | Role-select + quote panel (fedora silhouette, shadow lighting) | Always — persists across 2 extra screens if covert chosen |
| L05_ColdWarCoups/portraits/L05_PORT_03_DiplomaticAdvisor_ColdWarPolicyAdvisor.png | Role-select + quote panel | Always |

### Event Cards Used

| Asset Path | Event Chain Position | Trigger |
|---|---|---|
| shared/events/EVT_BusinessInterests.png | Chain opener | Scenario start |
| shared/events/EVT_PoliticalCrisis.png | Chain #2 | After business pressure |
| shared/events/EVT_CoupDEtat.png | Chain #3 | Player selects covert action |
| shared/events/EVT_TensionsRise.png | Chain #4 | After coup |
| shared/events/EVT_AssassinationPlot.png | Chain #5 | High instability (>60) |

---

## LESSON 6 — THE CONTRA WARS (1981–1992)
**HTML File:** `Lesson6_ContraWars.html`
**LUT Class:** `lut-cold-war`
**Advisors:** Economic=Defense Contractor, Security=Covert Military Advisor, Diplomatic=Human Rights Official

### Maps

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Advisor Pairing |
|---|---|---|---|---|---|
| L06_ContraWars/maps/L06_MAP_01_Nicaragua_ContraOperations.png | Proxy war operations map | After proxy decision | Contra funding/support | Escalation branches | Security primary |

**Missing:** L06_MAP_02 — El Salvador civil war map or second Contra Wars map

### Newspapers

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Perspective |
|---|---|---|---|---|---|
| L06_ContraWars/newspapers/L06_NEWS_01_ContrasStrike_CapitalTimes.png | Proxy war escalation modal | After Contra backing decision | Escalation | U.S. mixed |
| L06_ContraWars/newspapers/L06_NEWS_02_WarInElSalvador_Standard.png | Civil war coverage modal | El Salvador segment | Context/consequence | U.S. critical |

**Missing:** Oppositional newspaper for L6 (no oppositional created for Contra Wars)

### Portraits

| Asset Path | In-Game Function | Always/Branch |
|---|---|---|
| L06_ContraWars/portraits/L06_PORT_01_EconomicAdvisor_DefenseContractor.png | Role-select + quote panel | Always |
| L06_ContraWars/portraits/L06_PORT_02_SecurityAdvisor_CovertMilitaryAdvisor.png | Role-select + quote panel | Always |
| L06_ContraWars/portraits/L06_PORT_03_DiplomaticAdvisor_HumanRightsOfficial.png | Role-select + quote panel | Always |

---

## LESSON 7 — OPERATION JUST CAUSE (1989)
**HTML File:** `Lesson7_Panama1989.html`
**LUT Class:** `lut-cold-war`
**Advisors:** Economic=Trade & Canal Strategist, Security=US Military Commander, Diplomatic=State Dept Official

### Maps

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Advisor Pairing |
|---|---|---|---|---|---|
| L07_Panama1989/maps/L07_MAP_01_Panama_OperationJustCause.png | Invasion operations map | Decision/invasion screen | Invasion chosen | Invasion branch | Security primary |

**Missing:** L07_MAP_02 — Panama City combat zones (second invasion map)

### Newspapers

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Perspective |
|---|---|---|---|---|---|
| L07_Panama1989/newspapers/L07_NEWS_01_InvasionOfPanama_NYRecord.png | Final invasion outcome modal | After invasion decision | Invasion outcome | U.S. national |

**Missing:** L07_NEWS_02 (second newspaper) + oppositional newspaper for L7

### Portraits

| Asset Path | In-Game Function | Always/Branch |
|---|---|---|
| L07_Panama1989/portraits/L07_PORT_01_EconomicAdvisor_TradeCanalStrategist.png | Role-select + quote panel | Always |
| L07_Panama1989/portraits/L07_PORT_02_SecurityAdvisor_USMilitaryCommander.png | Role-select + quote panel (zoom animation on invasion) | Always |
| L07_Panama1989/portraits/L07_PORT_03_DiplomaticAdvisor_StateDeptOfficial.png | Role-select + quote panel | Always |

### Event Cards Used

| Asset Path | Event Chain Position | Trigger |
|---|---|---|
| shared/events/EVT_TensionsRise.png | Chain opener | Scenario start |
| shared/events/EVT_MilitaryIntervention.png | Chain #2 | Invasion decision |
| shared/events/EVT_PoliticalCrisis.png | Chain #3 | Post-invasion consequence |

---

## LESSON 8 — MODERN INTERVENTIONS (2002–2009)
**HTML File:** `Lesson8_ModernInterventions.html`
**LUT Class:** `lut-base` (or reduced cold-war variant)
**Advisors:** Economic=Global Finance Advisor, Security=Intelligence Analyst, Diplomatic=International Relations Advisor

### Maps

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Advisor Pairing |
|---|---|---|---|---|---|
| L08_ModernInterventions/maps/L08_MAP_01_Guatemala_MigrationAndHistoricalRoots.PNG | Opening context map — migration and historical roots | Screen 1 hero | Lesson start | All branches | Diplomatic primary, Economic secondary |
| L08_ModernInterventions/maps/L08_MAP_02_Honduras_ModernInstability.png | Modern instability / legacy map | Screen 2 or Decision Point | After Guatemala context | Escalation/reflection | Security primary |

### Newspapers

| Asset Path | In-Game Function | Screen/Section | Trigger | Branch | Perspective |
|---|---|---|---|---|---|
| L08_ModernInterventions/newspapers/L08_NEWS_01_InfluenciaSecreta_ElFaro.PNG | Modern investigation modal — secret U.S. influence | After policy decision | Post-decision | All branches | Latin American investigative (El Faro) |
| L08_ModernInterventions/newspapers/L08_NEWS_02_ElCostoHumano_ElFaro.png | Human cost reflection modal | After outcome/consequence | Reflection phase | All branches | Latin American investigative (El Faro) |

**Note:** Both L8 newspapers are from Latin American investigative press (El Faro). This is unique among lessons and serves as the culminating counter-perspective for the entire game.

### Portraits

| Asset Path | In-Game Function | Always/Branch |
|---|---|---|
| L08_ModernInterventions/portraits/L08_PORT_01_EconomicAdvisor_GlobalFinanceAdvisor.png | Role-select + quote panel | Always |
| L08_ModernInterventions/portraits/L08_PORT_02_SecurityAdvisor_IntelligenceAnalyst.png | Role-select + quote panel | Always |
| L08_ModernInterventions/portraits/L08_PORT_03_DiplomaticAdvisor_IntlRelationsAdvisor.png | Role-select + quote panel | Always |

### Event Cards Used (Dynamic Rotation)

| Asset Path | Trigger Condition |
|---|---|
| shared/events/EVT_EconomicOpportunity.png | High economic meter |
| shared/events/EVT_ResourceExtraction.png | High economic meter |
| shared/events/EVT_RevolutionSpreads.png | High instability meter |
| shared/events/EVT_PoliticalCrisis.png | High instability meter |
| shared/events/EVT_DiplomaticMission.png | Low reputation meter |
| shared/events/EVT_StrategicAlliance.png | Low reputation meter |
