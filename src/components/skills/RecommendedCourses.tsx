
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Course } from '@/types/course';
import { getRecommendedCourses } from '@/data/mockCourses';
import { Loader2 } from 'lucide-react';
import CourseCarousel from '@/components/course-carousel';

interface RecommendedCoursesProps {
  skillName: string;
  selectedProficiency: string;
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({
  skillName,
  selectedProficiency
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of course data
    setIsLoading(true);
    
    setTimeout(() => {
      const recommendedCourses = getRecommendedCourses(skillName, selectedProficiency);
      setCourses(recommendedCourses);
      setIsLoading(false);
    }, 800); // Simulate API call delay
  }, [skillName, selectedProficiency]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recommended Courses</CardTitle>
        <CardDescription>
          Courses to help you master {skillName} at {selectedProficiency} level
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : courses.length > 0 ? (
          <CourseCarousel 
            title="" 
            courses={courses}
            hideHeader={true}
          />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No courses found for {skillName} at {selectedProficiency} level.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedCourses;
