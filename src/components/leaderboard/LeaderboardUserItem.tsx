
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award, Medal, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { LeaderboardUser } from './LeaderboardTypes';

interface LeaderboardUserItemProps {
  user: LeaderboardUser;
  showDetails: boolean;
  filterType: string;
  isCurrentUser: boolean;
}

export const LeaderboardUserItem: React.FC<LeaderboardUserItemProps> = ({
  user,
  showDetails,
  filterType,
  isCurrentUser
}) => {
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="font-medium text-muted-foreground">{position}</span>;
    }
  };
  
  const getPositionChangeIcon = (change: number | undefined) => {
    if (!change) return <Minus className="h-3 w-3 text-gray-400" />;
    if (change > 0) return <ArrowUp className="h-3 w-3 text-green-500" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  return (
    <div className={`flex flex-col rounded-lg ${isCurrentUser ? "bg-primary/10" : ""}`}>
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 relative">
            {getPositionIcon(user.position)}
            {user.positionChange !== undefined && (
              <div className="absolute -top-1 -right-1 bg-background rounded-full">
                {getPositionChangeIcon(user.positionChange)}
              </div>
            )}
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <span className="font-medium text-sm">{user.name}</span>
            {filterType !== 'all' && user[filterType] && (
              <div className="text-xs text-muted-foreground">{user[filterType]}</div>
            )}
          </div>
        </div>
        <div className="badge-glow">
          <span className="font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">
            {user.points.toLocaleString()} pts
          </span>
        </div>
      </div>
      
      {showDetails && user.details && (
        <div className="bg-secondary/20 p-2 text-xs grid grid-cols-3 gap-2 rounded-b-lg">
          {user.details.assessmentScore !== undefined && (
            <div className="text-center">
              <p className="text-muted-foreground">Assessment</p>
              <p className="font-semibold">{user.details.assessmentScore}%</p>
            </div>
          )}
          {user.details.engagementScore !== undefined && (
            <div className="text-center">
              <p className="text-muted-foreground">Engagement</p>
              <p className="font-semibold">{user.details.engagementScore}%</p>
            </div>
          )}
          {user.details.completionRate !== undefined && (
            <div className="text-center">
              <p className="text-muted-foreground">Completion</p>
              <p className="font-semibold">{user.details.completionRate}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
