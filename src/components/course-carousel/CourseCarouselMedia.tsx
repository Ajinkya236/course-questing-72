
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { Course } from '@/types/course';

interface CourseCarouselMediaProps {
  course: Course;
  isHovered: boolean;
  isMuted: boolean;
  isVideoPlaying: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  toggleMute: (e: React.MouseEvent) => void;
  showTrainingCategory?: boolean;
}

const CourseCarouselMedia: React.FC<CourseCarouselMediaProps> = ({
  course,
  isHovered,
  isMuted,
  isVideoPlaying,
  videoRef,
  toggleMute,
  showTrainingCategory = false
}) => {
  // Use a placeholder if image is missing or broken
  const placeholderImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80";
  
  // Function to handle image load errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = placeholderImage;
  };

  return (
    <div className="relative w-full h-[150px] overflow-hidden rounded-t-lg bg-muted/20">
      {/* Video preview (shown on hover if available) */}
      {course.videoUrl && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered && isVideoPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          muted={isMuted}
          playsInline
          preload="none"
        />
      )}
      
      {/* Static image (shown by default or if no video) */}
      <img
        src={course.imageUrl || placeholderImage}
        alt={course.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isHovered && isVideoPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
      />
      
      {/* Category badge */}
      {showTrainingCategory && course.trainingCategory && (
        <Badge 
          className="absolute top-2 left-2 z-10 bg-primary/80 hover:bg-primary text-white"
          variant="default"
        >
          {course.trainingCategory}
        </Badge>
      )}
      
      {/* Video controls */}
      {course.videoUrl && isHovered && (
        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-7 w-7 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
          </Button>
        </div>
      )}
      
      {/* Play button overlay (when not playing) */}
      {course.videoUrl && isHovered && !isVideoPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-5">
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <Play className="h-8 w-8 text-white" fill="white" />
          </div>
        </div>
      )}
      
      {/* Progress indicator (if in progress) */}
      {course.progress !== undefined && course.progress > 0 && course.progress < 100 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted z-10">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${course.progress}%` }}
          />
        </div>
      )}
      
      {/* Completed indicator */}
      {course.progress === 100 && (
        <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 z-10">
          <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
            Completed
          </Badge>
        </div>
      )}
    </div>
  );
};

export default CourseCarouselMedia;
