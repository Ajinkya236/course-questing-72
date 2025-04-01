
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from 'lucide-react';
import { proficiencyColors } from '@/data/skillsData';

interface AssessmentHeaderProps {
  handleBack: () => void;
  skillName?: string;
  proficiency?: string;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  handleBack,
  skillName,
  proficiency
}) => {
  return (
    <>
      <Button 
        variant="ghost" 
        onClick={handleBack} 
        className="mb-4 flex items-center gap-1"
        size="sm"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Skill
      </Button>
      
      {skillName && (
        <div className="flex items-center font-archivo-black text-gray-700">
          <span>{skillName} Assessment</span>
          {proficiency && (
            <span className={`ml-3 text-xs px-3 py-1 rounded-full ${proficiencyColors[proficiency as keyof typeof proficiencyColors]}`}>
              {proficiency}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default AssessmentHeader;
