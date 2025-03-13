
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
import RedeemPointsDialog from '@/components/RedeemPointsDialog';

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
  const [teamLeaderboardScope, setTeamLeaderboardScope] = useState('intra');
  const [leaderboardFilter, setLeaderboardFilter] = useState('all');
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('month');
  const [pointsPeriod, setPointsPeriod] = useState('all-time');
  const [activeTab, setActiveTab] = useState('overview');
  const [filterValueSelect, setFilterValueSelect] = useState('all');
  const [jobFamilyFilter, setJobFamilyFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [showDetails, setShowDetails] = useState(true);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
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
    
    // Apply filter values
    if (filterValueSelect !== 'all' && leaderboardFilter !== 'all' && leaderboardFilter !== 'personal') {
      switch (leaderboardFilter) {
        case 'team':
          filteredUsers = filteredUsers.filter(user => user.team === filterValueSelect);
          break;
        case 'department':
          filteredUsers = filteredUsers.filter(user => user.department === filterValueSelect);
          break;
        case 'location':
          filteredUsers = filteredUsers.filter(user => user.location === filterValueSelect);
          break;
        case 'role':
          filteredUsers = filteredUsers.filter(user => user.role === filterValueSelect);
          break;
        default:
          break;
      }
    }
    // Apply default team filter if no specific filter is selected
    else if (leaderboardFilter === 'team') {
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

  // Get Intra Team Leaderboard (users within the same group)
  const getIntraTeamLeaderboard = () => {
    let filteredUsers = [...allUsers];
    
    if (leaderboardFilter === 'team') {
      filteredUsers = filteredUsers.filter(user => user.team === (filterValueSelect === 'all' ? currentUser?.team : filterValueSelect));
    } else if (leaderboardFilter === 'role') {
      filteredUsers = filteredUsers.filter(user => user.role === (filterValueSelect === 'all' ? currentUser?.role : filterValueSelect));
    } else if (leaderboardFilter === 'department') {
      filteredUsers = filteredUsers.filter(user => user.department === (filterValueSelect === 'all' ? currentUser?.department : filterValueSelect));
    } else if (leaderboardFilter === 'location') {
      filteredUsers = filteredUsers.filter(user => user.location === (filterValueSelect === 'all' ? currentUser?.location : filterValueSelect));
    } else if (leaderboardFilter === 'job-segment') {
      filteredUsers = filteredUsers.filter(user => user.segment === (filterValueSelect === 'all' ? currentUser?.segment : filterValueSelect));
    } else if (leaderboardFilter === 'job-family') {
      filteredUsers = filteredUsers.filter(user => user.jobFamily === (filterValueSelect === 'all' ? currentUser?.jobFamily : filterValueSelect));
    }
    
    return filteredUsers.slice(0, 5);
  };

  // Get Inter Team Leaderboard (competition between teams/groups)
  const getInterTeamLeaderboard = () => {
    // For team filter, return teams
    if (leaderboardFilter === 'team') {
      return allTeams.slice(0, 5);
    }
    
    // For other filters, aggregate users by the filter and show as groups
    const allGroups: any[] = [];
    const groupedUsers: Record<string, any> = {};
    
    // Group users by selected filter
    allUsers.forEach(user => {
      let groupKey = '';
      
      if (leaderboardFilter === 'role') {
        groupKey = user.role || 'Unknown';
      } else if (leaderboardFilter === 'department') {
        groupKey = user.department || 'Unknown';
      } else if (leaderboardFilter === 'location') {
        groupKey = user.location || 'Unknown';
      } else if (leaderboardFilter === 'job-segment') {
        groupKey = user.segment || 'Unknown';
      } else if (leaderboardFilter === 'job-family') {
        groupKey = user.jobFamily || 'Unknown';
      }
      
      if (!groupKey) return;
      
      if (!groupedUsers[groupKey]) {
        groupedUsers[groupKey] = {
          id: `group-${groupKey}`,
          name: groupKey,
          points: 0,
          memberCount: 0,
          position: 0,
          positionChange: Math.floor(Math.random() * 5) - 2,
          isCurrentUserGroup: (
            (leaderboardFilter === 'role' && currentUser?.role === groupKey) ||
            (leaderboardFilter === 'department' && currentUser?.department === groupKey) ||
            (leaderboardFilter === 'location' && currentUser?.location === groupKey) ||
            (leaderboardFilter === 'job-segment' && currentUser?.segment === groupKey) ||
            (leaderboardFilter === 'job-family' && currentUser?.jobFamily === groupKey)
          )
        };
      }
      
      groupedUsers[groupKey].points += user.points;
      groupedUsers[groupKey].memberCount += 1;
    });
    
    // Convert to array and sort by points
    Object.values(groupedUsers).forEach(group => {
      allGroups.push(group);
    });
    
    allGroups.sort((a, b) => b.points - a.points);
    
    // Assign positions
    allGroups.forEach((group, index) => {
      group.position = index + 1;
    });
    
    return allGroups.slice(0, 5);
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
      return getRelativeLeaderboard();
    }
  };

  // Get filter values for selected filter type
  const getFilterValues = () => {
    const uniqueValues = new Set<string>();
    
    if (leaderboardFilter === 'team') {
      allUsers.forEach(user => user.team && uniqueValues.add(user.team));
    } else if (leaderboardFilter === 'department') {
      allUsers.forEach(user => user.department && uniqueValues.add(user.department));
    } else if (leaderboardFilter === 'location') {
      allUsers.forEach(user => user.location && uniqueValues.add(user.location));
    } else if (leaderboardFilter === 'role') {
      allUsers.forEach(user => user.role && uniqueValues.add(user.role));
    } else if (leaderboardFilter === 'job-segment') {
      allUsers.forEach(user => user.segment && uniqueValues.add(user.segment));
    } else if (leaderboardFilter === 'job-family') {
      allUsers.forEach(user => user.jobFamily && uniqueValues.add(user.jobFamily));
    }
    
    return Array.from(uniqueValues);
  };

  // Calculate next milestone for user
  const getNextMilestone = () => {
    if (!currentUser) return null;
    
    const leaderboard = getRelativeLeaderboard();
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
      return teamLeaderboardScope === 'intra' ? 'Intra-Group Leaderboard' : 'Inter-Group Leaderboard';
    } else if (leaderboardFilter === 'personal') {
      return 'Personal Best Progression';
    } else {
      return 'Individual Leaderboard';
    }
  };

  // Get the current leaderboard description
  const getLeaderboardDescription = () => {
    if (activeLeaderboardType === 'team') {
      return teamLeaderboardScope === 'intra' 
        ? `Compare members within your ${leaderboardFilter}` 
        : `Compare different ${leaderboardFilter}s against each other`;
    } else if (leaderboardFilter === 'personal') {
      return 'Track your own progress over time';
    } else if (leaderboardFilter === 'all') {
      return 'See how you rank compared to others near your position';
    } else if (leaderboardFilter === 'team') {
      return 'See how you rank within your team';
    } else if (leaderboardFilter === 'department') {
      return 'See how you rank within your department';
    } else if (leaderboardFilter === 'location') {
      return 'See how you rank within your location';
    } else if (leaderboardFilter === 'role') {
      return 'See how you rank among peers with the same role';
    }
    
    return 'See how you rank in your selected filter group';
  };

  // Handle redeem points click
  const handleRedeemPoints = () => {
    setShowRedeemDialog(true);
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

          {/* Redeem Points Button */}
          <div className="mt-4">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleRedeemPoints}
            >
              <Gift className="h-4 w-4 mr-2" /> Redeem {rewardsData.totalPoints} Points
            </Button>
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
                  Group
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Team Leaderboard Scope */}
            {activeLeaderboardType === 'team' && (
              <Tabs value={teamLeaderboardScope} onValueChange={setTeamLeaderboardScope} className="w-auto">
                <TabsList>
                  <TabsTrigger value="intra" className="text-xs px-2 py-1">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Intra-Group
                  </TabsTrigger>
                  <TabsTrigger value="inter" className="text-xs px-2 py-1">
                    <Building className="h-3 w-3 mr-1" />
                    Inter-Group
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
        {activeLeaderboardType === 'individual' && (
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge 
              variant={leaderboardFilter === 'all' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('all'); setFilterValueSelect('all'); }}
            >
              <Users className="h-3 w-3 mr-1" /> All
            </Badge>
            <Badge 
              variant={leaderboardFilter === 'team' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('team'); setFilterValueSelect('all'); }}
            >
              <Users className="h-3 w-3 mr-1" /> Team
            </Badge>
            <Badge 
              variant={leaderboardFilter === 'department' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('department'); setFilterValueSelect('all'); }}
            >
              <BookOpen className="h-3 w-3 mr-1" /> Department
            </Badge>
            <Badge 
              variant={leaderboardFilter === 'role' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('role'); setFilterValueSelect('all'); }}
            >
              <Briefcase className="h-3 w-3 mr-1" /> Job Role
            </Badge>
            <Badge 
              variant={leaderboardFilter === 'location' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('location'); setFilterValueSelect('all'); }}
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
        
        {/* Group Type Selector for Team Leaderboards */}
        {activeLeaderboardType === 'team' && (
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge 
              variant={leaderboardFilter === 'team' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('team'); setFilterValueSelect('all'); }}
            >
              <Users className="h-3 w-3 mr-1" /> Teams
            </Badge>
            <Badge 
              variant={leaderboardFilter === 'department' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('department'); setFilterValueSelect('all'); }}
            >
              <BookOpen className="h-3 w-3 mr-1" /> Departments
            </Badge>
            <Badge 
              variant={leaderboardFilter === 'job-family' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('job-family'); setFilterValueSelect('all'); }}
            >
              <Briefcase className="h-3 w-3 mr-1" /> Job Families
            </Badge>
            <Badge 
              variant={leaderboardFilter === 'role' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('role'); setFilterValueSelect('all'); }}
            >
              <Target className="h-3 w-3 mr-1" /> Roles
            </Badge>
            <Badge 
              variant={leaderboardFilter === 'location' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('location'); setFilterValueSelect('all'); }}
            >
              <Compass className="h-3 w-3 mr-1" /> Locations
            </Badge>
            <Badge 
              variant={leaderboardFilter === 'job-segment' ? 'default' : 'outline'} 
              className="cursor-pointer"
              onClick={() => { setLeaderboardFilter('job-segment'); setFilterValueSelect('all'); }}
            >
              <Building className="h-3 w-3 mr-1" /> Job Segments
            </Badge>
          </div>
        )}
        
        {/* Filter Value Selector */}
        {((activeLeaderboardType === 'team' || 
           (activeLeaderboardType === 'individual' && leaderboardFilter !== 'all' && leaderboardFilter !== 'personal')) && 
           leaderboardFilter !== '') && (
          <div className="mb-4">
            <Select 
              value={filterValueSelect} 
              onValueChange={setFilterValueSelect}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder={`Select ${leaderboardFilter}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {leaderboardFilter === 'team' ? 'Teams' : 
                                           leaderboardFilter === 'department' ? 'Departments' : 
                                           leaderboardFilter === 'role' ? 'Roles' : 
                                           leaderboardFilter === 'location' ? 'Locations' : 
                                           leaderboardFilter === 'job-segment' ? 'Job Segments' : 
                                           leaderboardFilter === 'job-family' ? 'Job Families' : ''}</SelectItem>
                {getFilterValues().map(value => (
                  <SelectItem key={value} value={value}>{value}</SelectItem>
                ))}
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
                          {team.winStreak > 0 && (
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
                ))
              ) : activeLeaderboardType === 'team' && teamLeaderboardScope === 'intra' ? (
                // Intra-Team Leaderboard (shows individual members within a team/group)
                getIntraTeamLeaderboard().map((user, index) => (
                  <div 
                    key={user.id}
                    className={`p-3 rounded-lg flex items-center gap-3 ${
                      user.id === currentUser?.id ? 'bg-primary/10 border border-primary/20' : 
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
                        {user.id === currentUser?.id && (
                          <div className="absolute -bottom-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            <User className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{user.name}</span>
                          {user.id === currentUser?.id && (
                            <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {leaderboardFilter === 'team' ? user.team : 
                           leaderboardFilter === 'role' ? user.role : 
                           leaderboardFilter === 'department' ? user.department : 
                           leaderboardFilter === 'location' ? user.location : 
                           leaderboardFilter === 'job-family' ? user.jobFamily : 
                           leaderboardFilter === 'job-segment' ? user.segment : ''}
                        </div>
                      </div>
                    </div>
                    
                    {/* User Stats */}
                    {showDetails && (
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
                ))
              ) : leaderboardFilter === 'personal' ? (
                // Personal Best Progression
                getPersonalBestLeaderboard().map((entry, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg flex items-center gap-3 ${
                      index === getPersonalBestLeaderboard().length - 1 ? 'bg-primary/10 border border-primary/20' : 
                      index % 2 === 0 ? 'bg-muted/20' : ''
                    }`}
                  >
                    {/* Position */}
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {entry.position}
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-1 flex items-center gap-3">
                      <div className="relative">
                        <img src={entry.avatar} alt={entry.name} className="h-10 w-10 rounded-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{entry.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {entry.date}
                        </div>
                      </div>
                    </div>
                    
                    {/* Points */}
                    <div className="text-right">
                      <div className="font-medium">{entry.points.toLocaleString()} pts</div>
                      <div className="flex items-center text-xs">
                        {entry.positionChange > 0 ? (
                          <span className="text-green-500 flex items-center">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            {entry.positionChange}
                          </span>
                        ) : entry.positionChange < 0 ? (
                          <span className="text-red-500 flex items-center">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            {Math.abs(entry.positionChange)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Individual Leaderboard (relative)
                getActiveLeaderboard().map((user, index) => (
                  <div 
                    key={user.id}
                    className={`p-3 rounded-lg flex items-center gap-3 ${
                      user.id === currentUser?.id ? 'bg-primary/10 border border-primary/20' : 
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
                        {user.id === currentUser?.id && (
                          <div className="absolute -bottom-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            <User className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{user.name}</span>
                          {user.id === currentUser?.id && (
                            <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground flex flex-wrap gap-1">
                          <span>{user.department}</span>
                          <span>•</span>
                          <span>{user.team}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* User Stats */}
                    {showDetails && (
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
                ))
              )}

              {/* View More Button */}
              <Button variant="outline" className="w-full">
                View Full Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Redeem Points Dialog */}
      {showRedeemDialog && (
        <RedeemPointsDialog 
          open={showRedeemDialog}
          onOpenChange={setShowRedeemDialog}
          availablePoints={rewardsData.totalPoints}
        />
      )}
    </div>
  );
};

export default RewardsTab;
