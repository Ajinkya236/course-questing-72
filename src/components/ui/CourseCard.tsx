
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";

export interface CourseProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  rating: number;
  isHot?: boolean;
  isNew?: boolean;
}

const CourseCard: React.FC<CourseProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  duration,
  rating,
  isHot,
  isNew
}) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={imageUrl || "https://placehold.co/600x400?text=Course"} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=Course";
          }}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
          {isHot && (
            <Badge className="bg-orange-500 hover:bg-orange-600">Popular</Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base line-clamp-2">{title}</h3>
          <Badge variant="outline" className="ml-2 whitespace-nowrap shrink-0">
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {duration}
        </div>
        
        <div className="flex items-center">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm ml-1">{rating.toFixed(1)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
