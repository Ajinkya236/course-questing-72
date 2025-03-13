
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';
import { useUserProfile } from '@/hooks/useUserProfile';
import { seedInitialData } from '@/utils/seedData';
import CourseCarousel from '@/components/course-carousel';
import LeaderboardCard from '@/components/LeaderboardCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Award, Calendar, Check, Clock, Target, Trophy } from 'lucide-react';

// Mock leaderboard data - this would come from the API
const leaderboardUsers = [
  {
    id: '1',
    name: 'Alex Johnson',
    position: 1,
    positionChange: 2,
    points: 9850,
    avatar: 'https://i.pravatar.cc/150?img=1',
    details: {
      assessmentScore: 92,
      engagementScore: 88,
      completionRate: 95
    }
  },
  {
    id: '2',
    name: 'Samantha Lee',
    position: 2,
    positionChange: -1,
    points: 9720,
    avatar: 'https://i.pravatar.cc/150?img=2',
    details: {
      assessmentScore: 90,
      engagementScore: 89,
      completionRate: 93
    }
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    position: 3,
    positionChange: 1,
    points: 9580,
    avatar: 'https://i.pravatar.cc/150?img=3',
    details: {
      assessmentScore: 88,
      engagementScore: 90,
      completionRate: 91
    }
  },
  {
    id: '4',
    name: 'Jessica Williams',
    position: 4,
    positionChange: -2,
    points: 9450,
    avatar: 'https://i.pravatar.cc/150?img=4',
    details: {
      assessmentScore: 87,
      engagementScore: 86,
      completionRate: 90
    }
  },
  {
    id: '5',
    name: 'David Chen',
    position: 5,
    positionChange: 0,
    points: 9300,
    avatar: 'https://i.pravatar.cc/150?img=5',
    details: {
      assessmentScore: 85,
      engagementScore: 88,
      completionRate: 89
    }
  }
];

// Current user (mock)
const currentUser = {
  id: '2',
  name: 'Samantha Lee',
  position: 2,
  positionChange: -1,
  points: 9720,
  avatar: 'https://i.pravatar.cc/150?img=2',
  details: {
    assessmentScore: 90,
    engagementScore: 89,
    completionRate: 93
  }
};

const Home = () => {
  const { setUserActivity } = useAuth();
  const { profile, isLoading: isProfileLoading } = useUserProfile();
  const { 
    courses, 
    recentCourses, 
    isLoading: isCoursesLoading, 
    fetchCourses, 
    fetchUserCourses 
  } = useCourses();
  const [isDataSeeded, setIsDataSeeded] = useState(false);

  // Track user activity
  useEffect(() => {
    setUserActivity();
    
    // Seed initial data if needed
    const seedData = async () => {
      await seedInitialData();
      setIsDataSeeded(true);
    };
    
    seedData();
  }, []);

  // Fetch courses data
  useEffect(() => {
    if (isDataSeeded) {
      fetchCourses();
      fetchUserCourses('in-progress');
    }
  }, [isDataSeeded]);

  return (
    <>
      <Helmet>
        <title>Dashboard | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {profile?.firstName || 'User'}
          </h1>
          <p className="text-muted-foreground">
            Here's your learning dashboard with your recent activity and recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Learning Progress */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="in-progress">
                <TabsList className="mb-4">
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="in-progress" className="space-y-4">
                  {isCoursesLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-start gap-4">
                          <Skeleton className="h-14 w-14 rounded-md" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[160px]" />
                            <Skeleton className="h-2 w-full max-w-md" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : recentCourses.length > 0 ? (
                    <div className="space-y-4">
                      {recentCourses.slice(0, 3).map(course => (
                        <div key={course.id} className="flex items-start gap-4">
                          <div className="h-14 w-14 rounded-md overflow-hidden">
                            <img
                              src={course.imageUrl}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium line-clamp-1">{course.title}</h4>
                              <span className="text-sm text-muted-foreground">{course.progress}%</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground gap-4">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {course.duration}
                              </span>
                              <span>{course.category}</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full" asChild>
                        <a href="/my-learning">
                          View All In-Progress Courses
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium mb-2">No courses in progress</h3>
                      <p className="text-muted-foreground mb-4">Start learning by enrolling in courses</p>
                      <Button asChild>
                        <a href="/discover">Explore Courses</a>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="recommended">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Personalized recommendations coming soon</h3>
                    <p className="text-muted-foreground mb-4">We're analyzing your skills and interests</p>
                    <Button asChild>
                      <a href="/discover">Explore All Courses</a>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="saved">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">No saved courses yet</h3>
                    <p className="text-muted-foreground mb-4">Bookmark courses to save them for later</p>
                    <Button asChild>
                      <a href="/discover">Explore Courses</a>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Learning Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Learning Statistics</CardTitle>
              <CardDescription>Your learning activity summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium mb-1">Experience</p>
                    <p className="text-2xl font-bold">
                      {isProfileLoading ? (
                        <Skeleton className="h-8 w-16 mx-auto" />
                      ) : (
                        `${profile?.experiencePoints || 0} XP`
                      )}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <Award className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                    <p className="text-sm font-medium mb-1">Completed</p>
                    <p className="text-2xl font-bold">
                      {isCoursesLoading ? (
                        <Skeleton className="h-8 w-16 mx-auto" />
                      ) : (
                        `${recentCourses.filter(c => c.status === 'completed').length} courses`
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <p className="font-medium">Daily Streak</p>
                    </div>
                    <p className="text-lg font-bold">
                      {isProfileLoading ? (
                        <Skeleton className="h-6 w-8" />
                      ) : (
                        `${profile?.streakDays || 0} days`
                      )}
                    </p>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const isActive = (profile?.streakDays || 0) > i;
                      return (
                        <div 
                          key={i} 
                          className={`h-2 flex-1 rounded-full ${
                            isActive ? 'bg-primary' : 'bg-muted-foreground/20'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      <p className="font-medium">Weekly Goal</p>
                    </div>
                    <p className="text-sm font-bold">3/5 hours</p>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Course Carousels */}
        {courses.length > 0 && (
          <div className="space-y-8">
            <CourseCarousel 
              title="Recommended for You" 
              courses={courses.filter(c => c.isHot)} 
              viewAllLink="/view-all/recommended"
            />
            
            <CourseCarousel 
              title="New Releases" 
              courses={courses.filter(c => c.isNew)} 
              viewAllLink="/view-all/new-releases"
            />
            
            <CourseCarousel 
              title="Popular Courses" 
              courses={courses.sort((a, b) => b.rating - a.rating).slice(0, 8)} 
              viewAllLink="/view-all/popular"
            />
          </div>
        )}
        
        {/* Leaderboard */}
        <LeaderboardCard 
          title="Leaderboard & Achievements" 
          users={leaderboardUsers} 
          currentUser={currentUser} 
        />
      </div>
    </>
  );
};

export default Home;
