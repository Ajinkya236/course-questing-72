
import React, { useState, useEffect, useRef } from 'react';
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
import CourseCard from './CourseCard';

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
  // Removing duplicates from filter options
  const uniqueFilterOptions = filterOptions.length > 0 ? [...new Set(filterOptions)] : [];
  
  const [selectedFilter, setSelectedFilter] = useState(uniqueFilterOptions[0] || 'All Categories');
  const [selectedSubFilter, setSelectedSubFilter] = useState('All Sub-Academies');
  const [isHovered, setIsHovered] = useState(false);
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
      // Get the first unique sub-filter
      const uniqueSubFilters = [...new Set(subFilterOptions[filter])];
      setSelectedSubFilter(uniqueSubFilters[0]);
    } else {
      setSelectedSubFilter('All Sub-Academies');
    }
  };

  const handleSubFilterClick = (subFilter: string) => {
    setSelectedSubFilter(subFilter);
  };

  // Get available sub-filters based on selected main filter, removing duplicates
  const availableSubFilters = subFilterOptions[selectedFilter] ? 
    [...new Set(subFilterOptions[selectedFilter])] : 
    [];

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
      <div 
        className="flex items-center justify-between gap-4 group"
      >
        <div className="flex items-center">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <ChevronRight 
            className="h-4 w-4 cursor-pointer ml-1" 
            onClick={onViewAllClick || (() => navigate(viewAllUrl))}
          />
          {isHovered && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-1 p-0" 
              onClick={onViewAllClick || (() => navigate(viewAllUrl))}
            >
              View All
            </Button>
          )}
        </div>
        
        {/* Navigation buttons moved here */}
        <div className="flex items-center gap-2">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </div>
      
      {/* Main filters carousel with navigation buttons - left aligned */}
      {showSkillFilters && uniqueFilterOptions.length > 0 && (
        <CarouselFilters
          filters={uniqueFilterOptions}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
          className="justify-start"
        />
      )}
      
      {/* Sub-filters carousel with navigation buttons - left aligned */}
      {showSkillFilters && availableSubFilters.length > 0 && (
        <CarouselFilters
          filters={availableSubFilters}
          selectedFilter={selectedSubFilter}
          onFilterSelect={handleSubFilterClick}
          className="justify-start"
        />
      )}

      {/* Use the Carousel component with circular navigation */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent>
          {normalizedCourses.map((course) => (
            <CarouselItem key={course.id} className={isMobile ? "basis-full" : "basis-1/4"}>
              <CourseCard
                id={course.id}
                title={course.title}
                description={course.description}
                imageUrl={course.imageUrl}
                category={course.category}
                duration={course.duration}
                rating={course.rating}
                trainingCategory={showTrainingCategory ? course.trainingCategory : undefined}
                isBookmarked={course.isBookmarked}
                previewUrl={course.previewUrl}
                isHot={course.isHot}
                isNew={course.isNew}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
