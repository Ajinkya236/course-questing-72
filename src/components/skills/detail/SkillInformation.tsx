
import React from 'react';
import { 
  Clock, 
  Calendar, 
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SkillInformationProps {
  proficiency: string;
}

const SkillInformation: React.FC<SkillInformationProps> = ({ proficiency }) => {
  return (
    <div className="content-section mb-6">
      <h3 className="heading-secondary mb-6">Skill Information</h3>
      
      <div className="flex items-center mb-6">
        <span className="mr-3 text-sm font-medium text-foreground">Current Proficiency:</span>
        <Badge 
          variant="secondary" 
          className="bg-primary/10 text-primary border-primary/20 font-medium px-4 py-1"
        >
          {proficiency}
        </Badge>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Estimated Time to Achieve</p>
            <p className="text-sm text-muted-foreground">
              {proficiency === "Awareness" ? "1-2 weeks" : 
                proficiency === "Knowledge" ? "3-6 weeks" : 
                proficiency === "Skill" ? "2-4 months" : "6+ months"}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Last Updated</p>
            <p className="text-sm text-muted-foreground">2 months ago</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Learners</p>
            <p className="text-sm text-muted-foreground">
              {Math.floor(Math.random() * 5000) + 1000} enrolled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillInformation;
