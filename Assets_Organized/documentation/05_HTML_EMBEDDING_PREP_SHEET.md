# EMPIRE & INFLUENCE — HTML EMBEDDING PREP SHEET

**Date:** March 24, 2026 (Updated)
**Purpose:** Lesson-by-lesson checklist of which asset paths will be referenced by each HTML file.
**Base asset path:** `Assets_Organized/` (relative to HTML file location)
**Update Notes:** Added oppositional newspapers (L1-L4), L3 portrait, L8 maps + newspapers. All counter-perspective papers tagged for APUSH compliance.

---

## LESSON 1 — Lesson1_Cuba.html

### CSS
- [ ] Apply class `lut-early-imperial` to all `.asset-frame` wrappers

### Maps
- [ ] **Screen 1 (Opening):** `L01_Cuba/maps/L01_MAP_01_Cuba_SugarEconomy_NavalBlockade.png` — full-width hero, above scenario text
  - Hotspots: sugar zones, naval vessels, Havana/coast
  - Animation: light wave motion / blockade ring
- [ ] **Decision Point 2:** ⚠️ MISSING L01_MAP_02 — placeholder needed for USS Maine explosion map swap

### Newspapers (modal overlays, 900×1200, 3:4 portrait)
- [ ] **After opening briefing:** `L01_Cuba/newspapers/L01_NEWS_01_ReconcentrationCamps_NYHerald.png` — blocks input until dismissed
- [ ] **After Maine event (Decision 2):** `L01_Cuba/newspapers/L01_NEWS_02_USSMaineExplodes_EveningTimes.png` — slight shake on entry
- [ ] **After military intervention choice:** `L01_Cuba/newspapers/L01_NEWS_03_WarDeclaredOnSpain_WashGazette.png` — outcome modal
- [ ] **After U.S. action outcome (counter-perspective):** `L01_Cuba/newspapers/L01_NEWS_04_YankisInvadenNuestraIsla_LaVozDeCuba.png` — **OPPOSITIONAL** modal. Show after all outcome branches. Cuban press perspective. APUSH "Complexity and Perspective" compliance. Same modal system (centered, dim 40%, scale-in).

### Portraits (600×800, portrait orientation)
- [ ] **Role-Select Screen:** All three side-by-side
  - `L01_Cuba/portraits/L01_PORT_01_EconomicAdvisor_IndustrialInvestor.png`
  - `L01_Cuba/portraits/L01_PORT_02_SecurityAdvisor_NavalStrategyOfficer.png`
  - `L01_Cuba/portraits/L01_PORT_03_DiplomaticAdvisor_AntiImperialistSenator.png`
- [ ] **Recurring quote panels:** Selected advisor = PRIMARY (center, 1.2x, gold highlight); others = SECONDARY (side, 40% opacity)
- [ ] **Screen 2 (Reconcentration):** Diplomatic primary, Economic secondary, Security hidden
- [ ] **If intervention chosen:** switchPrimary('security')

### Event Cards
- [ ] `shared/events/EVT_PoliticalCrisis.png` — scenario start
- [ ] `shared/events/EVT_YellowJournalism.png` — after Maine decision
- [ ] `shared/events/EVT_NavalBlockade.png` — military path
- [ ] `shared/events/EVT_MilitaryIntervention.png` — war declared (military path)
- [ ] `shared/events/EVT_HumanitarianAid.png` — diplomacy path

---

## LESSON 2 — Lesson2_Panama.html

### CSS
- [ ] Apply class `lut-early-imperial`

### Maps
- [ ] **Screen 1 (Opening):** `L02_Panama/maps/L02_MAP_01_CanalRoutes_PanamaVsNicaragua.png` — full-width hero
  - Hotspots: Panama route, Nicaragua route, Caribbean shipping lane
  - Animation: pulsing route lines on hover
- [ ] **Decision Point (Revolution):** ⚠️ MISSING L02_MAP_02

