
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
      <h3 className="font-heading text-sm leading-tight line-clamp-1">{title}</h3>
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

      {/* Action buttons with hover visibility */}
      <div className="flex flex-col gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <Button 
            variant="default" 
            className="flex-1 py-1 h-8 bg-primary hover:bg-primary/90 text-white"
            onClick={handleWatchClick}
            size="sm"
          >
            <Play className="h-3 w-3 mr-1" /> Watch
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleShareClick}
            aria-label="Share"
            className="h-8 w-8 border-muted-foreground/30 hover:bg-muted hover:text-primary"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBookmarkToggle}
            aria-label="Bookmark"
            className={`h-8 w-8 ${isBookmarked ? "border-primary bg-primary/10" : "border-muted-foreground/30"} hover:bg-muted hover:text-primary`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full h-8 text-xs border-muted-foreground/30 hover:bg-muted hover:text-primary"
          onClick={handleAssignClick}
          size="sm"
        >
          <UserPlus className="h-3 w-3 mr-1" /> Assign
        </Button>
      </div>
    </div>
  );
};

export default memo(CourseCardContent);
