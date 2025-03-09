
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
    <div className="p-3 space-y-2 max-h-[150px]">
      <h3 className="font-medium text-sm leading-tight line-clamp-1">{title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">{description}</p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex gap-1 mb-1.5">
          <Button 
            variant="default" 
            className="flex-1 bg-primary hover:bg-primary/90 h-7 text-xs px-2 rounded-md"
            onClick={handleWatchClick}
          >
            <Play className="h-3 w-3 mr-1" /> Watch
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleShareClick}
            aria-label="Share"
            className="h-7 w-7 rounded-md"
          >
            <Share2 className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBookmarkToggle}
            aria-label="Bookmark"
            className={`h-7 w-7 rounded-md ${isBookmarked ? "border-primary text-primary bg-primary/10" : ""}`}
          >
            <Bookmark className={`h-3 w-3 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
        <Button 
          variant="outline" 
          className="w-full h-7 text-xs rounded-md"
          onClick={handleAssignClick}
        >
          <UserPlus className="h-3 w-3 mr-1" /> Assign
        </Button>
      </div>
    </div>
  );
};

export default memo(CourseCardContent);
