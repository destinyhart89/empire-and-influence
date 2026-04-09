/**
 * EMPIRE & INFLUENCE — Lessons Index
 *
 * Central registry of all 8 lessons. This file provides metadata for
 * the lesson selector UI without loading full lesson data.
 * Full lesson JSON is lazy-loaded when a student enters a lesson.
 *
 * Asset paths are relative to the Assets_Organized/ folder.
 */

export const LESSONS = [
  {
    id: 1,
    title: 'The Cuba Crisis',
    subtitle: '1895–1902',
    era: 'early-imperial',
    period: 'Period 7',
    apThemes: ['American and National Identity', 'America in the World'],
    description: 'Should the U.S. intervene in Cuba? Navigate the Spanish-American War through the lens of economic interest, military ambition, and anti-imperialist resistance.',
    advisors: ['Industrial Investor', 'Naval Strategy Officer', 'Anti-Imperialist Senator'],
    mapPreview: 'L01_Cuba/maps/L01_MAP_01_Cuba_SugarEconomy_NavalBlockade.png',
    unlockCondition: null, // Always unlocked (first lesson)
  },
  {
    id: 2,
    title: 'The Canal Question',
    subtitle: '1901–1914',
    era: 'early-imperial',
    period: 'Period 7',
    apThemes: ['Work, Exchange, and Technology', 'America in the World'],
    description: 'Panama or Nicaragua? Decide how the U.S. secures its canal — through negotiation, revolution, or raw power.',
    advisors: ['Canal Company Lawyer', 'Expansionist Military Leader', 'Secretary of State'],
    mapPreview: 'L02_Panama/maps/L02_MAP_01_CanalRoutes_PanamaVsNicaragua.png',
    unlockCondition: { lesson: 1 },
  },
  {
    id: 3,
    title: 'Banana Republics',
    subtitle: '1899–1934',
    era: 'early-imperial',
    period: 'Period 7',
    apThemes: ['Work, Exchange, and Technology', 'Social Structures'],
    description: 'Corporate empires in Central America. Balance labor rights against American business interests in the age of United Fruit.',
    advisors: ['Fruit Company Executive', 'U.S. Marine Officer', 'Labor & Reform Advocate'],
    mapPreview: 'L03_BananaRepublics/maps/L03_MAP_01_UFCO_LandHoldings_Guatemala.png',
    unlockCondition: { lesson: 2 },
  },
  {
    id: 4,
    title: 'Big Stick Diplomacy',
    subtitle: '1904–1934',
    era: 'early-imperial',
    period: 'Period 7',
    apThemes: ['America in the World', 'Politics and Power'],
    description: 'Roosevelt\'s Corollary in action. Enforce U.S. hegemony across the Caribbean through occupation, customs control, and repeated intervention.',
    advisors: ['Wall Street Banker', 'Occupation Officer', 'Presidential Policy Advisor'],
    mapPreview: 'L04_BigStick/maps/L04_MAP_01_Nicaragua_USMilitaryIntervention.png',
    unlockCondition: { lesson: 3 },
  },
  {
    id: 5,
    title: 'Cold War Coups',
    subtitle: '1954–1973',
    era: 'cold-war',
    period: 'Period 8',
    apThemes: ['America in the World', 'Politics and Power'],
    description: 'CIA covert operations in Guatemala and Chile. Decide whether to authorize regime change in the name of anti-communism.',
    advisors: ['Corporate Strategist', 'Covert Intelligence Operative', 'Cold War Policy Advisor'],
    mapPreview: 'L05_ColdWarCoups/maps/L05_MAP_01_Guatemala_CIA_PBSUCCESS.png',
    unlockCondition: { lesson: 4 },
  },
  {
    id: 6,
    title: 'The Contra Wars',
    subtitle: '1981–1992',
    era: 'cold-war',
    period: 'Period 8',
    apThemes: ['America in the World', 'Politics and Power'],
    description: 'Fund proxy wars in Nicaragua and El Salvador. Weigh national security against human rights in Reagan\'s Latin America.',
    advisors: ['Defense Contractor', 'Covert Military Advisor', 'Human Rights Official'],
    mapPreview: 'L06_ContraWars/maps/L06_MAP_01_Nicaragua_ContraOperations.png',
    unlockCondition: { lesson: 5 },
  },
  {
    id: 7,
    title: 'Operation Just Cause',
    subtitle: '1989',
    era: 'cold-war',
    period: 'Period 9',
    apThemes: ['America in the World', 'Politics and Power'],
    description: 'Invade Panama to remove Noriega? Decide whether unilateral military action is justified at the end of the Cold War.',
    advisors: ['Trade & Canal Strategist', 'U.S. Military Commander', 'State Dept Official'],
    mapPreview: 'L07_Panama1989/maps/L07_MAP_01_Panama_OperationJustCause.png',
    unlockCondition: { lesson: 6 },
  },
  {
    id: 8,
    title: 'Modern Interventions',
    subtitle: '2002–2009',
    era: 'base',
    period: 'Period 9',
    apThemes: ['America in the World', 'Migration and Settlement'],
    description: 'The legacy of empire. Confront modern instability, migration, and the long consequences of a century of U.S. intervention.',
    advisors: ['Global Finance Advisor', 'Intelligence Analyst', 'International Relations Advisor'],
    mapPreview: 'L08_ModernInterventions/maps/L08_MAP_01_Guatemala_MigrationAndHistoricalRoots.png',
    unlockCondition: { lesson: 7 },
  },
];

/**
 * Check if a lesson is unlocked based on current student progress.
 */
export function isLessonUnlocked(lessonId, completedLessons) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) return false;
  if (!lesson.unlockCondition) return true; // L1 always unlocked
  return completedLessons.includes(lesson.unlockCondition.lesson);
}
