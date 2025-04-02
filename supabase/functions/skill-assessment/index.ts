
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
      setTimeout(() => reject(new Error("Function execution timed out")), 30000); // Reduced from 50s to 30s
    });
    
    // We'll race our handler against the timeout
    const executeHandler = async () => {
      switch (action) {
        case 'generate_questions':
          return await handleGenerateQuestions(requestData);
          
        case 'evaluate_answer':
          return await handleEvaluateAnswer(requestData);
          
        case 'evaluate_assessment':
          return await handleEvaluateAssessment(requestData);
          
        default:
          throw new Error("Invalid action. Supported actions are 'generate_questions', 'evaluate_answer', and 'evaluate_assessment'");
      }
    };
    
    try {
      // Race the handler against the timeout
      result = await Promise.race([executeHandler(), timeoutPromise]);
    } catch (error) {
      console.error("Handler execution error:", error);
      throw error;
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
