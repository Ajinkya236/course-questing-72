
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LearningProgressProps {
  assignedCount: number;
  inProgressCount: number;
  completedCount: number;
  completedPercentage: number;
}

const LearningProgress: React.FC<LearningProgressProps> = ({
  assignedCount,
  inProgressCount,
  completedCount,
  completedPercentage
}) => {
  return (
    <Card>
      <CardContent className="py-4">
        <h3 className="text-lg font-medium mb-2">Learning Progress</h3>
        <div className="flex items-center gap-4">
          <Progress value={completedPercentage} className="h-2 flex-1" />
          <span className="text-sm font-medium">{completedPercentage}%</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-3">
          <div className="text-center">
            <p className="text-xl font-bold">{assignedCount}</p>
            <p className="text-sm text-muted-foreground">Assigned</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{inProgressCount}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{completedCount}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgress;
