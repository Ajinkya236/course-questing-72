
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Gift, ChevronRight, Star } from 'lucide-react';

interface RewardsTabProps {
  teamMemberId?: string;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ teamMemberId }) => {
  // Mock data - in a real app, we'd fetch based on teamMemberId if provided
  const rewardsData = {
    totalPoints: 1250,
    pointsToNextReward: 750,
    nextRewardThreshold: 2000,
    recentRewards: [
      { id: 1, name: 'Course Completion Bonus', points: 100, date: '2023-11-15' },
      { id: 2, name: 'Perfect Quiz Score', points: 50, date: '2023-11-10' },
      { id: 3, name: 'Learning Streak - 30 Days', points: 200, date: '2023-10-30' },
    ],
    redemptionOptions: [
      { id: 1, name: 'Amazon Gift Card', points: 2000, image: '📱' },
      { id: 2, name: 'Extra Day Off', points: 5000, image: '🏖️' },
      { id: 3, name: 'Coffee Voucher', points: 1000, image: '☕' },
      { id: 4, name: 'Virtual Lunch with CEO', points: 3000, image: '🍽️' },
    ]
  };

  // Calculate progress percentage towards next reward
  const progressPercentage = (rewardsData.totalPoints / rewardsData.nextRewardThreshold) * 100;

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
            <div className="mt-2 md:mt-0">
              <span className="text-2xl font-bold">{rewardsData.totalPoints} Points</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Next Reward</span>
              <span>{rewardsData.totalPoints} / {rewardsData.nextRewardThreshold}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Earn {rewardsData.pointsToNextReward} more points to unlock your next reward
            </p>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default RewardsTab;
