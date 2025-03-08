
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCarousel from '@/components/CourseCarousel';
import { mockCourses } from '@/data/mockCoursesData';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Check, Clock, Bookmark, Share } from 'lucide-react';
import { Course } from '@/types/course';

interface CoursesTabProps {
  teamMemberId?: string;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ teamMemberId }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  
  // Process courses to ensure they have previewUrl
  const processedCourses = mockCourses.map(course => ({
    ...course,
    previewUrl: course.previewUrl || ''
  }));
  
  // In a real app, we'd filter based on teamMemberId if provided
  const assignedCourses = processedCourses.filter(course => 
    course.status === 'assigned'
  );
  
  const completedCourses = processedCourses.filter(course => 
    course.status === 'completed'
  );
  
  const inProgressCourses = processedCourses.filter(course => 
    course.status === 'in-progress'
  );
  
  // Mock data for saved and shared courses
  const savedCourses = processedCourses.filter(course => 
    course.isBookmarked === true
  );
  
  // Using the correct union type for status
  const sharedWithMeCourses: Course[] = [
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
      sharedBy: "Alex Thompson (Manager)",
      previewUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
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
      sharedBy: "Ryan Miller (Team Lead)",
      previewUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
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
  
  // Navigate to discover page
  const handleNavigateToDiscover = () => {
    navigate('/discover');
  };

  return (
    <div className="space-y-8">
      {/* Learning Progress Section - Made smaller */}
      <Card>
        <CardContent className="py-4">
          <h3 className="text-lg font-medium mb-2">Learning Progress</h3>
          <div className="flex items-center gap-4">
            <Progress value={completedPercentage} className="h-2 flex-1" />
            <span className="text-sm font-medium">{completedPercentage}%</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="text-center">
              <p className="text-xl font-bold">{assignedCourses.length}</p>
              <p className="text-sm text-muted-foreground">Assigned</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{inProgressCourses.length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{completedCourses.length}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getFilteredCourses().map(course => (
              <div key={course.id}>
                {/* Replace CourseCarousel with individual CourseCards */}
                <Button 
                  variant="link" 
                  className="p-0 h-auto w-full" 
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <div className="w-full rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video relative">
                      <img 
                        src={course.imageUrl} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {course.isHot && (
                          <Badge variant="destructive">Hot</Badge>
                        )}
                        {course.isNew && (
                          <Badge variant="secondary">New</Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-sm line-clamp-2 text-left">{course.title}</h3>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{course.category}</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            ))}
          </div>
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
              
              <Button 
                variant="default" 
                className="mt-4" 
                onClick={handleNavigateToDiscover}
              >
                Explore Courses
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoursesTab;
