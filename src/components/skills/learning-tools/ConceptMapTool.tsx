
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Lightbulb } from 'lucide-react';

interface ConceptMapToolProps {
  skillName: string;
  skillDescription?: string;
  proficiency: string;
  skillId?: number;
}

const ConceptMapTool: React.FC<ConceptMapToolProps> = ({ skillName, skillDescription, proficiency, skillId }) => {
  const navigate = useNavigate();

  const handleOpenConceptMap = () => {
    if (skillId) {
      // Navigate directly to the concept map page
      navigate(`/skills/${skillId}/concept-map`);
    } else {
      console.error("Cannot navigate to concept map: skillId is undefined");
    }
  };

  return (
    <Button
      variant="outline"
      className="h-auto py-3 flex flex-col items-center text-center"
      onClick={handleOpenConceptMap}
    >
      <Lightbulb size={16} />
      <span>Concept Map</span>
    </Button>
  );
};

export default ConceptMapTool;
