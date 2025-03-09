
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';
import CourseCarousel from '@/components/CourseCarousel';
import BadgeCard from '@/components/BadgeCard';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '@/data/mockCoursesData';

// Import new components
import SkillsSection from '@/components/homepage/SkillsSection';
import ActionablesCard from '@/components/homepage/ActionablesCard';
import RewardsSummary from '@/components/homepage/RewardsSummary';
import DomainCatalog from '@/components/homepage/DomainCatalog';

// Filter courses for different categories
const continueLearningCourses = mockCourses
  .filter(course => course.status === 'in-progress')
  .slice(0, 12);

const assignedCourses = mockCourses
  .filter(course => course.status === 'assigned')
  .slice(0, 12);

const chosenForYou = mockCourses
  .filter((_, index) => index < 12);

const basedOnInterest = mockCourses
  .filter((_, index) => index >= 12 && index < 24);

const forYourRoleCourses = mockCourses
  .filter((_, index) => index >= 24 && index < 36);

const trendingCourses = [...mockCourses]
  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  .slice(0, 12);

const popularWithSimilarUsers = mockCourses
  .filter((_, index) => index >= 36 && index < 48);

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

// Mock training categories for filter
const trainingCategories = [
  'All Categories', 'Technical', 'Soft Skills', 'Leadership', 'Compliance', 
  'Product', 'Onboarding', 'Business', 'Management'
];

// Mock skills for filter
const skillFilters = [
  'All Skills', 'JavaScript', 'React', 'Node.js', 'Python', 'Data Science', 
  'Leadership', 'Communication', 'Design', 'Product Management'
];

const Home = () => {
  const navigate = useNavigate();
  const [trainingFilter, setTrainingFilter] = useState('All Categories');
  const [skillFilter, setSkillFilter] = useState('All Skills');
  const [roleSkillFilter, setRoleSkillFilter] = useState('All Skills');
  
  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Banner Carousel */}
        <BannerCarousel banners={mockBanners} />
        
        {/* Continue Learning Carousel */}
        {continueLearningCourses.length > 0 && (
          <CourseCarousel 
            title="Continue Learning" 
            courses={continueLearningCourses}
            viewAllUrl="/my-learning?tab=courses&status=in-progress"
            onViewAllClick={() => navigate('/my-learning?tab=courses&status=in-progress')}
          />
        )}
        
        {/* Assigned Courses Carousel */}
        {assignedCourses.length > 0 && (
          <CourseCarousel 
            title="Assigned Courses" 
            courses={assignedCourses}
            viewAllUrl="/my-learning?tab=courses&status=assigned"
            onViewAllClick={() => navigate('/my-learning?tab=courses&status=assigned')}
            filterOptions={trainingCategories}
            showSkillFilters={true}
            showTrainingCategory={true}
          />
        )}
        
        {/* Skills, Actionables and Rewards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SkillsSection />
            <ActionablesCard />
          </div>
          <RewardsSummary />
        </div>
        
        {/* Chosen For You Carousel */}
        <CourseCarousel 
          title="Chosen For You" 
          courses={chosenForYou}
          viewAllUrl="/view-all/recommended"
        />
        
        {/* Based on Your Interest Carousel */}
        <CourseCarousel 
          title="Based on Your Interest" 
          courses={basedOnInterest}
          viewAllUrl="/view-all/interest"
          filterOptions={skillFilters}
          showSkillFilters={true}
        />
        
        {/* For Your Role Carousel */}
        <CourseCarousel 
          title="For Your Role" 
          courses={forYourRoleCourses}
          viewAllUrl="/view-all/role"
          filterOptions={skillFilters}
          showSkillFilters={true}
        />
        
        {/* Trending Now Carousel */}
        <CourseCarousel 
          title="Trending Now" 
          courses={trendingCourses.map((course, index) => ({
            ...course,
            title: `${index + 1}. ${course.title}` // Add ranking to title
          }))}
          viewAllUrl="/view-all/trending"
        />
        
        {/* Popular with Similar Users Carousel */}
        <CourseCarousel 
          title="Popular with Similar Users" 
          courses={popularWithSimilarUsers}
          viewAllUrl="/view-all/popular"
        />
        
        {/* Domains Catalog Section */}
        <DomainCatalog />
        
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
