
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Skill } from '@/components/skills/types';
import { mockSkills } from '@/data/skillsData';

interface SkillRelatedListProps {
  currentSkillId: number;
  category: string;
}

const SkillRelatedList: React.FC<SkillRelatedListProps> = ({ 
  currentSkillId, 
  category 
}) => {
  return (
    <div className="space-y-3">
      {mockSkills
        .filter(s => s.id !== currentSkillId && s.category === category)
        .slice(0, 5)
        .map(relatedSkill => (
          <Link 
            key={relatedSkill.id} 
            to={`/skills/${relatedSkill.id}`}
            className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              {React.createElement(
                mockSkills.find(s => s.id === relatedSkill.id)?.icon ? 
                  require('lucide-react')[mockSkills.find(s => s.id === relatedSkill.id)?.icon || 'Zap'] : 
                  require('lucide-react').Zap
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{relatedSkill.name}</p>
              <p className="text-xs text-muted-foreground">{relatedSkill.proficiency}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SkillRelatedList;
