
import React from 'react';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CourseCard from '@/components/CourseCard';
import { Course } from '@/types/course';
import { useIsMobile } from '@/hooks/use-mobile';

interface NormalizedCoursesProps {
  courses: Course[];
  onCardClick: (courseId: string) => void;
  showTrainingCategory?: boolean;
}

const NormalizedCourses: React.FC<NormalizedCoursesProps> = ({ 
  courses, 
  onCardClick,
  showTrainingCategory = false
}) => {
  const isMobile = useIsMobile();
  
  // Function to ensure we have exactly 12 courses for the carousel
  const normalizeCoursesCount = (coursesArray: Course[]) => {
    if (coursesArray.length === 0) return [];
    
    // If less than 12 courses, duplicate to reach 12
    if (coursesArray.length < 12) {
      const repeatedCourses = [];
      let i = 0;
      while (repeatedCourses.length < 12) {
        repeatedCourses.push({
          ...coursesArray[i % coursesArray.length],
          id: `${coursesArray[i % coursesArray.length].id}-clone-${Math.floor(i / coursesArray.length)}`
        });
        i++;
      }
      return repeatedCourses.slice(0, 12);
    }
    
    // If more than 12 courses, take the first 12
    if (coursesArray.length > 12) {
      return coursesArray.slice(0, 12);
    }
    
    return coursesArray;
  };

  // Create a fallback for courses that don't have all required properties
  const normalizedCourses = normalizeCoursesCount(courses.map(course => ({
    ...course,
    level: course.level || course.skillLevel || 'All Levels',
    instructor: course.instructor || {
      name: 'Instructor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  })));

  return (
    <CarouselContent>
      {normalizedCourses.map((course) => (
        <CarouselItem key={course.id} className={isMobile ? "basis-full" : "basis-1/4"}>
          <CourseCard
            id={course.id}
            title={course.title}
            description={course.description}
            imageUrl={course.imageUrl}
            category={course.category}
            duration={course.duration}
            rating={course.rating}
            trainingCategory={showTrainingCategory ? course.trainingCategory : undefined}
            isBookmarked={course.isBookmarked}
            previewUrl={course.previewUrl}
            isHot={course.isHot}
            isNew={course.isNew}
          />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

export default NormalizedCourses;
