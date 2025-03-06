import React, { useState } from 'react';
import PointsOverview from '@/components/PointsOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Gift, Star, Sparkle, Box, Shuffle, Target, TrendingUp, Trophy, Award, Medal, User, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

// Mock data for points overview
const pointsData = {
  totalPoints: 12465,
  coursesCompleted: 28,
  hoursSpent: 142,
  pointsThisWeek: 450,
  pointsLastWeek: 380,
  pointsBreakdown: [
    {
      category: 'Course Completion',
      points: 6500,
      color: '#3b82f6', // blue-500
    },
    {
      category: 'Quizzes & Assessments',
      points: 2800,
      color: '#8b5cf6', // violet-500
    },
    {
      category: 'Engagement & Activities',
      points: 1850,
      color: '#10b981', // emerald-500
    },
    {
      category: 'Daily Logins',
      points: 915,
      color: '#f97316', // orange-500
    },
    {
      category: 'Bonus Points',
      points: 400,
      color: '#ef4444', // red-500
    },
  ],
  streakDays: 18,
  nextMilestone: {
    name: 'Gold Achiever',
    points: 15000,
  },
  redeemablePoints: 8000,
};

// Mock data for leaderboard
const leaderboardUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    points: 18750,
    position: 1,
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    points: 16320,
    position: 2,
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=3',
    points: 15480,
    position: 3,
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://i.pravatar.cc/150?img=4',
    points: 13950,
    position: 4,
  },
  {
    id: '5',
    name: 'Jessica Liu',
    avatar: 'https://i.pravatar.cc/150?img=5',
    points: 13240,
    position: 5,
  },
  {
    id: '6',
    name: 'Robert Taylor',
    avatar: 'https://i.pravatar.cc/150?img=6',
    points: 12980,
    position: 6,
  },
  {
    id: '7',
    name: 'Lisa Wang',
    avatar: 'https://i.pravatar.cc/150?img=7',
    points: 12790,
    position: 7,
  },
  {
    id: '8',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=22',
    points: 12465,
    position: 8,
  },
  {
    id: '9',
    name: 'Mark Wilson',
    avatar: 'https://i.pravatar.cc/150?img=9',
    points: 12100,
    position: 9,
  },
  {
    id: '10',
    name: 'Amy Martinez',
    avatar: 'https://i.pravatar.cc/150?img=10',
    points: 11890,
    position: 10,
  },
];

// Current user data for leaderboard
const currentUser = {
  id: '8',
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=22',
  points: 12465,
  position: 8,
};

// Redeemable rewards data
const redeemableRewards = [
  {
    id: '1',
    title: 'Amazon Gift Card',
    points: 5000,
    imageUrl: 'https://placehold.co/200x100/e5f7ff/0369a1?text=Amazon',
    category: 'Gift Card',
  },
  {
    id: '2',
    title: 'Premium Course Access',
    points: 3000,
    imageUrl: 'https://placehold.co/200x100/fdf2f8/be185d?text=Course',
    category: 'Learning',
  },
  {
    id: '3',
    title: 'Company Branded Mug',
    points: 1500,
    imageUrl: 'https://placehold.co/200x100/f0fdf4/166534?text=Mug',
    category: 'Merchandise',
  },
  {
    id: '4',
    title: 'Lunch with CEO',
    points: 10000,
    imageUrl: 'https://placehold.co/200x100/fef3c7/92400e?text=Lunch',
    category: 'Experience',
  },
];

// Mystery rewards data
const mysteryRewards = [
  {
    id: 'mystery1',
    title: 'Mystery Box',
    description: 'Unlock a random reward. Could be points, badges, or exclusive content!',
    points: 2000,
    chance: '80% for small rewards, 20% for premium rewards',
  },
  {
    id: 'mystery2',
    title: 'Spin the Wheel',
    description: 'Spin the wheel to win various rewards - from point multipliers to special badges.',
    points: 1000,
    chance: 'Equal chances for all prizes on the wheel',
  },
  {
    id: 'mystery3',
    title: 'Limited Time Offer',
    description: 'Available only this week! Double points for all completed courses.',
    points: 0,
    chance: '100% chance of activation',
  },
];

