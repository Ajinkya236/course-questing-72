
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Mail, 
  Target
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for requests
const requestsData = [
  {
    id: 1,
    mentorName: "Dr. Sarah Johnson",
    mentorTitle: "Senior Data Scientist",
    topic: "Data Analysis",
    status: "pending" as const,
    date: "2023-10-15",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    mentorName: "Michael Chen",
    mentorTitle: "Product Manager",
    topic: "Product Management",
    status: "accepted" as const,
    date: "2023-10-10",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    mentorName: "James Wilson",
    mentorTitle: "Software Engineering Lead",
    topic: "Leadership",
    status: "rejected" as const,
    date: "2023-10-05",
    reason: "Currently at maximum mentee capacity",
    imageUrl: "https://randomuser.me/api/portraits/men/86.jpg"
  },
  {
    id: 4,
    mentorName: "Elena Rodriguez",
    mentorTitle: "Marketing Director",
    topic: "Digital Marketing",
    status: "pending" as const,
    date: "2023-10-18",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    id: 5,
    mentorName: "David Lee",
    mentorTitle: "UX Designer",
    topic: "UX Design",
    status: "accepted" as const,
    date: "2023-10-08",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg"
  }
];

const MentorshipRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState(requestsData);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [showSetGoalsDialog, setShowSetGoalsDialog] = useState(false);
  const [goal, setGoal] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const handleWithdrawRequest = (requestId: number) => {
    setRequests(requests.filter(request => request.id !== requestId));
    toast({
      title: "Request Withdrawn",
      description: "Your mentorship request has been withdrawn."
    });
  };

  const handleSetGoals = () => {
    toast({
      title: "Goals Set",
      description: "Your mentoring goals have been set successfully."
    });
    setShowSetGoalsDialog(false);
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
            My Mentorship Requests
          </CardTitle>
          <CardDescription>
            Track and manage your mentorship requests
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
                  Rules & Guidelines
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
                  <li>You can have a maximum of 2 active engagements at any time</li>
                  <li>You can only have one active engagement per topic</li>
                  <li>If you reach the maximum engagement limit, pending requests will be automatically rejected</li>
                  <li>You can withdraw a request at any time before it's accepted</li>
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
                          <img src={request.imageUrl} alt={request.mentorName} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{request.mentorName}</h4>
                            <p className="text-sm text-muted-foreground">{request.mentorTitle}</p>
                          </div>
                          <div>{getStatusBadge(request.status)}</div>
                        </div>
                        <div className="mt-2">
                          <Badge variant="secondary" className={`mr-2 ${request.status === 'rejected' ? 'opacity-70' : ''}`}>{request.topic}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {request.status === 'pending' && 'Requested on '}
                            {request.status === 'accepted' && 'Accepted on '}
                            {request.status === 'rejected' && 'Rejected on '}
                            {new Date(request.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        {request.reason && (
                          <div className="mt-2 p-2 bg-muted rounded-md flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-sm text-muted-foreground">{request.reason}</p>
                          </div>
                        )}
                        
                        <div className="mt-4 flex justify-end">
                          {request.status === 'pending' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleWithdrawRequest(request.id)}
                            >
                              Withdraw Request
                            </Button>
                          )}
                          
                          {request.status === 'accepted' && (
                            <Dialog open={showSetGoalsDialog && selectedRequest?.id === request.id} onOpenChange={(open) => {
                              setShowSetGoalsDialog(open);
                              if (open) setSelectedRequest(request);
                            }}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  className="gap-1"
                                >
                                  <Target className="h-4 w-4" />
                                  Set Goals
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Set Mentoring Goals</DialogTitle>
                                  <DialogDescription>
                                    Define specific goals for your mentoring journey with {selectedRequest?.mentorName}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <h4 className="text-sm font-medium mb-2">What do you want to achieve?</h4>
                                  <textarea 
                                    className="w-full p-2 border rounded-md resize-none h-32"
                                    placeholder="Describe your specific goals for this mentoring engagement..."
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                  />
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowSetGoalsDialog(false)}>Cancel</Button>
                                  <Button onClick={handleSetGoals}>Save Goals</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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
    </div>
  );
};

export default MentorshipRequests;
