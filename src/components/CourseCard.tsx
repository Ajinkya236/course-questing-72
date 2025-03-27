
import React, { useState } from 'react';
import { Heart, Share2, BookmarkPlus, Play, Award, Clock, Users, Building, FileCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface CourseProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  instructor: string;
  level: string;
  category: string;
  progress?: number;
  rating?: number;
  isAssigned?: boolean;
  isCompleted?: boolean;
  source?: 'Internal' | 'Coursera' | 'LinkedIn';
  type?: 'Course' | 'Program' | 'Blended' | 'Classroom';
  trainingCategory?: string;
  videoUrl?: string;
  imageUrl?: string;
  author?: string;
  previewUrl?: string;
  enrollmentStatus?: string;
  isBookmarked?: boolean;
  dateAdded?: string;
  skill?: string;
  isHot?: boolean;
  isNew?: boolean;
}

const CourseCard: React.FC<CourseProps> = ({
  id,
  title,
  description,
  thumbnail,
  duration,
  instructor,
  level,
  category,
  progress = 0,
  rating = 0,
  isAssigned = false,
  isCompleted = false,
  source = 'Internal',
  type = 'Course',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Determine badge color based on level
  const levelColorMap: {[key: string]: string} = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  // Determine source icon
  const sourceIconMap: {[key: string]: React.ReactNode} = {
    Internal: <Building className="h-3 w-3" />,
    Coursera: <svg className="h-3 w-3" viewBox="0 0 32 32" fill="currentColor"><path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm0-26.6c-5.862 0-10.6 4.738-10.6 10.6 0 5.863 4.738 10.6 10.6 10.6 5.863 0 10.6-4.737 10.6-10.6 0-5.862-4.737-10.6-10.6-10.6zm5.724 14.412c-1.175 1.425-3.15 2.475-5.724 2.475-2.575 0-4.55-1.05-5.725-2.475-.15-.175-.137-.438.038-.587l1.1-.963c.175-.137.413-.125.55.05.788.85 2.188 1.5 4.037 1.5s3.25-.65 4.038-1.5c.137-.175.375-.188.55-.05l1.1.963c.175.15.187.412.037.587zm-9.75-3.412c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5.675-1.5 1.5-1.5 1.5.675 1.5 1.5zm11 0c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5.675-1.5 1.5-1.5 1.5.675 1.5 1.5z"></path></svg>,
    LinkedIn: <svg className="h-3 w-3" viewBox="0 0 32 32" fill="currentColor"><path d="M29.63.001H2.362C1.06.001 0 1.034 0 2.306V29.69C0 30.965 1.06 32 2.362 32h27.27C30.937 32 32 30.965 32 29.69V2.306C32 1.034 30.937.001 29.63.001z" fill="currentColor"></path><path d="M4.745 11.997H9.5v15.27H4.745zm2.374-7.6c1.517 0 2.75 1.233 2.75 2.75S8.636 9.9 7.12 9.9a2.76 2.76 0 0 1-2.754-2.753 2.75 2.75 0 0 1 2.753-2.75m5.35 7.6h4.552v2.087h.063c.634-1.2 2.182-2.466 4.5-2.466 4.806 0 5.693 3.163 5.693 7.274v8.376h-4.743V19.84c0-1.77-.032-4.05-2.466-4.05-2.47 0-2.85 1.93-2.85 3.92v7.554h-4.742v-15.27z" fill="#fff"></path></svg>,
  };

  // Determine type icon
  const typeIconMap: {[key: string]: React.ReactNode} = {
    Course: <FileCheck className="h-3 w-3" />,
    Program: <Award className="h-3 w-3" />,
    Blended: <Users className="h-3 w-3" />,
    Classroom: <Building className="h-3 w-3" />,
  };

  const statusBadge = isCompleted ? (
    <Badge variant="secondary" className="absolute top-3 right-3 bg-green-500 text-white">
      Completed
    </Badge>
  ) : isAssigned ? (
    <Badge variant="secondary" className="absolute top-3 right-3 bg-yellow-500 text-white">
      Assigned
    </Badge>
  ) : progress > 0 ? (
    <Badge variant="secondary" className="absolute top-3 right-3 bg-blue-500 text-white">
      In Progress
    </Badge>
  ) : null;

  return (
    <div 
      className="group relative overflow-hidden rounded-xl card-glass cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail with overlay */}
      <div className="aspect-video relative overflow-hidden rounded-t-xl">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-70"></div>
        
        {statusBadge}

        {/* Play button overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button variant="default" size="icon" className="rounded-full bg-primary/90 hover:bg-primary backdrop-blur-sm w-12 h-12 shadow-lg">
            <Play className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Duration badge */}
        <Badge variant="secondary" className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white">
          <Clock className="h-3 w-3 mr-1" />
          {duration}
        </Badge>

        {/* Source & Type badge */}
        <div className="absolute bottom-3 right-3 flex space-x-2">
          <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm text-white">
            {sourceIconMap[source]}
            <span className="ml-1">{source}</span>
          </Badge>
          <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm text-white">
            {typeIconMap[type]}
            <span className="ml-1">{type}</span>
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <Badge className={`${levelColorMap[level] || 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'} mb-2`}>{level}</Badge>
            <h3 className="text-base font-semibold leading-tight line-clamp-1">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">By {instructor}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        {/* Progress bar (if in progress) */}
        {progress > 0 && !isCompleted && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isLiked ? 'Unlike' : 'Like'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <BookmarkPlus className={`h-4 w-4 ${isSaved ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSaved ? 'Unsave' : 'Save'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Rating stars (if any) */}
          {rating > 0 && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs ml-1 text-muted-foreground">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
