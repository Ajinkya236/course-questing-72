
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Calendar, FileText, BookOpen, CheckCircle2, 
  Clock, Download, MessageCircle, PlusCircle, Upload, AlertCircle, CheckCircle, GraduationCap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types for sessions, tasks, etc.
type SessionStatus = "completed" | "upcoming";

interface Session {
  id: number;
  title: string;
  date: string;
  status: SessionStatus;
  notes?: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "assigned" | "submitted" | "completed";
  attachmentUrl?: string;
  sampleUrl?: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number; // Percentage
  status: "in-progress" | "completed";
  url: string;
}

interface Engagement {
  id: number;
  menteeName: string;
  menteeTitle: string;
  topic: string;
  startDate: string;
  imageUrl: string;
  progress: number;
  sessions: Session[];
  tasks: Task[];
  courses: Course[];
  goalsSet: boolean;
  sessionsCompleted: number;
  totalSessions: number;
  goals: string;
  timeline: string;
}

// Mock data for active engagements
const activeEngagementsData: Engagement[] = [
  {
    id: 1,
    menteeName: "Taylor Rodriguez",
    menteeTitle: "Graduate Student",
    topic: "Research Methods",
    startDate: "2023-10-05",
    imageUrl: "https://randomuser.me/api/portraits/women/56.jpg",
    progress: 65,
    sessions: [
      {
        id: 1,
        title: "Research Problem Formulation",
        date: "2023-10-12",
        status: "completed",
        notes: "Discussed narrowing research scope. Taylor will refine research question focusing on computational approaches to missing data problems."
      },
      {
        id: 2,
        title: "Literature Review Methodology",
        date: "2023-10-26",
        status: "completed",
        notes: "Reviewed systematic literature review methods. Taylor will create a search strategy using identified keywords and databases."
      },
      {
        id: 3,
        title: "Statistical Model Selection",
        date: "2023-11-09",
        status: "upcoming"
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Research Proposal Draft",
        description: "Create a 5-page draft research proposal following the template provided.",
        dueDate: "2023-10-19",
        status: "completed",
        attachmentUrl: "https://example.com/submissions/proposal.pdf",
        sampleUrl: "https://example.com/templates/proposal_template.docx"
      },
      {
        id: 2,
        title: "Literature Review Summary",
        description: "Summarize 10 key papers relevant to your research topic, highlighting methodologies and findings.",
        dueDate: "2023-11-02",
        status: "submitted",
        attachmentUrl: "https://example.com/submissions/lit_review.pdf",
        sampleUrl: "https://example.com/templates/lit_review_template.docx"
      },
      {
        id: 3,
        title: "Statistical Analysis Plan",
        description: "Develop a detailed plan for the statistical analyses you'll use in your research.",
        dueDate: "2023-11-16",
        status: "assigned",
        sampleUrl: "https://example.com/templates/stats_plan_template.docx"
      }
    ],
    courses: [
      {
        id: 1,
        title: "Research Methods Fundamentals",
        description: "Introduction to research methodologies in data science",
        progress: 100,
        status: "completed",
        url: "https://example.com/courses/research-methods"
      },
      {
        id: 2,
        title: "Advanced Statistical Modeling",
        description: "Techniques for complex statistical modeling with Python",
        progress: 45,
        status: "in-progress",
        url: "https://example.com/courses/statistical-modeling"
      }
    ],
    goalsSet: true,
    sessionsCompleted: 2,
    totalSessions: 6,
    goals: "Develop a solid research methodology for computational statistics thesis, Learn advanced statistical modeling techniques, Prepare for academic publication",
    timeline: "6 months (October 2023 - March 2024)"
  }
];

