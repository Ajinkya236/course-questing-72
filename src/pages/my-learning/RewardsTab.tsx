
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Gift, ChevronRight, Star, Sparkles, Clock, Zap, HelpCircle, Medal, ArrowUp, ExternalLink } from 'lucide-react';
import LeaderboardEnhanced from '@/components/LeaderboardEnhanced';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import MysteryBoxDialog from '@/components/gamification/MysteryBoxDialog';
import SpinTheWheelDialog from '@/components/gamification/SpinTheWheelDialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Mock data for leaderboard users
// Generate 50 users but we'll only display relative to the current user
const generateMockLeaderboardUsers = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    avatar: `https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${(i % 70) + 1}.jpg`,
    points: Math.floor(10000 - i * (100 + Math.random() * 50)),
    position: i + 1,
    positionChange: i % 5 === 0 ? 2 : i % 7 === 0 ? -1 : 0,
    department: ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations'][i % 6],
    team: ['Frontend', 'Backend', 'DevOps', 'Design', 'Content', 'Support'][i % 6],
    location: ['New York', 'San Francisco', 'London', 'Tokyo', 'Singapore', 'Berlin'][i % 6],
    role: ['Developer', 'Manager', 'Director', 'VP', 'C-Level', 'Analyst'][i % 6],
    jobFamily: ['Technology', 'Business', 'Creative', 'Support', 'Leadership'][i % 5],
    details: {
      assessmentScore: Math.floor(70 + Math.random() * 30),
      engagementScore: Math.floor(60 + Math.random() * 40),
      completionRate: Math.floor(75 + Math.random() * 25)
    }
  }));
};

const mockLeaderboardUsers = generateMockLeaderboardUsers();

// Current user has position 15
const currentUserPosition = 15;
const currentUser = mockLeaderboardUsers.find(user => user.position === currentUserPosition);

// Get a relative view - 5 users above and 5 users below
const getRelativeLeaderboard = () => {
  const startIndex = Math.max(0, currentUserPosition - 6); // -6 to include 5 users above
  const endIndex = Math.min(mockLeaderboardUsers.length - 1, currentUserPosition + 4); // +4 to include 5 users below
  
  // Get top 3 users to always show them
  const topUsers = mockLeaderboardUsers.slice(0, 3);
  
  // Get users relative to current user (excluding top 3 if they overlap)
  const relativeUsers = mockLeaderboardUsers
    .slice(startIndex, endIndex + 1)
    .filter(user => !topUsers.some(topUser => topUser.id === user.id));
  
  // Return combined array with top 3 followed by relative users
  return [...topUsers, ...relativeUsers];
};

