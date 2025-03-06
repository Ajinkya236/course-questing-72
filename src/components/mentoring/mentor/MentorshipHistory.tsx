
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  CheckCircle2, 
  XCircle, 
  User, 
  Calendar, 
  Clock, 
  Star, 
  Award,
  Download,
  FileText,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for completed and withdrawn mentorships
const historyData = [
  {
    id: 1,
    menteeName: "James Harrington",
    menteeTitle: "Marketing Specialist",
    topic: "Digital Marketing",
    startDate: "2023-05-12",
    endDate: "2023-08-25",
    status: "completed" as const,
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    sessions: 8,
    averageRating: 4.8,
    feedback: "Thanks for your guidance on developing a comprehensive digital marketing strategy. Your insights on market analysis and audience targeting were incredibly valuable.",
    mentorFeedback: "James showed exceptional dedication and growth throughout our mentorship. He quickly applied concepts and consistently went above and beyond.",
    hasDownloadableCertificate: true
  },
  {
    id: 2,
    menteeName: "Priya Patel",
    menteeTitle: "Data Analyst",
    topic: "Data Visualization",
    startDate: "2023-04-10",
    endDate: "2023-07-15",
    status: "completed" as const,
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    sessions: 6,
    averageRating: 5.0,
    feedback: "Your guidance helped me transform complex data into clear visualizations that drive business decisions. I especially appreciated your patience and practical examples.",
    mentorFeedback: "Priya demonstrated a remarkable ability to translate concepts into practical applications. Her growth in dashboard design was impressive.",
    hasDownloadableCertificate: true
  },
  {
    id: 3,
    menteeName: "Thomas Wright",
    menteeTitle: "Project Coordinator",
    topic: "Project Management",
    startDate: "2023-06-20",
    endDate: "2023-07-05",
    status: "withdrawn" as const,
    withdrawnReason: "Scheduling conflicts prevented consistent participation",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    sessions: 2,
    averageRating: null,
    feedback: null,
    mentorFeedback: "While our mentorship was cut short, Thomas showed interest in learning project management fundamentals and participated actively in our sessions.",
    hasDownloadableCertificate: false
  }
];

