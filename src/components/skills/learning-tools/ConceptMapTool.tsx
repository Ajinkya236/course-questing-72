
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Network } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConceptMapToolProps {
  skillName: string;
  skillDescription?: string;
  proficiency: string;
}

const ConceptMapTool: React.FC<ConceptMapToolProps> = ({ skillName, skillDescription, proficiency }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate directly to the concept map page
    navigate(`/skills/concept-map?skill=${encodeURIComponent(skillName)}&proficiency=${encodeURIComponent(proficiency)}`);
  };

  return (
    <Button 
      variant="outline" 
      className="h-24 md:h-36 flex flex-col items-center justify-center gap-2 p-4" 
      onClick={handleClick}
    >
      <Network className="h-6 w-6 text-primary" />
      <span className="text-sm font-medium">Concept Map</span>
    </Button>
  );
};

export default ConceptMapTool;
