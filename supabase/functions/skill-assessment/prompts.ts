
/**
 * Generate the prompt for question generation
 */
export function generateQuestionsPrompt(skill: string, proficiency: string, difficulty: string, contextInfo: string): string {
  return `
You are an expert educational assessment creator. Your task is to create assessment questions for the skill "${skill}" at the "${proficiency}" proficiency level with "${difficulty}" difficulty.

${contextInfo ? `Additional context: ${contextInfo}\n` : ''}

Create a set of 9-10 assessment questions that target different aspects of the skill. Include a variety of question types, such as:
1. Multiple Choice (4 options with one correct answer)
2. True/False
3. Short Answer (text response)
4. Fill in the Blanks
5. Matching Pairs (where appropriate)

For each question:
- Include the question text
- For multiple choice, include 4 options
- Include the correct answer
- Include a brief explanation of why the answer is correct

Make the questions suitable for someone at the ${proficiency} level with ${difficulty} difficulty. The questions should assess both theoretical knowledge and practical application of the skill.

Return the questions in the following JSON format:
\`\`\`json
{
  "questions": [
    {
      "id": 1,
      "type": "multipleChoice",
      "text": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Why Option A is correct"
    },
    // More questions of various types...
  ]
}
\`\`\`

Use appropriate question types based on the content. The difficulty level should be reflected in the complexity of the questions. Questions should be clear, unambiguous, and focused on core aspects of the skill.

The response MUST be valid JSON that can be parsed directly, with no additional text before or after the JSON object.
`;
}

/**
 * Generate the prompt for answer evaluation
 */
export function evaluateAnswerPrompt(skill: string, proficiency: string, question: any, contextInfo: string): string {
  return `
You are an expert educational assessment evaluator. Your task is to evaluate a user's answer to a question about "${skill}" at the "${proficiency}" proficiency level.

${contextInfo ? `Additional context: ${contextInfo}\n` : ''}

Question: ${question.text}
Question Type: ${question.type}
User's Answer: ${question.userAnswer}
Correct Answer: ${question.correctAnswer}

Evaluate the user's answer and provide feedback. Consider:
1. Is the answer correct, partially correct, or incorrect?
2. What specific aspects of the answer are strong or need improvement?
3. What misconceptions might the user have?
4. What specific suggestions can you provide to help the user improve?

Return your evaluation in the following JSON format:
\`\`\`json
{
  "correct": true/false,
  "explanation": "Detailed explanation of why the answer is correct or incorrect",
  "improvement": "Specific areas where the user could improve their understanding",
  "nextSteps": ["Suggestion 1", "Suggestion 2"]
}
\`\`\`

Be fair, educational, and constructive in your evaluation. The focus should be on helping the user improve their understanding of the skill.

The response MUST be valid JSON that can be parsed directly, with no additional text before or after the JSON object.
`;
}

/**
 * Generate the prompt for assessment evaluation
 */
export function evaluateAssessmentPrompt(skill: string, proficiency: string, userAnswers: any[], contextInfo: string): string {
  // Create a text representation of all user answers
  const answersText = userAnswers.map((q, index) => {
    return `
Question ${index + 1}: ${q.text}
Type: ${q.type}
User's Answer: ${q.userAnswer}
Correct Answer: ${q.correctAnswer}
`;
  }).join('\n');

  return `
You are an expert educational assessment evaluator. Your task is to evaluate a user's complete assessment on "${skill}" at the "${proficiency}" proficiency level.

${contextInfo ? `Additional context: ${contextInfo}\n` : ''}

Here are all the user's answers:
${answersText}

Evaluate the user's overall performance and provide comprehensive feedback. Consider:
1. Overall score as a percentage (0-100%)
2. Strengths and weaknesses demonstrated across all questions
3. Specific areas for improvement
4. Suggested next steps for continued learning

Return your evaluation in the following JSON format:
\`\`\`json
{
  "score": 75,
  "feedback": [
    "Strength 1: Details about what the user did well",
    "Weakness 1: Details about an area that needs improvement"
  ],
  "improvements": [
    "Specific concept or skill 1 that needs more focus",
    "Specific concept or skill 2 that needs more focus"
  ],
  "nextSteps": [
    "Suggestion 1 for continued learning",
    "Suggestion 2 for continued learning"
  ]
}
\`\`\`

Be educational, constructive, and specific in your evaluation. The focus should be on helping the user improve their understanding and mastery of the skill.

The response MUST be valid JSON that can be parsed directly, with no additional text before or after the JSON object.
`;
}