interface RewardsTabProps {
  teamMemberId?: string;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ teamMemberId }) => {
  const [leaderboardFilter, setLeaderboardFilter] = useState("all");
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState("all-time");
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [activePointsTab, setActivePointsTab] = useState("overview");
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [redeemStep, setRedeemStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

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
    courseWisePoints: [
      { id: 1, courseName: 'Introduction to Leadership', totalPoints: 350, breakdown: { completion: 150, quizzes: 80, assignments: 70, participation: 50 } },
      { id: 2, courseName: 'Advanced Data Analysis', totalPoints: 280, breakdown: { completion: 120, quizzes: 90, assignments: 50, participation: 20 } },
      { id: 3, courseName: 'Effective Communication Strategies', totalPoints: 210, breakdown: { completion: 100, quizzes: 60, assignments: 30, participation: 20 } },
      { id: 4, courseName: 'Project Management Essentials', totalPoints: 180, breakdown: { completion: 80, quizzes: 50, assignments: 40, participation: 10 } },
    ],
    redemptionOptions: [
      { id: 1, name: 'Amazon Gift Card', points: 2000, image: '📱', description: 'A $20 Amazon gift card to spend on anything you want.' },
      { id: 2, name: 'Extra Day Off', points: 5000, image: '🏖️', description: 'Take an extra day off work, subject to manager approval.' },
      { id: 3, name: 'Coffee Voucher', points: 1000, image: '☕', description: 'A $10 voucher for the office café or local coffee shop.' },
      { id: 4, name: 'Virtual Lunch with CEO', points: 3000, image: '🍽️', description: 'Schedule a virtual lunch meeting with the company CEO.' },
      { id: 5, name: 'Premium Learning Path Access', points: 1500, image: '🎓', description: 'Unlock premium learning content for 3 months.' },
      { id: 6, name: 'Professional Development Book', points: 800, image: '📚', description: 'Choose from a selection of professional development books.' },
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

  const handleViewFullLeaderboard = () => {
    navigate('/leaderboard');
  };

  const handleRedeemReward = (reward: any) => {
    setSelectedReward(reward);
    setRedeemStep(1);
    setShowRedeemDialog(true);
  };

  const confirmRedemption = () => {
    setRedeemStep(2);
    
    // Simulate API call delay
    setTimeout(() => {
      setRedeemStep(3);
    }, 1500);
  };

  const finishRedemption = () => {
    setShowRedeemDialog(false);
    
    // Reset for next time
    setTimeout(() => {
      setRedeemStep(1);
      setSelectedReward(null);
    }, 500);
    
    toast({
      title: "Reward Redeemed Successfully!",
      description: `You have successfully redeemed ${selectedReward.name}.`,
    });
  };

  // Get filtered leaderboard based on user preferences
  const getFilteredLeaderboard = () => {
    let filteredUsers = getRelativeLeaderboard();
    
    if (leaderboardFilter !== "all") {
      const filterProperty = leaderboardFilter;
      const currentUserValue = currentUser?.[filterProperty as keyof typeof currentUser];
      
      filteredUsers = filteredUsers.filter(user => {
        return user[filterProperty as keyof typeof user] === currentUserValue;
      });
    }
    
    return filteredUsers;
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

          <Tabs value={activePointsTab} onValueChange={setActivePointsTab} className="mt-4 pt-4 border-t">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="overview">Points Overview</TabsTrigger>
              <TabsTrigger value="courses">Course Breakdown</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
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

          <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between gap-2">
            <Button variant="outline" onClick={handleClaimMysteryPoints} className="flex gap-2 items-center">
              <HelpCircle className="h-4 w-4" />
              Open Mystery Box
            </Button>
            <Button variant="outline" onClick={handleSpinWheel} className="flex gap-2 items-center">
              <Medal className="h-4 w-4" />
              Spin the Wheel
            </Button>
          </div>
        </CardContent>
      </Card>

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
              <Button variant="outline" size="sm" onClick={handleViewFullLeaderboard} className="flex items-center gap-1">
                View Full Leaderboard
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <LeaderboardEnhanced
          users={getFilteredLeaderboard()}
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
                  onClick={() => handleRedeemReward(option)}
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
      
      {/* Redeem Dialog */}
      {selectedReward && (
        <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Redeem Reward</DialogTitle>
              <DialogDescription>
                {redeemStep === 1 && `You are about to redeem ${selectedReward.name} for ${selectedReward.points} points.`}
                {redeemStep === 2 && 'Processing your redemption...'}
                {redeemStep === 3 && 'Redemption completed successfully!'}
              </DialogDescription>
            </DialogHeader>
            
            {redeemStep === 1 && (
              <div className="space-y-4 my-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 flex items-center justify-center text-4xl">
                    {selectedReward.image}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{selectedReward.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedReward.description}</p>
                  </div>
                </div>
                
                <div className="bg-secondary/20 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Your current points:</span>
                    <span className="font-medium">{rewardsData.totalPoints} pts</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Reward cost:</span>
                    <span className="font-medium text-amber-500">-{selectedReward.points} pts</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Remaining points:</span>
                    <span>{rewardsData.totalPoints - selectedReward.points} pts</span>
                  </div>
                </div>
                
                <DialogFooter className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowRedeemDialog(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={confirmRedemption}
                    className="flex-1"
                  >
                    Confirm Redemption
                  </Button>
                </DialogFooter>
              </div>
            )}
            
            {redeemStep === 2 && (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="animate-spin h-12 w-12 border-4 border-primary/20 rounded-full border-t-primary mb-4"></div>
                <p>Processing your redemption...</p>
              </div>
            )}
            
            {redeemStep === 3 && (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Redemption Successful!</h3>
                <p className="text-center text-muted-foreground mb-4">
                  You have successfully redeemed {selectedReward.name}. Your points have been deducted.
                </p>
                {selectedReward.id === 1 && (
                  <div className="bg-secondary/20 p-4 rounded-md w-full mb-4">
                    <h4 className="font-medium mb-2">Gift Card Code:</h4>
                    <div className="bg-background p-3 rounded font-mono text-center">
                      AMZN-GIFT-12345-ABCDE
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Use this code on amazon.com to redeem your gift card.
                    </p>
                  </div>
                )}
                <Button onClick={finishRedemption} className="w-full">
                  Done
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RewardsTab;
