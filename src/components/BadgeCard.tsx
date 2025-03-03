
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Share2, Lock } from "lucide-react";

interface BadgeProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  isUnlocked: boolean;
  progress?: number;
}

const BadgeCard: React.FC<BadgeProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  isUnlocked,
  progress = 0,
}) => {
  return (
    <Card className={`overflow-hidden transition-all duration-200 ${isUnlocked ? "hover-scale" : "opacity-75"}`}>
      <div className="relative aspect-square flex items-center justify-center p-6 bg-gradient-to-br from-primary/10 to-primary/20">
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-background/50 z-10">
            <Lock className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-24 h-24 object-contain"
          />
        ) : (
          <Award className="w-24 h-24 text-primary/80" />
        )}
        <Badge className="absolute top-2 right-2">{category}</Badge>
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {!isUnlocked && progress > 0 && (
          <div className="w-full bg-secondary h-2 rounded-full mt-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            <p className="text-xs text-muted-foreground mt-1 text-right">{progress}% complete</p>
          </div>
        )}
      </CardContent>
      {isUnlocked && (
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BadgeCard;
