import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';
import CourseCarousel from '@/components/course-carousel';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '@/data/mockCoursesData';

// Import new components
import SkillsSection from '@/components/homepage/SkillsSection';
import ActionablesCard from '@/components/homepage/ActionablesCard';
import RewardsSummary from '@/components/homepage/RewardsSummary';
import DomainCatalog from '@/components/homepage/DomainCatalog';

// Filter courses and add video URLs and properly formatted images
const continueLearningCourses = mockCourses
  .filter(course => course.status === 'in-progress')
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://source.unsplash.com/random/800x450/?coding,tech,${Math.random()}`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    progress: Math.floor(Math.random() * 80) + 10
  }));

const assignedCourses = mockCourses
  .filter(course => course.status === 'assigned')
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://source.unsplash.com/random/800x450/?business,office,${Math.random()}`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }));

const chosenForYou = mockCourses
  .filter((_, idx) => idx < 12)
  .map(course => ({
    ...course,
    imageUrl: `https://source.unsplash.com/random/800x450/?learning,education,${Math.random()}`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  }));

const basedOnInterest = mockCourses
  .filter((_, idx) => idx >= 12 && idx < 24)
  .map(course => ({
    ...course,
    imageUrl: `https://source.unsplash.com/random/800x450/?study,library,${Math.random()}`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  }));

// New skills for your role courses - with job role specific skills
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
    imageUrl: `https://source.unsplash.com/random/800x450/?leadership,${Math.random()}`,
    category: "Leadership",
    duration: "4h 30m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Leadership",
    skill: "Leadership",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-002",
    title: "Effective Communication for Managers",
    description: "Learn how to communicate with clarity, purpose and impact in managerial roles.",
    imageUrl: `https://source.unsplash.com/random/800x450/?communication,${Math.random()}`,
    category: "Communication",
    duration: "3h 45m",
    rating: 4.8,
    isBookmarked: true,
    trainingCategory: "Soft Skills",
    skill: "Communication",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-003",
    title: "Project Management Professional",
    description: "A comprehensive guide to managing projects efficiently using modern methodologies.",
    imageUrl: `https://source.unsplash.com/random/800x450/?project,management,${Math.random()}`,
    category: "Project Management",
    duration: "8h 15m",
    rating: 4.7,
    isBookmarked: false,
    trainingCategory: "Management",
    skill: "Project Management",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-004",
    title: "Critical Decision Making",
    description: "Learn frameworks and techniques for making better decisions under pressure.",
    imageUrl: `https://source.unsplash.com/random/800x450/?decision,making,${Math.random()}`,
    category: "Decision Making",
    duration: "3h 10m",
    rating: 4.6,
    isBookmarked: true,
    trainingCategory: "Leadership",
    skill: "Decision Making",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-005",
    title: "Strategic Planning and Execution",
    description: "Develop and execute strategies that align with organizational goals.",
    imageUrl: `https://source.unsplash.com/random/800x450/?strategic,planning,${Math.random()}`,
    category: "Strategic Planning",
    duration: "5h 30m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Management",
    skill: "Strategic Planning",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-006",
    title: "Conflict Resolution in Teams",
    description: "Practical approaches to managing and resolving conflicts in professional settings.",
    imageUrl: `https://source.unsplash.com/random/800x450/?conflict,resolution,${Math.random()}`,
    category: "Conflict Resolution",
    duration: "2h 55m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Soft Skills",
    skill: "Conflict Resolution",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-007",
    title: "Building High-Performance Teams",
    description: "Strategies for creating, leading and maintaining high-performing teams.",
    imageUrl: `https://source.unsplash.com/random/800x450/?team,building,${Math.random()}`,
    category: "Team Building",
    duration: "4h 20m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Leadership",
    skill: "Team Building",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-008",
    title: "Problem Solving for Managers",
    description: "Analytical techniques to approach and solve complex business problems.",
    imageUrl: `https://source.unsplash.com/random/800x450/?problem,solving,${Math.random()}`,
    category: "Problem Solving",
    duration: "3h 40m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Management",
    skill: "Problem Solving",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-009",
    title: "Time Management and Productivity",
    description: "Maximize productivity and efficiency with proven time management techniques.",
    imageUrl: `https://source.unsplash.com/random/800x450/?time,management,${Math.random()}`,
    category: "Time Management",
    duration: "2h 30m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Soft Skills",
    skill: "Time Management",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-010",
    title: "Effective Delegation Skills",
    description: "Learn when and how to delegate tasks to maximize team productivity.",
    imageUrl: `https://source.unsplash.com/random/800x450/?delegation,${Math.random()}`,
    category: "Delegation",
    duration: "2h 15m",
    rating: 4.6,
    isBookmarked: true,
    trainingCategory: "Leadership",
    skill: "Delegation",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  }
];

