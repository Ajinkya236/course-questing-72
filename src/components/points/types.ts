
export interface PointsBreakdownItem {
  category: string;
  points: number;
  color: string;
}

export interface PointsData {
  totalPoints: number;
  coursesCompleted: number;
  hoursSpent: number;
  pointsThisWeek: number;
  pointsLastWeek: number;
  pointsBreakdown: PointsBreakdownItem[];
  streakDays: number;
  nextMilestone?: {
    name: string;
    points: number;
    image?: string;
  };
  redeemablePoints: number;
}

export interface PointsOverviewProps {
  data: PointsData;
  onViewStreakDetails?: () => void;
  onRedeemPoints?: () => void;
}
