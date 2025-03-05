
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Award, Trophy, Target, Medal, Star, Zap, BookOpen, BadgeCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock milestone data
const milestones = {
  learning: [
    {
      id: "1",
      title: "Learning Beginner",
      description: "Complete 5 courses",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      current: 5,
      target: 5,
      completed: true,
      rewards: "500 points + Learning Beginner Badge",
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Learning Enthusiast",
      description: "Complete 15 courses",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      current: 12,
      target: 15,
      completed: false,
      rewards: "1,000 points + Learning Enthusiast Badge",
      color: "bg-indigo-500",
    },
    {
      id: "3",
      title: "Learning Master",
      description: "Complete 30 courses",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      current: 12,
      target: 30,
      completed: false,
      rewards: "2,500 points + Learning Master Badge",
      color: "bg-purple-500",
    },
    {
      id: "4",
      title: "Learning Champion",
      description: "Complete 50 courses",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      current: 12,
      target: 50,
      completed: false,
      rewards: "5,000 points + Learning Champion Badge",
      color: "bg-violet-500",
    },
  ],
  achievement: [
    {
      id: "5",
      title: "Bronze Achiever",
      description: "Earn 5,000 points",
      icon: <Medal className="h-10 w-10 text-amber-500" />,
      current: 4350,
      target: 5000,
      completed: false,
      rewards: "Bronze Achievement Badge",
      color: "bg-amber-500",
    },
    {
      id: "6",
      title: "Silver Achiever",
      description: "Earn 15,000 points",
      icon: <Medal className="h-10 w-10 text-slate-400" />,
      current: 4350,
      target: 15000,
      completed: false,
      rewards: "Silver Achievement Badge",
      color: "bg-slate-400",
    },
    {
      id: "7",
      title: "Gold Achiever",
      description: "Earn 30,000 points",
      icon: <Medal className="h-10 w-10 text-yellow-500" />,
      current: 4350,
      target: 30000,
      completed: false,
      rewards: "Gold Achievement Badge",
      color: "bg-yellow-500",
    },
    {
      id: "8",
      title: "Platinum Achiever",
      description: "Earn 50,000 points",
      icon: <Medal className="h-10 w-10 text-teal-500" />,
      current: 4350,
      target: 50000,
      completed: false,
      rewards: "Platinum Achievement Badge",
      color: "bg-teal-500",
    },
  ],
  engagement: [
    {
      id: "9",
      title: "Participation Star",
      description: "Post 10 comments in discussions",
      icon: <Star className="h-10 w-10 text-orange-500" />,
      current: 8,
      target: 10,
      completed: false,
      rewards: "500 points + Participation Badge",
      color: "bg-orange-500",
    },
    {
      id: "10",
      title: "Active Contributor",
      description: "Complete 20 course assessments",
      icon: <Zap className="h-10 w-10 text-green-500" />,
      current: 15,
      target: 20,
      completed: false,
      rewards: "750 points + Contributor Badge",
      color: "bg-green-500",
    },
    {
      id: "11",
      title: "Engagement Leader",
      description: "Maintain a 14-day streak",
      icon: <BadgeCheck className="h-10 w-10 text-cyan-500" />,
      current: 12,
      target: 14,
      completed: false,
      rewards: "1,000 points + Engagement Leader Badge",
      color: "bg-cyan-500",
    },
  ],
};

const Milestones = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learning');
  
  return (
    <>
      <Helmet>
        <title>Milestones | Learning Management System</title>
      </Helmet>
      
      <div className="container py-8 mb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Milestones</h1>
        </div>
        
        <Tabs defaultValue="learning" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Learning</span>
            </TabsTrigger>
            <TabsTrigger value="achievement" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Achievement</span>
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Engagement</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="learning" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.learning.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievement" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.achievement.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.engagement.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

const MilestoneCard = ({ milestone }: { milestone: any }) => {
  const progress = Math.min(100, (milestone.current / milestone.target) * 100);
  
  return (
    <Card className="overflow-hidden hover-scale transition-all">
      <div className={`h-2 ${milestone.color}`}></div>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className={`p-2 rounded-xl ${milestone.completed ? 'bg-primary/10' : 'bg-secondary/40'}`}>
          {milestone.icon}
        </div>
        <div>
          <CardTitle className="text-lg">{milestone.title}</CardTitle>
          <CardDescription>{milestone.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{milestone.current} / {milestone.target}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="bg-secondary/20 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Rewards:</div>
            <div className="text-sm font-medium">{milestone.rewards}</div>
          </div>
          
          {milestone.completed ? (
            <Button variant="outline" className="w-full" disabled>
              <Award className="mr-2 h-4 w-4" />
              Completed
            </Button>
          ) : (
            <Button variant="default" className="w-full">
              <Target className="mr-2 h-4 w-4" />
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Milestones;
