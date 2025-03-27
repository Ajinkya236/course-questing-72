
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, Flame, User, Users } from 'lucide-react';
import { TeamRank, UserRank } from './types';

interface TeamLeaderboardItemProps {
  team: TeamRank;
  index: number;
}

interface UserLeaderboardItemProps {
  user: UserRank;
  index: number;
  isCurrentUser: boolean;
  showDetails: boolean;
  leaderboardFilter?: string;
}

export const TeamLeaderboardItem: React.FC<TeamLeaderboardItemProps> = ({ team, index }) => {
  return (
    <div 
      className={`p-3 rounded-lg flex items-center gap-3 ${
        team.isCurrentUserGroup ? 'bg-primary/10 border border-primary/20' : 
        index % 2 === 0 ? 'bg-muted/20' : ''
      }`}
    >
      {/* Position */}
      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
        {team.position}
      </div>
      
      {/* Team Info */}
      <div className="flex-1 flex items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
            {team.avatar ? (
              <img src={team.avatar} alt={team.name} className="h-full w-full object-cover" />
            ) : (
              <Users className="h-5 w-5 text-secondary-foreground" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-medium">{team.name}</span>
            {team.isCurrentUserGroup && (
              <Badge variant="outline" className="ml-2 text-xs">Your Group</Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            <span>{team.memberCount} members</span>
            {team.winStreak && team.winStreak > 0 && (
              <span className="ml-2 text-amber-500 flex items-center">
                <Flame className="h-3 w-3 mr-1" />
                {team.winStreak} week streak
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Points */}
      <div className="text-right">
        <div className="font-medium">{team.points.toLocaleString()} pts</div>
        <div className="flex items-center text-xs">
          {team.positionChange > 0 ? (
            <span className="text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              {team.positionChange}
            </span>
          ) : team.positionChange < 0 ? (
            <span className="text-red-500 flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              {Math.abs(team.positionChange)}
            </span>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const UserLeaderboardItem: React.FC<UserLeaderboardItemProps> = ({ 
  user, 
  index, 
  isCurrentUser,
  showDetails,
  leaderboardFilter 
}) => {
  return (
    <div 
      className={`p-3 rounded-lg flex items-center gap-3 ${
        isCurrentUser ? 'bg-primary/10 border border-primary/20' : 
        index % 2 === 0 ? 'bg-muted/20' : ''
      }`}
    >
      {/* Position */}
      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
        {user.position}
      </div>
      
      {/* User Info */}
      <div className="flex-1 flex items-center gap-3">
        <div className="relative">
          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
          {isCurrentUser && (
            <div className="absolute -bottom-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              <User className="h-3 w-3" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <span className="font-medium">{user.name}</span>
            {isCurrentUser && (
              <Badge variant="outline" className="ml-2 text-xs">You</Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {user.date ? (
              <span>{user.date}</span>
            ) : (
              <div className="flex flex-wrap gap-1">
                <span>{user.department}</span>
                <span>•</span>
                <span>{user.team}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* User Stats */}
      {showDetails && !user.date && user.details && (
        <div className="hidden md:flex gap-2 text-xs">
          <div className="bg-secondary/20 rounded-full px-2 py-1 flex items-center">
            <span className="text-secondary-foreground">Assessment: {user.details.assessmentScore}%</span>
          </div>
          <div className="bg-secondary/20 rounded-full px-2 py-1 flex items-center">
            <span className="text-secondary-foreground">Engagement: {user.details.engagementScore}%</span>
          </div>
          <div className="bg-secondary/20 rounded-full px-2 py-1 flex items-center">
            <span className="text-secondary-foreground">Completion: {user.details.completionRate}%</span>
          </div>
        </div>
      )}
      
      {/* Points */}
      <div className="text-right">
        <div className="font-medium">{user.points.toLocaleString()} pts</div>
        <div className="flex items-center text-xs">
          {user.positionChange > 0 ? (
            <span className="text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              {user.positionChange}
            </span>
          ) : user.positionChange < 0 ? (
            <span className="text-red-500 flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" />
              {Math.abs(user.positionChange)}
            </span>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      </div>
    </div>
  );
};
