
import React from 'react';
import { Carousel, CarouselFilters } from '@/components/ui/carousel';
import { Course } from '@/types/course';
import { useCourseCarousel } from '@/hooks/useCourseCarousel';
import CarouselHeader from './carousel/CarouselHeader';
import NormalizedCourses from './carousel/NormalizedCourses';

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
  const {
    uniqueFilterOptions,
    selectedFilter,
    selectedSubFilter,
    isHovered,
    availableSubFilters,
    setIsHovered,
    handleFilterSelect,
    handleSubFilterClick,
    handleViewAll,
    handleCardClick
  } = useCourseCarousel({
    courses,
    filterOptions,
    subFilterOptions,
    viewAllUrl,
    onViewAllClick,
    onCourseClick
  });

  return (
    <div className="space-y-4">
      <CarouselHeader
        title={title}
        isHovered={isHovered}
        onViewAllClick={handleViewAll}
      />
      
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
        <NormalizedCourses 
          courses={courses} 
          onCardClick={handleCardClick}
          showTrainingCategory={showTrainingCategory}
        />
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
