
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useConceptMapGeneration } from '@/components/skills/concept-map/useConceptMapGeneration';
import { downloadConceptMapAsHTML } from '@/components/skills/concept-map/conceptMapExport';
import ConceptNode from '@/components/skills/concept-map/ConceptNode';
import ProficiencyLegend from '@/components/skills/concept-map/ProficiencyLegend';
import PageLayout from "@/components/layout/PageLayout";
import { mockSkills } from '@/data/skillsData';

const ConceptMapPage: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const [skill, setSkill] = useState<any>(null);
  
  // Always use "Mastery" level for concept maps
  const proficiency = "Mastery";
  
  const {
    isLoading,
    conceptMap,
    expandedNodes,
    generateConceptMap,
    toggleNode
  } = useConceptMapGeneration(
    skill?.name || '', 
    skill?.description || '', 
    proficiency
  );
  
  useEffect(() => {
    if (skillId) {
      // Find the skill from mockSkills or your API
      const foundSkill = mockSkills.find(s => s.id === Number(skillId));
      if (foundSkill) {
        setSkill(foundSkill);
      }
    }
  }, [skillId]);
  
  useEffect(() => {
    if (skill?.name) {
      generateConceptMap();
    }
  }, [skill, generateConceptMap]);
  
  const handleBack = () => {
    navigate(`/skills/${skillId}`);
  };
  
  const downloadConceptMap = () => {
    downloadConceptMapAsHTML(conceptMap, skill?.name || 'Skill', proficiency);
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Skill
        </Button>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{skill?.name || 'Skill'} Concept Map</h1>
          <p className="text-muted-foreground">
            Explore the key concepts and their relationships at the {proficiency} level.
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p>Generating concept map...</p>
            </div>
          ) : conceptMap ? (
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={downloadConceptMap}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Map
                </Button>
              </div>
              
              <ProficiencyLegend />
              
              <div className="concept-map-container p-4 border rounded-lg bg-background/50">
                <ConceptNode 
                  concept={conceptMap} 
                  expandedNodes={expandedNodes} 
                  toggleNode={toggleNode} 
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12">
              <p>Failed to generate concept map</p>
              <Button onClick={generateConceptMap} className="mt-4">Try Again</Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ConceptMapPage;
