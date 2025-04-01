
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCarouselHeaderProps {
  title: string;
  onViewAllClick?: () => void;
  viewAllUrl?: string;
  carouselId: string;
  description?: string; // Add description property
  showLeftButton?: boolean;
  showRightButton?: boolean;
  onScrollLeft?: () => void;
  onScrollRight?: () => void;
}

const CourseCarouselHeader: React.FC<CourseCarouselHeaderProps> = ({
  title,
  onViewAllClick,
  viewAllUrl = '/view-all',
  carouselId,
  description,
  showLeftButton = true,
  showRightButton = true,
  onScrollLeft,
  onScrollRight
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      navigate(viewAllUrl);
    }
  };

  const triggerCarouselPrev = () => {
    if (onScrollLeft) {
      onScrollLeft();
    } else {
      const carousel = document.getElementById(carouselId);
      if (carousel) {
        const prevButton = carousel.querySelector('[data-embla-prev]') as HTMLElement;
        if (prevButton) prevButton.click();
      }
    }
  };

  const triggerCarouselNext = () => {
    if (onScrollRight) {
      onScrollRight();
    } else {
      const carousel = document.getElementById(carouselId);
      if (carousel) {
        const nextButton = carousel.querySelector('[data-embla-next]') as HTMLElement;
        if (nextButton) nextButton.click();
      }
    }
  };

  return (
    <div 
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col">
        <div className="flex items-center">
          <h2 className="text-h4 font-semibold tracking-tight">{title}</h2>
          <ChevronRight 
            className="h-4 w-4 cursor-pointer ml-1 text-secondary" 
            onClick={handleViewAllClick}
          />
          {isHovered && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-1 p-0 text-secondary hover:text-secondary/80" 
              onClick={handleViewAllClick}
            >
              View All
            </Button>
          )}
        </div>
        {description && <p className="text-body-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      
      {/* Navigation controls for carousel - displayed next to title */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {showLeftButton && (
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white"
            onClick={triggerCarouselPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {showRightButton && (
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full border-secondary text-secondary hover:bg-secondary hover:text-white"
            onClick={triggerCarouselNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCarouselHeader;
