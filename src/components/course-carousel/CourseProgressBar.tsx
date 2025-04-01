
import React from 'react';

interface CourseProgressBarProps {
  progress: number;
}

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ progress }) => {
  if (progress === undefined) return null;
  
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-muted-foreground">Progress</span>
        <span className="text-xs font-medium">{progress}%</span>
      </div>
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CourseProgressBar;
