import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import CourseCarousel from '@/components/CourseCarousel';
import MyRewardsBadges from '@/components/MyRewardsBadges';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Leaderboard from '@/components/LeaderboardEnhanced';
import PointsOverview from '@/components/PointsOverview';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SpinTheWheel from '@/components/gamification/SpinTheWheel';
import MysteryBox from '@/components/gamification/MysteryBox';
import SpinTheWheelDialog from '@/components/gamification/SpinTheWheelDialog';
import MysteryBoxDialog from '@/components/gamification/MysteryBoxDialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Star, ArrowRight, TrendingUp, Zap, Award, Calendar, Clock } from 'lucide-react';
import BannerCarousel from '@/components/BannerCarousel';
import SkillsForRoleDialog from '@/components/SkillsForRoleDialog';
import LearningStreakDialog from '@/components/LearningStreakDialog';

const banners = [
  {
    id: 1,
    title: "New AI-Powered Recommendations",
    description: "Personalized learning paths based on your skills and career goals",
    imageUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "Exclusive Leadership Series",
    description: "Join our new 10-part leadership masterclass starting next week",
    imageUrl: "https://images.unsplash.com/photo-1507662228758-08d030c4820b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    title: "Learning Festival Coming Soon",
    description: "Mark your calendar for our annual learning festival on October 5-7",
    imageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
  },
];

const welcomeCardClasses = "mb-6 bg-gradient-to-r from-primary/80 to-primary border border-primary/20 text-primary-foreground";

const mockLeaderboardUsers = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?u=1",
    points: 2450,
    position: 1,
    positionChange: 0,
    details: {
      assessmentScore: 95,
      engagementScore: 88,
      completionRate: 100
    },
    team: "Frontend",
    department: "Engineering",
    location: "New York",
    role: "Developer"
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?u=2",
    points: 2320,
    position: 2,
    positionChange: 1,
    details: {
      assessmentScore: 90,
      engagementScore: 95,
      completionRate: 92
    },
    team: "Backend",
    department: "Engineering",
    location: "San Francisco",
    role: "Developer"
  },
  {
    id: "3",
    name: "Robert Johnson",
    avatar: "https://i.pravatar.cc/150?u=3",
    points: 2180,
    position: 3,
    positionChange: -1,
    details: {
      assessmentScore: 88,
      engagementScore: 82,
      completionRate: 95
    },
    team: "Design",
    department: "Marketing",
    location: "London",
    role: "Designer"
  },
  {
    id: "4",
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?u=4",
    points: 2050,
    position: 4,
    positionChange: 2,
    details: {
      assessmentScore: 92,
      engagementScore: 78,
      completionRate: 89
    },
    team: "Content",
    department: "Marketing",
    location: "Berlin",
    role: "Manager"
  },
  {
    id: "5",
    name: "Michael Wilson",
    avatar: "https://i.pravatar.cc/150?u=5",
    points: 1950,
    position: 5,
    positionChange: -2,
    details: {
      assessmentScore: 85,
      engagementScore: 90,
      completionRate: 85
    },
    team: "DevOps",
    department: "Engineering",
    location: "Tokyo",
    role: "Developer"
  },
];

const currentUser = {
  id: "4",
  name: "Emily Davis",
  avatar: "https://i.pravatar.cc/150?u=4",
  points: 2050,
  position: 4,
  positionChange: 2,
  details: {
    assessmentScore: 92,
    engagementScore: 78,
    completionRate: 89
  },
  team: "Content",
  department: "Marketing",
  location: "Berlin",
  role: "Manager"
};

const mockPointsData = {
  totalPoints: 8750,
  coursesCompleted: 42,
  hoursSpent: 128,
  pointsThisWeek: 450,
  pointsLastWeek: 380,
  pointsBreakdown: [
    {
      category: "Course Completion",
      points: 4200,
      color: "#4CAF50"
    },
    {
      category: "Assessment Scores",
      points: 2100,
      color: "#2196F3"
    },
    {
      category: "Engagement",
      points: 1500,
      color: "#FFC107"
    },
    {
      category: "Community Contribution",
      points: 950,
      color: "#9C27B0"
    }
  ],
  streakDays: 18,
  nextMilestone: {
    name: "Gold Badge",
    points: 10000
  },
  redeemablePoints: 3500
};

