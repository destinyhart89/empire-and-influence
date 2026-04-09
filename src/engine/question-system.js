/**
 * EMPIRE & INFLUENCE — Question System
 *
 * Supports 5 APUSH-style question types:
 *   1. Multiple Choice (stimulus-based)
 *   2. Multi-Select
 *   3. Short Response
 *   4. Source-Based Interpretation
 *   5. Cause/Effect Sequencing
 *
 * Every question carries:
 *   - APUSH skill tags
 *   - Difficulty level (1-4)
 *   - Misconception mappings (wrong answers → specific misconceptions)
 *   - Scaffolding hints (per difficulty level)
 *   - AP standards alignment
 *
 * Questions live in lesson data files and are processed by this system.
 * The system handles validation, scoring, feedback, and misconception detection.
 */

import { APUSH_SKILLS, DIFFICULTY } from './skill-tracker.js';

// ═══════════════════════════════════════════════════════════
// QUESTION TYPES
// ═══════════════════════════════════════════════════════════

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE:     'multiple_choice',
  MULTI_SELECT:        'multi_select',
  SHORT_RESPONSE:      'short_response',
  SOURCE_BASED:        'source_based',
  CAUSE_EFFECT:        'cause_effect',
};

// ═══════════════════════════════════════════════════════════
// QUESTION VALIDATION
// ═══════════════════════════════════════════════════════════

/**
 * Validate a question object for completeness and correctness.
 * @param {Object} question - Question data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateQuestion(question) {
  const errors = [];

  if (!question.id) errors.push('Missing question ID');
  if (!question.type) errors.push('Missing question type');
  if (!question.prompt) errors.push('Missing prompt');
  if (!question.skillTags || question.skillTags.length === 0) {
    errors.push('Missing skill tags');
  }
  if (!question.difficulty || question.difficulty < 1 || question.difficulty > 4) {
    errors.push('Invalid difficulty (must be 1-4)');
  }
  if (!question.explanation) errors.push('Missing explanation');

  // Type-specific validation
  switch (question.type) {
    case QUESTION_TYPES.MULTIPLE_CHOICE:
      if (!question.options || question.options.length < 3) {
        errors.push('Multiple choice needs at least 3 options');
      }
      if (question.correctIndex == null) {
        errors.push('Missing correctIndex for multiple choice');
      }
      break;

    case QUESTION_TYPES.MULTI_SELECT:
      if (!question.options || question.options.length < 3) {
        errors.push('Multi-select needs at least 3 options');
      }
      if (!question.correctIndices || question.correctIndices.length === 0) {
        errors.push('Missing correctIndices for multi-select');
      }
      break;

    case QUESTION_TYPES.SHORT_RESPONSE:
      if (!question.rubric) {
        errors.push('Short response needs a rubric');
      }
      break;

    case QUESTION_TYPES.SOURCE_BASED:
      if (!question.source) {
        errors.push('Source-based question needs a source object');
      }
      if (!question.options || question.options.length < 3) {
        errors.push('Source-based needs at least 3 options');
      }
      break;

    case QUESTION_TYPES.CAUSE_EFFECT:
      if (!question.items || question.items.length < 3) {
        errors.push('Cause/effect needs at least 3 items');
      }
      if (!question.correctOrder) {
        errors.push('Missing correctOrder for cause/effect');
      }
      break;
  }

  return { valid: errors.length === 0, errors };
}

// ═══════════════════════════════════════════════════════════
// QUESTION EVALUATION
// ═══════════════════════════════════════════════════════════

/**
 * Evaluate a student's answer to a question.
 *
 * @param {Object} question - Question data
 * @param {*} answer - Student's answer (format depends on question type)
 * @param {number} timeSpent - Time in ms
 * @returns {Object} Evaluation result
 */
