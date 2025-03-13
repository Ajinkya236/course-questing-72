
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
  BookOpen, Sparkles, Flame, Compass, Building, Briefcase, UserPlus
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
  segment?: string;
  jobFamily?: string;
  skill?: string;
  details: {
    assessmentScore: number;
    engagementScore: number;
    completionRate: number;
  };
}

interface TeamRank {
  id: string;
  name: string;
  position: number;
  positionChange: number;
  points: number;
  avatar: string;
  memberCount: number;
  department?: string;
  segment?: string;
  winStreak?: number;
}

interface RewardsTabProps {
  teamMemberId?: string;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ teamMemberId }) => {
  // State for various leaderboard filters and types
  const [activeLeaderboardType, setActiveLeaderboardType] = useState('individual');
  const [individualLeaderboardScope, setIndividualLeaderboardScope] = useState('relative');
  const [teamLeaderboardScope, setTeamLeaderboardScope] = useState('intra');
  const [leaderboardFilter, setLeaderboardFilter] = useState('all');
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('month');
  const [pointsPeriod, setPointsPeriod] = useState('all-time');
  const [activeTab, setActiveTab] = useState('overview');
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [jobFamilyFilter, setJobFamilyFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [showDetails, setShowDetails] = useState(true);
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
      segment: ['Enterprise', 'SMB', 'Consumer', 'Government', 'Education'][i % 5],
      jobFamily: ['Technical', 'Business', 'Creative', 'Support', 'Leadership'][i % 5],
      skill: ['JavaScript', 'Python', 'Leadership', 'Design', 'Marketing', 'Communication'][i % 6],
      details: {
        assessmentScore: Math.floor(70 + Math.random() * 30),
        engagementScore: Math.floor(60 + Math.random() * 40),
        completionRate: Math.floor(75 + Math.random() * 25)
      }
    }));

    return allUsers;
  };

  // Generate mock team leaderboard data
  const generateMockTeamLeaderboard = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: `team-${i + 1}`,
      name: `Team ${String.fromCharCode(65 + i)}`,
      position: i + 1,
      positionChange: Math.floor(Math.random() * 5) - 2,
      points: Math.floor(25000 - i * (500 + Math.random() * 300)),
      avatar: `/placeholder.svg`,
      memberCount: Math.floor(3 + Math.random() * 10),
      department: ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations'][i % 6],
      segment: ['Enterprise', 'SMB', 'Consumer', 'Government', 'Education'][i % 5],
      winStreak: i < 3 ? Math.floor(1 + Math.random() * 5) : 0
    }));
  };

  const allUsers = generateMockLeaderboardData();
  const allTeams = generateMockTeamLeaderboard();
  const currentUser = allUsers.find(user => user.position === currentUserPosition);
  const currentTeam = allTeams.find(team => team.name === currentUser?.team);

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

  // Get Relative Individual Leaderboard (2 users above and 2 below current user)
  const getRelativeLeaderboard = () => {
    if (!currentUser) return [];
    
    const currentIndex = allUsers.findIndex(user => user.id === currentUser.id);
    const startIndex = Math.max(0, currentIndex - 2);
    const endIndex = Math.min(allUsers.length, currentIndex + 3);
    
    return allUsers.slice(startIndex, endIndex);
  };

  // Get filtered individual leaderboard
  const getFilteredIndividualLeaderboard = () => {
    let filteredUsers = [...allUsers];
    
    // Apply segment filter
    if (segmentFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.segment === segmentFilter);
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
    }
    
    // Apply job family filter
    if (jobFamilyFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.jobFamily === jobFamilyFilter);
    }
    
    // Apply skill filter
    if (skillFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.skill === skillFilter);
    }
    
    // Apply team filter
    if (leaderboardFilter === 'team') {
      filteredUsers = filteredUsers.filter(user => user.team === currentUser?.team);
    }
    // Apply department filter
    else if (leaderboardFilter === 'department') {
      filteredUsers = filteredUsers.filter(user => user.department === currentUser?.department);
    }
    // Apply location filter
    else if (leaderboardFilter === 'location') {
      filteredUsers = filteredUsers.filter(user => user.location === currentUser?.location);
    }
    // Apply role filter
    else if (leaderboardFilter === 'role') {
      filteredUsers = filteredUsers.filter(user => user.role === currentUser?.role);
    }
    
    return filteredUsers.slice(0, 5);
  };

  // Get Intra Team Leaderboard (users within the same team)
  const getIntraTeamLeaderboard = () => {
    if (!currentUser?.team) return [];
    return allUsers.filter(user => user.team === currentUser.team).slice(0, 5);
  };

  // Get Inter Team Leaderboard (competition between teams)
  const getInterTeamLeaderboard = () => {
    // Apply filters to teams
    let filteredTeams = [...allTeams];
    
    if (segmentFilter !== 'all') {
      filteredTeams = filteredTeams.filter(team => team.segment === segmentFilter);
    }
    
    return filteredTeams.slice(0, 5);
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

  // Get active leaderboard based on current settings
  const getActiveLeaderboard = () => {
    if (activeLeaderboardType === 'team') {
      return teamLeaderboardScope === 'intra' ? getIntraTeamLeaderboard() : getInterTeamLeaderboard();
    } else if (leaderboardFilter === 'personal') {
      return getPersonalBestLeaderboard();
    } else {
      return individualLeaderboardScope === 'relative' ? getRelativeLeaderboard() : getFilteredIndividualLeaderboard();
    }
  };

  // Calculate next milestone for user
  const getNextMilestone = () => {
    if (!currentUser) return null;
    
    const leaderboard = individualLeaderboardScope === 'relative' ? getRelativeLeaderboard() : getFilteredIndividualLeaderboard();
    const currentIndex = leaderboard.findIndex(user => user.id === currentUser.id);
    
    if (currentIndex <= 0) return null;
    
    const nextUser = leaderboard[currentIndex - 1];
    const pointsNeeded = nextUser.points - currentUser.points;
    
    return {
      name: nextUser.name,
      points: pointsNeeded
    };
  };

  // Handle back button
  const handleBack = () => {
    navigate('/my-team');
  };

  // Calculate progress percentage
  const progressPercentage = (rewardsData.totalPoints / rewardsData.nextRewardThreshold) * 100;

  // Get the current leaderboard title
  const getLeaderboardTitle = () => {
    if (activeLeaderboardType === 'team') {
      return teamLeaderboardScope === 'intra' ? 'Intra-Team Leaderboard' : 'Inter-Team Leaderboard';
    } else if (leaderboardFilter === 'personal') {
      return 'Personal Best Progression';
    } else {
      return individualLeaderboardScope === 'relative' ? 'Your Relative Ranking' : 'Individual Leaderboard';
    }
  };

  // Get the current leaderboard description
  const getLeaderboardDescription = () => {
    if (activeLeaderboardType === 'team') {
      return teamLeaderboardScope === 'intra' 
        ? `See how team members within ${currentUser?.team} compare` 
        : 'See how different teams compare against each other';
    } else if (leaderboardFilter === 'personal') {
      return 'Track your own progress over time';
    } else {
      return individualLeaderboardScope === 'relative' 
        ? 'See how you rank compared to others near your position' 
        : 'See how you rank in the overall leaderboard';
    }
  };

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
            <Tabs value={activeLeaderboardType} onValueChange={setActiveLeaderboardType} className="w-auto">
              <TabsList>
                <TabsTrigger value="individual" className="text-xs px-2 py-1">
                  <User className="h-3 w-3 mr-1" />
                  Individual
                </TabsTrigger>
                <TabsTrigger value="team" className="text-xs px-2 py-1">
                  <Users className="h-3 w-3 mr-1" />
                  Team
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Individual Leaderboard Scope */}
            {activeLeaderboardType === 'individual' && (
              <Tabs value={individualLeaderboardScope} onValueChange={setIndividualLeaderboardScope} className="w-auto">
                <TabsList>
                  <TabsTrigger value="relative" className="text-xs px-2 py-1">Relative</TabsTrigger>
                  <TabsTrigger value="absolute" className="text-xs px-2 py-1">Absolute</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
            
            {/* Team Leaderboard Scope */}
            {activeLeaderboardType === 'team' && (
              <Tabs value={teamLeaderboardScope} onValueChange={setTeamLeaderboardScope} className="w-auto">
                <TabsList>
                  <TabsTrigger value="intra" className="text-xs px-2 py-1">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Intra-Team
                  </TabsTrigger>
                  <TabsTrigger value="inter" className="text-xs px-2 py-1">
                    <Building className="h-3 w-3 mr-1" />
                    Inter-Team
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
            
            {/* Period Selector */}
            <Select 
              value={leaderboardPeriod} 
              onValueChange={setLeaderboardPeriod}
            >
              <SelectTrigger className="h-8 text-xs w-[110px]">
                <Calendar className="h-3 w-3 mr-1" />
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
        
        {/* Filter Pills for Individual Leaderboards */}
        {activeLeaderboardType === 'individual' && individualLeaderboardScope === 'absolute' && (
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
              <Briefcase className="h-3 w-3 mr-1" /> Job Role
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
        )}
        
        {/* Additional Filters for Teams and Segments */}
        {(activeLeaderboardType === 'team' || (activeLeaderboardType === 'individual' && individualLeaderboardScope === 'absolute')) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {/* Job Segment Filter */}
            <Select 
              value={segmentFilter} 
              onValueChange={setSegmentFilter}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Job Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="SMB">SMB</SelectItem>
                <SelectItem value="Consumer">Consumer</SelectItem>
                <SelectItem value="Government">Government</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Job Role Filter */}
            <Select 
              value={roleFilter} 
              onValueChange={setRoleFilter}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Job Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Analyst">Analyst</SelectItem>
                <SelectItem value="Specialist">Specialist</SelectItem>
                <SelectItem value="Director">Director</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Job Family Filter */}
            <Select 
              value={jobFamilyFilter} 
              onValueChange={setJobFamilyFilter}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Job Family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Families</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Creative">Creative</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Skill Filter */}
            <Select 
              value={skillFilter} 
              onValueChange={setSkillFilter}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Leaderboard Display */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>{getLeaderboardTitle()}</CardTitle>
            <CardDescription>{getLeaderboardDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* For Team Leaderboards */}
              {activeLeaderboardType === 'team' && teamLeaderboardScope === 'inter' ? (
                // Inter-Team Leaderboard
                getInterTeamLeaderboard().map((team, index) => (
                  <div 
                    key={team.id}
                    className={`p-3 rounded-lg flex items-center gap-3 ${
                      team.id === currentTeam?.id ? 'bg-primary/10 border border-primary/20' : 
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
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary">
                          <img src={team.avatar} alt={team.name} className="h-full w-full object-cover" />
                        </div>
                        {team.positionChange !== 0 && (
                          <div className={`absolute -bottom-1 -right-1 rounded-full p-1 
                            ${team.positionChange > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {team.positionChange > 0 ? 
                              <ArrowUp className="h-3 w-3" /> : 
                              <ArrowDown className="h-3 w-3" />
                            }
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {team.name}
                          {team.id === currentTeam?.id && <span className="ml-2 text-xs">(Your Team)</span>}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {team.memberCount} members • {team.department}
                        </div>
                      </div>
                    </div>
                    
                    {/* Score and Details */}
                    <div className="text-right">
                      <div className="font-bold">{team.points.toLocaleString()} pts</div>
                      {team.winStreak > 0 && (
                        <div className="flex gap-1 mt-1 justify-end">
                          <div className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center">
                            <Flame className="h-3 w-3 mr-1" />
                            {team.winStreak} week streak
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                // Individual or Intra-Team Leaderboards
                getActiveLeaderboard().map((user, index) => (
                  <div 
                    key={typeof user.id === 'string' ? user.id : index}
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
                            `${user.role} • ${user.team}`}
                        </div>
                      </div>
                    </div>
                    
                    {/* Score and Details */}
                    <div className="text-right">
                      <div className="font-bold">{user.points.toLocaleString()} pts</div>
                      {showDetails && !leaderboardFilter.includes('personal') && (
                        <div className="flex gap-2 mt-1 justify-end">
                          <div className="text-xs px-1.5 py-0.5 rounded bg-secondary/30">
                            A: {user.details.assessmentScore}%
                          </div>
                          <div className="text-xs px-1.5 py-0.5 rounded bg-secondary/30">
                            E: {user.details.engagementScore}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Next Milestone Prompt */}
              {activeLeaderboardType === 'individual' && !leaderboardFilter.includes('personal') && (
                <div className="mt-6 p-4 border rounded-lg bg-primary/5">
                  <h4 className="font-medium flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Your Next Milestone
                  </h4>
                  {getNextMilestone() ? (
                    <p className="text-sm text-muted-foreground mt-1">
                      Earn {getNextMilestone()?.points} more points to overtake {getNextMilestone()?.name} in the rankings!
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      Congratulations! You're at the top of this leaderboard!
                    </p>
                  )}
                  <div className="mt-2">
                    <Progress value={75} className="h-1.5" />
                  </div>
                </div>
              )}
              
              {/* Team Milestone for Inter-Team Leaderboard */}
              {activeLeaderboardType === 'team' && teamLeaderboardScope === 'inter' && currentTeam && (
                <div className="mt-6 p-4 border rounded-lg bg-primary/5">
                  <h4 className="font-medium flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Team Milestone
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your team needs 500 more points to move up in the rankings! Encourage your team members to complete more courses.
                  </p>
                  <div className="mt-2">
                    <Progress value={65} className="h-1.5" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <>
                    <Filter className="h-4 w-4" />
                    <span>Hide Details</span>
                  </>
                ) : (
                  <>
                    <Filter className="h-4 w-4" />
                    <span>Show Details</span>
                  </>
                )}
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
