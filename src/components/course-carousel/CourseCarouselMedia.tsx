
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import CourseCarouselVideo from './CourseCarouselVideo';

interface CourseCarouselMediaProps {
  course: {
    id: string;
    title: string;
    imageUrl: string; // This needs to be required for the component
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
  const [imageError, setImageError] = useState(false);
  
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
    setImageError(true);
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80";
    target.onerror = null;
  };
  
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Get deterministic fallback image to use if no image is provided
  const getFallbackImage = (courseId: string): string => {
    const fallbackImages = [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    ];
    
    // Use the course ID to determine which image to use
    const sum = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return fallbackImages[sum % fallbackImages.length];
  };

  // Process image URL to ensure proper loading
  const getImageUrl = (url: string, courseId: string): string => {
    if (!url || url === "/placeholder.svg") {
      return getFallbackImage(courseId);
    }
    
    if (url && url.includes("unsplash.com/photo-") && !url.includes("?")) {
      return `${url}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`;
    }
    
    if (url.includes("source.unsplash.com")) {
      return getFallbackImage(courseId);
    }
    
    return url;
  };

  const imageUrl = getImageUrl(course.imageUrl, course.id);

  return (
    <div className="relative overflow-hidden">
      {!isImageLoaded && !imageError && (
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
            src={imageUrl}
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
