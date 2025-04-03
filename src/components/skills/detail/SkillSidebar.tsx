
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Skill } from '@/components/skills/types';
import SkillInformation from './SkillInformation';
import SkillRelatedList from './SkillRelatedList';

interface SkillSidebarProps {
  skill: Skill;
}

const SkillSidebar: React.FC<SkillSidebarProps> = ({ skill }) => {
  return (
    <div className="col-span-1">
      <SkillInformation skill={skill} />
      
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
