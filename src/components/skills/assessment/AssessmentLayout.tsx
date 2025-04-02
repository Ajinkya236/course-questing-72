
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BadgeAwardModal from './BadgeAwardModal';

interface AssessmentLayoutProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
  handleBack: () => void;
  skillName?: string;
  proficiency?: string;
  proficiencyOptions?: string[];
  onProficiencyChange?: (value: string) => void;
  showBadgeModal?: boolean;
  closeBadgeModal?: () => void;
  latestBadge?: any;
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({
  children,
  sidebarContent,
  handleBack,
  skillName = 'Skill',
  proficiency = 'Intermediate',
  proficiencyOptions = [],
  onProficiencyChange,
  showBadgeModal = false,
  closeBadgeModal = () => {},
  latestBadge
}) => {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-center">{skillName} Assessment</h1>
          <div className="w-[73px]"></div> {/* Empty div for alignment */}
        </div>
      </div>

      <div className="my-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Current Proficiency:</span>
              <Badge variant="outline" className="font-semibold">
                {proficiency}
              </Badge>
            </div>
            
            {proficiencyOptions.length > 0 && onProficiencyChange && (
              <div className="flex items-center gap-2">
                <span className="text-sm">Target Level:</span>
                <Select
                  value={proficiency}
                  onValueChange={onProficiencyChange}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select level" />
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
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-6">
          {sidebarContent}
        </div>
        <div className="col-span-1 md:col-span-3">
          {children}
        </div>
      </div>
      
      {showBadgeModal && latestBadge && (
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
