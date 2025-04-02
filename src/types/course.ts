
export interface CourseSkill {
  name: string;
  proficiency: string;
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
  learningObjectives: string[];
  skills: CourseSkill[];
  certificates: string[];
}
