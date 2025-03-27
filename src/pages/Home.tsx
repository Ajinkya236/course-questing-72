
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';
import CourseCarousel from '@/components/course-carousel';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '@/data/mockCoursesData';
import { Course } from '@/types/course';

// Import components
import SkillsSection from '@/components/homepage/SkillsSection';
import ActionablesCard from '@/components/homepage/ActionablesCard';
import RewardsSummary from '@/components/homepage/RewardsSummary';
import DomainCatalog from '@/components/homepage/DomainCatalog';

// Add proper types to course data
const processCourse = (course: any): Course => ({
  id: course.id,
  title: course.title,
  description: course.description,
  thumbnail: course.imageUrl || `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
  imageUrl: course.imageUrl || `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
  duration: course.duration,
  instructor: course.author || course.instructor || 'Expert Instructor',
  level: course.level || 'Intermediate',
  category: course.category,
  progress: course.progress || 0,
  rating: course.rating || 0,
  isBookmarked: course.isBookmarked || false,
  isAssigned: course.isAssigned || false,
  isCompleted: course.isCompleted || course.progress === 100,
  isNew: course.isNew || false,
  isHot: course.isHot || false,
  status: course.status || 'not-started',
  source: (course.source || 'Internal') as 'Internal' | 'Coursera' | 'LinkedIn',
  type: course.type || 'Course',
  trainingCategory: course.trainingCategory,
  skill: course.skill,
  videoUrl: course.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
});

// Filter courses for different categories
const continueLearningCourses = mockCourses
  .filter(course => course.status === 'in-progress')
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    progress: Math.floor(Math.random() * 80) + 10
  }))
  .map(processCourse);

const assignedCourses = mockCourses
  .filter(course => course.status === 'assigned')
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }))
  .map(processCourse);

const chosenForYou = mockCourses
  .filter((_, idx) => idx < 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  }))
  .map(processCourse);

const basedOnInterest = mockCourses
  .filter((_, idx) => idx >= 12 && idx < 24)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  }))
  .map(processCourse);

// New skills for your role courses
const forYourRoleSkills = [
  'Leadership', 'Communication', 'Project Management', 'Decision Making', 
  'Strategic Planning', 'Conflict Resolution', 'Team Building', 'Problem Solving',
  'Time Management', 'Delegation'
];

// Generate course data specifically for "For Your Role" section with skills
const forYourRoleCourses = [
  {
    id: "role-course-001",
    title: "Leadership Masterclass: Advanced Techniques",
    description: "Master the art of leadership with practical techniques used by top executives.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Leadership",
    duration: "4h 30m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Leadership",
    skill: "Leadership",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  // ... remaining course data
].map(processCourse);

const trendingCourses = [...mockCourses]
  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  .slice(0, 12)
  .map((course, idx) => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: `${idx + 1}. ${course.title}`
  }))
  .map(processCourse);

// New popular with similar users courses with realistic data
const popularWithSimilarUsers = [
  {
    id: "similar-course-001",
    title: "Big Data Analytics for Managers",
    description: "Learn how to leverage big data to make better business decisions.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Data Analysis",
    duration: "5h 45m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Technical",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  // ... remaining similar user courses
].map(processCourse);

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
        <BannerCarousel banners={mockBanners} />
        
        {continueLearningCourses.length > 0 && (
          <CourseCarousel 
            title="Continue Learning" 
            courses={continueLearningCourses}
            viewAllUrl="/my-learning?tab=courses&status=in-progress"
            onViewAllClick={() => navigate('/my-learning?tab=courses&status=in-progress')}
          />
        )}
        
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SkillsSection />
            <ActionablesCard />
          </div>
          <RewardsSummary />
        </div>
        
        <CourseCarousel 
          title="Chosen For You" 
          courses={chosenForYou}
          viewAllUrl="/view-all/recommended"
        />
        
        <CourseCarousel 
          title="Based on Your Interest" 
          courses={basedOnInterest}
          viewAllUrl="/view-all/interest"
          filterOptions={skillFilters}
          showSkillFilters={true}
        />
        
        <CourseCarousel 
          title="For Your Role" 
          courses={forYourRoleCourses}
          viewAllUrl="/view-all/role"
          filterOptions={forYourRoleSkills}
          showSkillFilters={true}
        />
        
        <CourseCarousel 
          title="Trending Now" 
          courses={trendingCourses}
          viewAllUrl="/view-all/trending"
        />
        
        <CourseCarousel 
          title="Popular with Similar Users" 
          courses={popularWithSimilarUsers}
          viewAllUrl="/view-all/popular"
        />
        
        <DomainCatalog />
        
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
