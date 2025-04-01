
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
const TEXT_TO_SPEECH_API_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";

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
      skillName, 
      skillDescription = '', 
      proficiencyLevel = 'Awareness'
    } = await req.json();

    // Validate request parameters
    if (!skillName) {
      throw new Error("Skill name is required");
    }

    // Create podcast script prompt
    const podcastPrompt = `
      Create a conversational podcast script between two hosts named Michael (male) and Sarah (female) discussing the skill "${skillName}" at the "${proficiencyLevel}" level.
      
      Additional context about the skill: ${skillDescription}

      Requirements:
      1. The podcast should be engaging, informative, and around 3-5 minutes when read aloud.
      2. Start with a brief introduction where Michael and Sarah introduce themselves and the topic.
      3. Follow a clear structure with an introduction, 3-4 main discussion points, and a conclusion.
      4. Include some light banter and personal anecdotes to keep it conversational and engaging.
      5. End with practical next steps for listeners interested in developing this skill.
      6. Format it with clear speaker indicators (Michael: and Sarah:).
      7. IMPORTANT: Strictly use only "Michael:" and "Sarah:" as speaker labels.
      8. Each segment from a speaker should be relatively short (1-3 sentences max) to create a natural back-and-forth conversation.

      Title your podcast: "Skill Spotlight: ${skillName}"
    `;

    console.log("Sending podcast script request to Gemini API");

    // Generate the podcast script using Gemini API
    const geminiResponse = await fetch(`${GEMINI_API_BASE_URL}gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: podcastPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    // Parse the Gemini response
    const geminiData = await geminiResponse.json();

    // Extract the generated script
    const generatedScript = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Unable to generate podcast script.";

    console.log("Podcast script generated successfully");
    
    // Parse the script into segments for text-to-speech
    const scriptSegments = parseScript(generatedScript);
    
    // Generate audio for each segment
    const audioPromises = scriptSegments.map(segment => 
      generateSpeech(segment.text, segment.speaker === "Michael" ? "en-US-Neural2-D" : "en-US-Neural2-F")
    );
    
    const audioResults = await Promise.all(audioPromises);
    
    // Return the result
    return new Response(
      JSON.stringify({ 
        script: generatedScript,
        audioContent: audioResults.join('') 
      }),
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

// Function to parse the script into speaker segments
function parseScript(script: string) {
  const lines = script.split('\n').filter(line => line.trim() !== '');
  const segments = [];
  
  for (const line of lines) {
    if (line.startsWith('Michael:')) {
      segments.push({
        speaker: "Michael",
        text: line.substring('Michael:'.length).trim()
      });
    } else if (line.startsWith('Sarah:')) {
      segments.push({
        speaker: "Sarah",
        text: line.substring('Sarah:'.length).trim()
      });
    } else if (segments.length > 0) {
      // Append to the last segment if it's not a speaker line
      segments[segments.length - 1].text += " " + line.trim();
    }
  }
  
  return segments;
}

// Function to generate speech using Google Text-to-Speech API
async function generateSpeech(text: string, voiceName: string) {
  try {
    const response = await fetch(`${TEXT_TO_SPEECH_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice: { 
          languageCode: 'en-US',
          name: voiceName,
          ssmlGender: voiceName.includes('D') ? 'MALE' : 'FEMALE'
        },
        audioConfig: { 
          audioEncoding: 'MP3',
          speakingRate: 1.0,
          pitch: 0.0
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Text-to-speech API error:", errorData);
      throw new Error(`Text-to-speech API error: ${errorData.error?.message || "Unknown error"}`);
    }
    
    const data = await response.json();
    return data.audioContent || '';
  } catch (error) {
    console.error("Error generating speech:", error);
    return '';
  }
}
