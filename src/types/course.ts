
export interface Instructor {
  name: string;
  avatar: string;
  title?: string;
  bio?: string;
}

export interface Module {
  id: string;
  title: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment' | 'article' | 'discussion' | 'interactive' | 'h5p';
  duration: string;
  status?: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  isCompleted?: boolean;
  completed?: boolean;
  description?: string;
  content?: string;
}

export interface Skill {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  imageUrl?: string;
  duration: string;
  instructor: Instructor | string;
  level: string;
  category: string;
  progress?: number;
  rating: number;
  isBookmarked?: boolean;
  isAssigned?: boolean;
  isCompleted?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  status?: 'not-started' | 'in-progress' | 'completed' | 'assigned' | 'saved';
  source?: 'Internal' | 'Coursera' | 'LinkedIn' | 'CourseEra' | 'WorkEra' | 'els' | 'Skillsoft';
  type?: string;
  trainingCategory?: string;
  skill?: string;
  skillLevel?: string;
  videoUrl?: string;
  previewUrl?: string;
  activities?: Activity[];
  modules?: Module[];
  author?: string;
  savedAt?: string;
  enrollmentStatus?: string;
  learningObjectives?: string[];
  skills?: Skill[];
  certificates?: string[];
}

// CourseProps for CourseCard component compatibility
export interface CourseProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  imageUrl?: string;
  duration: string;
  instructor: string;
  level: string;
  category: string;
  progress?: number;
  rating: number;
  isBookmarked?: boolean;
  isAssigned?: boolean;
  isCompleted?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  status?: 'not-started' | 'in-progress' | 'completed' | 'assigned' | 'saved';
  source?: 'Internal' | 'Coursera' | 'LinkedIn' | 'CourseEra' | 'WorkEra' | 'els' | 'Skillsoft';
  type?: string;
  trainingCategory?: string;
  skill?: string;
  videoUrl?: string;
}

export interface CourseFilterOptions {
  category?: string;
  level?: string;
  source?: string;
  duration?: string;
  rating?: number;
  status?: string;
  trainingCategory?: string;
}
