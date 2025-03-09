
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronRight as ViewAllIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CarouselHeaderProps {
  title: string;
  viewAllUrl?: string;
  onViewAllClick?: () => void;
  onNavigateLeft: () => void;
  onNavigateRight: () => void;
}

const CarouselHeader: React.FC<CarouselHeaderProps> = ({
  title,
  viewAllUrl,
  onViewAllClick,
  onNavigateLeft,
  onNavigateRight,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewAll = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else if (viewAllUrl) {
      navigate(viewAllUrl);
    }
  };

  return (
    <div 
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <ViewAllIcon 
          className="h-4 w-4 cursor-pointer ml-1" 
          onClick={handleViewAll}
        />
        {isHovered && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-1 p-0" 
            onClick={handleViewAll}
          >
            View All
          </Button>
        )}
      </div>
      
      {/* Navigation controls for carousel */}
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={onNavigateLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={onNavigateRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CarouselHeader;
