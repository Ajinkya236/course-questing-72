
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCarouselHeaderProps {
  title: string;
  description?: string; // Added description prop as optional
  onViewAllClick?: () => void;
  viewAllUrl?: string;
  carouselId?: string; // Made carouselId optional
  showLeftButton?: boolean; // Added new props
  showRightButton?: boolean;
  onScrollLeft?: () => void;
  onScrollRight?: () => void;
}

const CourseCarouselHeader: React.FC<CourseCarouselHeaderProps> = ({
  title,
  description,
  onViewAllClick,
  viewAllUrl = '/view-all',
  carouselId,
  showLeftButton,
  showRightButton,
  onScrollLeft,
  onScrollRight
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else if (viewAllUrl) {
      navigate(viewAllUrl);
    }
  };

  // If we have direct scroll handlers, use those
  const handleScrollLeft = () => {
    if (onScrollLeft) {
      onScrollLeft();
    } else {
      triggerCarouselPrev();
    }
  };

  const handleScrollRight = () => {
    if (onScrollRight) {
      onScrollRight();
    } else {
      triggerCarouselNext();
    }
  };

  const triggerCarouselPrev = () => {
    if (!carouselId) return;
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      const prevButton = carousel.querySelector('[data-embla-prev]') as HTMLElement;
      if (prevButton) prevButton.click();
    }
  };

  const triggerCarouselNext = () => {
    if (!carouselId) return;
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      const nextButton = carousel.querySelector('[data-embla-next]') as HTMLElement;
      if (nextButton) nextButton.click();
    }
  };

  return (
    <div 
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        <div className="flex items-center mt-1">
          <ChevronRight 
            className="h-4 w-4 cursor-pointer" 
            onClick={handleViewAllClick}
          />
          {isHovered && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 ml-1" 
              onClick={handleViewAllClick}
            >
              View All
            </Button>
          )}
        </div>
      </div>
      
      {/* Navigation controls for carousel */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={handleScrollLeft}
          disabled={!showLeftButton}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={handleScrollRight}
          disabled={!showRightButton}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseCarouselHeader;
