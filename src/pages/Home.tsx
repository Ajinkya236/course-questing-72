import React from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';
import CourseCarousel from '@/components/course-carousel';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '@/data/mockCoursesData';
import { Course } from '@/types/course';

// Import new components
import SkillsSection from '@/components/homepage/SkillsSection';
import ActionablesCard from '@/components/homepage/ActionablesCard';
import RewardsSummary from '@/components/homepage/RewardsSummary';
import DomainCatalog from '@/components/homepage/DomainCatalog';

// Helper function to format skills array to correct type
const formatSkills = (skills: string[]): { name: string; proficiency: string }[] => {
  return skills.map(skill => ({
    name: skill,
    proficiency: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]
  }));
};

// Filter courses for different categories
const continueLearningCourses: Course[] = mockCourses
  .filter(course => course.status === 'in-progress')
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Sample video
    progress: Math.floor(Math.random() * 80) + 10, // Random progress between 10-90%
    skills: formatSkills(course.skills as string[] || [])
  }));

const assignedCourses: Course[] = mockCourses
  .filter(course => course.status === 'assigned')
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', // Sample video
    skills: formatSkills(course.skills as string[] || [])
  }));

const chosenForYou: Course[] = mockCourses
  .filter((_, idx) => idx < 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // Sample video
    skills: formatSkills(course.skills as string[] || [])
  }));

const basedOnInterest: Course[] = mockCourses
  .filter((_, idx) => idx >= 12 && idx < 24)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', // Sample video
    skills: formatSkills(course.skills as string[] || [])
  }));

// New skills for your role courses - with job role specific skills
const forYourRoleSkills = [
  'All Skills', 'Leadership', 'Communication', 'Project Management', 'Decision Making', 
  'Strategic Planning', 'Conflict Resolution', 'Team Building', 'Problem Solving',
  'Time Management', 'Delegation'
];

// Generate course data specifically for "For Your Role" section with skills
const forYourRoleCourses: Course[] = [
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
    skills: [{ name: "Leadership", proficiency: "Advanced" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-002",
    title: "Effective Communication for Managers",
    description: "Learn how to communicate with clarity, purpose and impact in managerial roles.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Communication",
    duration: "3h 45m",
    rating: 4.8,
    isBookmarked: true,
    trainingCategory: "Soft Skills",
    skills: [{ name: "Communication", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-003",
    title: "Project Management Professional",
    description: "A comprehensive guide to managing projects efficiently using modern methodologies.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Project Management",
    duration: "8h 15m",
    rating: 4.7,
    isBookmarked: false,
    trainingCategory: "Management",
    skills: [{ name: "Project Management", proficiency: "Advanced" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-004",
    title: "Critical Decision Making",
    description: "Learn frameworks and techniques for making better decisions under pressure.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Decision Making",
    duration: "3h 10m",
    rating: 4.6,
    isBookmarked: true,
    trainingCategory: "Leadership",
    skills: [{ name: "Decision Making", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-005",
    title: "Strategic Planning and Execution",
    description: "Develop and execute strategies that align with organizational goals.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Strategic Planning",
    duration: "5h 30m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Management",
    skills: [{ name: "Strategic Planning", proficiency: "Advanced" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-006",
    title: "Conflict Resolution in Teams",
    description: "Practical approaches to managing and resolving conflicts in professional settings.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Conflict Resolution",
    duration: "2h 55m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Soft Skills",
    skills: [{ name: "Conflict Resolution", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-007",
    title: "Building High-Performance Teams",
    description: "Strategies for creating, leading and maintaining high-performing teams.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Team Building",
    duration: "4h 20m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Leadership",
    skills: [{ name: "Team Building", proficiency: "Advanced" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-008",
    title: "Problem Solving for Managers",
    description: "Analytical techniques to approach and solve complex business problems.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Problem Solving",
    duration: "3h 40m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Management",
    skills: [{ name: "Problem Solving", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-009",
    title: "Time Management and Productivity",
    description: "Maximize productivity and efficiency with proven time management techniques.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Time Management",
    duration: "2h 30m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Soft Skills",
    skills: [{ name: "Time Management", proficiency: "Beginner" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: "role-course-010",
    title: "Effective Delegation Skills",
    description: "Learn when and how to delegate tasks to maximize team productivity.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Delegation",
    duration: "2h 15m",
    rating: 4.6,
    isBookmarked: true,
    trainingCategory: "Leadership",
    skills: [{ name: "Delegation", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  }
];

const trendingCourses: Course[] = [...mockCourses]
  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  .slice(0, 12)
  .map((course, idx) => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', // Sample video
    title: `${idx + 1}. ${course.title}`, // Add ranking to title
    skills: formatSkills(course.skills as string[] || [])
  }));

// New popular with similar users courses with realistic data
const popularWithSimilarUsers: Course[] = [
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
    skills: [{ name: "Data Analysis", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-002",
    title: "Emotional Intelligence at Work",
    description: "Develop emotional intelligence skills to enhance professional relationships.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Soft Skills",
    duration: "3h 20m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Soft Skills",
    skills: [{ name: "Emotional Intelligence", proficiency: "Beginner" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-003",
    title: "Digital Marketing Essentials",
    description: "Master the fundamentals of digital marketing in today's business landscape.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Marketing",
    duration: "4h 15m",
    rating: 4.6,
    isBookmarked: true,
    trainingCategory: "Marketing",
    skills: [{ name: "Digital Marketing", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-004",
    title: "Advanced Excel for Business Analytics",
    description: "Take your Excel skills to the next level for better business analysis.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Data Analysis",
    duration: "6h 30m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Technical",
    skills: [{ name: "Excel", proficiency: "Advanced" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-005",
    title: "Leading Through Change",
    description: "Effective strategies for leading teams through organizational change.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Leadership",
    duration: "3h 50m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Leadership",
    skills: [{ name: "Leadership", proficiency: "Advanced" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-006",
    title: "Negotiation Techniques that Work",
    description: "Practical negotiation strategies for business professionals.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Communication",
    duration: "4h 10m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Soft Skills",
    skills: [{ name: "Negotiation", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-007",
    title: "Financial Planning for Managers",
    description: "Essential financial knowledge for non-financial managers.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Finance",
    duration: "5h 20m",
    rating: 4.6,
    isBookmarked: true,
    trainingCategory: "Finance",
    skills: [{ name: "Finance", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-008",
    title: "Business Ethics and Compliance",
    description: "Navigate ethical dilemmas and compliance issues in business.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Compliance",
    duration: "3h 15m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Compliance",
    skills: [{ name: "Compliance", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-009",
    title: "Client Relationship Management",
    description: "Build and maintain strong client relationships for long-term success.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "Sales",
    duration: "4h 05m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Business",
    skills: [{ name: "Sales", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  },
  {
    id: "similar-course-010",
    title: "Strategic HR Management",
    description: "Align HR strategies with organizational goals for better business outcomes.",
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    category: "HR",
    duration: "4h 30m",
    rating: 4.6,
    isBookmarked: false,
    trainingCategory: "HR",
    skills: [{ name: "HR", proficiency: "Intermediate" }],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  }
];

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
        />
        
        {/* For Your Role Carousel - new implementation with role skills */}
        <CourseCarousel 
          title="For Your Role" 
          courses={forYourRoleCourses}
          viewAllUrl="/view-all/role"
          filterOptions={forYourRoleSkills}
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
