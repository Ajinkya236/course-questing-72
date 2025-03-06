
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from '@/components/ui/calendar';
import { Flame, Award, Calendar as CalendarIcon, Trophy, Gift, Clock, LucideIcon } from "lucide-react";

interface LearningStreakDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sample streak data
const streakData = {
  currentStreak: 18,
  longestStreak: 32,
  totalDaysLearned: 142,
  streakRewards: [
    { days: 7, name: "7-Day Streak", description: "Complete a 7-day streak", received: true, reward: "100 points" },
    { days: 14, name: "2-Week Warrior", description: "Complete a 14-day streak", received: true, reward: "250 points + Badge" },
    { days: 21, name: "3-Week Dedication", description: "Complete a 21-day streak", received: false, reward: "500 points + Badge" },
    { days: 30, name: "Monthly Mastery", description: "Complete a 30-day streak", received: false, reward: "1000 points + Badge + 2x Multiplier" },
  ],
  recentActivity: [
    { date: new Date(2023, 9, 26), minutes: 35, completed: ["Introduction to AI"] },
    { date: new Date(2023, 9, 25), minutes: 25, completed: ["Project Management Basics"] },
    { date: new Date(2023, 9, 24), minutes: 45, completed: ["Leadership in Crisis"] },
    { date: new Date(2023, 9, 23), minutes: 20, completed: [] },
    { date: new Date(2023, 9, 22), minutes: 60, completed: ["Digital Marketing", "SEO Fundamentals"] },
    { date: new Date(2023, 9, 21), minutes: 30, completed: ["Emotional Intelligence"] },
    { date: new Date(2023, 9, 20), minutes: 15, completed: [] },
  ],
};

// Get last 3 months of dates for the calendar
const today = new Date();
const last3Months = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(today.getDate() - i);
  return date;
});

// Randomly generate learning days for demonstration
const learningDays = last3Months.filter(() => Math.random() > 0.3).map(date => date.toDateString());

const LearningStreakDialog: React.FC<LearningStreakDialogProps> = ({ open, onOpenChange }) => {  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            Learning Streak
          </DialogTitle>
          <DialogDescription className="text-center">
            Track your consistent learning habits and earn rewards
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Streak Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Flame} value={streakData.currentStreak} label="Current Streak" color="text-orange-500" />
            <StatCard icon={Trophy} value={streakData.longestStreak} label="Longest Streak" color="text-primary" />
            <StatCard icon={CalendarIcon} value={streakData.totalDaysLearned} label="Total Days" color="text-green-500" />
          </div>
          
          {/* Streak Calendar */}
          <div className="bg-secondary/20 rounded-lg p-4">
            <h3 className="font-medium mb-2 text-center">Your Learning Calendar</h3>
            <Calendar
              mode="multiple"
              selected={learningDays.map(day => new Date(day))}
              className="rounded-md border"
              disabled={(date) => date > new Date()}
            />
          </div>
          
          {/* Streak Rewards */}
          <div>
            <h3 className="font-medium mb-2">Streak Rewards</h3>
            <div className="space-y-3">
              {streakData.streakRewards.map((reward) => (
                <div 
                  key={reward.days} 
                  className={`p-3 rounded-lg border ${reward.received ? 'bg-primary/10 border-primary/20' : 'bg-secondary/20 border-secondary/20'}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{reward.name}</div>
                      <div className="text-sm text-muted-foreground">{reward.description}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm font-medium mr-2">{reward.reward}</div>
                      {reward.received ? (
                        <Award className="h-5 w-5 text-primary" />
                      ) : (
                        <Gift className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{Math.min(streakData.currentStreak, reward.days)} / {reward.days} days</span>
                    </div>
                    <Progress 
                      value={Math.min(100, (streakData.currentStreak / reward.days) * 100)} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h3 className="font-medium mb-2">Recent Activity</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {streakData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start p-2 rounded-lg hover:bg-secondary/10">
                  <div className="bg-secondary/30 p-2 rounded-full mr-3">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{activity.date.toLocaleDateString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {activity.minutes} minutes of learning
                    </div>
                    {activity.completed.length > 0 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Completed: {activity.completed.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  color 
}: { 
  icon: LucideIcon;
  value: number;
  label: string;
  color: string;
}) => (
  <div className="bg-secondary/20 p-4 rounded-lg text-center">
    <Icon className={`h-6 w-6 ${color} mx-auto mb-2`} />
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

export default LearningStreakDialog;
