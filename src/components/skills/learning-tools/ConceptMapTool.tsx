
import React from 'react';
import ConceptMap from '@/components/skills/concept-map';

interface ConceptMapToolProps {
  skillName: string;
  skillDescription?: string;
  proficiency: string;
  skillId?: number;
}

const ConceptMapTool: React.FC<ConceptMapToolProps> = ({ skillName, skillDescription, proficiency, skillId }) => {
  return (
    <ConceptMap 
      skillName={skillName}
      skillDescription={skillDescription}
      proficiency={proficiency}
      skillId={skillId}
    />
  );
};

export default ConceptMapTool;
