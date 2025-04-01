
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Share2, UserPlus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CourseActionsProps {
  isBookmarked: boolean;
  handleBookmarkToggle: (e: React.MouseEvent) => void;
  handleShareClick: (e: React.MouseEvent) => void;
  handleAssignClick: (e: React.MouseEvent) => void;
}

const CourseActions: React.FC<CourseActionsProps> = ({
  isBookmarked,
  handleBookmarkToggle,
  handleShareClick,
  handleAssignClick
}) => {
  return (
    <div className="flex items-center justify-between">
      <TooltipProvider delayDuration={300}>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={handleBookmarkToggle}
                aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary' : ''}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground"
                onClick={handleShareClick}
                aria-label="Share course"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share course</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground"
                onClick={handleAssignClick}
                aria-label="Assign to team member"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Assign to team member</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default CourseActions;
