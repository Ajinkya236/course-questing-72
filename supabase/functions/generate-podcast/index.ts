
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle function calls
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skillName, skillDescription, proficiency } = await req.json();
    
    // Step 1: Generate conversation transcript using Gemini
    const transcript = await generateTranscript(skillName, skillDescription, proficiency);
    
    // Step 2: Generate audio from the transcript
    const audioUrl = await generateAudio(transcript);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        audioUrl 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in generate-podcast function:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An error occurred while generating the podcast' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

// Function to generate conversation transcript using Gemini API
async function generateTranscript(skillName: string, skillDescription: string, proficiency: string): Promise<string> {
  const GEMINI_API_KEY = Deno.env.get('GOOGLE_API_KEY');
  
  if (!GEMINI_API_KEY) {
    throw new Error('GOOGLE_API_KEY is not configured');
  }
  
  const prompt = `
    Create a short, engaging conversation script between a male host named Michael and a female expert named Sarah discussing "${skillName}" at the "${proficiency}" level.

    Context about the skill: ${skillDescription || "A valuable professional skill"}

    Requirements:
    - The conversation should be exactly 2-3 minutes long when spoken
    - Start with Michael introducing the topic and welcoming Sarah
    - Make it educational but conversational and easy to understand
    - Include 3-4 key points about the skill that would be valuable for someone at the ${proficiency} level
    - End with Michael thanking Sarah and summarizing what was learned
    - Don't include sound effects or stage directions, only the spoken dialogue
    - Each line should be prefixed with either "Michael:" or "Sarah:" to indicate who is speaking
    - Total length should be approximately 400-500 words

    Format the output as plain text dialogue only, with each speaker's line separated by a line break.
  `;
  
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error(`Failed to generate transcript: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  const generatedText = data.candidates[0].content.parts[0].text;
  
  return generatedText;
}

// Function to generate audio from text using Google Text-to-Speech API
async function generateAudio(transcript: string): Promise<string> {
  const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
  
  if (!GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY is not configured');
  }
  
  // Parse the transcript into speaker segments
  const lines = transcript.split('\n').filter(line => line.trim().length > 0);
  const segments = [];
  
  for (const line of lines) {
    if (line.startsWith('Michael:')) {
      segments.push({
        text: line.replace('Michael:', '').trim(),
        voiceName: 'en-US-Neural2-D', // Male voice
        ssmlGender: 'MALE'
      });
    } else if (line.startsWith('Sarah:')) {
      segments.push({
        text: line.replace('Sarah:', '').trim(),
        voiceName: 'en-US-Neural2-F', // Female voice
        ssmlGender: 'FEMALE'
      });
    } else {
      // If no speaker prefix, add to the last segment
      if (segments.length > 0) {
        segments[segments.length - 1].text += ' ' + line.trim();
      }
    }
  }
  
  // Combine all audio segments
  const audioContents = [];
  
  for (const segment of segments) {
    try {
      const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            text: segment.text
          },
          voice: {
            languageCode: 'en-US',
            name: segment.voiceName,
            ssmlGender: segment.ssmlGender
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 1.0,
            pitch: 0.0
          }
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Text-to-Speech API error:', errorText);
        throw new Error(`Failed to generate audio: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      audioContents.push(data.audioContent);
    } catch (error) {
      console.error('Error generating audio segment:', error);
      throw error;
    }
  }
  
  // For simplicity of this demo, we'll return the first audio segment as base64
  // In a production environment, you'd want to combine these audio segments
  // or save them to Supabase storage
  return `data:audio/mp3;base64,${audioContents[0]}`;
}
