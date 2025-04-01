
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  onImageError
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  
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
      // Default fallback behavior
      const target = e.target as HTMLImageElement;
      target.src = "/placeholder.svg";
      // Prevent infinite loading attempts if placeholder also fails
      target.onerror = null;
    }
  };

  // Process image URL to ensure proper loading
  const processImageUrl = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80";
    
    if (url.includes("unsplash.com/photo-") && !url.includes("?")) {
      // Add optimizations for Unsplash images
      return `${url}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`;
    }
    
    if (url.includes("source.unsplash.com")) {
      // Replace dynamic random URLs with specific images for better caching
      const unsplashImages = [
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80"
      ];
      // Use hash of the URL to select a consistent image
      const index = Math.abs(url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % unsplashImages.length;
      return unsplashImages[index];
    }
    
    return url;
  };

  // Load video on hover if available
  React.useEffect(() => {
    if (isHovered && previewUrl && videoRef.current) {
      videoRef.current.src = previewUrl;
      videoRef.current.play().catch(err => {
        console.log("Video preview failed to play:", err);
      });
    }
  }, [isHovered, previewUrl, videoRef]);

  return (
    <div className="relative overflow-hidden rounded-t-md h-[170px]">
      {/* Loading indicator */}
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      
      <AspectRatio ratio={16/9} className="h-full">
        {/* Show video preview when hovered if available */}
        {previewUrl && isHovered ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              playsInline
              loop
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full h-7 w-7 z-20"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            </Button>
          </>
        ) : (
          <img
            src={processImageUrl(imageUrl)}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{opacity: isImageLoading ? 0 : 1}}
          />
        )}
      </AspectRatio>

      {/* Category badge */}
      <div className="absolute bottom-2 left-2 z-20">
        <Badge variant="outline" className="bg-black/60 text-white border-none">
          {category}
        </Badge>
      </div>

      {/* Display Training Category if provided */}
      {trainingCategory && (
        <div className="absolute top-2 left-2 z-20">
          <Badge variant="outline" className="bg-primary/80 text-white border-none">
            {trainingCategory}
          </Badge>
        </div>
      )}

      {/* Display Hot/New badges */}
      <div className="absolute top-2 right-2 flex gap-1 z-20">
        {isHot && (
          <Badge className="bg-red-500 text-white">Hot</Badge>
        )}
        {isNew && (
          <Badge className="bg-green-500 text-white">New</Badge>
        )}
      </div>
    </div>
  );
};

export default React.memo(CourseCardMedia);
