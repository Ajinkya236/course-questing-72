
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCarouselHeader from './CourseCarouselHeader';
import CourseCarouselCard from './CourseCarouselCard';
import { calculateCardWidth } from './CourseCarouselUtils';
import { Course } from '@/types/course';

interface CourseCarouselProps {
  title: string;
  subtitle?: string;
  courses: Course[];
  viewAllHref?: string;
  viewAllUrl?: string; // Added to match what's used in Home.tsx
  onViewAllClick?: () => void;
  cardVariant?: 'default' | 'compact' | 'minimal';
  courseType?: string;
  isLoading?: boolean;
  filterOptions?: string[];
  showSkillFilters?: boolean;
  showTrainingCategory?: boolean;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  subtitle,
  courses,
  viewAllHref,
  viewAllUrl, // Added to handle the prop from Home.tsx
  onViewAllClick,
  cardVariant = 'default',
  courseType,
  isLoading = false,
  showTrainingCategory = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [visibleCards, setVisibleCards] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use viewAllUrl as a fallback for viewAllHref for backward compatibility
  const effectiveViewAllHref = viewAllHref || viewAllUrl;

  // Calculate the card width and visible cards based on the container width and card variant
  useEffect(() => {
    const updateScrollButtons = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const cardWidth = calculateCardWidth(cardVariant);
      const containerWidth = container.clientWidth;
      const totalCards = courses.length;
      const newVisibleCards = Math.floor(containerWidth / cardWidth);
      
      setVisibleCards(newVisibleCards);
      setCanScrollLeft(currentIndex > 0);
      setCanScrollRight(currentIndex + newVisibleCards < totalCards);
    };

    // Initial calculation
    updateScrollButtons();

    // Recalculate on window resize
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [courses.length, cardVariant, currentIndex]);

  const handleScrollLeft = () => {
    if (!containerRef.current || currentIndex <= 0) return;
    
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
  };

  const handleScrollRight = () => {
    if (!containerRef.current) return;
    
    const newIndex = Math.min(courses.length - visibleCards, currentIndex + 1);
    setCurrentIndex(newIndex);
  };

  const peekAmount = 15; // Show 15% of the next card

  // Handle card click mock function
  const handleCardClick = (courseId: string) => {
    console.log(`Card clicked: ${courseId}`);
  };

  // Handle share click mock function
  const handleShareClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    console.log(`Share clicked: ${courseId}`);
  };

  // Handle bookmark toggle mock function
  const handleBookmarkToggle = (e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => {
    e.stopPropagation();
    console.log(`Bookmark toggled for ${title} (${courseId}): ${!isBookmarked}`);
  };

  // Handle assign click mock function
  const handleAssignClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    console.log(`Assign clicked: ${courseId}`);
  };

  return (
    <div className="w-full">
      <CourseCarouselHeader 
        title={title}
        subtitle={subtitle}
        viewAllHref={effectiveViewAllHref}
        onViewAllClick={onViewAllClick}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onScrollLeft={handleScrollLeft}
        onScrollRight={handleScrollRight}
      />
      
      <div className="relative mt-4 overflow-hidden">
        {/* Navigation buttons */}
        {canScrollLeft && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-background/80 shadow-md backdrop-blur-sm"
            onClick={handleScrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        
        {canScrollRight && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-background/80 shadow-md backdrop-blur-sm"
            onClick={handleScrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
        
        {/* Carousel container */}
        <div 
          ref={containerRef}
          className="flex transition-all duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            width: `${(100 / visibleCards) * courses.length}%`
          }}
        >
          {courses.map((course, index) => (
            <div 
              key={course.id} 
              className="px-2" 
              style={{ 
                width: `${100 / courses.length}%`,
                // When this is the last visible card and we can scroll right, 
                // make it slightly wider to show part of the next card
                ...(index === currentIndex + visibleCards - 1 && canScrollRight 
                  ? { width: `${(100 / courses.length) + peekAmount}%` } 
                  : {})
              }}
            >
              <CourseCarouselCard 
                course={course}
                hoveredCourseId={null}
                handleCardClick={handleCardClick}
                handleShareClick={handleShareClick}
                handleBookmarkToggle={handleBookmarkToggle}
                handleAssignClick={handleAssignClick}
                showTrainingCategory={showTrainingCategory}
              />
            </div>
          ))}
        </div>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCarousel;
