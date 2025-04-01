
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import CourseCarouselCard from './CourseCarouselCard';
import CourseCarouselHeader from './CourseCarouselHeader';
import { CarouselFilters } from '@/components/ui/carousel';
import { Course } from '@/types/course';

// Default options for the carousel
const defaultOptions = {
  align: 'start' as const, // Cast to literal type to match AlignmentOptionType
  containScroll: 'trimSnaps' as const,
  dragFree: true,
};

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  viewAllUrl?: string;
  onViewAllClick?: () => void;
  filterOptions?: string[];
  showSkillFilters?: boolean;
  showTrainingCategory?: boolean;
  emptyMessage?: string;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  courses,
  viewAllUrl = '/view-all',
  onViewAllClick,
  filterOptions = [],
  showSkillFilters = false,
  showTrainingCategory = false,
  emptyMessage = 'No courses available'
}) => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0] || 'All');
  const carouselId = `carousel-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Initialize embla carousel with correct type for align option
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...defaultOptions,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 1280px)': { slidesToScroll: 4 },
    }
  });

  // Filter courses based on selected filter
  const filteredCourses = selectedFilter && selectedFilter !== 'All' && selectedFilter !== 'All Categories' && selectedFilter !== 'All Skills'
    ? courses.filter(course => {
        // Check trainingCategory if showTrainingCategory is true
        if (showTrainingCategory && course.trainingCategory) {
          return course.trainingCategory === selectedFilter;
        }
        // Check skill if showSkillFilters is true
        if (showSkillFilters && course.skill) {
          return course.skill === selectedFilter;
        }
        // Otherwise check category
        return course.category === selectedFilter;
      })
    : courses;

  if (!courses || courses.length === 0) {
    return null;
  }

  // Handle card click
  const handleCardClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  // Handle share click
  const handleShareClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    console.log('Share clicked for', courseId);
    // Share functionality here
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = (e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => {
    e.stopPropagation();
    console.log('Bookmark toggled for', courseId, title, isBookmarked);
    // Bookmark toggle functionality here
  };

  // Handle assign click
  const handleAssignClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    console.log('Assign clicked for', courseId);
    // Assign functionality here
  };

  return (
    <div className="w-full py-6 space-y-4" id={carouselId}>
      {/* Carousel header with title and navigation controls */}
      <CourseCarouselHeader 
        title={title} 
        viewAllUrl={viewAllUrl} 
        onViewAllClick={onViewAllClick}
        carouselId={carouselId}
      />
      
      {/* Show filters if provided */}
      {filterOptions && filterOptions.length > 1 && (
        <CarouselFilters
          filters={filterOptions}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
          className="mb-4"
        />
      )}
      
      {/* Courses carousel */}
      <div className="relative">
        {filteredCourses.length > 0 ? (
          <Carousel ref={emblaRef} className="w-full">
            <CarouselContent className="-ml-4">
              {filteredCourses.map((course) => (
                <CarouselItem 
                  key={course.id} 
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
                >
                  <CourseCarouselCard 
                    course={course}
                    hoveredCourseId={null}
                    handleCardClick={handleCardClick}
                    handleShareClick={handleShareClick}
                    handleBookmarkToggle={handleBookmarkToggle}
                    handleAssignClick={handleAssignClick}
                    showTrainingCategory={showTrainingCategory}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex items-center justify-center h-40 bg-secondary/30 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCarousel;
