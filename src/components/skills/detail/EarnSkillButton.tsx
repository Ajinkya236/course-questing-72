
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
  
  const handleGoToAssessment = () => {
    navigate(`/skills/${skillId}/assessment`);
  };

  return (
    <Button 
      onClick={handleGoToAssessment}
      className="flex items-center gap-2"
    >
      <Award size={16} />
      <span>Earn This Skill</span>
    </Button>
  );
};

export default EarnSkillButton;
