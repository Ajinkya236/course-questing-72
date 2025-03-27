
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
