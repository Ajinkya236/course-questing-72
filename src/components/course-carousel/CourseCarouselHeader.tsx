
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCarouselHeaderProps {
  title: string;
  onViewAllClick?: () => void;
  viewAllUrl?: string;
  carouselId: string;
}

const CourseCarouselHeader: React.FC<CourseCarouselHeaderProps> = ({
  title,
  onViewAllClick,
  viewAllUrl = '/view-all',
  carouselId
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
    document.querySelector(`#${carouselId} .embla__prev`)?.dispatchEvent(new Event('click'));
  };

  const triggerCarouselNext = () => {
    document.querySelector(`#${carouselId} .embla__next`)?.dispatchEvent(new Event('click'));
  };

  return (
    <div 
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      
      {/* Navigation controls for carousel - displayed next to title */}
      <div className="flex items-center gap-2">
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
