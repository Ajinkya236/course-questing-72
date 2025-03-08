
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Gift, ChevronRight, Star, Sparkles, Clock, Zap, HelpCircle, Medal, ArrowUp } from 'lucide-react';
import LeaderboardEnhanced from '@/components/LeaderboardEnhanced';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import MysteryBoxDialog from '@/components/gamification/MysteryBoxDialog';
import SpinTheWheelDialog from '@/components/gamification/SpinTheWheelDialog';

// Mock data for leaderboard users
const mockLeaderboardUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    points: 1850,
    position: 1,
    positionChange: 2,
    department: 'Engineering',
    team: 'Frontend',
    location: 'New York',
    role: 'Developer',
    jobFamily: 'Technology',
    details: {
      assessmentScore: 95,
      engagementScore: 92,
      completionRate: 98
    }
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    points: 1720,
    position: 2,
    positionChange: 1,
    department: 'Engineering',
    team: 'Frontend',
    location: 'New York',
    role: 'Developer',
    jobFamily: 'Technology',
    details: {
      assessmentScore: 90,
      engagementScore: 88,
      completionRate: 95
    }
  },
  {
    id: 'user-3',
    name: 'Robert Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    points: 1680,
    position: 3,
    positionChange: -1,
    department: 'Engineering',
    team: 'Backend',
    location: 'San Francisco',
    role: 'Developer',
    jobFamily: 'Technology',
    details: {
      assessmentScore: 87,
      engagementScore: 84,
      completionRate: 92
    }
  },
  {
    id: 'current-user',
    name: 'You',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    points: 1250,
    position: 4,
    positionChange: 0,
    department: 'Engineering',
    team: 'Frontend',
    location: 'New York',
    role: 'Developer',
    jobFamily: 'Technology',
    details: {
      assessmentScore: 85,
      engagementScore: 80,
      completionRate: 88
    }
  },
  {
    id: 'user-5',
    name: 'Emily Chen',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    points: 1150,
    position: 5,
    positionChange: 3,
    department: 'Engineering',
    team: 'Design',
    location: 'San Francisco',
    role: 'Designer',
    jobFamily: 'Creative',
    details: {
      assessmentScore: 82,
      engagementScore: 79,
      completionRate: 85
    }
  },
  {
    id: 'user-6',
    name: 'Michael Wang',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    points: 1050,
    position: 6,
    positionChange: -2,
    department: 'Marketing',
    team: 'Content',
    location: 'London',
    role: 'Manager',
    jobFamily: 'Business',
    details: {
      assessmentScore: 80,
      engagementScore: 76,
      completionRate: 82
    }
  }
];

// Current user is the one with ID 'current-user'
const currentUser = mockLeaderboardUsers.find(user => user.id === 'current-user');

