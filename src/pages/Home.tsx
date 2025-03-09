import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';
import CourseCarousel from '@/components/CourseCarousel';
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
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' // Sample video
  }));

const assignedCourses = mockCourses
  .filter(course => course.status === 'assigned')
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' // Sample video
  }));

const chosenForYou = mockCourses
  .filter((_, index) => index < 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' // Sample video
  }));

const basedOnInterest = mockCourses
  .filter((_, index) => index >= 12 && index < 24)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' // Sample video
  }));

const forYourRoleCourses = mockCourses
  .filter((_, index) => index >= 24 && index < 36)
  .map((course, idx) => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', // Sample video
    isNew: idx % 5 === 0,
    isHot: idx % 7 === 0
  }));

const trendingCourses = [...mockCourses]
  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  .slice(0, 12)
  .map((course, idx) => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', // Sample video
    title: `${idx + 1}. ${course.title}`, // Add ranking to title
    isNew: idx % 5 === 0,
    isHot: idx % 7 === 0
  }));

const popularWithSimilarUsers = mockCourses
  .filter((_, index) => index >= 36 && index < 48)
  .map((course, idx) => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', // Sample video
    isNew: idx % 5 === 0,
    isHot: idx % 7 === 0
  }));

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6 md:col-span-2">
            <SkillsSection />
            <ActionablesCard />
          </div>
          <div className="md:col-span-1">
            <RewardsSummary />
          </div>
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
          courses={trendingCourses}
          viewAllUrl="/view-all/trending"
        />
        
        {/* Popular with Similar Users Carousel */}
        <CourseCarousel 
          title="Popular with Similar Users" 
          courses={popularWithSimilarUsers}
          viewAllUrl="/view-all/popular"
        />
        
        {/* Domains Catalog Section - Without filters */}
        <DomainCatalog />
        
        {/* About the Platform Section */}
        <div className="bg-card rounded-lg p-6 border mb-10">
          <h2 className="text-2xl font-semibold mb-4">About the Platform</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-4">
                Jio Learning is a comprehensive learning management system designed to help employees develop new skills, 
                enhance existing capabilities, and grow professionally. Our platform offers a wide range of courses from 
                technical skills to leadership development.
              </p>
              <p className="text-muted-foreground mb-4">
                With personalized recommendations, skill-based learning paths, and interactive content, 
                you can take control of your professional development journey and track your progress along the way.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Personalized course recommendations</li>
                <li>Role-based learning paths</li>
                <li>Interactive video content</li>
                <li>Skill proficiency tracking</li>
                <li>Mentoring opportunities</li>
                <li>Achievement badges and certifications</li>
                <li>Learning community and forums</li>
                <li>Team learning management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
