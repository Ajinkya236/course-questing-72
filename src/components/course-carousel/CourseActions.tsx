
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Bookmark, UserPlus, Play } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      <TooltipProvider>
        <div className="flex gap-1 justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="default" 
                className="h-7 w-7 p-0 bg-[#1E40AF] hover:bg-[#1E3A8A]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Play className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Watch</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShareClick}
                aria-label="Share"
                className="h-7 w-7 p-0"
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleBookmarkToggle}
                aria-label="Bookmark"
                className={`h-7 w-7 p-0 ${isBookmarked ? "border-primary text-primary" : ""}`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleAssignClick}
                aria-label="Assign"
                className="h-7 w-7 p-0"
              >
                <UserPlus className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Assign</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default CourseActions;
