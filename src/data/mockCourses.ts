
import { Course } from '@/types/course';

// Mock course data 
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React and build modern web applications with this comprehensive guide to React development.",
    imageUrl: "/course-images/react-intro.jpg",
    category: "Web Development",
    trainingCategory: "Development",
    duration: "8 hours",
    rating: 4.8,
    learningObjectives: [
      "Understand React fundamentals and component-based architecture",
      "Build reusable function and class components",
      "Manage state and props effectively",
      "Work with React Hooks for state management",
      "Implement routing using React Router"
    ],
    skills: [
      { name: "React", proficiency: "Awareness" },
      { name: "JavaScript", proficiency: "Knowledge" },
      { name: "Web Development", proficiency: "Awareness" }
    ],
    certificates: ["React Developer - Level 1"]
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master advanced React patterns and techniques used by senior developers to build scalable, maintainable applications.",
    imageUrl: "/course-images/react-advanced.jpg",
    category: "Web Development",
    trainingCategory: "Development",
    duration: "10 hours",
    rating: 4.7,
    learningObjectives: [
      "Implement advanced React design patterns",
      "Master context API and custom hooks",
      "Build compound components",
      "Optimize performance with React.memo and useMemo",
      "Implement state management with Redux or Context"
    ],
    skills: [
      { name: "React", proficiency: "Skill" },
      { name: "JavaScript", proficiency: "Skill" },
      { name: "Web Development", proficiency: "Knowledge" }
    ],
    certificates: ["React Developer - Advanced Level"]
  },
  {
    id: "3",
    title: "Data Science Fundamentals with Python",
    description: "Introduction to data science concepts using Python. Learn to analyze data, create visualizations, and build predictive models.",
    imageUrl: "/course-images/data-science.jpg",
    category: "Data Science",
    trainingCategory: "Analytics",
    duration: "12 hours",
    rating: 4.9,
    isHot: true,
    learningObjectives: [
      "Set up a Python environment for data science",
      "Use NumPy and Pandas for data manipulation",
      "Create visualizations with Matplotlib and Seaborn",
      "Implement basic machine learning models with scikit-learn",
      "Complete a data science project from start to finish"
    ],
    skills: [
      { name: "Python", proficiency: "Knowledge" },
      { name: "Data Science", proficiency: "Awareness" },
      { name: "Machine Learning", proficiency: "Awareness" }
    ],
    certificates: ["Data Science - Fundamentals Certificate"]
  },
  {
    id: "4",
    title: "Leadership Essentials",
    description: "Develop essential leadership skills to inspire teams, manage effectively, and drive organizational success.",
    imageUrl: "/course-images/leadership.jpg",
    category: "Leadership",
    trainingCategory: "Leadership",
    duration: "6 hours",
    rating: 4.6,
    learningObjectives: [
      "Develop a personal leadership style",
      "Learn effective communication strategies",
      "Build and motivate high-performing teams",
      "Manage conflict and difficult conversations",
      "Create a culture of innovation and growth"
    ],
    skills: [
      { name: "Leadership", proficiency: "Knowledge" },
      { name: "Communication", proficiency: "Skill" },
      { name: "Team Management", proficiency: "Knowledge" }
    ],
    certificates: ["Leadership Essentials Certificate"]
  },
  {
    id: "5",
    title: "Project Management Professional",
    description: "Comprehensive training for the PMP certification with project management best practices and methodologies.",
    imageUrl: "/course-images/project-management.jpg",
    category: "Project Management",
    trainingCategory: "Management",
    duration: "25 hours",
    rating: 4.8,
    isNew: true,
    learningObjectives: [
      "Understand the PMI framework and methodology",
      "Master project initiation and planning",
      "Develop project scheduling and budgeting skills",
      "Implement risk management strategies",
      "Prepare for the PMP certification exam"
    ],
    skills: [
      { name: "Project Management", proficiency: "Skill" },
      { name: "Risk Management", proficiency: "Knowledge" },
      { name: "Leadership", proficiency: "Knowledge" }
    ],
    certificates: ["Project Management Professional (PMP) Preparation"]
  },
  {
    id: "6",
    title: "Cybersecurity Fundamentals",
    description: "Learn the core principles of cybersecurity, threat assessment, and implementing security measures.",
    imageUrl: "/course-images/cybersecurity.jpg",
    category: "Information Technology",
    trainingCategory: "IT",
    duration: "15 hours",
    rating: 4.7,
    learningObjectives: [
      "Understand fundamental security concepts and principles",
      "Identify common security threats and vulnerabilities",
      "Implement basic security controls",
      "Develop a security mindset for professional environments",
      "Learn compliance and regulatory requirements"
    ],
    skills: [
      { name: "Cybersecurity", proficiency: "Awareness" },
      { name: "IT Security", proficiency: "Awareness" },
      { name: "Risk Management", proficiency: "Awareness" }
    ],
    certificates: ["Cybersecurity Awareness Certificate"]
  },
  {
    id: "7",
    title: "Advanced Machine Learning",
    description: "Deep dive into advanced machine learning techniques including deep learning, neural networks, and AI applications.",
    imageUrl: "/course-images/machine-learning.jpg",
    category: "Data Science",
    trainingCategory: "Analytics",
    duration: "20 hours",
    rating: 4.9,
    isHot: true,
    learningObjectives: [
      "Master neural network architectures and deep learning",
      "Implement advanced algorithms like CNNs and RNNs",
      "Deploy machine learning models to production",
      "Develop custom machine learning solutions",
      "Optimize model performance and accuracy"
    ],
    skills: [
      { name: "Machine Learning", proficiency: "Skill" },
      { name: "Python", proficiency: "Skill" },
      { name: "Data Science", proficiency: "Skill" }
    ],
    certificates: ["Advanced Machine Learning Specialist"]
  },
  {
    id: "8",
    title: "Agile Scrum Master",
    description: "Comprehensive training on Agile methodologies and Scrum framework for effective project delivery.",
    imageUrl: "/course-images/agile-scrum.jpg",
    category: "Project Management",
    trainingCategory: "Management",
    duration: "12 hours",
    rating: 4.8,
    learningObjectives: [
      "Understand Agile values and principles",
      "Master the Scrum framework and ceremonies",
      "Facilitate effective Scrum events",
      "Coach development teams for high performance",
      "Prepare for Professional Scrum Master certification"
    ],
    skills: [
      { name: "Agile", proficiency: "Skill" },
      { name: "Scrum", proficiency: "Skill" },
      { name: "Project Management", proficiency: "Knowledge" }
    ],
    certificates: ["Professional Scrum Master"]
  }
];

