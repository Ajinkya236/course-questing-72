
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
  learningObjectives: string[];
  skills: { name: string; proficiency: string }[];
  certificates: string[];
  videoUrl: string;
  modules: Module[];
  isHot?: boolean;
  isNew?: boolean;
}
