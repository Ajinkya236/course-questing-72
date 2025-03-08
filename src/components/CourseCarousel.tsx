
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext,
  CarouselFilters
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
  showTrainingCategory?: boolean;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ 
  title, 
  courses, 
  showSkillFilters = false,
  onCourseClick,
  onViewAllClick,
  filterOptions = [],
  viewAllUrl = '/view-all',
  subFilterOptions = {},
  showTrainingCategory = false
}) => {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions.length > 0 ? filterOptions[0] : 'All Categories');
  const [selectedSubFilter, setSelectedSubFilter] = useState('All Sub-Academies');
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

  const handleFilterSelect = (filter: string) => {
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

  // Filter out duplicate filter options
  const uniqueFilterOptions = filterOptions.length > 0 ? 
    [filterOptions[0], ...filterOptions.slice(1).filter(option => option !== filterOptions[0])] : 
    [];

  // Filter out duplicate sub-filter options
  const uniqueSubFilterOptions = availableSubFilters.length > 0 ? 
    [availableSubFilters[0], ...availableSubFilters.slice(1).filter(option => option !== availableSubFilters[0])] : 
    [];

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center gap-2 mb-2">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <div className="flex items-center group">
          <ChevronRight 
            className="h-4 w-4 cursor-pointer ml-1" 
            onClick={onViewAllClick || (() => navigate(viewAllUrl))}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity pl-0 pr-2 py-0" 
            onClick={onViewAllClick || (() => navigate(viewAllUrl))}
          >
            View All
          </Button>
          <div className="flex items-center">
            <CarouselPrevious className="relative transform-none h-7 w-7 ml-0 mr-1 border-none" />
            <CarouselNext className="relative transform-none h-7 w-7 border-none" />
          </div>
        </div>
      </div>
      
      {/* Main filters carousel with navigation buttons */}
      {showSkillFilters && uniqueFilterOptions.length > 0 && (
        <CarouselFilters
          filters={uniqueFilterOptions}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
        />
      )}
      
      {/* Sub-filters carousel with navigation buttons - only show if sub-filters exist for selected filter */}
      {showSkillFilters && uniqueSubFilterOptions.length > 0 && (
        <CarouselFilters
          filters={uniqueSubFilterOptions}
          selectedFilter={selectedSubFilter}
          onFilterSelect={handleSubFilterClick}
        />
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
                  {/* Only show training category if showTrainingCategory is true and trainingCategory exists */}
                  {showTrainingCategory && course.trainingCategory && (
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
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
