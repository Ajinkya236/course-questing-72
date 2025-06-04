
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
    <Card className="professional-card course-card h-full flex flex-col overflow-hidden group">
      <div className="h-52 overflow-hidden relative">
        <img 
          src={imageUrl || "https://placehold.co/600x400?text=Course"} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d5b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isNew && (
            <Badge className="status-badge status-info shadow-sm">New</Badge>
          )}
          {isHot && (
            <Badge className="status-badge bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 shadow-sm">Popular</Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="p-6 pb-4">
        <div className="flex justify-between items-start gap-3">
          <h3 className="course-title text-lg line-clamp-2 flex-1">{title}</h3>
          <Badge variant="outline" className="shrink-0 border-primary/20 text-primary bg-primary/10">
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0 flex-grow">
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex justify-between items-center border-t border-border/50">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          <span className="font-medium">{duration}</span>
        </div>
        
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
