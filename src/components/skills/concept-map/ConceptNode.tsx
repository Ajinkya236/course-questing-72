
import React from 'react';
import { Lightbulb, ChevronRight, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Concept, proficiencyColors } from './types';

interface ConceptNodeProps {
  concept: Concept;
  level?: number;
  expandedNodes: string[];
  toggleNode: (nodeId: string) => void;
}

const ConceptNode: React.FC<ConceptNodeProps> = ({ 
  concept, 
  level = 0, 
  expandedNodes, 
  toggleNode 
}) => {
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
                {concept.children.map(child => (
                  <ConceptNode 
                    key={child.id}
                    concept={child} 
                    level={level + 1} 
                    expandedNodes={expandedNodes} 
                    toggleNode={toggleNode} 
                  />
                ))}
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

export default ConceptNode;
