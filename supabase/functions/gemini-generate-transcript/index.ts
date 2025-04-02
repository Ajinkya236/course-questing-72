
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";

// Set up CORS headers for browser requests
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
    const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');

    if (!GOOGLE_API_KEY) {
      throw new Error("Missing Google API key. Please add GOOGLE_API_KEY to your Supabase secrets.");
    }

    const { skillName, proficiency } = await req.json();

    if (!skillName) {
      throw new Error("Skill name is required");
    }

    // Generate podcast script using Gemini API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GOOGLE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Create a conversational podcast script between Michael (male) and Sarah (female) discussing ${skillName} at a ${proficiency || "intermediate"} level. 
                Format it exactly as follows with each speaker's name followed by a colon and their dialogue:
                
                Michael: Introduction line here
                Sarah: Response here
                Michael: Next line
                
                The podcast should be informative, engaging, and about 2-3 minutes long when read aloud. 
                Include an introduction, 3-4 key concepts about ${skillName}, and a conclusion with takeaways.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    const geminiData = await geminiResponse.json();
    
    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${JSON.stringify(geminiData)}`);
    }

    // Extract generated text
    const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (!generatedText) {
      throw new Error("Failed to generate podcast script");
    }

    return new Response(
      JSON.stringify({ generatedText }),
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
