
import { Course } from '@/types/course';
import { mockCourses } from '@/data/mockCoursesData';

/**
 * Prepares courses by ensuring each has required properties
 * @param courses - Array of course objects
 * @param startIdx - Starting index for slice
 * @param count - Number of courses to include
 * @returns Prepared course array with all required properties
 */
export const prepareCourses = (
  courses: any[], 
  startIdx = 0, 
  count = 12
): Course[] => {
  return courses
    .slice(startIdx, startIdx + count)
    .map((course, idx) => ({
      ...course,
      id: course.id || `course-${startIdx + idx}`,
      imageUrl: course.imageUrl || `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
      videoUrl: course.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      progress: course.progress || (course.status === 'in-progress' ? Math.floor(Math.random() * 90) + 10 : 0)
    }));
};

/**
 * Generate different course collections for the homepage
 * @returns Object containing different course collections
 */
export const generateHomepageCourseCollections = () => {
  // Filter courses for different categories
  const continueLearningCourses = prepareCourses(
    mockCourses.filter(course => course.status === 'in-progress')
  );

  const assignedCourses = prepareCourses(
    mockCourses.filter(course => course.status === 'assigned')
  );

  const chosenForYou = prepareCourses(mockCourses, 0, 12);

  const basedOnInterest = prepareCourses(mockCourses, 12, 12);

  const forYourRoleCourses = prepareCourses(mockCourses, 24, 12);

  const trendingCourses = prepareCourses(
    [...mockCourses].sort((a, b) => (b.rating || 0) - (a.rating || 0)),
    0, 12
  ).map((course, idx) => ({
    ...course,
    title: `${idx + 1}. ${course.title}` // Add ranking to title
  }));

  const popularWithSimilarUsers = prepareCourses(mockCourses, 36, 12);

  return {
    continueLearningCourses,
    assignedCourses,
    chosenForYou,
    basedOnInterest,
    forYourRoleCourses,
    trendingCourses,
    popularWithSimilarUsers
  };
};

// Mock banner data for BannerCarousel
export const mockBanners = [
  {
    id: 1,
    title: "New Leadership Course Available",
    description: "Enhance your leadership skills with our new comprehensive course",
    imageUrl: "/placeholder.svg",
    link: "/discover"
  },
  {
    id: 2,
    title: "Technical Certification Paths",
    description: "Advance your career with industry recognized certifications",
    imageUrl: "/placeholder.svg",
    link: "/discover"
  }
];

// Mock training categories for filter
export const trainingCategories = [
  'All Categories', 'Technical', 'Soft Skills', 'Leadership', 'Compliance', 
  'Product', 'Onboarding', 'Business', 'Management'
];

// Mock skills for filter
export const skillFilters = [
  'All Skills', 'JavaScript', 'React', 'Node.js', 'Python', 'Data Science', 
  'Leadership', 'Communication', 'Design', 'Product Management'
];
