
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CourseCarouselHeaderProps {
  title: string;
  viewAllUrl?: string;
  viewAllLink?: string; // For backward compatibility
  onViewAllClick?: () => void;
}

const CourseCarouselHeader: React.FC<CourseCarouselHeaderProps> = ({ 
  title, 
  viewAllUrl, 
  viewAllLink,
  onViewAllClick
}) => {
  // Use viewAllUrl if available, otherwise use viewAllLink
  const linkUrl = viewAllUrl || viewAllLink;
  
  const handleClick = (e: React.MouseEvent) => {
    if (onViewAllClick) {
      e.preventDefault();
      onViewAllClick();
    }
  };
  
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      
      {linkUrl && (
        <Link to={linkUrl} onClick={handleClick}>
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CourseCarouselHeader;
