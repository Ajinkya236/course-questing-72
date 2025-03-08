
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Gift, Zap, Trophy, Target } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface RewardsTabProps {
  teamMemberId?: string;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ teamMemberId }) => {
  const viewingOwnRewards = !teamMemberId;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">
        {teamMemberId ? "Team Member's Rewards" : "My Rewards"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-3xl font-bold">2,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Tier</p>
                <p className="text-xl font-bold">Silver</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>2,535 points to Gold</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-3xl font-bold">#42</p>
                <p className="text-sm text-muted-foreground">Top 15%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-semibold mt-8 mb-4">Progress Towards Gold Tier</h3>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Silver Tier</span>
              <span className="font-medium">Gold Tier</span>
            </div>
            <Progress value={49} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>2,450 points</span>
              <span>5,000 points</span>
            </div>
            <p className="text-center text-sm mt-2">
              You need 2,550 more points to reach Gold Tier
            </p>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-semibold mt-8 mb-4">Recent Rewards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Gift className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Course Completion</p>
                  <p className="text-sm font-medium text-green-600">+100 pts</p>
                </div>
                <p className="text-sm text-muted-foreground">Leadership Fundamentals</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Learning Streak</p>
                  <p className="text-sm font-medium text-green-600">+50 pts</p>
                </div>
                <p className="text-sm text-muted-foreground">7-day streak bonus</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {viewingOwnRewards && (
        <div className="flex justify-center mt-8">
          <Button className="mr-4">Redeem Points</Button>
          <Button variant="outline">View Leaderboard</Button>
        </div>
      )}
    </div>
  );
};

export default RewardsTab;
