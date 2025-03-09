
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';
import CourseCarousel from '@/components/CourseCarousel';
import { useNavigate } from 'react-router-dom';

// Import utility functions and data
import { 
  generateHomepageCourseCollections,
  mockBanners,
  trainingCategories,
  skillFilters
} from '@/utils/courseDataUtils';

// Import components
import SkillsSection from '@/components/homepage/SkillsSection';
import ActionablesCard from '@/components/homepage/ActionablesCard';
import RewardsSummary from '@/components/homepage/RewardsSummary';
import DomainCatalog from '@/components/homepage/DomainCatalog';

const Home = () => {
  const navigate = useNavigate();
  const [trainingFilter, setTrainingFilter] = useState('All Categories');
  const [skillFilter, setSkillFilter] = useState('All Skills');
  const [roleSkillFilter, setRoleSkillFilter] = useState('All Skills');
  
  // Get course collections from our utility function
  const {
    continueLearningCourses,
    assignedCourses,
    chosenForYou,
    basedOnInterest,
    forYourRoleCourses,
    trendingCourses,
    popularWithSimilarUsers
  } = generateHomepageCourseCollections();
  
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
          courses={trendingCourses}
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
