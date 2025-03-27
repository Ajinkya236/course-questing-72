
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import CourseCard from '@/components/CourseCard';

interface CourseCarouselProps {
  title: string;
  subtitle?: string;
  courses: any[];
  viewAllPath?: string;
  viewAllLabel?: string;
  categoryId?: string;
  showExternalLinkIcon?: boolean;
  cardLimit?: number;
  onViewAllClick?: () => void;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  subtitle,
  courses = [],
  viewAllPath,
  viewAllLabel = 'View All',
  categoryId,
  showExternalLinkIcon = false,
  cardLimit = 6,
  onViewAllClick,
}) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  
  // Limit the number of cards shown based on the cardLimit prop
  const limitedCourses = courses.slice(0, cardLimit);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollStatus = () => {
      setScrollPosition(container.scrollLeft);
      setContainerWidth(container.clientWidth);
      setScrollWidth(container.scrollWidth);
      
      // Show/hide scroll arrows based on position
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    };

    // Set initial status
    updateScrollStatus();
    
    // Add event listener
    container.addEventListener('scroll', updateScrollStatus);
    
    // Clean up
    return () => {
      container.removeEventListener('scroll', updateScrollStatus);
    };
  }, [courses, scrollContainerRef]);

  useEffect(() => {
    // Update scroll status when window resizes
    const handleResize = () => {
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.clientWidth);
        setScrollWidth(scrollContainerRef.current.scrollWidth);
        setShowRightArrow(
          scrollContainerRef.current.scrollLeft < 
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 600);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const maxScroll = scrollWidth - containerWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + 600);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleViewAll = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else if (viewAllPath) {
      navigate(viewAllPath);
    }
  };

  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {viewAllPath && limitedCourses.length > 0 && (
          <Button 
            variant="ghost" 
            className="flex items-center"
            onClick={handleViewAll}
          >
            {viewAllLabel}
            {showExternalLinkIcon ? (
              <ExternalLink className="ml-1 h-4 w-4" />
            ) : (
              <ChevronRight className="ml-1 h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Carousel */}
      <div className="relative group">
        {/* Left control */}
        {showLeftArrow && (
          <Button
            variant="default"
            size="icon"
            className="absolute -left-3 top-1/2 transform -translate-y-1/2 z-10 bg-background/90 border shadow-md"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Right control */}
        {showRightArrow && (
          <Button
            variant="default"
            size="icon"
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 bg-background/90 border shadow-md"
            onClick={scrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}

        {/* Courses */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar gap-6 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {limitedCourses.map((course) => {
            // Transform the course object to match CourseCard props
            const courseProps = {
              id: course.id,
              title: course.title,
              description: course.description,
              thumbnail: course.imageUrl || course.thumbnail,
              duration: course.duration,
              instructor: course.author || course.instructor,
              level: course.level,
              category: course.category,
              progress: course.progress || 0,
              rating: course.rating || 0,
              isAssigned: course.isAssigned || false,
              isCompleted: course.isCompleted || course.progress === 100,
              source: course.source || 'Internal',
              type: course.type || 'Course',
            };

            return (
              <div
                key={course.id}
                onClick={() => handleCardClick(course.id)}
                className="min-w-[300px] max-w-[300px] flex-shrink-0 transition-transform duration-300 hover:scale-[1.03]"
              >
                <CourseCard {...courseProps} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseCarousel;
