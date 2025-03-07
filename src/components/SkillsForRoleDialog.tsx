
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';
import { Star, BarChart, Award, Target, CheckCircle, XCircle, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SkillsForRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skills?: Array<{ id: number; name: string; proficiency: number; target: number }>;
}

// Mock data for role-based skills
const roleSkills = [
  {
    id: 1,
    name: 'Project Management',
    description: 'Ability to plan, execute, and close projects successfully',
    proficiencyRequired: 80,
    currentProficiency: 65,
    status: 'in-progress',
    courses: [
      { id: 'pm1', title: 'Project Management Fundamentals', completed: true },
      { id: 'pm2', title: 'Advanced Project Planning', completed: false },
      { id: 'pm3', title: 'Risk Management for Projects', completed: false },
    ]
  },
  {
    id: 2,
    name: 'Leadership',
    description: 'Ability to lead and motivate teams effectively',
    proficiencyRequired: 75,
    currentProficiency: 60,
    status: 'in-progress',
    courses: [
      { id: 'l1', title: 'Leadership for New Managers', completed: true },
      { id: 'l2', title: 'Coaching and Mentoring Skills', completed: false },
    ]
  },
  {
    id: 3,
    name: 'Strategic Thinking',
    description: 'Ability to analyze situations and develop long-term plans',
    proficiencyRequired: 70,
    currentProficiency: 45,
    status: 'not-started',
    courses: [
      { id: 'st1', title: 'Strategic Decision Making', completed: false },
      { id: 'st2', title: 'Business Strategy Essentials', completed: false },
    ]
  },
  {
    id: 4,
    name: 'Communication',
    description: 'Ability to communicate effectively with stakeholders',
    proficiencyRequired: 85,
    currentProficiency: 85,
    status: 'completed',
    courses: [
      { id: 'c1', title: 'Effective Team Communication', completed: true },
      { id: 'c2', title: 'Presentation Skills Mastery', completed: true },
      { id: 'c3', title: 'Negotiation Skills', completed: true },
    ]
  },
  {
    id: 5,
    name: 'Data Analysis',
    description: 'Ability to interpret data and derive insights',
    proficiencyRequired: 60,
    currentProficiency: 30,
    status: 'not-started',
    courses: [
      { id: 'd1', title: 'Data-Driven Decision Making', completed: false },
      { id: 'd2', title: 'Business Analytics Fundamentals', completed: false },
    ]
  },
];

const SkillsForRoleDialog: React.FC<SkillsForRoleDialogProps> = ({ open, onOpenChange, skills }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'not-started':
        return <XCircle className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'not-started':
        return 'Not Started';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Target className="h-5 w-5 text-primary" />
            Skills for Your Role
          </DialogTitle>
          <DialogDescription>
            These are the key skills required for your current role. Track your progress in developing these skills.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4 mt-4">
          <div className="space-y-6">
            {roleSkills.map((skill) => (
              <div key={skill.id} className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(skill.status)}
                      <span className="text-sm">{getStatusText(skill.status)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Proficiency</span>
                      <span className="font-semibold">{skill.currentProficiency}%</span>
                    </div>
                    <Progress value={skill.currentProficiency} className="h-2" />
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">0%</span>
                      <span className={`${skill.currentProficiency >= skill.proficiencyRequired ? 'text-green-500' : 'text-muted-foreground'}`}>
                        Target: {skill.proficiencyRequired}%
                      </span>
                      <span className="text-muted-foreground">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsForRoleDialog;
