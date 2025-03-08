
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  showSkillFilters?: boolean;
  onCourseClick?: (courseId: string) => void;
  onViewAllClick?: () => void;
  filterOptions?: string[];
  viewAllUrl?: string;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ 
  title, 
  courses, 
  showSkillFilters = false,
  onCourseClick,
  onViewAllClick,
  filterOptions = [],
  viewAllUrl = '/view-all' 
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(4);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0] || 'All Categories');
  
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      // Show one additional course with only 25% visible for information scent
      if (width >= 1280) setVisibleItems(4.25); // Show 25% of the 5th item
      else if (width >= 1024) setVisibleItems(3.25);
      else if (width >= 768) setVisibleItems(2.25);
      else if (width >= 640) setVisibleItems(1.25);
      else setVisibleItems(1.25);
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const nextSlide = () => {
    const maxPosition = Math.max(0, courses.length - Math.floor(visibleItems));
    setCurrentPosition(prev => (prev < maxPosition ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentPosition(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleCardClick = (courseId: string) => {
    if (onCourseClick) {
      onCourseClick(courseId);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    // Reset position when filter changes
    setCurrentPosition(0);
  };

  // Create a fallback for courses that don't have all required properties
  const normalizedCourses = courses.map(course => ({
    ...course,
    level: course.level || course.skillLevel || 'All Levels',
    instructor: course.instructor || {
      name: 'Instructor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        
        <div className="flex flex-wrap items-center gap-2">
          {showSkillFilters && filterOptions.length > 0 && (
            <div className="flex flex-wrap gap-2 mr-4">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterClick(filter)}
                  className="rounded-full"
                >
                  {filter}
                </Button>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevSlide}
              disabled={currentPosition === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextSlide}
              disabled={currentPosition >= normalizedCourses.length - Math.floor(visibleItems)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1" 
              onClick={onViewAllClick || (() => navigate(viewAllUrl))}
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentPosition * (100 / visibleItems)}%)`,
          }}
        >
          {normalizedCourses.map((course) => (
            <div
              key={course.id}
              className="flex-none transition-all duration-300"
              style={{ width: `${100 / visibleItems}%`, padding: '0 0.5rem' }}
            >
              <Card
                className="overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleCardClick(course.id)}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                  />
                  {course.enrollmentStatus && (
                    <div className="absolute top-2 right-2">
                      <Badge className={getStatusColor(course.enrollmentStatus)} variant="secondary">
                        {course.enrollmentStatus}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                  {course.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{course.instructor.name}</span>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCarousel;
