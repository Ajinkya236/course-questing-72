
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Award, 
  Medal, 
  Calendar, 
  User, 
  Users, 
  Building, 
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Minus,
  Target,
  TrendingUp,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface LeaderboardUser {
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
  const [timeRange, setTimeRange] = React.useState("all-time");
  const [showDetails, setShowDetails] = React.useState(false);
  
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
  
  // Get relative users - current user, 2 above, 2 below
  const getRelativeUsers = () => {
    if (!currentUser) return users.slice(0, 5);
    
    const currentUserIndex = users.findIndex(u => u.id === currentUser.id);
    if (currentUserIndex === -1) return users.slice(0, 5);
    
    // Get users above the current user (up to 2)
    let usersToShow = [];
    
    // Always include #1 ranked user if not already in the selection
    const topUser = users.find(u => u.position === 1);
    if (topUser && topUser.id !== currentUser.id && 
        (currentUserIndex <= 0 || currentUserIndex > 2)) {
      usersToShow.push(topUser);
    }
    
    // Get up to 2 users above current user
    if (currentUserIndex > 0) {
      const startIndex = Math.max(0, currentUserIndex - 2);
      usersToShow = [
        ...usersToShow,
        ...users.slice(startIndex, currentUserIndex)
      ];
    }
    
    // Add current user
    usersToShow.push(currentUser);
    
    // Get up to 2 users below current user
    if (currentUserIndex < users.length - 1) {
      usersToShow = [
        ...usersToShow,
        ...users.slice(currentUserIndex + 1, currentUserIndex + 3)
      ];
    }
    
    // Make sure we don't have duplicates
    return [...new Map(usersToShow.map(user => [user.id, user])).values()];
  };
  
  const displayedUsers = getRelativeUsers();
  
  const getNextMilestone = () => {
    if (!currentUser) return null;
    
    // Find the next user above the current user
    const nextUser = users.find(user => user.position === currentUser.position - 1);
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
        <Tabs defaultValue="individual" className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="individual">
              <User className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Individual</span>
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="department">
              <Building className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Department</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs" 
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>
        
        <div className="space-y-4">
          {displayedUsers.map((user) => (
            <div
              key={user.id}
              className={`flex flex-col rounded-lg ${
                user.id === currentUser?.id ? "bg-primary/10" : ""
              }`}
            >
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
                    {user.team && (
                      <div className="text-xs text-muted-foreground">{user.team}</div>
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
          ))}
          
          {nextMilestone && (
            <div className="mt-6 p-4 border border-dashed rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-sm">Next Milestone</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                You need <span className="font-semibold text-primary">{nextMilestone.pointsNeeded.toLocaleString()} more points</span> to surpass {nextMilestone.name} and reach position #{nextMilestone.position}
              </p>
              <Progress value={currentUser!.points / (currentUser!.points + nextMilestone.pointsNeeded) * 100} className="h-2" />
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">Current: {currentUser!.points.toLocaleString()}</span>
                <span className="text-muted-foreground">Target: {(currentUser!.points + nextMilestone.pointsNeeded).toLocaleString()}</span>
              </div>
              <Link to="/milestones">
                <Button variant="outline" size="sm" className="w-full mt-3 flex items-center justify-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  View All Milestones
                </Button>
              </Link>
            </div>
          )}
          
          <div className="mt-2">
            <Link to="/leaderboard">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
                <ChevronRight className="h-4 w-4" />
                <span>View Full Leaderboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
