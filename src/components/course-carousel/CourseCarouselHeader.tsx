
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CourseCarouselHeaderProps {
  title: string;
  viewAllUrl?: string;
  viewAllLink?: string; // Add viewAllLink as an alternative prop name for backward compatibility
}

const CourseCarouselHeader: React.FC<CourseCarouselHeaderProps> = ({ title, viewAllUrl, viewAllLink }) => {
  // Use viewAllUrl if available, otherwise use viewAllLink
  const linkUrl = viewAllUrl || viewAllLink;
  
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      
      {linkUrl && (
        <Link to={linkUrl}>
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CourseCarouselHeader;
