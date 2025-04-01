
import React, { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
  skillName = "",
  proficiency = "",
  children,
  sidebarContent,
  showBadgeModal = false,
  closeBadgeModal = () => {},
  latestBadge = null
}) => {
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
            <CardContent className="pt-6">
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
      {showBadgeModal && (
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
