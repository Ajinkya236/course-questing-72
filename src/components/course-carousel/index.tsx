
import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import CourseCarouselCard from './CourseCarouselCard';
import CourseCarouselHeader from './CourseCarouselHeader';
import { CarouselFilters } from '@/components/ui/carousel/carousel-filters';
import { Course } from '@/types/course';

interface CourseCarouselProps {
  title: string;
  description?: string;
  courses: Course[];
  viewAllUrl?: string;
  onViewAllClick?: () => void;
  filterOptions?: string[];
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
  showSkillFilters?: boolean;
  emptyMessage?: string;
  showTrainingCategory?: boolean;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  description,
  courses,
  viewAllUrl,
  onViewAllClick,
  filterOptions,
  selectedFilter = 'All Categories',
  onFilterChange,
  showSkillFilters = false,
  emptyMessage = 'No courses available',
  showTrainingCategory = false,
}) => {
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);

  // Event handlers
  const handleCardClick = (courseId: string) => {
    console.log(`Course clicked: ${courseId}`);
    // Navigate to course page
    window.location.href = `/course/${courseId}`;
  };

  const handleShareClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    console.log(`Share course: ${courseId}`);
    // Implement share functionality
  };

  const handleBookmarkToggle = (e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => {
    e.stopPropagation();
    console.log(`${isBookmarked ? 'Remove from' : 'Add to'} bookmarks: ${courseId}`);
    // Implement bookmark functionality
  };

  const handleAssignClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    console.log(`Assign course: ${courseId}`);
    // Implement assign functionality
  };

  const handleFilterSelect = (filter: string) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  // If no courses, show empty state
  if (courses.length === 0) {
    return (
      <div className="py-6">
        <CourseCarouselHeader 
          title={title} 
          description={description} 
          viewAllUrl={viewAllUrl} 
          onViewAllClick={onViewAllClick} 
        />
        <div className="flex items-center justify-center h-40 bg-secondary/30 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <CourseCarouselHeader 
        title={title} 
        description={description} 
        viewAllUrl={viewAllUrl} 
        onViewAllClick={onViewAllClick} 
      />
      
      {filterOptions && filterOptions.length > 0 && (
        <div className="mb-4">
          <CarouselFilters
            filters={filterOptions}
            selectedFilter={selectedFilter}
            onFilterSelect={handleFilterSelect}
          />
        </div>
      )}

      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {courses.map((course) => (
            <CarouselItem key={course.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <CourseCarouselCard
                course={course}
                hoveredCourseId={hoveredCourseId}
                handleCardClick={handleCardClick}
                handleShareClick={handleShareClick}
                handleBookmarkToggle={handleBookmarkToggle}
                handleAssignClick={handleAssignClick}
                showTrainingCategory={showTrainingCategory}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      
      {viewAllUrl && (
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={onViewAllClick}
          >
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseCarousel;
