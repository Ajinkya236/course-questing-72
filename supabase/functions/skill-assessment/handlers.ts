
import { corsHeaders } from './utils.ts';
import { callGeminiAPI, createContextInfo, extractJsonFromResponse } from './gemini.ts';
import { generateQuestionsPrompt, evaluateAnswerPrompt, evaluateAssessmentPrompt } from './prompts.ts';

/**
 * Handles generating assessment questions
 */
export async function handleGenerateQuestions(requestData: any) {
  const { skill, proficiency, difficulty = 'medium', sources = [], mediaFiles = [] } = requestData;
  
  // Validate request parameters
  if (!skill) {
    throw new Error("Skill information is required");
  }
  
  // Process sources and media files to create better context
  const contextInfo = createContextInfo(sources, mediaFiles);
  
  // Generate the prompt for questions
  const prompt = generateQuestionsPrompt(skill, proficiency, difficulty, contextInfo);
  
  // Call the Gemini API
  const generatedText = await callGeminiAPI(prompt);
  
  // Extract JSON from the response
  return extractJsonFromResponse(generatedText);
}

/**
 * Handles evaluating a single answer
 */
export async function handleEvaluateAnswer(requestData: any) {
  const { skill, proficiency, question, sources = [], mediaFiles = [] } = requestData;
  
  // Validate request parameters
  if (!skill || !question) {
    throw new Error("Skill and question information are required for answer evaluation");
  }
  
  // Process sources and media files to create better context
  const contextInfo = createContextInfo(sources, mediaFiles);
  
  // Generate the prompt for answer evaluation
  const prompt = evaluateAnswerPrompt(skill, proficiency, question, contextInfo);
  
  // Call the Gemini API
  const generatedText = await callGeminiAPI(prompt);
  
  // Extract JSON from the response
  return extractJsonFromResponse(generatedText);
}

/**
 * Handles evaluating an entire assessment
 */
export async function handleEvaluateAssessment(requestData: any) {
  const { skill, proficiency, userAnswers = [], sources = [], mediaFiles = [] } = requestData;
  
  // Validate request parameters
  if (!skill || !userAnswers || !Array.isArray(userAnswers)) {
    throw new Error("Skill and user answers are required for assessment evaluation");
  }
  
  // Process sources and media files to create better context
  const contextInfo = createContextInfo(sources, mediaFiles);
  
  // Generate the prompt for assessment evaluation
  const prompt = evaluateAssessmentPrompt(skill, proficiency, userAnswers, contextInfo);
  
  // Call the Gemini API
  const generatedText = await callGeminiAPI(prompt);
  
  // Extract JSON from the response
  return extractJsonFromResponse(generatedText);
}
