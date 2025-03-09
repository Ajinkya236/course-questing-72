
import React, { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX } from "lucide-react";

interface CourseCardMediaProps {
  title: string;
  imageUrl: string;
  category?: string;
  trainingCategory?: string;
  isHot?: boolean;
  isNew?: boolean;
  previewUrl?: string;
  isHovered: boolean;
  isMuted: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  toggleMute: (e: React.MouseEvent) => void;
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
  toggleMute
}) => {
  // Placeholder image for fallback
  const placeholderImage = "/placeholder.svg";
  
  // Pick a random Unsplash image if imageUrl doesn't start with http
  // This ensures we always have a valid image URL
  const fallbackImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80"
  ];
  
  const effectiveImageUrl = imageUrl && imageUrl.startsWith('http') 
    ? imageUrl 
    : fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  return (
    <div className="relative aspect-video overflow-hidden">
      {previewUrl && isHovered ? (
        <>
          <video 
            ref={videoRef}
            src={previewUrl} 
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
          />
          <Button 
            onClick={toggleMute} 
            variant="secondary" 
            size="icon" 
            className="absolute bottom-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/70"
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
          </Button>
        </>
      ) : (
        <img
          src={effectiveImageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy" 
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = placeholderImage;
            console.log(`Image load error for ${title}, using placeholder instead`);
          }}
        />
      )}

      {/* Category badges */}
      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
        {category && (
          <Badge 
            variant="secondary" 
            className="bg-primary text-white rounded-full font-medium"
          >
            {category}
          </Badge>
        )}
        {trainingCategory && (
          <Badge 
            variant="secondary" 
            className="bg-[#4263EB] text-white rounded-full font-medium"
          >
            {trainingCategory}
          </Badge>
        )}
      </div>
      
      {/* Hot/New badges */}
      {(isHot || isNew) && (
        <div className="absolute top-3 right-3">
          {isHot && (
            <Badge className="bg-orange-500 text-white rounded-full font-medium">
              Hot
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-green-500 text-white rounded-full font-medium">
              New
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(CourseCardMedia);
