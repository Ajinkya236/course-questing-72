
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

interface CarouselHeaderProps {
  title: string;
  isHovered: boolean;
  onViewAllClick: () => void;
}

const CarouselHeader: React.FC<CarouselHeaderProps> = ({ 
  title, 
  isHovered, 
  onViewAllClick 
}) => {
  return (
    <div className="flex items-center justify-between gap-4 group">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <ChevronRight 
          className="h-4 w-4 cursor-pointer ml-1" 
          onClick={onViewAllClick}
        />
        {isHovered && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-1 p-0" 
            onClick={onViewAllClick}
          >
            View All
          </Button>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex items-center gap-2">
        <CarouselPrevious className="static transform-none" />
        <CarouselNext className="static transform-none" />
      </div>
    </div>
  );
};

export default CarouselHeader;