const ActiveMentorships = () => {
  const { toast } = useToast();
  const [engagements, setEngagements] = useState<Engagement[]>(activeEngagementsData);
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);
  const [activeTab, setActiveTab] = useState("sessions");
  
  // Dialog states
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [showEndEngagementDialog, setShowEndEngagementDialog] = useState(false);
  
  // Form states
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskSampleUrl, setTaskSampleUrl] = useState('');
  
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseUrl, setCourseUrl] = useState('');
  
  const [endFeedback, setEndFeedback] = useState('');
  
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddSession = () => {
    if (!sessionTitle || !sessionDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedEngagement) {
      const newSession: Session = {
        id: Date.now(),
        title: sessionTitle,
        date: sessionDate,
        status: "upcoming",
      };
      
      const updatedEngagements = engagements.map(eng => 
        eng.id === selectedEngagement.id ? 
        { 
          ...eng, 
          sessions: [...eng.sessions, newSession] 
        } : eng
      );
      
      setEngagements(updatedEngagements);
      setShowSessionDialog(false);
      resetSessionForm();
      
      toast({
        title: "Session Scheduled",
        description: `Session "${sessionTitle}" has been scheduled.`
      });
    }
  };

  const handleAddTask = () => {
    if (!taskTitle || !taskDescription || !taskDueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedEngagement) {
      const newTask: Task = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        status: "assigned",
        sampleUrl: taskSampleUrl || undefined
      };
      
      const updatedEngagements = engagements.map(eng => 
        eng.id === selectedEngagement.id ? 
        { 
          ...eng, 
          tasks: [...eng.tasks, newTask] 
        } : eng
      );
      
      setEngagements(updatedEngagements);
      setShowTaskDialog(false);
      resetTaskForm();
      
      toast({
        title: "Task Assigned",
        description: `Task "${taskTitle}" has been assigned.`
      });
    }
  };

  const handleAddCourse = () => {
    if (!courseTitle || !courseDescription || !courseUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedEngagement) {
      const newCourse: Course = {
        id: Date.now(),
        title: courseTitle,
        description: courseDescription,
        progress: 0,
        status: "in-progress",
        url: courseUrl
      };
      
      const updatedEngagements = engagements.map(eng => 
        eng.id === selectedEngagement.id ? 
        { 
          ...eng, 
          courses: [...eng.courses, newCourse] 
        } : eng
      );
      
      setEngagements(updatedEngagements);
      setShowCourseDialog(false);
      resetCourseForm();
      
      toast({
        title: "Course Assigned",
        description: `Course "${courseTitle}" has been assigned.`
      });
    }
  };

  const handleAddSessionNotes = () => {
    if (!sessionNotes || !selectedSession) {
      toast({
        title: "Missing Information",
        description: "Please add your session notes.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedEngagement) {
      const updatedSessions = selectedEngagement.sessions.map(session => 
        session.id === selectedSession.id ? 
        { 
          ...session, 
          notes: sessionNotes,
          status: "completed" as const
        } : session
      );
      
      const updatedEngagements = engagements.map(eng => 
        eng.id === selectedEngagement.id ? 
        { 
          ...eng, 
          sessions: updatedSessions,
          sessionsCompleted: eng.sessionsCompleted + 1
        } : eng
      );
      
      setEngagements(updatedEngagements);
      setShowNotesDialog(false);
      setSessionNotes('');
      setSelectedSession(null);
      
      toast({
        title: "Session Notes Added",
        description: "Your session notes have been saved and the session marked as completed."
      });
    }
  };

  const handleEndEngagement = () => {
    if (!endFeedback) {
      toast({
        title: "Feedback Required",
        description: "Please provide feedback before ending the engagement.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would move this engagement to history
    const updatedEngagements = engagements.filter(eng => eng.id !== selectedEngagement?.id);
    
    setEngagements(updatedEngagements);
    setShowEndEngagementDialog(false);
    setEndFeedback('');
    
    toast({
      title: "Engagement Completed",
      description: "The mentorship engagement has been successfully completed and moved to history."
    });
  };

  const handleReviewTask = (task: Task) => {
    if (selectedEngagement) {
      const updatedTasks = selectedEngagement.tasks.map(t => 
        t.id === task.id ? 
        { 
          ...t, 
          status: "completed" as const
        } : t
      );
      
      const updatedEngagements = engagements.map(eng => 
        eng.id === selectedEngagement.id ? 
        { 
          ...eng, 
          tasks: updatedTasks
        } : eng
      );
      
      setEngagements(updatedEngagements);
      
      toast({
        title: "Task Reviewed",
        description: `Task "${task.title}" has been marked as completed.`
      });
    }
  };

  // Reset form functions
  const resetSessionForm = () => {
    setSessionTitle('');
    setSessionDate('');
  };
  
  const resetTaskForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskSampleUrl('');
  };
  
  const resetCourseForm = () => {
    setCourseTitle('');
    setCourseDescription('');
    setCourseUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Active Engagements List */}
      {engagements.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-10">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Active Mentorships</h3>
              <p className="text-muted-foreground text-center mt-2 mb-6">
                You don't have any active mentorship engagements at the moment.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        engagements.map(engagement => (
          <Card key={engagement.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img 
                      src={engagement.imageUrl} 
                      alt={engagement.menteeName} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{engagement.menteeName}</CardTitle>
                    <CardDescription>{engagement.menteeTitle}</CardDescription>
                    <div className="mt-1">
                      <Badge variant="secondary">{engagement.topic}</Badge>
                    </div>
                  </div>
                </div>
                <Dialog open={showEndEngagementDialog && selectedEngagement?.id === engagement.id} onOpenChange={(open) => {
                  setShowEndEngagementDialog(open);
                  if (open) setSelectedEngagement(engagement);
                  if (!open) setEndFeedback('');
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Complete Engagement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Complete Mentorship Engagement</DialogTitle>
                      <DialogDescription>
                        Provide final feedback before concluding this engagement
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <h4 className="text-sm font-medium mb-1">Final Feedback</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Summarize the mentee's progress, achievements, and areas for continued growth
                      </p>
                      <Textarea 
                        value={endFeedback}
                        onChange={(e) => setEndFeedback(e.target.value)}
                        className="h-32"
                        placeholder="Provide your final feedback..."
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowEndEngagementDialog(false)}>Cancel</Button>
                      <Button onClick={handleEndEngagement}>Complete & Issue Certificate</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="mt-2 space-y-4">
                {/* Progress Section */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Started on {new Date(engagement.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{engagement.progress}% Complete</span>
                    <Progress value={engagement.progress} className="w-24 h-2" />
                  </div>
                </div>
                
                {/* Goals and Timeline */}
                <div className="bg-muted/30 p-3 rounded-md space-y-2">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" /> Goals
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{engagement.goals}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Timeline
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{engagement.timeline}</p>
                  </div>
                </div>
                
                {/* Engagement Details Tabs */}
                <Tabs defaultValue="sessions" value={activeTab} onValueChange={setActiveTab} className="mt-6">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="sessions" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      Sessions ({engagement.sessionsCompleted}/{engagement.totalSessions})
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      Tasks ({engagement.tasks.filter(t => t.status === "completed").length}/{engagement.tasks.length})
                    </TabsTrigger>
                    <TabsTrigger value="courses" className="text-xs">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Courses ({engagement.courses.filter(c => c.status === "completed").length}/{engagement.courses.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sessions" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Scheduled Sessions</h4>
                      <Dialog open={showSessionDialog && selectedEngagement?.id === engagement.id} onOpenChange={(open) => {
                        setShowSessionDialog(open);
                        if (open) setSelectedEngagement(engagement);
                        if (!open) resetSessionForm();
                      }}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="gap-1">
                            <PlusCircle className="h-3 w-3" />
                            Schedule Session
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule New Session</DialogTitle>
                            <DialogDescription>
                              Set up a mentoring session with {engagement.menteeName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Session Title</label>
                              <Input 
                                placeholder="e.g., Research Design Review"
                                value={sessionTitle}
                                onChange={(e) => setSessionTitle(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Session Date</label>
                              <Input 
                                type="datetime-local"
                                value={sessionDate}
                                onChange={(e) => setSessionDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowSessionDialog(false)}>Cancel</Button>
                            <Button onClick={handleAddSession}>Schedule Session</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="space-y-3">
                      {engagement.sessions.length === 0 ? (
                        <div className="border border-dashed rounded-md p-6 flex flex-col items-center">
                          <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground text-sm text-center">No sessions scheduled yet</p>
                        </div>
                      ) : (
                        engagement.sessions.map(session => (
                          <div 
                            key={session.id} 
                            className={`border rounded-md p-3 ${session.status === 'completed' ? 'bg-muted/30' : ''}`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-sm flex items-center gap-1">
                                  {session.title}
                                  {session.status === 'completed' && (
                                    <CheckCircle2 className="h-3 w-3 text-primary ml-1" />
                                  )}
                                </h5>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(session.date).toLocaleString()}
                                </p>
                              </div>
                              <Badge 
                                variant={session.status === 'completed' ? 'default' : 'outline'}
                                className="text-xs flex items-center gap-1"
                              >
                                {session.status === 'completed' ? (
                                  <>
                                    <CheckCircle className="h-3 w-3" />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    <Clock className="h-3 w-3" />
                                    Upcoming
                                  </>
                                )}
                              </Badge>
                            </div>
                            
                            {session.notes && (
                              <div className="mt-2 bg-background p-2 rounded text-xs text-muted-foreground">
                                <p className="font-medium mb-1">Session Notes:</p>
                                <p>{session.notes}</p>
                              </div>
                            )}
                            
                            {session.status === 'upcoming' && (
                              <div className="mt-3 flex justify-end">
                                <Dialog open={showNotesDialog && selectedSession?.id === session.id} onOpenChange={(open) => {
                                  setShowNotesDialog(open);
                                  if (open) {
                                    setSelectedSession(session);
                                    setSelectedEngagement(engagement);
                                  }
                                  if (!open) setSessionNotes('');
                                }}>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="gap-1">
                                      <MessageCircle className="h-3 w-3" />
                                      Add Notes & Complete
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Session Notes</DialogTitle>
                                      <DialogDescription>
                                        Add notes from your session with {engagement.menteeName}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <h4 className="text-sm font-medium mb-2">Notes</h4>
                                      <Textarea 
                                        value={sessionNotes}
                                        onChange={(e) => setSessionNotes(e.target.value)}
                                        className="h-32"
                                        placeholder="Summarize what was discussed, action items, and progress made..."
                                      />
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setShowNotesDialog(false)}>Cancel</Button>
                                      <Button onClick={handleAddSessionNotes}>Save & Complete Session</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tasks" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Assigned Tasks</h4>
                      <Dialog open={showTaskDialog && selectedEngagement?.id === engagement.id} onOpenChange={(open) => {
                        setShowTaskDialog(open);
                        if (open) setSelectedEngagement(engagement);
                        if (!open) resetTaskForm();
                      }}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="gap-1">
                            <PlusCircle className="h-3 w-3" />
                            Assign Task
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign New Task</DialogTitle>
                            <DialogDescription>
                              Create a task for {engagement.menteeName} to complete
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Task Title</label>
                              <Input 
                                placeholder="e.g., Research Methodology Analysis"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Description</label>
                              <Textarea 
                                placeholder="Provide detailed instructions for this task..."
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                className="h-24"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Due Date</label>
                              <Input 
                                type="date"
                                value={taskDueDate}
                                onChange={(e) => setTaskDueDate(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Sample File URL (Optional)</label>
                              <Input 
                                placeholder="https://example.com/sample-file.pdf"
                                value={taskSampleUrl}
                                onChange={(e) => setTaskSampleUrl(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowTaskDialog(false)}>Cancel</Button>
                            <Button onClick={handleAddTask}>Assign Task</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="space-y-3">
                      {engagement.tasks.length === 0 ? (
                        <div className="border border-dashed rounded-md p-6 flex flex-col items-center">
                          <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground text-sm text-center">No tasks assigned yet</p>
                        </div>
                      ) : (
                        engagement.tasks.map(task => (
                          <div 
                            key={task.id} 
                            className={`border rounded-md p-3 ${task.status === 'completed' ? 'bg-muted/30' : ''}`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-sm">{task.title}</h5>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge 
                                variant={
                                  task.status === 'completed' ? 'default' : 
                                  task.status === 'submitted' ? 'secondary' : 'outline'
                                }
                                className="text-xs"
                              >
                                {task.status === 'completed' ? 'Completed' : 
                                 task.status === 'submitted' ? 'Submitted' : 'Assigned'}
                              </Badge>
                            </div>
                            
                            <p className="mt-2 text-xs">{task.description}</p>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              {task.sampleUrl && (
                                <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                                  <Download className="h-3 w-3" />
                                  Download Sample
                                </Button>
                              )}
                              
                              {task.attachmentUrl && (
                                <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                                  <Download className="h-3 w-3" />
                                  View Submission
                                </Button>
                              )}
                              
                              {task.status === 'submitted' && (
                                <Button 
                                  size="sm" 
                                  className="h-7 text-xs gap-1 ml-auto"
                                  onClick={() => handleReviewTask(task)}
                                >
                                  <CheckCircle className="h-3 w-3" />
                                  Mark as Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="courses" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Recommended Courses</h4>
                      <Dialog open={showCourseDialog && selectedEngagement?.id === engagement.id} onOpenChange={(open) => {
                        setShowCourseDialog(open);
                        if (open) setSelectedEngagement(engagement);
                        if (!open) resetCourseForm();
                      }}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="gap-1">
                            <PlusCircle className="h-3 w-3" />
                            Assign Course
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign New Course</DialogTitle>
                            <DialogDescription>
                              Recommend a course for {engagement.menteeName} to complete
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Course Title</label>
                              <Input 
                                placeholder="e.g., Advanced Python for Data Science"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Description</label>
                              <Textarea 
                                placeholder="Brief description of the course and its benefits..."
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                className="h-24"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Course URL</label>
                              <Input 
                                placeholder="https://example.com/courses/data-science"
                                value={courseUrl}
                                onChange={(e) => setCourseUrl(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowCourseDialog(false)}>Cancel</Button>
                            <Button onClick={handleAddCourse}>Assign Course</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="space-y-3">
                      {engagement.courses.length === 0 ? (
                        <div className="border border-dashed rounded-md p-6 flex flex-col items-center">
                          <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground text-sm text-center">No courses assigned yet</p>
                        </div>
                      ) : (
                        engagement.courses.map(course => (
                          <div 
                            key={course.id} 
                            className={`border rounded-md p-3 ${course.status === 'completed' ? 'bg-muted/30' : ''}`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-sm">{course.title}</h5>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {course.description}
                                </p>
                              </div>
                              <Badge 
                                variant={course.status === 'completed' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {course.status === 'completed' ? 'Completed' : 'In Progress'}
                              </Badge>
                            </div>
                            
                            <div className="mt-3">
                              <div className="flex justify-between items-center text-xs mb-1">
                                <span>{course.progress}% Complete</span>
                                <span>{course.progress === 100 ? 'Finished' : 'In progress'}</span>
                              </div>
                              <Progress value={course.progress} className="h-1" />
                            </div>
                            
                            <div className="mt-3">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-7 text-xs gap-1"
                                asChild
                              >
                                <a href={course.url} target="_blank" rel="noopener noreferrer">
                                  <BookOpen className="h-3 w-3" />
                                  View Course
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 mt-2">
              <div className="w-full bg-muted/20 p-3 rounded-md">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Engagement Completion Requirements:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>All required sessions must be completed</li>
                      <li>All assigned tasks must be completed and reviewed</li>
                      <li>Mentee must complete their set goals</li>
                      <li>Final feedback must be provided before concluding the engagement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default ActiveMentorships;
