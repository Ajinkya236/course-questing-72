
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

    const { script } = await req.json();

    if (!script) {
      throw new Error("Script content is required");
    }

    // Process the script to convert to SSML with voice alternation
    const ssmlLines: string[] = [];
    const lines = script.split('\n');
    
    let currentSpeaker = '';
    let currentGender = '';
    let currentText = '';
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      
      // Check if this is a new speaker line
      const speakerMatch = line.match(/^(Michael|Sarah):\s*(.*)/);
      
      if (speakerMatch) {
        // If we have accumulated text from previous speaker, add it
        if (currentText && currentSpeaker) {
          const voice = currentGender === 'male' ? 'en-US-Neural2-D' : 'en-US-Neural2-F';
          ssmlLines.push(`<voice name="${voice}">${currentText}</voice><break time="500ms"/>`);
          currentText = '';
        }
        
        // Set new speaker and text
        currentSpeaker = speakerMatch[1];
        currentGender = currentSpeaker === 'Michael' ? 'male' : 'female';
        currentText = speakerMatch[2];
      } else if (currentSpeaker) {
        // Continue with the current speaker
        currentText += ' ' + line;
      }
    }
    
    // Add the last speaker's text
    if (currentText && currentSpeaker) {
      const voice = currentGender === 'male' ? 'en-US-Neural2-D' : 'en-US-Neural2-F';
      ssmlLines.push(`<voice name="${voice}">${currentText}</voice>`);
    }
    
    // Combine all SSML elements
    const ssml = `<speak>${ssmlLines.join('')}</speak>`;

    // Generate audio using Google TTS API
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          ssml: ssml
        },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Neural2-D',  // Default voice, but we override in SSML
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 1.0,
          pitch: 0.0,
          volumeGainDb: 0.0,
          effectsProfileId: ['small-bluetooth-speaker-class-device']
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Google TTS API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({ audioContent: data.audioContent }),
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
