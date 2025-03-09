
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Course } from '@/types/course';
import { normalizeCourseData } from './CourseCarouselUtils';
import CourseCarouselHeader from './CourseCarouselHeader';
import CourseCarouselCard from './CourseCarouselCard';
import { CarouselFilters } from '@/components/ui/carousel';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
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
  // Removing duplicates from filter options
  const uniqueFilterOptions = filterOptions.length > 0 ? [...new Set(filterOptions)] : [];
  
  const [selectedFilter, setSelectedFilter] = useState(uniqueFilterOptions[0] || 'All Categories');
  const [selectedSubFilter, setSelectedSubFilter] = useState('All Sub-Academies');
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const normalizedCourses = normalizeCourseData(courses);
  const carouselId = `${title.replace(/\s+/g, '-')}-carousel`;

  const handleCardClick = (courseId: string) => {
    // Remove any clone suffix for handling clicks on duplicated courses
    const originalId = courseId.split('-clone-')[0];
    if (onCourseClick) {
      onCourseClick(originalId);
    } else {
      navigate(`/course/${originalId}`);
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

  // Handle bookmark toggle
  const handleBookmarkToggle = (e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => {
    e.stopPropagation();
    const newBookmarked = !isBookmarked;
    
    toast({
      title: newBookmarked ? "Course Saved" : "Course Removed",
      description: newBookmarked 
        ? `"${title}" has been added to your saved courses` 
        : `"${title}" has been removed from your saved courses`,
    });
  };

  // Handle share button click
  const handleShareClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    toast({
      title: "Share Course",
      description: "Sharing options are now available for this course",
    });
  };

  // Handle assign button click
  const handleAssignClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    toast({
      title: "Assign Course",
      description: "You can now assign this course to team members",
    });
  };

  // Get available sub-filters based on selected main filter, removing duplicates
  const availableSubFilters = subFilterOptions[selectedFilter] ? 
    [...new Set(subFilterOptions[selectedFilter])] : 
    [];

  return (
    <div className="space-y-4">
      <CourseCarouselHeader 
        title={title}
        onViewAllClick={onViewAllClick}
        viewAllUrl={viewAllUrl}
        carouselId={carouselId}
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
        className="w-full overflow-visible"
        id={carouselId}
      >
        <CarouselContent className="-ml-3">
          {normalizedCourses.map((course) => (
            <CarouselItem 
              key={course.id} 
              className={isMobile ? "basis-full pl-3" : "basis-1/4 pl-3 -mr-16"} /* Set negative margin to show part of next card */
              onMouseEnter={() => setHoveredCourseId(course.id)}
              onMouseLeave={() => setHoveredCourseId(null)}
            >
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
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
