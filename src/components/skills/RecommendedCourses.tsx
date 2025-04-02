
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Course } from '@/types/course';
import { getRecommendedCourses } from '@/data/mockCourses';
import { Loader2 } from 'lucide-react';
import CourseCard from '@/components/ui/CourseCard';

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="h-full">
                <CourseCard
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  imageUrl={course.imageUrl || "https://placehold.co/600x400?text=Course"}
                  category={course.category}
                  duration={course.duration}
                  rating={course.rating}
                  isHot={course.isHot}
                  isNew={course.isNew}
                />
              </div>
            ))}
          </div>
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