### Newspapers
- [ ] **After revolution decision:** `L02_Panama/newspapers/L02_NEWS_01_RevoltInPanama_DailyNews.png`
- [ ] **After treaty/control outcome:** `L02_Panama/newspapers/L02_NEWS_02_TroopsSecureCanalZone_BostonGlobe.png`
- [ ] **After canal zone secured (counter-perspective):** `L02_Panama/newspapers/L02_NEWS_03_TraicionEnPanama_ElColombiano.png` — **OPPOSITIONAL** modal. Colombian press. Show after outcome. APUSH "Complexity and Perspective" compliance.

### Portraits
- [ ] **Role-Select:** all three at `L02_Panama/portraits/L02_PORT_0[1-3]_*.png`
- [ ] Economic (Canal Company Lawyer) = primary on opening; Diplomatic secondary

---

## LESSON 3 — Lesson3_BananaRepublics.html

### CSS
- [ ] Apply class `lut-early-imperial`

### Maps
- [ ] **Screen 1 (Opening):** `L03_BananaRepublics/maps/L03_MAP_01_UFCO_LandHoldings_Guatemala.png`
  - Hotspots: UFCO zone, U.S. flag marker, rail/export
  - Animation: highlight sweep over holdings
- [ ] **Screen 2 (Strike):** `L03_BananaRepublics/maps/L03_MAP_02_UFCO_BananaStrikeRegions.png`
  - Animation: red/amber pulsing over strike regions

### Newspapers
- [ ] **Strike phase:** `L03_BananaRepublics/newspapers/L03_NEWS_01_TurmoilInGuatemala_WeeklyJournal.png`
- [ ] **After intervention:** `L03_BananaRepublics/newspapers/L03_NEWS_02_CoupInHonduras_DailyNewsReport.png`
- [ ] **After UFCO outcome (counter-perspective):** `L03_BananaRepublics/newspapers/L03_NEWS_03_YankisArruinanNuestraTierra_LaPrensaGuatemala.png` — **OPPOSITIONAL** modal. Guatemalan press. Show after intervention outcome. APUSH "Complexity and Perspective" compliance.

### Portraits
- [ ] **Role-Select Screen:** All three side-by-side ✅ Complete
  - `L03_BananaRepublics/portraits/L03_PORT_01_EconomicAdvisor_FruitCompanyExec.png`
  - `L03_BananaRepublics/portraits/L03_PORT_02_SecurityAdvisor_USMarineOfficer.png`
  - `L03_BananaRepublics/portraits/L03_PORT_03_DiplomaticAdvisor_LaborAndReformAdvocate.png` ✅ **NEW**

### Event Cards
- [ ] `EVT_ResourceExtraction.png` → `EVT_LocalResistance.png` → `EVT_NativeUnrest.png` → `EVT_MilitaryIntervention.png`

---

## LESSON 4 — Lesson4_BigStick.html

### CSS
- [ ] Apply class `lut-early-imperial`

### Maps
- [ ] **Screen 2 (Escalation):** `L04_BigStick/maps/L04_MAP_01_Nicaragua_USMilitaryIntervention.png`
  - Animation: sequential highlight of intervention points
- [ ] **Screen 3 (Outcome):** `L04_BigStick/maps/L04_MAP_02_DominicanRepublic_OccupationZones.png`
  - Animation: orange control-zone overlay fade-in

### Newspapers
- [ ] **After deployment:** `L04_BigStick/newspapers/L04_NEWS_01_MarinesInNicaragua_DailyTelegraph.png`
- [ ] **After occupation:** `L04_BigStick/newspapers/L04_NEWS_02_USOccupiesDR_Chronicle.png`
- [ ] **After Roosevelt Corollary enforcement (counter-perspective):** `L04_BigStick/newspapers/L04_NEWS_03_StopUSEmpireBuilding_AntiImperialistRecord.png` — **OPPOSITIONAL** modal. Anti-imperialist press. Show after intervention outcome. APUSH "Complexity and Perspective" compliance.

