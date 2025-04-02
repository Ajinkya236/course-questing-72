
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
      difficulty = 'medium',
      question, // For single answer evaluation
      userAnswers = [],
      sources = [], 
      mediaFiles = [], 
      model = 'gemini-1.5-pro' 
    } = await req.json();

    // Validate request parameters
    if (!skill) {
      throw new Error("Skill information is required");
    }

    // Always use gemini-1.5-pro model regardless of what was passed
    const selectedModel = 'gemini-1.5-pro';

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
      prompt = `Create a comprehensive assessment for the skill "${skill}" at the "${proficiency}" level. The assessment should have ${difficulty} difficulty.
      
Guidelines for difficulty levels:
- easy: Questions should test basic understanding and fundamentals. Include more straightforward multiple choice questions and true/false statements. Provide more context in questions.
- medium: Questions should test application of concepts and deeper understanding. Include a mix of question types. 
- hard: Questions should challenge even skilled individuals. Include questions requiring synthesis, analysis, and edge cases. Make multiple choice options more nuanced.

The assessment should include a variety of question types including:
- 5-7 multiple choice questions
- 3-5 true/false questions 
- 2-4 short answer questions
- 1-2 fill in the blanks questions

${contextInfo ? `Use this context information to create relevant questions that test true understanding:\n${contextInfo}\n` : ''}

For each question, provide:
1. A unique numerical id
2. The question text that's clear and specific
3. The question type (multipleChoice, trueFalse, shortAnswer, fillInBlanks)
4. For multiple choice: exactly 4 options labeled A, B, C, D
5. The correct answer
6. A brief explanation of why the answer is correct

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
    }
  ]
}

Make sure all questions are directly relevant to testing proficiency in ${skill} at the ${proficiency} level with ${difficulty} difficulty. BE SURE TO RETURN ONLY VALID JSON THAT CAN BE PARSED.`;
    } else if (action === 'evaluate_answer') {
      // For evaluating a single answer
      if (!question) {
        throw new Error("Question information is required for answer evaluation");
      }
      
      prompt = `Evaluate this single answer for a question about "${skill}" at the "${proficiency}" level.
      
Question ID: ${question.id}
Question Type: ${question.type}
Question Text: ${question.text}
User's Answer: ${question.userAnswer}
Correct Answer: ${question.correctAnswer}

${contextInfo ? `Additional context that may be relevant for evaluation:\n${contextInfo}\n` : ''}

Provide:
1. Whether the answer is correct (true/false)
2. A detailed explanation of why the answer is correct or incorrect
3. If incorrect, specific points for improvement
4. Suggestions for next steps or additional learning resources

Format as JSON using this exact structure:
{
  "correct": false,
  "explanation": "Detailed explanation of why the answer is incorrect or correct...",
  "improvement": "Specific point for improvement if answer is incorrect",
  "nextSteps": ["Suggestion 1", "Suggestion 2"]
}

BE SURE TO RETURN ONLY VALID JSON THAT CAN BE PARSED.
Be thorough, helpful, and constructive in your feedback. Focus on helping the learner understand, not just telling them they're wrong.`;
    } else if (action === 'evaluate_assessment') {
      prompt = `Evaluate this skill assessment for "${skill}" at the "${proficiency}" level.
      
User answers:
${JSON.stringify(userAnswers, null, 2)}

${contextInfo ? `Additional context and sources that may be relevant for evaluation:\n${contextInfo}\n` : ''}

Provide:
1. A score from 0-100 (the passing rate is 80%)
2. Detailed feedback on each answer, explaining what was correct or incorrect
3. Overall assessment summary with specific areas for improvement and next steps
4. Personalized learning recommendations

Format as JSON using this exact structure:
{
  "score": 85,
  "feedback": [
    { 
      "questionId": 1, 
      "correct": true,
      "comment": "Detailed explanation of why this answer is correct and what concepts the learner demonstrated understanding of." 
    },
    { 
      "questionId": 2, 
      "correct": false,
      "comment": "Detailed explanation of why this answer is incorrect, including the misconception and how to correct it." 
    }
  ],
  "summary": "Comprehensive assessment summary with strengths and weaknesses...",
  "improvements": ["Specific area 1 to focus on", "Specific area 2 to improve"],
  "nextSteps": ["Specific resource 1 to check out", "Practice exercise 2 to try"],
  "passed": true
}

BE SURE TO RETURN ONLY VALID JSON THAT CAN BE PARSED. The structure MUST follow the exact format shown above.
Be thorough, detailed, and constructive in your evaluation. Provide structured, helpful, and personalized feedback.`;
    } else {
      throw new Error("Invalid action. Supported actions are 'generate_questions', 'evaluate_answer', and 'evaluate_assessment'");
    }

    console.log(`Sending ${action} request to Gemini API for skill ${skill} using model ${selectedModel}`);

    // Create the request to Gemini API
    const GEMINI_API_URL = `${GEMINI_API_BASE_URL}${selectedModel}:generateContent?key=${GEMINI_API_KEY}`;
    
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
            temperature: 0.2, // Lower temperature for more structured responses
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
