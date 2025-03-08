
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface MentorCarouselHeaderProps {
  onPrevious: () => void;
  onNext: () => void;
  onViewAll: () => void;
}

const MentorCarouselHeader: React.FC<MentorCarouselHeaderProps> = ({
  onPrevious,
  onNext,
  onViewAll
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-semibold">Recommended Mentors</h2>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="link" size="sm" className="gap-1" onClick={onViewAll}>
          <Search className="h-4 w-4" />
          View All
        </Button>
      </div>
    </div>
  );
};

export default MentorCarouselHeader;
