
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Flame, 
  Heart, 
  Award, 
  Trophy, 
  TrendingUp, 
  ArrowUpRight,
  Zap
} from 'lucide-react';

const LearningStreak = () => {
  // Sample streak data
  const streakData = {
    currentStreak: 18,
    longestStreak: 42,
    totalDays: 156,
    streakPoints: 1800,
    nextMilestone: {
      days: 21,
      reward: '500 bonus points',
      pointsToNext: 300
    },
    dailyProgress: {
      today: 85,
      goal: 100,
      minutes: 51,
      goalMinutes: 60
    },
    streakHistory: [
      { week: 'Current Week', days: [true, true, true, false, null, null, null] },
      { week: 'Last Week', days: [true, true, true, true, true, false, true] },
      { week: 'Week 3', days: [true, true, true, true, true, true, true] },
      { week: 'Week 4', days: [true, false, true, true, true, false, true] },
    ],
    achievements: [
      { title: '7-Day Streak', completed: true, icon: Flame, description: 'Complete learning activities for 7 consecutive days' },
      { title: '14-Day Streak', completed: true, icon: Flame, description: 'Complete learning activities for 14 consecutive days' },
      { title: '21-Day Streak', completed: false, icon: Flame, description: 'Complete learning activities for 21 consecutive days' },
      { title: '30-Day Streak', completed: false, icon: Trophy, description: 'Complete learning activities for a full month' },
      { title: 'Daily Overachiever', completed: true, icon: TrendingUp, description: 'Exceed your daily learning goal by 50%' },
      { title: 'Weekend Warrior', completed: true, icon: Zap, description: 'Complete learning activities on both Saturday and Sunday' },
    ]
  };

  // Get the current date for streak calendar
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday

  // Generate calendar days for the current month
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const calendarDays = Array(daysInMonth).fill(0).map((_, index) => {
    const day = index + 1;
    // Past days were learning days if day is even (for sample data)
    return {
      day,
      isLearningDay: day < today.getDate() && day % 2 === 0,
      isToday: day === today.getDate(),
      isFuture: day > today.getDate()
    };
  });

  // Calculate percentage to next milestone
  const percentToNextMilestone = (streakData.currentStreak / streakData.nextMilestone.days) * 100;

  return (
    <>
      <Helmet>
        <title>Learning Streak | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Learning Streak</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Streak stats */}
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span>Your Learning Streak</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold">{streakData.currentStreak} days</p>
                </div>
                
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Longest Streak</p>
                  <p className="text-3xl font-bold">{streakData.longestStreak} days</p>
                </div>
                
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Total Days</p>
                  <p className="text-3xl font-bold">{streakData.totalDays} days</p>
                </div>
                
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Streak Points</p>
                  <p className="text-3xl font-bold">{streakData.streakPoints}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Next Milestone: {streakData.nextMilestone.days} Days</span>
                  <span className="text-sm font-medium">{streakData.currentStreak}/{streakData.nextMilestone.days} days</span>
                </div>
                <Progress value={percentToNextMilestone} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Keep going! You'll earn <span className="text-primary font-medium">{streakData.nextMilestone.reward}</span> when you reach {streakData.nextMilestone.days} days.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Today's progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Today's Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <svg className="w-32 h-32">
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="58" 
                      fill="none" 
                      stroke="#e2e8f0" 
                      strokeWidth="12" 
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="58" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="12" 
                      strokeDasharray="364.4"
                      strokeDashoffset={364.4 - (364.4 * streakData.dailyProgress.today / 100)}
                      className="text-primary transform -rotate-90 origin-center" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{streakData.dailyProgress.today}%</span>
                    <span className="text-sm text-muted-foreground">completed</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Time spent learning</span>
                    <span>{streakData.dailyProgress.minutes} / {streakData.dailyProgress.goalMinutes} min</span>
                  </div>
                  <Progress value={(streakData.dailyProgress.minutes / streakData.dailyProgress.goalMinutes) * 100} className="h-2" />
                </div>
                
                <Button className="w-full">Continue Learning</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar view */}
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Streak Calendar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="month">
                <TabsList className="mb-4">
                  <TabsTrigger value="month">Monthly View</TabsTrigger>
                  <TabsTrigger value="week">Weekly View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="month">
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-xs font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before start of month */}
                    {Array(firstDayOfMonth).fill(0).map((_, index) => (
                      <div key={`empty-${index}`} className="h-10"></div>
                    ))}
                    
                    {/* Calendar days */}
                    {calendarDays.map((day) => (
                      <div 
                        key={`day-${day.day}`} 
                        className={`
                          h-10 flex items-center justify-center rounded-full text-sm
                          ${day.isToday ? 'bg-primary text-primary-foreground' : 
                            day.isLearningDay ? 'bg-orange-500/20 text-orange-700' : 
                            day.isFuture ? 'text-muted-foreground' : 'bg-secondary/30'}
                        `}
                      >
                        {day.day}
                        {day.isLearningDay && !day.isToday && (
                          <Flame className="h-3 w-3 ml-0.5 text-orange-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="week">
                  <div className="space-y-4">
                    {streakData.streakHistory.map((week, weekIndex) => (
                      <div key={`week-${weekIndex}`}>
                        <h4 className="text-sm font-medium mb-2">{week.week}</h4>
                        <div className="flex gap-1">
                          {week.days.map((isComplete, dayIndex) => (
                            <div 
                              key={`week-${weekIndex}-day-${dayIndex}`}
                              className={`
                                flex-1 h-12 rounded-md flex items-center justify-center
                                ${isComplete === null ? 'bg-transparent text-muted-foreground border border-dashed border-muted-foreground/30' : 
                                  isComplete ? 'bg-orange-500/20 text-orange-700' : 'bg-secondary/30 text-muted-foreground'}
                              `}
                            >
                              {isComplete === null ? (
                                <span className="text-xs">Future</span>
                              ) : isComplete ? (
                                <Flame className="h-5 w-5 text-orange-500" />
                              ) : (
                                <span className="text-xs">Missed</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Achievements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Streak Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {streakData.achievements.map((achievement, index) => (
                  <div 
                    key={`achievement-${index}`}
                    className={`
                      p-3 rounded-lg border flex items-center gap-3
                      ${achievement.completed ? 'bg-primary/10 border-primary/30' : 'bg-secondary/20 border-muted'}
                    `}
                  >
                    <div className={`
                      rounded-full p-2 
                      ${achievement.completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                    `}>
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Achievements <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LearningStreak;
