
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
        <div className="flex flex-col items-center text-center flex-1">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 mt-4">
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
          <h3 className="text-2xl font-medium">{mentor.name}</h3>
          <p className="text-muted-foreground text-lg mb-4">{mentor.title}</p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span className="text-lg font-medium">{mentor.rating}</span>
            <span className="text-sm text-muted-foreground">({mentor.reviews})</span>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {mentor.topics.map(topic => (
              <Badge 
                key={topic} 
                variant="secondary" 
                className="text-sm px-4 py-1 rounded-full"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button 
          size="lg" 
          onClick={() => onSelectMentor(mentor)}
          className="w-full transition-all duration-300 flex items-center justify-center gap-2 mb-2"
        >
          <SendIcon className="h-4 w-4" /> 
          Request Mentoring
        </Button>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
