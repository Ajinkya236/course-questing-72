
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, ChevronRight, BookOpen, User, Users, Award, Check } from 'lucide-react';
import CourseCarousel from '@/components/CourseCarousel';
import { mockCourses } from '@/data/mockCoursesData';

interface LearningGoalsTabProps {
  teamMemberId?: string;
}

const LearningGoalsTab: React.FC<LearningGoalsTabProps> = ({ teamMemberId }) => {
  // Show only two filter tabs - self assigned and manager assigned
  const [activeFilter, setActiveFilter] = useState('self');
  
  // Mock learning goals data
  const selfAssignedGoals = [
    {
      id: 1,
      title: 'Improve Leadership Skills',
      description: 'Develop better leadership capabilities to lead a team effectively',
      progress: 60,
      deadline: '2023-12-31',
      skills: [
        { name: 'Leadership', proficiency: 65, target: 80 },
        { name: 'Communication', proficiency: 75, target: 90 },
        { name: 'Strategic Thinking', proficiency: 45, target: 70 },
      ],
      courses: mockCourses.filter((_, index) => index < 3),
    },
    {
      id: 2, 
      title: 'Master Data Analysis',
      description: 'Learn advanced data analysis techniques for better decision making',
      progress: 30,
      deadline: '2023-11-15',
      skills: [
        { name: 'Data Analysis', proficiency: 40, target: 80 },
        { name: 'SQL', proficiency: 35, target: 70 },
        { name: 'Data Visualization', proficiency: 25, target: 65 },
      ],
      courses: mockCourses.filter((_, index) => index >= 3 && index < 6),
    }
  ];
  
  const managerAssignedGoals = [
    {
      id: 3,
      title: 'Technical Certification',
      description: 'Complete certification for project management',
      progress: 45,
      deadline: '2023-10-30',
      skills: [
        { name: 'Project Management', proficiency: 50, target: 85 },
        { name: 'Risk Assessment', proficiency: 40, target: 75 },
        { name: 'Team Coordination', proficiency: 60, target: 80 },
      ],
      courses: mockCourses.filter((_, index) => index >= 6 && index < 9),
    },
    {
      id: 4,
      title: 'Client Management',
      description: 'Improve skills for better client interactions and management',
      progress: 20,
      deadline: '2023-12-15',
      skills: [
        { name: 'Client Communication', proficiency: 55, target: 80 },
        { name: 'Negotiation', proficiency: 30, target: 70 },
        { name: 'Problem Solving', proficiency: 45, target: 75 },
      ],
      courses: mockCourses.filter((_, index) => index >= 9 && index < 12),
    }
  ];

  // Calculate overall skills proficiency across all goals
  const allSkills = [...selfAssignedGoals.flatMap(goal => goal.skills), 
                     ...managerAssignedGoals.flatMap(goal => goal.skills)];
  
  const uniqueSkills = Array.from(new Map(
    allSkills.map(skill => [skill.name, skill])
  ).values());
  
  // Get the active goals based on the current filter
  const getActiveGoals = () => {
    return activeFilter === 'self' ? selfAssignedGoals : managerAssignedGoals;
  };

  return (
    <div className="space-y-8">
      {/* Learning Goals Progress Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">Learning Goals Progress</h3>
              <p className="text-muted-foreground">Track your progress towards your learning goals</p>
            </div>
            <div className="mt-2 md:mt-0">
              <Button variant="outline" className="gap-2">
                <Target className="h-4 w-4" />
                <span>Add New Goal</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Self-Assigned Goals</span>
                <span className="text-sm">{selfAssignedGoals.length} goals</span>
              </div>
              {selfAssignedGoals.map(goal => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm truncate">{goal.title}</span>
                    <span className="text-sm">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Manager-Assigned Goals</span>
                <span className="text-sm">{managerAssignedGoals.length} goals</span>
              </div>
              {managerAssignedGoals.map(goal => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm truncate">{goal.title}</span>
                    <span className="text-sm">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills and Proficiency Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Skills & Proficiency</h3>
          <p className="text-sm text-muted-foreground">Skills gained from all your learning goals</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uniqueSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-full">
                    {skill.proficiency}% / {skill.target}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${skill.proficiency >= skill.target ? 'bg-green-500' : 'bg-primary'}`}
                    style={{ width: `${(skill.proficiency / skill.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Simplified Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="self" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Self-Assigned
          </TabsTrigger>
          <TabsTrigger value="manager" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Manager-Assigned
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Learning Goals Display */}
      <div className="space-y-8">
        {getActiveGoals().map(goal => (
          <Card key={goal.id} className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-2">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-medium">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
                <div className="flex mt-2 md:mt-0 space-x-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <Badge variant={goal.progress >= 75 ? "success" : "secondary"}>
                    {goal.progress}% Complete
                  </Badge>
                </div>
              </div>
              <Progress value={goal.progress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent className="pt-4">
              <h4 className="text-sm font-medium mb-2">Skills Being Developed</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {goal.skills.map((skill, index) => (
                  <div key={index} className="bg-secondary/20 p-2 rounded-lg">
                    <p className="text-sm font-medium">{skill.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress 
                        value={(skill.proficiency / skill.target) * 100} 
                        className="h-1.5 w-24" 
                      />
                      <span className="text-xs">{skill.proficiency}/{skill.target}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-medium mb-3">Assigned Courses</h4>
                <CourseCarousel 
                  title="" 
                  courses={goal.courses}
                  showTrainingCategory={true}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {getActiveGoals().length === 0 && (
          <Card className="bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Target className="h-12 w-12 text-muted mb-4" />
              <h3 className="text-lg font-medium">No learning goals found</h3>
              <p className="text-muted-foreground text-center max-w-md mt-2">
                You don't have any {activeFilter === 'self' ? 'self-assigned' : 'manager-assigned'} learning goals yet.
              </p>
              <Button variant="outline" className="mt-4">
                {activeFilter === 'self' ? 'Create Goal' : 'Request Goal'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LearningGoalsTab;
