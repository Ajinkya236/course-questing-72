
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
    <div className="modern-card p-6 mb-6">
      <h3 className="text-lg font-semibold mb-5">Skill Information</h3>
      
      <div className="flex items-center mb-5">
        <span className="mr-3 text-sm font-medium">Proficiency:</span>
        <Badge 
          variant="secondary" 
          className="bg-primary/10 text-primary border-primary/20"
        >
          {proficiency}
        </Badge>
      </div>
      
      <div className="space-y-5">
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">Estimated Time to Achieve</p>
            <p className="text-sm text-muted-foreground">
              {proficiency === "Awareness" ? "1-2 weeks" : 
                proficiency === "Knowledge" ? "3-6 weeks" : 
                proficiency === "Skill" ? "2-4 months" : "6+ months"}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">Last Updated</p>
            <p className="text-sm text-muted-foreground">2 months ago</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Users className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">Learners</p>
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
