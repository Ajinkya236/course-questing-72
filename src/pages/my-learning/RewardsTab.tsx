
import React, { useState } from 'react';
import PointsOverview from '@/components/PointsOverview';
import LeaderboardCard from '@/components/LeaderboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Gift, Star, Target, TrendingUp } from 'lucide-react';

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
    id: '6',
    name: 'Alex Thompson',
    avatar: 'https://i.pravatar.cc/150?img=6',
    points: 13120,
    position: 6,
  },
  {
    id: '7',
    name: 'Maya Henderson',
    avatar: 'https://i.pravatar.cc/150?img=7',
    points: 12740,
    position: 7,
  },
  {
    id: '9',
    name: 'Sophia Wilson',
    avatar: 'https://i.pravatar.cc/150?img=9',
    points: 12050,
    position: 9,
  },
  {
    id: '10',
    name: 'Daniel Smith',
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
  const [currentLeaderboardType, setCurrentLeaderboardType] = useState('individual');
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
  
  return (
    <div className="space-y-8">
      <PointsOverview data={pointsData} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="individual">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="individual" onClick={() => setCurrentLeaderboardType('individual')}>
                Individual
              </TabsTrigger>
              <TabsTrigger value="team" onClick={() => setCurrentLeaderboardType('team')}>
                Team
              </TabsTrigger>
              <TabsTrigger value="department" onClick={() => setCurrentLeaderboardType('department')}>
                Department
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="individual">
              <LeaderboardCard 
                users={leaderboardUsers}
                currentUser={currentUser}
                title="Individual Leaderboard"
              />
            </TabsContent>
            
            <TabsContent value="team">
              <Card className="p-6">
                <CardTitle className="mb-4 text-xl">Team Leaderboard</CardTitle>
                <p className="text-muted-foreground">Team leaderboards will be available soon!</p>
              </Card>
            </TabsContent>
            
            <TabsContent value="department">
              <Card className="p-6">
                <CardTitle className="mb-4 text-xl">Department Leaderboard</CardTitle>
                <p className="text-muted-foreground">Department leaderboards will be available soon!</p>
              </Card>
            </TabsContent>
          </Tabs>
          
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
                <Link to="/milestones">
                  <Button className="w-full mt-4" variant="outline">View All Milestones</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Mystery Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mysteryRewards.map((reward) => (
                  <div key={reward.id} className="bg-secondary/20 rounded-lg p-4 hover-scale">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500" />
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
