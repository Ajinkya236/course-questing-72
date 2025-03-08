
import React, { useState } from 'react';
import CourseCarousel from '@/components/CourseCarousel';
import { mockCourses } from '@/data/mockCoursesData';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Check, Clock, Bookmark, Share } from 'lucide-react';

interface CoursesTabProps {
  teamMemberId?: string;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ teamMemberId }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // In a real app, we'd filter based on teamMemberId if provided
  const assignedCourses = mockCourses.filter(course => 
    course.status === 'assigned'
  );
  
  const completedCourses = mockCourses.filter(course => 
    course.status === 'completed'
  );
  
  const inProgressCourses = mockCourses.filter(course => 
    course.status === 'in-progress'
  );
  
  // Mock data for saved and shared courses
  const savedCourses = mockCourses.filter(course => 
    course.isBookmarked === true
  );
  
  const sharedWithMeCourses = [
    {
      id: "shared-001",
      title: "Business Strategy Masterclass",
      description: "Learn key business strategy concepts from industry experts.",
      imageUrl: "https://source.unsplash.com/random/300x200?business",
      category: "Business",
      duration: "4h 30m",
      rating: 4.7,
      isBookmarked: false,
      trainingCategory: "Strategy",
      status: 'assigned',
      sharedBy: "Alex Thompson (Manager)"
    },
    {
      id: "shared-002",
      title: "Cybersecurity Fundamentals",
      description: "Essential cybersecurity concepts every professional should know.",
      imageUrl: "https://source.unsplash.com/random/300x200?security",
      category: "Technology",
      duration: "5h 15m",
      rating: 4.8,
      isBookmarked: false,
      trainingCategory: "Technical",
      status: 'assigned',
      sharedBy: "Ryan Miller (Team Lead)"
    }
  ];

  // Calculate overall learning progress
  const totalCourses = assignedCourses.length + completedCourses.length + inProgressCourses.length;
  const completedPercentage = Math.round((completedCourses.length / (totalCourses || 1)) * 100);
  const inProgressPercentage = Math.round((inProgressCourses.length / (totalCourses || 1)) * 100);

  // Get courses based on active filter
  const getFilteredCourses = () => {
    switch (activeFilter) {
      case 'assigned':
        return assignedCourses;
      case 'in-progress':
        return inProgressCourses;
      case 'completed':
        return completedCourses;
      case 'saved':
        return savedCourses;
      case 'shared':
        return sharedWithMeCourses;
      default:
        return [...inProgressCourses, ...assignedCourses, ...completedCourses];
    }
  };

  // Get filter badge count
  const getFilterCount = (filterType: string) => {
    switch (filterType) {
      case 'assigned':
        return assignedCourses.length;
      case 'in-progress':
        return inProgressCourses.length;
      case 'completed':
        return completedCourses.length;
      case 'saved':
        return savedCourses.length;
      case 'shared':
        return sharedWithMeCourses.length;
      default:
        return totalCourses;
    }
  };

  return (
    <div className="space-y-8">
      {/* Learning Progress Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Learning Progress</h3>
          <div className="flex items-center gap-4">
            <Progress value={completedPercentage} className="h-2 flex-1" />
            <span className="text-sm font-medium">{completedPercentage}%</span>
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

      {/* Course Filters */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeFilter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('all')}
          className="flex items-center gap-1"
        >
          <BookOpen className="h-4 w-4" />
          All Courses
          <Badge variant="secondary" className="ml-1">{totalCourses}</Badge>
        </Button>
        
        <Button 
          variant={activeFilter === 'in-progress' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('in-progress')}
          className="flex items-center gap-1"
        >
          <Clock className="h-4 w-4" />
          In Progress
          <Badge variant="secondary" className="ml-1">{inProgressCourses.length}</Badge>
        </Button>
        
        <Button 
          variant={activeFilter === 'assigned' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('assigned')}
          className="flex items-center gap-1"
        >
          <BookOpen className="h-4 w-4" />
          Not Started
          <Badge variant="secondary" className="ml-1">{assignedCourses.length}</Badge>
        </Button>
        
        <Button 
          variant={activeFilter === 'completed' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('completed')}
          className="flex items-center gap-1"
        >
          <Check className="h-4 w-4" />
          Completed
          <Badge variant="secondary" className="ml-1">{completedCourses.length}</Badge>
        </Button>
        
        <Button 
          variant={activeFilter === 'saved' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('saved')}
          className="flex items-center gap-1"
        >
          <Bookmark className="h-4 w-4" />
          Saved
          <Badge variant="secondary" className="ml-1">{savedCourses.length}</Badge>
        </Button>
        
        <Button 
          variant={activeFilter === 'shared' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('shared')}
          className="flex items-center gap-1"
        >
          <Share className="h-4 w-4" />
          Shared with Me
          <Badge variant="secondary" className="ml-1">{sharedWithMeCourses.length}</Badge>
        </Button>
      </div>

      {/* Filtered Courses Display */}
      <div>
        <h3 className="text-xl font-medium mb-4">{activeFilter === 'all' ? 'All Courses' : 
          activeFilter === 'in-progress' ? 'In Progress Courses' :
          activeFilter === 'assigned' ? 'Not Started Courses' :
          activeFilter === 'completed' ? 'Completed Courses' :
          activeFilter === 'saved' ? 'Saved Courses' : 'Courses Shared with Me'
        }</h3>
        
        {getFilteredCourses().length > 0 ? (
          <CourseCarousel 
            title={activeFilter === 'all' ? 'All Courses' : 
              activeFilter === 'in-progress' ? 'In Progress Courses' :
              activeFilter === 'assigned' ? 'Not Started Courses' :
              activeFilter === 'completed' ? 'Completed Courses' :
              activeFilter === 'saved' ? 'Saved Courses' : 'Courses Shared with Me'
            }
            courses={getFilteredCourses()} 
            showTrainingCategory={true}
          />
        ) : (
          <Card className="bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <BookOpen className="h-12 w-12 text-muted mb-4" />
              <h3 className="text-lg font-medium">No courses found</h3>
              <p className="text-muted-foreground text-center max-w-md mt-2">
                {activeFilter === 'in-progress' ? "You don't have any courses in progress." :
                 activeFilter === 'assigned' ? "You don't have any courses assigned." :
                 activeFilter === 'completed' ? "You haven't completed any courses yet." :
                 activeFilter === 'saved' ? "You haven't saved any courses." :
                 "No courses have been shared with you."
                }
              </p>
              {activeFilter !== 'all' && (
                <Button variant="outline" className="mt-4" onClick={() => setActiveFilter('all')}>
                  View All Courses
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoursesTab;
