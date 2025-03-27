
export interface UserRank {
  id: string;
  name: string;
  avatar: string;
  points: number;
  position: number;
  positionChange?: number;
  department?: string;
  team?: string;
  location?: string;
  role?: string;
  jobFamily?: string;
  date?: string;
  segment?: string;
  details?: {
    assessmentScore?: number;
    engagementScore?: number;
    completionRate?: number;
  };
}

export interface TeamRank {
  id: string;
  name: string;
  avatar?: string;
  memberCount: number;
  points: number;
  position: number;
  positionChange?: number;
  winStreak?: number;
  isCurrentUserGroup?: boolean;
}

export interface PointsBreakdownItem {
  category: string;
  points: number;
  color: string;
}

export interface RewardsData {
  points: number;
  rank: number;
  badges: number;
  streakDays: number;
  completedCourses: number;
  totalPoints: number;
  nextRewardThreshold: number;
  multiplier: number;
  nextMilestone: {
    points: number;
    reward: string;
  };
  streak: {
    current: number;
    longest: number;
  };
  pointsBreakdown: {
    courses: number;
    quizzes: number;
    assignments: number;
    engagement: number;
    special: number;
    coursesCompleted: number;
    quizzesPassed: number;
    dailyLogins: number;
    voluntaryActivities: number;
    streakBonus: number;
  };
  courseWisePoints: {
    id: string;
    courseName: string;
    points: number;
    totalPoints: number;
    breakdown: {
      completion: number;
      quizzes: number;
      assignments: number;
      participation: number;
    };
  }[];
  redeemablePoints: number;
}

export interface RewardsTabProps {
  teamMemberId?: string;
}

export interface PointsOverviewProps {
  data: RewardsData;
  onViewStreakDetails?: () => void;
  onRedeemPoints?: () => void;
}
