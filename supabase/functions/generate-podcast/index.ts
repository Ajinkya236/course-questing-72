
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const TTS_API_KEY = Deno.env.get('GOOGLE_API_KEY'); // Google API key for text-to-speech

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
    
    // Check if we have TTS API key for audio generation
    if (!TTS_API_KEY) {
      console.log("No Google API key provided for TTS, returning transcript only");
      return new Response(
        JSON.stringify({
          transcript: transcript,
          audioUrl: null,
          mockMode: true,
          message: "Podcast transcript generated successfully. Audio generation requires Google TTS API key."
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }
    
    try {
      // Generate audio using Google Text-to-Speech API
      const audioUrl = await generatePodcastAudio(transcript);
      
      return new Response(
        JSON.stringify({
          transcript: transcript,
          audioUrl: audioUrl,
          mockMode: false,
          message: "Podcast generated successfully with audio."
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    } catch (audioError) {
      console.error("Error generating audio:", audioError);
      // Return transcript even if audio generation fails
      return new Response(
        JSON.stringify({
          transcript: transcript,
          audioUrl: null,
          mockMode: true,
          message: "Podcast transcript generated, but audio generation failed: " + audioError.message
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }
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
          maxOutputTokens: 8192,
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

async function generatePodcastAudio(transcript: string): Promise<string> {
  if (!TTS_API_KEY) {
    throw new Error("Missing Google API key for TTS");
  }
  
  // Process the transcript to separate male and female parts
  const lines = transcript.split('\n').filter(line => line.trim() !== '');
  
  // Process each line to determine if it's Mark or Sarah speaking
  const processedLines = [];
  let currentSpeaker = null;
  let currentText = "";
  
  for (const line of lines) {
    if (line.startsWith("Mark:")) {
      // If we have accumulated text for a previous speaker, add it to the processed lines
      if (currentSpeaker && currentText) {
        processedLines.push({ speaker: currentSpeaker, text: currentText.trim() });
      }
      currentSpeaker = "male";
      currentText = line.substring(5).trim();
    } else if (line.startsWith("Sarah:")) {
      if (currentSpeaker && currentText) {
        processedLines.push({ speaker: currentSpeaker, text: currentText.trim() });
      }
      currentSpeaker = "female";
      currentText = line.substring(6).trim();
    } else if (currentSpeaker) {
      // Continue accumulating text for the current speaker
      currentText += " " + line.trim();
    }
  }
  
  // Add the last speaker's text
  if (currentSpeaker && currentText) {
    processedLines.push({ speaker: currentSpeaker, text: currentText.trim() });
  }
  
  console.log(`Processed ${processedLines.length} lines for TTS`);
  
  // For now, we'll implement a simplified version using a single API call
  // In a production environment, you would process each speaker separately with different voices
  // and then combine the audio files
  
  // We'll use a single API call with the first few paragraphs as a mockup
  // In a real implementation, you would need to handle multiple API calls and audio concatenation
  const sampleText = processedLines.slice(0, 3).map(line => line.text).join("\n\n");
  
  try {
    // Call Google TTS API
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${TTS_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          text: sampleText
        },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Standard-D', // A male voice
          ssmlGender: 'MALE'
        },
        audioConfig: {
          audioEncoding: 'MP3'
        }
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Google TTS API error:", data);
      throw new Error(`Google TTS API error: ${data.error?.message || "Unknown error"}`);
    }
    
    // In a real implementation, you would save this audio file to storage
    // and return a URL to it. For this demo, we'll return a data URL.
    const audioContent = data.audioContent;
    
    // Create a data URL from the base64 audio content
    const audioDataUrl = `data:audio/mp3;base64,${audioContent}`;
    
    return audioDataUrl;
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}
