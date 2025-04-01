
import { Award, BrainCircuit, Lightbulb, TrendingUp, Rocket, Code, Database, Shield, Network, Cloud, BookOpen, PenTool, Zap, Users, Globe } from 'lucide-react';
import { Skill } from '@/components/skills/types';

// Expanded mock skills data with more entries and categories
export const mockSkills: Skill[] = [
  // Role-based skills
  { id: 1, name: "Leadership", proficiency: "Knowledge", category: "role", icon: "Award", description: "Leadership skills for managing teams and projects", courses: [] },
  { id: 2, name: "Project Management", proficiency: "Skill", category: "role", icon: "BrainCircuit", description: "Managing projects from initiation to completion", courses: [] },
  { id: 3, name: "Data Analysis", proficiency: "Awareness", category: "role", icon: "Lightbulb", description: "Analyzing and interpreting complex data sets", courses: [] },
  { id: 4, name: "Presentation Skills", proficiency: "Knowledge", category: "role", icon: "Award", description: "Effectively presenting information to various audiences", courses: [] },
  { id: 5, name: "Agile Methodologies", proficiency: "Skill", category: "role", icon: "Rocket", description: "Implementing agile practices in software development", courses: [] },
  { id: 6, name: "Strategic Planning", proficiency: "Awareness", category: "role", icon: "BrainCircuit", description: "Developing long-term strategies for business growth", courses: [] },
  { id: 7, name: "Team Building", proficiency: "Knowledge", category: "role", icon: "Users", description: "Building and nurturing effective teams", courses: [] },
  { id: 8, name: "Business Analytics", proficiency: "Awareness", category: "role", icon: "TrendingUp", description: "Using data to drive business decisions", courses: [] },
  
  // Recommended skills
  { id: 9, name: "Machine Learning", proficiency: "Awareness", category: "recommended", icon: "BrainCircuit", description: "Fundamentals of machine learning algorithms and applications", courses: [] },
  { id: 10, name: "React Development", proficiency: "Knowledge", category: "recommended", icon: "Rocket", description: "Building web applications with React", courses: [] },
  { id: 11, name: "UX Design", proficiency: "Awareness", category: "recommended", icon: "Lightbulb", description: "Creating user-centered digital experiences", courses: [] },
  { id: 12, name: "Python Programming", proficiency: "Skill", category: "recommended", icon: "Code", description: "Programming with Python for various applications", courses: [] },
  { id: 13, name: "SQL", proficiency: "Knowledge", category: "recommended", icon: "Database", description: "Database querying and management with SQL", courses: [] },
  { id: 14, name: "API Development", proficiency: "Awareness", category: "recommended", icon: "Code", description: "Building and consuming APIs", courses: [] },
  { id: 15, name: "Digital Marketing", proficiency: "Knowledge", category: "recommended", icon: "Globe", description: "Marketing strategies for digital platforms", courses: [] },
  { id: 16, name: "Content Creation", proficiency: "Awareness", category: "recommended", icon: "PenTool", description: "Creating engaging content for various platforms", courses: [] },
  
  // Trending skills
  { id: 17, name: "Cloud Computing", proficiency: "Skill", category: "trending", icon: "TrendingUp", description: "Working with cloud platforms and services", courses: [] },
  { id: 18, name: "Cybersecurity", proficiency: "Awareness", category: "trending", icon: "BrainCircuit", description: "Protecting systems and data from cyber threats", courses: [] },
  { id: 19, name: "DevOps", proficiency: "Knowledge", category: "trending", icon: "Rocket", description: "Integrating development and operations", courses: [] },
  { id: 20, name: "Blockchain", proficiency: "Awareness", category: "trending", icon: "TrendingUp", description: "Understanding blockchain technology and applications", courses: [] },
  { id: 21, name: "Artificial Intelligence", proficiency: "Knowledge", category: "trending", icon: "BrainCircuit", description: "Applications of AI in business and technology", courses: [] },
  { id: 22, name: "Data Science", proficiency: "Skill", category: "trending", icon: "Database", description: "Extracting insights from data", courses: [] },
  { id: 23, name: "IoT Development", proficiency: "Awareness", category: "trending", icon: "Network", description: "Building Internet of Things solutions", courses: [] },
  { id: 24, name: "Serverless Architecture", proficiency: "Knowledge", category: "trending", icon: "Cloud", description: "Building applications without managing servers", courses: [] },
  { id: 25, name: "Automated Testing", proficiency: "Skill", category: "trending", icon: "Zap", description: "Implementing automated testing for software quality", courses: [] },
  { id: 26, name: "Container Orchestration", proficiency: "Awareness", category: "trending", icon: "Network", description: "Managing containerized applications with tools like Kubernetes", courses: [] },
  { id: 27, name: "Microservices", proficiency: "Knowledge", category: "trending", icon: "Code", description: "Designing and implementing microservice architectures", courses: [] },
  { id: 28, name: "Natural Language Processing", proficiency: "Awareness", category: "trending", icon: "BrainCircuit", description: "Processing and analyzing natural language data", courses: [] },
  { id: 29, name: "Big Data", proficiency: "Skill", category: "trending", icon: "Database", description: "Working with large, complex datasets", courses: [] },
  { id: 30, name: "Cloud Security", proficiency: "Knowledge", category: "trending", icon: "Shield", description: "Securing cloud infrastructure and applications", courses: [] }
];

// Helper function to get icon component by name
export const getIconByName = (iconName: string) => {
  switch(iconName) {
    case 'Award': return Award;
    case 'BrainCircuit': return BrainCircuit;
    case 'Lightbulb': return Lightbulb;
    case 'Rocket': return Rocket;
    case 'TrendingUp': return TrendingUp;
    case 'Code': return Code;
    case 'Database': return Database;
    case 'Shield': return Shield;
    case 'Network': return Network;
    case 'Cloud': return Cloud;
    case 'BookOpen': return BookOpen;
    case 'PenTool': return PenTool;
    case 'Zap': return Zap;
    case 'Users': return Users;
    case 'Globe': return Globe;
    default: return BrainCircuit;
  }
};

// Proficiency color mapping
export const proficiencyColors = {
  "Awareness": "bg-blue-100 text-blue-800",
  "Knowledge": "bg-purple-100 text-purple-800",
  "Skill": "bg-green-100 text-green-800",
  "Mastery": "bg-orange-100 text-orange-800",
};
