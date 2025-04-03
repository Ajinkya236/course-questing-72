
import React from 'react';
import ConceptMap from '@/components/skills/concept-map';

interface ConceptMapToolProps {
  skillName: string;
  skillDescription?: string;
  proficiency: string;
}

const ConceptMapTool: React.FC<ConceptMapToolProps> = ({ skillName, skillDescription, proficiency }) => {
  return (
    <ConceptMap 
      skillName={skillName}
      skillDescription={skillDescription}
      proficiency={proficiency}
    />
  );
};

export default ConceptMapTool;
