
import React, { useState } from 'react';
import { Lightbulb, X, Plus, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from '@/hooks/use-toast';
import { useGemini } from '@/hooks/useGemini';

interface ConceptMapProps {
  skillName: string;
  skillDescription?: string;
  proficiency: string;
}

interface Concept {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  children: Concept[];
}

const ConceptMap: React.FC<ConceptMapProps> = ({ 
  skillName, 
  skillDescription = '', 
  proficiency 
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

Return ONLY a JSON object with this structure:
{
  "id": "root",
  "name": "${skillName}",
  "description": "Brief overview of the skill",
  "parentId": null,
  "children": [
    {
      "id": "concept1",
      "name": "Concept 1 Name",
      "description": "Brief description of this concept",
      "parentId": "root",
      "children": [
        {
          "id": "subconcept1",
          "name": "Subconcept 1 Name",
          "description": "Brief description of this subconcept",
          "parentId": "concept1",
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

  const renderConceptNode = (concept: Concept, level = 0) => {
    const hasChildren = concept.children && concept.children.length > 0;
    const isExpanded = expandedNodes.includes(concept.id);
    
    return (
      <div key={concept.id} className={`ml-${level * 4} mb-2`} style={{ marginLeft: `${level * 16}px` }}>
        <div className="flex items-start">
          {hasChildren ? (
            <Collapsible open={isExpanded}>
              <CollapsibleTrigger 
                onClick={() => toggleNode(concept.id)}
                className="mr-1 mt-1"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2">
                  {concept.children.map(child => renderConceptNode(child, level + 1))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className="w-4 mr-1"></div>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help flex items-center bg-accent/50 rounded px-2 py-1">
                  <Lightbulb size={14} className="mr-1 text-primary" />
                  <span>{concept.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{concept.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !conceptMap) {
      generateConceptMap();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-auto py-3 flex flex-col items-center text-center">
          <Lightbulb size={16} />
          <span>Concept Map</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{skillName} Concept Map</span>
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                <X size={16} />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p>Generating concept map...</p>
            </div>
          ) : conceptMap ? (
            <Card>
              <CardContent className="pt-6">
                {renderConceptNode(conceptMap)}
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center p-12">
              <p>Failed to generate concept map</p>
              <Button onClick={generateConceptMap} className="mt-4">Try Again</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConceptMap;
