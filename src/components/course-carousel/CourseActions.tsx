
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Bookmark, UserPlus, Play } from 'lucide-react';

interface CourseActionsProps {
  isBookmarked: boolean;
  handleShareClick: (e: React.MouseEvent) => void;
  handleBookmarkToggle: (e: React.MouseEvent) => void;
  handleAssignClick: (e: React.MouseEvent) => void;
}

const CourseActions: React.FC<CourseActionsProps> = ({
  isBookmarked,
  handleShareClick,
  handleBookmarkToggle,
  handleAssignClick
}) => {
  return (
    <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div className="flex gap-1 mb-1">
        <Button 
          variant="default" 
          className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] h-6 text-xs"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Play className="h-3 w-3 mr-1" /> Watch
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleShareClick}
          aria-label="Share"
          className="h-6 w-6"
        >
          <Share2 className="h-3 w-3" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleBookmarkToggle}
          aria-label="Bookmark"
          className={`h-6 w-6 ${isBookmarked ? "border-primary text-primary" : ""}`}
        >
          <Bookmark className={`h-3 w-3 ${isBookmarked ? "fill-current" : ""}`} />
        </Button>
      </div>
      <Button 
        variant="outline" 
        className="w-full h-6 text-xs"
        onClick={handleAssignClick}
      >
        <UserPlus className="h-3 w-3 mr-1" /> Assign
      </Button>
    </div>
  );
};

export default CourseActions;
