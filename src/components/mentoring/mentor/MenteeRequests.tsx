
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Briefcase, GraduationCap, Clock, Building } from 'lucide-react';

// Mock data for mentee requests
const mockMenteeRequests = [
  {
    id: 1,
    mentee: {
      id: 'mentee3',
      name: 'Thomas Lee',
      role: 'Marketing Specialist',
      avatar: 'https://i.pravatar.cc/150?img=8',
      department: 'Marketing'
    },
    requestDate: '2023-09-28',
    message: "I'm looking to improve my digital marketing skills and learn more about data-driven marketing strategies. I've been in the industry for 2 years but want to specialize in analytics and performance marketing.",
    skills: ['Digital Marketing', 'Content Strategy', 'Analytics'],
    expectedDuration: '3 months'
  },
  {
    id: 2,
    mentee: {
      id: 'mentee4',
      name: 'Emily Chen',
      role: 'Product Analyst',
      avatar: 'https://i.pravatar.cc/150?img=20',
      department: 'Product'
    },
    requestDate: '2023-09-25',
    message: "I'm transitioning from analytics to product management and would love guidance on building the right skillset. I have a strong data background but need to learn more about product strategy and user experience.",
    skills: ['Data Analysis', 'Product Strategy', 'SQL'],
    expectedDuration: '6 months'
  }
];

const MenteeRequests = () => {
  const { toast } = useToast();
  const [menteeRequests, setMenteeRequests] = useState(mockMenteeRequests);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  
  const handleAcceptDialogOpen = (request) => {
    setSelectedRequest(request);
    setResponseMessage(`Hi ${request.mentee.name}, I'd be happy to mentor you on your journey to improve your ${request.skills.join(', ')} skills. Let's schedule our first session soon to discuss your goals in more detail.`);
    setAcceptDialogOpen(true);
  };
  
  const handleDeclineDialogOpen = (request) => {
    setSelectedRequest(request);
    setResponseMessage(`Hi ${request.mentee.name}, unfortunately I'm not able to take on this mentorship opportunity at this time due to my current workload. I wish you all the best in your professional development.`);
    setDeclineDialogOpen(true);
  };
  
  const handleAcceptRequest = () => {
    if (!selectedRequest) return;
    
    setMenteeRequests(menteeRequests.filter(req => req.id !== selectedRequest.id));
    setAcceptDialogOpen(false);
    
    toast({
      title: "Request Accepted",
      description: `You are now mentoring ${selectedRequest.mentee.name}. A notification has been sent to the mentee.`,
    });
  };
  
  const handleDeclineRequest = () => {
    if (!selectedRequest) return;
    
    setMenteeRequests(menteeRequests.filter(req => req.id !== selectedRequest.id));
    setDeclineDialogOpen(false);
    
    toast({
      title: "Request Declined",
      description: `You have declined the mentorship request from ${selectedRequest.mentee.name}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mentee Requests</h3>
      </div>
      
      {menteeRequests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-muted p-3 mb-3">
              <GraduationCap className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No Pending Requests</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              You don't have any pending mentorship requests at the moment. Check back later!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {menteeRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.mentee.avatar} alt={request.mentee.name} />
                      <AvatarFallback>{request.mentee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{request.mentee.name}</CardTitle>
                      <CardDescription>{request.mentee.role} - {request.mentee.department}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1 w-fit">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Requested: {request.requestDate}</span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Message from mentee</h4>
                  <p className="text-sm text-muted-foreground bg-secondary/10 p-3 rounded-md">
                    "{request.message}"
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Skills Interested In</h4>
                    <div className="flex flex-wrap gap-1">
                      {request.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-primary/10">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Expected Duration</h4>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{request.expectedDuration}</span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => handleDeclineDialogOpen(request)}
                >
                  <X className="h-4 w-4 mr-1.5" />
                  Decline
                </Button>
                <Button
                  onClick={() => handleAcceptDialogOpen(request)}
                >
                  <Check className="h-4 w-4 mr-1.5" />
                  Accept
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Accept Request Dialog */}
      <Dialog open={acceptDialogOpen} onOpenChange={setAcceptDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Accept Mentorship Request</DialogTitle>
            <DialogDescription>
              Send a message to the mentee along with your acceptance.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 pb-2 border-b">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedRequest.mentee.avatar} alt={selectedRequest.mentee.name} />
                  <AvatarFallback>{selectedRequest.mentee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedRequest.mentee.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.mentee.role}</p>
                </div>
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="response-message" className="text-sm font-medium">Your Message</label>
                <Textarea 
                  id="response-message"
                  rows={4}
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                />
              </div>
              
              <div className="rounded-md bg-secondary/20 p-3">
                <p className="text-sm">
                  <strong>What happens next:</strong>
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-muted-foreground">
                  <li>The mentee will be notified of your acceptance</li>
                  <li>They will appear in your Active Mentorships</li>
                  <li>You can set up your first session and assign tasks</li>
                </ul>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAcceptDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAcceptRequest}>Accept Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Decline Request Dialog */}
      <Dialog open={declineDialogOpen} onOpenChange={setDeclineDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Decline Mentorship Request</DialogTitle>
            <DialogDescription>
              Send a message to the mentee explaining why you're declining.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 pb-2 border-b">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedRequest.mentee.avatar} alt={selectedRequest.mentee.name} />
                  <AvatarFallback>{selectedRequest.mentee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedRequest.mentee.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.mentee.role}</p>
                </div>
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="decline-message" className="text-sm font-medium">Your Message (Optional)</label>
                <Textarea 
                  id="decline-message"
                  rows={4}
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Providing a reason helps the mentee understand your decision.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeclineDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeclineRequest}>Decline Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenteeRequests;
