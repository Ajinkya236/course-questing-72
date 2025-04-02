
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
        audioUrl,
        transcript
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
  const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
  
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  
  const prompt = `
    Create a longer educational podcast script between a male host named Michael and a female expert named Sarah discussing "${skillName}" at the "${proficiency}" level.

    Context about the skill: ${skillDescription || "A valuable professional skill"}

    Requirements:
    - The conversation should be 15-25 minutes long when spoken (approximately 3000-5000 words)
    - Start with Michael introducing the topic and welcoming Sarah
    - Make it educational but conversational and easy to understand
    - Include at least 6-8 key points about the skill that would be valuable for someone at the ${proficiency} level
    - Include some practical examples and real-world applications
    - Discuss common challenges people face when developing this skill
    - End with Michael thanking Sarah and summarizing what was learned
    - Don't include sound effects or stage directions, only the spoken dialogue
    - Each line should be prefixed with either "Michael:" or "Sarah:" to indicate who is speaking
    - Use the Gemini 1.5 Pro model for this generation to create detailed and comprehensive content

    Format the output as plain text dialogue only, with each speaker's line separated by a line break.
  `;
  
  console.log("Sending prompt to Gemini for podcast transcript generation");
  
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
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      }
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error(`Failed to generate transcript: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
    console.error('Unexpected Gemini API response format:', JSON.stringify(data));
    throw new Error('Received invalid response format from Gemini API');
  }
  
  const generatedText = data.candidates[0].content.parts[0].text;
  console.log("Successfully generated transcript with Gemini (length: " + generatedText.length + " characters)");
  
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
  
  if (segments.length === 0) {
    throw new Error("Could not parse transcript into speaker segments");
  }
  
  console.log(`Parsed transcript into ${segments.length} segments for audio generation`);
  
  // Process segments into chunks to avoid length limitations
  const MAX_CHAR_LENGTH = 5000; // Google TTS limit
  const processedSegments = [];
  
  for (const segment of segments) {
    if (segment.text.length <= MAX_CHAR_LENGTH) {
      processedSegments.push(segment);
    } else {
      // Split long segments into multiple parts
      let text = segment.text;
      while (text.length > 0) {
        const chunk = text.substring(0, MAX_CHAR_LENGTH);
        // Try to break at sentence end
        let breakPoint = chunk.lastIndexOf('. ');
        if (breakPoint === -1 || breakPoint < MAX_CHAR_LENGTH / 2) {
          breakPoint = chunk.lastIndexOf(' ');
        }
        const part = text.substring(0, breakPoint + 1);
        
        processedSegments.push({
          ...segment,
          text: part
        });
        
        text = text.substring(breakPoint + 1);
      }
    }
  }
  
  console.log(`Processing ${processedSegments.length} audio segments after chunking`);
  
  // Combine all audio segments
  const audioContents = [];
  
  for (const segment of processedSegments) {
    try {
      console.log(`Generating audio for segment: ${segment.text.substring(0, 30)}...`);
      
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
      
      if (!data.audioContent) {
        throw new Error("No audio content in Google TTS response");
      }
      
      audioContents.push(data.audioContent);
    } catch (error) {
      console.error('Error generating audio segment:', error);
      throw error;
    }
  }
  
  console.log(`Successfully generated ${audioContents.length} audio segments`);
  
  // For simplicity of this demo, we'll return the first audio segment as base64
  // In a production environment, you'd want to combine these audio segments
  // or save them to Supabase storage
  return `data:audio/mp3;base64,${audioContents[0]}`;
}