### Portraits
- [ ] All three at `L04_BigStick/portraits/L04_PORT_0[1-3]_*.png` ✅ Complete

---

## LESSON 5 — Lesson5_ColdWarCoups.html

### CSS
- [ ] Apply class `lut-cold-war`

### Maps
- [ ] **Screen 3 (Coup):** `L05_ColdWarCoups/maps/L05_MAP_01_Guatemala_CIA_PBSUCCESS.png` — covert branch only
  - Animation: fast directional arrows, classified marker
- [ ] **Final Reflection:** `L05_ColdWarCoups/maps/L05_MAP_02_Chile_AllendeOverthrow_1973.png`
  - Animation: slow comparative highlight

### Newspapers
- [ ] **After covert action:** `L05_ColdWarCoups/newspapers/L05_NEWS_01_CoupInGuatemala_WeeklyJournal.png` — darkened background, classified stamp overlay
- [ ] **After Guatemala outcome:** `L05_ColdWarCoups/newspapers/L05_NEWS_02_CrisisInChile_MorningPost.png` — reflection modal
- [ ] **Counter-perspective:** ⚠️ MISSING — L05_NEWS_03 was generated but file is CORRUPT. Placeholder slot needed. Would be Haitian dignity / Le Nouvelliste oppositional.

### Portraits
- [ ] All three at `L05_ColdWarCoups/portraits/L05_PORT_0[1-3]_*.png` ✅ Complete
- [ ] **Special rule:** CIA Operative (PORT_02) uses fedora silhouette + shadow lighting
- [ ] **Special rule:** If covert action chosen, CIA portrait persists across next 2 screens, background darkens 10%

### Event Cards
- [ ] `EVT_BusinessInterests.png` → `EVT_PoliticalCrisis.png` → `EVT_CoupDEtat.png` → `EVT_TensionsRise.png` → `EVT_AssassinationPlot.png`

---

## LESSON 6 — Lesson6_ContraWars.html

### CSS
- [ ] Apply class `lut-cold-war`

### Maps
- [ ] **Proxy operations:** `L06_ContraWars/maps/L06_MAP_01_Nicaragua_ContraOperations.png`
- [ ] ⚠️ MISSING: L06_MAP_02 (El Salvador / second map)

### Newspapers
- [ ] **After Contra decision:** `L06_ContraWars/newspapers/L06_NEWS_01_ContrasStrike_CapitalTimes.png`
- [ ] **El Salvador segment:** `L06_ContraWars/newspapers/L06_NEWS_02_WarInElSalvador_Standard.png`
- [ ] **Counter-perspective:** ⚠️ MISSING — no oppositional newspaper created for L6

### Portraits
- [ ] All three at `L06_ContraWars/portraits/L06_PORT_0[1-3]_*.png` ✅ Complete

---

## LESSON 7 — Lesson7_Panama1989.html

### CSS
- [ ] Apply class `lut-cold-war`

### Maps
- [ ] **Invasion decision:** `L07_Panama1989/maps/L07_MAP_01_Panama_OperationJustCause.png`
  - Animation: explosion map + security advisor zoom
- [ ] ⚠️ MISSING: L07_MAP_02 (Panama City combat zones)

### Newspapers
- [ ] **After invasion:** `L07_Panama1989/newspapers/L07_NEWS_01_InvasionOfPanama_NYRecord.png`
- [ ] ⚠️ MISSING: L07_NEWS_02 (second newspaper) + oppositional newspaper

### Portraits
- [ ] All three at `L07_Panama1989/portraits/L07_PORT_0[1-3]_*.png` ✅ Complete
- [ ] **Special rule:** Military Commander dialogue: "Speed and force will ensure success."
- [ ] **If invade:** Security advisor zoom animation

### Event Cards
- [ ] `EVT_TensionsRise.png` → `EVT_MilitaryIntervention.png` → `EVT_PoliticalCrisis.png`

