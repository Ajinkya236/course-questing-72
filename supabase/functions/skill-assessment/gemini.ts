
import { processSource } from './utils.ts';

// Gemini API configuration
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";

/**
 * Creates context information based on sources and media files
 */
export function createContextInfo(sources: string[] = [], mediaFiles: any[] = []): string {
  let contextInfo = '';
  
  if (sources && sources.length > 0) {
    contextInfo += `Additional context from provided sources:\n\n`;
    sources.forEach((source: string, index: number) => {
      const processedSource = processSource(source);
      contextInfo += `Source ${index + 1}: ${processedSource}\n\n`;
    });
  }
  
  if (mediaFiles && mediaFiles.length > 0) {
    contextInfo += `Media files information:\n\n`;
    mediaFiles.forEach((file: any, index: number) => {
      const fileType = file.type || 'Unknown type';
      const fileName = file.name || `File ${index + 1}`;
      const fileUrl = file.url || '';
      
      contextInfo += `Media ${index + 1}: ${fileName} (${fileType})`;
      if (fileUrl) contextInfo += ` - ${fileUrl}`;
      contextInfo += `\n`;
    });
    contextInfo += `\n`;
  }
  
  return contextInfo;
}

/**
 * Call the Gemini API
 */
export async function callGeminiAPI(prompt: string, model: string = 'gemini-1.5-pro', temperature: number = 0.2) {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key. Please add GEMINI_API_KEY to your Supabase secrets.");
  }
  
  // Always use gemini-1.5-pro model regardless of what was passed
  const selectedModel = 'gemini-1.5-pro';
  const GEMINI_API_URL = `${GEMINI_API_BASE_URL}${selectedModel}:generateContent?key=${GEMINI_API_KEY}`;
  
  console.log(`Calling Gemini API with model ${selectedModel}`);
  
  try {
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
          temperature: temperature,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      })
    });

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    // Parse the response
    const data = await response.json();

    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Sorry, I couldn't generate a response.";

    console.log("Gemini API response received successfully");
    return generatedText;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

/**
 * Extract JSON from Gemini response 
 */
export function extractJsonFromResponse(generatedText: string): any {
  try {
    // Look for JSON in the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      return { rawResponse: generatedText };
    }
  } catch (error) {
    console.error("Error parsing JSON from response:", error);
    return { rawResponse: generatedText };
  }
}
