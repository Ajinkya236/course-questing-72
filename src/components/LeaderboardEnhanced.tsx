
import React, { useState } from 'react';
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
  UserCircle,
  BarChart3,
  Target,
  TrendingUp,
  MapPin,
  Briefcase,
  BarChart,
  PieChart,
  TrendingDown,
  Clock
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

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
  jobFamily?: string;
}

interface LeaderboardEnhancedProps {
  users: LeaderboardUser[];
  currentUser?: LeaderboardUser;
  title?: string;
  isFullView?: boolean;
}

// Sample filters for demo
const filterValues = {
  department: ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations'],
  team: ['Frontend', 'Backend', 'DevOps', 'Design', 'Content', 'Support'],
  location: ['New York', 'San Francisco', 'London', 'Tokyo', 'Singapore', 'Berlin'],
  role: ['Developer', 'Manager', 'Director', 'VP', 'C-Level', 'Analyst'],
  jobFamily: ['Technology', 'Business', 'Creative', 'Support', 'Leadership']
};

const LeaderboardEnhanced: React.FC<LeaderboardEnhancedProps> = ({ 
  users, 
  currentUser,
  title = "Leaderboard",
  isFullView = false
}) => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("this-week");
  const [showDetails, setShowDetails] = useState(false);
  const [leaderboardType, setLeaderboardType] = useState("relative");
  const [leaderboardView, setLeaderboardView] = useState("individual");
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const [secondaryFilter, setSecondaryFilter] = useState("");
  const [showPersonalHistory, setShowPersonalHistory] = useState(false);
  
  // Mock data for personal history
  const personalHistory = [
    { period: 'This Week', points: 850, rank: 8, completed: 3 },
    { period: 'Last Week', points: 720, rank: 12, completed: 2 },
    { period: 'Two Weeks Ago', points: 640, rank: 15, completed: 2 },
    { period: 'Three Weeks Ago', points: 450, rank: 19, completed: 1 },
    { period: 'Four Weeks Ago', points: 380, rank: 22, completed: 1 },
  ];
  
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
      case 'last-week':
        return 'Last week\'s rankings';
      case 'this-month':
        return 'This month\'s rankings';
      case 'last-month':
        return 'Last month\'s rankings';
      default:
        return 'Rankings';
    }
  };
  
  const getFilterTypeIcon = () => {
    switch (filterType) {
      case 'team':
        return <Users className="h-4 w-4" />;
      case 'department':
        return <Building className="h-4 w-4" />;
      case 'location':
        return <MapPin className="h-4 w-4" />;
      case 'role':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const filteredUsers = users.filter(user => {
    if (filterType === 'all' || !filterValue) return true;
    
    const matchesPrimaryFilter = user[filterType as keyof LeaderboardUser] === filterValue;
    
    // If secondary filter is set, apply it too
    if (secondaryFilter && leaderboardView === 'individual') {
      const secondaryFilterType = filterType === 'department' ? 'team' :
                               filterType === 'team' ? 'role' :
                               filterType === 'location' ? 'department' :
                               'jobFamily';
      
      const secondaryFilterKey = secondaryFilterType as keyof LeaderboardUser;
      return matchesPrimaryFilter && user[secondaryFilterKey] === secondaryFilter;
    }
    
    return matchesPrimaryFilter;
  });
  
  // Always include the #1 ranked user
  const topUser = filteredUsers.find(u => u.position === 1);
  
  // For relative leaderboard - highlight users close to current user
  const getRelativeUsers = () => {
    if (!currentUser) return filteredUsers.slice(0, 10);
    
    const currentUserIndex = filteredUsers.findIndex(u => u.id === currentUser.id);
    if (currentUserIndex === -1) return filteredUsers.slice(0, 10);
    
    // Get 5 users above and 5 users below current user
    let usersToShow = [];
    
    // Always include #1 ranked user if not already in the selection
    if (topUser && topUser.id !== currentUser.id && 
        (currentUserIndex <= 0 || currentUserIndex > 5)) {
      usersToShow.push(topUser);
    }
    
    // Get users above the current user (up to 5)
    if (currentUserIndex > 0) {
      const startIndex = Math.max(0, currentUserIndex - 5);
      usersToShow = [
        ...usersToShow,
        ...filteredUsers.slice(startIndex, currentUserIndex)
      ];
    }
    
    // Add current user
    usersToShow.push(currentUser);
    
    // Get users below the current user (up to 5)
    if (currentUserIndex < filteredUsers.length - 1) {
      usersToShow = [
        ...usersToShow,
        ...filteredUsers.slice(currentUserIndex + 1, Math.min(filteredUsers.length, currentUserIndex + 6))
      ];
    }
    
    // Make sure we don't have duplicates
    return [...new Map(usersToShow.map(user => [user.id, user])).values()];
  };
  
  const displayedUsers = isFullView 
    ? filteredUsers 
    : leaderboardType === 'relative' 
      ? getRelativeUsers() 
      : filteredUsers.slice(0, 10);
  
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
  
  // Get appropriate filter options based on current selection
  const getSecondaryFilterOptions = () => {
    switch (filterType) {
      case 'department':
        return filterValues.team;
      case 'team':
        return filterValues.role;
      case 'location':
        return filterValues.department;
      default:
        return filterValues.jobFamily;
    }
  };

  const togglePersonalHistory = () => {
    setShowPersonalHistory(!showPersonalHistory);
  };

  return (
    <Card className={isFullView ? "h-full" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <Select onValueChange={(value) => setTimeRange(value)} defaultValue={timeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="flex items-center gap-2 mt-2">
          <Calendar className="h-4 w-4" />
          {getTimeRangeText()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual" value={leaderboardView} onValueChange={setLeaderboardView} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="individual" onClick={() => { setFilterType('all'); setFilterValue(''); }}>
              <User className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Individual</span>
            </TabsTrigger>
            <TabsTrigger value="group" onClick={() => { setFilterType('department'); setFilterValue(''); }}>
              <Users className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="personal" onClick={() => { setLeaderboardType('relative'); setFilterType('all'); }}>
              <UserCircle className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex gap-2">
            <Button 
              variant={leaderboardType === 'relative' ? "default" : "outline"} 
              size="sm" 
              className="text-xs" 
              onClick={() => setLeaderboardType('relative')}
            >
              Relative
            </Button>
            <Button 
              variant={leaderboardType === 'absolute' ? "default" : "outline"} 
              size="sm" 
              className="text-xs" 
              onClick={() => setLeaderboardType('absolute')}
            >
              Absolute
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs" 
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <>
                  <BarChart3 className="h-3.5 w-3.5 mr-1" /> Hide Details
                </>
              ) : (
                <>
                  <BarChart3 className="h-3.5 w-3.5 mr-1" /> Show Details
                </>
              )}
            </Button>
            
            <Select 
              value={filterType} 
              onValueChange={(value) => { 
                setFilterType(value); 
                setFilterValue(""); 
                setSecondaryFilter("");
              }}
            >
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="department">Department</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="role">Job Role</SelectItem>
                <SelectItem value="jobFamily">Job Family</SelectItem>
              </SelectContent>
            </Select>
            
            {filterType !== 'all' && (
              <Select 
                value={filterValue} 
                onValueChange={(value) => { 
                  setFilterValue(value);
                  setSecondaryFilter("");
                }}
              >
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue placeholder={`Select ${filterType}`} />
                </SelectTrigger>
                <SelectContent>
                  {filterValues[filterType as keyof typeof filterValues]?.map(value => (
                    <SelectItem key={value} value={value}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {filterValue && leaderboardView === 'individual' && (
              <Select 
                value={secondaryFilter} 
                onValueChange={(value) => setSecondaryFilter(value)}
              >
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue placeholder="Refine by" />
                </SelectTrigger>
                <SelectContent>
                  {getSecondaryFilterOptions().map(value => (
                    <SelectItem key={value} value={value}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Personal History Section */}
        {leaderboardView === 'personal' && (
          <div className="mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 mb-4"
              onClick={togglePersonalHistory}
            >
              <Clock className="h-4 w-4" />
              {showPersonalHistory ? 'Hide Personal Progress' : 'Show Personal Progress'}
            </Button>
            
            {showPersonalHistory && (
              <div className="space-y-3 mb-6 bg-secondary/10 p-3 rounded-lg">
                <h3 className="font-medium text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Your Progress Over Time
                </h3>
                
                <div className="space-y-2">
                  {personalHistory.map((stat, index) => (
                    <div key={index} className="p-2 rounded-lg border flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{stat.period}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" /> Rank: #{stat.rank}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" /> Points: {stat.points}
                          </span>
                        </div>
                      </div>
                      <div className={`text-sm ${index > 0 && stat.rank < personalHistory[index-1].rank ? 'text-green-500' : index > 0 && stat.rank > personalHistory[index-1].rank ? 'text-red-500' : ''}`}>
                        {index > 0 && stat.rank < personalHistory[index-1].rank 
                          ? <div className="flex items-center"><ArrowUp className="h-3 w-3 mr-1" />{personalHistory[index-1].rank - stat.rank}</div>
                          : index > 0 && stat.rank > personalHistory[index-1].rank 
                            ? <div className="flex items-center"><ArrowDown className="h-3 w-3 mr-1" />{stat.rank - personalHistory[index-1].rank}</div>
                            : <Minus className="h-3 w-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <ScrollArea className={isFullView ? "h-[calc(100vh-350px)]" : "max-h-80"}>
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
                      {leaderboardView === 'individual' && filterType !== 'all' && user[filterType as keyof LeaderboardUser] && (
                        <div className="text-xs text-muted-foreground">{String(user[filterType as keyof LeaderboardUser])}</div>
                      )}
                      {leaderboardView === 'group' && (
                        <div className="text-xs text-muted-foreground">{user.department}</div>
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

                <div className="flex flex-col rounded-lg bg-primary/10">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 relative">
                        <span className="font-medium text-muted-foreground">{currentUser.position}</span>
                        {currentUser.positionChange !== undefined && (
                          <div className="absolute -top-1 -right-1 bg-background rounded-full">
                            {getPositionChangeIcon(currentUser.positionChange)}
                          </div>
                        )}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{currentUser.name}</span>
                    </div>
                    <div className="badge-glow">
                      <span className="font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {currentUser.points.toLocaleString()} pts
                      </span>
                    </div>
                  </div>
                  
                  {showDetails && currentUser.details && (
                    <div className="bg-secondary/20 p-2 text-xs grid grid-cols-3 gap-2 rounded-b-lg">
                      {currentUser.details.assessmentScore !== undefined && (
                        <div className="text-center">
                          <p className="text-muted-foreground">Assessment</p>
                          <p className="font-semibold">{currentUser.details.assessmentScore}%</p>
                        </div>
                      )}
                      {currentUser.details.engagementScore !== undefined && (
                        <div className="text-center">
                          <p className="text-muted-foreground">Engagement</p>
                          <p className="font-semibold">{currentUser.details.engagementScore}%</p>
                        </div>
                      )}
                      {currentUser.details.completionRate !== undefined && (
                        <div className="text-center">
                          <p className="text-muted-foreground">Completion</p>
                          <p className="font-semibold">{currentUser.details.completionRate}%</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </ScrollArea>
        
        {leaderboardView === 'personal' && nextMilestone && !isFullView && (
          <div className="mt-6 p-4 border border-dashed rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-sm">Next Position Milestone</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              You need <span className="font-semibold text-primary">{nextMilestone.pointsNeeded.toLocaleString()} more points</span> to surpass {nextMilestone.name} and reach position #{nextMilestone.position}
            </p>
            <Progress value={currentUser.points / (currentUser.points + nextMilestone.pointsNeeded) * 100} className="h-2" />
            <div className="flex justify-between text-xs mt-1">
              <span className="text-muted-foreground">Current: {currentUser.points.toLocaleString()}</span>
              <span className="text-muted-foreground">Target: {(currentUser.points + nextMilestone.pointsNeeded).toLocaleString()}</span>
            </div>
          </div>
        )}
        
        {!isFullView && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-1"
              onClick={() => navigate('/leaderboard')}
            >
              <ChevronRight className="h-4 w-4" />
              <span>View Full Leaderboard</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaderboardEnhanced;
