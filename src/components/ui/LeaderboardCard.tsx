
import React from 'react';
import { Medal, Trophy, Flame, TrendingUp, TrendingDown, ChevronDown, ChevronUp, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  position: number;
  department?: string;
  trend?: 'up' | 'down' | 'stable';
  trendAmount?: number;
  isCurrentUser?: boolean;
  assessmentScore?: number;
  engagementScore?: number;
  completedCourses?: number;
}

interface LeaderboardCardProps {
  title: string;
  timeframe?: 'Weekly' | 'Monthly' | 'All Time';
  users: LeaderboardUser[];
  currentUserRank?: LeaderboardUser;
  maxPoints?: number;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  title,
  timeframe = 'Weekly',
  users,
  currentUserRank,
  maxPoints = 1000,
}) => {
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-sm font-semibold text-muted-foreground">{position}</span>;
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable', amount?: number) => {
    if (!trend || !amount) return null;
    
    switch (trend) {
      case 'up':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>{amount}</span>
          </Badge>
        );
      case 'down':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 flex items-center space-x-1">
            <TrendingDown className="h-3 w-3" />
            <span>{amount}</span>
          </Badge>
        );
      case 'stable':
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 flex items-center space-x-1">
            <span className="h-3 w-3">-</span>
            <span>{amount}</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold leading-none tracking-tight flex items-center">
            <Flame className="h-5 w-5 mr-2 text-primary" />
            {title}
          </h3>
          {timeframe && (
            <p className="text-sm text-muted-foreground">{timeframe} Rankings</p>
          )}
        </div>
      </div>
      
      <div className="p-6 pt-0">
        {/* Top Users */}
        <div className="space-y-4">
          {users.map((user) => (
            <div 
              key={user.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                user.isCurrentUser 
                  ? 'bg-primary/10 border border-primary/30' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8">
                  {getPositionIcon(user.position)}
                </div>
                
                <Avatar className={`h-10 w-10 ${user.position <= 3 ? 'ring-2 ring-primary/50' : ''}`}>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-center">
                    <p className={`text-sm font-medium ${user.isCurrentUser ? 'text-primary' : ''}`}>{user.name}</p>
                    {user.isCurrentUser && (
                      <Badge variant="outline" className="ml-2 text-xs bg-primary/20 text-primary">You</Badge>
                    )}
                  </div>
                  {user.department && (
                    <p className="text-xs text-muted-foreground">{user.department}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{user.points}</span>
                  <span className="text-xs text-muted-foreground">pts</span>
                  {getTrendIcon(user.trend, user.trendAmount)}
                </div>
                
                {(user.assessmentScore !== undefined || user.engagementScore !== undefined) && (
                  <div className="flex space-x-2 mt-1">
                    {user.assessmentScore !== undefined && (
                      <Badge variant="outline" className="text-xs">
                        A: {user.assessmentScore}
                      </Badge>
                    )}
                    {user.engagementScore !== undefined && (
                      <Badge variant="outline" className="text-xs">
                        E: {user.engagementScore}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Show more */}
        <button className="w-full flex items-center justify-center py-2 mt-4 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronDown className="h-4 w-4 mr-1" />
          Show more
        </button>
        
        {/* Current User (if not in top list) */}
        {currentUserRank && !users.find(u => u.isCurrentUser) && (
          <>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-muted-foreground">Your Ranking</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8">
                  <span className="text-sm font-semibold">{currentUserRank.position}</span>
                </div>
                
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUserRank.avatar} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-primary">{currentUserRank.name}</p>
                    <Badge variant="outline" className="ml-2 text-xs bg-primary/20 text-primary">You</Badge>
                  </div>
                  {currentUserRank.department && (
                    <p className="text-xs text-muted-foreground">{currentUserRank.department}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{currentUserRank.points}</span>
                  <span className="text-xs text-muted-foreground">pts</span>
                  {getTrendIcon(currentUserRank.trend, currentUserRank.trendAmount)}
                </div>
                
                {/* Points to next level */}
                {currentUserRank.position > 3 && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {users[users.length - 1].points - currentUserRank.points} pts to rank {currentUserRank.position - 1}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardCard;
