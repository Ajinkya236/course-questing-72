
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, User, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { mockCourses } from '@/data/mockCoursesData';
import { useNavigate, useParams } from 'react-router-dom';

interface LearningGoalsTabProps {
  teamMemberId?: string;
}

const LearningGoalsTab: React.FC<LearningGoalsTabProps> = ({ teamMemberId }) => {
  // Show only two filter tabs - self assigned and manager assigned
  const [activeFilter, setActiveFilter] = useState('self');
  const navigate = useNavigate();
  const params = useParams();
  
  // Use the teamMemberId from props or from URL params
  const memberId = teamMemberId || params.memberId;
  
  // Mock learning goals data with courses
  const selfAssignedCourses = mockCourses.filter((_, index) => index < 6);
  const managerAssignedCourses = mockCourses.filter((_, index) => index >= 6 && index < 12);
  
  // Mock progress metrics for both self and manager assigned courses
  const progressMetrics = {
    self: {
      completed: 8,
      inProgress: 4,
      notStarted: 3,
      total: 15
    },
    manager: {
      completed: 5,
      inProgress: 7,
      notStarted: 6,
      total: 18
    }
  };
  
  // Get current metrics based on active filter
  const currentMetrics = activeFilter === 'self' ? progressMetrics.self : progressMetrics.manager;
  
  // Calculate overall skills proficiency across all goals
  const allSkills = [
    { name: 'Leadership', proficiency: 65, target: 80 },
    { name: 'Communication', proficiency: 75, target: 90 },
    { name: 'Strategic Thinking', proficiency: 45, target: 70 },
    { name: 'Data Analysis', proficiency: 40, target: 80 },
    { name: 'SQL', proficiency: 35, target: 70 },
    { name: 'Data Visualization', proficiency: 25, target: 65 },
    { name: 'Project Management', proficiency: 50, target: 85 },
    { name: 'Risk Assessment', proficiency: 40, target: 75 },
    { name: 'Team Coordination', proficiency: 60, target: 80 },
    { name: 'Client Communication', proficiency: 55, target: 80 },
    { name: 'Negotiation', proficiency: 30, target: 70 },
    { name: 'Problem Solving', proficiency: 45, target: 75 },
  ];
  
  // Get the active courses based on the current filter
  const getActiveCourses = () => {
    return activeFilter === 'self' ? selfAssignedCourses : managerAssignedCourses;
  };

  return (
    <div className="space-y-8">
      {/* Simplified Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="self" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {memberId ? 'Self-Assigned' : 'Assigned by Me'}
          </TabsTrigger>
          <TabsTrigger value="manager" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Manager-Assigned
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Learning Progress Summary Card */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Learning Progress</h3>
          <p className="text-sm text-muted-foreground">
            {activeFilter === 'self' 
              ? 'Progress on self-assigned learning goals' 
              : 'Progress on manager-assigned learning goals'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-secondary/30 rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2 mr-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <div className="flex items-center gap-1">
                  <h4 className="text-2xl font-bold">{currentMetrics.completed}</h4>
                  <span className="text-sm text-muted-foreground">courses</span>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 mr-3">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <div className="flex items-center gap-1">
                  <h4 className="text-2xl font-bold">{currentMetrics.inProgress}</h4>
                  <span className="text-sm text-muted-foreground">courses</span>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4 flex items-center">
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-2 mr-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Not Started</p>
                <div className="flex items-center gap-1">
                  <h4 className="text-2xl font-bold">{currentMetrics.notStarted}</h4>
                  <span className="text-sm text-muted-foreground">courses</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-2 mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall progress</span>
              <span>{currentMetrics.completed} of {currentMetrics.total} courses</span>
            </div>
            <Progress value={(currentMetrics.completed / currentMetrics.total) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Global List of Courses without grouping */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">
            {activeFilter === 'self' ? 'Self-Assigned Courses' : 'Manager-Assigned Courses'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {activeFilter === 'self' 
              ? 'Courses you have selected for your learning journey' 
              : 'Courses assigned to you by your manager'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {getActiveCourses().length > 0 ? (
              getActiveCourses().map(course => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  imageUrl={course.imageUrl}
                  category={course.category}
                  duration={course.duration}
                  rating={course.rating}
                  trainingCategory={course.trainingCategory}
                  isBookmarked={course.isBookmarked}
                  previewUrl={course.imageUrl} // Use imageUrl as fallback since videoUrl might not exist
                  isHot={course.isHot}
                  isNew={course.isNew}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <Target className="h-12 w-12 text-muted mb-4" />
                <h3 className="text-lg font-medium">No courses found</h3>
                <p className="text-muted-foreground text-center max-w-md mt-2">
                  You don't have any {activeFilter === 'self' ? 'self-assigned' : 'manager-assigned'} courses yet.
                </p>
                <Button variant="outline" className="mt-4">
                  {activeFilter === 'self' ? 'Browse Courses' : 'Request Course'}
                </Button>
              </div>
            )}
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
            {allSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-full">
                    {skill.proficiency}% / {skill.target}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${skill.proficiency >= skill.target ? 'bg-primary' : 'bg-primary'}`}
                    style={{ width: `${(skill.proficiency / skill.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningGoalsTab;
