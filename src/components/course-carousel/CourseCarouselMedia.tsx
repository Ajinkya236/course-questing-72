
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import CourseCarouselVideo from './CourseCarouselVideo';

interface CourseCarouselMediaProps {
  course: {
    id: string;
    title: string;
    imageUrl?: string;
    videoUrl?: string;
    enrollmentStatus?: string;
    trainingCategory?: string;
  };
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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.svg";
    target.onerror = null;
  };
  
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Process image URL to ensure proper loading
  const processImageUrl = (url?: string) => {
    if (!url) return "/placeholder.svg";
    
    if (url && url.includes("unsplash.com/photo-") && !url.includes("?")) {
      return `${url}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`;
    }
    return url || "/placeholder.svg";
  };

  // Get the right image URL (handling different field names)
  const getImageUrl = () => {
    return processImageUrl(course.imageUrl);
  };

  return (
    <div className="relative overflow-hidden">
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      
      <AspectRatio ratio={16/9}>
        {isHovered && course.videoUrl ? (
          <CourseCarouselVideo
            videoRef={videoRef}
            videoUrl={course.videoUrl}
            isMuted={isMuted}
            isVideoPlaying={isVideoPlaying}
            toggleMute={toggleMute}
          />
        ) : (
          <img
            src={getImageUrl()}
            alt={course.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
            loading="lazy" 
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ opacity: isImageLoaded ? 1 : 0 }}
          />
        )}
      </AspectRatio>
      
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
  );
};

export default CourseCarouselMedia;
