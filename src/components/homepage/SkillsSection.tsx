
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoveRight, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FollowSkills from '@/components/FollowSkills';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

const SkillsSection = () => {
  const navigate = useNavigate();

  // Mock data for skills progress
  const roleSkills = [
    { name: 'Leadership', proficiency: 85, color: '#4338ca' },
    { name: 'Communication', proficiency: 75, color: '#0ea5e9' },
    { name: 'Problem Solving', proficiency: 65, color: '#10b981' },
    { name: 'Data Analysis', proficiency: 45, color: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Skills you follow */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Skills you follow</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  View All Skills <MoveRight className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-6" align="end">
                <FollowSkills />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">JavaScript</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">React</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">TypeScript</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Node.js</span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Design</span>
            <span className="px-3 py-1 bg-secondary/80 text-secondary-foreground rounded-full text-sm">+15 more</span>
          </div>
        </div>
      </div>

      {/* Skills for your role */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Skills for your Role</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  View Details <Target className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0" align="end">
                <div className="p-6 border-b">
                  <h4 className="text-lg font-medium">Role Skills Progress</h4>
                  <p className="text-sm text-muted-foreground">Track your development in key role-specific skills</p>
                </div>
                <div className="p-6 space-y-4">
                  {roleSkills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="font-medium">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ width: `${skill.proficiency}%`, backgroundColor: skill.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-3">
            {roleSkills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="font-medium">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ width: `${skill.proficiency}%`, backgroundColor: skill.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
