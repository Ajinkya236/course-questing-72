
import React from 'react';
import { Skill } from './types';
import SkillSearch from './SkillSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SkillsHeaderProps {
  onSearch: (skills: Skill[]) => void;
  skills: Skill[];
  selectedProficiency?: string;
  onProficiencyChange?: (proficiency: string) => void;
}

const SkillsHeader: React.FC<SkillsHeaderProps> = ({ 
  onSearch, 
  skills,
  selectedProficiency,
  onProficiencyChange
}) => {
  const proficiencyLevels = ["Awareness", "Knowledge", "Skill", "Mastery"];
  
  const getProficiencyColor = (proficiency: string, isSelected: boolean) => {
    if (!isSelected) return "bg-secondary hover:bg-secondary/80";
    
    switch (proficiency.toLowerCase()) {
      case 'awareness':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'knowledge':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'skill':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'mastery':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Skills Catalog</h1>
        <SkillSearch skills={skills} onSearch={onSearch} />
      </div>
      
      {onProficiencyChange && (
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm font-medium mr-2 flex items-center">Filter by proficiency:</span>
          {proficiencyLevels.map((level) => (
            <Badge
              key={level}
              variant="secondary"
              className={`cursor-pointer px-3 py-1 ${getProficiencyColor(level, selectedProficiency === level)}`}
              onClick={() => onProficiencyChange(level)}
            >
              {level}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsHeader;
