
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface CourseProgressBarProps {
  progress?: number;
}

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ progress }) => {
  if (progress === undefined) return null;
  
  // Format to avoid decimals for cleaner UI
  const formattedProgress = Math.round(progress);
  
  // Determine color based on progress (following Law of Prägnanz - simple visual cues)
  const getProgressColor = () => {
    if (formattedProgress < 25) return 'bg-red-500';
    if (formattedProgress < 50) return 'bg-orange-500';
    if (formattedProgress < 75) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="mt-2 space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Progress</span>
        <span className={`font-medium ${formattedProgress === 100 ? 'text-emerald-500' : ''}`}>
          {formattedProgress}%
        </span>
      </div>
      <Progress 
        value={formattedProgress} 
        max={100}
        className="h-1.5 bg-muted/30"
        indicatorClassName={getProgressColor()}
      />
    </div>
  );
};

export default CourseProgressBar;
