
import { Course, CourseSkill } from '@/types/course';

// Default values for required Course properties
const DEFAULT_LEARNING_OBJECTIVES = [
  "Understand core concepts", 
  "Apply knowledge in practical scenarios",
  "Master advanced techniques"
];

const DEFAULT_SKILLS: CourseSkill[] = [
  { name: "General", proficiency: "Beginner" }
];

const DEFAULT_CERTIFICATES = [
  "Course Completion Certificate"
];

/**
 * Ensures a course object has all required properties
 * This is useful for preventing TypeScript errors when working with partial course data
 */
export const ensureCompleteCoursData = (partialCourse: Partial<Course>): Course => {
  return {
    // Required properties with defaults if not provided
    id: partialCourse.id || `course-${Date.now()}`,
    title: partialCourse.title || "Untitled Course",
    description: partialCourse.description || "No description available",
    imageUrl: partialCourse.imageUrl || "https://placehold.co/600x400?text=Course",
    category: partialCourse.category || "General",
    duration: partialCourse.duration || "1h",
    rating: partialCourse.rating !== undefined ? partialCourse.rating : 4.0,
    learningObjectives: partialCourse.learningObjectives || DEFAULT_LEARNING_OBJECTIVES,
    skills: partialCourse.skills || DEFAULT_SKILLS,
    certificates: partialCourse.certificates || DEFAULT_CERTIFICATES,
    
    // Optional properties
    ...partialCourse
  };
};

/**
 * Converts an array of partial course objects to complete Course objects
 */
export const ensureCompleteCourseArray = (partialCourses: Partial<Course>[]): Course[] => {
  return partialCourses.map(course => ensureCompleteCoursData(course));
};
