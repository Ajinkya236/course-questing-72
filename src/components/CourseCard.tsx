
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Star, 
  Share2, 
  Bookmark, 
  Play, 
  UserPlus,
  Volume2,
  VolumeX 
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CourseActionDialog from './dialogs/CourseActionDialog';

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
  isHot?: boolean;
  isNew?: boolean;
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
  isHot,
  isNew
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentBookmarked, setCurrentBookmarked] = useState(isBookmarked);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
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

  // Handle course click to navigate to course player
  const handleCourseClick = (e: React.MouseEvent) => {
    // Don't navigate if the click was on a button or if a dialog is open
    if ((e.target as HTMLElement).closest('button') || showShareDialog || showAssignDialog) {
      return;
    }
    navigate(`/course/${id}`);
  };

  // Handle watch button click
  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/course/${id}`);
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newBookmarked = !currentBookmarked;
    setCurrentBookmarked(newBookmarked);
    
    toast({
      title: newBookmarked ? "Course Saved" : "Course Removed",
      description: newBookmarked 
        ? `"${title}" has been added to your saved courses` 
        : `"${title}" has been removed from your saved courses`,
    });
  };

  // Handle share button click
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareDialog(true);
  };

  // Handle assign button click
  const handleAssignClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAssignDialog(true);
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
    <>
      <Card 
        className="w-full h-full overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCourseClick}
      >
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
              alt={title}
              className="w-full h-full object-cover"
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

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-xl leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant="default" 
                className="col-span-2 bg-[#1E40AF] hover:bg-[#1E3A8A]"
                onClick={handleWatchClick}
              >
                <Play className="h-4 w-4 mr-1" /> Watch
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShareClick}
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleBookmarkToggle}
                aria-label="Bookmark"
              >
                <Bookmark className={`h-4 w-4 ${currentBookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="col-span-1"
                onClick={handleAssignClick}
                aria-label="Assign"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Share Dialog */}
      <CourseActionDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        title={`Share "${title}"`}
        courseId={id}
        courseName={title}
        actionType="share"
      />

      {/* Assign Dialog */}
      <CourseActionDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        title={`Assign "${title}"`}
        courseId={id}
        courseName={title}
        actionType="assign"
      />
    </>
  );
};

export default CourseCard;