export function evaluateAnswer(question, answer, timeSpent = 0) {
  const result = {
    questionId: question.id,
    questionType: question.type,
    skillTags: question.skillTags || [],
    difficulty: question.difficulty || 2,
    correct: false,
    partialCredit: 0,     // 0.0 – 1.0
    feedback: '',
    explanation: question.explanation || '',
    misconceptionId: null,
    misconceptionText: null,
    timeSpent,
  };

  switch (question.type) {
    case QUESTION_TYPES.MULTIPLE_CHOICE:
      result.correct = answer === question.correctIndex;
      result.partialCredit = result.correct ? 1.0 : 0.0;

      // Check for misconception mapping
      if (!result.correct && question.misconceptions) {
        const misconception = question.misconceptions[answer];
        if (misconception) {
          result.misconceptionId = misconception.id;
          result.misconceptionText = misconception.text;
          result.feedback = misconception.feedback || question.explanation;
        }
      }

      if (result.correct) {
        result.feedback = question.correctFeedback || 'Correct!';
      } else if (!result.feedback) {
        result.feedback = question.incorrectFeedback || question.explanation;
      }
      break;

    case QUESTION_TYPES.MULTI_SELECT:
      const correctSet = new Set(question.correctIndices);
      const answerSet = new Set(Array.isArray(answer) ? answer : []);

      // Full credit requires exact match
      const hits = [...answerSet].filter(a => correctSet.has(a)).length;
      const misses = [...answerSet].filter(a => !correctSet.has(a)).length;
      const total = correctSet.size;

      result.partialCredit = Math.max(0, (hits - misses) / total);
      result.correct = result.partialCredit === 1.0;

      if (result.correct) {
        result.feedback = question.correctFeedback || 'Correct — you identified all the right answers!';
      } else if (hits > 0) {
        result.feedback = question.partialFeedback || `You got ${hits} of ${total} correct.`;
      } else {
        result.feedback = question.incorrectFeedback || question.explanation;
      }

      // Misconceptions for specific wrong selections
      if (!result.correct && question.misconceptions) {
        for (const wrongIndex of answerSet) {
          if (!correctSet.has(wrongIndex) && question.misconceptions[wrongIndex]) {
            result.misconceptionId = question.misconceptions[wrongIndex].id;
            result.misconceptionText = question.misconceptions[wrongIndex].text;
            break; // Report first detected misconception
          }
        }
      }
      break;

    case QUESTION_TYPES.SHORT_RESPONSE:
      // Short response is graded by teacher or by keyword matching
      result.correct = null; // Null = pending teacher review
      result.partialCredit = null;

      // Auto-scoring by keyword presence (if rubric includes keywords)
      if (question.rubric?.keywords && answer && typeof answer === 'string') {
        const lowerAnswer = answer.toLowerCase();
        const keywordHits = question.rubric.keywords.filter(kw =>
          lowerAnswer.includes(kw.toLowerCase())
        ).length;
        const totalKeywords = question.rubric.keywords.length;

        if (totalKeywords > 0) {
          result.partialCredit = keywordHits / totalKeywords;
          result.correct = result.partialCredit >= 0.5;
          result.feedback = result.correct
            ? 'Good response — you hit key concepts.'
            : `Your response could be stronger. Consider addressing: ${question.rubric.keywords.filter(kw => !lowerAnswer.includes(kw.toLowerCase())).join(', ')}`;
        }
      }

      // Always store the response for teacher review
      result.studentResponse = answer;
      result.feedback = result.feedback || 'Your response has been recorded. Review the model answer below.';
      break;

    case QUESTION_TYPES.SOURCE_BASED:
      // Same as multiple choice but with source context
      result.correct = answer === question.correctIndex;
      result.partialCredit = result.correct ? 1.0 : 0.0;

      if (!result.correct && question.misconceptions?.[answer]) {
        const m = question.misconceptions[answer];
        result.misconceptionId = m.id;
        result.misconceptionText = m.text;
        result.feedback = m.feedback || question.explanation;
      }

      result.feedback = result.feedback || (result.correct
        ? question.correctFeedback || 'Correct!'
        : question.incorrectFeedback || question.explanation);
      break;

    case QUESTION_TYPES.CAUSE_EFFECT:
      // Check ordering
      const correct = question.correctOrder;
      const studentOrder = Array.isArray(answer) ? answer : [];

      if (studentOrder.length !== correct.length) {
        result.correct = false;
        result.partialCredit = 0;
      } else {
        let correctPositions = 0;
        for (let i = 0; i < correct.length; i++) {
          if (studentOrder[i] === correct[i]) correctPositions++;
        }
        result.partialCredit = correctPositions / correct.length;
        result.correct = result.partialCredit === 1.0;
      }

      if (result.correct) {
        result.feedback = question.correctFeedback || 'You correctly sequenced the cause and effect chain!';
      } else if (result.partialCredit > 0.5) {
        result.feedback = question.partialFeedback || 'Close! Some events are in the right order, but review the sequence.';
      } else {
        result.feedback = question.incorrectFeedback || question.explanation;
      }
      break;
  }

  return result;
}

// ═══════════════════════════════════════════════════════════
// QUESTION SELECTION
// ═══════════════════════════════════════════════════════════

/**
 * Select questions from a pool based on criteria.
 *
 * @param {Array} pool - Available questions
 * @param {Object} criteria - {
 *   count: number,                 // How many to select
 *   targetDifficulty?: number,     // Preferred difficulty level
 *   requiredSkills?: string[],     // Must cover these skills
 *   excludeIds?: string[],         // Skip already-asked questions
 *   mixDifficulty?: boolean,       // Ensure difficulty variety
 *   preferTypes?: string[],        // Preferred question types
 * }
 * @returns {Array} Selected questions
 */
