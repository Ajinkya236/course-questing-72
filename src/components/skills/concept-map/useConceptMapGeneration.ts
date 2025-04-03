
import { useState } from 'react';
import { Concept } from './types';
import { useGemini } from '@/hooks/useGemini';
import { useToast } from '@/hooks/use-toast';

export const useConceptMapGeneration = (
  skillName: string,
  skillDescription: string,
  proficiency: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [conceptMap, setConceptMap] = useState<Concept | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const { toast } = useToast();
  const { generateResponse } = useGemini();

  const generateConceptMap = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
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
  "proficiencyLevel": "Intermediate",
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

      const response = await generateResponse({
        prompt,
        model: 'gemini-1.5-pro'
      });

      if (response.generatedText) {
        try {
          // Extract JSON from the response
          const jsonMatch = response.generatedText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const conceptMapData = JSON.parse(jsonMatch[0]);
            setConceptMap(conceptMapData);
            // Expand the root node by default
            setExpandedNodes(['root']);
          } else {
            throw new Error("Could not extract valid JSON from response");
          }
        } catch (error) {
          console.error("Error parsing concept map data:", error);
          toast({
            title: "Error",
            description: "Failed to generate a valid concept map. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to generate concept map. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating concept map:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while generating the concept map.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNode = (nodeId: string) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  return {
    isLoading,
    conceptMap,
    expandedNodes,
    generateConceptMap,
    toggleNode
  };
};