const trendingCourses = [...mockCourses]
  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  .slice(0, 12)
  .map((course, idx) => ({
    ...course,
    imageUrl: `https://source.unsplash.com/random/800x450/?trending,popular,${Math.random()}`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    title: `${idx + 1}. ${course.title}`
  }));

// New popular with similar users courses with realistic data
const popularWithSimilarUsers = [
  {
    id: "similar-course-001",
    title: "Big Data Analytics for Managers",
    description: "Learn how to leverage big data to make better business decisions.",
    imageUrl: `https://source.unsplash.com/random/800x450/?data,analytics,${Math.random()}`,
    category: "Data Analysis",
    duration: "5h 45m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Technical",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-002",
    title: "Emotional Intelligence at Work",
    description: "Develop emotional intelligence skills to enhance professional relationships.",
    imageUrl: `https://source.unsplash.com/random/800x450/?emotional,intelligence,${Math.random()}`,
    category: "Soft Skills",
    duration: "3h 20m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Soft Skills",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-003",
    title: "Digital Marketing Essentials",
    description: "Master the fundamentals of digital marketing in today's business landscape.",
    imageUrl: `https://source.unsplash.com/random/800x450/?digital,marketing,${Math.random()}`,
    category: "Marketing",
    duration: "4h 15m",
    rating: 4.6,
    isBookmarked: true,
    trainingCategory: "Marketing",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-004",
    title: "Advanced Excel for Business Analytics",
    description: "Take your Excel skills to the next level for better business analysis.",
    imageUrl: `https://source.unsplash.com/random/800x450/?excel,analytics,${Math.random()}`,
    category: "Data Analysis",
    duration: "6h 30m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Technical",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-005",
    title: "Leading Through Change",
    description: "Effective strategies for leading teams through organizational change.",
    imageUrl: `https://source.unsplash.com/random/800x450/?leading,change,${Math.random()}`,
    category: "Leadership",
    duration: "3h 50m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Leadership",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-006",
    title: "Negotiation Techniques that Work",
    description: "Practical negotiation strategies for business professionals.",
    imageUrl: `https://source.unsplash.com/random/800x450/?negotiation,techniques,${Math.random()}`,
    category: "Communication",
    duration: "4h 10m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Soft Skills",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-007",
    title: "Financial Planning for Managers",
    description: "Essential financial knowledge for non-financial managers.",
    imageUrl: `https://source.unsplash.com/random/800x450/?financial,planning,${Math.random()}`,
    category: "Finance",
    duration: "5h 20m",
    rating: 4.6,
    isBookmarked: true,
    trainingCategory: "Finance",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-008",
    title: "Business Ethics and Compliance",
    description: "Navigate ethical dilemmas and compliance issues in business.",
    imageUrl: `https://source.unsplash.com/random/800x450/?business,ethics,${Math.random()}`,
    category: "Compliance",
    duration: "3h 15m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Compliance",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-009",
    title: "Client Relationship Management",
    description: "Build and maintain strong client relationships for long-term success.",
    imageUrl: `https://source.unsplash.com/random/800x450/?client,relationship,${Math.random()}`,
    category: "Sales",
    duration: "4h 05m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Business",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-010",
    title: "Strategic HR Management",
    description: "Align HR strategies with organizational goals for better business outcomes.",
    imageUrl: `https://source.unsplash.com/random/800x450/?strategic,hr,${Math.random()}`,
    category: "HR",
    duration: "4h 30m",
    rating: 4.6,
    isBookmarked: false,
    trainingCategory: "HR",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  }
];

// Mock banner data for BannerCarousel including video banner
const mockBanners = [
  {
    id: 1,
    title: "New Leadership Course Available",
    description: "Enhance your leadership skills with our new comprehensive course",
    imageUrl: "https://source.unsplash.com/random/1200x600/?leadership,team",
    link: "/discover"
  },
  {
    id: 2,
    title: "Technical Certification Paths",
    description: "Advance your career with industry recognized certifications",
    imageUrl: "https://source.unsplash.com/random/1200x600/?certificate,education",
    link: "/discover"
  },
  {
    id: 3,
    title: "Introduction to Project Management",
    description: "Watch this quick intro to our most popular course on project management",
    imageUrl: "https://source.unsplash.com/random/1200x600/?project,management",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    isVideo: true,
    link: "/course/project-management-101"
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
        
        {/* For Your Role Carousel - new implementation with role skills */}
        <CourseCarousel 
          title="For Your Role" 
          courses={forYourRoleCourses}
          viewAllUrl="/view-all/role"
          filterOptions={forYourRoleSkills}
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
