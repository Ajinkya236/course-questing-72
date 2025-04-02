
import React, { useState, useRef } from 'react';
import { Lightbulb, Download, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConceptMapGeneration } from './useConceptMapGeneration';
import { downloadConceptMapAsHTML } from './conceptMapExport';
import ConceptNode from './ConceptNode';
import ProficiencyLegend from './ProficiencyLegend';
import { ConceptMapProps } from './types';

const ConceptMap: React.FC<ConceptMapProps> = ({ 
  skillName, 
  skillDescription = '', 
  proficiency 
}) => {
  const conceptMapRef = useRef<HTMLDivElement>(null);
  
  const {
    isLoading,
    conceptMap,
    expandedNodes,
    generateConceptMap,
    toggleNode
  } = useConceptMapGeneration(skillName, skillDescription, proficiency);

  const handleOpenInNewPage = () => {
    // Generate concept map if not already generated
    if (!conceptMap) {
      generateConceptMap();
    }
    
    // Open in new window/tab
    const url = `/concept-map?skill=${encodeURIComponent(skillName)}&description=${encodeURIComponent(skillDescription)}&proficiency=${encodeURIComponent(proficiency)}`;
    window.open(url, '_blank');
  };

  const downloadConceptMap = () => {
    downloadConceptMapAsHTML(conceptMap, skillName, proficiency);
  };

  return (
    <>
      <Button
        variant="outline"
        className="h-auto py-3 flex flex-col items-center text-center"
        onClick={handleOpenInNewPage}
      >
        <Lightbulb size={16} />
        <span>Concept Map</span>
      </Button>
    </>
  );
};

export default ConceptMap;
