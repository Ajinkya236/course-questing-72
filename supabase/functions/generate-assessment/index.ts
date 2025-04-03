
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skillName, proficiency, difficulty = "medium" } = await req.json();
    
    if (!skillName) {
      throw new Error("Skill name is required");
    }
    
    if (!proficiency) {
      throw new Error("Proficiency level is required");
    }
    
    console.log(`Generating assessment for: ${skillName} at ${proficiency} level with ${difficulty} difficulty`);
    
    // Generate questions using Gemini 1.5 Pro
    const questions = await generateQuestions(skillName, proficiency, difficulty);
    
    return new Response(
      JSON.stringify({ questions }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error generating assessment:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

async function generateQuestions(skillName: string, proficiency: string, difficulty: string): Promise<any[]> {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key");
  }
  
  const prompt = `
Generate 12 multiple-choice questions for an assessment on ${skillName} at the ${proficiency} proficiency level with ${difficulty} difficulty.

Each question should include:
1. A clear question text
2. Four possible answer options
3. The correct answer
4. A brief explanation of why the answer is correct

Return the questions in the following JSON format:
[
  {
    "question": "Question text here?",
    "type": "multipleChoice",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option that is correct",
    "difficulty": "${difficulty}",
    "explanation": "Explanation of the correct answer"
  },
  ...
]

Ensure all questions are strictly related to ${skillName} at the ${proficiency} level. Make sure difficulty is appropriately calibrated.
For ${difficulty} difficulty:
- Easy: Basic knowledge and fundamentals
- Medium: Applied knowledge and some complexity
- Hard: Advanced concepts and nuanced understanding

All questions MUST be multiple choice only.
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.6,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error(`Gemini API error: ${data.error?.message || "Unknown error"}`);
    }

    // Get the text response from Gemini
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    
    // Find and extract the JSON part
    const jsonMatch = responseText.match(/\[\s*{[\s\S]*}\s*\]/);
    const jsonString = jsonMatch ? jsonMatch[0] : "[]";
    
    // Parse the extracted JSON
    try {
      const questions = JSON.parse(jsonString);
      return questions;
    } catch (parseError) {
      console.error("Error parsing JSON from Gemini response:", parseError);
      console.log("Response text:", responseText);
      throw new Error("Failed to parse question data from Gemini response");
    }
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}
