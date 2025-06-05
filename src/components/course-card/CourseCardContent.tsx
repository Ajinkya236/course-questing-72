
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
    <div className="p-4 space-y-3">
      <h3 className="course-title text-base leading-tight line-clamp-2">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">{description}</p>

      <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(CourseCardContent);
