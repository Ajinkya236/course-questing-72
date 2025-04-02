
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Award } from 'lucide-react';

interface EarnSkillButtonProps {
  skillId: number;
  skillName: string;
}

const EarnSkillButton = ({ skillId, skillName }: EarnSkillButtonProps) => {
  const navigate = useNavigate();

  const handleEarnSkill = () => {
    navigate(`/skills/${skillId}/assessment`);
  };

  return (
    <Button 
      onClick={handleEarnSkill}
      className="flex items-center gap-2"
      variant="default"
    >
      <Award className="h-4 w-4" />
      Earn Skill Badge
    </Button>
  );
};

export default EarnSkillButton;
