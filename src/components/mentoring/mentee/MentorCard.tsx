
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Send } from 'lucide-react';
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
      className="overflow-hidden transition-all duration-300 cursor-pointer h-[320px] group hover:border-primary hover:shadow-md transform hover:scale-105 relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
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
          <h3 className="font-medium">{mentor.name}</h3>
          <p className="text-muted-foreground text-sm mb-2">{mentor.title}</p>
          
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="text-sm">{mentor.rating}</span>
            <span className="text-xs text-muted-foreground">({mentor.reviews})</span>
          </div>
          
          <div className="flex flex-wrap gap-1 justify-center mb-3">
            {mentor.topics.slice(0, 2).map(topic => (
              <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
            ))}
            {mentor.topics.length > 2 && (
              <Badge variant="outline" className="text-xs">+{mentor.topics.length - 2}</Badge>
            )}
          </div>
        </div>
        
        {/* Always visible button at bottom of card */}
        <Button 
          size="sm" 
          onClick={() => onSelectMentor(mentor)}
          className="w-full mt-auto flex items-center justify-center gap-2"
        >
          <Send className="h-3 w-3" /> 
          Request Mentoring
        </Button>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
