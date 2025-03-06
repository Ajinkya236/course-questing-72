
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Calendar, 
  FileText, 
  BookOpen, 
  CheckCircle, 
  Upload, 
  PenTool,
  X,
  ThumbsUp,
  ChevronRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Mock data for active engagements
const activeEngagementsData = [
  {
    id: 1,
    mentorName: "Dr. Sarah Johnson",
    mentorTitle: "Senior Data Scientist",
    topic: "Data Analysis",
    startDate: "2023-10-20",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    progress: 40,
    sessions: [
      { id: 1, title: "Introduction to Data Analysis", date: "2023-10-25", status: "completed", notes: "Discussed key concepts and tools" },
      { id: 2, title: "Advanced Data Visualization", date: "2023-11-05", status: "upcoming" }
    ],
    tasks: [
      { id: 1, title: "Data Cleaning Exercise", dueDate: "2023-10-30", status: "completed" },
      { id: 2, title: "Visualization Project", dueDate: "2023-11-15", status: "pending" }
    ],
    courses: [
      { id: 1, title: "Fundamentals of Data Analysis", progress: 75, totalModules: 8, completedModules: 6 }
    ]
  },
  {
    id: 2,
    mentorName: "Michael Chen",
    mentorTitle: "Product Manager",
    topic: "Product Management",
    startDate: "2023-09-15",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    progress: 65,
    sessions: [
      { id: 1, title: "Product Requirements", date: "2023-09-20", status: "completed", notes: "Learned how to gather and document requirements" },
      { id: 2, title: "Stakeholder Management", date: "2023-10-05", status: "completed", notes: "Discussed effective communication strategies" },
      { id: 3, title: "Product Roadmapping", date: "2023-10-20", status: "completed", notes: "Created a sample roadmap" },
      { id: 4, title: "Launch Strategies", date: "2023-11-10", status: "upcoming" }
    ],
    tasks: [
      { id: 1, title: "Competitive Analysis", dueDate: "2023-09-30", status: "completed" },
      { id: 2, title: "Create PRD Document", dueDate: "2023-10-15", status: "completed" },
      { id: 3, title: "User Persona Development", dueDate: "2023-11-05", status: "pending" }
    ],
    courses: [
      { id: 1, title: "Product Management Fundamentals", progress: 100, totalModules: 10, completedModules: 10 },
      { id: 2, title: "Agile Product Development", progress: 40, totalModules: 5, completedModules: 2 }
    ]
  }
];

