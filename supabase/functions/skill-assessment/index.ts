
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
    
    // Handle the request based on the action
    switch (action) {
      case 'generate_questions':
        result = await handleGenerateQuestions(requestData);
        break;
        
      case 'evaluate_answer':
        result = await handleEvaluateAnswer(requestData);
        break;
        
      case 'evaluate_assessment':
        result = await handleEvaluateAssessment(requestData);
        break;
        
      default:
        throw new Error("Invalid action. Supported actions are 'generate_questions', 'evaluate_answer', and 'evaluate_assessment'");
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