const RewardsTab = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('all-time');
  const [mysteryBoxOpen, setMysteryBoxOpen] = useState(false);
  
  const handleRedeemReward = (rewardTitle: string, points: number) => {
    toast({
      title: "Reward Redeemed!",
      description: `You've successfully redeemed ${rewardTitle} for ${points} points.`,
    });
  };
  
  const handleOpenMysteryBox = (mysteryTitle: string) => {
    setMysteryBoxOpen(true);
    
    // Simulate random reward after 1 second
    setTimeout(() => {
      const rewards = [
        "You earned 500 bonus points!",
        "You unlocked a special badge!",
        "You got a 2x point multiplier for your next course!",
        "You earned early access to a premium course!"
      ];
      
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      
      toast({
        title: `${mysteryTitle} Opened!`,
        description: randomReward,
      });
      
      setMysteryBoxOpen(false);
    }, 1000);
  };

  // Get relative rankings - 2 above and 2 below current user
  const getRelativeRankings = () => {
    const currentUserIndex = leaderboardUsers.findIndex(user => user.id === currentUser.id);
    if (currentUserIndex === -1) return [];

    // Always include #1 ranked user if current user is not in the top 3
    let usersToShow = [];
    if (currentUserIndex > 2) {
      usersToShow.push(leaderboardUsers[0]);
    }

    // Get 2 users above current user
    const aboveStartIndex = Math.max(0, currentUserIndex - 2);
    for (let i = aboveStartIndex; i < currentUserIndex; i++) {
      usersToShow.push(leaderboardUsers[i]);
    }

    // Add current user
    usersToShow.push(currentUser);

    // Get 2 users below current user
    const belowEndIndex = Math.min(leaderboardUsers.length, currentUserIndex + 3);
    for (let i = currentUserIndex + 1; i < belowEndIndex; i++) {
      usersToShow.push(leaderboardUsers[i]);
    }

    return usersToShow;
  };

  const relativeRankings = getRelativeRankings();
  
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
  
  return (
    <div className="space-y-8">
      <PointsOverview data={pointsData} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Trophy className="h-5 w-5 text-primary" />
                <span>Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="individual" className="mb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="individual">
                    <User className="h-4 w-4 mr-1.5" />
                    <span>Individual</span>
                  </TabsTrigger>
                  <TabsTrigger value="personal">
                    <UserCircle className="h-4 w-4 mr-1.5" />
                    <span>My Ranking</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4 mt-4">
                {relativeRankings.map((user) => (
                  <div
                    key={user.id}
                    className={`flex flex-col rounded-lg ${
                      user.id === currentUser.id ? "bg-primary/10" : "bg-secondary/10"
                    }`}
                  >
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8">
                          {getPositionIcon(user.position)}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium">{user.name}</span>
                          {user.id === currentUser.id && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 ml-2 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="font-bold bg-primary/20 text-primary px-3 py-1 rounded-full">
                          {user.points.toLocaleString()} pts
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Next Milestone */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Next Milestone</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    You need <span className="font-semibold text-primary">2,535 more points</span> to reach Gold Achiever status
                  </p>
                  <Progress value={83} className="h-2" />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground">Current: {currentUser.points.toLocaleString()}</span>
                    <span className="text-muted-foreground">Target: 15,000</span>
                  </div>
                  <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href = '/milestones'}>
                    <Target className="h-4 w-4 mr-2" />
                    View All Milestones
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Next Milestone</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Gold Achiever</h4>
                    <p className="text-sm text-muted-foreground">You need 2,535 more points to reach this milestone</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href = '/milestones'}>
                  View All Milestones
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Box className="h-5 w-5 text-primary" />
                Mystery Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mysteryRewards.map((reward) => (
                  <div key={reward.id} className="bg-secondary/20 rounded-lg p-4 hover-scale">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm flex items-center gap-1">
                        <Sparkle className="h-4 w-4 text-amber-500" />
                        {reward.title}
                      </h4>
                      <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {reward.points > 0 ? `${reward.points} pts` : 'Free'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{reward.description}</p>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleOpenMysteryBox(reward.title)}
                    >
                      <Shuffle className="h-4 w-4 mr-1" />
                      {mysteryBoxOpen ? 'Opening...' : 'Try Your Luck'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Redeem Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {redeemableRewards.map((reward) => (
                  <div key={reward.id} className="bg-secondary/20 rounded-lg p-4 hover-scale">
                    <div className="flex justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{reward.title}</h4>
                        <span className="text-xs text-muted-foreground">{reward.category}</span>
                      </div>
                      <img 
                        src={reward.imageUrl} 
                        alt={reward.title} 
                        className="w-12 h-12 object-cover rounded"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{reward.points} pts</span>
                      <Button 
                        size="sm" 
                        disabled={pointsData.redeemablePoints < reward.points}
                        onClick={() => handleRedeemReward(reward.title, reward.points)}
                      >
                        Redeem
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RewardsTab;
