
import React, { memo, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Course } from '@/types/course';
import CourseCarouselMedia from './CourseCarouselMedia';
import CourseProgressBar from './CourseProgressBar';
import CourseActions from './CourseActions';
import { BadgeCheck, Clock, BarChart2, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CourseCarouselCardProps {
  course: Course;
  hoveredCourseId: string | null;
  handleCardClick: (courseId: string) => void;
  handleShareClick: (e: React.MouseEvent, courseId: string) => void;
  handleBookmarkToggle: (e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => void;
  handleAssignClick: (e: React.MouseEvent, courseId: string) => void;
  showTrainingCategory?: boolean;
}

const CourseCarouselCard: React.FC<CourseCarouselCardProps> = ({
  course,
  hoveredCourseId,
  handleCardClick,
  handleShareClick,
  handleBookmarkToggle,
  handleAssignClick,
  showTrainingCategory = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Define an optimized click handler to prevent event propagation
  const onCardClick = (e: React.MouseEvent) => {
    // Don't navigate if the click was on a button
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
      return;
    }
    handleCardClick(course.id);
  };

  // Handle video mute toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle mouse enter/leave for hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && course.videoUrl) {
      videoRef.current.src = course.videoUrl;
      videoRef.current.play()
        .then(() => setIsVideoPlaying(true))
        .catch(err => console.log("Video play prevented:", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Format skills for display
  const formatSkills = () => {
    if (!course.skills || course.skills.length === 0) return null;
    
    // Extract skill names to display in badge
    const skillNames = Array.isArray(course.skills) 
      ? course.skills.map(skill => typeof skill === 'string' ? skill : skill.name).slice(0, 2)
      : [];
      
    return skillNames.length > 0 ? (
      <div className="flex flex-wrap gap-1 mt-1">
        {skillNames.map(skill => (
          <Badge key={skill} variant="outline" className="text-xs bg-primary/5 hover:bg-primary/10">
            {skill}
          </Badge>
        ))}
        {Array.isArray(course.skills) && course.skills.length > 2 && (
          <Badge variant="outline" className="text-xs bg-secondary/30">
            +{course.skills.length - 2}
          </Badge>
        )}
      </div>
    ) : null;
  };

  return (
    <Card
      className="overflow-hidden h-full max-h-[330px] cursor-pointer hover:border-primary/50 transition-all duration-300 group mb-3 hover:shadow-md carousel-card"
      onClick={onCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CourseCarouselMedia
        course={course}
        isHovered={isHovered}
        isMuted={isMuted}
        isVideoPlaying={isVideoPlaying}
        videoRef={videoRef}
        toggleMute={toggleMute}
        showTrainingCategory={showTrainingCategory}
      />
      
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm line-clamp-1 mr-2">{course.title}</CardTitle>
          {course.isHot && (
            <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">HOT</Badge>
          )}
          {course.isNew && !course.isHot && (
            <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">NEW</Badge>
          )}
        </div>
        
        <CardDescription className="line-clamp-2 text-xs min-h-[2rem] mt-1">
          {course.description}
        </CardDescription>
        
        {formatSkills()}
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <Clock className="h-3 w-3" />
          <span>{course.duration}</span>
          {course.level && (
            <>
              <span>•</span>
              <BarChart2 className="h-3 w-3" />
              <span>{course.level}</span>
            </>
          )}
          {course.rating && course.rating > 4.5 && (
            <>
              <span>•</span>
              <Award className="h-3 w-3 text-amber-500" />
              <span className="font-medium">{course.rating.toFixed(1)}</span>
            </>
          )}
        </div>
        
        {course.progress !== undefined && (
          <CourseProgressBar progress={course.progress} />
        )}
        
        <div className="mt-2">
          <CourseActions
            isBookmarked={!!course.isBookmarked}
            handleShareClick={(e) => handleShareClick(e, course.id)}
            handleBookmarkToggle={(e) => handleBookmarkToggle(e, course.id, course.title, !!course.isBookmarked)}
            handleAssignClick={(e) => handleAssignClick(e, course.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Memoize the component to prevent unnecessary renders
export default memo(CourseCarouselCard);
