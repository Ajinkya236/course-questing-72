
import React from 'react';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CourseCarouselHeaderProps {
  title: string;
  viewAllUrl?: string;
  onViewAllClick?: () => void;
  carouselId: string;
}

const CourseCarouselHeader: React.FC<CourseCarouselHeaderProps> = ({
  title,
  viewAllUrl = '',
  onViewAllClick,
  carouselId
}) => {
  const navigate = useNavigate();
  
  const handleViewAll = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else if (viewAllUrl) {
      navigate(viewAllUrl);
    }
  };

  return (
    <div className="flex items-center justify-between" id={`${carouselId}-header`}>
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight group">
        {title}
        <div className="h-1 w-0 group-hover:w-full bg-primary/70 mt-1 transition-all duration-300"></div>
      </h2>
      
      {(viewAllUrl || onViewAllClick) && (
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1 rounded-full border-primary/30 hover:border-primary hover:bg-primary/5 transition-colors"
          onClick={handleViewAll}
        >
          <span>View all</span>
          <MoveRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default CourseCarouselHeader;
