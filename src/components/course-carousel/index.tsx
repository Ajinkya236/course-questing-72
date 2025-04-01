
import React, { useState, useCallback, memo, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Course } from '@/types/course';
import { useCourseData } from '@/hooks/useCourseData';
import { useCourseBookmarks } from '@/hooks/useCourseBookmarks';
import { triggerCourseEvent } from '@/hooks/useCourseEvents';
import CourseCarouselHeader from './CourseCarouselHeader';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { CarouselFilters } from '@/components/ui/carousel/carousel-filters';

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
  const uniqueFilterOptions = filterOptions.length > 0 ? ['All', ...new Set(filterOptions)] : [];
  const [selectedFilter, setSelectedFilter] = useState(uniqueFilterOptions[0] || 'All');
  const [selectedSubFilter, setSelectedSubFilter] = useState('All');
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toggleBookmark } = useCourseBookmarks();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Process courses with useCourseData hook for normalization
  const { normalizedCourses } = useCourseData(courses);
  const carouselId = `${title.replace(/\s+/g, '-')}-carousel`;
  
  // Handle embla carousel API setup
  useEffect(() => {
    if (!api) return;
    
    // Update scroll state when selection changes
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    
    // Initial state
    onSelect();
    
    // Add event listeners
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

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
    if (subFilterOptions && filter !== 'All' && subFilterOptions[filter]) {
      const uniqueSubFilters = ['All', ...new Set(subFilterOptions[filter])];
      setSelectedSubFilter(uniqueSubFilters[0]);
    } else {
      setSelectedSubFilter('All');
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

  // Filter courses based on selected filters
  const filteredCourses = useMemo(() => {
    if (!normalizedCourses || normalizedCourses.length === 0) return [];
    
    let result = [...normalizedCourses];
    
    // Apply category filter
    if (selectedFilter !== 'All') {
      result = result.filter(course => course.category === selectedFilter);
    }
    
    // Apply sub-filter if needed
    if (selectedSubFilter !== 'All' && subFilterOptions[selectedFilter]) {
      result = result.filter(course => course.subAcademy === selectedSubFilter);
    }
    
    return result;
  }, [normalizedCourses, selectedFilter, selectedSubFilter, subFilterOptions]);

  // Calculate card width as a percentage to show partial cards
  const getCardPercentage = () => {
    if (isMobile) return 85; // Almost full width on mobile with a peek
    if (filteredCourses.length <= 3) return 30; // Show 3 cards when fewer items
    return 24; // Show ~4 cards on desktop with a peek
  };

  // For manual scrolling (fallback)
  const scrollPrev = () => {
    if (api) api.scrollPrev();
  };
  
  const scrollNext = () => {
    if (api) api.scrollNext();
  };

  const availableSubFilters = selectedFilter !== 'All' && subFilterOptions[selectedFilter] ? 
    ['All', ...new Set(subFilterOptions[selectedFilter])] : 
    [];

  return (
    <div className="space-y-4 overflow-visible">
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
      
      {showSkillFilters && availableSubFilters.length > 1 && (
        <div className="relative">
          <CarouselFilters
            filters={availableSubFilters}
            selectedFilter={selectedSubFilter}
            onFilterSelect={handleSubFilterClick}
            className="justify-start relative scrollbar-hide overflow-x-auto pb-1"
          />
        </div>
      )}

      <div 
        className="course-carousel-container relative group/carousel"
        onMouseEnter={() => setIsCarouselHovered(true)}
        onMouseLeave={() => setIsCarouselHovered(false)}
        ref={carouselRef}
      >
        <Carousel
          opts={{
            align: "start",
            loop: filteredCourses.length > 4,
            dragFree: true,
            containScroll: "trimSnaps"
          }}
          className="w-full relative overflow-visible"
          id={carouselId}
          setApi={setApi}
        >
          <CarouselContent className="-ml-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CarouselItem 
                  key={course.id} 
                  className="pl-4"
                  style={{ 
                    flex: `0 0 ${getCardPercentage()}%`, 
                    maxWidth: `${getCardPercentage()}%`
                  }}
                >
                  <div 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(course.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <CourseCard 
                      {...course}
                      trainingCategory={course.trainingCategory}
                      isBookmarked={course.isBookmarked}
                      previewUrl={course.videoUrl || course.previewUrl}
                      isHot={course.isHot}
                      isNew={course.isNew}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="pl-4 flex-1">
                <div className="h-[300px] flex items-center justify-center bg-secondary/20 rounded-lg border border-dashed border-muted-foreground/20">
                  <p className="text-muted-foreground">No courses available</p>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          
          <div className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 ${isCarouselHovered && canScrollPrev ? 'opacity-100' : 'opacity-0'}`}>
            <CarouselPrevious
              onClick={scrollPrev}
              className="h-9 w-9 rounded-full border-none shadow-md hover:bg-primary hover:text-white transition-all"
            />
          </div>
          
          <div className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 ${isCarouselHovered && canScrollNext ? 'opacity-100' : 'opacity-0'}`}>
            <CarouselNext
              onClick={scrollNext}
              className="h-9 w-9 rounded-full border-none shadow-md hover:bg-primary hover:text-white transition-all"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default memo(CourseCarousel);
