
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamLeaderboardItem, UserLeaderboardItem } from './LeaderboardItem';
import { TeamRank, UserRank } from './types';

interface LeaderboardDisplayProps {
  activeLeaderboardType: string;
  teamLeaderboardScope: string;
  leaderboardFilter: string;
  currentUserId: string;
  title: string;
  description: string;
  leaderboardData: Array<UserRank | TeamRank>;
  showDetails: boolean;
}

const LeaderboardDisplay: React.FC<LeaderboardDisplayProps> = ({
  activeLeaderboardType,
  teamLeaderboardScope,
  leaderboardFilter,
  currentUserId,
  title,
  description,
  leaderboardData,
  showDetails
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* For Team Leaderboards */}
          {activeLeaderboardType === 'team' && teamLeaderboardScope === 'inter' ? (
            // Inter-Team Leaderboard
            leaderboardData.map((team, index) => (
              <TeamLeaderboardItem 
                key={team.id} 
                team={team as TeamRank} 
                index={index} 
              />
            ))
          ) : activeLeaderboardType === 'team' && teamLeaderboardScope === 'intra' ? (
            // Intra-Team Leaderboard (shows individual members within a team/group)
            leaderboardData.map((user, index) => (
              <UserLeaderboardItem 
                key={user.id} 
                user={user as UserRank} 
                index={index} 
                isCurrentUser={user.id === currentUserId}
                showDetails={showDetails}
                leaderboardFilter={leaderboardFilter}
              />
            ))
          ) : leaderboardFilter === 'personal' ? (
            // Personal Best Progression
            leaderboardData.map((user, index) => (
              <UserLeaderboardItem 
                key={`${user.id}-${index}`} 
                user={user as UserRank}
                index={index} 
                isCurrentUser={index === leaderboardData.length - 1}
                showDetails={false}
              />
            ))
          ) : (
            // Individual Leaderboard (relative)
            leaderboardData.map((user, index) => (
              <UserLeaderboardItem 
                key={user.id} 
                user={user as UserRank} 
                index={index} 
                isCurrentUser={user.id === currentUserId}
                showDetails={showDetails}
              />
            ))
          )}

          {/* View More Button */}
          <Button variant="outline" className="w-full">
            View Full Leaderboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardDisplay;
