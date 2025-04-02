
import React from 'react';
import { Button } from "@/components/ui/button";
import { Award, ChevronLeft } from "lucide-react";
import { proficiencyColors } from '@/data/skillsData';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AssessmentHeaderProps {
  handleBack: () => void;
  skillName?: string;
  proficiency?: string;
  onProficiencyChange?: (value: string) => void;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({ 
  handleBack, 
  skillName,
  proficiency,
  onProficiencyChange
}) => {
  // Proficiency levels for the selection
  const proficiencyLevels = ['Awareness', 'Knowledge', 'Skill', 'Mastery'];

  return (
    <div className="mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleBack}
        className="mb-4 flex items-center"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Skill Details
      </Button>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <Award className="h-6 w-6 mr-2 text-primary" />
            {skillName} Assessment
          </h1>
          
          {onProficiencyChange ? (
            <div className="mt-2">
              <Tabs 
                value={proficiency} 
                onValueChange={onProficiencyChange}
              >
                <TabsList className="bg-transparent h-auto gap-2 p-1">
                  {proficiencyLevels.map((level) => (
                    <TabsTrigger
                      key={level}
                      value={level}
                      className={`px-3 py-1 rounded-full text-xs ${
                        proficiency === level 
                          ? proficiencyColors[level as keyof typeof proficiencyColors] 
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {level}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          ) : proficiency ? (
            <div className="mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs ${proficiencyColors[proficiency as keyof typeof proficiencyColors] || 'bg-gray-100'}`}>
                {proficiency} Level
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AssessmentHeader;
