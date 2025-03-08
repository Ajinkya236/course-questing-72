
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  showSkillFilters?: boolean;
  onCourseClick?: (courseId: string) => void;
  onViewAllClick?: () => void;
  filterOptions?: string[];
  viewAllUrl?: string;
  subFilterOptions?: Record<string, string[]>;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ 
  title, 
  courses, 
  showSkillFilters = false,
  onCourseClick,
  onViewAllClick,
  filterOptions = [],
  viewAllUrl = '/view-all',
  subFilterOptions = {}
}) => {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0] || 'All Categories');
  const [selectedSubFilter, setSelectedSubFilter] = useState('All Sub-Academies');
  const filtersRef = useRef<HTMLDivElement>(null);
  const subFiltersRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Function to ensure we have exactly 12 courses for the carousel
  const normalizeCoursesCount = (coursesArray: Course[]) => {
    if (coursesArray.length === 0) return [];
    
    // If less than 12 courses, duplicate to reach 12
    if (coursesArray.length < 12) {
      const repeatedCourses = [];
      let i = 0;
      while (repeatedCourses.length < 12) {
        repeatedCourses.push({
          ...coursesArray[i % coursesArray.length],
          id: `${coursesArray[i % coursesArray.length].id}-clone-${Math.floor(i / coursesArray.length)}`
        });
        i++;
      }
      return repeatedCourses.slice(0, 12);
    }
    
    // If more than 12 courses, take the first 12
    if (coursesArray.length > 12) {
      return coursesArray.slice(0, 12);
    }
    
    return coursesArray;
  };

  const handleCardClick = (courseId: string) => {
    // Remove any clone suffix for handling clicks on duplicated courses
    const originalId = courseId.split('-clone-')[0];
    if (onCourseClick) {
      onCourseClick(originalId);
    } else {
      navigate(`/course/${originalId}`);
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

  const scrollFiltersLeft = () => {
    if (filtersRef.current) {
      filtersRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollFiltersRight = () => {
    if (filtersRef.current) {
      filtersRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const scrollSubFiltersLeft = () => {
    if (subFiltersRef.current) {
      subFiltersRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollSubFiltersRight = () => {
    if (subFiltersRef.current) {
      subFiltersRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    // Reset sub-filter when main filter changes
    if (subFilterOptions && subFilterOptions[filter]) {
      setSelectedSubFilter(subFilterOptions[filter][0]);
    } else {
      setSelectedSubFilter('All Sub-Academies');
    }
  };

  const handleSubFilterClick = (subFilter: string) => {
    setSelectedSubFilter(subFilter);
  };

  // Get available sub-filters based on selected main filter
  const availableSubFilters = subFilterOptions[selectedFilter] || [];

  // Create a fallback for courses that don't have all required properties
  const normalizedCourses = normalizeCoursesCount(courses.map(course => ({
    ...course,
    level: course.level || course.skillLevel || 'All Levels',
    instructor: course.instructor || {
      name: 'Instructor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  })));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-auto gap-1" 
          onClick={onViewAllClick || (() => navigate(viewAllUrl))}
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Main filters carousel with navigation buttons */}
      {showSkillFilters && filterOptions.length > 0 && (
        <div className="mb-4 relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-8 w-8 shadow-md"
              onClick={scrollFiltersLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide px-10" ref={filtersRef}>
            <div className="flex gap-2 pb-2">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterClick(filter)}
                  className="rounded-full whitespace-nowrap"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-8 w-8 shadow-md"
              onClick={scrollFiltersRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Sub-filters carousel with navigation buttons - only show if sub-filters exist for selected filter */}
      {showSkillFilters && title === "Academy Courses" && availableSubFilters.length > 0 && (
        <div className="mb-4 relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-8 w-8 shadow-md"
              onClick={scrollSubFiltersLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide px-10" ref={subFiltersRef}>
            <div className="flex gap-2 pb-2">
              {availableSubFilters.map((subFilter) => (
                <Button
                  key={subFilter}
                  variant={selectedSubFilter === subFilter ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSubFilterClick(subFilter)}
                  className="rounded-full whitespace-nowrap"
                >
                  {subFilter}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-8 w-8 shadow-md"
              onClick={scrollSubFiltersRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Use the Carousel component with circular navigation */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {normalizedCourses.map((course) => (
            <CarouselItem key={course.id} className={isMobile ? "basis-full" : "basis-1/4"}>
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
                  {course.trainingCategory && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-black/60 text-white border-none">
                        {course.trainingCategory}
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-end gap-2 mt-4">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
