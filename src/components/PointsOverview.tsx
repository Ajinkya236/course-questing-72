
import React from 'react';
import { Award, TrendingUp, Clock, BookOpen, Target, Gift, ChevronRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export interface PointsData {
  totalPoints: number;
  coursesCompleted: number;
  hoursSpent: number;
  pointsThisWeek: number;
  pointsLastWeek: number;
  pointsBreakdown: {
    category: string;
    points: number;
    color: string;
  }[];
  streakDays: number;
  nextMilestone?: {
    name: string;
    points: number;
    image?: string;
  };
  redeemablePoints: number;
}

interface PointsOverviewProps {
  data: PointsData;
}

const PointsOverview: React.FC<PointsOverviewProps> = ({ data }) => {
  const percentChange = ((data.pointsThisWeek - data.pointsLastWeek) / data.pointsLastWeek) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Stats Card */}
      <div className="md:col-span-2 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <div className="flex items-center">
              <Award className="h-6 w-6 mr-2 text-primary" />
              <h3 className="text-lg font-semibold">Your Learning Points</h3>
            </div>
            
            <div className="mt-2 md:mt-0 flex items-center bg-secondary/50 px-3 py-1 rounded-full text-sm">
              <TrendingUp className={`h-4 w-4 mr-1 ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={percentChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}%
              </span>
              <span className="text-muted-foreground ml-1">from last week</span>
            </div>
          </div>
          
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <h4 className="text-2xl font-bold">{data.totalPoints.toLocaleString()}</h4>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-500/10 p-2 mr-3">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                  <h4 className="text-2xl font-bold">{data.coursesCompleted}</h4>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-500/10 p-2 mr-3">
                  <Clock className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours Spent</p>
                  <h4 className="text-2xl font-bold">{data.hoursSpent}</h4>
                </div>
              </div>
            </div>
          </div>
          
          {/* Points Breakdown */}
          <div>
            <h4 className="text-sm font-medium mb-3">Points Breakdown</h4>
            <div className="space-y-3">
              {data.pointsBreakdown.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.category}</span>
                    <span>{item.points} pts</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-2 rounded-full`}
                      style={{ 
                        width: `${(item.points / data.totalPoints) * 100}%`,
                        backgroundColor: item.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary Stats Cards */}
      <div className="flex flex-col gap-6">
        {/* Streak Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Learning Streak</h4>
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                {data.streakDays} Days
              </Badge>
            </div>
            
            <div className="flex items-center justify-center py-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-secondary"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - data.streakDays / 30)}
                    className="text-amber-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <Flame className="h-8 w-8 text-amber-500" />
                </div>
              </div>
            </div>
            
            <p className="text-sm text-center text-muted-foreground">
              Keep learning daily to maintain your streak!
            </p>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Target className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </div>
        
        {/* Redeemable Points Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Gift className="h-5 w-5 mr-2 text-green-500" />
              <h4 className="font-medium">Redeemable Points</h4>
            </div>
            
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <h3 className="text-3xl font-bold">{data.redeemablePoints.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground mt-1">Available to redeem</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button className="w-full">
                Redeem Points
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsOverview;
