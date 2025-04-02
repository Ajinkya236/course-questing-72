
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface EarnSkillButtonProps {
  skillId: number;
  skillName: string;
}

const EarnSkillButton: React.FC<EarnSkillButtonProps> = ({ skillId, skillName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/skills/${skillId}/assessment`);
  };

  return (
    <Button 
      onClick={handleClick}
      variant="default"
      className="flex items-center gap-2"
    >
      <Award className="h-4 w-4" />
      Earn Skill Badge
    </Button>
  );
};

export default EarnSkillButton;
