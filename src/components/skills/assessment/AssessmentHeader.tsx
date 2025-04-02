
import React, { useState } from 'react';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { proficiencyColors } from '@/data/skillsData';

interface AssessmentHeaderProps {
  handleBack: () => void;
  skillName?: string;
  proficiency?: string;
  onProficiencyChange?: (value: string) => void;
}

// Updated proficiency levels
const PROFICIENCIES = ["Awareness", "Knowledge", "Skill", "Mastery"];

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  handleBack,
  skillName = "Unknown Skill",
  proficiency = "Knowledge",
  onProficiencyChange
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" size="sm" onClick={handleBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Skill
        </Button>
        
        <div className="flex items-center gap-2">
          {onProficiencyChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  Change Level <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {PROFICIENCIES.map((level) => (
                  <DropdownMenuItem
                    key={level}
                    onClick={() => onProficiencyChange(level)}
                    className="flex items-center gap-2"
                  >
                    <div 
                      className={`h-2 w-2 rounded-full`}
                      style={{ backgroundColor: proficiencyColors[level.toLowerCase()] }}
                    />
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold">{skillName} Skill Assessment</h1>
        <div className="flex items-center gap-2 mt-2">
          <div 
            className={`px-3 py-1 rounded-full text-sm font-medium`}
            style={{ 
              backgroundColor: proficiency ? '#1A1F2C' : '#1A1F2C',
              color: 'white'
            }}
          >
            {proficiency || "Knowledge"} Level
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHeader;
