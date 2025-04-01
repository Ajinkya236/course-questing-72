
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import BannerCarousel from '@/components/BannerCarousel';
import CourseCarousel from '@/components/course-carousel';
import SkillsSection from '@/components/homepage/SkillsSection';
import ActionablesCard from '@/components/homepage/ActionablesCard';
import RewardsSummary from '@/components/homepage/RewardsSummary';
import DomainCatalog from '@/components/homepage/DomainCatalog';
import { mockCourses } from '@/data/mockCoursesData';
import { Course } from '@/types/course';

// Mock banner data
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

const Home = () => {
  const navigate = useNavigate();
  const [trainingFilter, setTrainingFilter] = useState('All Categories');
  
  // Process and normalize continued learning courses
  const continueLearningCourses: Course[] = mockCourses
    .filter(course => course.status === 'in-progress')
    .slice(0, 8)
    .map(course => {
      // Create a typed skills array from the course's skills
      const normalizedSkills = Array.isArray(course.skills) 
        ? course.skills.map(skill => {
            if (typeof skill === 'string') {
              return { name: skill, proficiency: 'Intermediate' };
            }
            return skill;
          })
        : [];
      
      return {
        ...course,
        imageUrl: course.imageUrl || `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
        videoUrl: course.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
        progress: Math.floor(Math.random() * 80) + 10,
        skills: normalizedSkills
      };
    });

  // Process and normalize assigned courses
  const assignedCourses: Course[] = mockCourses
    .filter(course => course.status === 'assigned')
    .slice(0, 8)
    .map(course => {
      // Create a typed skills array from the course's skills
      const normalizedSkills = Array.isArray(course.skills) 
        ? course.skills.map(skill => {
            if (typeof skill === 'string') {
              return { name: skill, proficiency: 'Intermediate' };
            }
            return skill;
          })
        : [];
      
      return {
        ...course,
        imageUrl: course.imageUrl || `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
        videoUrl: course.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        skills: normalizedSkills
      };
    });

  // Training categories
  const trainingCategories = [
    'All Categories', 'Technical', 'Soft Skills', 'Leadership', 'Compliance', 
    'Product', 'Onboarding', 'Business', 'Management'
  ];
  
  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Banner Carousel */}
        <BannerCarousel banners={mockBanners} />
        
        {/* Continue Learning Carousel */}
        <CourseCarousel 
          title="Continue Learning" 
          description="Pick up where you left off with these courses"
          courses={continueLearningCourses}
          viewAllUrl="/my-learning?tab=courses&status=in-progress"
          onViewAllClick={() => navigate('/my-learning?tab=courses&status=in-progress')}
        />
        
        {/* Assigned Courses Carousel */}
        <CourseCarousel 
          title="Assigned Courses" 
          description="Courses assigned to you by your manager"
          courses={assignedCourses}
          viewAllUrl="/my-learning?tab=courses&status=assigned"
          onViewAllClick={() => navigate('/my-learning?tab=courses&status=assigned')}
          filterOptions={trainingCategories}
          selectedFilter={trainingFilter}
          onFilterChange={setTrainingFilter}
          showTrainingCategory={true}
        />
        
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
