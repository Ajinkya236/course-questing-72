
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BadgeAwardModal from "./BadgeAwardModal";
import { Badge } from "@/components/ui/badge";

interface AssessmentLayoutProps {
  children: React.ReactNode;
  handleBack: () => void;
  skillName?: string;
  proficiency?: string;
  targetProficiency?: string;
  proficiencyOptions?: string[];
  onProficiencyChange?: (proficiency: string) => void;
  showBadgeModal?: boolean;
  closeBadgeModal?: () => void;
  latestBadge?: any;
  sidebarContent?: React.ReactNode;
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({
  children,
  handleBack,
  skillName,
  proficiency,
  targetProficiency,
  proficiencyOptions = [],
  onProficiencyChange,
  showBadgeModal = false,
  closeBadgeModal,
  latestBadge,
  sidebarContent
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content area */}
        <div className="flex-1">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 text-muted-foreground"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            
            <h1 className="text-2xl font-bold flex-1">
              {skillName ? `${skillName} Assessment` : "Skill Assessment"}
            </h1>
            
            {proficiencyOptions.length > 0 && onProficiencyChange && (
              <div className="hidden md:block">
                <Select
                  value={proficiency}
                  onValueChange={onProficiencyChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          {/* Proficiency information */}
          {proficiency && (
            <div className="mb-6 p-4 bg-card rounded-lg border">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <span className="text-sm text-muted-foreground">Current Proficiency:</span>
                  <Badge variant="outline" className="ml-2 bg-muted/50">
                    {proficiency}
                  </Badge>
                </div>
                
                {targetProficiency && targetProficiency !== proficiency && (
                  <div>
                    <span className="text-sm text-muted-foreground">Target Proficiency:</span>
                    <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {targetProficiency}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Mobile view select */}
          {proficiencyOptions.length > 0 && onProficiencyChange && (
            <div className="md:hidden mb-6">
              <Select
                value={proficiency}
                onValueChange={onProficiencyChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="bg-card border rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
        
        {/* Sidebar */}
        {sidebarContent && (
          <div className="w-full md:w-80 lg:w-96">
            {sidebarContent}
          </div>
        )}
      </div>
      
      {/* Badge award modal */}
      {showBadgeModal && closeBadgeModal && latestBadge && (
        <BadgeAwardModal
          isOpen={showBadgeModal}
          onClose={closeBadgeModal}
          badge={latestBadge}
        />
      )}
    </div>
  );
};

export default AssessmentLayout;
