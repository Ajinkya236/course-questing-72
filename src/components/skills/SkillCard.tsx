
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skill } from './types';

interface SkillCardProps {
  skill: Skill;
  onSkillClick: (skillId: number) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onSkillClick }) => {
  const proficiencyColor = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      case 'expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card key={skill.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{skill.name}</CardTitle>
          <Badge className={`${proficiencyColor(skill.proficiency)}`}>
            {skill.proficiency}
          </Badge>
        </div>
        <CardDescription className="mt-2 line-clamp-2">
          {skill.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2">
          {/* Use single category instead of categories array */}
          <Badge variant="outline" className="bg-muted/50">
            {skill.category}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 border-t">
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>{skill.courses ? skill.courses.length : 0} courses</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-primary"
          onClick={() => onSkillClick(skill.id)}
        >
          <span className="mr-1">Explore</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;
