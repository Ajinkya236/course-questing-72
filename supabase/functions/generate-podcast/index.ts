
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";

// Set up CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("Missing Gemini API key. Please add GEMINI_API_KEY to your Supabase secrets.");
    }

    if (!GOOGLE_API_KEY) {
      throw new Error("Missing Google API key. Please add GOOGLE_API_KEY to your Supabase secrets.");
    }

    const { skillName, skillDescription, proficiency, duration = "15-25 minutes", transcriptLength = "15-20 minutes reading time" } = await req.json();

    if (!skillName || !proficiency) {
      throw new Error("Missing required parameters: skillName and proficiency are required");
    }

    console.log(`Generating podcast script for ${skillName} at ${proficiency} level`);

    // Step 1: Generate podcast script using Gemini 1.5 Pro
    const script = await generatePodcastScript(skillName, skillDescription, proficiency, transcriptLength);
    
    if (!script || script.length < 500) {
      throw new Error("Failed to generate an adequate podcast script");
    }
    
    console.log(`Successfully generated podcast script (${script.length} chars)`);

    // Step 2: Generate audio using Google Text-to-Speech API
    const audioUrl = await generateAudio(script);
    
    if (!audioUrl) {
      throw new Error("Failed to generate audio from the podcast script");
    }
    
    console.log(`Successfully generated podcast audio: ${audioUrl}`);

    return new Response(
      JSON.stringify({ 
        audioUrl, 
        transcript: script,
        success: true
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

async function generatePodcastScript(skillName: string, skillDescription: string, proficiency: string, targetLength: string) {
  const prompt = `Create a detailed educational podcast script between a male host named Michael and a female host named Sarah explaining the key concepts of "${skillName}" at the "${proficiency}" level. 

IMPORTANT REQUIREMENTS:
- Script must be SUBSTANTIAL, targeting ${targetLength}
- Make it conversational, engaging, and thorough
- Cover key concepts, examples, benefits, and how to apply this skill
- Format this as a dialogue script with clear speaker indicators (Michael: and Sarah:)
- Include a brief introduction and conclusion
- Divide into sections with smooth transitions
- No placeholders - provide complete, in-depth explanations
- Aim for an audio duration between 15-25 minutes when read at normal pace
- Include occasional light humor or interesting facts to keep engagement

This is for a skill learning platform, so ensure the content is professional and educational while remaining accessible to learners.

Use this description if available: ${skillDescription || "No additional details provided"}

THE SCRIPT MUST BE IN-DEPTH AND SUBSTANTIVE, NOT A BASIC OVERVIEW.`;

  try {
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
    
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
          maxOutputTokens: 8192, // Use maximum tokens for a longer response
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error(`Gemini API error: ${data.error?.message || "Unknown error"}`);
    }

    const script = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Check if the script is long enough (minimum 3000 characters for a ~15 min podcast)
    if (script.length < 3000) {
      console.warn("Generated script is too short:", script.length);
      throw new Error("Generated script is too short for a 15-25 minute podcast");
    }
    
    return script;
  } catch (error) {
    console.error("Error generating podcast script:", error);
    throw error;
  }
}

async function generateAudio(script: string) {
  try {
    // Create a reasonable chunk size to avoid request size limits
    const MAX_CHUNK_SIZE = 4500;
    const chunks = chunkText(script, MAX_CHUNK_SIZE);
    const audioUrls = [];

    console.log(`Split script into ${chunks.length} chunks for TTS processing`);

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Processing TTS chunk ${i+1}/${chunks.length}`);
      
      const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            text: chunks[i]
          },
          voice: {
            languageCode: 'en-US',
            ssmlGender: i % 2 === 0 ? 'MALE' : 'FEMALE' // Alternate voices for dialogue
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 1.0,
            pitch: 0.0
          }
        })
      });

      const data = await response.json();
      
      if (!data.audioContent) {
        console.error("TTS API error:", data);
        throw new Error("Failed to generate audio content");
      }
      
      // This would be where you'd upload the audio to storage or create a URL
      // For this example, we're creating a mock URL
      audioUrls.push(`data:audio/mp3;base64,${data.audioContent}`);
    }

    // In a real implementation, you would combine these audio files
    // For now, we'll just return the first chunk's audio
    return audioUrls[0];
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}

function chunkText(text: string, maxChunkSize: number): string[] {
  const chunks = [];
  const dialogue = text.split(/\n+/); // Split by line breaks to respect dialogue format
  
  let currentChunk = "";
  
  for (const line of dialogue) {
    // If adding this line would exceed the limit, save current chunk and start a new one
    if (currentChunk.length + line.length + 1 > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = line;
    } else {
      currentChunk += (currentChunk ? "\n" : "") + line;
    }
  }
  
  // Add the last chunk if it has content
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}
