
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';

// Define the base type and use union types for the mentee request
type MenteeRequestBase = {
  id: number;
  menteeName: string;
  menteeTitle: string;
  topic: string;
  date: string;
  message: string;
  imageUrl: string;
};

type PendingRequest = MenteeRequestBase & {
  status: 'pending';
};

type AcceptedRequest = MenteeRequestBase & {
  status: 'accepted';
};

type RejectedRequest = MenteeRequestBase & {
  status: 'rejected';
  rejectionReason: string;
};

type MenteeRequest = PendingRequest | AcceptedRequest | RejectedRequest;

const MenteeRequests = () => {
  const [requests, setRequests] = useState<MenteeRequest[]>([
    {
      id: 1,
      menteeName: "Emma Thompson",
      menteeTitle: "Marketing Specialist",
      topic: "Digital Marketing Strategy",
      status: 'pending',
      date: "June 15, 2023",
      message: "I'm looking to enhance my skills in digital marketing, particularly in social media strategy and analytics. I believe your expertise in this area would be incredibly valuable for my career growth.",
      imageUrl: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      id: 2,
      menteeName: "Daniel Lee",
      menteeTitle: "Software Engineer",
      topic: "Career Advancement in Tech",
      status: 'pending',
      date: "June 18, 2023",
      message: "I've been in software engineering for 3 years now and I'm looking to advance to a senior role. I'd appreciate guidance on skill development and navigating the promotion process in tech companies.",
      imageUrl: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      menteeName: "Sophia Garcia",
      menteeTitle: "UX Design Intern",
      topic: "UX Portfolio Development",
      status: 'pending',
      date: "June 20, 2023",
      message: "As a new UX designer, I'm working on building a strong portfolio. I'd love your insights on my current projects and advice on what types of work would best showcase my skills to potential employers.",
      imageUrl: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ]);

  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  const handleAcceptRequest = (requestId: number) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'accepted' as const }
        : request
    ));
    
    toast.success("Mentorship request accepted");
  };

  const handleRejectRequest = () => {
    if (!selectedRequestId || !rejectionReason) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    
    setRequests(requests.map(request => 
      request.id === selectedRequestId 
        ? { ...request, status: 'rejected' as const, rejectionReason }
        : request
    ));
    
    toast.success("Mentorship request rejected");
    setShowRejectionDialog(false);
    setRejectionReason('');
    setSelectedRequestId(null);
  };

  const openRejectionDialog = (requestId: number) => {
    setSelectedRequestId(requestId);
    setShowRejectionDialog(true);
  };

  // Filter requests by status
  const pendingRequests = requests.filter(request => request.status === 'pending');
  const acceptedRequests = requests.filter(request => request.status === 'accepted');
  const rejectedRequests = requests.filter(request => request.status === 'rejected');

  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pending">
          Pending
          {pendingRequests.length > 0 && (
            <Badge variant="secondary" className="ml-2">{pendingRequests.length}</Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="accepted">Accepted</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending" className="space-y-4 mt-4">
        {pendingRequests.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No pending mentorship requests.
            </CardContent>
          </Card>
        ) : (
          pendingRequests.map(request => (
            <Card key={request.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.imageUrl} alt={request.menteeName} />
                      <AvatarFallback>{request.menteeName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{request.menteeName}</CardTitle>
                      <CardDescription>{request.menteeTitle}</CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{request.topic}</Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {request.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Request Message:</h4>
                    <p className="text-sm text-muted-foreground">{request.message}</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => openRejectionDialog(request.id)}
                    >
                      <XCircle className="h-4 w-4" />
                      Decline
                    </Button>
                    <Button 
                      className="gap-1"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Accept
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        
        <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Decline Mentorship Request</DialogTitle>
              <DialogDescription>
                Please provide a reason for declining this mentorship request.
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-4">
              <Textarea 
                placeholder="Reason for declining..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleRejectRequest}>Decline Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>
      
      <TabsContent value="accepted" className="space-y-4 mt-4">
        {acceptedRequests.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No accepted requests.
            </CardContent>
          </Card>
        ) : (
          acceptedRequests.map(request => (
            <Card key={request.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.imageUrl} alt={request.menteeName} />
                      <AvatarFallback>{request.menteeName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{request.menteeName}</CardTitle>
                      <CardDescription>{request.menteeTitle}</CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{request.topic}</Badge>
                        <Badge variant="success">Accepted</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Request Message:</h4>
                    <p className="text-sm text-muted-foreground">{request.message}</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button size="sm">View Mentorship</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>
      
      <TabsContent value="rejected" className="space-y-4 mt-4">
        {rejectedRequests.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No rejected requests.
            </CardContent>
          </Card>
        ) : (
          rejectedRequests.map(request => (
            <Card key={request.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.imageUrl} alt={request.menteeName} />
                      <AvatarFallback>{request.menteeName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{request.menteeName}</CardTitle>
                      <CardDescription>{request.menteeTitle}</CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{request.topic}</Badge>
                        <Badge variant="destructive">Rejected</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Request Message:</h4>
                    <p className="text-sm text-muted-foreground">{request.message}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Rejection Reason:</h4>
                    <p className="text-sm text-muted-foreground">
                      {(request as RejectedRequest).rejectionReason}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>
    </Tabs>
  );
};

export default MenteeRequests;
