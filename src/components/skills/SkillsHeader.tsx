
import React from 'react';
import { Skill } from './types';
import SkillSearch from './SkillSearch';

interface SkillsHeaderProps {
  onSearch: (skills: Skill[]) => void;
  skills: Skill[];
}

const SkillsHeader: React.FC<SkillsHeaderProps> = ({ onSearch, skills }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <h1 className="text-3xl font-bold mb-4 md:mb-0">Skills Catalog</h1>
      <SkillSearch skills={skills} onSearch={onSearch} />
    </div>
  );
};

export default SkillsHeader;
