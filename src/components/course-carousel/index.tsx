
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';
import { CarouselFilters } from '@/components/ui/carousel/carousel-filters';
import CourseCarouselHeader from './CourseCarouselHeader';
import CourseCarouselCard from './CourseCarouselCard';

interface CourseCarouselProps {
  title: string;
  description?: string;
  courses: Course[];
  viewAllUrl?: string;
  onViewAllClick?: () => void;
  filterOptions?: string[];
  showSkillFilters?: boolean;
  showTrainingCategory?: boolean;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  description,
  courses,
  viewAllUrl,
  onViewAllClick,
  filterOptions = [],
  showSkillFilters = false,
  showTrainingCategory = false
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(filterOptions.length > 0 ? filterOptions[0] : '');
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Create an array of skills for filtering from course data
  const skillOptions = useMemo(() => {
    if (!showSkillFilters) return [];
    
    const allSkills = new Set<string>();
    allSkills.add('All Skills');
    
    courses.forEach(course => {
      if (course.skills && Array.isArray(course.skills)) {
        course.skills.forEach(skill => {
          if (typeof skill === 'object' && skill.name) {
            allSkills.add(skill.name);
          }
        });
      }
    });
    
    return Array.from(allSkills);
  }, [courses, showSkillFilters]);

  // Filter courses based on selected filter
  const filteredCourses = useMemo(() => {
    if (!selectedFilter || selectedFilter === 'All Categories' || selectedFilter === 'All Skills') {
      return courses;
    }
    
    return courses.filter(course => {
      // Filter by training category
      if (filterOptions.includes(selectedFilter) && filterOptions.includes('All Categories')) {
        return course.trainingCategory === selectedFilter;
      }
      
      // Filter by skill
      if (showSkillFilters && course.skills && Array.isArray(course.skills)) {
        return course.skills.some(skill => 
          typeof skill === 'object' && 
          skill.name === selectedFilter
        );
      }
      
      return true;
    });
  }, [courses, selectedFilter, filterOptions, showSkillFilters]);

  useEffect(() => {
    const updateMaxScroll = () => {
      const container = carouselRef.current;
      if (container) {
        setMaxScroll(container.scrollWidth - container.clientWidth);
      }
    };

    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };

    checkIfMobile();
    updateMaxScroll();

    window.addEventListener('resize', updateMaxScroll);
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', updateMaxScroll);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [courses, filteredCourses]);

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      const newPosition = Math.max(0, Math.min(scrollPosition + scrollAmount, maxScroll));
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleShareClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    console.log(`Share course: ${courseId}`);
    // Share logic here
  };

  const handleBookmarkToggle = (e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => {
    e.stopPropagation();
    console.log(`${isBookmarked ? 'Remove bookmark' : 'Bookmark'} course: ${courseId}`);
    // Toggle bookmark logic here
  };

  const handleAssignClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    console.log(`Assign course: ${courseId}`);
    // Assign logic here
  };

  return (
    <div className="carousel-container mb-8">
      <CourseCarouselHeader 
        title={title}
        description={description}
        viewAllUrl={viewAllUrl}
        onViewAllClick={onViewAllClick || (() => viewAllUrl && navigate(viewAllUrl))}
        showLeftButton={scrollPosition > 0}
        showRightButton={scrollPosition < maxScroll}
        onScrollLeft={() => scroll('left')}
        onScrollRight={() => scroll('right')}
      />
      
      {/* Filters if available */}
      {(filterOptions.length > 1 || skillOptions.length > 1) && (
        <div className="mb-4">
          <CarouselFilters
            filters={showSkillFilters ? skillOptions : filterOptions}
            selectedFilter={selectedFilter}
            onFilterSelect={setSelectedFilter}
            className="mb-2"
          />
        </div>
      )}
      
      {/* Carousel content */}
      <div 
        className="relative"
        onMouseLeave={() => setHoveredCourseId(null)}
      >
        {/* Navigation buttons for larger screens */}
        {!isMobileDevice && (
          <>
            {scrollPosition > 0 && (
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md opacity-80 hover:opacity-100"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}
            
            {scrollPosition < maxScroll && (
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md opacity-80 hover:opacity-100"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}
          </>
        )}
        
        {filteredCourses.length > 0 ? (
          <div 
            ref={carouselRef}
            className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-600"
            onScroll={handleScroll}
          >
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="w-[280px] md:w-[280px] snap-start"
                onMouseEnter={() => setHoveredCourseId(course.id)}
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
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center bg-card border border-dashed rounded-lg p-8 text-center">
            <div>
              <Filter className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No courses match the selected filter.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => setSelectedFilter(filterOptions[0] || 'All')}
              >
                Clear Filter
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCarousel;
