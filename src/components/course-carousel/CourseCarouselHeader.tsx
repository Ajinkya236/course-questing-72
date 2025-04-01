
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCarouselHeaderProps {
  title: string;
  onViewAllClick?: () => void;
  viewAllUrl?: string;
  carouselId: string;
  description?: string; // Make description optional
}

const CourseCarouselHeader: React.FC<CourseCarouselHeaderProps> = ({
  title,
  onViewAllClick,
  viewAllUrl = '/view-all',
  carouselId,
  description
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
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      const prevButton = carousel.querySelector('[data-embla-prev]') as HTMLElement;
      if (prevButton) prevButton.click();
    }
  };

  const triggerCarouselNext = () => {
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
        <div className="flex items-center">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <ChevronRight 
            className="h-4 w-4 cursor-pointer ml-1" 
            onClick={handleViewAllClick}
          />
          {isHovered && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-1 p-0" 
              onClick={handleViewAllClick}
            >
              View All
            </Button>
          )}
        </div>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      
      {/* Navigation controls for carousel - displayed next to title */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={triggerCarouselPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={triggerCarouselNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseCarouselHeader;