interface RewardsTabProps {
  teamMemberId?: string;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ teamMemberId }) => {
  const [leaderboardFilter, setLeaderboardFilter] = useState("all");
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState("all-time");
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const { toast } = useToast();

  // Mock data - in a real app, we'd fetch based on teamMemberId if provided
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
    recentRewards: [
      { id: 1, name: 'Course Completion Bonus', points: 100, date: '2023-11-15' },
      { id: 2, name: 'Perfect Quiz Score', points: 50, date: '2023-11-10' },
      { id: 3, name: 'Learning Streak - 30 Days', points: 200, date: '2023-10-30' },
      { id: 4, name: 'Returning Learner Bonus', points: 75, date: '2023-10-25', badge: 'Welcome Back' },
      { id: 5, name: 'Mystery Bonus', points: 120, date: '2023-10-12', badge: 'Lucky Find' },
    ],
    redemptionOptions: [
      { id: 1, name: 'Amazon Gift Card', points: 2000, image: '📱' },
      { id: 2, name: 'Extra Day Off', points: 5000, image: '🏖️' },
      { id: 3, name: 'Coffee Voucher', points: 1000, image: '☕' },
      { id: 4, name: 'Virtual Lunch with CEO', points: 3000, image: '🍽️' },
      { id: 5, name: 'Premium Learning Path Access', points: 1500, image: '🎓' },
      { id: 6, name: 'Professional Development Book', points: 800, image: '📚' },
    ],
    onboardingTasks: [
      { id: 1, name: 'Complete your profile', points: 50, completed: true },
      { id: 2, name: 'Join your first course', points: 50, completed: true },
      { id: 3, name: 'Complete first lesson', points: 100, completed: true },
      { id: 4, name: 'Take first quiz', points: 100, completed: false },
      { id: 5, name: 'Set learning goals', points: 150, completed: false },
    ]
  };

  // Calculate progress percentage towards next reward
  const progressPercentage = (rewardsData.totalPoints / rewardsData.nextRewardThreshold) * 100;

  const handleClaimMysteryPoints = () => {
    setShowMysteryBox(true);
  };

  const handleSpinWheel = () => {
    setShowSpinWheel(true);
  };

  return (
    <div className="space-y-8">
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

          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Points Breakdown</h4>
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
          </div>

          <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between gap-2">
            <Button variant="outline" onClick={handleClaimMysteryPoints} className="flex gap-2 items-center">
              <HelpCircle className="h-4 w-4" />
              Claim Mystery Points
            </Button>
            <Button variant="outline" onClick={handleSpinWheel} className="flex gap-2 items-center">
              <Medal className="h-4 w-4" />
              Spin for Bonus Points
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Tasks for Points */}
      {!teamMemberId && (
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Onboarding Tasks</h3>
            <p className="text-sm text-muted-foreground mb-4">Complete these tasks to earn points and unlock rewards</p>
            
            <div className="space-y-3">
              {rewardsData.onboardingTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full ${task.completed ? 'bg-primary/20' : 'bg-muted'} flex items-center justify-center mr-3`}>
                      {task.completed ? (
                        <Star className="h-4 w-4 text-primary" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h4 className={`font-medium ${task.completed ? '' : 'text-muted-foreground'}`}>{task.name}</h4>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant={task.completed ? 'default' : 'outline'} className="mr-2">
                      +{task.points} Points
                    </Badge>
                    {task.completed ? (
                      <Badge variant="secondary">Completed</Badge>
                    ) : (
                      <Button variant="outline" size="sm">Start</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard Section */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h3 className="text-xl font-medium">Learning Leaderboard</h3>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <Select value={leaderboardTimeframe} onValueChange={setLeaderboardTimeframe}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="quarterly">This Quarter</SelectItem>
              </SelectContent>
            </Select>

            <Select value={leaderboardFilter} onValueChange={setLeaderboardFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="team">My Team</SelectItem>
                <SelectItem value="department">My Department</SelectItem>
                <SelectItem value="location">My Location</SelectItem>
                <SelectItem value="role">My Role</SelectItem>
                <SelectItem value="jobFamily">Job Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <ArrowUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Next Milestone: Team Front-runner</h3>
                <p className="text-sm text-muted-foreground">Complete 2 more courses to surpass Jane Smith and become #2 in your team!</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Your personal best: 1380 points (achieved on October 15)</span>
              </div>
              <Button variant="outline" size="sm">View Progression</Button>
            </div>
          </CardContent>
        </Card>

        <LeaderboardEnhanced
          users={mockLeaderboardUsers}
          currentUser={currentUser}
          title="Learning Leaderboard"
        />
      </div>

      {/* Redeem Rewards */}
      <div>
        <h3 className="text-xl font-medium mb-4">Redeem Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewardsData.redemptionOptions.map(option => (
            <Card key={option.id} className="relative overflow-hidden">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-2">{option.image}</div>
                <h4 className="font-medium">{option.name}</h4>
                <Badge className="mt-2 mb-4" variant="secondary">{option.points} Points</Badge>
                <Button 
                  disabled={rewardsData.totalPoints < option.points}
                  size="sm" 
                  className="w-full"
                >
                  Redeem
                </Button>
                {rewardsData.totalPoints < option.points && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Need {option.points - rewardsData.totalPoints} more points
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Rewards */}
      <div>
        <h3 className="text-xl font-medium mb-4">Recent Rewards</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {rewardsData.recentRewards.map(reward => (
                <div key={reward.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{reward.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(reward.date).toLocaleDateString()}
                      </p>
                    </div>
                    {reward.badge && (
                      <Badge variant="outline" className="ml-2">
                        {reward.badge}
                      </Badge>
                    )}
                  </div>
                  <Badge>+{reward.points} Points</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call-to-Action */}
      {!teamMemberId && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Want to earn more points?</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete courses, assessments, and maintain your learning streak
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
                <span>Explore Courses</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <MysteryBoxDialog open={showMysteryBox} onOpenChange={setShowMysteryBox} />
      <SpinTheWheelDialog open={showSpinWheel} onOpenChange={setShowSpinWheel} />
    </div>
  );
};

export default RewardsTab;
