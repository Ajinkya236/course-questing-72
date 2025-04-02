
import { corsHeaders } from './utils.ts';

// Gemini API configuration
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";

/**
 * Call the Gemini API to generate a response
 */
export async function callGeminiAPI(
  fullPrompt: string, 
  selectedModel: string, 
  structuredFormat: boolean = false
): Promise<string> {
  // Check if API key is available
  if (!GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key. Please add GEMINI_API_KEY to your Supabase secrets.");
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
        temperature: structuredFormat ? 0.4 : 0.7, // Lower temperature for structured responses
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
  
  return generatedText;
}
