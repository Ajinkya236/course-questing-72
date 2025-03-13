
import React, { useState, useEffect, useRef } from "react";
import { useVideoPreview } from '@/hooks/useVideoPreview';
import { Course } from "@/types/course";
import CourseCarouselHeader from "./CourseCarouselHeader";
import CarouselNavButton from "./CarouselNavButton";
import CourseCarouselItem from "./CourseCarouselItem";
import { CarouselFilters } from "@/components/ui/carousel/carousel-filters";

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  viewAllLink?: string;
  viewAllUrl?: string;
  showTrainingCategory?: boolean;
  onCourseSelect?: (courseId: string) => void;
  onViewAllClick?: () => void;
  filterOptions?: string[];
  showSkillFilters?: boolean;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  courses,
  viewAllLink,
  viewAllUrl,
  showTrainingCategory = false,
  onCourseSelect,
  onViewAllClick,
  filterOptions,
  showSkillFilters,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const [itemWidth, setItemWidth] = useState(320); // Default value, will be updated
  const [activeFilter, setActiveFilter] = useState(filterOptions && filterOptions.length > 0 ? filterOptions[0] : 'All');
  
  const {
    isMuted,
    videoRef,
    toggleMute
  } = useVideoPreview({ previewUrl: '' });
  
  useEffect(() => {
    const updateCarouselMeasurements = () => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;
        const firstItem = container.querySelector("[data-course-item]") as HTMLElement;
        
        if (firstItem) {
          setItemWidth(firstItem.offsetWidth + 16); // width + gap
        }
        
        setMaxScroll(Math.max(0, scrollWidth - containerWidth));
      }
    };

    updateCarouselMeasurements();
    window.addEventListener("resize", updateCarouselMeasurements);
    
    return () => {
      window.removeEventListener("resize", updateCarouselMeasurements);
    };
  }, [courses]);

  const calculateVisibleItems = () => {
    if (!carouselRef.current) return 1;
    const containerWidth = carouselRef.current.clientWidth;
    return Math.floor(containerWidth / itemWidth);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const visibleItems = calculateVisibleItems();
    const scrollAmount = direction === "left" ? -itemWidth * visibleItems : itemWidth * visibleItems;
    
    let newPosition = scrollPosition + scrollAmount;
    newPosition = Math.max(0, Math.min(newPosition, maxScroll));
    
    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    
    setScrollPosition(newPosition);
  };

  const handleScrollEvent = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScrollEvent);
      return () => carousel.removeEventListener("scroll", handleScrollEvent);
    }
  }, []);

  const handleCourseHover = (courseId: string) => {
    setHoveredCourseId(courseId);
  };

  const handleCourseLeave = () => {
    setHoveredCourseId(null);
  };

  const handleCourseSelect = (courseId: string) => {
    if (onCourseSelect) {
      onCourseSelect(courseId);
    }
  };

  // Filter courses based on the active filter
  const getFilteredCourses = () => {
    if (!filterOptions || filterOptions.length === 0 || activeFilter === 'All') {
      return courses;
    }
    
    // This is a simplified filter. In a real app, you would filter based on actual course properties
    // For now, we're just filtering randomly to demonstrate the UI functionality
    return courses.filter((_, index) => index % 2 === 0);
  };

  const filteredCourses = getFilteredCourses();

  if (!courses || courses.length === 0) {
    return null;
  }

  // Add "All" as the first filter option if not already present
  const allFilters = filterOptions && filterOptions.length > 0 
    ? filterOptions.includes('All') ? filterOptions : ['All', ...filterOptions]
    : [];

  // Define training category filters for assigned courses
  const trainingCategoryFilters = title === "Assigned Courses" 
    ? ['All', 'Self', 'Manager', 'Mandatory', 'Ready for Role', 'Leadership', 'Special Drives'] 
    : allFilters;

  // Only show filters if specifically requested or for certain carousel titles
  const shouldShowFilters = showSkillFilters || 
    title === "Based on Your Interest" || 
    title === "For Your Role" || 
    title === "Assigned Courses";

  return (
    <div className="relative space-y-3 pb-6">
      <CourseCarouselHeader 
        title={title} 
        viewAllUrl={viewAllUrl || viewAllLink} 
        onViewAllClick={onViewAllClick}
      />
      
      {shouldShowFilters && trainingCategoryFilters.length > 0 && (
        <div className="mb-3 relative group/filters">
          <CarouselFilters
            filters={title === "Assigned Courses" ? trainingCategoryFilters : trainingCategoryFilters}
            selectedFilter={activeFilter}
            onFilterSelect={setActiveFilter}
            className="justify-start"
          />
        </div>
      )}
      
      <div className="relative group">
        <CarouselNavButton 
          direction="left" 
          onClick={() => handleScroll("left")}
          disabled={scrollPosition <= 0}
        />
        
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth pb-4 overflow-visible"
          style={{ 
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
            WebkitOverflowScrolling: 'touch',
            paddingLeft: '4px', // Small padding to show box-shadow
            paddingRight: '4px'
          }}
        >
          <div className="flex gap-4 pl-2 pr-16 overflow-visible">
            {filteredCourses.map((course) => (
              <CourseCarouselItem
                key={course.id}
                course={course}
                hoveredCourseId={hoveredCourseId}
                handleCourseHover={handleCourseHover}
                handleCourseLeave={handleCourseLeave}
                handleCardClick={handleCourseSelect}
                showTrainingCategory={showTrainingCategory}
              />
            ))}
          </div>
        </div>

        <CarouselNavButton 
          direction="right" 
          onClick={() => handleScroll("right")}
          disabled={scrollPosition >= maxScroll}
        />
      </div>
    </div>
  );
};

export default CourseCarousel;
