
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { 
  Award,
  Calendar, 
  CheckCircle, 
  Download,
  MessageSquare,
  Star,
  UserRound 
} from 'lucide-react';

// Mock data - in a real app this would come from the database
const mockCompletedEngagements = [
  {
    id: "eng-past-1",
    mentorId: "2",
    mentorName: "David Chen",
    mentorRole: "Engineering Lead",
    mentorAvatar: "https://i.pravatar.cc/150?img=3",
    topic: "Frontend Development",
    startDate: "2023-01-10T12:00:00Z",
    endDate: "2023-04-20T12:00:00Z",
    goalsCompleted: 3,
    totalGoals: 3,
    sessionCount: 8,
    hasCertificate: true,
    feedback: {
      givenRating: 5,
      givenComment: "David was an excellent mentor. He was patient, knowledgeable, and provided practical advice that helped me improve my frontend skills significantly."
    }
  }
];

interface MentoringHistoryProps {
  isEnabled: boolean;
}

const MentoringHistory = ({ isEnabled }: MentoringHistoryProps) => {
  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={`${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <h2 className="text-xl font-bold mb-4">Completed Engagements</h2>
      
      {mockCompletedEngagements.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">You don't have any completed mentorship engagements yet.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.history.back()}
          >
            Find Mentors
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {mockCompletedEngagements.map(engagement => (
            <Card key={engagement.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={engagement.mentorAvatar} alt={engagement.mentorName} />
                      <AvatarFallback>
                        {engagement.mentorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{engagement.mentorName}</CardTitle>
                      <p className="text-muted-foreground">{engagement.mentorRole}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">{engagement.topic}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Completed</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(engagement.startDate)} - {formatDate(engagement.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>{engagement.sessionCount} sessions completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{engagement.goalsCompleted} of {engagement.totalGoals} goals achieved</span>
                    </div>
                  </div>
                  
                  {engagement.feedback && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Your Feedback</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < engagement.feedback.givenRating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm">{engagement.feedback.givenRating}/5</span>
                        </div>
                        <p className="text-sm">{engagement.feedback.givenComment}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4 justify-between items-center pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-medium">Mentorship Certificate</span>
                    </div>
                    
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2"
                      disabled={!engagement.hasCertificate}
                    >
                      <Download className="h-4 w-4" />
                      Download Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentoringHistory;