// Function to get recommended courses based on skill name and proficiency
export const getRecommendedCourses = (skillName: string, proficiency: string, limit: number = 4): Course[] => {
  // Convert inputs to lowercase for case-insensitive comparison
  const skillNameLower = skillName.toLowerCase();
  const proficiencyLower = proficiency.toLowerCase();
  
  // First, find exact matches for both skill and proficiency
  let recommended = mockCourses.filter(course => 
    course.skills.some(skill => 
      skill.name.toLowerCase() === skillNameLower && 
      skill.proficiency.toLowerCase() === proficiencyLower
    )
  );
  
  // If not enough exact matches, add courses that match the skill name with any proficiency
  if (recommended.length < limit) {
    const skillMatches = mockCourses.filter(course => 
      !recommended.includes(course) && 
      course.skills.some(skill => skill.name.toLowerCase() === skillNameLower)
    );
    
    recommended = [...recommended, ...skillMatches];
  }
  
  // If still not enough, add courses with related skills (contains the skill name as substring)
  if (recommended.length < limit) {
    const relatedMatches = mockCourses.filter(course => 
      !recommended.includes(course) && 
      course.skills.some(skill => skill.name.toLowerCase().includes(skillNameLower) || 
                                 skillNameLower.includes(skill.name.toLowerCase()))
    );
    
    recommended = [...recommended, ...relatedMatches];
  }
  
  // If still not enough, add most popular courses
  if (recommended.length < limit) {
    const popularCourses = mockCourses
      .filter(course => !recommended.includes(course))
      .sort((a, b) => b.rating - a.rating);
    
    recommended = [...recommended, ...popularCourses];
  }
  
  // Return the top N recommended courses
  return recommended.slice(0, limit);
};
