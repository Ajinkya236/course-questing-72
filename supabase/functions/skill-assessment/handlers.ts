
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
  
  // Call the Gemini API with a timeout
  const generatedText = await callGeminiAPI(prompt, model);
  
  // Extract JSON from the response
  const result = extractJsonFromResponse(generatedText);
  
  // Ensure we have a valid questions array
  if (!result.questions || !Array.isArray(result.questions)) {
    console.error("Invalid response format, questions array missing:", result);
    throw new Error("Failed to generate valid questions");
  }
  
  console.log(`Successfully generated ${result.questions.length} questions`);
  
  return result;
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
  
  // Call the Gemini API
  const generatedText = await callGeminiAPI(prompt, model);
  
  // Extract JSON from the response
  return extractJsonFromResponse(generatedText);
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
  
  // Call the Gemini API
  const generatedText = await callGeminiAPI(prompt, model);
  
  // Extract JSON from the response
  return extractJsonFromResponse(generatedText);
}
