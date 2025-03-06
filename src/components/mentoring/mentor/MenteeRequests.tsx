
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  ClipboardList, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare,
  AlertCircle,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for incoming requests
const requestsData = [
  {
    id: 1,
    menteeName: "Alex Johnson",
    menteeTitle: "Junior Software Developer",
    topic: "Career Development",
    status: "pending" as const,
    date: "2023-10-15",
    message: "I'm looking to advance my career in software development and would appreciate guidance on developing leadership skills while improving my technical abilities.",
    imageUrl: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    id: 2,
    menteeName: "Sarah Williams",
    menteeTitle: "Product Manager",
    topic: "Leadership Development",
    status: "pending" as const,
    date: "2023-10-17",
    message: "I've recently been promoted to a team lead position and would like mentorship on effective leadership practices and conflict resolution.",
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 3,
    menteeName: "Michael Chen",
    menteeTitle: "Data Analyst",
    topic: "Technical Skills",
    status: "pending" as const,
    date: "2023-10-18",
    message: "I want to transition from data analysis to data science and need guidance on the skills and projects I should focus on.",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    menteeName: "Emily Rodriguez",
    menteeTitle: "UX Designer",
    topic: "Career Transition",
    status: "pending" as const,
    date: "2023-10-20",
    message: "I'm looking to move into a product management role from UX design and would appreciate your insights and guidance on this transition.",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg"
  }
];

const MenteeRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState(requestsData);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const handleAcceptRequest = (requestId: number) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'accepted' as const } 
        : request
    ));
    toast({
      title: "Request Accepted",
      description: "You have accepted the mentorship request."
    });
  };

  const handleRejectRequest = () => {
    if (selectedRequest) {
      setRequests(requests.map(request => 
        request.id === selectedRequest.id 
          ? { ...request, status: 'rejected' as const, rejectionReason } 
          : request
      ));
      setShowRejectDialog(false);
      setRejectionReason('');
      toast({
        title: "Request Rejected",
        description: "You have rejected the mentorship request."
      });
    }
  };

  const getStatusBadge = (status: string) => {
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
            Incoming Mentee Requests
          </CardTitle>
          <CardDescription>
            Review and manage mentorship requests from potential mentees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Vertical Filters */}
            <div className="md:w-64 space-y-2">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter Requests
              </h3>
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
                  <li>Review each request carefully before accepting</li>
                  <li>Consider your availability and capacity before committing</li>
                  <li>When declining, provide constructive feedback</li>
                  <li>You can have a maximum of 5 active mentees at a time</li>
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
                        
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground line-clamp-2">{request.message}</p>
                        </div>
                        
                        {request.rejectionReason && (
                          <div className="mt-2 p-2 bg-muted rounded-md flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-sm text-muted-foreground">Your reason: {request.rejectionReason}</p>
                          </div>
                        )}
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <Dialog open={showDetailsDialog && selectedRequest?.id === request.id} onOpenChange={(open) => {
                            setShowDetailsDialog(open);
                            if (open) setSelectedRequest(request);
                          }}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-1"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setShowDetailsDialog(true);
                                }}
                              >
                                <MessageSquare className="h-4 w-4" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Request Details</DialogTitle>
                                <DialogDescription>
                                  Mentorship request from {selectedRequest?.menteeName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="flex items-center mb-4">
                                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                    <img src={selectedRequest?.imageUrl} alt={selectedRequest?.menteeName} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{selectedRequest?.menteeName}</h4>
                                    <p className="text-sm text-muted-foreground">{selectedRequest?.menteeTitle}</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <div>
                                    <h5 className="text-sm font-medium">Topic</h5>
                                    <p className="text-sm">{selectedRequest?.topic}</p>
                                  </div>
                                  
                                  <div>
                                    <h5 className="text-sm font-medium">Request Message</h5>
                                    <p className="text-sm bg-muted/30 p-3 rounded-md">{selectedRequest?.message}</p>
                                  </div>
                                  
                                  <div>
                                    <h5 className="text-sm font-medium">Requested on</h5>
                                    <p className="text-sm">{selectedRequest?.date ? new Date(selectedRequest.date).toLocaleDateString() : ''}</p>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                {selectedRequest?.status === 'pending' && (
                                  <>
                                    <Button 
                                      variant="outline" 
                                      onClick={() => {
                                        setShowDetailsDialog(false);
                                        setShowRejectDialog(true);
                                      }}
                                    >
                                      Decline
                                    </Button>
                                    <Button 
                                      onClick={() => {
                                        handleAcceptRequest(selectedRequest.id);
                                        setShowDetailsDialog(false);
                                      }}
                                    >
                                      Accept Request
                                    </Button>
                                  </>
                                )}
                                {selectedRequest?.status !== 'pending' && (
                                  <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {request.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-destructive hover:text-destructive"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setShowRejectDialog(true);
                                }}
                              >
                                Decline
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleAcceptRequest(request.id)}
                              >
                                Accept
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Mentorship Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for declining this request from {selectedRequest?.menteeName}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              placeholder="Explain why you're declining this request..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRejectRequest}>Decline Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenteeRequests;
