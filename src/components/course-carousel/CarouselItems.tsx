
import React from 'react';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/types/course';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface CarouselItemsProps {
  courses: Course[];
  onCourseClick?: (courseId: string) => void;
}

const CarouselItems: React.FC<CarouselItemsProps> = ({
  courses,
  onCourseClick,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleCardClick = (courseId: string) => {
    // Remove any clone suffix for handling clicks on duplicated courses
    const originalId = courseId.split('-clone-')[0];
    if (onCourseClick) {
      onCourseClick(originalId);
    } else {
      navigate(`/course/${originalId}`);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <CarouselContent className="-ml-2 md:-ml-4">
      {courses.map((course) => (
        <CarouselItem 
          key={course.id} 
          className={
            isMobile 
              ? "pl-2 basis-full" 
              // Show 25% of the next course by adjusting the basis percentage
              : "pl-4 basis-full md:basis-1/2 lg:basis-[30%] xl:basis-[23.5%]"
          }
        >
          <Card
            className="overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-colors group"
            onClick={() => handleCardClick(course.id)}
          >
            <div className="aspect-video relative overflow-hidden bg-muted">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
              />
              {course.enrollmentStatus && (
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(course.enrollmentStatus)} variant="secondary">
                    {course.enrollmentStatus}
                  </Badge>
                </div>
              )}
              {course.trainingCategory && (
                <div className="absolute bottom-2 left-2">
                  <Badge variant="outline" className="bg-black/60 text-white border-none">
                    {course.trainingCategory}
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-base line-clamp-1 font-medium">{course.title}</h3>
              <p className="line-clamp-2 text-xs text-muted-foreground mt-1">{course.description}</p>
            
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span>{course.duration}</span>
                <span>•</span>
                <span>{course.level || 'All Levels'}</span>
              </div>
              {course.progress !== undefined && course.progress > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

export default CarouselItems;
