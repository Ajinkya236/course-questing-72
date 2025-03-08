
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Share2, 
  Bookmark, 
  UserPlus 
} from 'lucide-react';

interface CourseCardActionsProps {
  isBookmarked: boolean;
  onWatchClick: (e: React.MouseEvent) => void;
  onShareClick: (e: React.MouseEvent) => void;
  onBookmarkToggle: (e: React.MouseEvent) => void;
  onAssignClick: (e: React.MouseEvent) => void;
}

const CourseCardActions: React.FC<CourseCardActionsProps> = ({
  isBookmarked,
  onWatchClick,
  onShareClick,
  onBookmarkToggle,
  onAssignClick
}) => {
  return (
    <div className="p-3 pt-0">
      <div className="flex justify-between gap-2">
        <Button variant="default" size="sm" className="flex-1 gap-1" onClick={onWatchClick}>
          <Play className="h-4 w-4" /> Watch
        </Button>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8 p-0" onClick={onShareClick}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 p-0" onClick={onBookmarkToggle}>
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary" : ""}`} />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 p-0" onClick={onAssignClick}>
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCardActions;
