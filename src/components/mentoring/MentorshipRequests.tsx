
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { Clock, X } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app this would come from the database
const mockRequests = [
  {
    id: "req1",
    mentorId: "1",
    mentorName: "Sarah Johnson",
    mentorRole: "Senior Product Manager",
    mentorAvatar: "https://i.pravatar.cc/150?img=1",
    topic: "Leadership",
    message: "I'm looking to improve my leadership skills as I take on more responsibilities in my current role.",
    status: "pending",
    createdAt: "2023-06-15T12:00:00Z"
  },
  {
    id: "req2",
    mentorId: "4",
    mentorName: "Marcus Williams",
    mentorRole: "Data Science Director",
    mentorAvatar: "https://i.pravatar.cc/150?img=7",
    topic: "Data Analysis",
    message: "I'd like to learn more about advanced data analysis techniques for my current project.",
    status: "pending",
    createdAt: "2023-06-10T12:00:00Z"
  }
];

interface MentorshipRequestsProps {
  isEnabled: boolean;
}

const MentorshipRequests = ({ isEnabled }: MentorshipRequestsProps) => {
  const [requests, setRequests] = useState(mockRequests);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleWithdrawRequest = (requestId: string) => {
    // In a real app, this would call an API to withdraw the request
    setRequests(requests.filter(req => req.id !== requestId));
    
    toast({
      title: "Request Withdrawn",
      description: "Your mentorship request has been withdrawn.",
    });
    
    setRequestToDelete(null);
  };
  
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
      <h2 className="text-xl font-bold mb-4">Pending Requests</h2>
      
      {requests.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">You don't have any pending mentorship requests.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.history.back()}
          >
            Find Mentors
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map(request => (
            <Card key={request.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.mentorAvatar} alt={request.mentorName} />
                      <AvatarFallback>
                        {request.mentorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {request.mentorName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{request.mentorRole}</p>
                    </div>
                  </div>
                  <Badge className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Pending</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Topic</p>
                    <Badge variant="secondary">{request.topic}</Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Your Message</p>
                    <p className="text-sm p-3 bg-muted rounded-md">
                      {request.message}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 text-sm">
                    <span className="text-muted-foreground">
                      Sent on {formatDate(request.createdAt)}
                    </span>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => setRequestToDelete(request.id)}
                        >
                          <X className="h-4 w-4" />
                          Withdraw
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Withdraw Request</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to withdraw your mentorship request to {request.mentorName}?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleWithdrawRequest(request.id)}
                          >
                            Withdraw
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

export default MentorshipRequests;
