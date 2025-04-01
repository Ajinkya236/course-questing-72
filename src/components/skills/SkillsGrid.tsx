
import React from 'react';
import { Skill } from './types';
import SkillCard from './SkillCard';
import EmptySkillsState from './EmptySkillsState';

interface SkillsGridProps {
  skills: Skill[];
  onSkillClick: (skillId: number) => void;
}

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills, onSkillClick }) => {
  if (skills.length === 0) {
    return <EmptySkillsState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <SkillCard 
          key={skill.id}
          skill={skill} 
          onSkillClick={onSkillClick} 
        />
      ))}
    </div>
  );
};

export default SkillsGrid;
