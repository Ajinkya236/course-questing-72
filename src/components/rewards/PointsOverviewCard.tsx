
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Zap } from 'lucide-react';
import { RewardsData } from './types';

interface PointsOverviewCardProps {
  rewardsData: RewardsData;
  onRedeemClick: () => void;
}

const PointsOverviewCard: React.FC<PointsOverviewCardProps> = ({ 
  rewardsData, 
  onRedeemClick 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pointsPeriod, setPointsPeriod] = useState('all-time');
  
  // Calculate progress percentage
  const progressPercentage = (rewardsData.totalPoints / rewardsData.nextRewardThreshold) * 100;

  return (
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
            onClick={onRedeemClick}
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
                <span className="font-medium">{rewardsData.streak.current} days</span>
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
  );
};

export default PointsOverviewCard;
