
import React from 'react';
import CourseCarousel from '@/components/CourseCarousel';
import { mockCoursesData } from '@/data/mockCoursesData';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CoursesTabProps {
  teamMemberId?: string;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ teamMemberId }) => {
  // In a real app, we'd filter based on teamMemberId if provided
  const assignedCourses = mockCoursesData.filter(course => 
    course.status === 'assigned' || course.status === 'in-progress'
  );
  
  const completedCourses = mockCoursesData.filter(course => 
    course.status === 'completed'
  );
  
  const inProgressCourses = mockCoursesData.filter(course => 
    course.status === 'in-progress'
  );
  
  const notStartedCourses = mockCoursesData.filter(course => 
    course.status === 'assigned'
  );

  // Calculate overall learning progress
  const totalCourses = assignedCourses.length + completedCourses.length;
  const completionPercentage = Math.round((completedCourses.length / (totalCourses || 1)) * 100);

  return (
    <div className="space-y-8">
      {/* Learning Progress Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Learning Progress</h3>
          <div className="flex items-center gap-4">
            <Progress value={completionPercentage} className="h-2 flex-1" />
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{assignedCourses.length}</p>
              <p className="text-sm text-muted-foreground">Assigned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{inProgressCourses.length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{completedCourses.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* In Progress Courses */}
      <div>
        <h3 className="text-xl font-medium mb-4">In Progress</h3>
        <CourseCarousel 
          courses={inProgressCourses} 
          emptyMessage="No courses in progress" 
          showTrainingCategory={false}
        />
      </div>
      
      {/* Assigned/Not Started Courses */}
      <div>
        <h3 className="text-xl font-medium mb-4">Not Started</h3>
        <CourseCarousel 
          courses={notStartedCourses} 
          emptyMessage="No courses assigned" 
          showTrainingCategory={true}
        />
      </div>
      
      {/* Completed Courses */}
      <div>
        <h3 className="text-xl font-medium mb-4">Completed</h3>
        <CourseCarousel 
          courses={completedCourses} 
          emptyMessage="No completed courses" 
          showTrainingCategory={false}
        />
      </div>
    </div>
  );
};

export default CoursesTab;
