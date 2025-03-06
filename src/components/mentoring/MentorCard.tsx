
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Star, UserCheck, UserRound } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    role: string;
    department: string;
    avatarUrl?: string;
    topics: string[];
    rating: number;
    menteeCount: number;
    isAvailable: boolean;
    maxMentees?: number;
  };
  onRequestMentorship: (mentorId: string) => void;
  isDisabled?: boolean;
  disabledReason?: string;
}

const MentorCard = ({ 
  mentor, 
  onRequestMentorship,
  isDisabled = false,
  disabledReason = ''
}: MentorCardProps) => {
  const { 
    id, 
    name, 
    role, 
    department, 
    avatarUrl, 
    topics, 
    rating, 
    menteeCount,
    isAvailable 
  } = mentor;
  
  // Get initials for avatar fallback
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
  
  return (
    <Card className={`${!isAvailable ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{role}</p>
              <p className="text-xs text-muted-foreground">{department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {topics.map(topic => (
            <Badge key={topic} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <UserCheck className="h-4 w-4 text-muted-foreground" />
            <span>{menteeCount} mentees</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>Typically responds in 2 days</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Button
                  onClick={() => onRequestMentorship(id)}
                  className="w-full"
                  variant={isAvailable ? "default" : "outline"}
                  disabled={!isAvailable || isDisabled}
                >
                  {isAvailable ? 'Request Mentorship' : 'Currently Unavailable'}
                </Button>
              </div>
            </TooltipTrigger>
            {(!isAvailable || isDisabled) && (
              <TooltipContent>
                <p>{disabledReason || 'This mentor is not currently accepting new mentees.'}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
