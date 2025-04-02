
export interface CourseSkill {
  name: string;
  proficiency: string;
}

export interface Activity {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'h5p' | 'assignment' | 'article' | 'discussion' | 'interactive';
  duration: string;
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  activities: Activity[];
}

export interface CourseInstructor {
  name: string;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  trainingCategory?: string;
  duration: string;
  rating: number;
  isBookmarked?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  previewUrl?: string;
  videoUrl?: string;
  thumbnail?: string;
  learningObjectives?: string[];
  skills?: CourseSkill[];
  certificates?: string[];
  
  // Additional properties needed by various components
  level?: string;
  skillLevel?: string;
  progress?: number;
  status?: 'assigned' | 'in-progress' | 'completed' | 'saved';
  savedAt?: string;
  modules?: CourseModule[];
  instructor?: CourseInstructor;
}
