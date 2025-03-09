
import React, { memo } from 'react';
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
  // Enhanced image error handler with better fallback mechanism
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (onImageError) {
      onImageError(e);
    } else {
      // Improved fallback behavior with better error handling
      const target = e.target as HTMLImageElement;
      console.log("Image failed to load:", target.src);
      
      // Try loading from placeholder if not already
      if (!target.src.includes("placeholder.svg")) {
        target.src = "/placeholder.svg";
        // Prevent infinite loading attempts if placeholder also fails
        target.onerror = null;
      }
    }
  };

  // Enhanced image URL processing with better handling
  const processImageUrl = (url: string) => {
    if (!url || url === "") {
      console.log("Empty image URL, using placeholder");
      return "/placeholder.svg";
    }
    
    try {
      // Handle Unsplash URLs to ensure proper sizing and format
      if (url.includes("unsplash.com/photo-") && !url.includes("?")) {
        return `${url}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`;
      }
      
      // Handle relative URLs
      if (url.startsWith("/") && !url.startsWith("//")) {
        return url; // Already a proper relative URL
      }
      
      return url;
    } catch (err) {
      console.error("Error processing image URL:", err);
      return "/placeholder.svg";
    }
  };

  // Load video on hover if available - improved with better error handling
  React.useEffect(() => {
    if (isHovered && previewUrl && videoRef.current) {
      try {
        videoRef.current.src = previewUrl;
        videoRef.current.load();
        videoRef.current.play().catch(err => {
          console.log("Video preview failed to play:", err);
        });
      } catch (error) {
        console.error("Error setting up video:", error);
      }
    }
  }, [isHovered, previewUrl, videoRef]);

  // Ensure imageUrl is properly processed before rendering
  const finalImageUrl = processImageUrl(imageUrl);

  return (
    <div className="relative overflow-hidden bg-muted rounded-t-md">
      <AspectRatio ratio={16/9}>
        {/* Show video preview when hovered if available */}
        {previewUrl && isHovered ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              playsInline
              loop
              preload="metadata"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full h-7 w-7"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            </Button>
          </>
        ) : (
          <img
            src={finalImageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
            loading="lazy"
            onError={handleImageError}
          />
        )}
      </AspectRatio>

      {/* Category badge */}
      <div className="absolute bottom-2 left-2">
        <Badge variant="outline" className="bg-black/60 text-white border-none">
          {category}
        </Badge>
      </div>

      {/* Display Training Category if provided */}
      {trainingCategory && (
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-primary/80 text-white border-none">
            {trainingCategory}
          </Badge>
        </div>
      )}

      {/* Display Hot/New badges */}
      <div className="absolute top-2 right-2 flex gap-1">
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

export default memo(CourseCardMedia);
