
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, UserPlus, Briefcase, Building } from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  role: string;
  department: string;
  topics: string[];
  rating: number;
  sessions: number;
  availability: string;
  imageUrl: string;
}

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 border-2 border-muted">
            <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-medium text-base">{mentor.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Briefcase className="h-3 w-3" />
              <span>{mentor.role}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Building className="h-3 w-3" />
              <span>{mentor.department}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="text-sm font-medium">{mentor.rating}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            ({mentor.sessions} sessions)
          </div>
          
          <Badge 
            variant={mentor.availability === 'Available' ? 'outline' : 'secondary'} 
            className={cn("ml-auto text-xs", 
              mentor.availability === 'Available' ? "border-green-500 text-green-600" : ""
            )}
          >
            {mentor.availability}
          </Badge>
        </div>
        
        <div className="mt-3">
          <div className="text-sm font-medium mb-1.5">Expertise</div>
          <div className="flex flex-wrap gap-1.5">
            {mentor.topics.map((topic, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button variant="outline" className="text-xs h-8 gap-1 flex-1">
          <Calendar className="h-3 w-3" />
          View Profile
        </Button>
        <Button className="text-xs h-8 gap-1 flex-1">
          <UserPlus className="h-3 w-3" />
          Request
        </Button>
      </CardFooter>
    </Card>
  );
};

// Import cn from utils
import { cn } from '@/lib/utils';

export default MentorCard;
