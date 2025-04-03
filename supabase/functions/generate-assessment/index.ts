
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Gemini API configuration
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { skillName, proficiency = "Knowledge" } = await req.json();
    
    // Validate request parameters
    if (!skillName) {
      throw new Error("Skill name is required");
    }
    
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      throw new Error("Missing Gemini API key. Please add GEMINI_API_KEY to your Supabase secrets.");
    }
    
    console.log(`Generating assessment questions for ${skillName} at ${proficiency} level using Gemini 1.5 Pro`);
    
    // Set a timeout for the API call
    const timeout = 30000; // 30 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      // Prepare prompt for Gemini
      const prompt = `
      Generate a skill assessment for ${skillName} at the ${proficiency} level.
      
      Please create a set of 12 multiple-choice questions that evaluate proficiency in ${skillName}.
      
      Follow these guidelines:
      1. Each question should have 4 options with exactly one correct answer
      2. Questions should be varied in difficulty but appropriate for the ${proficiency} level
      3. Include both basic concept questions and application-oriented questions
      4. Questions should be clear, concise, and focused on practical understanding
      
      Format your response strictly as a JSON object with this structure:
      {
        "questions": [
          {
            "id": "q1",
            "question": "Question text goes here?",
            "type": "multipleChoice",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "Option that is correct",
            "explanation": "Brief explanation of why this answer is correct"
          },
          ...more questions...
        ]
      }
      
      Return ONLY the JSON object with no other text.
      `;
      
      // Call Gemini API with timeout
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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
            temperature: 0.2,
            maxOutputTokens: 8192,
          }
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || "Unknown API error"}`);
      }
      
      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // Extract JSON from the response
      try {
        // Find JSON object in the response
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const assessmentData = JSON.parse(jsonMatch[0]);
          
          // Validate the structure
          if (!assessmentData.questions || !Array.isArray(assessmentData.questions)) {
            throw new Error("Invalid response format from Gemini API");
          }
          
          // Return the questions
          return new Response(
            JSON.stringify(assessmentData),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200 
            }
          );
        } else {
          throw new Error("Could not extract valid JSON from Gemini response");
        }
      } catch (parseError) {
        console.error("Error parsing Gemini response:", parseError);
        throw new Error("Failed to parse assessment data from response");
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Check if it's a timeout error
      if (fetchError.name === 'AbortError') {
        console.log("API call timed out, generating fallback questions");
        throw new Error("API call timed out after 30 seconds");
      }
      
      throw fetchError;
    }
  } catch (error) {
    console.error("Error:", error.message);
    
    // Generate fallback questions if there's an error
    const fallbackQuestions = {
      questions: Array.from({ length: 12 }).map((_, i) => ({
        id: `q${i+1}`,
        question: `Sample question ${i+1} about ${error.message.includes('skillName') ? 'this skill' : error.message.includes('skillName') || ''}?`,
        type: "multipleChoice",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
        explanation: "This is a fallback question as there was an error generating the real assessment."
      }))
    };
    
    return new Response(
      JSON.stringify({ 
        questions: fallbackQuestions.questions,
        error: error.message,
        fallback: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});
