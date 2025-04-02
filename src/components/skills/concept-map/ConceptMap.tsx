
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ConceptMapProps {
  skillName: string;
  skillDescription?: string;
  proficiency: string;
  skillId?: number;
}

const ConceptMap: React.FC<ConceptMapProps> = ({ 
  skillName, 
  skillDescription = '', 
  proficiency,
  skillId
}) => {
  const navigate = useNavigate();
  
  const handleOpenConceptMap = () => {
    if (skillId) {
      navigate(`/concept-map/${skillId}`);
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

export default ConceptMap;
