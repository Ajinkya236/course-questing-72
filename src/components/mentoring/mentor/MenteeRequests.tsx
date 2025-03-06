
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ClipboardList,
  UserCheck,
  UserX,
  Calendar,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define types for the different request statuses
interface BaseRequest {
  id: number;
  menteeName: string;
  menteeTitle: string;
  topic: string;
  date: string;
  message: string;
  imageUrl: string;
}

interface PendingRequest extends BaseRequest {
  status: 'pending';
}

interface AcceptedRequest extends BaseRequest {
  status: 'accepted';
}

interface RejectedRequest extends BaseRequest {
  status: 'rejected';
  rejectionReason: string;
}

type MenteeRequest = PendingRequest | AcceptedRequest | RejectedRequest;

const MenteeRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MenteeRequest[]>([
    {
      id: 1,
      menteeName: "Alex Chen",
      menteeTitle: "Junior Developer",
      topic: "Web Development",
      status: "pending",
      date: "2023-10-15",
      message: "I'm looking to improve my front-end development skills, especially with React. I've been working with basic HTML/CSS/JS for about a year, but I want to level up my skills to build more complex applications. I'm particularly interested in learning about component architecture and state management.",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      menteeName: "Sarah Johnson",
      menteeTitle: "Product Designer",
      topic: "UX Design",
      status: "pending",
      date: "2023-10-10",
      message: "I'm a product designer looking to enhance my UX research skills. I have experience in creating wireframes and prototypes, but I want to learn more about user research methodologies and how to effectively incorporate user feedback into the design process.",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      menteeName: "Michael Brown",
      menteeTitle: "Data Analyst",
      topic: "Data Science",
      status: "pending",
      date: "2023-10-05",
      message: "I'm currently working as a data analyst and want to transition into data science. I'm comfortable with SQL and Excel, but I need guidance on learning Python for data analysis, machine learning basics, and how to build a portfolio of data science projects.",
      imageUrl: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ]);
  
  const [selectedRequest, setSelectedRequest] = useState<MenteeRequest | null>(null);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  
  const pendingRequests = requests.filter(req => req.status === 'pending');
  const historyRequests = requests.filter(req => req.status !== 'pending');
  
  const handleAcceptRequest = (request: PendingRequest) => {
    const acceptedRequest: AcceptedRequest = {
      ...request,
      status: 'accepted'
    };
    
    setRequests(requests.map(req => 
      req.id === request.id ? acceptedRequest : req
    ));
    
    toast({
      title: "Request Accepted",
      description: `You are now mentoring ${request.menteeName}`,
    });
  };
  
  const openRejectionDialog = (request: PendingRequest) => {
    setSelectedRequest(request);
    setShowRejectionDialog(true);
  };
  
  const handleRejectRequest = () => {
    if (!selectedRequest || selectedRequest.status !== 'pending' || !rejectionReason.trim()) return;
    
    const rejectedRequest: RejectedRequest = {
      ...selectedRequest,
      status: 'rejected',
      rejectionReason: rejectionReason
    };
    
    setRequests(requests.map(req => 
      req.id === selectedRequest.id ? rejectedRequest : req
    ));
    
    toast({
      title: "Request Rejected",
      description: `You have declined ${selectedRequest.menteeName}'s mentoring request`,
    });
    
    // Reset
    setShowRejectionDialog(false);
    setRejectionReason('');
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Mentee Requests
          </CardTitle>
          <CardDescription>
            Review and respond to mentoring requests from potential mentees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Pending Requests */}
            <div>
              <h3 className="text-lg font-medium mb-4">Pending Requests</h3>
              
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8 border rounded-md bg-muted/20">
                  <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h4 className="text-base font-medium">No Pending Requests</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You don't have any pending mentoring requests at the moment.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map(request => (
                    <Card key={request.id}>
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <img 
                                src={request.imageUrl} 
                                alt={request.menteeName} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{request.menteeName}</h4>
                              <p className="text-sm text-muted-foreground">{request.menteeTitle}</p>
                              <Badge variant="outline" className="mt-1">{request.topic}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Calendar className="h-3 w-3" />
                              {new Date(request.date).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-muted/20 p-3 rounded-md">
                          <p className="text-sm">{request.message}</p>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 text-destructive"
                            onClick={() => openRejectionDialog(request)}
                          >
                            <UserX className="h-4 w-4" />
                            Decline
                          </Button>
                          <Button 
                            size="sm" 
                            className="gap-1"
                            onClick={() => handleAcceptRequest(request)}
                          >
                            <UserCheck className="h-4 w-4" />
                            Accept
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            {/* History */}
            <div>
              <h3 className="text-lg font-medium mb-4">Request History</h3>
              
              {historyRequests.length === 0 ? (
                <div className="text-center py-8 border rounded-md bg-muted/20">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h4 className="text-base font-medium">No Request History</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your past mentoring request responses will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {historyRequests.map(request => (
                    <Card key={request.id} className="overflow-hidden">
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img 
                              src={request.imageUrl} 
                              alt={request.menteeName} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{request.menteeName}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">{request.topic}</Badge>
                              <Badge 
                                variant={request.status === 'accepted' ? 'default' : 'outline'}
                                className="text-xs"
                              >
                                {request.status === 'accepted' ? 'Accepted' : 'Declined'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(request.date).toLocaleDateString()}
                        </div>
                      </div>
                      {request.status === 'rejected' && (
                        <div className="px-3 pb-3 ml-12 mr-3">
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Reason:</span> {request.rejectionReason}
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Rejection Dialog */}
          <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Decline Mentoring Request</DialogTitle>
                <DialogDescription>
                  Please provide a reason for declining this mentoring request
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Textarea 
                  placeholder="Explain why you're declining the request..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="resize-none"
                  rows={4}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>Cancel</Button>
                <Button 
                  variant="destructive" 
                  onClick={handleRejectRequest}
                  disabled={!rejectionReason.trim()}
                >
                  Decline Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenteeRequests;
