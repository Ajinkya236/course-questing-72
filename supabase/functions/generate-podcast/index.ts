
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const TEXT_TO_SPEECH_API_KEY = Deno.env.get('TEXT_TO_SPEECH_API_KEY');

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
    
    // Generate podcast script using Gemini 1.5 Pro
    const transcript = await generatePodcastTranscript(skillName, skillDescription, proficiency);
    
    // Generate audio from transcript using Text-to-Speech API
    let audioUrl = null;
    let mockMode = true;
    
    if (TEXT_TO_SPEECH_API_KEY) {
      try {
        console.log("Generating audio from transcript...");
        audioUrl = await generateAudio(transcript);
        mockMode = false;
        console.log("Audio generation successful, URL:", audioUrl);
      } catch (audioError) {
        console.error("Error generating audio:", audioError);
        // Continue with only transcript if audio generation fails
      }
    }
    
    return new Response(
      JSON.stringify({
        transcript: transcript,
        audioUrl: audioUrl,
        mockMode: mockMode,
        message: audioUrl 
          ? "Podcast generated successfully." 
          : "Podcast transcript generated successfully. Audio could not be generated."
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
Generate a 15-20 minute podcast script transcript between two hosts, a male and a female discussing ${skillName} at ${proficiency} level.
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

async function generateAudio(transcript: string): Promise<string> {
  if (!TEXT_TO_SPEECH_API_KEY) {
    throw new Error("Missing Text-to-Speech API key");
  }
  
  // Extract Mark's and Sarah's lines
  const markLines: string[] = [];
  const sarahLines: string[] = [];
  
  const lines = transcript.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('Mark:')) {
      markLines.push(line.replace('Mark:', '').trim());
    } else if (line.startsWith('Sarah:')) {
      sarahLines.push(line.replace('Sarah:', '').trim());
    }
  });
  
  // Generate audio for Mark (male voice)
  const markAudio = await generateSpeechSegment(markLines.join(' '), 'en-US-Neural2-D');
  
  // Generate audio for Sarah (female voice)
  const sarahAudio = await generateSpeechSegment(sarahLines.join(' '), 'en-US-Neural2-F');
  
  // TODO: In a real implementation, we would interleave these audio segments
  // For now, we'll just combine them sequentially
  
  // For demo purposes, return the URLs for the audio files
  // In a real implementation, you would store these files and combine them
  return markAudio || sarahAudio || '';
}

async function generateSpeechSegment(text: string, voice: string): Promise<string> {
  try {
    // Split text into smaller chunks if needed (API limit is 5000 chars)
    if (text.length > 4900) {
      text = text.substring(0, 4900); // Simplification for demo
    }
    
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${TEXT_TO_SPEECH_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: 'en-US', name: voice },
        audioConfig: { audioEncoding: 'MP3' },
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Text-to-Speech API error:", data);
      throw new Error(`Text-to-Speech API error: ${data.error?.message || "Unknown error"}`);
    }
    
    // In a real implementation, you would save this audio data to a file
    // For demo, we'll return a mock URL
    return `https://storage.googleapis.com/example-podcast-audio/${Date.now()}.mp3`;
  } catch (error) {
    console.error("Error generating speech:", error);
    return '';
  }
}
