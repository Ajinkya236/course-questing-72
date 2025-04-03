
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skill } from '@/components/skills/types';
import SkillInformation from './SkillInformation';
import SkillRelatedList from './SkillRelatedList';

interface SkillSidebarProps {
  skill: Skill;
}

const SkillSidebar: React.FC<SkillSidebarProps> = ({ skill }) => {
  // Map proficiency to a progress value
  const getProficiencyValue = (prof: string): number => {
    switch (prof.toLowerCase()) {
      case 'awareness': return 25;
      case 'knowledge': return 50;
      case 'skill': return 75;
      case 'mastery': return 100;
      default: return 25;
    }
  };

  const proficiencyValue = getProficiencyValue(skill.proficiency);

  return (
    <div className="col-span-1">
      <SkillInformation skill={skill} />
      
      <div className="bg-card rounded-lg border shadow-sm p-6 mb-4">
        <h3 className="text-lg font-semibold mb-2">Current Proficiency</h3>
        <div className="mb-2 flex justify-between text-sm">
          <span>{skill.proficiency}</span>
          <span>{proficiencyValue}%</span>
        </div>
        <Progress value={proficiencyValue} className="h-2" />
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Related Skills</h3>
        
        <SkillRelatedList 
          currentSkillId={skill.id}
          category={skill.category}
        />
        
        <Button variant="link" size="sm" className="mt-2 w-full" asChild>
          <Link to="/skills">View All Skills</Link>
        </Button>
      </div>
    </div>
  );
};

export default SkillSidebar;
