
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  Star, 
  Share2, 
  Bookmark, 
  Play, 
  UserPlus,
  Volume2,
  VolumeX 
} from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  rating: number;
  trainingCategory?: string;
  isBookmarked?: boolean;
  previewUrl?: string;
  showFullTitle?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  duration,
  rating,
  trainingCategory,
  isBookmarked = false,
  previewUrl,
  showFullTitle = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse enter with delay to prevent unwanted preview triggering
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && previewUrl) {
      // Add a small delay before playing to avoid unwanted previews on quick mouse movements
      previewTimeout.current = setTimeout(() => {
        videoRef.current?.play().catch(err => console.log("Preview autoplay prevented:", err));
      }, 800);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
      previewTimeout.current = null;
    }
  };

  // Toggle mute state
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (previewTimeout.current) {
        clearTimeout(previewTimeout.current);
      }
    };
  }, []);

  return (
    <Card 
      className="w-full hover-scale overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-40 overflow-hidden">
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
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          />
        )}
        <Badge className="absolute top-2 right-2 bg-primary/80">{category}</Badge>
        {trainingCategory && (
          <Badge className="absolute top-2 left-2 bg-accent/80">{trainingCategory}</Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <h3 className={`font-semibold text-base ${showFullTitle ? '' : 'line-clamp-2'}`}>{title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-between gap-2">
          <Button variant="default" size="sm" className="gap-1 flex-1">
            <Play className="h-4 w-4" /> Watch
          </Button>
          <Button variant="outline" size="sm" className="px-2">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="px-2">
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" className="px-2">
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
