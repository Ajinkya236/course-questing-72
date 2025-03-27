
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';

export interface CourseCarouselProps {
  title: string;
  description?: string;
  courses: Course[];
  viewAllUrl?: string;
  onViewAllClick?: () => void;
  filterOptions?: string[];
  showSkillFilters?: boolean;
  showTrainingCategory?: boolean;
  emptyMessage?: string;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  description,
  courses,
  viewAllUrl,
  onViewAllClick,
  filterOptions,
  showSkillFilters = false,
  showTrainingCategory = false,
  emptyMessage = 'No courses available',
}) => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const updateMaxScroll = () => {
        const container = carouselRef.current;
        if (container) {
          setMaxScroll(container.scrollWidth - container.clientWidth);
        }
      };

      updateMaxScroll();
      window.addEventListener('resize', updateMaxScroll);
      return () => window.removeEventListener('resize', updateMaxScroll);
    }
  }, [courses, carouselRef]);

  useEffect(() => {
    setShowLeftButton(scrollPosition > 0);
    setShowRightButton(scrollPosition < maxScroll - 5); // Small buffer for floating point errors
  }, [scrollPosition, maxScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (container) {
      const clientWidth = container.clientWidth;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      
      const newPosition = Math.max(0, Math.min(scrollPosition + scrollAmount, maxScroll));
      setScrollPosition(newPosition);
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  // Determine the number of courses to display based on responsive design
  const getItemsPerViewClass = () => {
    if (isMobile) return 'min-w-[85%]';
    return 'min-w-[280px]';
  };

  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else if (viewAllUrl) {
      navigate(viewAllUrl);
    }
  };

  return (
    <div className="py-8 w-full animate-fade-in">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full transition-opacity duration-300 ${
              showLeftButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => scroll('left')}
            disabled={!showLeftButton}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full transition-opacity duration-300 ${
              showRightButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => scroll('right')}
            disabled={!showRightButton}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          {(viewAllUrl || onViewAllClick) && (
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full ml-2 gap-1"
              onClick={handleViewAllClick}
            >
              View all
              <MoveRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div 
        className="relative overflow-hidden rounded-xl"
        onMouseEnter={() => {
          if (showLeftButton) setShowLeftButton(true);
          if (showRightButton) setShowRightButton(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setShowLeftButton(false);
            setShowRightButton(false);
          }
        }}
      >
        {courses.length > 0 ? (
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide py-4 -mx-4 px-4 gap-4 snap-x transition-all duration-300"
            onScroll={handleScroll}
          >
            {courses.map((course) => (
              <div 
                key={course.id} 
                className={`${getItemsPerViewClass()} flex-shrink-0 snap-start`}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 bg-secondary/30 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCarousel;
