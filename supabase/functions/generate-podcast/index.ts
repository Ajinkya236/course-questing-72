
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";
import { TextToSpeechClient } from "https://esm.sh/@google-cloud/text-to-speech@5.0.0";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');

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
    
    // Convert transcript to speech
    let audioUrl = null;
    
    if (GOOGLE_API_KEY && !Deno.env.get('MOCK_MODE')) {
      try {
        audioUrl = await generateAudio(transcript);
        console.log("Audio URL generated successfully");
      } catch (audioError) {
        console.error("Error generating audio:", audioError);
        return new Response(
          JSON.stringify({
            transcript: transcript,
            audioUrl: null,
            mockMode: true,
            message: "Audio generation failed, but transcript is available. Error: " + audioError.message
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }
    } else {
      console.log("Running in mock mode or missing Google API key, skipping audio generation");
    }
    
    return new Response(
      JSON.stringify({
        transcript: transcript,
        audioUrl: audioUrl,
        mockMode: !audioUrl,
        message: audioUrl ? "Podcast generated successfully" : "Podcast transcript generated successfully. Audio not generated in mock mode."
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
Generate a 12-20 minute podcast script transcript between two hosts, a male host named Mark and a female host named Sarah discussing ${skillName} at ${proficiency} level.
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

  console.log("Sending prompt to Gemini API");
  
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
    
    console.log("Transcript generated successfully");
    
    return transcript;
  } catch (error) {
    console.error("Error generating transcript:", error);
    throw error;
  }
}

async function generateAudio(transcript: string): Promise<string> {
  if (!GOOGLE_API_KEY) {
    throw new Error("Missing Google API key");
  }

  try {
    // Split transcript into segments by speaker
    const segments = splitTranscriptByspeaker(transcript);
    
    // Set up TextToSpeechClient
    const client = new TextToSpeechClient({ 
      credentials: { client_email: '', private_key: '' },
      projectId: '',
      apiEndpoint: 'https://texttospeech.googleapis.com',
      headers: {
        'x-goog-api-key': GOOGLE_API_KEY,
      }
    });

    // Mock implementation for now - in a real implementation, this would:
    // 1. Convert each segment to speech with appropriate voice based on speaker
    // 2. Combine audio segments
    // 3. Upload to a storage service
    // 4. Return the URL to the uploaded audio file
    
    // For this demo, we'll return a mock URL
    // In a production scenario, you would upload to Supabase storage or similar
    console.log(`Would generate audio for ${segments.length} segments`);
    
    // Return a mock URL for now
    return "https://example.com/podcasts/mock-podcast.mp3";
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}

function splitTranscriptByReader(transcript: string): string[] {
  // Split transcript by each speaker change
  const segments = transcript.split(/\n(?=(?:Mark|Sarah):|(?:MARK|SARAH):)/);
  return segments.filter(segment => segment.trim());
}

function splitTranscriptByReader(transcript: string): Array<{text: string, speaker: string}> {
  // Split transcript by each speaker change
  const regex = /(?:Mark|Sarah|MARK|SARAH):/g;
  const parts = transcript.split(regex);
  
  // Skip the first part if it's empty (which happens if the transcript starts with a speaker name)
  if (parts[0].trim() === '') {
    parts.shift();
  }
  
  // Extract all speaker names
  const speakerMatches = transcript.match(regex) || [];
  
  // Create segments with speaker information
  const segments: Array<{text: string, speaker: string}> = [];
  
  for (let i = 0; i < parts.length && i < speakerMatches.length; i++) {
    const speaker = speakerMatches[i].replace(':', '').trim().toLowerCase();
    const text = parts[i].trim();
    
    if (text) {
      segments.push({
        text, 
        speaker: speaker === 'mark' ? 'male' : 'female'
      });
    }
  }
  
  return segments;
}

function splitTranscriptByReader(transcript: string): Array<{text: string, speaker: string}> {
  // Split transcript by each speaker change
  const regex = /(?:Mark|Sarah|MARK|SARAH):/g;
  const parts = transcript.split(regex);
  
  // Skip the first part if it's empty (which happens if the transcript starts with a speaker name)
  if (parts[0].trim() === '') {
    parts.shift();
  }
  
  // Extract all speaker names
  const speakerMatches = transcript.match(regex) || [];
  
  // Create segments with speaker information
  const segments: Array<{text: string, speaker: string}> = [];
  
  for (let i = 0; i < parts.length && i < speakerMatches.length; i++) {
    const speaker = speakerMatches[i].replace(':', '').trim().toLowerCase();
    const text = parts[i].trim();
    
    if (text) {
      segments.push({
        text, 
        speaker: speaker === 'mark' ? 'male' : 'female'
      });
    }
  }
  
  return segments;
}

function splitTranscriptByReader(transcript: string): Array<{text: string, speaker: string}> {
  // Split transcript by each speaker change
  const regex = /(?:Mark|Sarah|MARK|SARAH):/g;
  const parts = transcript.split(regex);
  
  // Skip the first part if it's empty (which happens if the transcript starts with a speaker name)
  if (parts[0].trim() === '') {
    parts.shift();
  }
  
  // Extract all speaker names
  const speakerMatches = transcript.match(regex) || [];
  
  // Create segments with speaker information
  const segments: Array<{text: string, speaker: string}> = [];
  
  for (let i = 0; i < parts.length && i < speakerMatches.length; i++) {
    const speaker = speakerMatches[i].replace(':', '').trim().toLowerCase();
    const text = parts[i].trim();
    
    if (text) {
      segments.push({
        text, 
        speaker: speaker === 'mark' ? 'male' : 'female'
      });
    }
  }
  
  return segments;
}

function splitTranscriptByReader(transcript: string): Array<{text: string, speaker: string}> {
  // Split transcript by each speaker change
  const regex = /(?:Mark|Sarah|MARK|SARAH):/g;
  const parts = transcript.split(regex);
  
  // Skip the first part if it's empty (which happens if the transcript starts with a speaker name)
  if (parts[0].trim() === '') {
    parts.shift();
  }
  
  // Extract all speaker names
  const speakerMatches = transcript.match(regex) || [];
  
  // Create segments with speaker information
  const segments: Array<{text: string, speaker: string}> = [];
  
  for (let i = 0; i < parts.length && i < speakerMatches.length; i++) {
    const speaker = speakerMatches[i].replace(':', '').trim().toLowerCase();
    const text = parts[i].trim();
    
    if (text) {
      segments.push({
        text, 
        speaker: speaker === 'mark' ? 'male' : 'female'
      });
    }
  }
  
  return segments;
}

function splitTranscriptByReader(transcript: string): Array<{text: string, speaker: string}> {
  // Split transcript by each speaker change
  const regex = /(?:Mark|Sarah|MARK|SARAH):/g;
  const parts = transcript.split(regex);
  
  // Skip the first part if it's empty (which happens if the transcript starts with a speaker name)
  if (parts[0].trim() === '') {
    parts.shift();
  }
  
  // Extract all speaker names
  const speakerMatches = transcript.match(regex) || [];
  
  // Create segments with speaker information
  const segments: Array<{text: string, speaker: string}> = [];
  
  for (let i = 0; i < parts.length && i < speakerMatches.length; i++) {
    const speaker = speakerMatches[i].replace(':', '').trim().toLowerCase();
    const text = parts[i].trim();
    
    if (text) {
      segments.push({
        text, 
        speaker: speaker === 'mark' ? 'male' : 'female'
      });
    }
  }
  
  return segments;
}

function splitTranscriptByReader(transcript: string): Array<{text: string, speaker: string}> {
  // Split transcript by each speaker change
  const regex = /(?:Mark|Sarah|MARK|SARAH):/g;
  const parts = transcript.split(regex);
  
  // Skip the first part if it's empty (which happens if the transcript starts with a speaker name)
  if (parts[0].trim() === '') {
    parts.shift();
  }
  
  // Extract all speaker names
  const speakerMatches = transcript.match(regex) || [];
  
  // Create segments with speaker information
  const segments: Array<{text: string, speaker: string}> = [];
  
  for (let i = 0; i < parts.length && i < speakerMatches.length; i++) {
    const speaker = speakerMatches[i].replace(':', '').trim().toLowerCase();
    const text = parts[i].trim();
    
    if (text) {
      segments.push({
        text, 
        speaker: speaker === 'mark' ? 'male' : 'female'
      });
    }
  }
  
  return segments;
}

function splitTranscriptBySpeaker(transcript: string): Array<{text: string, speaker: string}> {
  // Split transcript by each speaker change
  const regex = /(?:Mark|Sarah|MARK|SARAH):/g;
  const parts = transcript.split(regex);
  
  // Skip the first part if it's empty (which happens if the transcript starts with a speaker name)
  if (parts[0].trim() === '') {
    parts.shift();
  }
  
  // Extract all speaker names
  const speakerMatches = transcript.match(regex) || [];
  
  // Create segments with speaker information
  const segments: Array<{text: string, speaker: string}> = [];
  
  for (let i = 0; i < parts.length && i < speakerMatches.length; i++) {
    const speaker = speakerMatches[i].replace(':', '').trim().toLowerCase();
    const text = parts[i].trim();
    
    if (text) {
      segments.push({
        text, 
        speaker: speaker === 'mark' ? 'male' : 'female'
      });
    }
  }
  
  return segments;
}
