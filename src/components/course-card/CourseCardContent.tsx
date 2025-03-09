
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
    <div className="p-3 space-y-2">
      <h3 className="font-medium text-base leading-tight line-clamp-1">{title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>

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

      <div className="pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-1 mb-2">
          <Button 
            variant="default" 
            className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] h-8 text-xs"
            onClick={handleWatchClick}
          >
            <Play className="h-3 w-3 mr-1" /> Watch
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleShareClick}
            aria-label="Share"
            className="h-8 w-8"
          >
            <Share2 className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBookmarkToggle}
            aria-label="Bookmark"
            className={`h-8 w-8 ${isBookmarked ? "border-primary text-primary" : ""}`}
          >
            <Bookmark className={`h-3 w-3 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
        <Button 
          variant="outline" 
          className="w-full h-8 text-xs"
          onClick={handleAssignClick}
        >
          <UserPlus className="h-3 w-3 mr-1" /> Assign
        </Button>
      </div>
    </div>
  );
};

export default memo(CourseCardContent);
