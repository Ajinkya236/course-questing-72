
import React from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '@/data/mockCoursesData';

// Import components
import SkillsSection from '@/components/homepage/SkillsSection';
import ActionablesCard from '@/components/homepage/ActionablesCard';
import RewardsSummary from '@/components/homepage/RewardsSummary';
import DomainCatalog from '@/components/homepage/DomainCatalog';

// Simplified CourseCarousel import to avoid circular dependencies
import CourseCarousel from '@/components/CourseCarousel';

// Helper function to convert string skills to proper skill objects
const convertToSkillObjects = (skills: string[]) => {
  return skills.map(skill => ({
    name: skill,
    proficiency: 'Intermediate'
  }));
};

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

// Filter courses for different categories
const continueLearningCourses = mockCourses
  .filter(course => course.status === 'in-progress')
  .slice(0, 8)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    progress: Math.floor(Math.random() * 80) + 10, 
    skills: convertToSkillObjects(course.skills as unknown as string[] || ['Learning', 'Development'])
  }));

const assignedCourses = mockCourses
  .filter(course => course.status === 'assigned')
  .slice(0, 8)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    skills: convertToSkillObjects(course.skills as unknown as string[] || ['Management', 'Leadership'])
  }));

// Mock training categories for filter
const trainingCategories = [
  'All Categories', 'Technical', 'Soft Skills', 'Leadership', 'Compliance', 
  'Product', 'Onboarding', 'Business', 'Management'
];

const Home = () => {
  const navigate = useNavigate();
  const [trainingFilter, setTrainingFilter] = React.useState('All Categories');
  
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
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Personalized course recommendations</li>
                <li>Role-based learning paths</li>
                <li>Interactive video content</li>
                <li>Skill proficiency tracking</li>
                <li>Mentoring opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
