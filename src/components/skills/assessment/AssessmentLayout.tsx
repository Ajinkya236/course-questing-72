
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SkillBadgeModal } from './SkillBadgeModal';

interface AssessmentLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  handleBack: () => void;
  skillName?: string;
  proficiency?: string;
  proficiencyOptions?: string[];
  onProficiencyChange?: (proficiency: string) => void;
  showBadgeModal?: boolean;
  closeBadgeModal?: () => void;
  latestBadge?: any;
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({
  children,
  sidebarContent,
  handleBack,
  skillName,
  proficiency,
  proficiencyOptions = [],
  onProficiencyChange,
  showBadgeModal = false,
  closeBadgeModal = () => {},
  latestBadge
}) => {
  // Calculate progress percentage based on proficiency level
  const calculateProgress = (proficiencyLevel: string | undefined) => {
    if (!proficiencyLevel || !proficiencyOptions.length) return 0;
    const index = proficiencyOptions.indexOf(proficiencyLevel);
    return ((index + 1) / proficiencyOptions.length) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Skill
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Award className="mr-2 h-6 w-6 text-primary" />
            {skillName ? `${skillName} Assessment` : 'Skill Assessment'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete this assessment to demonstrate your proficiency in this skill
          </p>
        </div>
        
        {onProficiencyChange && proficiency && (
          <div className="w-full md:w-[200px]">
            <div className="mb-1 font-medium text-sm">Proficiency Level</div>
            <Select 
              value={proficiency} 
              onValueChange={onProficiencyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select proficiency" />
              </SelectTrigger>
              <SelectContent>
                {proficiencyOptions.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {proficiencyOptions.length > 0 && (
              <div className="mt-2 space-y-1">
                <Progress value={calculateProgress(proficiency)} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Advanced</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {children}
        </div>
        
        {sidebarContent && (
          <Card className="p-4">
            {sidebarContent}
          </Card>
        )}
      </div>
      
      {showBadgeModal && latestBadge && (
        <SkillBadgeModal 
          isOpen={showBadgeModal}
          onClose={closeBadgeModal}
          badge={latestBadge}
        />
      )}
    </div>
  );
};

export default AssessmentLayout;
