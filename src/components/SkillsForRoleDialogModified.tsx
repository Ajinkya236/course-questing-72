
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Puzzle, Briefcase, Code, PenTool, BarChart, Trophy } from 'lucide-react';

// Mock data for role skills
const roleSkills = {
  'technical': [
    { id: 'ts1', name: 'JavaScript/TypeScript', proficiency: 85 },
    { id: 'ts2', name: 'React & Frontend Frameworks', proficiency: 70 },
    { id: 'ts3', name: 'API Development', proficiency: 65 },
    { id: 'ts4', name: 'Testing & Quality Assurance', proficiency: 40 },
  ],
  'soft': [
    { id: 'ss1', name: 'Communication', proficiency: 90 },
    { id: 'ss2', name: 'Problem Solving', proficiency: 75 },
    { id: 'ss3', name: 'Team Collaboration', proficiency: 85 },
    { id: 'ss4', name: 'Time Management', proficiency: 60 },
  ],
  'domain': [
    { id: 'ds1', name: 'E-commerce Domain Knowledge', proficiency: 50 },
    { id: 'ds2', name: 'Payment Processing', proficiency: 65 },
    { id: 'ds3', name: 'User Experience Principles', proficiency: 80 },
    { id: 'ds4', name: 'Conversion Optimization', proficiency: 45 },
  ]
};

interface SkillsForRoleDialogModifiedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SkillsForRoleDialogModified: React.FC<SkillsForRoleDialogModifiedProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [activeTab, setActiveTab] = useState('technical');
  
  // Calculate overall proficiency for the role
  const calculateOverallProficiency = () => {
    let totalSkills = 0;
    let totalProficiency = 0;
    
    Object.values(roleSkills).forEach(skillCategory => {
      skillCategory.forEach(skill => {
        totalProficiency += skill.proficiency;
        totalSkills++;
      });
    });
    
    return totalSkills > 0 ? Math.round(totalProficiency / totalSkills) : 0;
  };
  
  const overallProficiency = calculateOverallProficiency();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Skills for Your Role
          </DialogTitle>
          <DialogDescription>
            Track your proficiency in skills required for your current role
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {/* Overall Proficiency */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-primary" />
                Overall Role Proficiency
              </h3>
              <span className="font-medium">{overallProficiency}%</span>
            </div>
            <Progress value={overallProficiency} className="h-2.5" />
          </div>
          
          {/* Skill Categories */}
          <Tabs defaultValue="technical" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="technical" className="flex items-center gap-1.5">
                <Code className="h-4 w-4" />
                <span>Technical</span>
              </TabsTrigger>
              <TabsTrigger value="soft" className="flex items-center gap-1.5">
                <PenTool className="h-4 w-4" />
                <span>Soft Skills</span>
              </TabsTrigger>
              <TabsTrigger value="domain" className="flex items-center gap-1.5">
                <BarChart className="h-4 w-4" />
                <span>Domain</span>
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(roleSkills).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="space-y-4">
                  {skills.map(skill => (
                    <Card key={skill.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Puzzle className="h-4 w-4 text-primary" />
                              <h4 className="font-medium">{skill.name}</h4>
                            </div>
                            <Badge variant={skill.proficiency >= 70 ? "default" : "outline"}>
                              {skill.proficiency}% Proficiency
                            </Badge>
                          </div>
                          <Progress value={skill.proficiency} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsForRoleDialogModified;
