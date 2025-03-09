
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
  toggleMute: () => void;
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
  // Default image error handler if none provided
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
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

  // Convert unsplash photo links to actual unsplash URLs if needed
  const processImageUrl = (url: string) => {
    if (!url) return "/placeholder.svg";
    
    if (url.includes("unsplash.com/photo-") && !url.includes("?")) {
      return `${url}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`;
    }
    return url;
  };

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
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </>
        ) : (
          <img
            src={processImageUrl(imageUrl)}
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
