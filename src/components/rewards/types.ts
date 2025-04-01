
export interface UserRank {
  id: string;
  name: string;
  position: number;
  positionChange: number;
  points: number;
  avatar: string;
  department?: string;
  team?: string;
  role?: string;
  location?: string;
  segment?: string;
  jobFamily?: string;
  skill?: string;
  details: {
    assessmentScore: number;
    engagementScore: number;
    completionRate: number;
  };
  date?: string; // For personal best
}

export interface TeamRank {
  id: string;
  name: string;
  position: number;
  positionChange: number;
  points: number;
  avatar: string;
  memberCount: number;
  department?: string;
  segment?: string;
  winStreak?: number;
  isCurrentUserGroup?: boolean;
}

export interface RewardsData {
  totalPoints: number;
  pointsToNextReward: number;
  nextRewardThreshold: number;
  streak: number;
  multiplier: number;
  nextMilestone: {
    points: number;
    reward: string;
  };
  pointsBreakdown: {
    coursesCompleted: number;
    quizzesPassed: number;
    dailyLogins: number;
    voluntaryActivities: number;
    streakBonus: number;
  };
  courseWisePoints: Array<{
    id: number;
    courseName: string;
    totalPoints: number;
    breakdown: {
      completion: number;
      quizzes: number;
      assignments: number;
      participation: number;
    };
  }>;
  
  // Added these fields for compatibility with RewardsTab component
  points?: number;
  rank?: number;
  badges?: number;
  streakDays?: number;
  completedCourses?: number;
}

export interface RewardsTabProps {
  teamMemberId?: string;
}
