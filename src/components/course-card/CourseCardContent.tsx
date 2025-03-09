
import React from 'react';
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
    <div className="p-4 space-y-3">
      <h3 className="font-semibold text-xl leading-tight">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="pt-2">
        <div className="grid grid-cols-4 gap-2">
          <Button 
            variant="default" 
            className="col-span-2 bg-[#1E40AF] hover:bg-[#1E3A8A]"
            onClick={handleWatchClick}
          >
            <Play className="h-4 w-4 mr-1" /> Watch
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleShareClick}
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBookmarkToggle}
            aria-label="Bookmark"
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="col-span-1"
            onClick={handleAssignClick}
            aria-label="Assign"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCardContent;
