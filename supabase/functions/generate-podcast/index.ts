
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
    
    // For now, we'll return a mock audio URL and the transcript
    // This way we avoid the timeout issues with actual audio generation
    return new Response(
      JSON.stringify({
        transcript: transcript,
        audioUrl: "https://example.com/mock-podcast.mp3", // Just return a placeholder URL
        mockMode: true // Indicate this is not actual audio
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error generating podcast:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
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
You are an expert in ${skillName} creating a concise educational podcast for learners at the ${proficiency} level.
${skillDescription ? `The skill is described as: ${skillDescription}` : ''}

Write a podcast script of about 5-7 minutes covering:
1. Brief introduction to ${skillName}
2. Key concepts at the ${proficiency} level
3. Practical applications
4. Common challenges and how to overcome them
5. Tips for learning and advancement

The script should be conversational, engaging, and educational. Write it as if it were being spoken by a podcast host.
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
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
          maxOutputTokens: 2048,
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
