
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star, Share2, Bookmark, Play, UserPlus } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  rating: number;
  isBookmarked?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  duration,
  rating,
  isBookmarked = false,
}) => {
  return (
    <Card className="w-full hover-scale overflow-hidden group">
      <div className="relative h-40 overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <Badge className="absolute top-2 right-2 bg-primary/80">{category}</Badge>
      </div>
      <CardHeader className="p-4 pb-0">
        <h3 className="font-heading text-lg">{title}</h3>
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
        <div className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-between gap-2 absolute bottom-4 left-0 right-0 px-4">
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
