
export interface Activity {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'h5p';
  duration: string;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  activities: Activity[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  rating: number;
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
  level?: string;
  instructor?: {
    name: string;
    avatar: string;
  };
  progress?: number;
  enrollmentStatus?: 'Not Started' | 'In Progress' | 'Completed';
  
  // Additional fields for filtering
  courseType?: 'Online Course' | 'Online Program' | 'Blended' | 'Classroom';
  academy?: string;
  subAcademy?: string;
  language?: string;
  source?: 'Internal' | 'LinkedIn' | 'CourseEra' | 'els' | 'WorkEra' | 'Skillsoft';
  topic?: string;
  skillLevel?: string;
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  
  // Rankings for trending courses
  rank?: number;
  
  // User similarity score
  similarityScore?: number;
}
