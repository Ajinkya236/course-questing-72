
import React, { useState, useRef } from 'react';
import { Lightbulb, X, Download, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from '@/hooks/use-toast';
import { useGemini } from '@/hooks/useGemini';
import { Badge } from "@/components/ui/badge";

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
  proficiencyLevel?: string;
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
  const conceptMapRef = useRef<HTMLDivElement>(null);

  const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const proficiencyColors = {
    'Beginner': 'bg-green-100 text-green-800 border-green-300',
    'Intermediate': 'bg-blue-100 text-blue-800 border-blue-300',
    'Advanced': 'bg-purple-100 text-purple-800 border-purple-300',
    'Expert': 'bg-red-100 text-red-800 border-red-300'
  };

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

  const renderConceptNode = (concept: Concept, level = 0) => {
    const hasChildren = concept.children && concept.children.length > 0;
    const isExpanded = expandedNodes.includes(concept.id);
    const proficiencyLevel = concept.proficiencyLevel || 'Intermediate';
    const colorClass = proficiencyColors[proficiencyLevel as keyof typeof proficiencyColors] || '';
    
    return (
      <div key={concept.id} className="mb-3" style={{ marginLeft: `${level * 24}px` }}>
        <div className="flex items-start">
          {hasChildren ? (
            <Collapsible open={isExpanded}>
              <CollapsibleTrigger 
                onClick={() => toggleNode(concept.id)}
                className="mr-1 mt-1 hover:bg-accent rounded p-1 transition-colors"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 pl-2 border-l-2 border-dashed border-gray-200 ml-2 space-y-1">
                  {concept.children.map(child => renderConceptNode(child, level + 1))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className="w-6 mr-1"></div>
          )}
          
          <div className="concept-node flex-1">
            <div className={`p-2 rounded-lg border ${level === 0 ? 'bg-primary/10 border-primary/20' : 'bg-card hover:bg-accent/50 border-border'} transition-colors`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Lightbulb size={16} className="mr-2 text-primary" />
                  <span className="font-medium">{concept.name}</span>
                </div>
                {concept.proficiencyLevel && (
                  <Badge variant="outline" className={`text-xs ${colorClass}`}>
                    {concept.proficiencyLevel}
                  </Badge>
                )}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-muted-foreground truncate cursor-help max-w-md">
                      {concept.description.length > 60 
                        ? `${concept.description.substring(0, 60)}...` 
                        : concept.description}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>{concept.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
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

  const downloadConceptMapAsHTML = () => {
    if (!conceptMap) return;
    
    // Create styles for the exported HTML
    const styles = `
      body { font-family: Arial, sans-serif; margin: 20px; }
      .concept-map { max-width: 800px; margin: 0 auto; }
      .concept-title { text-align: center; margin-bottom: 20px; }
      .concept-node { margin-bottom: 10px; padding-left: 20px; }
      .node { background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 5px; }
      .node-title { font-weight: bold; }
      .node-description { font-size: 0.9em; color: #555; margin-top: 5px; }
      .proficiency { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 0.75em; margin-left: 10px; }
      .beginner { background-color: #d1fae5; color: #047857; }
      .intermediate { background-color: #dbeafe; color: #1e40af; }
      .advanced { background-color: #ede9fe; color: #6d28d9; }
      .expert { background-color: #fee2e2; color: #b91c1c; }
      .children { margin-left: 20px; border-left: 2px dashed #ccc; padding-left: 10px; }
    `;
    
    // Function to recursively generate HTML for concept nodes
    const generateConceptHTML = (concept: Concept): string => {
      const proficiencyClass = (concept.proficiencyLevel || 'Intermediate').toLowerCase();
      
      let html = `
        <div class="concept-node">
          <div class="node">
            <div class="node-header">
              <span class="node-title">${concept.name}</span>
              <span class="proficiency ${proficiencyClass}">${concept.proficiencyLevel || 'Intermediate'}</span>
            </div>
            <div class="node-description">${concept.description}</div>
          </div>
      `;
      
      if (concept.children && concept.children.length > 0) {
        html += '<div class="children">';
        concept.children.forEach(child => {
          html += generateConceptHTML(child);
        });
        html += '</div>';
      }
      
      html += '</div>';
      return html;
    };
    
    // Generate the full HTML document
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${skillName} Concept Map</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="concept-map">
          <h1 class="concept-title">${skillName} Concept Map (${proficiency} Level)</h1>
          ${conceptMap ? generateConceptHTML(conceptMap) : ''}
        </div>
      </body>
      </html>
    `;
    
    // Create a Blob and download link
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${skillName.replace(/\s+/g, '_')}_Concept_Map.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Concept Map Downloaded",
      description: "The concept map has been downloaded as an HTML file.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-auto py-3 flex flex-col items-center text-center">
          <Lightbulb size={16} />
          <span>Concept Map</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{skillName} Concept Map</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p>Generating concept map...</p>
            </div>
          ) : conceptMap ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Explore the key concepts and their relationships in {skillName}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={downloadConceptMapAsHTML}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Map
                </Button>
              </div>
              
              <div className="p-4 border rounded-md bg-card/50">
                <div className="proficiency-legend flex flex-wrap gap-2 mb-4">
                  {proficiencyLevels.map(level => (
                    <Badge 
                      key={level} 
                      variant="outline" 
                      className={`${proficiencyColors[level as keyof typeof proficiencyColors]}`}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
                
                <Card ref={conceptMapRef}>
                  <CardContent className="p-4 concept-map-container">
                    {renderConceptNode(conceptMap)}
                  </CardContent>
                </Card>
              </div>
            </div>
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
