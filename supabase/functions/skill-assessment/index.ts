
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
      action = 'generate_questions', 
      skill, 
      proficiency, 
      userAnswers = [],
      sources = [], 
      mediaFiles = [], 
      model = 'gemini-1.5-pro' 
    } = await req.json();

    // Validate request parameters
    if (!skill) {
      throw new Error("Skill information is required");
    }

    // Validate the model
    const validModels = ['gemini-1.5-flash', 'gemini-1.5-pro'];
    const selectedModel = validModels.includes(model) ? model : 'gemini-1.5-pro';

    // Process sources and media files to create better context
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

    let prompt = '';
    
    // Prepare prompt based on action
    if (action === 'generate_questions') {
      prompt = `Create a comprehensive assessment for the skill "${skill}" at the "${proficiency}" level. 
      
The assessment should include a variety of question types including:
- 5-7 multiple choice questions
- 3-5 true/false questions 
- 2-4 short answer questions
- 1-2 video response questions (if appropriate)
- 1-2 document analysis questions (if appropriate)
- 1-2 fill in the blanks questions
- 1-2 match the following questions
- 1-2 drag the sequence questions
- 1-2 find the hotspot questions (if appropriate)

${contextInfo ? `Use this context information to create relevant questions that test true understanding:\n${contextInfo}\n` : ''}

For each question, provide:
1. A unique numerical id
2. The question text that's clear and specific
3. The question type (multipleChoice, trueFalse, shortAnswer, videoResponse, documentAnalysis, fillInBlanks, matchTheFollowing, dragSequence, findHotspot)
4. For multiple choice: exactly 4 options labeled A, B, C, D
5. The correct answer
6. A brief explanation of why the answer is correct
7. For document or video questions, include a URL or reference to relevant materials

The questions should test different cognitive levels: knowledge recall, comprehension, application, analysis, evaluation, and creation where appropriate.

Format as JSON with this structure:
{
  "questions": [
    {
      "id": 1,
      "type": "multipleChoice",
      "text": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Brief explanation why Option A is correct"
    },
    {
      "id": 2,
      "type": "trueFalse",
      "text": "Statement to evaluate as true or false",
      "options": ["True", "False"],
      "correctAnswer": "True",
      "explanation": "Brief explanation why this is true"
    },
    {
      "id": 3,
      "type": "shortAnswer",
      "text": "Question requiring a short answer",
      "correctAnswer": "Expected answer or key points",
      "explanation": "Explanation of what makes a good answer"
    },
    {
      "id": 4,
      "type": "fillInBlanks",
      "text": "Fill in the blank: _____",
      "correctAnswer": "Expected answer",
      "explanation": "Explanation of the correct answer"
    },
    ...and so on for other question types
  ]
}

Make sure all questions are directly relevant to testing proficiency in ${skill} at the ${proficiency} level. BE SURE TO RETURN ONLY VALID JSON THAT CAN BE PARSED.`;
    } else if (action === 'evaluate_assessment') {
      prompt = `Evaluate this skill assessment for "${skill}" at the "${proficiency}" level.
      
User answers:
${JSON.stringify(userAnswers, null, 2)}

${contextInfo ? `Additional context and sources that may be relevant for evaluation:\n${contextInfo}\n` : ''}

Provide:
1. A score from 0-100 (the passing rate is 80%)
2. Brief feedback on each answer, explaining what was correct or incorrect
3. Overall assessment summary with specific areas for improvement and next steps

Format as JSON using this exact structure:
{
  "score": 85,
  "feedback": [
    { 
      "questionId": 1, 
      "correct": true,
      "comment": "Correct answer with good reasoning" 
    },
    { 
      "questionId": 2, 
      "correct": false,
      "comment": "Incorrect. The correct answer is X because..." 
    },
    ...
  ],
  "summary": "Overall assessment summary...",
  "improvements": ["Area 1", "Area 2", ...],
  "nextSteps": ["Specific action 1", "Specific action 2", ...]
}

BE SURE TO RETURN ONLY VALID JSON THAT CAN BE PARSED. The structure MUST follow the exact format shown above.
Be thorough but fair in your evaluation. Provide structured, helpful, and constructive feedback.`;
    } else {
      throw new Error("Invalid action. Supported actions are 'generate_questions' and 'evaluate_assessment'");
    }

    console.log(`Sending ${action} request to Gemini API for skill ${skill}`);

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
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2, // Lower temperature for more structured responses
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseFormat: { type: "JSON" } // Request JSON response format
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

    // Try to extract JSON from the response
    let result;
    try {
      // Look for JSON in the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        result = { rawResponse: generatedText };
      }
    } catch (error) {
      console.error("Error parsing JSON from response:", error);
      result = { rawResponse: generatedText };
    }

    // Return the result
    return new Response(
      JSON.stringify(result),
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