---

## LESSON 8 — Lesson8_ModernInterventions.html

### CSS
- [ ] Apply class `lut-base` only (or reduced cold-war variant)

### Maps
- [ ] **Screen 1 (Opening):** `L08_ModernInterventions/maps/L08_MAP_01_Guatemala_MigrationAndHistoricalRoots.PNG` — full-width hero, modern context
  - Hotspots: migration routes, historical intervention sites, modern instability zones
  - Animation: timeline fade showing historical roots → modern consequences
- [ ] **Screen 2 / Decision Point:** `L08_ModernInterventions/maps/L08_MAP_02_Honduras_ModernInstability.png` — legacy of intervention map
  - Hotspots: gang territory, migration corridors, U.S. policy influence zones
  - Animation: overlay showing correlation between past intervention and current instability

### Newspapers
- [ ] **After policy decision:** `L08_ModernInterventions/newspapers/L08_NEWS_01_InfluenciaSecreta_ElFaro.PNG` — Latin American investigative perspective (El Faro). Secret U.S. influence exposé.
- [ ] **After outcome/reflection:** `L08_ModernInterventions/newspapers/L08_NEWS_02_ElCostoHumano_ElFaro.png` — Latin American investigative perspective (El Faro). Human cost reflection. Serves as culminating counter-perspective for entire game.

**Note:** Both L8 newspapers are from Latin American investigative press — unique among lessons for having no U.S. perspective papers. This is intentional: L8 represents the modern era where Latin American voices lead the narrative.

### Portraits
- [ ] All three at `L08_ModernInterventions/portraits/L08_PORT_0[1-3]_*.png` ✅ Complete
- [ ] **Dynamic rule:** If economicInfluence > 70 → economic advisor default primary
- [ ] **Dynamic rule:** If globalReputation < 40 → diplomatic interrupt every decision

### Event Cards (Dynamic Rotation based on meter state)
- [ ] High economic → `EVT_EconomicOpportunity.png`, `EVT_ResourceExtraction.png`
- [ ] High instability → `EVT_RevolutionSpreads.png`, `EVT_PoliticalCrisis.png`
- [ ] Low reputation → `EVT_DiplomaticMission.png`, `EVT_StrategicAlliance.png`

---

## SHARED IMPLEMENTATION NOTES

### Newspaper Modal Standards
- Size: 900×1200px (3:4 portrait)
- Centered, background dim 40%
- Animation: scale-in 0.95→1.0, 180ms
- Dismiss: ESC or click
- Max 1 modal at a time; queue next with 300-600ms delay
- CSS classes: `.news-modal`, `.news-header`, `.news-body`

### Oppositional Newspaper Modal Standards
- Same dimensions and animation as standard newspapers
- **Additional CSS class:** `.news-modal.oppositional` (for potential distinct border/label)
- **Placement rule:** Always shown AFTER all U.S. perspective papers in the same lesson
- **Label:** Consider a subtle "Counter-Perspective" or "Perspectiva Alternativa" header label
- **APUSH tag:** Each oppositional paper satisfies the "Complexity and Perspective" standard

### Advisor Portrait Standards
- Size: 600×800px (portrait)
- PRIMARY: center, 1.2x scale, gold highlight
- SECONDARY: side positions, 40% opacity
- INTERRUPT: slides in with animation, overrides UI

### Map Standards
- Size: 1200×900px (4:3 landscape)
- Placement: full-width hero at top of scene
- Overlay: subtle fade-in; animated overlays after 250-500ms
- Hotspots: gold outline on hover, short tooltip, pulse on first exposure
- Accessibility: every hotspot needs text equivalent

### LUT System
- All asset wrappers use `.asset-frame` + `.lut-base`
- L1-L5: add `.lut-early-imperial`
- L6-L7: add `.lut-cold-war`
- L8: `.lut-base` only
- NEVER apply LUT to HUD text, buttons, or meter labels
