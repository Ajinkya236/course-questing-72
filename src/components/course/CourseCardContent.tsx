
import React from 'react';
import { Clock, Star } from 'lucide-react';

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
    <div className="p-3">
      <h3 className="font-medium text-base line-clamp-2 mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
      
      {/* Course Meta Information */}
      <div className="flex justify-between text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCardContent;
