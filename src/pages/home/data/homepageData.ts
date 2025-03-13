
import { Course } from '@/types/course';
import { mockCourses } from '@/data/mockCoursesData';

// Mock banner data for BannerCarousel
export const mockBanners = [
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
export const trainingCategories = [
  'All Categories', 'Technical', 'Soft Skills', 'Leadership', 'Compliance', 
  'Product', 'Onboarding', 'Business', 'Management'
];

// Mock skills for filter
export const skillFilters = [
  'All Skills', 'JavaScript', 'React', 'Node.js', 'Python', 'Data Science', 
  'Leadership', 'Communication', 'Design', 'Product Management'
];

// New skills for your role courses - with job role specific skills
export const forYourRoleSkills = [
  'Leadership', 'Communication', 'Project Management', 'Decision Making', 
  'Strategic Planning', 'Conflict Resolution', 'Team Building', 'Problem Solving',
  'Time Management', 'Delegation'
];

// Filter courses for different categories
export const continueLearningCourses = mockCourses
  .filter(course => course.status === 'in-progress')
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Sample video
    progress: Math.floor(Math.random() * 80) + 10 // Random progress between 10-90%
  }));

export const assignedCourses = mockCourses
  .filter(course => course.status === 'assigned')
  .slice(0, 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' // Sample video
  }));

export const chosenForYou = mockCourses
  .filter((_, idx) => idx < 12)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' // Sample video
  }));

export const basedOnInterest = mockCourses
  .filter((_, idx) => idx >= 12 && idx < 24)
  .map(course => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' // Sample video
  }));

// Generate course data specifically for "For Your Role" section with skills
export const forYourRoleCourses = [
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
    skill: "Communication",
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
    skill: "Project Management",
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
    skill: "Decision Making",
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
    skill: "Strategic Planning",
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
    skill: "Conflict Resolution",
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
    skill: "Team Building",
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
    skill: "Problem Solving",
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
    skill: "Time Management",
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
    skill: "Delegation",
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  }
];

export const trendingCourses = [...mockCourses]
  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  .slice(0, 12)
  .map((course, idx) => ({
    ...course,
    imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', // Sample video
    title: `${idx + 1}. ${course.title}` // Add ranking to title
  }));

// New popular with similar users courses with realistic data
export const popularWithSimilarUsers = [
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
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  }
];
