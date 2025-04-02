
import React, { useState } from 'react';
import { Source } from '@/components/skills/knowledge/types';
import RecommendedCourses from '@/components/skills/RecommendedCourses';

interface SkillTabContentProps {
  skill: any;
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  children?: React.ReactNode;
}

const SkillTabContent: React.FC<SkillTabContentProps> = ({
  skill,
  sources,
  setSources,
  children
}) => {
  return (
    <div className="space-y-8">
      {children}
      
      <RecommendedCourses 
        skillName={skill.name}
        selectedProficiency={skill.proficiency}
      />
    </div>
  );
};

export default SkillTabContent;
