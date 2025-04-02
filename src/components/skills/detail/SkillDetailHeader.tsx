
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillHeader from '@/components/skills/SkillHeader';

interface SkillDetailHeaderProps {
  skill: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onProficiencyChange?: (value: string) => void;
}

const SkillDetailHeader: React.FC<SkillDetailHeaderProps> = ({
  skill,
  activeTab,
  setActiveTab,
  onProficiencyChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/skills">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Skills
          </Link>
        </Button>
      </div>
      
      <SkillHeader 
        skill={skill} 
        onProficiencyChange={onProficiencyChange}
      />
    </div>
  );
};

export default SkillDetailHeader;