const Home = () => {
  const { toast } = useToast();
  const [showSpinTheWheel, setShowSpinTheWheel] = useState(false);
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [openSkillsDialog, setOpenSkillsDialog] = useState(false);
  const [openStreakDialog, setOpenStreakDialog] = useState(false);

  const handleRewardClaim = (rewardName) => {
    toast({
      title: "Reward Claimed!",
      description: `You've successfully claimed: ${rewardName}`,
    });
  };

  const handleViewStreakDetails = () => {
    setOpenStreakDialog(true);
  };

  const handleRedeemPoints = () => {
    toast({
      title: "Redeem Points",
      description: "Opening the rewards catalog...",
    });
    // Additional logic for redeeming points would go here
  };

  return (
    <>
      <Helmet>
        <title>Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <Card className="mb-6 overflow-hidden">
          <BannerCarousel banners={banners} />
        </Card>

        <Card className={welcomeCardClasses}>
          <CardContent className="p-6 md:p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-center">
              Unlock Your Potential with Personalized Learning
            </h1>
            <p className="text-center text-primary-foreground/80 mb-6">
              Discover curated courses tailored to your needs and career goals
            </p>
            <div className="relative mx-auto max-w-lg">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search for courses, skills, or topics..." 
                className="pl-9 bg-white/10 border-primary/40 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-8" size="sm">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <MyRewardsBadges />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card className="bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-lg font-medium">Continue Learning</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Pick up where you left off</CardDescription>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-lg font-medium">Trending Courses</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">See what others are learning</CardDescription>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <Zap className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-lg font-medium">New Skills to Learn</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Explore new in-demand skills</CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Recommended Learning Paths</h2>
          <CourseCarousel courses={[]} title="Recommended" />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Gamification & Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-accent/10">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Daily Rewards
                </CardTitle>
                <CardDescription className="text-muted-foreground">Claim your daily learning rewards</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-around">
                <Dialog open={showSpinTheWheel} onOpenChange={setShowSpinTheWheel}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" onClick={() => setShowSpinTheWheel(true)}>
                      Spin the Wheel
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Spin the Wheel</DialogTitle>
                    </DialogHeader>
                    <SpinTheWheel 
                      spinning={false} 
                      segments={[
                        { id: 1, name: "500 Points", value: 500, type: "points", color: "#4CAF50" },
                        { id: 2, name: "Badge", value: "Badge", type: "badge", color: "#2196F3" }
                      ]}
                    />
                  </DialogContent>
                </Dialog>

                <Dialog open={showMysteryBox} onOpenChange={setShowMysteryBox}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" onClick={() => setShowMysteryBox(true)}>
                      Open Mystery Box
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Open Mystery Box</DialogTitle>
                    </DialogHeader>
                    <MysteryBox />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="bg-accent/10">
              <CardHeader>
                <CardTitle className="text-xl font-medium flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Learning Streaks
                </CardTitle>
                <CardDescription className="text-muted-foreground">Track your learning progress and earn rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Keep learning to maintain your streak!</p>
                <Button variant="secondary" className="mt-4" onClick={() => setOpenStreakDialog(true)}>
                  View Learning Streak
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Points & Leaderboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PointsOverview 
              data={mockPointsData}
              onViewStreakDetails={handleViewStreakDetails}
              onRedeemPoints={handleRedeemPoints}
            />
            <Leaderboard 
              users={mockLeaderboardUsers}
              currentUser={currentUser}
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Explore Training Categories</h2>
          <Tabs defaultValue="ready-for-role" className="w-full">
            <TabsList>
              <TabsTrigger value="ready-for-role">Ready for Role</TabsTrigger>
              <TabsTrigger value="mandatory">Mandatory</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>
            <TabsContent value="ready-for-role">
              <CourseCarousel courses={[]} title="Ready for Role" />
            </TabsContent>
            <TabsContent value="mandatory">
              <CourseCarousel courses={[]} title="Mandatory" />
            </TabsContent>
            <TabsContent value="leadership">
              <CourseCarousel courses={[]} title="Leadership" />
            </TabsContent>
            <TabsContent value="technical">
              <CourseCarousel courses={[]} title="Technical" />
            </TabsContent>
          </Tabs>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Skills for Your Next Role</h2>
          <Card className="bg-secondary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium mb-2">Unlock Your Career Potential</h3>
                  <p className="text-muted-foreground">Discover the skills you need to advance your career</p>
                </div>
                <Button onClick={() => setOpenSkillsDialog(true)}>Explore Skills</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <SpinTheWheelDialog
        open={showSpinTheWheel}
        onOpenChange={setShowSpinTheWheel}
      />

      <MysteryBoxDialog
        open={showMysteryBox}
        onOpenChange={setShowMysteryBox}
      />

      <SkillsForRoleDialog
        open={openSkillsDialog}
        onOpenChange={setOpenSkillsDialog}
      />

      <LearningStreakDialog
        open={openStreakDialog}
        onOpenChange={setOpenStreakDialog}
      />
    </>
  );
};

export default Home;
