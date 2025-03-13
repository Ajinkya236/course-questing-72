
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Award, Gift, ArrowUp, ArrowDown, Star, Medal, Trophy, Users, 
  Calendar, Clock, User, Target, Zap, ArrowLeft, Filter, RefreshCw,
  BookOpen, Sparkles, Flame, Compass
} from 'lucide-react';

interface UserRank {
  id: string;
  name: string;
  position: number;
  positionChange: number;
  points: number;
  avatar: string;
  department?: string;
  team?: string;
  role?: string;
  location?: string;
  details: {
    assessmentScore: number;
    engagementScore: number;
    completionRate: number;
  };
}

interface RewardsTabProps {
  teamMemberId?: string;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ teamMemberId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pointsPeriod, setPointsPeriod] = useState('all-time');
  const [leaderboardType, setLeaderboardType] = useState('relative');
  const [leaderboardFilter, setLeaderboardFilter] = useState('all');
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('month');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for current user position (for relative leaderboard)
  const currentUserPosition = 15;

  // Generate mock leaderboard data
  const generateMockLeaderboardData = () => {
    // Generate 50 users
    const allUsers: UserRank[] = Array.from({ length: 50 }, (_, i) => ({
      id: `user-${i + 1}`,
      name: `User ${i + 1}`,
      position: i + 1,
      positionChange: Math.floor(Math.random() * 5) - 2, // Random position change between -2 and 2
      points: Math.floor(10000 - i * (100 + Math.random() * 50)),
      avatar: `https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${(i % 70) + 1}.jpg`,
      department: ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations'][i % 6],
      team: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F'][i % 6],
      role: ['Developer', 'Manager', 'Designer', 'Analyst', 'Specialist', 'Director'][i % 6],
      location: ['New York', 'San Francisco', 'London', 'Tokyo', 'Singapore', 'Berlin'][i % 6],
      details: {
        assessmentScore: Math.floor(70 + Math.random() * 30),
        engagementScore: Math.floor(60 + Math.random() * 40),
        completionRate: Math.floor(75 + Math.random() * 25)
      }
    }));

    return allUsers;
  };

  const allUsers = generateMockLeaderboardData();
  const currentUser = allUsers.find(user => user.position === currentUserPosition);

  // Mock data for rewards and points
  const rewardsData = {
    totalPoints: 1250,
    pointsToNextReward: 750,
    nextRewardThreshold: 2000,
    streak: 15,
    multiplier: 1.5,
    nextMilestone: {
      points: 1500,
      reward: "Coffee Voucher"
    },
    pointsBreakdown: {
      coursesCompleted: 650,
      quizzesPassed: 280,
      dailyLogins: 120,
      voluntaryActivities: 150,
      streakBonus: 50
    },
    courseWisePoints: [
      { id: 1, courseName: 'Introduction to Leadership', totalPoints: 350, breakdown: { completion: 150, quizzes: 80, assignments: 70, participation: 50 } },
      { id: 2, courseName: 'Advanced Data Analysis', totalPoints: 280, breakdown: { completion: 120, quizzes: 90, assignments: 50, participation: 20 } },
      { id: 3, courseName: 'Effective Communication Strategies', totalPoints: 210, breakdown: { completion: 100, quizzes: 60, assignments: 30, participation: 20 } },
    ]
  };

  // Get Relative Leaderboard (2 users above and 2 below current user)
  const getRelativeLeaderboard = () => {
    if (!currentUser) return [];
    
    const currentIndex = allUsers.findIndex(user => user.id === currentUser.id);
    const startIndex = Math.max(0, currentIndex - 2);
    const endIndex = Math.min(allUsers.length, currentIndex + 3);
    
    return allUsers.slice(startIndex, endIndex);
  };

  // Get Team Leaderboard
  const getTeamLeaderboard = () => {
    return allUsers.filter(user => user.team === currentUser?.team).slice(0, 5);
  };

  // Get Department Leaderboard
  const getDepartmentLeaderboard = () => {
    return allUsers.filter(user => user.department === currentUser?.department).slice(0, 5);
  };

  // Get Role-based Leaderboard
  const getRoleLeaderboard = () => {
    return allUsers.filter(user => user.role === currentUser?.role).slice(0, 5);
  };

  // Get Location-based Leaderboard
  const getLocationLeaderboard = () => {
    return allUsers.filter(user => user.location === currentUser?.location).slice(0, 5);
  };

  // Get Personal Best (tracking own progress)
  const getPersonalBestLeaderboard = () => {
    // Mock historical positions of the current user
    return [
      { ...currentUser!, position: currentUser!.position + 4, positionChange: -1, date: '3 months ago' },
      { ...currentUser!, position: currentUser!.position + 3, positionChange: -1, date: '2 months ago' },
      { ...currentUser!, position: currentUser!.position + 1, positionChange: -2, date: '1 month ago' },
      { ...currentUser!, position: currentUser!.position, positionChange: -1, date: 'This month' },
    ];
  };

  // Get active leaderboard based on filter
  const getActiveLeaderboard = () => {
    switch (leaderboardFilter) {
      case 'team':
        return getTeamLeaderboard();
      case 'department':
        return getDepartmentLeaderboard();
      case 'role':
        return getRoleLeaderboard();
      case 'location':
        return getLocationLeaderboard();
      case 'personal':
        return getPersonalBestLeaderboard();
      default:
        return leaderboardType === 'relative' ? getRelativeLeaderboard() : allUsers.slice(0, 5);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate('/my-team');
  };

  // Calculate progress percentage
  const progressPercentage = (rewardsData.totalPoints / rewardsData.nextRewardThreshold) * 100;

  return (
    <div className="space-y-8">
      {/* Back button for team member view */}
      {teamMemberId && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4" 
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Team
        </Button>
      )}

      {/* Points Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">My Learning Points</h3>
              <p className="text-muted-foreground">Earn points by completing learning activities</p>
            </div>
            <div className="mt-2 md:mt-0 flex flex-col items-end">
              <span className="text-2xl font-bold">{rewardsData.totalPoints} Points</span>
              <div className="flex items-center text-sm text-amber-500 mt-1">
                <Zap className="h-4 w-4 mr-1" />
                <span>{rewardsData.multiplier}x Multiplier Active!</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Next Reward ({rewardsData.nextMilestone.reward})</span>
              <span>{rewardsData.totalPoints} / {rewardsData.nextMilestone.points}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Earn {rewardsData.nextMilestone.points - rewardsData.totalPoints} more points to unlock {rewardsData.nextMilestone.reward}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4 pt-4 border-t">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="overview">Points Overview</TabsTrigger>
              <TabsTrigger value="courses">Course Breakdown</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium">Points Breakdown</h4>
                <Select 
                  value={pointsPeriod} 
                  onValueChange={setPointsPeriod}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Courses Completed:</span>
                  <span className="font-medium">{rewardsData.pointsBreakdown.coursesCompleted} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Quizzes Passed:</span>
                  <span className="font-medium">{rewardsData.pointsBreakdown.quizzesPassed} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Logins:</span>
                  <span className="font-medium">{rewardsData.pointsBreakdown.dailyLogins} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Voluntary Activities:</span>
                  <span className="font-medium">{rewardsData.pointsBreakdown.voluntaryActivities} pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Streak Bonus:</span>
                  <span className="font-medium">{rewardsData.pointsBreakdown.streakBonus} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-primary">Current Streak:</span>
                  <span className="font-medium">{rewardsData.streak} days</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="mt-4">
              <h4 className="text-sm font-medium mb-2">Course-wise Points Breakdown</h4>
              <div className="space-y-4">
                {rewardsData.courseWisePoints.map(course => (
                  <Card key={course.id} className="bg-secondary/5 border-secondary/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{course.courseName}</h5>
                        <Badge variant="secondary">{course.totalPoints} pts</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Course Completion:</span>
                          <span className="font-medium">{course.breakdown.completion} pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quizzes:</span>
                          <span className="font-medium">{course.breakdown.quizzes} pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Assignments:</span>
                          <span className="font-medium">{course.breakdown.assignments} pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Participation:</span>
                          <span className="font-medium">{course.breakdown.participation} pts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Leaderboards Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-bold tracking-tight mb-2 sm:mb-0">Learning Leaderboards</h2>
          
          <div className="flex flex-wrap gap-2">
            {/* Leaderboard Type Selector */}
            <Select 
              value={leaderboardType} 
              onValueChange={setLeaderboardType}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Leaderboard Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relative">Relative Ranking</SelectItem>
                <SelectItem value="top">Top Performers</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Period Selector */}
            <Select 
              value={leaderboardPeriod} 
              onValueChange={setLeaderboardPeriod}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant={leaderboardFilter === 'all' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setLeaderboardFilter('all')}
          >
            <Users className="h-3 w-3 mr-1" /> All
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'team' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setLeaderboardFilter('team')}
          >
            <Users className="h-3 w-3 mr-1" /> Team
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'department' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setLeaderboardFilter('department')}
          >
            <BookOpen className="h-3 w-3 mr-1" /> Department
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'role' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setLeaderboardFilter('role')}
          >
            <User className="h-3 w-3 mr-1" /> Job Role
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'location' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setLeaderboardFilter('location')}
          >
            <Compass className="h-3 w-3 mr-1" /> Location
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'personal' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setLeaderboardFilter('personal')}
          >
            <Target className="h-3 w-3 mr-1" /> Personal Best
          </Badge>
        </div>

        {/* Leaderboard Display */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>
              {leaderboardFilter === 'all' && (leaderboardType === 'relative' ? 'Your Relative Ranking' : 'Top Performers')}
              {leaderboardFilter === 'team' && 'Team Leaderboard'}
              {leaderboardFilter === 'department' && 'Department Leaderboard'}
              {leaderboardFilter === 'role' && 'Job Role Leaderboard'}
              {leaderboardFilter === 'location' && 'Location Leaderboard'}
              {leaderboardFilter === 'personal' && 'Your Progress Over Time'}
            </CardTitle>
            <CardDescription>
              {leaderboardFilter === 'all' && leaderboardType === 'relative' && 'See how you rank compared to others near your position'}
              {leaderboardFilter === 'all' && leaderboardType === 'top' && 'The highest-ranking learners overall'}
              {leaderboardFilter === 'team' && `Ranking within ${currentUser?.team}`}
              {leaderboardFilter === 'department' && `Ranking within ${currentUser?.department}`}
              {leaderboardFilter === 'role' && `Ranking compared to other ${currentUser?.role}s`}
              {leaderboardFilter === 'location' && `Ranking within ${currentUser?.location}`}
              {leaderboardFilter === 'personal' && 'Track your own progress over time'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getActiveLeaderboard().map((user, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    user.id === currentUser?.id ? 'bg-primary/10 border border-primary/20' : 
                    index % 2 === 0 ? 'bg-muted/20' : ''
                  }`}
                >
                  {/* Position */}
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {leaderboardFilter === 'personal' ? (index + 1) : user.position}
                  </div>
                  
                  {/* Avatar and Name */}
                  <div className="flex-1 flex items-center gap-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                      </div>
                      {user.positionChange !== 0 && !leaderboardFilter.includes('personal') && (
                        <div className={`absolute -bottom-1 -right-1 rounded-full p-1 
                          ${user.positionChange > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {user.positionChange > 0 ? 
                            <ArrowUp className="h-3 w-3" /> : 
                            <ArrowDown className="h-3 w-3" />
                          }
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {user.name}
                        {user.id === currentUser?.id && <span className="ml-2 text-xs">(You)</span>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {leaderboardFilter === 'personal' ? 
                          (user as any).date : 
                          user.department}
                      </div>
                    </div>
                  </div>
                  
                  {/* Score and Details */}
                  <div className="text-right">
                    <div className="font-bold">{user.points} pts</div>
                    <div className="flex gap-2 mt-1">
                      {!leaderboardFilter.includes('personal') && (
                        <>
                          <div className="text-xs px-1.5 py-0.5 rounded bg-secondary/30">
                            A: {user.details.assessmentScore}%
                          </div>
                          <div className="text-xs px-1.5 py-0.5 rounded bg-secondary/30">
                            E: {user.details.engagementScore}%
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Next Milestone Prompt */}
              {!leaderboardFilter.includes('personal') && (
                <div className="mt-6 p-4 border rounded-lg bg-primary/5">
                  <h4 className="font-medium flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Your Next Milestone
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Earn 50 more points to overtake the next person in the rankings!
                  </p>
                  <div className="mt-2">
                    <Progress value={75} className="h-1.5" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
              <Button variant="outline" size="sm" className="ml-2 flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Learning Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Stats</CardTitle>
          <CardDescription>Track your learning performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-secondary/5">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="text-muted-foreground mb-1 text-sm">Assessment Score</div>
                <div className="text-2xl font-bold">{currentUser?.details.assessmentScore}%</div>
                <Progress value={currentUser?.details.assessmentScore} className="w-full mt-2 h-1" />
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/5">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="text-muted-foreground mb-1 text-sm">Engagement Score</div>
                <div className="text-2xl font-bold">{currentUser?.details.engagementScore}%</div>
                <Progress value={currentUser?.details.engagementScore} className="w-full mt-2 h-1" />
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/5">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="text-muted-foreground mb-1 text-sm">Completion Rate</div>
                <div className="text-2xl font-bold">{currentUser?.details.completionRate}%</div>
                <Progress value={currentUser?.details.completionRate} className="w-full mt-2 h-1" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsTab;
