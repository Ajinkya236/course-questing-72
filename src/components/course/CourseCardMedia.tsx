
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX } from 'lucide-react';

interface CourseCardMediaProps {
  imageUrl: string;
  previewUrl?: string;
  isHovered: boolean;
  trainingCategory?: string;
  category?: string;
  isHot?: boolean;
  isNew?: boolean;
}

const CourseCardMedia: React.FC<CourseCardMediaProps> = ({
  imageUrl,
  previewUrl,
  isHovered,
  trainingCategory,
  category,
  isHot,
  isNew
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewTimeout = useRef<NodeJS.Timeout | null>(null);

  // Toggle mute state
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle video playback when component is hovered
  useEffect(() => {
    if (isHovered && videoRef.current && previewUrl) {
      // Add a small delay before playing to avoid unwanted previews on quick mouse movements
      previewTimeout.current = setTimeout(() => {
        videoRef.current?.play().catch(err => console.log("Preview autoplay prevented:", err));
      }, 800);
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    return () => {
      if (previewTimeout.current) {
        clearTimeout(previewTimeout.current);
        previewTimeout.current = null;
      }
    };
  }, [isHovered, previewUrl]);

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
          src={imageUrl || "/placeholder.svg"}
          alt="Course thumbnail"
          className="w-full h-full object-cover"
        />
      )}
      
      {/* Categories and Tags */}
      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
        {trainingCategory && (
          <Badge className="bg-primary/90">{trainingCategory}</Badge>
        )}
        {category && (
          <Badge className="bg-secondary/90">{category}</Badge>
        )}
      </div>
      
      <div className="absolute top-2 right-2 flex gap-1">
        {isHot && (
          <Badge variant="destructive">Hot</Badge>
        )}
        {isNew && (
          <Badge variant="secondary" className="bg-green-500 text-white">New</Badge>
        )}
      </div>
    </div>
  );
};

export default CourseCardMedia;
