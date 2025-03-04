
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Target, 
  Trophy, 
  Star, 
  Zap, 
  Calendar, 
  Clock, 
  BookOpen, 
  User,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const Milestones = () => {
  // Sample milestone data
  const milestoneData = {
    currentTier: 'Gold Explorer',
    nextTier: 'Platinum Achiever',
    pointsRequired: 15000,
    currentPoints: 12465,
    leaderboardPosition: 8,
    
    progressByCategory: [
      { category: 'Courses', completed: 28, target: 40, icon: BookOpen, color: 'bg-blue-500' },
      { category: 'Assessments', completed: 14, target: 20, icon: CheckCircle2, color: 'bg-green-500' },
      { category: 'Learning Hours', completed: 142, target: 200, icon: Clock, color: 'bg-purple-500' },
      { category: 'Skills Mastered', completed: 5, target: 8, icon: Star, color: 'bg-amber-500' },
    ],
    
    milestones: [
      {
        tier: 'Bronze Learner',
        threshold: 2500,
        rewards: ['Access to basic courses', 'Learning profile badge'],
        isCompleted: true,
        color: 'bg-amber-700'
      },
      {
        tier: 'Silver Discoverer',
        threshold: 7500,
        rewards: ['Access to intermediate courses', 'Certificate of achievement', '10% learning time during work hours'],
        isCompleted: true,
        color: 'bg-gray-400'
      },
      {
        tier: 'Gold Explorer',
        threshold: 12000,
        rewards: ['Access to advanced courses', 'Exclusive workshop invitations', '15% learning time during work hours'],
        isCompleted: true,
        color: 'bg-amber-500'
      },
      {
        tier: 'Platinum Achiever',
        threshold: 18000,
        rewards: ['Access to premium content', 'Mentorship opportunities', '20% learning time during work hours', 'Company-wide recognition'],
        isCompleted: false,
        color: 'bg-cyan-500'
      },
      {
        tier: 'Diamond Master',
        threshold: 25000,
        rewards: ['Unlimited access to all content', 'Speaking opportunities', 'Dedicated learning budget', 'Leadership development program'],
        isCompleted: false,
        color: 'bg-purple-500'
      },
    ],
    
    recentMilestones: [
      { title: 'Completed 25 Courses', date: '2 weeks ago', points: 500, icon: BookOpen },
      { title: 'Reached 10,000 Points', date: '1 month ago', points: 1000, icon: Award },
      { title: '100 Hours of Learning', date: '2 months ago', points: 750, icon: Clock },
    ],
    
    upcomingMilestones: [
      { title: 'Complete 30 Courses', progress: 28, target: 30, points: 500, icon: BookOpen },
      { title: 'Reach 15,000 Points', progress: 12465, target: 15000, points: 1000, icon: Award },
      { title: '150 Hours of Learning', progress: 142, target: 150, points: 750, icon: Clock },
    ]
  };

  // Calculate progress to next tier
  const progressPercentage = (milestoneData.currentPoints / milestoneData.pointsRequired) * 100;
  const pointsNeeded = milestoneData.pointsRequired - milestoneData.currentPoints;
  
  return (
    <>
      <Helmet>
        <title>Learning Milestones | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Learning Milestones</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current progress */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
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
                      strokeDashoffset={364.4 - (364.4 * progressPercentage / 100)}
                      className="text-primary" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{Math.round(progressPercentage)}%</span>
                    <span className="text-xs text-muted-foreground">to next tier</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">Current Tier: <span className="text-primary">{milestoneData.currentTier}</span></h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You need <span className="font-medium">{pointsNeeded.toLocaleString()} more points</span> to reach {milestoneData.nextTier}
                  </p>
                  
                  <div className="w-full bg-secondary h-2 rounded-full mb-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{milestoneData.currentPoints.toLocaleString()} points</span>
                    <span>{milestoneData.pointsRequired.toLocaleString()} points</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {milestoneData.progressByCategory.map((category, index) => {
                  const percent = (category.completed / category.target) * 100;
                  return (
                    <div key={`category-${index}`} className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`rounded-full p-1.5 ${category.color}`}>
                          <category.icon className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="text-sm font-medium">{category.category}</h4>
                      </div>
                      
                      <div className="flex justify-between mb-1 text-xs">
                        <span>{category.completed} / {category.target}</span>
                        <span>{Math.round(percent)}%</span>
                      </div>
                      
                      <Progress value={percent} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Recent and upcoming */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Recent & Upcoming</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recent">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent">
                  <div className="space-y-3">
                    {milestoneData.recentMilestones.map((milestone, index) => (
                      <div key={`recent-${index}`} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20">
                        <div className="rounded-full p-2 bg-primary/20">
                          <milestone.icon className="h-4 w-4 text-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{milestone.title}</h4>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{milestone.date}</span>
                            <Badge variant="secondary">+{milestone.points} pts</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="upcoming">
                  <div className="space-y-3">
                    {milestoneData.upcomingMilestones.map((milestone, index) => {
                      const percent = (milestone.progress / milestone.target) * 100;
                      
                      return (
                        <div key={`upcoming-${index}`} className="p-3 rounded-lg bg-secondary/20">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="rounded-full p-2 bg-primary/20">
                              <milestone.icon className="h-4 w-4 text-primary" />
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{milestone.title}</h4>
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {milestone.progress} / {milestone.target}
                                </span>
                                <Badge variant="outline">+{milestone.points} pts</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <Progress value={percent} className="h-1.5" />
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Milestone tiers */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span>Milestone Tiers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestoneData.milestones.map((milestone, index) => {
                const isCurrent = milestone.tier === milestoneData.currentTier;
                const isCompleted = milestone.isCompleted;
                
                return (
                  <div key={`milestone-${index}`} className="relative">
                    {/* Connector line between milestones */}
                    {index < milestoneData.milestones.length - 1 && (
                      <div className={`absolute left-6 top-16 bottom-0 w-0.5 ${isCompleted ? 'bg-primary' : 'bg-secondary'}`}></div>
                    )}
                    
                    <div className={`
                      rounded-lg p-4 border-2 transition-all
                      ${isCurrent ? 'border-primary bg-primary/5' : 
                        isCompleted ? 'border-muted bg-secondary/20' : 'border-dashed border-muted bg-secondary/10'}
                    `}>
                      <div className="flex items-start gap-4">
                        <div className={`
                          rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0
                          ${isCompleted ? milestone.color : 'bg-secondary'}
                        `}>
                          {isCompleted ? (
                            <Trophy className="h-6 w-6 text-white" />
                          ) : (
                            <span className="text-muted-foreground">{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">
                              {milestone.tier}
                              {isCurrent && <Badge className="ml-2 bg-primary">Current</Badge>}
                            </h3>
                            <span className="font-medium">{milestone.threshold.toLocaleString()} pts</span>
                          </div>
                          
                          <div className="space-y-1 mb-3">
                            {milestone.rewards.map((reward, rewardIndex) => (
                              <div key={`reward-${index}-${rewardIndex}`} className="flex items-center text-sm">
                                <CheckCircle2 className={`h-4 w-4 mr-2 ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
                                <span className={isCompleted ? '' : 'text-muted-foreground'}>{reward}</span>
                              </div>
                            ))}
                          </div>
                          
                          {isCurrent && (
                            <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                              <span>You are here</span>
                              <span>{pointsNeeded.toLocaleString()} points to next tier</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Milestones;
