
export interface Activity {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'h5p' | 'assignment' | 'article' | 'discussion' | 'interactive';
  duration: string;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  activities: Activity[];
}

export interface Instructor {
  name: string;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnail?: string;
  category: string;
  duration: string;
  rating: number;
  instructor?: Instructor | string;
  level?: string;
  isBookmarked?: boolean;
  trainingCategory?: string;
  learningObjectives?: string[];
  skills?: { name: string; proficiency: string }[];
  certificates?: string[];
  videoUrl?: string;
  modules?: Module[];
  isHot?: boolean;
  isNew?: boolean;
  createdAt?: string;
  status?: 'assigned' | 'in-progress' | 'completed' | 'saved';
  sharedBy?: string;
  previewUrl?: string; // Added for video previews
  savedAt?: string; // Added for bookmarking timestamp
  
  // These fields from CourseCarousel interface
  progress?: number;
  enrollmentStatus?: 'Not Started' | 'In Progress' | 'Completed';
  author?: string; // For backward compatibility with some components
  
  // Additional fields for filtering
  courseType?: 'Online Course' | 'Online Program' | 'Blended' | 'Classroom';
  academy?: string;
  subAcademy?: string;
  language?: string;
  source?: 'Internal' | 'LinkedIn' | 'Coursera' | 'els' | 'Skillsoft' | 'WorkEra';
  topic?: string;
  skillLevel?: string;
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  type?: 'Course' | 'Program' | 'Blended' | 'Classroom';
  
  // Rankings for trending courses
  rank?: number;
  
  // User similarity score
  similarityScore?: number;
  
  // Additional flags
  isAssigned?: boolean;
  isCompleted?: boolean;
}

export interface CourseProps extends Course {
  // CourseProps is now an extension of Course to ensure compatibility
}
