
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp } from "lucide-react";
import { LeaderboardUser, Milestone } from './LeaderboardTypes';

interface LeaderboardMilestoneProps {
  nextMilestone: {
    name: string;
    position: number;
    pointsNeeded: number;
  };
  currentUser: LeaderboardUser;
}

export const LeaderboardMilestone: React.FC<LeaderboardMilestoneProps> = ({
  nextMilestone,
  currentUser
}) => {
  return (
    <div className="mt-6 p-4 border border-dashed rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-sm">Next Milestone</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-2">
        You need <span className="font-semibold text-primary">{nextMilestone.pointsNeeded.toLocaleString()} more points</span> to surpass {nextMilestone.name} and reach position #{nextMilestone.position}
      </p>
      <Progress value={currentUser.points / (currentUser.points + nextMilestone.pointsNeeded) * 100} className="h-2" />
      <div className="flex justify-between text-xs mt-1">
        <span className="text-muted-foreground">Current: {currentUser.points.toLocaleString()}</span>
        <span className="text-muted-foreground">Target: {(currentUser.points + nextMilestone.pointsNeeded).toLocaleString()}</span>
      </div>
      <Button variant="outline" size="sm" className="w-full mt-3 flex items-center justify-center gap-1">
        <TrendingUp className="h-4 w-4" />
        View All Milestones
      </Button>
    </div>
  );
};
