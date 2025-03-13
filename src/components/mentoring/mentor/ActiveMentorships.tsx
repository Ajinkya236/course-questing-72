
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Calendar, 
  Video, 
  CheckCircle, 
  Plus,
  BookOpen,
  ListChecks,
  GraduationCap,
  Target,
  Download,
  ThumbsUp,
  Award,
  Star,
  X,
  ExternalLink,
  Pencil,
  Save,
  Trash
} from 'lucide-react';

interface ActiveMentorshipsProps {
  selectedMentee: number;
}

const ActiveMentorships: React.FC<ActiveMentorshipsProps> = ({ selectedMentee }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('tasks');
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showEditGoalsDialog, setShowEditGoalsDialog] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showScheduleSessionDialog, setShowScheduleSessionDialog] = useState(false);
  const [showCreateMeetingDialog, setShowCreateMeetingDialog] = useState(false);
  
  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskSampleFile, setTaskSampleFile] = useState<File | null>(null);
  
  // Feedback form state
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  
  // Goals editing state
  const [menteeGoals, setMenteeGoals] = useState("Learn data analysis techniques and tools");
  
  // Session state
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionDuration, setSessionDuration] = useState('60');
  
  // Meeting state
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  // Mock data for the selected mentee
  const menteeData = {
    1: {
      id: 1,
      name: "Emma Johnson",
      role: "Junior Developer",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      lastActive: "2 days ago"
    },
    2: {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Specialist",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      lastActive: "Yesterday"
    },
    3: {
      id: 3,
      name: "Sarah Williams",
      role: "Product Manager",
      avatar: "https://randomuser.me/api/portraits/women/64.jpg",
      lastActive: "Today"
    },
    4: {
      id: 4,
      name: "David Kim",
      role: "Data Scientist",
      avatar: "https://randomuser.me/api/portraits/men/58.jpg",
      lastActive: "3 days ago"
    },
    5: {
      id: 5,
      name: "Olivia Martinez",
      role: "UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/57.jpg",
      lastActive: "5 days ago"
    }
  };

  // Mock tasks array for this mentee
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: "Complete skill assessment", 
      dueDate: "2023-11-15", 
      status: "pending",
      description: "Take the technical assessment to help identify areas for improvement.",
      hasSample: false,
      submission: null
    },
    { 
      id: 2, 
      title: "Review career goals document", 
      dueDate: "2023-11-20", 
      status: "completed",
      description: "Review and comment on the career development plan I shared with you.",
      hasSample: true,
      submission: { 
        id: 1, 
        fileName: "career_goals_review.pdf", 
        submittedDate: "2023-11-18",
        feedback: "Good job identifying your strengths. Consider adding more specific timeframes.",
        rating: 4 
      }
    }
  ]);
  
  // Mock sessions array
  const [sessions, setSessions] = useState([
    { 
      id: 1, 
      title: "Weekly Check-in", 
      date: "2023-11-10T10:00:00", 
      status: "completed",
      notes: "Discussed progress on learning SQL basics and set goals for next week."
    },
    { 
      id: 2, 
      title: "Career Discussion", 
      date: "2023-11-28T14:00:00", 
      status: "upcoming"
    }
  ]);
  
  // For the selected mentee
  const selectedMenteeData = menteeData[selectedMentee];
  
  // Handle adding a new task
  const handleAddTask = () => {
    if (!taskTitle || !taskDueDate) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and due date for the task.",
        variant: "destructive"
      });
      return;
    }
    
    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      dueDate: taskDueDate,
      status: "pending",
      description: taskDescription,
      hasSample: !!taskSampleFile,
      submission: null
    };
    
    setTasks([...tasks, newTask]);
    
    toast({
      title: "Task Added",
      description: "The task has been assigned to the mentee successfully."
    });
    
    // Reset form
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskSampleFile(null);
    setShowAddTaskDialog(false);
  };
  
  // Handle providing feedback
  const handleProvideFeedback = () => {
    if (!selectedTaskId || !feedbackText || rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide both feedback text and a rating.",
        variant: "destructive"
      });
      return;
    }
    
    setTasks(tasks.map(task => 
      task.id === selectedTaskId 
        ? {
            ...task,
            submission: {
              ...task.submission,
              feedback: feedbackText,
              rating: rating
            }
          }
        : task
    ));
    
    toast({
      title: "Feedback Provided",
      description: "Your feedback has been saved and will be visible to the mentee."
    });
    
    // Reset form
    setFeedbackText('');
    setRating(0);
    setSelectedTaskId(null);
    setShowFeedbackDialog(false);
  };
  
  // Handle editing mentee goals
  const handleEditGoals = () => {
    if (!menteeGoals.trim()) {
      toast({
        title: "Goals Required",
        description: "Please provide goals for the mentee.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Goals Updated",
      description: "The mentee's goals have been updated successfully."
    });
    
    setShowEditGoalsDialog(false);
  };
  
  // Handle withdrawing from engagement
  const handleWithdraw = () => {
    toast({
      title: "Engagement Withdrawn",
      description: "You have successfully withdrawn from this mentoring engagement."
    });
    
    setShowWithdrawDialog(false);
  };
  
  // Handle completing engagement
  const handleComplete = () => {
    toast({
      title: "Engagement Completed",
      description: "You have successfully completed this mentoring engagement."
    });
    
    setShowCompleteDialog(false);
  };
  
  // Handle downloading materials
  const handleDownloadMaterials = () => {
    toast({
      title: "Download Started",
      description: "The engagement materials are being prepared for download."
    });
  };
  
  // Handle scheduling a session
  const handleScheduleSession = () => {
    if (!sessionTitle || !sessionDate || !sessionTime) {
      toast({
        title: "Missing Information",
        description: "Please provide all session details.",
        variant: "destructive"
      });
      return;
    }
    
    const dateTime = new Date(`${sessionDate}T${sessionTime}`);
    
    const newSession = {
      id: sessions.length + 1,
      title: sessionTitle,
      date: dateTime.toISOString(),
      status: "upcoming"
    };
    
    setSessions([...sessions, newSession]);
    
    toast({
      title: "Session Scheduled",
      description: "The session has been scheduled and the mentee has been notified."
    });
    
    // Reset form
    setSessionTitle('');
    setSessionDate('');
    setSessionTime('');
    setSessionDuration('60');
    setShowScheduleSessionDialog(false);
  };
  
  // Handle creating a meeting
  const handleCreateMeeting = () => {
    if (!meetingTitle) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for the meeting.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a mock meeting link if not provided
    const generatedLink = meetingLink || `https://meet.example.com/${Math.random().toString(36).substring(2, 10)}`;
    setMeetingLink(generatedLink);
    
    toast({
      title: "Meeting Created",
      description: "Your meeting has been created. Share the link with your mentee."
    });
    
    // Copy link to clipboard
    navigator.clipboard.writeText(generatedLink).then(() => {
      toast({
        title: "Link Copied",
        description: "Meeting link copied to clipboard."
      });
    });
    
    setShowCreateMeetingDialog(false);
  };
  
  // Handle deleting a session
  const handleDeleteSession = (sessionId: number) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
    
    toast({
      title: "Session Deleted",
      description: "The session has been cancelled and the mentee has been notified."
    });
  };
  
  // Handle editing a session
  const handleEditSession = (session) => {
    setSessionTitle(session.title);
    const date = new Date(session.date);
    setSessionDate(date.toISOString().split('T')[0]);
    setSessionTime(date.toTimeString().split(' ')[0].substring(0, 5));
    setSessionDuration('60');
    setShowScheduleSessionDialog(true);
    
    // Remove the old session and add the updated one in handleScheduleSession
    setSessions(sessions.filter(s => s.id !== session.id));
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedMenteeData?.avatar} alt={selectedMenteeData?.name} />
                <AvatarFallback>{selectedMenteeData?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedMenteeData?.name}</CardTitle>
                <CardDescription>
                  {selectedMenteeData?.role} · Last active: {selectedMenteeData?.lastActive}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="px-2 py-0.5">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Track your mentorship progress, schedule sessions, and assign tasks.
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="sessions">
                <Calendar className="h-4 w-4 mr-2" />
                Sessions
              </TabsTrigger>
              <TabsTrigger value="tasks">
                <ListChecks className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="courses">
                <GraduationCap className="h-4 w-4 mr-2" />
                Courses
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sessions">
              <div className="space-y-3">
                {sessions.map(session => (
                  <div key={session.id} className="p-3 border rounded-md flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{session.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(session.date).toLocaleString(undefined, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {session.notes && (
                        <p className="text-xs italic mt-1">Notes: {session.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {session.status === 'upcoming' ? (
                        <>
                          <Button 
                            onClick={() => handleEditSession(session)} 
                            size="sm" 
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteSession(session.id)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                          <Dialog open={showCreateMeetingDialog} onOpenChange={setShowCreateMeetingDialog}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="gap-1">
                                <Video className="h-4 w-4" />
                                Join
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Create Video Meeting</DialogTitle>
                                <DialogDescription>
                                  Set up a virtual meeting with your mentee
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div>
                                  <label className="text-sm font-medium mb-1 block">Meeting Title</label>
                                  <Input
                                    value={meetingTitle}
                                    onChange={(e) => setMeetingTitle(e.target.value)}
                                    placeholder="Weekly Check-in"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-1 block">Meeting Link (Optional)</label>
                                  <Input
                                    value={meetingLink}
                                    onChange={(e) => setMeetingLink(e.target.value)}
                                    placeholder="https://meet.example.com/your-meeting-id"
                                  />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Leave blank to generate a link automatically
                                  </p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setShowCreateMeetingDialog(false)}>Cancel</Button>
                                <Button onClick={handleCreateMeeting}>Create Meeting</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <CheckCircle className="h-3.5 w-3.5 text-primary" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                
                <Dialog open={showScheduleSessionDialog} onOpenChange={setShowScheduleSessionDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
                      <Plus className="h-4 w-4" />
                      Schedule Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Session</DialogTitle>
                      <DialogDescription>
                        Set up a mentoring session with your mentee
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Session Title</label>
                        <Input
                          value={sessionTitle}
                          onChange={(e) => setSessionTitle(e.target.value)}
                          placeholder="Career Planning"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Date</label>
                        <Input
                          type="date"
                          value={sessionDate}
                          onChange={(e) => setSessionDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Time</label>
                        <Input
                          type="time"
                          value={sessionTime}
                          onChange={(e) => setSessionTime(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Duration (minutes)</label>
                        <Input
                          type="number"
                          value={sessionDuration}
                          onChange={(e) => setSessionDuration(e.target.value)}
                          min="15"
                          step="15"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowScheduleSessionDialog(false)}>Cancel</Button>
                      <Button onClick={handleScheduleSession}>Schedule</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks">
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="p-3 border rounded-md flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge 
                        variant={task.status === 'completed' ? 'default' : 'outline'}
                      >
                        {task.status}
                      </Badge>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm mt-2">{task.description}</p>
                    )}
                    
                    {task.submission && (
                      <div className="mt-3 p-2 bg-muted/30 rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1 text-sm">
                            <FileText className="h-4 w-4 text-primary" />
                            <span>{task.submission.fileName}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Submitted: {new Date(task.submission.submittedDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        {task.submission.feedback && (
                          <div className="mt-2">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-xs font-medium">Your Feedback:</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= task.submission.rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs">{task.submission.feedback}</p>
                          </div>
                        )}
                        
                        {!task.submission.feedback && (
                          <Dialog
                            open={showFeedbackDialog && selectedTaskId === task.id}
                            onOpenChange={(open) => {
                              setShowFeedbackDialog(open);
                              if (open) setSelectedTaskId(task.id);
                              else setSelectedTaskId(null);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="mt-2 gap-1">
                                <ThumbsUp className="h-3.5 w-3.5" />
                                Provide Feedback
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Provide Feedback</DialogTitle>
                                <DialogDescription>
                                  Rate and provide feedback for the submitted task
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4 space-y-4">
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Rating</label>
                                  <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none"
                                      >
                                        <Star
                                          className={`h-6 w-6 ${
                                            star <= rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'
                                          }`}
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">Feedback</label>
                                  <Textarea
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    placeholder="Provide constructive feedback on the submission..."
                                    rows={4}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>Cancel</Button>
                                <Button onClick={handleProvideFeedback}>Submit Feedback</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {task.hasSample && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3.5 w-3.5" />
                          Download Sample
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
                      <Plus className="h-4 w-4" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                      <DialogDescription>
                        Create a new task for your mentee
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Task Title</label>
                        <Input
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          placeholder="Create a portfolio website"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Textarea
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                          placeholder="Provide details about the task..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Due Date</label>
                        <Input
                          type="date"
                          value={taskDueDate}
                          onChange={(e) => setTaskDueDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Sample File (Optional)</label>
                        <Input
                          type="file"
                          onChange={(e) => setTaskSampleFile(e.target.files?.[0] || null)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>Cancel</Button>
                      <Button onClick={handleAddTask}>Add Task</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <div className="space-y-3">
                <div className="p-3 border rounded-md flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="bg-primary/10 rounded-md p-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">JavaScript Fundamentals</h4>
                      <p className="text-xs text-muted-foreground">Recommended: 2 days ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">In Progress</Badge>
                </div>
                
                <div className="p-3 border rounded-md flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="bg-primary/10 rounded-md p-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Agile Project Management</h4>
                      <p className="text-xs text-muted-foreground">Recommended: 1 week ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">Not Started</Badge>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
                  <Plus className="h-4 w-4" />
                  Recommend Course
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 pt-4 border-t space-y-2">
            <Dialog open={showEditGoalsDialog} onOpenChange={setShowEditGoalsDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Target className="h-4 w-4" />
                  Edit Mentee Goals
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Mentee Goals</DialogTitle>
                  <DialogDescription>
                    Help your mentee refine their learning objectives
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Textarea 
                    value={menteeGoals}
                    onChange={(e) => setMenteeGoals(e.target.value)}
                    className="resize-none"
                    rows={6}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditGoalsDialog(false)}>Cancel</Button>
                  <Button onClick={handleEditGoals}>Save Goals</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2"
              onClick={handleDownloadMaterials}
            >
              <Download className="h-4 w-4" />
              Download Materials
            </Button>
            
            <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Award className="h-4 w-4" />
                  Preview Certificate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Certificate Preview</DialogTitle>
                </DialogHeader>
                <div className="py-6">
                  <div className="border p-8 rounded-md text-center space-y-4">
                    <Award className="h-12 w-12 mx-auto text-primary" />
                    <h3 className="text-xl font-bold">Certificate of Achievement</h3>
                    <p className="text-muted-foreground">This certifies that</p>
                    <p className="text-xl">{selectedMenteeData?.name}</p>
                    <p className="text-muted-foreground">has successfully completed</p>
                    <p className="text-lg font-medium">Software Development Mentorship</p>
                    <p className="text-muted-foreground">under the guidance of</p>
                    <p className="text-lg">Your Name</p>
                    <div className="pt-4 text-sm text-muted-foreground">
                      <p>This certificate will be available for download after</p>
                      <p>you complete this engagement</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full text-destructive">
                  Withdraw from Engagement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw from Engagement</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to withdraw from your mentoring engagement with {selectedMenteeData?.name}?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    This action cannot be undone. Your mentee will be notified of your withdrawal.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleWithdraw}>Withdraw</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="w-full">
                  Complete Engagement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Complete Engagement</DialogTitle>
                  <DialogDescription>
                    Please confirm that you have completed your mentoring engagement with {selectedMenteeData?.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm mb-4">
                    By completing this engagement, you confirm that:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>The mentee has set learning goals</li>
                    <li>You have completed at least one session</li>
                    <li>All assigned tasks have been reviewed</li>
                  </ul>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>Cancel</Button>
                  <Button onClick={handleComplete}>Complete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveMentorships;
