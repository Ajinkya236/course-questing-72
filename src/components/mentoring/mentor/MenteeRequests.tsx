import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Briefcase, GraduationCap, Clock, Building, Calendar, MessageSquare, FileText } from 'lucide-react';

// Mock data for mentee requests
const mockPendingRequests = [
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

const mockActiveRequests = [
  {
    id: 3,
    mentee: {
      id: 'mentee1',
      name: 'Alex Johnson',
      role: 'Frontend Developer',
      avatar: 'https://i.pravatar.cc/150?img=11',
      department: 'Engineering'
    },
    startDate: '2023-08-15',
    endDate: '2023-11-15',
    nextSession: '2023-10-05',
    progress: 60,
    skills: ['JavaScript', 'React', 'UI/UX'],
    completedSessions: 5,
    totalSessions: 12
  },
  {
    id: 4,
    mentee: {
      id: 'mentee2',
      name: 'Jessica Smith',
      role: 'Data Analyst',
      avatar: 'https://i.pravatar.cc/150?img=5',
      department: 'Business Intelligence'
    },
    startDate: '2023-09-01',
    endDate: '2023-12-01',
    nextSession: '2023-10-03',
    progress: 35,
    skills: ['SQL', 'Data Visualization', 'Python'],
    completedSessions: 3,
    totalSessions: 10
  }
];

const mockCompletedRequests = [
  {
    id: 5,
    mentee: {
      id: 'mentee5',
      name: 'Daniel Brown',
      role: 'UX Designer',
      avatar: 'https://i.pravatar.cc/150?img=12',
      department: 'Design'
    },
    startDate: '2023-06-01',
    endDate: '2023-09-01',
    skills: ['User Research', 'Prototyping', 'Usability Testing'],
    completedSessions: 12,
    totalSessions: 12,
    feedback: "Great mentorship experience. I learned a lot about user research methodologies and improved my prototyping skills."
  }
];

const MenteeRequests = () => {
  const { toast } = useToast();
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [activeRequests, setActiveRequests] = useState(mockActiveRequests);
  const [completedRequests, setCompletedRequests] = useState(mockCompletedRequests);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  
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
    
    // Remove from pending and add to active
    setPendingRequests(pendingRequests.filter(req => req.id !== selectedRequest.id));
    const newActiveRequest = {
      id: selectedRequest.id,
      mentee: selectedRequest.mentee,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
      nextSession: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
      progress: 0,
      skills: selectedRequest.skills,
      completedSessions: 0,
      totalSessions: 10
    };
    setActiveRequests([...activeRequests, newActiveRequest]);
    setAcceptDialogOpen(false);
    
    toast({
      title: "Request Accepted",
      description: `You are now mentoring ${selectedRequest.mentee.name}. A notification has been sent to the mentee.`,
    });
  };
  
  const handleDeclineRequest = () => {
    if (!selectedRequest) return;
    
    setPendingRequests(pendingRequests.filter(req => req.id !== selectedRequest.id));
    setDeclineDialogOpen(false);
    
    toast({
      title: "Request Declined",
      description: `You have declined the mentorship request from ${selectedRequest.mentee.name}.`,
    });
  };

  const handleCompleteRequest = (request) => {
    // Remove from active and add to completed
    setActiveRequests(activeRequests.filter(req => req.id !== request.id));
    const newCompletedRequest = {
      ...request,
      endDate: new Date().toISOString().split('T')[0],
      completedSessions: request.completedSessions,
      totalSessions: request.totalSessions,
      feedback: "Mentorship completed successfully."
    };
    setCompletedRequests([...completedRequests, newCompletedRequest]);
    
    toast({
      title: "Mentorship Completed",
      description: `Your mentorship with ${request.mentee.name} has been marked as completed.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="pending" className="flex items-center gap-1">
            <Clock className="h-4 w-4 md:mr-1" />
            <span>Pending</span>
            <Badge variant="secondary" className="ml-1">{pendingRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Check className="h-4 w-4 md:mr-1" />
            <span>Active</span>
            <Badge variant="secondary" className="ml-1">{activeRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4 md:mr-1" />
            <span>Completed</span>
            <Badge variant="secondary" className="ml-1">{completedRequests.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          {pendingRequests.length === 0 ? (
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
              {pendingRequests.map((request) => (
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
        </TabsContent>
        
        <TabsContent value="active">
          {activeRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <GraduationCap className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No Active Mentorships</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  You don't have any active mentorships at the moment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {activeRequests.map((request) => (
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
                      <Badge className="flex items-center gap-1 w-fit bg-green-500 text-white">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Start Date</h4>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.startDate}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Next Session</h4>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.nextSession}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Progress</h4>
                      <div className="h-2 bg-secondary rounded-full w-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${request.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{request.progress}% Complete</span>
                        <span className="text-xs text-muted-foreground">{request.completedSessions}/{request.totalSessions} Sessions</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Focus Areas</h4>
                      <div className="flex flex-wrap gap-1">
                        {request.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-primary/10">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                    >
                      <Calendar className="h-4 w-4" />
                      Schedule
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleCompleteRequest(request)}
                    >
                      <GraduationCap className="h-4 w-4 mr-1.5" />
                      Complete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {completedRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <GraduationCap className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No Completed Mentorships</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  You don't have any completed mentorships yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {completedRequests.map((request) => (
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
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>Completed: {request.endDate}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Duration</h4>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.startDate} to {request.endDate}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Sessions Completed</h4>
                        <div className="flex items-center gap-1">
                          <Check className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.completedSessions}/{request.totalSessions}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Skills Developed</h4>
                      <div className="flex flex-wrap gap-1">
                        {request.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-primary/10">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {request.feedback && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Feedback</h4>
                        <p className="text-sm text-muted-foreground bg-secondary/10 p-3 rounded-md">
                          "{request.feedback}"
                        </p>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <FileText className="h-4 w-4 mr-1.5" />
                      View Certificate
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
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
