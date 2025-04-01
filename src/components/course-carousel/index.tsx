
import React, { useState, useCallback, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Course } from '@/types/course';
import { useCourseData } from '@/hooks/useCourseData';
import { useCourseBookmarks } from '@/hooks/useCourseBookmarks';
import { triggerCourseEvent } from '@/hooks/useCourseEvents';
import CourseCarouselHeader from './CourseCarouselHeader';
import CourseCard from '@/components/CourseCard';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [api, setApi] = useState<any>(null);
  
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toggleBookmark } = useCourseBookmarks();
  
  const { normalizedCourses } = useCourseData(courses);
  const carouselId = `${title.replace(/\s+/g, '-')}-carousel`;

  // Enable scroll controls when the API is available
  useEffect(() => {
    if (!api) return;
    
    // Setup listeners or initial state if needed
    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
    
    // Initial index
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  const handleScrollLeft = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  const handleScrollRight = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
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

  // Calculate card width as a percentage to show partial cards
  const getCardPercentage = () => {
    if (isMobile) return 95; // Almost full width on mobile with a peek
    return 23; // Show ~4 cards on desktop with a peek
  };

  return (
    <div className="space-y-4 overflow-visible">
      <CourseCarouselHeader 
        title={title}
        onViewAllClick={onViewAllClick}
        viewAllUrl={viewAllUrl}
        carouselId={carouselId}
        onScrollLeft={handleScrollLeft}
        onScrollRight={handleScrollRight}
      />
      
      {showSkillFilters && uniqueFilterOptions.length > 0 && (
        <div className="relative">
          <CarouselFilters
            filters={uniqueFilterOptions}
            selectedFilter={selectedFilter}
            onFilterSelect={handleFilterSelect}
            className="justify-start relative no-scrollbar overflow-x-auto pb-1"
          />
        </div>
      )}
      
      {showSkillFilters && availableSubFilters.length > 0 && (
        <div className="relative">
          <CarouselFilters
            filters={availableSubFilters}
            selectedFilter={selectedSubFilter}
            onFilterSelect={handleSubFilterClick}
            className="justify-start relative no-scrollbar overflow-x-auto pb-1"
          />
        </div>
      )}

      <div 
        className="course-carousel-container relative group/carousel"
        onMouseEnter={() => setIsCarouselHovered(true)}
        onMouseLeave={() => setIsCarouselHovered(false)}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true, 
            containScroll: "trimSnaps"
          }}
          className="w-full relative overflow-visible"
          id={carouselId}
          setApi={setApi}
        >
          <CarouselContent className="-ml-4">
            {normalizedCourses.length > 0 ? (
              normalizedCourses.map((course) => (
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
                      imageUrl={course.imageUrl || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80"}
                      trainingCategory={course.trainingCategory}
                      isBookmarked={course.isBookmarked}
                      previewUrl={course.videoUrl}
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
          
          <div className="absolute -left-4 inset-y-0 flex items-center z-10">
            <CarouselPrevious 
              className={`h-9 w-9 rounded-full border-none shadow-md hover:bg-primary hover:text-white transition-all
                ${isCarouselHovered ? 'opacity-100' : 'opacity-0'}`}
              data-carousel-prev="true"
            />
          </div>
          
          <div className="absolute -right-4 inset-y-0 flex items-center z-10">
            <CarouselNext 
              className={`h-9 w-9 rounded-full border-none shadow-md hover:bg-primary hover:text-white transition-all
                ${isCarouselHovered ? 'opacity-100' : 'opacity-0'}`}
              data-carousel-next="true"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default memo(CourseCarousel);
