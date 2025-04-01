
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, ChevronLeft } from "lucide-react";

interface SkillHeaderProps {
  skillName: string;
  skillDescription: string;
  proficiency: string;
  onProficiencyChange: (value: string) => void;
  onBack: () => void;
}

const SkillHeader: React.FC<SkillHeaderProps> = ({
  skillName,
  skillDescription,
  proficiency,
  onProficiencyChange,
  onBack
}) => {
  const proficiencyLevels = ["Awareness", "Knowledge", "Skill", "Mastery"];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-heading text-gray-700">{skillName}</h1>
        <span className={`px-3 py-1 rounded-full text-xs bg-${
          proficiency === 'Awareness' ? 'blue-100 text-blue-800' : 
          proficiency === 'Knowledge' ? 'purple-100 text-purple-800' : 
          proficiency === 'Skill' ? 'green-100 text-green-800' : 
          'orange-100 text-orange-800'}`}>
          {proficiency}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading text-xl text-gray-700">
            <Info className="h-5 w-5 text-primary" />
            About this Skill
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{skillDescription}</p>
          
          <div className="w-full sm:w-auto">
            <p className="text-sm font-medium mb-1">Current Proficiency</p>
            <Select value={proficiency} onValueChange={onProficiencyChange}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select proficiency level" />
              </SelectTrigger>
              <SelectContent>
                {proficiencyLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillHeader;
