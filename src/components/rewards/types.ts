
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

export interface RewardsData {
  points: number;
  rank: number;
  badges: number;
  streakDays: number;
  completedCourses: number;
  totalPoints: number;
  nextRewardThreshold: number;
  multiplier: number;
  nextMilestone: number;
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
  };
  courseWisePoints: {
    courseName: string;
    points: number;
  }[];
}

export interface RewardsTabProps {
  teamMemberId?: string;
}
