
import React, { ReactNode, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssessmentHeader from './AssessmentHeader';
import BadgeAwardModal from './BadgeAwardModal';
import { SkillBadge } from './types';
import { proficiencyColors } from '@/data/skillsData';

interface AssessmentLayoutProps {
  handleBack: () => void;
  skillName?: string;
  proficiency?: string;
  children: ReactNode;
  sidebarContent?: ReactNode;
  showBadgeModal: boolean;
  closeBadgeModal: () => void;
  latestBadge: SkillBadge | null;
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({
  handleBack,
  skillName,
  proficiency,
  children,
  sidebarContent,
  showBadgeModal,
  closeBadgeModal,
  latestBadge
}) => {
  // Add debug logging
  useEffect(() => {
    console.log("Assessment Layout mounted with:", { skillName, proficiency });
  }, [skillName, proficiency]);

  return (
    <div className="container mx-auto px-4 py-8">
      <AssessmentHeader 
        handleBack={handleBack} 
        skillName={skillName} 
        proficiency={proficiency} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center font-archivo-black text-gray-700">
                {skillName && (
                  <>
                    <span>{skillName} Assessment</span>
                    {proficiency && (
                      <span className={`ml-3 text-xs px-3 py-1 rounded-full ${proficiencyColors[proficiency as keyof typeof proficiencyColors] || 'bg-gray-100'}`}>
                        {proficiency}
                      </span>
                    )}
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {children}
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {sidebarContent}
        </div>
      </div>
      
      {/* Badge Award Modal */}
      <BadgeAwardModal 
        isOpen={showBadgeModal} 
        onClose={closeBadgeModal} 
        badge={latestBadge} 
      />
    </div>
  );
};

export default AssessmentLayout;
