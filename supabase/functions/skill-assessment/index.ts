
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";

// Set up CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Gemini API configuration
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      throw new Error("Missing Gemini API key. Please add GEMINI_API_KEY to your Supabase secrets.");
    }

    // Parse request body
    const { 
      action = 'generate_questions', 
      skill, 
      proficiency, 
      userAnswers = [],
      sources = [], 
      model = 'gemini-1.5-pro' 
    } = await req.json();

    // Validate request parameters
    if (!skill) {
      throw new Error("Skill information is required");
    }

    // Validate the model
    const validModels = ['gemini-1.5-flash', 'gemini-1.5-pro'];
    const selectedModel = validModels.includes(model) ? model : 'gemini-1.5-pro';

    let prompt = '';
    
    // Prepare prompt based on action
    if (action === 'generate_questions') {
      prompt = `Create an assessment for the skill "${skill}" at the "${proficiency}" level. 
      The assessment should include:
      - 5 multiple choice questions
      - 3 true/false questions 
      - 2 short answer questions
      
      For each question, provide:
      1. The question text
      2. The question type (multipleChoice, trueFalse, shortAnswer)
      3. For multiple choice: 4 options (labeled A, B, C, D)
      4. The correct answer
      
      Format as JSON with this structure:
      {
        "questions": [
          {
            "id": 1,
            "type": "multipleChoice",
            "text": "Question text here",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "Option A"
          },
          ...
        ]
      }`;
    } else if (action === 'evaluate_assessment') {
      prompt = `Evaluate this skill assessment for "${skill}" at the "${proficiency}" level.
      
      User answers:
      ${JSON.stringify(userAnswers, null, 2)}
      
      Additional context from sources:
      ${sources.join('\n')}
      
      Provide:
      1. A score from 0-100
      2. Brief feedback on each answer
      3. Overall assessment summary
      
      Format as JSON:
      {
        "score": 85,
        "feedback": [
          { "questionId": 1, "comment": "Correct answer with good reasoning" },
          ...
        ],
        "summary": "Overall assessment summary..."
      }`;
    } else {
      throw new Error("Invalid action. Supported actions are 'generate_questions' and 'evaluate_assessment'");
    }

    // Create the request to Gemini API
    const GEMINI_API_URL = `${GEMINI_API_BASE_URL}${selectedModel}:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      }),
    });

    // Parse the response
    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error(`Gemini API error: ${data.error?.message || "Unknown error"}`);
    }

    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Sorry, I couldn't generate a response.";

    // Try to extract JSON from the response
    let result;
    try {
      // Look for JSON in the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        result = { rawResponse: generatedText };
      }
    } catch (error) {
      console.error("Error parsing JSON from response:", error);
      result = { rawResponse: generatedText };
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
