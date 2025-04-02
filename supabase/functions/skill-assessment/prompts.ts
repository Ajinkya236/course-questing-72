
/**
 * Generates the prompt for question generation
 */
export function generateQuestionsPrompt(
  skill: string, 
  proficiency: string, 
  difficulty: string, 
  contextInfo: string
): string {
  return `Create a comprehensive assessment for the skill "${skill}" at the "${proficiency}" level. The assessment should have ${difficulty} difficulty.
  
Guidelines for difficulty levels:
- easy: Questions should test basic understanding and fundamentals. Include more straightforward multiple choice questions and true/false statements. Provide more context in questions.
- medium: Questions should test application of concepts and deeper understanding. Include a mix of question types. 
- hard: Questions should challenge even skilled individuals. Include questions requiring synthesis, analysis, and edge cases. Make multiple choice options more nuanced.

The assessment should include a variety of question types including:
- 5-7 multiple choice questions
- 3-5 true/false questions 
- 2-4 short answer questions
- 1-2 fill in the blanks questions

${contextInfo ? `Use this context information to create relevant questions that test true understanding:\n${contextInfo}\n` : ''}

For each question, provide:
1. A unique numerical id
2. The question text that's clear and specific
3. The question type (multipleChoice, trueFalse, shortAnswer, fillInBlanks)
4. For multiple choice: exactly 4 options labeled A, B, C, D
5. The correct answer
6. A brief explanation of why the answer is correct

The questions should test different cognitive levels: knowledge recall, comprehension, application, analysis, evaluation, and creation where appropriate.

Format as JSON with this structure:
{
  "questions": [
    {
      "id": 1,
      "type": "multipleChoice",
      "text": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Brief explanation why Option A is correct"
    },
    {
      "id": 2,
      "type": "trueFalse",
      "text": "Statement to evaluate as true or false",
      "options": ["True", "False"],
      "correctAnswer": "True",
      "explanation": "Brief explanation why this is true"
    },
    {
      "id": 3,
      "type": "shortAnswer",
      "text": "Question requiring a short answer",
      "correctAnswer": "Expected answer or key points",
      "explanation": "Explanation of what makes a good answer"
    },
    {
      "id": 4,
      "type": "fillInBlanks",
      "text": "Fill in the blank: _____",
      "correctAnswer": "Expected answer",
      "explanation": "Explanation of the correct answer"
    }
  ]
}

Make sure all questions are directly relevant to testing proficiency in ${skill} at the ${proficiency} level with ${difficulty} difficulty. BE SURE TO RETURN ONLY VALID JSON THAT CAN BE PARSED.`;
}

/**
 * Generates the prompt for evaluating a single answer
 */
export function evaluateAnswerPrompt(
  skill: string, 
  proficiency: string, 
  question: any, 
  contextInfo: string
): string {
  return `Evaluate this single answer for a question about "${skill}" at the "${proficiency}" level.
  
Question ID: ${question.id}
Question Type: ${question.type}
Question Text: ${question.text}
User's Answer: ${question.userAnswer}
Correct Answer: ${question.correctAnswer}

${contextInfo ? `Additional context that may be relevant for evaluation:\n${contextInfo}\n` : ''}

Provide:
1. Whether the answer is correct (true/false)
2. A detailed explanation of why the answer is correct or incorrect
3. If incorrect, specific points for improvement
4. Suggestions for next steps or additional learning resources

Format as JSON using this exact structure:
{
  "correct": false,
  "explanation": "Detailed explanation of why the answer is incorrect or correct...",
  "improvement": "Specific point for improvement if answer is incorrect",
  "nextSteps": ["Suggestion 1", "Suggestion 2"]
}

BE SURE TO RETURN ONLY VALID JSON THAT CAN BE PARSED.
Be thorough, helpful, and constructive in your feedback. Focus on helping the learner understand, not just telling them they're wrong.`;
}

/**
 * Generates the prompt for evaluating an entire assessment
 */
export function evaluateAssessmentPrompt(
  skill: string, 
  proficiency: string, 
  userAnswers: any[], 
  contextInfo: string
): string {
  return `Evaluate this skill assessment for "${skill}" at the "${proficiency}" level.
  
User answers:
${JSON.stringify(userAnswers, null, 2)}

${contextInfo ? `Additional context and sources that may be relevant for evaluation:\n${contextInfo}\n` : ''}

Provide:
1. A score from 0-100 (the passing rate is 80%)
2. Detailed feedback on each answer, explaining what was correct or incorrect
3. Overall assessment summary with specific areas for improvement and next steps
4. Personalized learning recommendations

Format as JSON using this exact structure:
{
  "score": 85,
  "feedback": [
    { 
      "questionId": 1, 
      "correct": true,
      "comment": "Detailed explanation of why this answer is correct and what concepts the learner demonstrated understanding of." 
    },
    { 
      "questionId": 2, 
      "correct": false,
      "comment": "Detailed explanation of why this answer is incorrect, including the misconception and how to correct it." 
    }
  ],
  "summary": "Comprehensive assessment summary with strengths and weaknesses...",
  "improvements": ["Specific area 1 to focus on", "Specific area 2 to improve"],
  "nextSteps": ["Specific resource 1 to check out", "Practice exercise 2 to try"],
  "passed": true
}

BE SURE TO RETURN ONLY VALID JSON THAT CAN BE PARSED. The structure MUST follow the exact format shown above.
Be thorough, detailed, and constructive in your evaluation. Provide structured, helpful, and personalized feedback.`;
}
