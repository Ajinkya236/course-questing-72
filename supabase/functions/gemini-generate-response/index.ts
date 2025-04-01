
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

/**
 * Extracts the content from a source based on its type
 * @param source - The source to process
 * @returns Processed source content
 */
const processSource = (source: string): string => {
  // Check if it's a URL
  if (source.startsWith('http://') || source.startsWith('https://')) {
    // YouTube URL detection
    if (
      source.includes('youtube.com') || 
      source.includes('youtu.be')
    ) {
      return `YouTube Video: ${source}`;
    }
    
    // PDF detection
    if (source.endsWith('.pdf')) {
      return `PDF Document: ${source}`;
    }
    
    // Document detection
    if (
      source.endsWith('.doc') || 
      source.endsWith('.docx') || 
      source.endsWith('.ppt') || 
      source.endsWith('.pptx')
    ) {
      return `Office Document: ${source}`;
    }
    
    // Image detection
    if (
      source.endsWith('.jpg') || 
      source.endsWith('.jpeg') || 
      source.endsWith('.png') || 
      source.endsWith('.gif')
    ) {
      return `Image: ${source}`;
    }
    
    // Video detection
    if (
      source.endsWith('.mp4') || 
      source.endsWith('.mov') || 
      source.endsWith('.avi')
    ) {
      return `Video File: ${source}`;
    }
    
    // Default URL
    return `Web Resource: ${source}`;
  }
  
  // Plain text
  return `Text content: ${source}`;
};

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
      prompt, 
      context = '', 
      sources = [], 
      mediaFiles = [],
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
    let sourceContext = '';
    
    if (sources && sources.length > 0) {
      sourceContext = `Additional context from provided sources:\n\n`;
      sources.forEach((source: string, index: number) => {
        const processedSource = processSource(source);
        sourceContext += `Source ${index + 1}: ${processedSource}\n\n`;
      });
    }

    // Process media files if any
    if (mediaFiles && mediaFiles.length > 0) {
      sourceContext += `Media files information:\n\n`;
      mediaFiles.forEach((file: any, index: number) => {
        const fileType = file.type || 'Unknown type';
        const fileName = file.name || `File ${index + 1}`;
        const fileUrl = file.url || '';
        
        sourceContext += `Media ${index + 1}: ${fileName} (${fileType})`;
        if (fileUrl) sourceContext += ` - ${fileUrl}`;
        sourceContext += `\n`;
      });
      sourceContext += `\n`;
    }

    // Prepare prompt with context
    let fullPrompt = prompt;
    
    if ((context && context.trim() !== '') || sourceContext !== '') {
      fullPrompt = `${sourceContext}\n${context ? `Context information:\n${context}\n\n` : ''}User query: ${prompt}

Remember to analyze all provided context information and source materials thoroughly before responding.
If sources contain URLs, consider their content type (YouTube videos, PDFs, images, etc.) when formulating your response.
`;
    }

    console.log("Sending to Gemini API with prompt:", fullPrompt.substring(0, 100) + "...");

    // Create the request to Gemini API
    const GEMINI_API_URL = `${GEMINI_API_BASE_URL}${selectedModel}:generateContent?key=${GEMINI_API_KEY}`;
    
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
                text: fullPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
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

    // Parse the response
    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error(`Gemini API error: ${data.error?.message || "Unknown error"}`);
    }

    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Sorry, I couldn't generate a response.";

    console.log("Gemini API response received successfully");

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
