import { corsHeaders } from './utils.ts';

// Gemini API configuration
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";

/**
 * Call the Gemini API with the given prompt
 */
export async function callGeminiAPI(prompt: string, model = 'gemini-1.5-flash'): Promise<string> {
  // Check if API key is available
  if (!GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key. Please add GEMINI_API_KEY to your Supabase secrets.");
  }

  console.log("Sending prompt to Gemini API...");

  // Create the request to Gemini API
  const GEMINI_API_URL = `${GEMINI_API_BASE_URL}${model}:generateContent?key=${GEMINI_API_KEY}`;
  
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
        temperature: 0.4,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096, // Reduced from 8192 to avoid timeouts
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
  
  return generatedText;
}

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
 * Extract JSON from the response text
 */
export function extractJsonFromResponse(text: string): any {
  try {
    // Try to parse the entire response as JSON first
    return JSON.parse(text);
  } catch (e) {
    console.log("Response is not a valid JSON, trying to extract JSON from text");
    
    // Try to extract JSON from the text
    const jsonRegex = /```json([\s\S]*?)```|```([\s\S]*?)```|\{[\s\S]*\}/g;
    const match = jsonRegex.exec(text);
    
    if (match) {
      const jsonStr = match[1] || match[2] || match[0];
      try {
        return JSON.parse(jsonStr.trim());
      } catch (e) {
        console.error("Failed to parse extracted JSON:", e);
      }
    }
    
    // If all parsing fails, return a basic response
    return {
      error: "Failed to parse AI response",
      rawResponse: text
    };
  }
}
