import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCarouselCard from "./CourseCarouselCard";
import CourseCarouselHeader from "./CourseCarouselHeader";
import { Course } from "@/types/course";
import { useVideoPreview } from '@/hooks/useVideoPreview';

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  viewAllLink?: string;
  viewAllUrl?: string; // Add viewAllUrl prop for compatibility with Home.tsx
  showTrainingCategory?: boolean;
  onCourseSelect?: (courseId: string) => void;
  onViewAllClick?: () => void; // Add the missing onViewAllClick prop
  filterOptions?: string[];
  showSkillFilters?: boolean;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  courses,
  viewAllLink,
  viewAllUrl, // Add viewAllUrl to the props
  showTrainingCategory = false,
  onCourseSelect,
  onViewAllClick, // Add the prop to the component
  filterOptions,
  showSkillFilters,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const [itemWidth, setItemWidth] = useState(320); // Default value, will be updated
  
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

  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <div className="relative space-y-3 pb-6">
      <CourseCarouselHeader 
        title={title} 
        viewAllUrl={viewAllUrl || viewAllLink} 
      />
      
      <div className="relative group">
        <Button 
          variant="outline"
          size="icon"
          className={`absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${scrollPosition <= 0 ? 'invisible' : ''}`}
          onClick={() => handleScroll("left")}
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ 
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
            WebkitOverflowScrolling: 'touch',
            paddingLeft: '4px', // Small padding to show box-shadow
            paddingRight: '4px'
          }}
        >
          <div className="flex gap-4 pl-2 pr-16">
            {courses.map((course) => (
              <div 
                key={course.id}
                data-course-item
                className="flex-shrink-0 w-[280px] transition-transform duration-300 hover:scale-[1.02]"
                onMouseEnter={() => handleCourseHover(course.id)}
                onMouseLeave={handleCourseLeave}
              >
                <CourseCarouselCard
                  course={course}
                  hoveredCourseId={hoveredCourseId}
                  handleCardClick={handleCourseSelect}
                  handleShareClick={(e, courseId) => {
                    e.stopPropagation();
                    // Handle share logic
                  }}
                  handleBookmarkToggle={(e, courseId, title, isBookmarked) => {
                    e.stopPropagation();
                    // Handle bookmark logic
                  }}
                  handleAssignClick={(e, courseId) => {
                    e.stopPropagation();
                    // Handle assign logic
                  }}
                  showTrainingCategory={showTrainingCategory}
                />
              </div>
            ))}
          </div>
        </div>

        <Button 
          variant="outline"
          size="icon"
          className={`absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${scrollPosition >= maxScroll ? 'invisible' : ''}`}
          onClick={() => handleScroll("right")}
          disabled={scrollPosition >= maxScroll}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CourseCarousel;
