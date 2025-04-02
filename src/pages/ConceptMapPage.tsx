
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConceptMapGeneration } from '@/components/skills/concept-map/useConceptMapGeneration';
import { downloadConceptMapAsHTML } from '@/components/skills/concept-map/conceptMapExport';
import ConceptNode from '@/components/skills/concept-map/ConceptNode';
import ProficiencyLegend from '@/components/skills/concept-map/ProficiencyLegend';
import PageLayout from "@/components/layout/PageLayout";

const ConceptMapPage = () => {
  const [searchParams] = useSearchParams();
  const conceptMapRef = useRef<HTMLDivElement>(null);
  
  const skillName = searchParams.get('skill') || 'Unknown Skill';
  const skillDescription = searchParams.get('description') || '';
  const proficiency = searchParams.get('proficiency') || 'Intermediate';
  
  const {
    isLoading,
    conceptMap,
    expandedNodes,
    generateConceptMap,
    toggleNode
  } = useConceptMapGeneration(skillName, skillDescription, proficiency);
  
  // Generate concept map on page load
  useEffect(() => {
    generateConceptMap();
  }, [skillName, skillDescription, proficiency]);
  
  const handleDownload = () => {
    downloadConceptMapAsHTML(conceptMap, skillName, proficiency);
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/skills/${skillName}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Skill
              </Link>
            </Button>
            
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{skillName} Concept Map</h1>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownload}
                className="flex items-center gap-2"
                disabled={!conceptMap}
              >
                <Download size={16} />
                Download Map
              </Button>
            </div>
            
            <p className="text-muted-foreground">
              Visual representation of key concepts for {skillName} at {proficiency} level
            </p>
            
            <div className="border rounded-lg p-4 bg-background">
              <ProficiencyLegend />
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                  <p>Generating concept map...</p>
                </div>
              ) : conceptMap ? (
                <Card ref={conceptMapRef} className="mt-4 shadow-lg">
                  <CardContent className="p-6 concept-map-container">
                    <ConceptNode 
                      concept={conceptMap} 
                      expandedNodes={expandedNodes} 
                      toggleNode={toggleNode} 
                    />
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <p>Failed to generate concept map</p>
                  <Button onClick={generateConceptMap} className="mt-4">Try Again</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ConceptMapPage;
