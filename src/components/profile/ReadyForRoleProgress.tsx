
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Trophy, Star } from 'lucide-react';

// Mock data for skills proficiency
const userSkills = [
  { id: 1, name: "Project Management", proficiency: 85 },
  { id: 2, name: "Leadership", proficiency: 70 },
  { id: 3, name: "Technical Communication", proficiency: 60 },
  { id: 4, name: "Strategic Planning", proficiency: 45 },
  { id: 5, name: "Problem Solving", proficiency: 90 },
];

// Calculate overall readiness based on skills
const calculateOverallReadiness = (skills) => {
  if (!skills.length) return 0;
  const sum = skills.reduce((acc, skill) => acc + skill.proficiency, 0);
  return Math.round(sum / skills.length);
};

const ReadyForRoleProgress = () => {
  const overallReadiness = calculateOverallReadiness(userSkills);
  const isReadyForRole = overallReadiness === 100;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Ready for Role Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Readiness</span>
            <span className="text-sm font-medium">{overallReadiness}%</span>
          </div>
          <Progress value={overallReadiness} className="h-2" />
          
          {isReadyForRole ? (
            <div className="mt-2 flex items-center gap-2 bg-primary/10 p-2 rounded-md">
              <Badge className="bg-primary text-primary-foreground">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                Role Ready
              </Badge>
              <span className="text-sm">Congratulations! You've achieved full proficiency for your role.</span>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              Complete your skill proficiencies to earn the Role Ready badge
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Role-specific Skills</h3>
          
          <div className="space-y-3">
            {userSkills.map((skill) => (
              <div key={skill.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{skill.name}</span>
                  <span className="text-sm font-medium">{skill.proficiency}%</span>
                </div>
                <Progress value={skill.proficiency} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadyForRoleProgress;
