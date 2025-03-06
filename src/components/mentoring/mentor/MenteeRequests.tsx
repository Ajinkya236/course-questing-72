
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  ClipboardList, Clock, CheckCircle2, XCircle, AlertCircle, Calendar, FileText, MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types for requests
type RequestStatus = "pending" | "accepted" | "rejected";

interface Request {
  id: number;
  menteeName: string;
  menteeTitle: string;
  topic: string;
  status: RequestStatus;
  date: string;
  message: string;
  imageUrl: string;
  reason?: string;
}

// Mock data for requests
const requestsData: Request[] = [
  {
    id: 1,
    menteeName: "Jordan Smith",
    menteeTitle: "Junior Data Analyst",
    topic: "Data Analysis",
    status: "pending",
    date: "2023-10-15",
    message: "I'm looking to improve my skills in data visualization and statistical analysis. I've been working with Excel and Power BI but want to transition to Python for more advanced analytics.",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    menteeName: "Alex Johnson",
    menteeTitle: "Software Engineer",
    topic: "Machine Learning",
    status: "pending",
    date: "2023-10-10",
    message: "I'm a software engineer looking to specialize in machine learning. I have strong programming skills but limited experience with ML frameworks and theory.",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: 3,
    menteeName: "Taylor Rodriguez",
    menteeTitle: "Graduate Student",
    topic: "Research Methods",
    status: "accepted",
    date: "2023-10-05",
    message: "I'm a graduate student working on my thesis in computational statistics. I'm looking for guidance on research methodologies and statistical model development.",
    imageUrl: "https://randomuser.me/api/portraits/women/56.jpg"
  },
  {
    id: 4,
    menteeName: "Morgan Lee",
    menteeTitle: "Business Analyst",
    topic: "Business Intelligence",
    status: "rejected",
    date: "2023-10-18",
    message: "I want to transition from traditional business analysis to a more data-driven approach. Looking for guidance on BI tools and methodologies.",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    reason: "Current mentee load at maximum capacity. Recommend reapplying in 2 months."
  },
  {
    id: 5,
    menteeName: "Casey Williams",
    menteeTitle: "Product Manager",
    topic: "Data-Driven Product Development",
    status: "pending",
    date: "2023-10-08",
    message: "I'm a product manager looking to incorporate more data-driven decision making into our product development process.",
    imageUrl: "https://randomuser.me/api/portraits/women/67.jpg"
  }
];

const MenteeRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<Request[]>(requestsData);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [goals, setGoals] = useState('');
  const [timeline, setTimeline] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const handleAcceptRequest = (request: Request) => {
    if (!goals.trim() || !timeline.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before accepting the request.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedRequests = requests.map(req => 
      req.id === request.id ? { ...req, status: "accepted" as const } : req
    );
    
    setRequests(updatedRequests);
    setShowAcceptDialog(false);
    setGoals('');
    setTimeline('');
    
    toast({
      title: "Request Accepted",
      description: `You have accepted ${request.menteeName}'s mentorship request.`
    });
  };

  const handleRejectRequest = (request: Request) => {
    if (!rejectReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedRequests = requests.map(req => 
      req.id === request.id ? { ...req, status: "rejected" as const, reason: rejectReason } : req
    );
    
    setRequests(updatedRequests);
    setShowRejectDialog(false);
    setRejectReason('');
    
    toast({
      title: "Request Rejected",
      description: `You have rejected ${request.menteeName}'s mentorship request.`
    });
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'accepted':
        return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>;
      default:
        return null;
    }
  };

  const filteredRequests = activeFilter === 'all' 
    ? requests 
    : requests.filter(request => request.status === activeFilter);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Mentorship Requests
          </CardTitle>
          <CardDescription>
            Review and manage incoming mentorship requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Vertical Filters */}
            <div className="md:w-64 space-y-2">
              <h3 className="text-sm font-medium mb-3">Filter Requests</h3>
              <div className="space-y-1">
                <Button 
                  variant={activeFilter === 'all' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setActiveFilter('all')}
                >
                  All Requests ({requests.length})
                </Button>
                <Button 
                  variant={activeFilter === 'pending' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveFilter('pending')}
                >
                  <Clock className="h-4 w-4" />
                  Pending ({requests.filter(r => r.status === 'pending').length})
                </Button>
                <Button 
                  variant={activeFilter === 'accepted' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveFilter('accepted')}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Accepted ({requests.filter(r => r.status === 'accepted').length})
                </Button>
                <Button 
                  variant={activeFilter === 'rejected' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveFilter('rejected')}
                >
                  <XCircle className="h-4 w-4" />
                  Rejected ({requests.filter(r => r.status === 'rejected').length})
                </Button>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg mt-6">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  Guidelines
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
                  <li>Review each request carefully before making a decision</li>
                  <li>For rejected requests, provide a constructive reason</li>
                  <li>Consider your current mentoring capacity before accepting</li>
                  <li>Aim to respond to requests within 48 hours</li>
                </ul>
              </div>
            </div>
            
            {/* Requests List */}
            <div className="flex-1 space-y-4">
              {filteredRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 bg-muted/20 rounded-lg">
                  <ClipboardList className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No {activeFilter === 'all' ? '' : activeFilter} requests found</p>
                </div>
              ) : (
                filteredRequests.map(request => (
                  <Card key={request.id} className={`overflow-hidden ${request.status === 'rejected' ? 'bg-muted/20' : ''}`}>
                    <div className="flex p-4">
                      <div className="mr-4">
                        <div className={`w-12 h-12 rounded-full overflow-hidden ${request.status === 'rejected' ? 'opacity-70' : ''}`}>
                          <img src={request.imageUrl} alt={request.menteeName} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{request.menteeName}</h4>
                            <p className="text-sm text-muted-foreground">{request.menteeTitle}</p>
                          </div>
                          <div>{getStatusBadge(request.status)}</div>
                        </div>
                        <div className="mt-2">
                          <Badge variant="secondary" className={`mr-2 ${request.status === 'rejected' ? 'opacity-70' : ''}`}>{request.topic}</Badge>
                          <span className="text-xs text-muted-foreground">
                            Requested on {new Date(request.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="mt-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                          <p>{request.message}</p>
                        </div>
                        
                        {request.reason && (
                          <div className="mt-2 p-2 bg-destructive/10 rounded-md flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                            <p className="text-sm text-destructive">Rejection reason: {request.reason}</p>
                          </div>
                        )}
                        
                        {request.status === 'pending' && (
                          <div className="mt-4 flex justify-end space-x-2">
                            {/* Dialog for rejection */}
                            <Dialog open={showRejectDialog && selectedRequest?.id === request.id} onOpenChange={(open) => {
                              setShowRejectDialog(open);
                              if (!open) setRejectReason('');
                              if (open) setSelectedRequest(request);
                            }}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-destructive hover:text-destructive"
                                >
                                  Reject
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Reject Mentorship Request</DialogTitle>
                                  <DialogDescription>
                                    Please provide a reason for rejecting this request. This helps the mentee understand and potentially improve future requests.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <h4 className="text-sm font-medium mb-2">Reason for Rejection</h4>
                                  <Textarea 
                                    placeholder="e.g., Currently at maximum mentee capacity, Topic outside my area of expertise..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    className="h-32"
                                  />
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Cancel</Button>
                                  <Button 
                                    variant="destructive" 
                                    onClick={() => selectedRequest && handleRejectRequest(selectedRequest)}
                                  >
                                    Reject Request
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            {/* Dialog for acceptance */}
                            <Dialog open={showAcceptDialog && selectedRequest?.id === request.id} onOpenChange={(open) => {
                              setShowAcceptDialog(open);
                              if (!open) {
                                setGoals('');
                                setTimeline('');
                              }
                              if (open) setSelectedRequest(request);
                            }}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                >
                                  Accept
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Accept Mentorship Request</DialogTitle>
                                  <DialogDescription>
                                    Define preliminary goals and timeline for this mentorship
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Preliminary Goals</h4>
                                    <Textarea 
                                      placeholder="Outline key skills/knowledge the mentee should gain..."
                                      value={goals}
                                      onChange={(e) => setGoals(e.target.value)}
                                      className="h-24"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Expected Timeline</h4>
                                    <Input 
                                      placeholder="e.g., 3 months, 6 sessions"
                                      value={timeline}
                                      onChange={(e) => setTimeline(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowAcceptDialog(false)}>Cancel</Button>
                                  <Button 
                                    onClick={() => selectedRequest && handleAcceptRequest(selectedRequest)}
                                  >
                                    Accept Request
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenteeRequests;
