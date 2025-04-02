
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import BadgeAwardModal from './BadgeAwardModal';
import { proficiencyColors } from "@/data/skillsData";

interface AssessmentLayoutProps {
  handleBack: () => void;
  skillName?: string;
  proficiency?: string;
  proficiencyOptions?: string[];
  onProficiencyChange?: (proficiency: string) => void;
  showBadgeModal: boolean;
  closeBadgeModal: () => void;
  latestBadge: any;
  sidebarContent: React.ReactNode;
  children: React.ReactNode;
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({
  handleBack,
  skillName,
  proficiency,
  proficiencyOptions = [],
  onProficiencyChange,
  showBadgeModal,
  closeBadgeModal,
  latestBadge,
  sidebarContent,
  children
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Skill
        </Button>
      </div>
      
      <div className="mb-6 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{skillName} Assessment</h1>
        {proficiency && (
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-center gap-2 flex-wrap">
              {proficiencyOptions && proficiencyOptions.length > 0 && onProficiencyChange && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {proficiencyOptions.map((option) => {
                    const isSelected = proficiency === option;
                    const bgColorClass = isSelected ? `bg-${proficiencyColors[option.toLowerCase()]}` : '';
                    const hoverClass = isSelected ? `hover:bg-${proficiencyColors[option.toLowerCase()]}/90` : '';
                    
                    return (
                      <Button
                        key={option}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className={`rounded-full ${bgColorClass} ${hoverClass} ${isSelected ? 'text-white font-medium' : ''}`}
                        onClick={() => onProficiencyChange(option)}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="order-2 lg:order-1 col-span-1 lg:col-span-3">
          {children}
        </div>
        
        <div className="order-1 lg:order-2 col-span-1">
          {sidebarContent}
        </div>
      </div>
      
      <BadgeAwardModal
        isOpen={showBadgeModal}
        onClose={closeBadgeModal}
        badge={latestBadge}
        skillName={skillName || ""}
      />
    </div>
  );
};

export default AssessmentLayout;