const MentorshipHistory = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState(historyData);
  const [selectedMentorship, setSelectedMentorship] = useState<any | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'withdrawn'>('all');
  const [activeTab, setActiveTab] = useState<string>('sessions');

  const handleSendFeedback = () => {
    if (selectedMentorship && feedback) {
      const updatedHistory = history.map(mentorship => {
        if (mentorship.id === selectedMentorship.id) {
          return {
            ...mentorship,
            mentorFeedback: feedback
          };
        }
        return mentorship;
      });
      
      setHistory(updatedHistory);
      setShowFeedbackDialog(false);
      setFeedback('');
      toast({
        title: "Feedback Sent",
        description: `Your feedback has been sent to ${selectedMentorship.menteeName}.`
      });
    }
  };

  const handleDownloadCertificate = (mentorshipId: number) => {
    toast({
      title: "Certificate Downloaded",
      description: "The mentorship certificate has been downloaded."
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Completed</Badge>;
      case 'withdrawn':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Withdrawn</Badge>;
      default:
        return null;
    }
  };

  const renderStarRating = (rating: number | null) => {
    if (rating === null) return null;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} 
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const filteredHistory = activeFilter === 'all' 
    ? history 
    : history.filter(mentorship => mentorship.status === activeFilter);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Mentorship History
          </CardTitle>
          <CardDescription>
            View your past mentorships and outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Vertical Filters */}
            <div className="md:w-64 space-y-2">
              <h3 className="text-sm font-medium mb-3">Filter by Status</h3>
              <div className="space-y-1">
                <Button 
                  variant={activeFilter === 'all' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setActiveFilter('all')}
                >
                  All Mentorships ({history.length})
                </Button>
                <Button 
                  variant={activeFilter === 'completed' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveFilter('completed')}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Completed ({history.filter(m => m.status === 'completed').length})
                </Button>
                <Button 
                  variant={activeFilter === 'withdrawn' ? 'default' : 'outline'} 
                  size="sm" 
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveFilter('withdrawn')}
                >
                  <XCircle className="h-4 w-4" />
                  Withdrawn ({history.filter(m => m.status === 'withdrawn').length})
                </Button>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg mt-6">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Impact Summary
                </h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Mentorships:</span>
                    <span className="font-medium">{history.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Completed:</span>
                    <span className="font-medium">{history.filter(m => m.status === 'completed').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Sessions:</span>
                    <span className="font-medium">{history.reduce((total, m) => total + m.sessions, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg. Rating:</span>
                    <span className="font-medium">
                      {(history
                        .filter(m => m.averageRating !== null)
                        .reduce((total, m) => total + (m.averageRating || 0), 0) / 
                        history.filter(m => m.averageRating !== null).length
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* History List */}
            <div className="flex-1 space-y-4">
              {filteredHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 bg-muted/20 rounded-lg">
                  <History className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No {activeFilter === 'all' ? '' : activeFilter} mentorships found</p>
                </div>
              ) : (
                filteredHistory.map(mentorship => (
                  <Card key={mentorship.id} className={`overflow-hidden ${mentorship.status === 'withdrawn' ? 'bg-muted/20' : ''}`}>
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 md:p-6 md:border-r md:w-1/3">
                        <div className="flex items-start gap-3 mb-4">
                          <div className={`w-14 h-14 rounded-full overflow-hidden ${mentorship.status === 'withdrawn' ? 'opacity-70' : ''}`}>
                            <img src={mentorship.imageUrl} alt={mentorship.menteeName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{mentorship.menteeName}</h3>
                            <p className="text-sm text-muted-foreground">{mentorship.menteeTitle}</p>
                            <div className="mt-1">
                              <Badge variant="secondary">{mentorship.topic}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>
                              {new Date(mentorship.startDate).toLocaleDateString()} - {new Date(mentorship.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Sessions:</span>
                            <span>{mentorship.sessions}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Status:</span>
                            <span>{getStatusBadge(mentorship.status)}</span>
                          </div>
                        </div>
                        
                        {mentorship.averageRating !== null && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-1">Mentee Rating</h4>
                            {renderStarRating(mentorship.averageRating)}
                          </div>
                        )}
                        
                        <div className="mt-4 space-x-2">
                          <Button 
                            variant="default" 
                            className="w-full"
                            onClick={() => setSelectedMentorship(mentorship)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      {selectedMentorship?.id === mentorship.id && (
                        <div className="md:w-2/3 border-t md:border-t-0 p-4 md:p-6">
                          <Tabs defaultValue="sessions" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="w-full grid grid-cols-2 mb-4">
                              <TabsTrigger value="feedback">Feedback</TabsTrigger>
                              <TabsTrigger value="materials">Materials & Certificate</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="feedback">
                              <div className="space-y-4">
                                {mentorship.feedback && (
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Mentee Feedback</h3>
                                    <div className="bg-muted/30 p-4 rounded-lg relative">
                                      <div className="absolute top-3 right-3">
                                        {renderStarRating(mentorship.averageRating)}
                                      </div>
                                      <p className="text-sm text-muted-foreground italic pr-32">"{mentorship.feedback}"</p>
                                    </div>
                                  </div>
                                )}
                                
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-medium">Your Feedback</h3>
                                    <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
                                      <DialogTrigger asChild>
                                        <Button size="sm" variant="outline" className="gap-1">
                                          {mentorship.mentorFeedback ? "Edit Feedback" : "Provide Feedback"}
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Mentorship Feedback</DialogTitle>
                                          <DialogDescription>
                                            Share your assessment and feedback for {mentorship.menteeName}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                          <Textarea 
                                            placeholder="Provide your feedback on the mentee's progress, engagement, and outcomes..." 
                                            className="min-h-[200px]"
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                          />
                                        </div>
                                        <DialogFooter>
                                          <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>Cancel</Button>
                                          <Button onClick={handleSendFeedback}>Send Feedback</Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                  
                                  {mentorship.mentorFeedback ? (
                                    <div className="bg-muted/30 p-4 rounded-lg">
                                      <p className="text-sm text-muted-foreground">{mentorship.mentorFeedback}</p>
                                    </div>
                                  ) : (
                                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                                      <p className="text-sm text-muted-foreground">You haven't provided feedback yet</p>
                                    </div>
                                  )}
                                </div>
                                
                                {mentorship.status === 'withdrawn' && mentorship.withdrawnReason && (
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Withdrawal Reason</h3>
                                    <div className="bg-muted/30 p-4 rounded-lg">
                                      <p className="text-sm text-muted-foreground">{mentorship.withdrawnReason}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="materials">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Documents & Materials</h3>
                                  <Card>
                                    <div className="p-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Button variant="outline" className="justify-start gap-2" disabled>
                                          <FileText className="h-4 w-4" />
                                          Session Notes
                                        </Button>
                                        <Button variant="outline" className="justify-start gap-2" disabled>
                                          <Download className="h-4 w-4" />
                                          Task Materials
                                        </Button>
                                        <Button variant="outline" className="justify-start gap-2" disabled>
                                          <Mail className="h-4 w-4" />
                                          Session Recordings
                                        </Button>
                                        <Button variant="outline" className="justify-start gap-2" disabled>
                                          <User className="h-4 w-4" />
                                          Mentee Reports
                                        </Button>
                                      </div>
                                    </div>
                                  </Card>
                                </div>
                                
                                {mentorship.status === 'completed' && (
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Mentorship Certificate</h3>
                                    <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
                                      <div className="p-4 flex flex-col items-center text-center">
                                        <Award className="h-10 w-10 text-primary mb-2" />
                                        <h4 className="font-medium mb-1">Certificate of Completion</h4>
                                        <p className="text-sm text-muted-foreground mb-4">
                                          This certificate recognizes the successful completion of the mentorship program in {mentorship.topic}.
                                        </p>
                                        <Button 
                                          onClick={() => handleDownloadCertificate(mentorship.id)}
                                          className="gap-2"
                                          disabled={!mentorship.hasDownloadableCertificate}
                                        >
                                          <Download className="h-4 w-4" />
                                          Download Certificate
                                        </Button>
                                      </div>
                                    </Card>
                                  </div>
                                )}
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      )}
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

export default MentorshipHistory;
