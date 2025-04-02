
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";
import { corsHeaders, createContextInfo } from './utils.ts';
import { callGeminiAPI } from './api.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { 
      prompt, 
      context = '', 
      sources = [], 
      mediaFiles = [],
      structuredFormat = false, // Parameter for structured response
      model = 'gemini-1.5-pro' 
    } = await req.json();

    // Validate request parameters
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    // Validate the model
    const validModels = ['gemini-1.5-flash', 'gemini-1.5-pro'];
    const selectedModel = validModels.includes(model) ? model : 'gemini-1.5-pro';

    // Process sources to create better context
    const sourceContext = createContextInfo(sources, mediaFiles);

    // Prepare prompt with context
    let fullPrompt = prompt;
    
    if ((context && context.trim() !== '') || sourceContext !== '') {
      fullPrompt = `${sourceContext}\n${context ? `Context information:\n${context}\n\n` : ''}User query: ${prompt}

Remember to analyze all provided context information and source materials thoroughly before responding.
If sources contain URLs, consider their content type (YouTube videos, PDFs, images, etc.) when formulating your response.
`;
    }

    // Add formatting instructions if structured format is requested
    if (structuredFormat) {
      fullPrompt += `\n\nPlease format your response with clear headings, bullet points, and paragraphs for better readability. Use markdown formatting where appropriate.`;
    }

    // Call the Gemini API
    const generatedText = await callGeminiAPI(fullPrompt, selectedModel, structuredFormat);

    // Return the result
    return new Response(
      JSON.stringify({ generatedText }),
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