const ActiveEngagements = () => {
  const { toast } = useToast();
  const [engagements, setEngagements] = useState(activeEngagementsData);
  const [activeEngagementId, setActiveEngagementId] = useState<number | null>(
    engagements.length > 0 ? engagements[0].id : null
  );
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [showTaskSubmissionDialog, setShowTaskSubmissionDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [sessionNote, setSessionNote] = useState('');
  const [taskFile, setTaskFile] = useState<File | null>(null);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completionFeedback, setCompletionFeedback] = useState('');

  const activeEngagement = engagements.find(e => e.id === activeEngagementId) || null;

  const handleAddNote = () => {
    if (!activeEngagement || !selectedSession || !sessionNote.trim()) return;
    
    toast({
      title: "Note Added",
      description: "Your note has been saved successfully."
    });
    
    setSessionNote('');
    setShowNoteDialog(false);
  };

  const handleTaskSubmission = () => {
    if (!activeEngagement || !selectedTask || !taskFile) return;
    
    toast({
      title: "Task Submitted",
      description: `Your submission for "${selectedTask.title}" has been uploaded.`
    });
    
    setTaskFile(null);
    setShowTaskSubmissionDialog(false);
  };

  const handleWithdrawEngagement = () => {
    if (!activeEngagementId) return;
    
    setEngagements(engagements.filter(e => e.id !== activeEngagementId));
    
    toast({
      title: "Engagement Withdrawn",
      description: "You have successfully withdrawn from this mentoring engagement."
    });
    
    setShowWithdrawDialog(false);
    setActiveEngagementId(engagements.length > 0 ? engagements[0].id : null);
  };

  const handleCompleteEngagement = () => {
    toast({
      title: "Engagement Completed",
      description: "You have successfully completed this mentoring engagement."
    });
    
    setShowCompletionDialog(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Active Mentoring Engagements
          </CardTitle>
          <CardDescription>
            Manage your ongoing mentorships and track your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          {engagements.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Active Engagements</h3>
              <p className="text-muted-foreground mb-6">You don't have any active mentoring engagements yet.</p>
              <Button onClick={() => window.location.href = '/mentoring?tab=discovery'}>
                Find a Mentor
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium mb-4">My Engagements</h3>
                <div className="space-y-3">
                  {engagements.map(engagement => (
                    <Card 
                      key={engagement.id} 
                      className={`overflow-hidden cursor-pointer hover:border-primary/50 transition-colors ${
                        activeEngagementId === engagement.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setActiveEngagementId(engagement.id)}
                    >
                      <div className="flex p-3">
                        <div className="mr-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src={engagement.imageUrl} alt={engagement.mentorName} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{engagement.mentorName}</h4>
                          <Badge variant="secondary" className="mt-1">{engagement.topic}</Badge>
                          <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${engagement.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-right text-muted-foreground mt-1">{engagement.progress}% complete</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {activeEngagement && (
                  <div className="mt-6">
                    <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full text-destructive" size="sm">
                          Withdraw from Engagement
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Withdraw from Engagement</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to withdraw from your mentoring engagement with {activeEngagement.mentorName}?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            This action cannot be undone. Your mentor will be notified of your withdrawal.
                          </p>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>Cancel</Button>
                          <Button variant="destructive" onClick={handleWithdrawEngagement}>Withdraw</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
                      <DialogTrigger asChild>
                        <Button variant="default" className="w-full mt-2" size="sm">
                          Complete Engagement
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Complete Engagement</DialogTitle>
                          <DialogDescription>
                            Please confirm that you have met your learning objectives with {activeEngagement.mentorName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <h4 className="text-sm font-medium mb-2">Feedback on Goals Achieved</h4>
                          <Textarea 
                            placeholder="Please share what you've learned and how this mentorship helped you achieve your goals..."
                            value={completionFeedback}
                            onChange={(e) => setCompletionFeedback(e.target.value)}
                            className="resize-none"
                            rows={4}
                          />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowCompletionDialog(false)}>Cancel</Button>
                          <Button onClick={handleCompleteEngagement}>Complete & Send Feedback</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                {activeEngagement && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Engagement with {activeEngagement.mentorName}</h3>
                      <Badge variant="outline">Started {new Date(activeEngagement.startDate).toLocaleDateString()}</Badge>
                    </div>
                    
                    <Tabs defaultValue="sessions" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="sessions" className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Sessions</span>
                        </TabsTrigger>
                        <TabsTrigger value="tasks" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>Tasks</span>
                        </TabsTrigger>
                        <TabsTrigger value="courses" className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>Courses</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="sessions">
                        <div className="space-y-4">
                          {activeEngagement.sessions.map(session => (
                            <Card key={session.id}>
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium">{session.title}</h4>
                                  <Badge 
                                    variant={session.status === 'completed' ? 'default' : 'outline'}
                                  >
                                    {session.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {new Date(session.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                                
                                {session.notes && (
                                  <div className="bg-muted/30 p-3 rounded-md mb-3">
                                    <h5 className="text-sm font-medium mb-1">Your Notes</h5>
                                    <p className="text-sm">{session.notes}</p>
                                  </div>
                                )}
                                
                                {session.status === 'completed' && (
                                  <div className="flex justify-end">
                                    <Dialog open={showNoteDialog && selectedSession?.id === session.id} onOpenChange={(open) => {
                                      setShowNoteDialog(open);
                                      if (open) setSelectedSession(session);
                                    }}>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="gap-1">
                                          <PenTool className="h-3.5 w-3.5" />
                                          {session.notes ? 'Edit Notes' : 'Add Notes'}
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Session Notes</DialogTitle>
                                          <DialogDescription>
                                            Add private notes for your session on {session.title}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                          <Textarea
                                            placeholder="Add your notes, key learnings, or action items from this session..."
                                            value={sessionNote}
                                            onChange={(e) => setSessionNote(e.target.value)}
                                            className="resize-none"
                                            rows={6}
                                          />
                                        </div>
                                        <DialogFooter>
                                          <Button variant="outline" onClick={() => setShowNoteDialog(false)}>Cancel</Button>
                                          <Button onClick={handleAddNote}>Save Notes</Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                )}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tasks">
                        <div className="space-y-4">
                          {activeEngagement.tasks.map(task => (
                            <Card key={task.id}>
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium">{task.title}</h4>
                                  <Badge 
                                    variant={task.status === 'completed' ? 'default' : task.status === 'pending' ? 'outline' : 'secondary'}
                                  >
                                    {task.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </p>
                                
                                {task.status === 'pending' && (
                                  <div className="flex justify-end">
                                    <Dialog open={showTaskSubmissionDialog && selectedTask?.id === task.id} onOpenChange={(open) => {
                                      setShowTaskSubmissionDialog(open);
                                      if (open) setSelectedTask(task);
                                    }}>
                                      <DialogTrigger asChild>
                                        <Button variant="default" size="sm" className="gap-1">
                                          <Upload className="h-3.5 w-3.5" />
                                          Submit Task
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Submit Task</DialogTitle>
                                          <DialogDescription>
                                            Upload your completed work for {task.title}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                          <label className="block text-sm font-medium mb-2">Upload Document</label>
                                          <Input
                                            type="file"
                                            onChange={(e) => setTaskFile(e.target.files?.[0] || null)}
                                          />
                                          <p className="text-xs text-muted-foreground mt-2">
                                            Accepted file types: PDF, DOC, DOCX, PPT, PPTX (Max: 10MB)
                                          </p>
                                        </div>
                                        <DialogFooter>
                                          <Button variant="outline" onClick={() => setShowTaskSubmissionDialog(false)}>Cancel</Button>
                                          <Button 
                                            onClick={handleTaskSubmission}
                                            disabled={!taskFile}
                                          >
                                            Submit Task
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                )}
                                
                                {task.status === 'completed' && (
                                  <div className="flex justify-end">
                                    <Badge variant="outline" className="gap-1">
                                      <CheckCircle className="h-3.5 w-3.5 text-primary" />
                                      Completed
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="courses">
                        <div className="space-y-4">
                          {activeEngagement.courses.map(course => (
                            <Card key={course.id}>
                              <div className="p-4">
                                <h4 className="font-medium mb-2">{course.title}</h4>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-muted-foreground">
                                    {course.completedModules} of {course.totalModules} modules completed
                                  </span>
                                  <span className="text-sm font-medium">{course.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                
                                <div className="flex justify-end">
                                  <Button variant="outline" size="sm" className="gap-1" onClick={() => window.location.href = '/my-learning'}>
                                    Continue Learning
                                    <ChevronRight className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveEngagements;
