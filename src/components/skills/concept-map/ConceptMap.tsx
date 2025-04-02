
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Download, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useConceptMapGeneration } from './useConceptMapGeneration';
import { downloadConceptMapAsHTML } from './conceptMapExport';
import ConceptNode from './ConceptNode';
import ProficiencyLegend from './ProficiencyLegend';
import { ConceptMapProps } from './types';

const ConceptMap: React.FC<ConceptMapProps> = ({ 
  skillName, 
  skillDescription = '', 
  proficiency,
  skillId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const conceptMapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const {
    isLoading,
    conceptMap,
    expandedNodes,
    generateConceptMap,
    toggleNode
  } = useConceptMapGeneration(skillName, skillDescription, proficiency);

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !conceptMap) {
      generateConceptMap();
    }
  };

  const handleOpenFullPage = () => {
    if (skillId) {
      navigate(`/skills/${skillId}/concept-map`);
    }
  };

  const downloadConceptMap = () => {
    downloadConceptMapAsHTML(conceptMap, skillName, proficiency);
  };

  return (
    <>
      <Button
        variant="outline"
        className="h-auto py-3 flex flex-col items-center text-center"
        onClick={handleOpenFullPage}
      >
        <Lightbulb size={16} />
        <span>Concept Map</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
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
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleOpenFullPage}
                    className="flex items-center gap-2"
                  >
                    Open in Full Page
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={downloadConceptMap}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download Map
                  </Button>
                </div>
                
                <div className="p-4 border rounded-md bg-card/50">
                  <ProficiencyLegend />
                  
                  <Card ref={conceptMapRef}>
                    <CardContent className="p-4 concept-map-container">
                      {conceptMap && (
                        <ConceptNode 
                          concept={conceptMap} 
                          expandedNodes={expandedNodes} 
                          toggleNode={toggleNode} 
                        />
                      )}
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
    </>
  );
};

export default ConceptMap;
