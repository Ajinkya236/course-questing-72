
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, BrainCircuit, Lightbulb, Code, Database, TrendingUp, Rocket } from 'lucide-react';
import { Button } from '../ui/button';
import { Skill } from './types';
import { proficiencyColors } from '@/data/skillsData';

interface SkillHeaderProps {
  skill: Skill;
  progress?: number;
}

// Helper function to get the appropriate icon
const getSkillIcon = (icon?: string) => {
  switch(icon) {
    case 'Award': return <Award className="h-10 w-10 text-primary" />;
    case 'BrainCircuit': return <BrainCircuit className="h-10 w-10 text-primary" />;
    case 'Lightbulb': return <Lightbulb className="h-10 w-10 text-primary" />;
    case 'Code': return <Code className="h-10 w-10 text-primary" />;
    case 'Database': return <Database className="h-10 w-10 text-primary" />;
    case 'Rocket': return <Rocket className="h-10 w-10 text-primary" />;
    case 'TrendingUp': return <TrendingUp className="h-10 w-10 text-primary" />;
    default: return <BrainCircuit className="h-10 w-10 text-primary" />;
  }
};

const SkillHeader: React.FC<SkillHeaderProps> = ({ skill, progress = 0 }) => {
  return (
    <div className="mb-8">
      <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Skill Icon */}
            <div className="bg-primary/10 p-4 rounded-full">
              {getSkillIcon(skill.icon)}
            </div>
            
            {/* Skill Info */}
            <div className="flex-grow">
              <h1 className="text-2xl font-heading text-gray-800 mb-2">{skill.name}</h1>
              <div className="flex flex-wrap gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs ${proficiencyColors[skill.proficiency as keyof typeof proficiencyColors] || "bg-gray-100 text-gray-800"}`}>
                  {skill.proficiency}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{skill.description}</p>
              
              {/* Progress bar only if there's progress */}
              {progress > 0 && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Your progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>
            
            {/* Action Button - Only show the Start Learning button */}
            <div>
              <Button className="w-full md:w-auto">
                Start Learning
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillHeader;
