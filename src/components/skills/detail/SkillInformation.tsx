
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Calendar, 
  Users, 
  BookmarkPlus, 
  Share2 
} from "lucide-react";

interface SkillInformationProps {
  proficiency: string;
}

const SkillInformation: React.FC<SkillInformationProps> = ({ proficiency }) => {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Skill Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Estimated Time to Achieve</p>
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
            <p className="text-sm font-medium">Last Updated</p>
            <p className="text-sm text-muted-foreground">2 months ago</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Users className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Learners</p>
            <p className="text-sm text-muted-foreground">
              {Math.floor(Math.random() * 5000) + 1000} enrolled
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-6">
        <Button variant="outline" size="sm" className="flex-1">
          <BookmarkPlus className="h-4 w-4 mr-2" />
          <span>Save</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
};

export default SkillInformation;
