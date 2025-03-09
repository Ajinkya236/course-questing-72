
import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Course } from '@/types/course';
import { useCourseData } from '@/hooks/useCourseData';
import { useCourseBookmarks } from '@/hooks/useCourseBookmarks';
import { triggerCourseEvent } from '@/hooks/useCourseEvents';
import CourseCarouselHeader from './CourseCarouselHeader';
import CourseCarouselCard from './CourseCarouselCard';
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
  const uniqueFilterOptions = filterOptions.length > 0 ? [...new Set(filterOptions)] : [];
  
  const [selectedFilter, setSelectedFilter] = useState(uniqueFilterOptions[0] || 'All Categories');
  const [selectedSubFilter, setSelectedSubFilter] = useState('All Sub-Academies');
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toggleBookmark } = useCourseBookmarks();
  
  const { normalizedCourses } = useCourseData(courses);
  const carouselId = `${title.replace(/\s+/g, '-')}-carousel`;

  const handleCardClick = useCallback((courseId: string) => {
    const originalId = courseId.split('-clone-')[0];
    if (onCourseClick) {
      onCourseClick(originalId);
    } else {
      navigate(`/course/${originalId}`);
    }
  }, [onCourseClick, navigate]);

  const handleFilterSelect = useCallback((filter: string) => {
    setSelectedFilter(filter);
    if (subFilterOptions && subFilterOptions[filter]) {
      const uniqueSubFilters = [...new Set(subFilterOptions[filter])];
      setSelectedSubFilter(uniqueSubFilters[0]);
    } else {
      setSelectedSubFilter('All Sub-Academies');
    }
  }, [subFilterOptions]);

  const handleSubFilterClick = useCallback((subFilter: string) => {
    setSelectedSubFilter(subFilter);
  }, []);

  const handleBookmarkToggle = useCallback((e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => {
    e.stopPropagation();
    const courseToToggle = normalizedCourses.find(course => course.id === courseId);
    if (courseToToggle) {
      toggleBookmark(courseToToggle);
      // Trigger the bookmark event
      triggerCourseEvent('bookmark', courseId, title);
    }
  }, [normalizedCourses, toggleBookmark]);

  const handleShareClick = useCallback((e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    const courseToShare = normalizedCourses.find(course => course.id === courseId);
    if (courseToShare) {
      triggerCourseEvent('share', courseId, courseToShare.title);
    }
  }, [normalizedCourses]);

  const handleAssignClick = useCallback((e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    const courseToAssign = normalizedCourses.find(course => course.id === courseId);
    if (courseToAssign) {
      triggerCourseEvent('assign', courseId, courseToAssign.title);
    }
  }, [normalizedCourses]);

  const handleMouseEnter = useCallback((courseId: string) => {
    setHoveredCourseId(courseId);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredCourseId(null);
  }, []);

  const availableSubFilters = subFilterOptions[selectedFilter] ? 
    [...new Set(subFilterOptions[selectedFilter])] : 
    [];

  // Calculate how many cards to show based on viewport
  // Calculate the basis percentage for items to allow partial visibility of next item
  const getItemClasses = () => {
    if (isMobile) {
      return "basis-full pl-4";
    } else {
      // When showing partial card, adjust the basis to show 4.15 cards
      // This will show 4 full cards and about 15-20% of the 5th card
      return "basis-1/4.15 pl-4";
    }
  };

  return (
    <div className="space-y-4 overflow-hidden">
      <CourseCarouselHeader 
        title={title}
        onViewAllClick={onViewAllClick}
        viewAllUrl={viewAllUrl}
        carouselId={carouselId}
      />
      
      {showSkillFilters && uniqueFilterOptions.length > 0 && (
        <div className="relative">
          <CarouselFilters
            filters={uniqueFilterOptions}
            selectedFilter={selectedFilter}
            onFilterSelect={handleFilterSelect}
            className="justify-start relative scrollbar-hide overflow-x-auto pb-1"
          />
        </div>
      )}
      
      {showSkillFilters && availableSubFilters.length > 0 && (
        <div className="relative">
          <CarouselFilters
            filters={availableSubFilters}
            selectedFilter={selectedSubFilter}
            onFilterSelect={handleSubFilterClick}
            className="justify-start relative scrollbar-hide overflow-x-auto pb-1"
          />
        </div>
      )}

      <div className="relative group/carousel">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            containScroll: "trimSnaps"
          }}
          className="w-full relative"
          id={carouselId}
        >
          <CarouselContent className="-ml-4">
            {normalizedCourses.map((course, index) => (
              <CarouselItem 
                key={course.id} 
                className={getItemClasses()}
                onMouseEnter={() => handleMouseEnter(course.id)}
                onMouseLeave={handleMouseLeave}
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
          
          {!isMobile && (
            <>
              <CarouselPrevious className="opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 -left-3" />
              <CarouselNext className="opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 -right-3" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default memo(CourseCarousel);
