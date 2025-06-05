
import React, { memo } from 'react';
import { Clock, Star } from "lucide-react";

interface CourseCardContentProps {
  title: string;
  description: string;
  duration: string;
  rating: number;
}

const CourseCardContent: React.FC<CourseCardContentProps> = ({
  title,
  description,
  duration,
  rating
}) => {
  return (
    <div className="p-3 space-y-2">
      <h3 className="course-title text-sm leading-tight line-clamp-1">{title}</h3>
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
    </div>
  );
};

export default memo(CourseCardContent);
