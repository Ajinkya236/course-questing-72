
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
    const { skillName, skillDescription, proficiency } = await req.json();
    
    if (!skillName) {
      throw new Error("Skill name is required");
    }
    
    console.log(`Generating podcast for: ${skillName} at ${proficiency} level`);
    
    // Generate podcast script using Gemini
    const transcript = await generatePodcastTranscript(skillName, skillDescription, proficiency);
    
    // We're skipping audio generation for now and returning just the transcript
    // This will allow us to test the functionality without hitting API limits
    return new Response(
      JSON.stringify({
        transcript: transcript,
        audioUrl: null,
        mockMode: true,
        message: "Podcast transcript generated successfully. Audio will be implemented in a later phase."
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error generating podcast:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

async function generatePodcastTranscript(skillName: string, skillDescription: string, proficiency: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key");
  }
  
  const prompt = `
Generate a 12-20 minute podcast script transcript between two hosts, a male and a female discussing ${skillName} at ${proficiency} level.
${skillDescription ? `The skill is described as: ${skillDescription}` : ''}

The transcript should:
1. Include host names (Mark and Sarah)
2. Cover key concepts of ${skillName} at the ${proficiency} level
3. Discuss practical applications and real-world examples
4. Address common challenges and how to overcome them
5. Share tips for learning and advancing in this skill
6. Be entertaining, valuable, engaging and natural
7. Be formatted clearly with speaker names before their lines

Start with an introduction and welcome, then a structured discussion, and end with a conclusion and call to action.
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
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192, // Increased for longer transcript
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error(`Gemini API error: ${data.error?.message || "Unknown error"}`);
    }

    const transcript = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Sorry, I couldn't generate a podcast transcript.";
    
    return transcript;
  } catch (error) {
    console.error("Error generating transcript:", error);
    throw error;
  }
}
