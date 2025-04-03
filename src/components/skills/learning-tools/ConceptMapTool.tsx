
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ConceptMapToolProps {
  skillName: string;
  skillDescription?: string;
  proficiency: string;
  skillId?: number;
}

const ConceptMapTool: React.FC<ConceptMapToolProps> = ({ 
  skillName, 
  skillDescription, 
  proficiency, 
  skillId 
}) => {
  const navigate = useNavigate();
  
  const handleOpenFullPage = () => {
    if (skillId) {
      navigate(`/skills/${skillId}/concept-map`);
    }
  };

  return (
    <Button
      variant="outline"
      className="h-auto py-3 flex flex-col items-center text-center"
      onClick={handleOpenFullPage}
    >
      <Lightbulb size={16} />
      <span>Concept Map</span>
    </Button>
  );
};

export default ConceptMapTool;
