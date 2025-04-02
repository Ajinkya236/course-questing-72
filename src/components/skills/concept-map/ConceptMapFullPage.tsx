
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronLeft, Download, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockSkills } from '@/data/skillsData';
import { useConceptMapGeneration } from './useConceptMapGeneration';
import { downloadConceptMapAsHTML } from './conceptMapExport';
import ConceptNode from './ConceptNode';
import ProficiencyLegend from './ProficiencyLegend';

const ConceptMapFullPage = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const conceptMapRef = useRef<HTMLDivElement>(null);
  
  const {
    isLoading: isGenerating,
    conceptMap,
    expandedNodes,
    generateConceptMap,
    toggleNode
  } = useConceptMapGeneration(
    skill?.name || '', 
    skill?.description || '', 
    'Mastery' // Always use Mastery level
  );

  useEffect(() => {
    if (skillId) {
      const foundSkill = mockSkills.find(s => s.id === parseInt(skillId));
      if (foundSkill) {
        setSkill(foundSkill);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  }, [skillId]);

  useEffect(() => {
    if (skill) {
      generateConceptMap();
    }
  }, [skill]);

  const handleBack = () => {
    navigate(`/skills/${skillId}`);
  };

  const downloadConceptMapHandler = () => {
    if (conceptMap) {
      downloadConceptMapAsHTML(conceptMap, skill.name, 'Mastery');
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (conceptMapRef.current?.requestFullscreen) {
        conceptMapRef.current.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(err => console.error(`Error attempting to enable fullscreen: ${err.message}`));
      }
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error(`Error attempting to exit fullscreen: ${err.message}`));
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Skill Not Found</h1>
        <Button onClick={() => navigate('/skills')}>Return to Skills</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{skill.name} Concept Map | Learning Platform</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Skill Detail
          </Button>
          
          <h1 className="text-2xl font-bold">{skill.name} Concept Map</h1>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadConceptMapHandler}
              disabled={!conceptMap || isGenerating}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Map
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">Proficiency Level:</span> Mastery
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleZoomOut} 
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="text-sm">{Math.round(zoom * 100)}%</span>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleZoomIn} 
                disabled={zoom >= 2}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-card/50 border rounded-lg p-6">
          <ProficiencyLegend />
          
          <div ref={conceptMapRef} className="concept-map-container mt-4 overflow-auto">
            {isGenerating ? (
              <div className="flex items-center justify-center h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <span className="ml-3">Generating concept map...</span>
              </div>
            ) : conceptMap ? (
              <Card className="min-h-[600px]">
                <CardContent className="p-4">
                  <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.3s ease' }}>
                    <ConceptNode 
                      concept={conceptMap} 
                      expandedNodes={expandedNodes} 
                      toggleNode={toggleNode} 
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center p-12">
                <p>Failed to generate concept map</p>
                <Button onClick={generateConceptMap} className="mt-4">Try Again</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConceptMapFullPage;
