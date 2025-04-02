
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Skill } from '@/components/skills/types';
import { mockSkills } from '@/data/skillsData';
import { Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface SkillRelatedListProps {
  currentSkillId: number;
  category: string;
}

const SkillRelatedList: React.FC<SkillRelatedListProps> = ({ 
  currentSkillId, 
  category 
}) => {
  // Ensure currentSkillId is treated as a number for comparison
  const numericCurrentId = Number(currentSkillId);
  
  // Find related skills (same category, different ID)
  const relatedSkills = mockSkills.filter(
    s => s.category === category && s.id !== numericCurrentId
  ).slice(0, 5);
  
  if (relatedSkills.length === 0) {
    return (
      <div className="text-center py-2">
        <p className="text-sm text-muted-foreground">No related skills found.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {relatedSkills.map(relatedSkill => {
        // Get the icon component from lucide-react
        const IconComponent = relatedSkill.icon && 
          (LucideIcons as Record<string, React.ComponentType<any>>)[relatedSkill.icon] || 
          Zap;
        
        return (
          <Link 
            key={relatedSkill.id} 
            to={`/skills/${relatedSkill.id}`}
            className="flex items-center p-2 hover:bg-accent rounded-md transition-colors"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{relatedSkill.name}</p>
              <p className="text-xs text-muted-foreground">{relatedSkill.proficiency}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SkillRelatedList;
