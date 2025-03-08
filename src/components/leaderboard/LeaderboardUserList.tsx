
import React from 'react';
import { LeaderboardUser } from './LeaderboardTypes';
import { LeaderboardUserItem } from './LeaderboardUserItem';

interface LeaderboardUserListProps {
  displayedUsers: LeaderboardUser[];
  currentUser?: LeaderboardUser;
  showDetails: boolean;
  filterType: string;
  leaderboardType: string;
}

export const LeaderboardUserList: React.FC<LeaderboardUserListProps> = ({
  displayedUsers,
  currentUser,
  showDetails,
  filterType,
  leaderboardType
}) => {
  return (
    <>
      {displayedUsers.map((user) => (
        <LeaderboardUserItem
          key={user.id}
          user={user}
          showDetails={showDetails}
          filterType={filterType}
          isCurrentUser={user.id === currentUser?.id}
        />
      ))}

      {currentUser && !displayedUsers.some(u => u.id === currentUser.id) && leaderboardType === 'absolute' && (
        <>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-xs text-muted-foreground">
                Your Ranking
              </span>
            </div>
          </div>

          <LeaderboardUserItem
            user={currentUser}
            showDetails={showDetails}
            filterType={filterType}
            isCurrentUser={true}
          />
        </>
      )}
    </>
  );
};
