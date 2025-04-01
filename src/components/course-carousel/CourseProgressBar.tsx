
import React from 'react';

interface CourseProgressBarProps {
  progress?: number;
}

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ progress }) => {
  // If no progress is provided, don't render the progress bar
  if (progress === undefined || progress === null) {
    return null;
  }

  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{safeProgress}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default CourseProgressBar;
