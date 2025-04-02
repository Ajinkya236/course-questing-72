
import { callGeminiAPI, createContextInfo, extractJsonFromResponse } from './gemini.ts';
import { generateQuestionsPrompt, evaluateAnswerPrompt, evaluateAssessmentPrompt } from './prompts.ts';

/**
 * Handles generating assessment questions
 */
export async function handleGenerateQuestions(requestData: any) {
  const { skill, proficiency, difficulty = 'medium', sources = [], mediaFiles = [] } = requestData;
  const model = requestData.model || 'gemini-1.5-flash'; // Default to the faster model
  
  // Validate request parameters
  if (!skill) {
    throw new Error("Skill information is required");
  }
  
  console.log(`Generating questions for skill: ${skill} at ${proficiency} level with ${difficulty} difficulty using ${model}`);
  
  // Process sources and media files to create better context
  const contextInfo = createContextInfo(sources, mediaFiles);
  
  // Generate the prompt for questions
  const prompt = generateQuestionsPrompt(skill, proficiency, difficulty, contextInfo);
  
  try {
    // Call the Gemini API with a timeout
    const generatedText = await callGeminiAPI(prompt, model);
    
    // Extract JSON from the response
    const result = extractJsonFromResponse(generatedText);
    
    // Add error handling for malformed responses
    if (!result.questions || !Array.isArray(result.questions) || result.questions.length === 0) {
      console.error("Invalid response format, questions array missing or empty:", result);
      
      // Return a fallback response with basic questions
      return {
        questions: [
          {
            id: "q1",
            question: `What is the primary focus of ${skill}?`,
            type: "multipleChoice",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A",
            difficulty: difficulty
          },
          {
            id: "q2",
            question: `Describe a practical application of ${skill} at the ${proficiency} level.`,
            type: "shortAnswer",
            difficulty: difficulty
          }
        ]
      };
    }
    
    console.log(`Successfully generated ${result.questions.length} questions`);
    
    return result;
  } catch (error) {
    console.error("Error generating questions:", error);
    
    // Return fallback questions on error
    return {
      questions: [
        {
          id: "fallback1",
          question: `What is ${skill}?`,
          type: "shortAnswer",
          difficulty: difficulty
        },
        {
          id: "fallback2",
          question: `List three key components of ${skill}.`,
          type: "shortAnswer",
          difficulty: difficulty
        }
      ]
    };
  }
}

/**
 * Handles evaluating a single answer
 */
export async function handleEvaluateAnswer(requestData: any) {
  const { skill, proficiency, question, sources = [], mediaFiles = [] } = requestData;
  const model = requestData.model || 'gemini-1.5-flash';
  
  // Validate request parameters
  if (!skill || !question) {
    throw new Error("Skill and question information are required for answer evaluation");
  }
  
  console.log(`Evaluating answer for skill: ${skill} at ${proficiency} level using ${model}`);
  
  // Process sources and media files to create better context
  const contextInfo = createContextInfo(sources, mediaFiles);
  
  // Generate the prompt for answer evaluation
  const prompt = evaluateAnswerPrompt(skill, proficiency, question, contextInfo);
  
  try {
    // Call the Gemini API
    const generatedText = await callGeminiAPI(prompt, model);
    
    // Extract JSON from the response
    return extractJsonFromResponse(generatedText);
  } catch (error) {
    console.error("Error evaluating answer:", error);
    
    // Return a default feedback on error
    return {
      isCorrect: false,
      feedback: "Unable to evaluate your answer at this time. Please try again later.",
      explanation: "There was an error processing your response."
    };
  }
}

/**
 * Handles evaluating an entire assessment
 */
export async function handleEvaluateAssessment(requestData: any) {
  const { skill, proficiency, userAnswers = [], sources = [], mediaFiles = [] } = requestData;
  const model = requestData.model || 'gemini-1.5-flash';
  
  // Validate request parameters
  if (!skill || !userAnswers || !Array.isArray(userAnswers)) {
    throw new Error("Skill and user answers are required for assessment evaluation");
  }
  
  console.log(`Evaluating assessment for skill: ${skill} at ${proficiency} level with ${userAnswers.length} answers using ${model}`);
  
  // Process sources and media files to create better context
  const contextInfo = createContextInfo(sources, mediaFiles);
  
  // Generate the prompt for assessment evaluation
  const prompt = evaluateAssessmentPrompt(skill, proficiency, userAnswers, contextInfo);
  
  try {
    // Call the Gemini API
    const generatedText = await callGeminiAPI(prompt, model);
    
    // Extract JSON from the response
    return extractJsonFromResponse(generatedText);
  } catch (error) {
    console.error("Error evaluating assessment:", error);
    
    // Calculate a basic score based on correct answers
    const correctCount = userAnswers.filter((answer: any) => answer.isCorrect).length;
    const score = Math.round((correctCount / userAnswers.length) * 100);
    
    // Return a default assessment on error
    return {
      score: score,
      feedback: "Assessment evaluation completed with limited feedback due to technical issues.",
      strengths: ["Unable to analyze strengths at this time."],
      weaknesses: ["Unable to analyze weaknesses at this time."],
      recommendations: ["Please try again later for detailed recommendations."]
    };
  }
}
