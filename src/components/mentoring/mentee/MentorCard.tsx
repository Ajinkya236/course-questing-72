
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, SendHorizontal, Calendar, Award, MessageCircle } from 'lucide-react';
import { Mentor } from './types';

interface MentorCardProps {
  mentor: Mentor;
  onSelectMentor: (mentor: Mentor) => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ 
  mentor, 
  onSelectMentor, 
  isHovered,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <Card 
      className="overflow-hidden h-[360px] group transition-all duration-300 cursor-pointer hover:border-primary hover:shadow-lg relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-black/70 px-2 py-1 rounded-full shadow-sm">
        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
        <span className="text-xs font-medium">{mentor.rating}</span>
      </div>
      
      <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/5">
        {/* Background gradient banner */}
      </div>
      
      <CardContent className="p-4 pt-0 flex flex-col h-[calc(100%-6rem)] -mt-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-4 border-background shadow-md">
            <img 
              src={mentor.image} 
              alt={mentor.name} 
              className="w-full h-full object-cover" 
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
                target.onerror = null;
              }}
            />
          </div>
          <h3 className="text-lg font-medium line-clamp-1">{mentor.name}</h3>
          <p className="text-muted-foreground text-sm mb-2 line-clamp-1">{mentor.title}</p>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <MessageCircle className="h-3 w-3" />
            <span>{mentor.reviews} reviews</span>
            <span className="mx-1">•</span>
            <Calendar className="h-3 w-3" />
            <span>Available</span>
          </div>
          
          <div className="flex flex-wrap gap-1 justify-center mt-1">
            {mentor.topics.slice(0, 2).map(topic => (
              <Badge 
                key={topic} 
                variant="secondary" 
                className="text-xs px-2 py-0.5 rounded-full bg-primary/10 hover:bg-primary/20"
              >
                {topic}
              </Badge>
            ))}
            {mentor.topics.length > 2 && (
              <Badge 
                variant="outline" 
                className="text-xs px-2 py-0.5 rounded-full"
              >
                +{mentor.topics.length - 2}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="mt-auto w-full">
          <Button 
            className="w-full transition-all duration-300 gap-2 group-hover:bg-primary group-hover:text-white"
            onClick={() => onSelectMentor(mentor)}
          >
            <SendHorizontal className="h-4 w-4" /> 
            Request Mentorship
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
