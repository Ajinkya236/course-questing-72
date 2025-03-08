
import React from 'react';
import { Flame, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StreakCardProps {
  streakDays: number;
  onViewDetails?: () => void;
}

const StreakCard: React.FC<StreakCardProps> = ({ streakDays, onViewDetails }) => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Learning Streak</h4>
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            {streakDays} Days
          </Badge>
        </div>
        
        <div className="flex items-center justify-center py-4">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-secondary"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - streakDays / 30)}
                className="text-amber-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <Flame className="h-8 w-8 text-amber-500" />
            </div>
          </div>
        </div>
        
        <p className="text-sm text-center text-muted-foreground">
          Keep learning daily to maintain your streak!
        </p>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={onViewDetails}
          >
            <Target className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;
