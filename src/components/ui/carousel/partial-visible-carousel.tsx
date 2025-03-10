
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PartialVisibleCarouselProps {
  className?: string;
  itemClassName?: string;
  children: React.ReactNode[];
  visibleItemCount?: number;
  partialVisiblePercentage?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
}

export function PartialVisibleCarousel({
  className,
  itemClassName,
  children,
  visibleItemCount = 3,
  partialVisiblePercentage = 15, // Default to showing 15% of the next item
  gap = 16,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
}: PartialVisibleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalItems = React.Children.count(children);
  const maxIndex = Math.max(0, totalItems - visibleItemCount);

  // Calculate item width based on visible items, gap, and partial visibility
  const calculateItemWidth = (): number => {
    if (!carouselRef.current) return 0;
    
    const containerWidth = carouselRef.current.clientWidth;
    const totalGapWidth = gap * (visibleItemCount - 1);
    const partialItemWidth = (containerWidth * partialVisiblePercentage) / 100;
    
    // Full items + partial item - gaps
    return (containerWidth - partialItemWidth - totalGapWidth) / visibleItemCount;
  };

  const [itemWidth, setItemWidth] = useState(0);

  // Update item width on resize
  useEffect(() => {
    const handleResize = () => {
      setItemWidth(calculateItemWidth());
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [visibleItemCount, partialVisiblePercentage, gap]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      next();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, maxIndex]);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  // Touch handling for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Swipe threshold detection
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  // Calculate translation for the current index
  const getTranslation = () => {
    return -(currentIndex * (itemWidth + gap));
  };

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {showControls && totalItems > visibleItemCount && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={prev}
            disabled={currentIndex === 0 && !autoPlay}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={next}
            disabled={currentIndex === maxIndex && !autoPlay}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}
      
      <div
        ref={carouselRef}
        className="relative flex w-full touch-pan-y items-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(${getTranslation()}px)`,
            gap: `${gap}px`
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              className={cn("flex-shrink-0", itemClassName)}
              style={{ width: `${itemWidth}px` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      
      {showControls && totalItems > visibleItemCount && (
        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={cn(
                "h-2 w-2 rounded-full p-0",
                currentIndex === index
                  ? "bg-primary"
                  : "bg-muted hover:bg-muted-foreground/50"
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Jump to slide {index + 1}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
