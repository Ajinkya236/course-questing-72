
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Share2, Bookmark, UserPlus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  isBookmarked: boolean;
  handleWatchClick: (e: React.MouseEvent) => void;
  handleShareClick: (e: React.MouseEvent) => void;
  handleBookmarkToggle: (e: React.MouseEvent) => void;
  handleAssignClick: (e: React.MouseEvent) => void;
}

const CourseCarouselMedia: React.FC<CourseCarouselMediaProps> = ({
  course,
  isHovered,
  isMuted,
  isVideoPlaying,
  videoRef,
  toggleMute,
  showTrainingCategory = false,
  isBookmarked,
  handleWatchClick,
  handleShareClick,
  handleBookmarkToggle,
  handleAssignClick
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
      
      {/* Action buttons overlay - visible on hover */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <TooltipProvider>
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="icon"
                  className="h-8 w-8 bg-primary hover:bg-primary/90 text-white"
                  onClick={handleWatchClick}
                >
                  <Play className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Watch</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={handleShareClick}
                  className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={handleBookmarkToggle}
                  className={`h-8 w-8 text-white border-white/20 ${
                    isBookmarked ? "bg-primary/80 hover:bg-primary" : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={handleAssignClick}
                  className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Assign</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      
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
