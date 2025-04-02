
import React from 'react';
import { Calendar, BookOpen, Award, Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';

interface SkillHeaderProps {
  skill: any;
  onProficiencyChange?: (value: string) => void;
}

const SkillHeader: React.FC<SkillHeaderProps> = ({ skill, onProficiencyChange }) => {
  const proficiencyOptions = ["Awareness", "Knowledge", "Skill", "Mastery"];
  const currentProficiency = skill.proficiency || proficiencyOptions[0];
  
  // Format date string in a human-readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };
  
  // Get the initials for the avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Calculate progress percentage based on proficiency level
  const calculateProgress = (proficiency: string) => {
    const index = proficiencyOptions.indexOf(proficiency);
    return ((index + 1) / proficiencyOptions.length) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(skill.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{skill.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs font-normal">
                {skill.category || 'Technology'}
              </Badge>
              <div className="flex items-center text-muted-foreground text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(skill.dateAdded) || 'Recently added'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-[150px]">
            <div className="text-sm font-medium mb-1">Current Proficiency</div>
            {onProficiencyChange ? (
              <Select value={currentProficiency} onValueChange={onProficiencyChange}>
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
            ) : (
              <Badge className="bg-primary">{currentProficiency}</Badge>
            )}
          </div>
          
          <Button asChild className="shrink-0">
            <Link to={`/skills/${skill.id}/assessment`}>
              <Award className="h-4 w-4 mr-2" />
              Earn Skill
            </Link>
          </Button>
        </div>
      </div>
      
      {skill.description && (
        <div className="bg-muted/60 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground mt-1">{skill.description}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium">Proficiency Progress</h3>
              <div className="mt-2 space-y-1">
                <Progress value={calculateProgress(currentProficiency)} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {proficiencyOptions.map((level, index) => (
                    <span key={level} className={currentProficiency === level ? "font-medium text-primary" : ""}>
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillHeader;
