
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LeaderboardTabs } from "@/components/leaderboard/LeaderboardTabs";
import { LeaderboardFilters } from "@/components/leaderboard/LeaderboardFilters";
import { LeaderboardUserList } from "@/components/leaderboard/LeaderboardUserList";
import { LeaderboardMilestone } from "@/components/leaderboard/LeaderboardMilestone";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { LeaderboardUser } from "@/components/leaderboard/LeaderboardTypes";

interface LeaderboardCardProps {
  users: LeaderboardUser[];
  currentUser?: LeaderboardUser;
  title?: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ 
  users, 
  currentUser,
  title = "Leaderboard" 
}) => {
  const [timeRange, setTimeRange] = useState("all-time");
  const [showDetails, setShowDetails] = useState(false);
  const [leaderboardType, setLeaderboardType] = useState("relative");
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  
  const getTimeRangeText = () => {
    switch (timeRange) {
      case 'all-time':
        return 'All time rankings';
      case 'this-week':
        return 'This week\'s rankings';
      case 'this-month':
        return 'This month\'s rankings';
      case 'this-quarter':
        return 'This quarter\'s rankings';
      default:
        return 'Rankings';
    }
  };

  const filteredUsers = users.filter(user => {
    if (filterType === 'all' || !filterValue) return true;
    
    switch (filterType) {
      case 'team':
        return user.team === filterValue;
      case 'department':
        return user.department === filterValue;
      case 'location':
        return user.location === filterValue;
      case 'role':
        return user.role === filterValue;
      default:
        return true;
    }
  });
  
  // Always include the #1 ranked user
  const topUser = filteredUsers.find(u => u.position === 1);
  
  // For relative leaderboard - highlight users close to current user
  const getRelativeUsers = () => {
    if (!currentUser) return filteredUsers.slice(0, 5);
    
    const currentUserIndex = filteredUsers.findIndex(u => u.id === currentUser.id);
    if (currentUserIndex === -1) return filteredUsers.slice(0, 5);
    
    // Get 2 users above and 2 users below current user
    let usersToShow = [];
    
    // Always include #1 ranked user if not already in the selection
    if (topUser && topUser.id !== currentUser.id && 
        (currentUserIndex <= 0 || currentUserIndex > 2)) {
      usersToShow.push(topUser);
    }
    
    // Get users above the current user (up to 2)
    if (currentUserIndex > 0) {
      const startIndex = Math.max(0, currentUserIndex - 2);
      usersToShow = [
        ...usersToShow,
        ...filteredUsers.slice(startIndex, currentUserIndex)
      ];
    }
    
    // Add current user
    usersToShow.push(currentUser);
    
    // Get users below the current user (up to 2)
    if (currentUserIndex < filteredUsers.length - 1) {
      usersToShow = [
        ...usersToShow,
        ...filteredUsers.slice(currentUserIndex + 1, currentUserIndex + 3)
      ];
    }
    
    // Make sure we don't have duplicates
    return [...new Map(usersToShow.map(user => [user.id, user])).values()];
  };
  
  const displayedUsers = leaderboardType === 'relative' ? getRelativeUsers() : filteredUsers.slice(0, 5);
  
  const getNextMilestone = () => {
    if (!currentUser) return null;
    
    // Find the next user above the current user
    const nextUser = filteredUsers.find(user => user.position === currentUser.position - 1);
    if (!nextUser) return null;
    
    const pointsNeeded = nextUser.points - currentUser.points;
    return {
      name: nextUser.name,
      position: nextUser.position,
      pointsNeeded
    };
  };
  
  const nextMilestone = getNextMilestone();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Select onValueChange={(value) => setTimeRange(value)} defaultValue={timeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="flex items-center gap-2 mt-2">
          <Calendar className="h-4 w-4" />
          {getTimeRangeText()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LeaderboardTabs 
          setFilterType={setFilterType}
          setLeaderboardType={setLeaderboardType}
        />
        
        <LeaderboardFilters
          leaderboardType={leaderboardType}
          setLeaderboardType={setLeaderboardType}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          filterType={filterType}
          setFilterType={setFilterType}
          setFilterValue={setFilterValue}
        />
        
        <div className="space-y-4">
          <LeaderboardUserList 
            displayedUsers={displayedUsers} 
            currentUser={currentUser}
            showDetails={showDetails}
            filterType={filterType}
            leaderboardType={leaderboardType}
          />
          
          {nextMilestone && (
            <LeaderboardMilestone 
              nextMilestone={nextMilestone} 
              currentUser={currentUser} 
            />
          )}
          
          <div className="mt-2">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
              <ChevronRight className="h-4 w-4" />
              <span>View Full Leaderboard</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
