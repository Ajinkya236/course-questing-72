
import React, { memo } from 'react';
import { Clock, Star, Share2, Bookmark, Play, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardContentProps {
  title: string;
  description: string;
  duration: string;
  rating: number;
  isBookmarked: boolean;
  handleWatchClick: (e: React.MouseEvent) => void;
  handleShareClick: (e: React.MouseEvent) => void;
  handleBookmarkToggle: (e: React.MouseEvent) => void;
  handleAssignClick: (e: React.MouseEvent) => void;
}

const CourseCardContent: React.FC<CourseCardContentProps> = ({
  title,
  description,
  duration,
  rating,
  isBookmarked,
  handleWatchClick,
  handleShareClick,
  handleBookmarkToggle,
  handleAssignClick
}) => {
  return (
    <div className="p-3 space-y-1 flex flex-col h-[200px]">
      <h3 className="font-medium text-sm leading-tight line-clamp-1">{title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">{description}</p>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Always show buttons, removed opacity transitions */}
      <div className="pt-1 mt-auto course-card-actions">
        <div className="flex gap-1 mb-1">
          <Button 
            variant="default" 
            className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] h-7 text-xs"
            onClick={handleWatchClick}
          >
            <Play className="h-3 w-3 mr-1" /> Watch
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleShareClick}
            aria-label="Share"
            className="h-7 w-7"
          >
            <Share2 className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBookmarkToggle}
            aria-label="Bookmark"
            className={`h-7 w-7 ${isBookmarked ? "border-primary text-primary" : ""}`}
          >
            <Bookmark className={`h-3 w-3 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
        <Button 
          variant="outline" 
          className="w-full h-7 text-xs"
          onClick={handleAssignClick}
        >
          <UserPlus className="h-3 w-3 mr-1" /> Assign
        </Button>
      </div>
    </div>
  );
};

export default memo(CourseCardContent);
