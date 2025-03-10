
import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { cn } from '@/lib/utils';

interface CourseCarouselProps {
  title: string;
  courses: any[];
  showViewAll?: boolean;
  viewAllLink?: string;
  showNavigation?: boolean;
  className?: string;
  showPartialNextCard?: boolean;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({
  title,
  courses,
  showViewAll = false,
  viewAllLink = '',
  showNavigation = false,
  className = '',
  showPartialNextCard = false
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  // Calculate the number of cards that can be visible based on container width
  const calculateVisibleCards = () => {
    if (!carouselRef.current) return 0;
    
    const containerWidth = carouselRef.current.clientWidth;
    const cardWidth = 300; // approx width of each card with margins
    return Math.floor(containerWidth / cardWidth);
  };
  
  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const newPosition = carouselRef.current.scrollLeft;
    setScrollPosition(newPosition);
    
    const scrollWidth = carouselRef.current.scrollWidth;
    const clientWidth = carouselRef.current.clientWidth;
    setMaxScroll(scrollWidth - clientWidth);
  };
  
  const scrollNext = () => {
    if (!carouselRef.current) return;
    
    const cardWidth = carouselRef.current.querySelector('.course-card')?.clientWidth || 300;
    const newPosition = scrollPosition + cardWidth;
    
    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };
  
  const scrollPrev = () => {
    if (!carouselRef.current) return;
    
    const cardWidth = carouselRef.current.querySelector('.course-card')?.clientWidth || 300;
    const newPosition = scrollPosition - cardWidth;
    
    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{title}</h3>
          {showViewAll && (
            <Button variant="ghost" size="sm" className="text-primary" asChild>
              <a href={viewAllLink}>
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      )}
      
      <div className="relative">
        {showNavigation && scrollPosition > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md rounded-full -ml-4"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        
        <div 
          ref={carouselRef}
          className={cn(
            "flex overflow-x-auto scrollbar-hide space-x-4 pb-2 -mx-1 px-1",
            showPartialNextCard ? "scroll-pl-6" : ""
          )}
          onScroll={handleScroll}
          style={showPartialNextCard ? { 
            scrollPaddingRight: '20%',  // Show about 20% of the next card
            WebkitOverflowScrolling: 'touch', // For momentum scroll on iOS
          } : {}}
        >
          {courses.map(course => (
            <div 
              key={course.id} 
              className="course-card flex-shrink-0" 
              style={{ width: showPartialNextCard ? 'calc(33.333% - 1rem)' : 'auto', minWidth: '280px' }}
            >
              <CourseCard 
                id={course.id}
                title={course.title}
                description={course.description}
                imageUrl={course.imageUrl}
                category={course.category}
                duration={course.duration}
                rating={course.rating}
                trainingCategory={course.trainingCategory}
                isBookmarked={course.isBookmarked}
                previewUrl={course.imageUrl}
                isHot={course.isHot}
                isNew={course.isNew}
              />
            </div>
          ))}
        </div>
        
        {showNavigation && scrollPosition < maxScroll && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md rounded-full -mr-4"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCarousel;
