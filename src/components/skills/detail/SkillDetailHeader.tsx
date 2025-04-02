
import React from 'react';
import SkillHeader from '@/components/skills/SkillHeader';

interface SkillDetailHeaderProps {
  skill: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onProficiencyChange: (proficiency: string) => void;
}

const SkillDetailHeader: React.FC<SkillDetailHeaderProps> = ({
  skill,
  activeTab,
  setActiveTab,
  onProficiencyChange
}) => {
  // Use the existing SkillHeader component
  return (
    <SkillHeader
      skill={skill}
      proficiency={skill.proficiency}
      onProficiencyChange={onProficiencyChange}
    />
  );
};

export default SkillDetailHeader;
