
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface MentorCardProps {
  mentor: {
    id: number;
    name: string;
    title: string;
    image: string;
    rating: number;
    reviews: number;
    topics: string[];
  };
  onSelect: (mentorId: number) => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onSelect }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
            <img 
              src={mentor.image} 
              alt={mentor.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <h3 className="font-medium">{mentor.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-medium">{mentor.rating}</span>
            <span className="text-xs text-muted-foreground">({mentor.reviews} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-1 justify-center mb-3">
            {mentor.topics.slice(0, 2).map(topic => (
              <span key={topic} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {topic}
              </span>
            ))}
            {mentor.topics.length > 2 && (
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                +{mentor.topics.length - 2}
              </span>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onSelect(mentor.id)}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
