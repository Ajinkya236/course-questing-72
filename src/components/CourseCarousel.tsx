
import React, { useState, useRef } from 'react';
import { Carousel } from '@/components/ui/carousel';
import { Course } from '@/types/course';

// Import our refactored components
import CarouselHeader from './course-carousel/CarouselHeader';
import CarouselFilters from './course-carousel/CarouselFilters';
import CarouselItems from './course-carousel/CarouselItems';

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
  const carouselRef = useRef<HTMLDivElement>(null);
  
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

  // Get available sub-filters based on selected main filter
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
    },
    // Ensure we always have a videoUrl for preview
    videoUrl: course.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  })));

  // Navigation handlers
  const handleNavigateLeft = () => {
    document.querySelector(`#${title.replace(/\s+/g, '-')}-carousel .embla__prev`)?.dispatchEvent(new Event('click'));
  };

  const handleNavigateRight = () => {
    document.querySelector(`#${title.replace(/\s+/g, '-')}-carousel .embla__next`)?.dispatchEvent(new Event('click'));
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header with title and navigation controls */}
      <CarouselHeader 
        title={title}
        viewAllUrl={viewAllUrl}
        onViewAllClick={onViewAllClick}
        onNavigateLeft={handleNavigateLeft}
        onNavigateRight={handleNavigateRight}
      />
      
      {/* Main filters */}
      {showSkillFilters && filterOptions.length > 0 && (
        <CarouselFilters
          filterOptions={filterOptions}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
        />
      )}
      
      {/* Sub-filters */}
      {showSkillFilters && availableSubFilters.length > 0 && (
        <CarouselFilters
          filterOptions={availableSubFilters}
          selectedFilter={selectedSubFilter}
          onFilterSelect={handleSubFilterClick}
        />
      )}

      {/* Carousel with course items */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        id={`${title.replace(/\s+/g, '-')}-carousel`}
      >
        <CarouselItems 
          courses={normalizedCourses}
          onCourseClick={onCourseClick}
        />
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
