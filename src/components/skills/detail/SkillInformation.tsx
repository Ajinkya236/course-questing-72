
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
    <div className="content-section mb-8">
      <h3 className="heading-secondary mb-8">Skill Information</h3>
      
      <div className="flex items-center mb-8">
        <span className="mr-4 text-base font-semibold text-foreground">Current Proficiency:</span>
        <Badge 
          variant="secondary" 
          className="bg-slate-200 text-slate-700 border-slate-300 font-semibold px-6 py-2 text-sm"
        >
          {proficiency}
        </Badge>
      </div>
      
      <div className="space-y-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-6">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-base font-bold text-foreground mb-2">Estimated Time to Achieve</p>
            <p className="text-base text-muted-foreground">
              {proficiency === "Awareness" ? "1-2 weeks" : 
                proficiency === "Knowledge" ? "3-6 weeks" : 
                proficiency === "Skill" ? "2-4 months" : "6+ months"}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-6">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-base font-bold text-foreground mb-2">Last Updated</p>
            <p className="text-base text-muted-foreground">2 months ago</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-6">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-base font-bold text-foreground mb-2">Learners</p>
            <p className="text-base text-muted-foreground">
              {Math.floor(Math.random() * 5000) + 1000} enrolled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillInformation;
