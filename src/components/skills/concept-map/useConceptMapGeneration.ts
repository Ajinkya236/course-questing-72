
import { useState } from 'react';
import { Concept } from './types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useConceptMapGeneration = (
  skillName: string,
  skillDescription: string,
  proficiency: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [conceptMap, setConceptMap] = useState<Concept | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const { toast } = useToast();

  const generateConceptMap = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-concept-map', {
        body: {
          skillName,
          skillDescription,
          proficiency
        },
      });
      
      if (error) {
        throw new Error(`Error calling generate-concept-map: ${error.message}`);
      }
      
      if (data) {
        setConceptMap(data);
        // Expand the root node by default
        setExpandedNodes(['root']);
        
        toast({
          title: "Success",
          description: "Concept map generated successfully.",
        });
      } else {
        throw new Error("No data returned from generate-concept-map function");
      }
    } catch (error) {
      console.error("Error generating concept map:", error);
      toast({
        title: "Error",
        description: "An error occurred while generating the concept map. Please try again.",
        variant: "destructive",
      });
      
      // Set a fallback concept map
      const fallbackMap: Concept = {
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
      
      setConceptMap(fallbackMap);
      setExpandedNodes(['root']);
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
