
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Share2, Lock, Clock, Star, Calendar, Trophy, Medal } from "lucide-react";

interface BadgeMilestone {
  name: string;
  completed: boolean;
}

interface BadgeProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  isUnlocked: boolean;
  progress?: number;
  timeLimit?: string;
  isShareable?: boolean;
  milestones?: BadgeMilestone[];
  isLimited?: boolean;
  available?: string;
  earnedDate?: string;
}

const BadgeCard: React.FC<BadgeProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  isUnlocked,
  progress = 0,
  timeLimit,
  isShareable,
  milestones,
  isLimited,
  available,
  earnedDate,
}) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'Achievement':
        return <Trophy className="h-4 w-4 text-amber-500" />;
      case 'Excellence':
        return <Star className="h-4 w-4 text-amber-500" />;
      case 'Mastery':
        return <Medal className="h-4 w-4 text-amber-500" />;
      case 'Limited Time':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Consistency':
        return <Calendar className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

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
        <Badge className="absolute top-2 right-2 flex items-center gap-1">
          {getCategoryIcon()}
          {category}
        </Badge>
        
        {timeLimit && !isUnlocked && (
          <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs p-1 rounded text-center">
            <Clock className="h-3 w-3 inline mr-1" />
            {timeLimit}
          </div>
        )}
        
        {earnedDate && isUnlocked && (
          <div className="absolute bottom-2 left-2 right-2 bg-primary/60 text-white text-xs p-1 rounded text-center">
            Earned on {new Date(earnedDate).toLocaleDateString()}
          </div>
        )}
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
        
        {!isUnlocked && milestones && milestones.length > 0 && (
          <div className="mt-3 space-y-1">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div className={`h-3 w-3 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-secondary'}`}></div>
                <span className={milestone.completed ? 'line-through text-muted-foreground' : ''}>
                  {milestone.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {isUnlocked && isShareable && (
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </CardFooter>
      )}
      
      {!isUnlocked && isLimited && (
        <CardFooter className="p-4 pt-0">
          <div className="w-full text-center text-xs text-amber-600 font-medium">
            <Clock className="h-3 w-3 inline mr-1" />
            Limited time badge - Available {available}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default BadgeCard;
