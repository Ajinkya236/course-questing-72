
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Share2, Bookmark, UserPlus } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CourseCardMediaProps {
  title: string;
  imageUrl: string;
  category: string;
  trainingCategory?: string;
  isHot?: boolean;
  isNew?: boolean;
  previewUrl?: string;
  isHovered: boolean;
  isMuted: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  toggleMute: (e: React.MouseEvent) => void;
  onImageError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  isBookmarked: boolean;
  handleWatchClick: (e: React.MouseEvent) => void;
  handleShareClick: (e: React.MouseEvent) => void;
  handleBookmarkToggle: (e: React.MouseEvent) => void;
  handleAssignClick: (e: React.MouseEvent) => void;
}

const CourseCardMedia: React.FC<CourseCardMediaProps> = ({
  title,
  imageUrl,
  category,
  trainingCategory,
  isHot,
  isNew,
  previewUrl,
  isHovered,
  isMuted,
  videoRef,
  toggleMute,
  onImageError,
  isBookmarked,
  handleWatchClick,
  handleShareClick,
  handleBookmarkToggle,
  handleAssignClick
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  // Handle image loading state
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Default image error handler if none provided
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsImageLoading(false);
    if (onImageError) {
      onImageError(e);
    } else {
      const target = e.target as HTMLImageElement;
      target.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80";
      target.onerror = null;
    }
  };

  // Video event handlers
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // Process image URL to ensure it loads properly
  const processedImageUrl = imageUrl || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80";

  return (
    <div className="relative overflow-hidden">
      <AspectRatio ratio={16/9} className="bg-muted/20">
        {/* Loading indicator */}
        {isImageLoading && !isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}
        
        {/* Video preview when hovered and previewUrl exists */}
        {isHovered && previewUrl && (
          <div className="absolute inset-0 z-10">
            <video
              ref={videoRef}
              src={previewUrl}
              className="w-full h-full object-cover"
              muted={isMuted}
              autoPlay
              loop
              playsInline
              onLoadedData={handleVideoLoad}
            />
            
            {/* Mute/Unmute button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </Button>
          </div>
        )}
        
        {/* Thumbnail image (always rendered as fallback) */}
        <img
          src={processedImageUrl}
          alt={title}
          className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${
            isHovered && previewUrl && isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
        
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
                    className="h-10 w-10 bg-primary hover:bg-primary/90 text-white"
                    onClick={handleWatchClick}
                  >
                    <Play className="h-4 w-4" />
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
                    className="h-10 w-10 bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <Share2 className="h-4 w-4" />
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
                    className={`h-10 w-10 text-white border-white/20 ${
                      isBookmarked ? "bg-primary/80 hover:bg-primary" : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
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
                    className="h-10 w-10 bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Assign</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </AspectRatio>
      
      {/* Status badges */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
        {isHot && (
          <Badge className="bg-red-500 text-white border-none">Hot</Badge>
        )}
        {isNew && (
          <Badge className="bg-blue-500 text-white border-none">New</Badge>
        )}
      </div>
      
      {/* Category badge */}
      <div className="absolute bottom-2 left-2">
        <Badge variant="outline" className="bg-black/60 text-white border-none">
          {category}
        </Badge>
      </div>
      
      {/* Training category if provided */}
      {trainingCategory && (
        <div className="absolute bottom-2 right-2">
          <Badge variant="outline" className="bg-primary/80 text-white border-none">
            {trainingCategory}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default CourseCardMedia;
