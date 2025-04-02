
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { proficiencyLevels, proficiencyColors } from './types';

const ProficiencyLegend: React.FC = () => {
  return (
    <div className="proficiency-legend flex flex-wrap gap-2 mb-4">
      {proficiencyLevels.map(level => (
        <Badge 
          key={level} 
          variant="outline" 
          className={`${proficiencyColors[level as keyof typeof proficiencyColors]}`}
        >
          {level}
        </Badge>
      ))}
    </div>
  );
};

export default ProficiencyLegend;
