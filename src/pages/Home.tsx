
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

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Banner Carousel */}
        <BannerCarousel />
        
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
            <PointsOverview />
          </div>
          <div>
            <LeaderboardCard />
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
              title="Learning Explorer" 
              description="Completed 5 courses from different categories" 
              date="2 days ago"
              imageUrl="/placeholder.svg"
            />
            <BadgeCard 
              title="Perfect Score!" 
              description="Got 100% on 'Advanced React Patterns' quiz" 
              date="1 week ago"
              imageUrl="/placeholder.svg"
            />
            <BadgeCard 
              title="Helping Hand" 
              description="Answered 20 questions in the forum" 
              date="2 weeks ago"
              imageUrl="/placeholder.svg"
            />
            <BadgeCard 
              title="Learning Streak" 
              description="Maintained a 30-day learning streak" 
              date="1 month ago"
              imageUrl="/placeholder.svg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
