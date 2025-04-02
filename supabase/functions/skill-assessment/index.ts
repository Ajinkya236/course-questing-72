
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";
import { corsHeaders } from './utils.ts';
import { handleGenerateQuestions, handleEvaluateAnswer, handleEvaluateAssessment } from './handlers.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const requestData = await req.json();
    const { action = 'generate_questions' } = requestData;
    
    let result;
    
    // Set a timeout for the entire function to prevent infinite hangs
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Function execution timed out")), 45000); // Increased to 45s from 30s
    });
    
    // We'll race our handler against the timeout
    const executeHandler = async () => {
      console.log(`Executing handler for action: ${action}`);
      
      switch (action) {
        case 'generate_questions':
          console.log(`Generating questions for skill: ${requestData.skill} at ${requestData.proficiency} level`);
          return await handleGenerateQuestions(requestData);
          
        case 'evaluate_answer':
          console.log(`Evaluating answer for skill: ${requestData.skill}`);
          return await handleEvaluateAnswer(requestData);
          
        case 'evaluate_assessment':
          console.log(`Evaluating assessment for skill: ${requestData.skill}`);
          return await handleEvaluateAssessment(requestData);
          
        default:
          throw new Error("Invalid action. Supported actions are 'generate_questions', 'evaluate_answer', and 'evaluate_assessment'");
      }
    };
    
    try {
      // Race the handler against the timeout
      result = await Promise.race([executeHandler(), timeoutPromise]);
      console.log(`Handler executed successfully for action: ${action}`);
    } catch (error) {
      console.error("Handler execution error:", error);
      
      // Provide fallback questions if question generation fails
      if (action === 'generate_questions') {
        console.log("Providing fallback questions due to handler error");
        result = generateFallbackQuestions(requestData.skill, requestData.proficiency, requestData.difficulty);
      } else {
        throw error;
      }
    }
    
    // Return the result
    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

// Generate fallback questions if the main question generation fails
function generateFallbackQuestions(skill: string, proficiency: string, difficulty: string = 'medium') {
  console.log(`Generating fallback questions for ${skill} at ${proficiency} level with ${difficulty} difficulty`);
  
  const questions = Array.from({ length: 12 }, (_, i) => {
    const questionId = `q${i+1}`;
    const questionType = i % 4 === 0 ? 'shortAnswer' : 
                        i % 4 === 1 ? 'multipleChoice' : 
                        i % 4 === 2 ? 'trueFalse' : 'fillInBlank';
    
    let question: any = {
      id: questionId,
      type: questionType,
      text: `Question ${i+1} about ${skill} at ${proficiency} level`,
      difficulty: difficulty
    };
    
    if (questionType === 'multipleChoice') {
      question.options = [
        `Option A about ${skill}`,
        `Option B about ${skill}`,
        `Option C about ${skill}`,
        `Option D about ${skill}`
      ];
      question.correctAnswer = question.options[0];
    } else if (questionType === 'trueFalse') {
      question.options = ['True', 'False'];
      question.correctAnswer = 'True';
    } else if (questionType === 'fillInBlank') {
      question.correctAnswer = `answer about ${skill}`;
    }
    
    return question;
  });
  
  return { questions };
}
