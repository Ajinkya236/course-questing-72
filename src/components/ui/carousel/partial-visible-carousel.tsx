
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PartialVisibleCarouselProps {
  items: React.ReactNode[];
  className?: string;
  showArrows?: boolean;
  cardClassName?: string;
  carouselContainerClassName?: string;
  cardWrapperClassName?: string;
  nextPartialPercentage?: number; // Percentage of next card to show (10-20% recommended)
}

export const PartialVisibleCarousel = ({
  items,
  className,
  showArrows = true,
  cardClassName,
  carouselContainerClassName,
  cardWrapperClassName,
  nextPartialPercentage = 15, // Default to 15% visibility of next card
}: PartialVisibleCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Safety check to ensure percentage is within recommended range
  const safePartialPercentage = Math.min(Math.max(nextPartialPercentage, 5), 30);
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : items.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex < items.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Calculate offset for partial visibility
  const getItemStyle = (index: number) => {
    // Current card
    if (index === currentIndex) {
      return {
        transform: `translateX(0%)`,
        zIndex: 20,
        opacity: 1,
      };
    }
    // Next card (partially visible)
    else if (index === currentIndex + 1 || (currentIndex === items.length - 1 && index === 0)) {
      return {
        transform: `translateX(${100 - safePartialPercentage}%)`,
        zIndex: 10,
        opacity: 0.8,
      };
    }
    // Previous card (not visible)
    else {
      return {
        transform: `translateX(${index < currentIndex ? -100 : 200}%)`,
        zIndex: 0,
        opacity: 0,
      };
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      {showArrows && items.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 z-30 -translate-y-1/2"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 z-30 -translate-y-1/2"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
      
      <div className={cn("relative overflow-hidden", carouselContainerClassName)}>
        <div className="flex transition-all duration-300 relative h-full">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "absolute top-0 transition-all duration-300 ease-in-out w-full",
                cardWrapperClassName
              )}
              style={getItemStyle(index)}
            >
              <Card className={cn("h-full", cardClassName)}>
                {item}
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots navigation */}
      {items.length > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex ? "bg-primary w-4" : "bg-muted"
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PartialVisibleCarousel;