export function selectQuestions(pool, criteria = {}) {
  const {
    count = 5,
    targetDifficulty = null,
    requiredSkills = [],
    excludeIds = [],
    mixDifficulty = true,
    preferTypes = [],
  } = criteria;

  const excludeSet = new Set(excludeIds);
  let candidates = pool.filter(q => !excludeSet.has(q.id));

  // If required skills specified, filter to questions that tag at least one
  if (requiredSkills.length > 0) {
    const skillSet = new Set(requiredSkills);
    candidates = candidates.filter(q =>
      q.skillTags?.some(t => skillSet.has(t))
    );
  }

  // If target difficulty, sort by closeness to target
  if (targetDifficulty != null) {
    candidates.sort((a, b) =>
      Math.abs((a.difficulty || 2) - targetDifficulty) -
      Math.abs((b.difficulty || 2) - targetDifficulty)
    );
  }

  // If prefer types, boost matching questions
  if (preferTypes.length > 0) {
    const typeSet = new Set(preferTypes);
    candidates.sort((a, b) => {
      const aMatch = typeSet.has(a.type) ? 0 : 1;
      const bMatch = typeSet.has(b.type) ? 0 : 1;
      return aMatch - bMatch;
    });
  }

  // Select up to count
  let selected = candidates.slice(0, count);

  // If mixDifficulty, try to ensure at least one easy and one harder
  if (mixDifficulty && selected.length >= 3 && targetDifficulty == null) {
    const hasFundamental = selected.some(q => q.difficulty <= 1);
    const hasProficient = selected.some(q => q.difficulty >= 3);

    if (!hasFundamental) {
      const easy = candidates.find(q => q.difficulty <= 1 && !selected.includes(q));
      if (easy) selected[selected.length - 1] = easy;
    }
    if (!hasProficient) {
      const hard = candidates.find(q => q.difficulty >= 3 && !selected.includes(q));
      if (hard) selected[selected.length - 2] = hard;
    }
  }

  // Ensure required skills are covered
  if (requiredSkills.length > 0) {
    const coveredSkills = new Set();
    for (const q of selected) {
      for (const t of (q.skillTags || [])) coveredSkills.add(t);
    }

    for (const skill of requiredSkills) {
      if (!coveredSkills.has(skill)) {
        // Try to swap in a question covering this skill
        const filler = candidates.find(q =>
          q.skillTags?.includes(skill) && !selected.includes(q)
        );
        if (filler && selected.length >= count) {
          // Replace the last non-essential question
          selected[selected.length - 1] = filler;
        } else if (filler) {
          selected.push(filler);
        }
      }
    }
  }

  return selected;
}

/**
 * Adapt question difficulty based on student's running performance.
 * Used for in-lesson knowledge checks.
 *
 * @param {number} currentDifficulty - Current difficulty
 * @param {Array} recentResults - Last N results [{correct, difficulty}]
 * @returns {number} Adjusted difficulty (1-4)
 */
export function adaptDifficulty(currentDifficulty, recentResults) {
  if (recentResults.length < 2) return currentDifficulty;

  const last3 = recentResults.slice(-3);
  const correctCount = last3.filter(r => r.correct).length;

  // 3/3 correct → increase
  if (correctCount >= 3 && currentDifficulty < 4) return currentDifficulty + 1;

  // 0/3 or 1/3 correct → decrease
  if (correctCount <= 1 && currentDifficulty > 1) return currentDifficulty - 1;

  return currentDifficulty;
}

// ═══════════════════════════════════════════════════════════
// QUESTION SCHEMA DOCUMENTATION
// ═══════════════════════════════════════════════════════════

/**
 * @typedef {Object} Question
 * @property {string} id - Unique question identifier
 * @property {string} type - One of QUESTION_TYPES
 * @property {string} prompt - The question text (HTML supported)
 * @property {string[]} skillTags - Array of APUSH_SKILLS values
 * @property {number} difficulty - 1-4 (DIFFICULTY enum)
 * @property {string[]} apStandards - AP standards alignment codes
 * @property {string} explanation - Model answer / explanation
 * @property {string} [context] - Additional context (e.g., stimulus text)
 * @property {string} [correctFeedback] - Shown on correct answer
 * @property {string} [incorrectFeedback] - Shown on wrong answer
 * @property {string} [partialFeedback] - Shown on partial credit
 * @property {string} [scaffoldHint] - Hint shown if scaffolding is active
 *
 * === Type-specific fields ===
 *
 * Multiple Choice:
 * @property {string[]} options - Answer options
 * @property {number} correctIndex - Index of correct option
 * @property {Object} [misconceptions] - Map of option index → { id, text, feedback }
 *
 * Multi-Select:
 * @property {string[]} options - Answer options
 * @property {number[]} correctIndices - Indices of all correct options
 * @property {Object} [misconceptions] - Map of option index → { id, text, feedback }
 *
 * Short Response:
 * @property {Object} rubric - { keywords: string[], criteria: string, maxScore: number }
 *
 * Source-Based:
 * @property {Object} source - { title, author, date, text, type, assetPath }
 * @property {string[]} options
 * @property {number} correctIndex
 *
 * Cause/Effect:
 * @property {Object[]} items - { id, text } shuffled items
 * @property {string[]} correctOrder - Correct order of item IDs
 */
