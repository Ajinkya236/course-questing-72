
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRecommendations } from '@/hooks/useRecommendations';
import { Source } from '@/components/skills/knowledge/types';
import { Course } from '@/types/course';
import CourseCard from '@/components/CourseCard';

interface SkillTabContentProps {
  skill: any;
  sources: Source[];
  setSources: React.Dispatch<React.SetStateAction<Source[]>>;
  children?: React.ReactNode;
}

const SkillTabContent: React.FC<SkillTabContentProps> = ({
  skill,
  sources,
  setSources,
  children
}) => {
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const { getRecommendations, loading } = useRecommendations();

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      // Get courses related to the skill
      const courses = await getRecommendations('followed_skills', 6, [skill.id.toString()]);
      setRecommendedCourses(courses);
    };

    fetchRecommendedCourses();
  }, [skill.id, getRecommendations]);

  return (
    <div className="space-y-8">
      {children}
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended Courses</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="w-full h-60 animate-pulse">
                <div className="h-40 bg-muted rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 w-3/4 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recommendedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                imageUrl={course.imageUrl}
                category={course.category}
                duration={course.duration}
                rating={course.rating}
                trainingCategory={course.trainingCategory}
                isBookmarked={course.isBookmarked}
                previewUrl={course.previewUrl}
                videoUrl={course.videoUrl}
                isHot={course.isHot}
                isNew={course.isNew}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No courses found for this skill. Try another proficiency level.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkillTabContent;
