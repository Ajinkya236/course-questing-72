import { Course } from '@/types/course';

// Helper function to convert string[] skills to proper format
const formatSkills = (skills: string[]) => {
  return skills.map(skill => ({
    name: skill,
    proficiency: 'Intermediate'
  }));
};

// Create a properly typed courses array
const rawCourses = [
  {
    id: "course-001",
    title: "Introduction to Leadership",
    description: "Learn the fundamentals of effective leadership and team management.",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Leadership",
    duration: "3h 15m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Leadership",
    isHot: true,
    status: "assigned" as 'assigned',
    skills: ["Leadership", "Management", "Team Building"]
  },
  {
    id: "course-002",
    title: "Advanced Data Analysis",
    description: "Master complex data analysis techniques and visualization methods.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Data Analysis",
    duration: "5h 45m",
    rating: 4.7,
    isBookmarked: true,
    trainingCategory: "Technical",
    status: "in-progress" as 'in-progress',
    skills: ["Data Analysis", "Statistics", "Python", "Visualization"]
  },
  {
    id: "course-003",
    title: "Effective Communication Strategies",
    description: "Develop powerful communication skills for professional environments.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Communication",
    duration: "2h 30m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Soft Skills",
    isNew: true,
    status: "completed" as 'completed',
    skills: ["Communication", "Public Speaking", "Leadership"]
  },
  {
    id: "course-004",
    title: "Project Management Essentials",
    description: "Learn the core principles and methodologies of successful project management.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Project Management",
    duration: "4h 20m",
    rating: 4.6,
    isBookmarked: false,
    trainingCategory: "Management",
    status: "assigned" as 'assigned',
    skills: ["Project Management", "Agile", "Scrum", "Planning"]
  },
  {
    id: "course-005",
    title: "Marketing in the Digital Age",
    description: "Explore modern marketing strategies for the digital landscape.",
    imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Marketing",
    duration: "3h 45m",
    rating: 4.5,
    isBookmarked: true,
    trainingCategory: "Marketing",
    isHot: true,
    status: "in-progress" as 'in-progress',
    skills: ["Digital Marketing", "SEO", "Content Creation", "Analytics"]
  },
  {
    id: "course-006",
    title: "Introduction to Programming",
    description: "Start your journey into coding with this beginner-friendly course.",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Programming",
    duration: "6h 10m",
    rating: 4.7,
    isBookmarked: false,
    trainingCategory: "Technical",
    isNew: true,
    status: "completed" as 'completed',
    skills: ["Programming", "JavaScript", "HTML", "CSS"]
  },
  {
    id: "course-007",
    title: "Design Thinking Workshop",
    description: "Apply design thinking principles to solve complex problems creatively.",
    imageUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Design",
    duration: "2h 50m",
    rating: 4.8,
    isBookmarked: false,
    trainingCategory: "Creative",
    status: "assigned" as 'assigned',
    skills: ["Design Thinking", "Innovation", "Problem Solving", "Creativity"]
  },
  {
    id: "course-008",
    title: "Financial Planning Fundamentals",
    description: "Build a strong foundation in personal and business financial planning.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Finance",
    duration: "4h 15m",
    rating: 4.6,
    isBookmarked: true,
    trainingCategory: "Finance",
    status: "in-progress" as 'in-progress',
    skills: ["Finance", "Budgeting", "Investment", "Planning"]
  },
  {
    id: "course-009",
    title: "Problem Solving Masterclass",
    description: "Develop systematic approaches to solving complex problems efficiently.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Problem Solving",
    duration: "3h 20m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Soft Skills",
    isHot: true,
    status: "completed" as 'completed',
    skills: ["Problem Solving", "Critical Thinking", "Decision Making"]
  },
  {
    id: "course-010",
    title: "Critical Thinking in the Workplace",
    description: "Sharpen your analytical and critical thinking skills for better decision making.",
    imageUrl: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Critical Thinking",
    duration: "2h 40m",
    rating: 4.7,
    isBookmarked: false,
    trainingCategory: "Soft Skills",
    status: "assigned" as 'assigned',
    skills: ["Critical Thinking", "Analysis", "Decision Making", "Logic"]
  },
  {
    id: "course-011",
    title: "Building Effective Teams",
    description: "Learn strategies for developing high-performing teams in any organization.",
    imageUrl: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Teamwork",
    duration: "3h 50m",
    rating: 4.8,
    isBookmarked: true,
    trainingCategory: "Leadership",
    isNew: true,
    status: "in-progress" as 'in-progress',
    skills: ["Team Building", "Leadership", "Collaboration", "Communication"]
  },
  {
    id: "course-012",
    title: "Innovation and Creativity",
    description: "Unlock your creative potential and drive innovation in your work.",
    imageUrl: "https://images.unsplash.com/photo-1456428746267-a1756408f782?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Innovation",
    duration: "3h 10m",
    rating: 4.9,
    isBookmarked: false,
    trainingCategory: "Creative",
    status: "completed" as 'completed',
    skills: ["Creativity", "Innovation", "Design Thinking", "Ideation"]
  },
  {
    id: "course-013",
    title: "Strategic Business Planning",
    description: "Develop comprehensive business strategies for sustainable growth.",
    imageUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Strategy",
    duration: "5h 30m",
    rating: 4.7,
    isBookmarked: false,
    trainingCategory: "Management",
    isHot: true,
    status: "assigned" as 'assigned',
    skills: ["Strategic Planning", "Business Development", "Market Analysis"]
  },
  {
    id: "course-014",
    title: "Public Speaking Mastery",
    description: "Overcome fear and deliver compelling presentations with confidence.",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Communication",
    duration: "4h 00m",
    rating: 4.8,
    isBookmarked: true,
    trainingCategory: "Soft Skills",
    status: "in-progress" as 'in-progress',
    skills: ["Public Speaking", "Presentation Skills", "Confidence", "Communication"]
  },
  {
    id: "course-015",
    title: "Agile Methodology Fundamentals",
    description: "Learn the principles and practices of Agile project management.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    category: "Project Management",
    duration: "3h 45m",
    rating: 4.6,
    isBookmarked: false,
    trainingCategory: "Technical",
    isNew: true,
    status: "completed" as 'completed',
    skills: ["Agile", "Scrum", "Kanban", "Project Management"]
  }
];

// Convert the raw courses to properly typed Course objects
export const mockCourses: Course[] = rawCourses.map(course => ({
  ...course,
  skills: formatSkills(course.skills as string[])
}));

// Add this line to alias mockCourses to mockCoursesData for backward compatibility
export const mockCoursesData = mockCourses;
