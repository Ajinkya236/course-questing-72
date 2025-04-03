
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.3.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Gemini API configuration
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { skillName, skillDescription = "", proficiency = "Mastery" } = await req.json();
    
    // Validate request parameters
    if (!skillName) {
      throw new Error("Skill name is required");
    }
    
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      throw new Error("Missing Gemini API key. Please add GEMINI_API_KEY to your Supabase secrets.");
    }
    
    console.log(`Generating concept map for ${skillName} at ${proficiency} level using Gemini 1.5 Pro`);
    
    // Prepare prompt for Gemini
    const prompt = `
    Create a hierarchical concept map for ${skillName} at the ${proficiency} level.
    ${skillDescription ? `The skill is described as: ${skillDescription}` : ''}

    Structure the concept map with a root node (${skillName}) and 5-8 main concepts that are essential to understanding this skill.
    For each main concept, include:
    1. A short, clear label (3-5 words max)
    2. A brief description (1-2 sentences explaining the concept)
    3. 2-3 sub-concepts where relevant
    4. A proficiency level for each concept (Beginner, Intermediate, Advanced, or Expert)

    Return ONLY a JSON object with this structure:
    {
      "id": "root",
      "name": "${skillName}",
      "description": "Brief overview of the skill",
      "parentId": null,
      "proficiencyLevel": "${proficiency}",
      "children": [
        {
          "id": "concept1",
          "name": "Concept 1 Name",
          "description": "Brief description of this concept",
          "parentId": "root",
          "proficiencyLevel": "Beginner",
          "children": [
            {
              "id": "subconcept1",
              "name": "Subconcept 1 Name",
              "description": "Brief description of this subconcept",
              "parentId": "concept1",
              "proficiencyLevel": "Beginner",
              "children": []
            }
          ]
        }
      ]
    }

    The JSON must be valid and properly formatted. Ensure all IDs are unique.
    `;
    
    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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
          temperature: 0.2,
          maxOutputTokens: 8192,
        }
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || "Unknown API error"}`);
    }
    
    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Extract JSON from the response
    try {
      // Find JSON object in the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const conceptMapData = JSON.parse(jsonMatch[0]);
        
        // Validate the structure
        if (!conceptMapData.children || !Array.isArray(conceptMapData.children)) {
          throw new Error("Invalid response format from Gemini API");
        }
        
        // Return the concept map
        return new Response(
          JSON.stringify(conceptMapData),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      } else {
        throw new Error("Could not extract valid JSON from Gemini response");
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      
      // Return a fallback concept map
      const fallbackConceptMap = {
        id: "root",
        name: skillName,
        description: `A comprehensive overview of ${skillName} at the ${proficiency} level`,
        parentId: null,
        proficiencyLevel: proficiency,
        children: [
          {
            id: "fallback1",
            name: "Core Principles",
            description: `Fundamental concepts of ${skillName}`,
            parentId: "root",
            proficiencyLevel: "Beginner",
            children: []
          },
          {
            id: "fallback2",
            name: "Advanced Applications",
            description: `Practical applications of ${skillName}`,
            parentId: "root",
            proficiencyLevel: "Advanced",
            children: []
          }
        ]
      };
      
      return new Response(
        JSON.stringify(fallbackConceptMap),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
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
