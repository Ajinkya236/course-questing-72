
import { Course } from '@/types/course';

// Generate recommended courses based on skill name and proficiency
export const getRecommendedCourses = (skillName: string, proficiency: string): Course[] => {
  // This is a mock function that would normally fetch from an API
  // Create mock courses based on the skill and proficiency
  const defaultObjectives = [
    "Understand core concepts",
    "Apply knowledge in practical scenarios",
    "Master advanced techniques"
  ];
  
  const defaultSkills = [
    { name: skillName, proficiency: proficiency }
  ];
  
  const defaultCertificates = [
    `${skillName} Fundamentals Certificate`,
    `Advanced ${skillName} Certificate`
  ];

  // Generate a set of mock courses
  return [
    {
      id: `${skillName.toLowerCase().replace(/\s+/g, '-')}-101`,
      title: `Introduction to ${skillName}`,
      description: `Learn the fundamentals of ${skillName} with this comprehensive introductory course designed for ${proficiency} level.`,
      imageUrl: `https://source.unsplash.com/random/800x450/?${skillName.toLowerCase()},learning`,
      category: "Fundamentals",
      trainingCategory: "Technical",
      duration: "3h 45m",
      rating: 4.8,
      isBookmarked: false,
      isHot: true,
      isNew: false,
      learningObjectives: defaultObjectives,
      skills: defaultSkills,
      certificates: defaultCertificates,
    },
    {
      id: `${skillName.toLowerCase().replace(/\s+/g, '-')}-201`,
      title: `Advanced ${skillName} Techniques`,
      description: `Take your ${skillName} skills to the next level with advanced techniques and real-world applications.`,
      imageUrl: `https://source.unsplash.com/random/800x450/?${skillName.toLowerCase()},advanced`,
      category: "Advanced",
      trainingCategory: "Technical",
      duration: "5h 30m",
      rating: 4.7,
      isBookmarked: true,
      isHot: false,
      isNew: true,
      learningObjectives: [...defaultObjectives, "Implement best practices", "Troubleshoot complex issues"],
      skills: defaultSkills,
      certificates: defaultCertificates,
    },
    {
      id: `${skillName.toLowerCase().replace(/\s+/g, '-')}-301`,
      title: `${skillName} in Practice: Case Studies`,
      description: `Learn how industry professionals apply ${skillName} to solve real-world problems through detailed case studies.`,
      imageUrl: `https://source.unsplash.com/random/800x450/?${skillName.toLowerCase()},case-study`,
      category: "Case Studies",
      trainingCategory: "Business",
      duration: "4h 15m",
      rating: 4.9,
      isBookmarked: false,
      isHot: false,
      isNew: false,
      learningObjectives: [...defaultObjectives, "Analyze real-world applications"],
      skills: defaultSkills,
      certificates: defaultCertificates,
    },
    {
      id: `${skillName.toLowerCase().replace(/\s+/g, '-')}-401`,
      title: `${skillName} Certification Preparation`,
      description: `Prepare for professional ${skillName} certification with this comprehensive exam preparation course.`,
      imageUrl: `https://source.unsplash.com/random/800x450/?${skillName.toLowerCase()},certification`,
      category: "Certification",
      trainingCategory: "Professional Development",
      duration: "6h 20m",
      rating: 4.6,
      isBookmarked: true,
      isHot: true,
      isNew: false,
      learningObjectives: ["Pass certification exam", "Demonstrate professional expertise"],
      skills: defaultSkills,
      certificates: [...defaultCertificates, `${skillName} Professional Certification`],
    }
  ];
};

export default getRecommendedCourses;
