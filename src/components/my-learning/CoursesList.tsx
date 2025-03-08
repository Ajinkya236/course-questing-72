
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { Course } from '@/types/course';
import { useNavigate } from 'react-router-dom';

interface CoursesListProps {
  title: string;
  courses: Course[];
  activeFilter: string;
  onViewAllClick?: () => void;
}

const CoursesList: React.FC<CoursesListProps> = ({ 
  title, 
  courses, 
  activeFilter,
  onViewAllClick
}) => {
  const navigate = useNavigate();
  
  const handleNavigateToDiscover = () => {
    navigate('/discover');
  };

  return (
    <div>
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map(course => (
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
              previewUrl={course.previewUrl || ''}
              isHot={course.isHot}
              isNew={course.isNew}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <BookOpen className="h-12 w-12 text-muted mb-4" />
            <h3 className="text-lg font-medium">No courses found</h3>
            <p className="text-muted-foreground text-center max-w-md mt-2">
              {activeFilter === 'in-progress' ? "You don't have any courses in progress." :
               activeFilter === 'assigned' ? "You don't have any courses assigned." :
               activeFilter === 'completed' ? "You haven't completed any courses yet." :
               activeFilter === 'saved' ? "You haven't saved any courses." :
               "No courses have been shared with you."
              }
            </p>
            {activeFilter !== 'all' && (
              <Button variant="outline" className="mt-4" onClick={onViewAllClick}>
                View All Courses
              </Button>
            )}
            
            <Button 
              variant="default" 
              className="mt-4" 
              onClick={handleNavigateToDiscover}
            >
              Explore Courses
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoursesList;
