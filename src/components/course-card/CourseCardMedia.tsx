
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  VolumeX, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  UserPlus,
  Save
} from "lucide-react";

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
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  isBookmarked: boolean;
  handleWatchClick: (e: React.MouseEvent) => void;
  handleShareClick: (e: React.MouseEvent) => void;
  handleBookmarkToggle: (e: React.MouseEvent) => void;
  handleAssignClick: (e: React.MouseEvent) => void;
  handleSaveClick: (e: React.MouseEvent) => void;
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
  handleAssignClick,
  handleSaveClick
}) => {
  return (
    <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Video or Image */}
      {isHovered && previewUrl ? (
        <video
          ref={videoRef}
          src={previewUrl}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
      ) : (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300"
          onError={onImageError}
        />
      )}

      {/* Badges */}
      <div className="absolute top-2 left-2 flex gap-1">
        {isHot && (
          <Badge variant="destructive" className="text-xs font-bold bg-red-500 text-white">
            HOT
          </Badge>
        )}
        {isNew && (
          <Badge variant="secondary" className="text-xs font-bold bg-green-500 text-white">
            NEW
          </Badge>
        )}
        {trainingCategory && (
          <Badge variant="outline" className="text-xs bg-white/90 text-gray-800">
            {trainingCategory}
          </Badge>
        )}
      </div>

      {/* Category Badge */}
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className="text-xs bg-black/70 text-white">
          {category}
        </Badge>
      </div>

      {/* Hover Actions */}
      {isHovered && (
        <>
          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full bg-white/90 hover:bg-white h-14 w-14"
              onClick={handleWatchClick}
            >
              <Play className="h-6 w-6 text-black" />
            </Button>
          </div>

          {/* Action Icons */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full bg-black/70 hover:bg-black/80 p-0"
              onClick={handleBookmarkToggle}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-white" />
              ) : (
                <Bookmark className="h-4 w-4 text-white" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full bg-black/70 hover:bg-black/80 p-0"
              onClick={handleSaveClick}
            >
              <Save className="h-4 w-4 text-white" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full bg-black/70 hover:bg-black/80 p-0"
              onClick={handleShareClick}
            >
              <Share2 className="h-4 w-4 text-white" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full bg-black/70 hover:bg-black/80 p-0"
              onClick={handleAssignClick}
            >
              <UserPlus className="h-4 w-4 text-white" />
            </Button>
          </div>

          {/* Mute/Unmute Button for Video */}
          {previewUrl && (
            <div className="absolute bottom-2 left-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full bg-black/70 hover:bg-black/80 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-white" />
                ) : (
                  <Volume2 className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseCardMedia;
