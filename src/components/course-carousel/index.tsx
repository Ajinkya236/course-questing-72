
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

  return (
    <div className="space-y-4">
      <CourseCarouselHeader 
        title={title}
        onViewAllClick={onViewAllClick}
        viewAllUrl={viewAllUrl}
        carouselId={carouselId}
      />
      
      {showSkillFilters && uniqueFilterOptions.length > 0 && (
        <CarouselFilters
          filters={uniqueFilterOptions}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
          className="justify-start"
        />
      )}
      
      {showSkillFilters && availableSubFilters.length > 0 && (
        <CarouselFilters
          filters={availableSubFilters}
          selectedFilter={selectedSubFilter}
          onFilterSelect={handleSubFilterClick}
          className="justify-start"
        />
      )}

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full overflow-visible"
        id={carouselId}
      >
        <CarouselContent className="-ml-2 pr-4">
          {normalizedCourses.map((course, index) => (
            <CarouselItem 
              key={course.id} 
              className={isMobile ? "basis-full pl-2" : `basis-1/4 pl-2 ${index === normalizedCourses.length - 1 ? "pr-[30%]" : ""}`}
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
      </Carousel>
    </div>
  );
};

export default memo(CourseCarousel);
