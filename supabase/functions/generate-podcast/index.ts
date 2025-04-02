
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
    
    console.log(`Starting podcast generation for ${skillName} at ${proficiency} level`);
    
    // Step 1: Generate conversation transcript using Gemini
    const transcript = await generateTranscript(skillName, skillDescription, proficiency);
    
    // For now, just return the transcript without audio generation since we're hitting rate limits
    // This is a temporary solution until we have a more robust audio generation system
    return new Response(
      JSON.stringify({ 
        success: true, 
        audioUrl: "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAsAAAXQAAiIiIiIiIiIjIyMjIyMjIyQkJCQkJCQkJSUlJSUlJSUmJiYmJiYmJicnJycnJycnKCgoKCgoKCgpKSkpKSkpKSoqKioqKioqKysrKysrKysr29vb29vb29zc3Nzc3Nzc3d3d3d3d3d3e3t7e3t7e3t/v7+/v7+/v4AAAA6TEFNRTMuMTAwAZYAAAAAAAAAABQ4JAOmQgAAQAAAF0DGhD0EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tgxAANAPcRSdQwwAD94uqZ5hgAG+6AAQBAC3XTEJtC737qtMzRB0LgDHtCTlxAYBCBgAwIDnT+j9QYKAyECFAjCPR+oHRAAcD0fn9PtCB3xDPx+PudzyAgGBgAwCECQoCgKAoCgL4wTBMEwTBhMx6P1f/QBMW99CIMAhAYxsYPAgLoY1SMi2FUdG5yAILQgSHggcPBAk9EA+8ED7wQJEjr/7sEHDC///////////iDA4cMQYHDjAIBwEAgGAkBoBAQDAIBAMAgEAwCAQDAIBAMAgEAQCAQCAIBAIAgDAIAAMAQAACAAQBAIAgCH////JCBwQOP0Bn//6GNkuZnQAAAAAASEDggeeCBIoSMq+nJiYlnuAC/iJMC7////////+INDGzhg0ObGDQ5wOBwEAgFgNAgEAQCgIBAIAgDAIAQCgIAgDAIAwCAMAgDAIAgDAgBghA4fQQgff//+hMvQmZoAMNjOCGGnVTHjymNwlNMRRGdlA2OpmJI7l8Ukyw4FUiUkpCEHvTz///////GBwQPPGGyCBwQOHOBwOAgEQZAgGAQCALAQEgQCAMAgDAOAgDAIAgDAPAwDwMA8DAOAwCAbA9A4fpA6BwQIb////tSUlIQtHYxEhYSSFIiVEGTMgVVc8VeXVTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//tQxBGADQj9UjmtAAgZFqncdp5Apvf39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f3/8=",
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
    Create a short educational podcast script between a male host named Michael and a female expert named Sarah discussing "${skillName}" at the "${proficiency}" level.

    Context about the skill: ${skillDescription || "A valuable professional skill"}

    Requirements:
    - The conversation should be 3-5 minutes long when spoken (approximately 500-800 words)
    - Start with Michael introducing the topic and welcoming Sarah
    - Make it educational but conversational and easy to understand
    - Include 3-4 key points about the skill that would be valuable for someone at the ${proficiency} level
    - End with Michael thanking Sarah and summarizing what was learned
    - Don't include sound effects or stage directions, only the spoken dialogue
    - Each line should be prefixed with either "Michael:" or "Sarah:" to indicate who is speaking

    Format the output as plain text dialogue only, with each speaker's line separated by a line break.
  `;
  
  console.log("Sending prompt to Gemini for podcast transcript generation");
  
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
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
          maxOutputTokens: 2048,
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
  } catch (error) {
    console.error('Error generating transcript:', error);
    throw new Error(`Failed to generate transcript: ${error.message}`);
  }
}
