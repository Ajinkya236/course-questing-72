
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { proficiencyColors } from '@/data/skillsData';

interface AssessmentHeaderProps {
  skillName?: string;
  proficiency?: string;
  proficiencyOptions: string[];
  onProficiencyChange: (proficiency: string) => void;
  onBack: () => void;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  skillName = '',
  proficiency = '',
  proficiencyOptions,
  onProficiencyChange,
  onBack
}) => {
  return (
    <div className="flex flex-col space-y-4 mb-8">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{skillName} Assessment</h1>
      </div>
      
      <div>
        <p className="text-muted-foreground mb-2">Proficiency Level:</p>
        <div className="flex flex-wrap gap-2">
          {proficiencyOptions.map((option) => {
            const isSelected = option === proficiency;
            const colorKey = option.toLowerCase() as keyof typeof proficiencyColors;
            const bgColor = proficiencyColors[colorKey] || 'bg-gray-200';
            
            return (
              <Button
                key={option}
                variant="outline"
                size="sm"
                className={`rounded-full px-4 border-2 ${
                  isSelected 
                    ? `${bgColor} text-white border-transparent` 
                    : `bg-transparent border-${bgColor.replace('bg-', '')} text-foreground`
                }`}
                onClick={() => onProficiencyChange(option)}
              >
                {option}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssessmentHeader;
