
import React from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';
import CourseCarousel from '@/components/CourseCarousel';
import LeaderboardCard from '@/components/LeaderboardCard';
import BadgeCard from '@/components/BadgeCard';
import PointsOverview from '@/components/PointsOverview';
import { mockCourses } from '@/data/mockCoursesData';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import FollowSkills from '@/components/FollowSkills';

// Filter courses for different categories
const recommendedCourses = mockCourses.filter((_, index) => index < 12);
const trendingCourses = mockCourses.filter((_, index) => index >= 12 && index < 24);
const newCourses = mockCourses.filter((_, index) => index >= 24 && index < 36);
const savedCourses = mockCourses.filter((course) => course.isBookmarked);

// Mock banner data for BannerCarousel
const mockBanners = [
  {
    id: 1,
    title: "New Leadership Course Available",
    description: "Enhance your leadership skills with our new comprehensive course",
    imageUrl: "/placeholder.svg",
    link: "/discover"
  },
  {
    id: 2,
    title: "Technical Certification Paths",
    description: "Advance your career with industry recognized certifications",
    imageUrl: "/placeholder.svg",
    link: "/discover"
  }
];

// Mock data for PointsOverview
const mockPointsData = {
  totalPoints: 1250,
  coursesCompleted: 12,
  hoursSpent: 48,
  pointsThisWeek: 150,
  pointsLastWeek: 120,
  pointsBreakdown: [
    { category: 'Course Completion', points: 650, color: '#4338ca' },
    { category: 'Quizzes', points: 350, color: '#0ea5e9' },
    { category: 'Assignments', points: 150, color: '#10b981' },
    { category: 'Participation', points: 100, color: '#f59e0b' },
  ],
  streakDays: 15,
  nextMilestone: {
    name: 'Coffee Voucher',
    points: 1500,
  },
  redeemablePoints: 800
};

// Mock data for LeaderboardCard
const mockLeaderboardUsers = [
  {
    id: 'user-1',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    points: 2450,
    position: 1,
    positionChange: 0,
    details: {
      assessmentScore: 92,
      engagementScore: 88,
      completionRate: 95
    },
    team: 'Marketing',
    department: 'Sales',
    location: 'New York',
    role: 'Manager'
  },
  {
    id: 'user-2',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    points: 2280,
    position: 2,
    positionChange: 1,
    details: {
      assessmentScore: 88,
      engagementScore: 92,
      completionRate: 90
    },
    team: 'Engineering',
    department: 'Technology',
    location: 'San Francisco',
    role: 'Developer'
  },
  {
    id: 'user-3',
    name: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    points: 2150,
    position: 3,
    positionChange: -1,
    details: {
      assessmentScore: 90,
      engagementScore: 85,
      completionRate: 88
    },
    team: 'Design',
    department: 'Creative',
    location: 'London',
    role: 'Designer'
  },
  {
    id: 'user-4',
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    points: 1950,
    position: 4,
    positionChange: 0,
    details: {
      assessmentScore: 85,
      engagementScore: 80,
      completionRate: 92
    },
    team: 'Operations',
    department: 'Administration',
    location: 'Chicago',
    role: 'Analyst'
  },
  {
    id: 'user-5',
    name: 'Sarah Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    points: 1820,
    position: 5,
    positionChange: 2,
    details: {
      assessmentScore: 82,
      engagementScore: 78,
      completionRate: 85
    },
    team: 'Finance',
    department: 'Accounting',
    location: 'Toronto',
    role: 'Manager'
  }
];

// Current user for LeaderboardCard
const currentUser = {
  id: 'current-user',
  name: 'You',
  avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  points: 1650,
  position: 8,
  positionChange: 1,
  details: {
    assessmentScore: 78,
    engagementScore: 75,
    completionRate: 82
  },
  team: 'Product',
  department: 'Technology',
  location: 'Austin',
  role: 'Product Manager'
};

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Banner Carousel */}
        <BannerCarousel banners={mockBanners} />
        
        {/* Skills Selection Section */}
        <FollowSkills 
          title="Follow Skills" 
          subtitle="Follow skills to personalize your learning experience" 
        />

        {/* Recommended Courses */}
        <CourseCarousel 
          title="Recommended For You" 
          courses={recommendedCourses}
          viewAllUrl="/view-all/recommended"
        />
        
        {/* Trending Courses */}
        <CourseCarousel 
          title="Trending Courses" 
          courses={trendingCourses}
          viewAllUrl="/view-all/trending"
        />
        
        {/* Points Overview and Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PointsOverview data={mockPointsData} />
          </div>
          <div>
            <LeaderboardCard users={mockLeaderboardUsers} currentUser={currentUser} />
          </div>
        </div>
        
        {/* Saved Courses */}
        {savedCourses.length > 0 && (
          <CourseCarousel 
            title="Saved Courses" 
            courses={savedCourses}
            viewAllUrl="/view-all/saved"
          />
        )}
        
        {/* New Courses */}
        <CourseCarousel 
          title="New Courses" 
          courses={newCourses}
          viewAllUrl="/view-all/new"
        />
        
        {/* View Actionables Button */}
        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate('/actionables')} variant="outline" size="lg" className="gap-2">
            View Your Actionables
            <MoveRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Latest Achievements */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Latest Achievements</h2>
            <Button variant="link" onClick={() => navigate('/my-learning?tab=badges')} className="flex items-center gap-1 p-0">
              View All <MoveRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <BadgeCard 
              id="badge-1"
              title="Learning Explorer" 
              description="Completed 5 courses from different categories" 
              imageUrl="/placeholder.svg"
              category="Achievement"
              isUnlocked={true}
              earnedDate="2023-06-15"
            />
            <BadgeCard 
              id="badge-2"
              title="Perfect Score!" 
              description="Got 100% on 'Advanced React Patterns' quiz" 
              imageUrl="/placeholder.svg"
              category="Excellence"
              isUnlocked={true}
              earnedDate="2023-06-08"
            />
            <BadgeCard 
              id="badge-3"
              title="Helping Hand" 
              description="Answered 20 questions in the forum" 
              imageUrl="/placeholder.svg"
              category="Mastery"
              isUnlocked={true}
              earnedDate="2023-05-30"
            />
            <BadgeCard 
              id="badge-4"
              title="Learning Streak" 
              description="Maintained a 30-day learning streak" 
              imageUrl="/placeholder.svg"
              category="Consistency"
              isUnlocked={true}
              earnedDate="2023-05-15"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
