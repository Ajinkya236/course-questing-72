
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CourseCarouselHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  onViewAllClick?: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

const CourseCarouselHeader: React.FC<CourseCarouselHeaderProps> = ({
  title,
  subtitle,
  viewAllHref,
  onViewAllClick,
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        {(viewAllHref || onViewAllClick) && (
          <Button 
            variant="link" 
            className="p-0 h-auto text-sm font-medium"
            onClick={onViewAllClick}
            {...(viewAllHref ? { asChild: true } : {})}
          >
            {viewAllHref ? <a href={viewAllHref}>View all</a> : 'View all'}
          </Button>
        )}
        
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={!canScrollLeft}
            onClick={onScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={!canScrollRight}
            onClick={onScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCarouselHeader;
