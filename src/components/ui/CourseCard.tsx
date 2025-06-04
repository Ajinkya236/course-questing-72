
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
    <Card className="h-full flex flex-col overflow-hidden modern-card hover:shadow-modern-lg cursor-pointer group">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imageUrl || "https://placehold.co/600x400?text=Course"} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80";
          }}
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground">New</Badge>
          )}
          {isHot && (
            <Badge className="accent-badge">Popular</Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="p-5 pb-3">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold text-base line-clamp-2 course-title">{title}</h3>
          <Badge variant="outline" className="whitespace-nowrap shrink-0 text-xs">
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          {duration}
        </div>
        
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
