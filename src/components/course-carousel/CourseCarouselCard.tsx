
import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Share2, Bookmark, UserPlus } from 'lucide-react';
import { Course } from '@/types/course';

interface CourseCarouselCardProps {
  course: Course;
  hoveredCourseId: string | null;
  handleCardClick: (courseId: string) => void;
  handleShareClick: (e: React.MouseEvent, courseId: string) => void;
  handleBookmarkToggle: (e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => void;
  handleAssignClick: (e: React.MouseEvent, courseId: string) => void;
  showTrainingCategory?: boolean;
}

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

const CourseCarouselCard: React.FC<CourseCarouselCardProps> = ({
  course,
  hoveredCourseId,
  handleCardClick,
  handleShareClick,
  handleBookmarkToggle,
  handleAssignClick,
  showTrainingCategory = false
}) => {
  // Define an optimized click handler to prevent event propagation
  const onCardClick = (e: React.MouseEvent) => {
    // Don't navigate if the click was on a button
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
      return;
    }
    handleCardClick(course.id);
  };

  // Fix image loading by adding fallback error handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.svg";
  };

  return (
    <Card
      className="overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-colors group mb-2"
      onClick={onCardClick}
    >
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img
          src={course.imageUrl || "/placeholder.svg"}
          alt={course.title}
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
          loading="lazy" 
          onError={handleImageError}
        />
        {course.enrollmentStatus && (
          <div className="absolute top-2 right-2">
            <Badge className={getStatusColor(course.enrollmentStatus)} variant="secondary">
              {course.enrollmentStatus}
            </Badge>
          </div>
        )}
        {showTrainingCategory && course.trainingCategory && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-black/60 text-white border-none">
              {course.trainingCategory}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-2">
        <CardTitle className="text-sm line-clamp-1">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.level || 'All Levels'}</span>
        </div>
        {course.progress !== undefined && (
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
        
        {/* Course actions that appear on hover */}
        <div className={`pt-2 ${hoveredCourseId === course.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
          <div className="flex gap-2 mb-2">
            <Button 
              variant="default" 
              className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] h-7 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(course.id);
              }}
            >
              <Play className="h-3 w-3 mr-1" /> Watch
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={(e) => handleShareClick(e, course.id)}
              aria-label="Share"
              className="h-7 w-7"
            >
              <Share2 className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={(e) => handleBookmarkToggle(e, course.id, course.title, !!course.isBookmarked)}
              aria-label="Bookmark"
              className="h-7 w-7"
            >
              <Bookmark className={`h-3 w-3 ${course.isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
          <Button 
            variant="outline" 
            className="w-full h-7 text-xs"
            onClick={(e) => handleAssignClick(e, course.id)}
          >
            <UserPlus className="h-3 w-3 mr-1" /> Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Memoize the component to prevent unnecessary renders
export default memo(CourseCarouselCard);
