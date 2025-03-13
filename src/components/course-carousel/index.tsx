
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CourseCard from '@/components/CourseCard';
import { Course } from '@/types/course';

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  subtitle?: string;
  viewAllLink?: string;
  className?: string;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  courses,
  subtitle,
  viewAllLink,
  className = '',
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [visibleItems, setVisibleItems] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculate the maximum scroll position and visible items
  useEffect(() => {
    const updateScrollInfo = () => {
      if (carouselRef.current && contentRef.current) {
        const containerWidth = carouselRef.current.clientWidth;
        const totalWidth = contentRef.current.scrollWidth;
        const newMaxScroll = Math.max(0, totalWidth - containerWidth);
        setMaxScroll(newMaxScroll);
        
        // Calculate visible items based on container width
        // Each card is approximately 280px wide with margin
        const itemWidth = 280;
        const calculatedVisibleItems = Math.floor(containerWidth / itemWidth);
        setVisibleItems(calculatedVisibleItems);
      }
    };

    updateScrollInfo();
    window.addEventListener('resize', updateScrollInfo);
    return () => window.removeEventListener('resize', updateScrollInfo);
  }, [courses.length]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      // Calculate item width (card width + margin)
      const itemWidth = 280;
      // Scroll by one item
      const newPosition = Math.max(0, scrollPosition - itemWidth);
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      // Calculate item width (card width + margin)
      const itemWidth = 280;
      // Scroll by one item
      const newPosition = Math.min(maxScroll, scrollPosition + itemWidth);
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };

  // Handle scroll events
  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Show a partial view of the next item (information scent)
  const partialViewStyle = {
    // Add right padding to the container to show a partial view of the next item
    // Typically around 15% of the next card is visible
    paddingRight: 'calc(15% + 16px)'
  };

  if (courses.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-2">
          {viewAllLink && (
            <Button variant="outline" size="sm" asChild>
              <a href={viewAllLink}>View All</a>
            </Button>
          )}
          <div className="flex space-x-1">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollLeft} 
              disabled={scrollPosition <= 0}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollRight} 
              disabled={scrollPosition >= maxScroll}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div 
        ref={carouselRef} 
        className="overflow-x-auto scrollbar-hide pb-4" 
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          ref={contentRef} 
          className="flex space-x-4 pl-1"
          style={partialViewStyle}
        >
          {courses.map((course) => (
            <div key={course.id} className="min-w-[250px] max-w-[250px]">
              <CourseCard
                id={course.id}
                title={course.title}
                description={course.description}
                imageUrl={course.imageUrl}
                category={course.category}
                duration={course.duration}
                rating={course.rating}
                isBookmarked={course.isBookmarked}
                previewUrl={course.previewUrl}
                isHot={course.isHot}
                isNew={course.isNew}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCarousel;
