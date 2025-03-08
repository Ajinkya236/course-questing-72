
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Plus, Clock, Check, Target, Award, ChevronDown, ChevronUp, UserPlus, User, Briefcase } from 'lucide-react';
import { mockCourses } from '@/data/mockCoursesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCarousel from '@/components/CourseCarousel';

interface LearningGoalsTabProps {
  teamMemberId?: string;
}

const LearningGoalsTab: React.FC<LearningGoalsTabProps> = ({ teamMemberId }) => {
  const [activeTab, setActiveTab] = useState('goals');
  const [expandedGoals, setExpandedGoals] = useState<number[]>([]);
  
  // Mock data - in a real app, we'd fetch data based on teamMemberId if provided
  const goals = [
    {
      id: 1,
      title: 'Complete Data Analysis Course',
      description: 'Finish the advanced data analysis course and apply skills to current project.',
      progress: 75,
      dueDate: '2023-12-31',
      status: 'in-progress',
      tags: ['Technical', 'Data', 'Priority'],
      assignedCoursesIds: ['course-002', 'course-008'],
      skillsGained: [
        { name: 'Data Analysis', proficiency: 70 },
        { name: 'Visualization', proficiency: 60 },
        { name: 'Critical Thinking', proficiency: 80 }
      ],
      assignedBy: 'self'
    },
    {
      id: 2,
      title: 'Improve Leadership Skills',
      description: 'Take leadership workshops and apply learnings in team meetings.',
      progress: 40,
      dueDate: '2024-02-15',
      status: 'in-progress',
      tags: ['Soft Skills', 'Leadership'],
      assignedCoursesIds: ['course-001', 'course-011'],
      skillsGained: [
        { name: 'Team Management', proficiency: 45 },
        { name: 'Conflict Resolution', proficiency: 30 },
        { name: 'Communication', proficiency: 55 }
      ],
      assignedBy: 'manager'
    },
    {
      id: 3,
      title: 'Obtain Project Management Certification',
      description: 'Study for and pass the PMP certification exam.',
      progress: 100,
      dueDate: '2023-10-01',
      status: 'completed',
      tags: ['Certification', 'Project Management'],
      assignedCoursesIds: ['course-004', 'course-015'],
      skillsGained: [
        { name: 'Project Planning', proficiency: 90 },
        { name: 'Risk Management', proficiency: 85 },
        { name: 'Resource Allocation', proficiency: 95 }
      ],
      assignedBy: 'self'
    },
    {
      id: 4,
      title: 'Learn JavaScript Frameworks',
      description: 'Complete training on React, Vue, and Angular.',
      progress: 0,
      dueDate: '2024-04-30',
      status: 'not-started',
      tags: ['Technical', 'Web Development'],
      assignedCoursesIds: [],
      skillsGained: [],
      assignedBy: 'manager'
    }
  ];

  // Courses assigned by me and my manager
  const selfAssignedCourses = mockCourses.filter(course => 
    goals.filter(goal => goal.assignedBy === 'self')
         .flatMap(goal => goal.assignedCoursesIds)
         .includes(course.id)
  );
  
  const managerAssignedCourses = mockCourses.filter(course => 
    goals.filter(goal => goal.assignedBy === 'manager')
         .flatMap(goal => goal.assignedCoursesIds)
         .includes(course.id)
  );

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const inProgressGoals = goals.filter(goal => goal.status === 'in-progress').length;
  const notStartedGoals = goals.filter(goal => goal.status === 'not-started').length;
  const completionPercentage = Math.round((completedGoals / totalGoals) * 100);

  const toggleGoalExpansion = (goalId: number) => {
    setExpandedGoals(prevExpanded => 
      prevExpanded.includes(goalId) 
        ? prevExpanded.filter(id => id !== goalId)
        : [...prevExpanded, goalId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Goals Progress Overview */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Goals Progress</h3>
          <div className="flex items-center gap-4">
            <Progress value={completionPercentage} className="h-2 flex-1" />
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{notStartedGoals}</p>
              <p className="text-sm text-muted-foreground">Not Started</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{inProgressGoals}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{completedGoals}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t pt-4">
            <div className="text-center">
              <p className="text-xl font-bold">{selfAssignedCourses.length}</p>
              <p className="text-sm text-muted-foreground">Self-assigned Courses</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{managerAssignedCourses.length}</p>
              <p className="text-sm text-muted-foreground">Manager-assigned Courses</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Goals and Assigned Courses */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="goals">Learning Goals</TabsTrigger>
          <TabsTrigger value="self-assigned">Self-assigned</TabsTrigger>
          <TabsTrigger value="manager-assigned">Manager-assigned</TabsTrigger>
        </TabsList>
        
        {/* Goals List */}
        <TabsContent value="goals" className="space-y-4 mt-4">
          {/* Action Button - Don't show when viewing team member's goals */}
          {!teamMemberId && (
            <div className="flex justify-end">
              <Button><Plus className="mr-2 h-4 w-4" /> Set New Goal</Button>
            </div>
          )}
          
          <div className="grid gap-4 md:grid-cols-2">
            {goals.map(goal => (
              <Card key={goal.id} className={goal.assignedBy === 'manager' ? 'border-primary/30' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        {goal.assignedBy === 'manager' && (
                          <Badge variant="outline" className="ml-1 bg-primary/10">
                            <Briefcase className="h-3 w-3 mr-1" /> Manager Assigned
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    {goal.status === 'completed' ? (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">Completed</Badge>
                    ) : goal.status === 'in-progress' ? (
                      <Badge variant="secondary">In Progress</Badge>
                    ) : (
                      <Badge variant="outline">Not Started</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} />
                    <div className="flex gap-1 mt-3 flex-wrap">
                      {goal.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Expandable skills and courses section */}
                  {expandedGoals.includes(goal.id) && (
                    <div className="mt-4 pt-3 border-t">
                      {goal.skillsGained.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Skills Progress</h4>
                          <div className="space-y-3">
                            {goal.skillsGained.map((skill, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>{skill.name}</span>
                                  <span>{skill.proficiency}%</span>
                                </div>
                                <Progress value={skill.proficiency} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {goal.assignedCoursesIds.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Related Courses</h4>
                          <div className="space-y-2">
                            {mockCourses
                              .filter(course => goal.assignedCoursesIds.includes(course.id))
                              .map(course => (
                                <div key={course.id} className="flex items-center justify-between p-2 bg-secondary/10 rounded-md">
                                  <div className="flex items-center">
                                    <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center mr-2">
                                      <BookIcon className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm">{course.title}</span>
                                  </div>
                                  <Badge variant={course.status === 'completed' ? 'default' : 'outline'} className="text-xs">
                                    {course.status === 'completed' ? 'Completed' : 
                                     course.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                                  </Badge>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Due {new Date(goal.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => toggleGoalExpansion(goal.id)}
                      className="p-1 h-auto"
                    >
                      {expandedGoals.includes(goal.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    {!teamMemberId && (
                      <Button size="sm" variant="ghost">Update</Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Self Assigned Courses */}
        <TabsContent value="self-assigned" className="mt-4">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-xl font-medium">Courses You Assigned Yourself</h3>
          </div>
          
          {selfAssignedCourses.length > 0 ? (
            <CourseCarousel 
              title="Self-assigned Courses"
              courses={selfAssignedCourses} 
              showTrainingCategory={true}
            />
          ) : (
            <Card className="bg-muted/10">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <User className="h-12 w-12 text-muted mb-4" />
                <h3 className="text-lg font-medium">No self-assigned courses</h3>
                <p className="text-muted-foreground text-center max-w-md mt-2">
                  You haven't assigned any courses to yourself yet.
                </p>
                <Button variant="outline" className="mt-4">Browse Courses</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Manager Assigned Courses */}
        <TabsContent value="manager-assigned" className="mt-4">
          <div className="flex items-center mb-4">
            <Briefcase className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-xl font-medium">Courses Assigned by Your Manager</h3>
          </div>
          
          {managerAssignedCourses.length > 0 ? (
            <CourseCarousel 
              title="Manager-assigned Courses"
              courses={managerAssignedCourses} 
              showTrainingCategory={true}
            />
          ) : (
            <Card className="bg-muted/10">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Briefcase className="h-12 w-12 text-muted mb-4" />
                <h3 className="text-lg font-medium">No manager-assigned courses</h3>
                <p className="text-muted-foreground text-center max-w-md mt-2">
                  Your manager hasn't assigned any courses to you yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Book icon component
const BookIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
};

export default LearningGoalsTab;
