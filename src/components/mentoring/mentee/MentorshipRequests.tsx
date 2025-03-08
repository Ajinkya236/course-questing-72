
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, X, Edit, Trash, MessageCircle, UserMinus } from 'lucide-react';
import WithdrawRequestButton from './WithdrawRequestButton';

// Mock data for mentorship requests
const pendingRequests = [
  {
    id: 1,
    mentorName: "Dr. Sarah Johnson",
    mentorTitle: "Senior Data Scientist",
    mentorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    topics: ["Data Analysis", "Statistics"],
    submittedDate: "2023-10-30",
    message: "I'm interested in learning more about data visualization techniques and statistical analysis methods."
  },
  {
    id: 2,
    mentorName: "James Wilson",
    mentorTitle: "Software Engineering Lead",
    mentorImage: "https://randomuser.me/api/portraits/men/86.jpg",
    topics: ["Software Development", "System Architecture"],
    submittedDate: "2023-11-02",
    message: "I would like guidance on developing scalable cloud applications and improving my system design skills."
  }
];

const acceptedRequests = [
  {
    id: 3,
    mentorName: "Michael Chen",
    mentorTitle: "Product Manager",
    mentorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    topics: ["Product Management", "Agile Methodologies"],
    submittedDate: "2023-09-15",
    acceptedDate: "2023-09-18",
    startDate: "2023-09-25",
    message: "I want to improve my product management skills and learn how to effectively prioritize features."
  }
];

const rejectedRequests = [
  {
    id: 4,
    mentorName: "Elena Rodriguez",
    mentorTitle: "Executive Coach",
    mentorImage: "https://randomuser.me/api/portraits/women/28.jpg",
    topics: ["Leadership", "Communication"],
    submittedDate: "2023-10-05",
    rejectedDate: "2023-10-10",
    reason: "Mentor currently at maximum capacity with mentees.",
    message: "I'm looking for guidance on improving my leadership and communication skills for a management role."
  }
];

const MentorshipRequests = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const handleEditRequest = (request: any) => {
    setSelectedRequest(request);
    setEditedMessage(request.message);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    toast({
      title: "Request Updated",
      description: "Your mentorship request has been updated."
    });
    setShowEditDialog(false);
  };

  const handleWithdrawRequest = (request: any) => {
    setSelectedRequest(request);
    setShowWithdrawDialog(true);
  };

  const confirmWithdraw = () => {
    toast({
      title: "Request Withdrawn",
      description: "Your mentorship request has been withdrawn."
    });
    setShowWithdrawDialog(false);
  };

  const handleViewMessage = (request: any) => {
    setSelectedRequest(request);
    setShowMessageDialog(true);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case 'accepted':
        return (
          <Badge variant="default" className="flex items-center gap-1 bg-green-600">
            <CheckCircle className="h-3 w-3" />
            Accepted
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <X className="h-3 w-3" />
            Declined
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mentorship Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending" className="flex items-center gap-1">
                <Clock className="h-4 w-4 md:mr-1" />
                <span>Pending ({pendingRequests.length})</span>
              </TabsTrigger>
              <TabsTrigger value="accepted" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 md:mr-1" />
                <span>Accepted ({acceptedRequests.length})</span>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-1">
                <X className="h-4 w-4 md:mr-1" />
                <span>Declined ({rejectedRequests.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map(request => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={request.mentorImage} 
                              alt={request.mentorName} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{request.mentorName}</h3>
                                <p className="text-sm text-muted-foreground">{request.mentorTitle}</p>
                              </div>
                              {renderStatusBadge('pending')}
                            </div>
                            <div className="flex flex-wrap gap-1 my-2">
                              {request.topics.map(topic => (
                                <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                              ))}
                            </div>
                            <p className="text-sm mb-2 line-clamp-2">{request.message}</p>
                            <div className="flex justify-between items-center mt-3">
                              <p className="text-xs text-muted-foreground">
                                Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                              </p>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleViewMessage(request)}
                                >
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleEditRequest(request)}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 px-2 text-destructive hover:text-destructive"
                                  onClick={() => handleWithdrawRequest(request)}
                                >
                                  <Trash className="h-4 w-4 mr-1" />
                                  Withdraw
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="accepted">
              {acceptedRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No accepted requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {acceptedRequests.map(request => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={request.mentorImage} 
                              alt={request.mentorName} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{request.mentorName}</h3>
                                <p className="text-sm text-muted-foreground">{request.mentorTitle}</p>
                              </div>
                              {renderStatusBadge('accepted')}
                            </div>
                            <div className="flex flex-wrap gap-1 my-2">
                              {request.topics.map(topic => (
                                <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                              ))}
                            </div>
                            <p className="text-sm mb-2">{request.message}</p>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">
                                  Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Accepted: {new Date(request.acceptedDate).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Start Date: {new Date(request.startDate).toLocaleDateString()}
                                </p>
                              </div>
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => window.location.href = "/mentoring?tab=mentee&section=active"}
                              >
                                View Engagement
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rejected">
              {rejectedRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No declined requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rejectedRequests.map(request => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={request.mentorImage} 
                              alt={request.mentorName} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{request.mentorName}</h3>
                                <p className="text-sm text-muted-foreground">{request.mentorTitle}</p>
                              </div>
                              {renderStatusBadge('rejected')}
                            </div>
                            <div className="flex flex-wrap gap-1 my-2">
                              {request.topics.map(topic => (
                                <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                              ))}
                            </div>
                            <p className="text-sm mb-2">{request.message}</p>
                            {request.reason && (
                              <div className="bg-destructive/10 p-3 rounded-md mb-3">
                                <p className="text-sm font-medium">Reason for declining:</p>
                                <p className="text-sm">{request.reason}</p>
                              </div>
                            )}
                            <div className="flex justify-between items-center mt-3">
                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">
                                  Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Declined: {new Date(request.rejectedDate).toLocaleDateString()}
                                </p>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => window.location.href = "/mentoring?tab=mentee&section=discovery"}
                              >
                                Find New Mentor
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Message to {selectedRequest?.mentorName}</DialogTitle>
            <DialogDescription>
              Submitted on {selectedRequest && new Date(selectedRequest.submittedDate).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="whitespace-pre-wrap">{selectedRequest?.message}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowMessageDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Request Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Your Request</DialogTitle>
            <DialogDescription>
              Update your mentorship request to {selectedRequest?.mentorName}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              placeholder="Describe your mentoring goals and what you hope to learn..."
              className="resize-none"
              rows={6}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Request Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to withdraw your mentorship request to {selectedRequest?.mentorName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmWithdraw}>Withdraw Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorshipRequests;
