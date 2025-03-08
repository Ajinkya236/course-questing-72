
export interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  position: number;
  positionChange?: number; // positive for up, negative for down, 0 for no change
  details?: {
    assessmentScore?: number;
    engagementScore?: number;
    completionRate?: number;
  };
  team?: string;
  department?: string;
  location?: string;
  role?: string;
}

export interface Milestone {
  name: string;
  position: number;
  pointsNeeded: number;
}
