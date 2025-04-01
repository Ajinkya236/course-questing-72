
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, SendIcon } from 'lucide-react';
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
      className="overflow-hidden transition-all duration-300 cursor-pointer h-[420px] group hover:border-primary hover:shadow-md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col items-center text-center mb-auto">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3 mt-3">
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
          <h3 className="text-lg font-medium">{mentor.name}</h3>
          <p className="text-muted-foreground text-sm mb-2">{mentor.title}</p>
          
          <div className="flex items-center justify-center gap-1 mb-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-medium">{mentor.rating}</span>
            <span className="text-xs text-muted-foreground">({mentor.reviews})</span>
          </div>
          
          <div className="flex flex-wrap gap-1 justify-center mb-4">
            {mentor.topics.slice(0, 2).map(topic => (
              <Badge 
                key={topic} 
                variant="secondary" 
                className="text-xs px-2 py-0.5 rounded-full"
              >
                {topic}
              </Badge>
            ))}
            {mentor.topics.length > 2 && (
              <Badge 
                variant="outline" 
                className="text-xs px-2 py-0.5 rounded-full"
              >
                +{mentor.topics.length - 2} more
              </Badge>
            )}
          </div>
        </div>
        
        <Button 
          size="sm" 
          onClick={() => onSelectMentor(mentor)}
          className="w-full transition-all duration-300 flex items-center justify-center gap-1 mt-2"
        >
          <SendIcon className="h-3 w-3" /> 
          Request Mentoring
        </Button>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
