
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Users, 
  Calendar, 
  FileText, 
  BookOpen,
  Download,
  Upload,
  Plus,
  PenTool,
  X,
  ArrowRight,
  Clock,
  Target,
  Award,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define types for our components
interface Session {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  mentorNotes?: string;
  menteeNotes?: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'pending';
  hasSample?: boolean;
  submission?: string;
  feedback?: string;
}

// Updated Course interface to use number for id consistently
interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
}

interface Mentorship {
  id: number;
  menteeName: string;
  menteeTitle: string;
  menteeImage: string;
  topic: string;
  startDate: string;
  progress: number;
  sessions: Session[];
  tasks: Task[];
  courses: Course[];
  status: 'active' | 'completed' | 'withdrawn';
  goalsSet: boolean;
  sessionsCompleted: number;
}

const ActiveMentorships = () => {
  const { toast } = useToast();
  const [mentorships, setMentorships] = useState<Mentorship[]>([
    {
      id: 1,
      menteeName: "Alex Chen",
      menteeTitle: "Junior Developer",
      menteeImage: "https://randomuser.me/api/portraits/men/32.jpg",
      topic: "Web Development",
      startDate: "2023-10-15",
      progress: 45,
      status: 'active',
      goalsSet: true,
      sessionsCompleted: 2,
      sessions: [
        { id: 1, title: "Introduction and Goal Setting", date: "2023-10-20", status: "completed", mentorNotes: "Alex is enthusiastic about learning frontend technologies", menteeNotes: "Got clarity on what we'll cover in this mentorship" },
        { id: 2, title: "HTML/CSS Fundamentals", date: "2023-11-05", status: "completed", mentorNotes: "Reviewed CSS Grid and Flexbox concepts", menteeNotes: "Learned a lot about CSS positioning" },
        { id: 3, title: "JavaScript Basics", date: "2023-11-20", status: "upcoming" },
        { id: 4, title: "React Introduction", date: "2023-12-05", status: "upcoming" }
      ],
      tasks: [
        { id: 1, title: "Build a Simple Portfolio", dueDate: "2023-10-30", status: "completed", description: "Create a simple portfolio website using HTML and CSS", feedback: "Good work on the layout, consider adding more responsive design" },
        { id: 2, title: "JavaScript Exercise", dueDate: "2023-11-15", status: "pending", description: "Build a simple calculator using JavaScript", hasSample: true }
      ],
      courses: [
        { id: 1, title: "HTML & CSS Fundamentals", description: "Learn the essentials of HTML5 and CSS3", progress: 80 },
        { id: 2, title: "JavaScript Essentials", description: "Core JavaScript concepts and patterns", progress: 30 }
      ]
    },
    {
      id: 2,
      menteeName: "Sarah Johnson",
      menteeTitle: "Product Designer",
      menteeImage: "https://randomuser.me/api/portraits/women/44.jpg",
      topic: "UX Design",
      startDate: "2023-09-01",
      progress: 70,
      status: 'active',
      goalsSet: true,
      sessionsCompleted: 4,
      sessions: [
        { id: 1, title: "UX Principles", date: "2023-09-05", status: "completed", mentorNotes: "Sarah has a good foundation in design principles" },
        { id: 2, title: "User Research Methods", date: "2023-09-20", status: "completed" },
        { id: 3, title: "Wireframing Techniques", date: "2023-10-05", status: "completed" },
        { id: 4, title: "Prototyping", date: "2023-10-20", status: "completed" },
        { id: 5, title: "Usability Testing", date: "2023-11-05", status: "upcoming" }
      ],
      tasks: [
        { id: 1, title: "Competitor Analysis", dueDate: "2023-09-15", status: "completed", description: "Analyze 3 competing products", feedback: "Excellent insights on user flows" },
        { id: 2, title: "User Personas", dueDate: "2023-10-01", status: "completed", description: "Create 2-3 user personas for your product", feedback: "Very detailed personas" },
        { id: 3, title: "Wireframe Project", dueDate: "2023-10-25", status: "completed", description: "Create wireframes for a mobile app", hasSample: true, feedback: "Great attention to detail" },
        { id: 4, title: "Prototype Project", dueDate: "2023-11-15", status: "pending", description: "Create a prototype based on your wireframes", hasSample: true }
      ],
      courses: [
        { id: 1, title: "UX Research Fundamentals", description: "Learn essential UX research methodologies", progress: 100 },
        { id: 2, title: "Figma Mastery", description: "Advanced Figma techniques for designers", progress: 75 },
        { id: 3, title: "Usability Testing", description: "Methods for effective usability testing", progress: 40 }
      ]
    },
    {
      id: 3,
      menteeName: "David Wilson",
      menteeTitle: "Marketing Specialist",
      menteeImage: "https://randomuser.me/api/portraits/men/64.jpg",
      topic: "Digital Marketing",
      startDate: "2023-08-10",
      progress: 20,
      status: 'active',
      goalsSet: false,
      sessionsCompleted: 1,
      sessions: [
        { id: 1, title: "Marketing Strategy Overview", date: "2023-08-15", status: "completed", mentorNotes: "David needs to work on setting specific goals" },
        { id: 2, title: "Content Marketing", date: "2023-09-05", status: "cancelled" },
        { id: 3, title: "Social Media Strategy", date: "2023-11-15", status: "upcoming" }
      ],
      tasks: [
        { id: 1, title: "Marketing Plan", dueDate: "2023-08-30", status: "pending", description: "Create a basic marketing plan for a product launch", hasSample: true }
      ],
      courses: [
        { id: 1, title: "Digital Marketing Basics", description: "Introduction to digital marketing concepts", progress: 25 }
      ]
    }
  ]);
  
  const [activeMentorship, setActiveMentorship] = useState<Mentorship | null>(
    mentorships.length > 0 ? mentorships[0] : null
  );
  
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showAddSessionDialog, setShowAddSessionDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [showSessionNotesDialog, setShowSessionNotesDialog] = useState(false);
  const [showTaskFeedbackDialog, setShowTaskFeedbackDialog] = useState(false);
  
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [taskFeedback, setTaskFeedback] = useState('');
  const [completionFeedback, setCompletionFeedback] = useState('');
  
  // Form states for adding new items
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskHasSample, setNewTaskHasSample] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionDate, setNewSessionDate] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  
  const handleDownloadAllMaterials = () => {
    toast({
      title: "Download Started",
      description: "All tasks, notes and materials are being prepared for download."
    });
  };
  
  const handleAddTask = () => {
    if (!activeMentorship || !newTaskTitle || !newTaskDescription || !newTaskDueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDescription,
      dueDate: newTaskDueDate,
      status: "pending",
      hasSample: newTaskHasSample
    };
    
    setMentorships(mentorships.map(m => 
      m.id === activeMentorship.id 
        ? { ...m, tasks: [...m.tasks, newTask] } 
        : m
    ));
    
    toast({
      title: "Task Added",
      description: `${newTaskTitle} has been assigned to ${activeMentorship.menteeName}`
    });
    
    // Reset form
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
    setNewTaskHasSample(false);
    setShowAddTaskDialog(false);
  };
  
  const handleAddSession = () => {
    if (!activeMentorship || !newSessionTitle || !newSessionDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newSession: Session = {
      id: Date.now(),
      title: newSessionTitle,
      date: newSessionDate,
      status: "upcoming"
    };
    
    setMentorships(mentorships.map(m => 
      m.id === activeMentorship.id 
        ? { ...m, sessions: [...m.sessions, newSession] } 
        : m
    ));
    
    toast({
      title: "Session Scheduled",
      description: `Session with ${activeMentorship.menteeName} has been scheduled for ${new Date(newSessionDate).toLocaleDateString()}`
    });
    
    // Reset form
    setNewSessionTitle('');
    setNewSessionDate('');
    setShowAddSessionDialog(false);
  };
  
  // When using recommendation courses, ensure we're using number IDs
  const handleAddCourse = () => {
    if (!activeMentorship || !newCourseTitle || !newCourseDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newCourse: Course = {
      id: Date.now(), // Ensuring this is a number
      title: newCourseTitle,
      description: newCourseDescription,
      progress: 0
    };
    
    setMentorships(mentorships.map(m => 
      m.id === activeMentorship.id 
        ? { ...m, courses: [...m.courses, newCourse] } 
        : m
    ));
    
    toast({
      title: "Course Added",
      description: `${newCourseTitle} has been assigned to ${activeMentorship.menteeName}`
    });
    
    // Reset form
    setNewCourseTitle('');
    setNewCourseDescription('');
    setShowAddCourseDialog(false);
  };
  
  const handleSaveSessionNotes = () => {
    if (!activeMentorship || !selectedSession || !sessionNotes.trim()) return;
    
    setMentorships(mentorships.map(m => 
      m.id === activeMentorship.id 
        ? { 
            ...m, 
            sessions: m.sessions.map(s => 
              s.id === selectedSession.id 
                ? { ...s, mentorNotes: sessionNotes } 
                : s
            ) 
          } 
        : m
    ));
    
    toast({
      title: "Notes Saved",
      description: "Your session notes have been saved successfully"
    });
    
    setSessionNotes('');
    setShowSessionNotesDialog(false);
  };
  
  const handleSaveTaskFeedback = () => {
    if (!activeMentorship || !selectedTask || !taskFeedback.trim()) return;
    
    setMentorships(mentorships.map(m => 
      m.id === activeMentorship.id 
        ? { 
            ...m, 
            tasks: m.tasks.map(t => 
              t.id === selectedTask.id 
                ? { ...t, feedback: taskFeedback, status: 'completed' } 
                : t
            ) 
          } 
        : m
    ));
    
    toast({
      title: "Feedback Saved",
      description: "Your feedback has been saved and the task marked as completed"
    });
    
    setTaskFeedback('');
    setShowTaskFeedbackDialog(false);
  };
  
  const handleWithdrawMentorship = () => {
    if (!activeMentorship) return;
    
    setMentorships(mentorships.map(m => 
      m.id === activeMentorship.id 
        ? { ...m, status: 'withdrawn' } 
        : m
    ));
    
    toast({
      title: "Mentorship Withdrawn",
      description: `You have withdrawn from mentoring ${activeMentorship.menteeName}`
    });
    
    setShowWithdrawDialog(false);
  };
  
  const handleCompleteMentorship = () => {
    if (!activeMentorship) return;
    
    // Check if completion requirements are met
    if (!activeMentorship.goalsSet || activeMentorship.sessionsCompleted === 0) {
      toast({
        title: "Cannot Complete Mentorship",
        description: "The mentee must set goals and complete at least one session before the mentorship can be completed.",
        variant: "destructive"
      });
      return;
    }
    
    setMentorships(mentorships.map(m => 
      m.id === activeMentorship.id 
        ? { ...m, status: 'completed' } 
        : m
    ));
    
    toast({
      title: "Mentorship Completed",
      description: `Your mentorship with ${activeMentorship.menteeName} has been marked as completed`
    });
    
    setCompletionFeedback('');
    setShowCompleteDialog(false);
  };
  
  const canCompleteMentorship = activeMentorship?.goalsSet && activeMentorship?.sessionsCompleted > 0;
  
  // Filter only active mentorships for the main display
  const activeMentorshipsList = mentorships.filter(m => m.status === 'active');

  // Change "success" variant to "default" since success doesn't exist
  // Fix in render section for badges and buttons
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Active Mentorships
          </CardTitle>
          <CardDescription>
            Manage your ongoing mentorships with mentees
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeMentorshipsList.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Active Mentorships</h3>
              <p className="text-muted-foreground mb-6">You don't have any active mentoring engagements yet.</p>
            </div>
          ) : (
            <div>
              <div className="p-4 mb-6 border border-amber-200 bg-amber-50 rounded-md">
                <h3 className="text-sm font-medium text-amber-800 mb-1">Completion Requirements</h3>
                <p className="text-xs text-amber-700">
                  A mentorship can only be completed when the mentee has set their learning goals and completed at least one session.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">My Mentees</h3>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Filter className="h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {activeMentorshipsList.map(mentorship => (
                      <Card 
                        key={mentorship.id} 
                        className={`overflow-hidden cursor-pointer hover:border-primary/50 transition-colors ${
                          activeMentorship?.id === mentorship.id ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setActiveMentorship(mentorship)}
                      >
                        <div className="flex p-3">
                          <div className="mr-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img src={mentorship.menteeImage} alt={mentorship.menteeName} className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{mentorship.menteeName}</h4>
                            <Badge variant="secondary" className="mt-1">{mentorship.topic}</Badge>
                            <div className="flex flex-col gap-1 mt-2">
                              <div className="flex items-center text-xs">
                                <Target className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>{mentorship.goalsSet ? 'Goals set' : 'Goals not set'}</span>
                              </div>
                              <div className="flex items-center text-xs">
                                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>{mentorship.sessionsCompleted} session(s) completed</span>
                              </div>
                            </div>
                            <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${mentorship.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-right text-muted-foreground mt-1">{mentorship.progress}% complete</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {activeMentorship && (
                    <div className="mt-6 space-y-2">                    
                      <Button variant="outline" className="w-full gap-2" size="sm" onClick={handleDownloadAllMaterials}>
                        <Download className="h-4 w-4" />
                        Download All Materials
                      </Button>
                      
                      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full gap-2" size="sm">
                            <Award className="h-4 w-4" />
                            View Certificate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Certificate Preview</DialogTitle>
                          </DialogHeader>
                          <div className="py-6">
                            {canCompleteMentorship ? (
                              <div className="border p-8 rounded-md text-center space-y-4">
                                <Award className="h-12 w-12 mx-auto text-primary" />
                                <h3 className="text-xl font-bold">Certificate of Achievement</h3>
                                <p className="text-muted-foreground">This certifies that</p>
                                <p className="text-xl">{activeMentorship.menteeName}</p>
                                <p className="text-muted-foreground">has successfully completed</p>
                                <p className="text-lg font-medium">{activeMentorship.topic} Mentorship</p>
                                <p className="text-muted-foreground">under the guidance of</p>
                                <p className="text-lg">[Mentor Name]</p>
                                <div className="pt-4 text-sm text-muted-foreground">
                                  <p>This certificate will be available for download after</p>
                                  <p>this mentorship is completed</p>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-6">
                                <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">Certificate Not Available Yet</h3>
                                <p className="text-muted-foreground mb-4">
                                  The certificate will be available when the mentee has set goals and completed at least one session.
                                </p>
                                <div className="space-y-2 text-sm mt-4">
                                  <div className="flex items-center gap-2">
                                    <Checkbox id="goals" checked={activeMentorship.goalsSet} disabled />
                                    <label htmlFor="goals" className={activeMentorship.goalsSet ? "" : "text-muted-foreground"}>
                                      Mentee has set learning goals
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Checkbox id="sessions" checked={activeMentorship.sessionsCompleted > 0} disabled />
                                    <label htmlFor="sessions" className={activeMentorship.sessionsCompleted > 0 ? "" : "text-muted-foreground"}>
                                      At least one session completed
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full text-destructive" size="sm">
                            Withdraw from Mentorship
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Withdraw from Mentorship</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to withdraw from mentoring {activeMentorship.menteeName}?
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground mb-2">
                              This action cannot be undone. Your mentee will be notified of your withdrawal.
                            </p>
                            <p className="text-sm text-destructive">
                              Note: No certificate will be issued for a withdrawn mentorship.
                            </p>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={handleWithdrawMentorship}>Withdraw</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="default" 
                            className="w-full mt-2" 
                            size="sm" 
                            disabled={!canCompleteMentorship}
                          >
                            Complete Mentorship
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Complete Mentorship</DialogTitle>
                            <DialogDescription>
                              Please confirm that you have completed your mentorship with {activeMentorship.menteeName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <h4 className="text-sm font-medium mb-2">Your Final Feedback</h4>
                            <Textarea 
                              placeholder="Provide some final feedback on the mentee's progress and achievements..."
                              value={completionFeedback}
                              onChange={(e) => setCompletionFeedback(e.target.value)}
                              className="resize-none"
                              rows={4}
                            />
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>Cancel</Button>
                            <Button onClick={handleCompleteMentorship} disabled={!completionFeedback.trim()}>Complete & Send Feedback</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  {activeMentorship && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Mentorship with {activeMentorship.menteeName}</h3>
                        <Badge variant="outline">Started {new Date(activeMentorship.startDate).toLocaleDateString()}</Badge>
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
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium">Mentoring Sessions</h4>
                            <Dialog open={showAddSessionDialog} onOpenChange={setShowAddSessionDialog}>
                              <DialogTrigger asChild>
                                <Button size="sm" className="gap-1">
                                  <Plus className="h-3.5 w-3.5" />
                                  Schedule Session
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Schedule a New Session</DialogTitle>
                                  <DialogDescription>
                                    Set up a mentoring session with {activeMentorship.menteeName}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="session-title">
                                      Session Title
                                    </label>
                                    <Input
                                      id="session-title"
                                      placeholder="e.g., Introduction to React Hooks"
                                      value={newSessionTitle}
                                      onChange={(e) => setNewSessionTitle(e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="session-date">
                                      Session Date
                                    </label>
                                    <Input
                                      id="session-date"
                                      type="date"
                                      value={newSessionDate}
                                      onChange={(e) => setNewSessionDate(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowAddSessionDialog(false)}>Cancel</Button>
                                  <Button onClick={handleAddSession} disabled={!newSessionTitle || !newSessionDate}>Schedule</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          
                          <div className="space-y-4">
                            {activeMentorship.sessions.map(session => (
                              <Card key={session.id}>
                                <div className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium">{session.title}</h4>
                                    <Badge 
                                      variant={
                                        session.status === 'completed' ? 'default' : 
                                        session.status === 'cancelled' ? 'outline' : 
                                        'secondary'
                                      }
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
                                  
                                  {session.mentorNotes && (
                                    <div className="bg-primary/5 p-3 rounded-md mb-3">
                                      <h5 className="text-sm font-medium mb-1">Your Notes</h5>
                                      <p className="text-sm">{session.mentorNotes}</p>
                                    </div>
                                  )}
                                  
                                  {session.menteeNotes && (
                                    <div className="bg-muted/30 p-3 rounded-md mb-3">
                                      <h5 className="text-sm font-medium mb-1">Mentee's Notes</h5>
                                      <p className="text-sm">{session.menteeNotes}</p>
                                    </div>
                                  )}
                                  
                                  <div className="flex justify-end gap-2">
                                    {session.status === 'completed' && (
                                      <Dialog open={showSessionNotesDialog && selectedSession?.id === session.id} onOpenChange={(open) => {
                                        setShowSessionNotesDialog(open);
                                        if (open) {
                                          setSelectedSession(session);
                                          setSessionNotes(session.mentorNotes || '');
                                        }
                                      }}>
                                        <DialogTrigger asChild>
                                          <Button variant="outline" size="sm" className="gap-1">
                                            <PenTool className="h-3.5 w-3.5" />
                                            {session.mentorNotes ? 'Edit Notes' : 'Add Notes'}
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Session Notes</DialogTitle>
                                            <DialogDescription>
                                              Add notes for your session on {session.title}
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="py-4">
                                            <Textarea
                                              placeholder="Add your notes, key topics covered, or action items from this session..."
                                              value={sessionNotes}
                                              onChange={(e) => setSessionNotes(e.target.value)}
                                              className="resize-none"
                                              rows={6}
                                            />
                                          </div>
                                          <DialogFooter>
                                            <Button variant="outline" onClick={() => setShowSessionNotesDialog(false)}>Cancel</Button>
                                            <Button onClick={handleSaveSessionNotes}>Save Notes</Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    )}
                                    
                                    {session.status === 'upcoming' && (
                                      <Button variant="outline" size="sm" className="gap-1" onClick={() => {
                                        setMentorships(mentorships.map(m => 
                                          m.id === activeMentorship.id 
                                            ? { 
                                                ...m, 
                                                sessions: m.sessions.map(s => 
                                                  s.id === session.id 
                                                    ? { ...s, status: 'completed' } 
                                                    : s
                                                ),
                                                sessionsCompleted: m.sessionsCompleted + 1
                                              } 
                                            : m
                                        ));
                                        
                                        toast({
                                          title: "Session Completed",
                                          description: "The session has been marked as completed"
                                        });
                                      }}>
                                        <Clock className="h-3.5 w-3.5" />
                                        Mark as Completed
                                      </Button>
                                    )}
                                    
                                    {session.status === 'upcoming' && (
                                      <Button variant="outline" size="sm" className="gap-1 text-destructive" onClick={() => {
                                        setMentorships(mentorships.map(m => 
                                          m.id === activeMentorship.id 
                                            ? { 
                                                ...m, 
                                                sessions: m.sessions.map(s => 
                                                  s.id === session.id 
                                                    ? { ...s, status: 'cancelled' } 
                                                    : s
                                                )
                                              } 
                                            : m
                                        ));
                                        
                                        toast({
                                          title: "Session Cancelled",
                                          description: "The session has been marked as cancelled"
                                        });
                                      }}>
                                        <X className="h-3.5 w-3.5" />
                                        Cancel
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="tasks">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium">Assigned Tasks</h4>
                            <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
                              <DialogTrigger asChild>
                                <Button size="sm" className="gap-1">
                                  <Plus className="h-3.5 w-3.5" />
                                  Assign Task
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Assign a New Task</DialogTitle>
                                  <DialogDescription>
                                    Create a task for {activeMentorship.menteeName} to complete
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="task-title">
                                      Task Title
                                    </label>
                                    <Input
                                      id="task-title"
                                      placeholder="e.g., Create a React Component"
                                      value={newTaskTitle}
                                      onChange={(e) => setNewTaskTitle(e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="task-description">
                                      Description
                                    </label>
                                    <Textarea
                                      id="task-description"
                                      placeholder="Provide clear instructions for the task..."
                                      value={newTaskDescription}
                                      onChange={(e) => setNewTaskDescription(e.target.value)}
                                      className="resize-none"
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="task-due-date">
                                      Due Date
                                    </label>
                                    <Input
                                      id="task-due-date"
                                      type="date"
                                      value={newTaskDueDate}
                                      onChange={(e) => setNewTaskDueDate(e.target.value)}
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox 
                                      id="task-has-sample" 
                                      checked={newTaskHasSample} 
                                      onCheckedChange={(checked) => setNewTaskHasSample(checked === true)}
                                    />
                                    <label
                                      htmlFor="task-has-sample"
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      Provide sample/template
                                    </label>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>Cancel</Button>
                                  <Button onClick={handleAddTask} disabled={!newTaskTitle || !newTaskDescription || !newTaskDueDate}>Assign Task</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          
                          <div className="space-y-4">
                            {activeMentorship.tasks.map(task => (
                              <Card key={task.id}>
                                <div className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium">{task.title}</h4>
                                    <Badge 
                                      variant={task.status === 'completed' ? 'default' : 'secondary'}
                                    >
                                      {task.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mb-3">
                                    {task.description}
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-3">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                  </p>
                                  
                                  {task.feedback && (
                                    <div className="bg-primary/5 p-3 rounded-md mb-3">
                                      <h5 className="text-sm font-medium mb-1">Your Feedback</h5>
                                      <p className="text-sm">{task.feedback}</p>
                                    </div>
                                  )}
                                  
                                  {task.submission && (
                                    <div className="bg-muted/30 p-3 rounded-md mb-3">
                                      <h5 className="text-sm font-medium mb-1">Mentee's Submission</h5>
                                      <p className="text-sm">{task.submission}</p>
                                    </div>
                                  )}
                                  
                                  <div className="flex justify-end gap-2">
                                    {task.hasSample && (
                                      <Button variant="outline" size="sm" className="gap-1" onClick={() => {
                                        toast({
                                          title: "Sample Downloaded",
                                          description: "The sample template has been downloaded"
                                        });
                                      }}>
                                        <Download className="h-3.5 w-3.5" />
                                        Download Sample
                                      </Button>
                                    )}
                                    
                                    {task.status === 'pending' && task.submission && (
                                      <Dialog open={showTaskFeedbackDialog && selectedTask?.id === task.id} onOpenChange={(open) => {
                                        setShowTaskFeedbackDialog(open);
                                        if (open) {
                                          setSelectedTask(task);
                                          setTaskFeedback(task.feedback || '');
                                        }
                                      }}>
                                        <DialogTrigger asChild>
                                          <Button variant="outline" size="sm" className="gap-1">
                                            <PenTool className="h-3.5 w-3.5" />
                                            Provide Feedback
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Provide Feedback</DialogTitle>
                                            <DialogDescription>
                                              Review {activeMentorship.menteeName}'s submission and provide feedback
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="py-4">
                                            <h4 className="text-sm font-medium mb-2">Mentee's Submission</h4>
                                            <div className="bg-muted/30 p-3 rounded-md mb-4">
                                              <p className="text-sm">{task.submission}</p>
                                            </div>
                                            <h4 className="text-sm font-medium mb-2">Your Feedback</h4>
                                            <Textarea
                                              placeholder="Provide constructive feedback on the submission..."
                                              value={taskFeedback}
                                              onChange={(e) => setTaskFeedback(e.target.value)}
                                              className="resize-none"
                                              rows={4}
                                            />
                                          </div>
                                          <DialogFooter>
                                            <Button variant="outline" onClick={() => setShowTaskFeedbackDialog(false)}>Cancel</Button>
                                            <Button onClick={handleSaveTaskFeedback} disabled={!taskFeedback.trim()}>
                                              Save Feedback & Mark Completed
                                            </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            ))}
                            
                            {activeMentorship.tasks.length === 0 && (
                              <div className="text-center py-8">
                                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Tasks Assigned</h3>
                                <p className="text-muted-foreground mb-4">
                                  You haven't assigned any tasks to this mentee yet.
                                </p>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setShowAddTaskDialog(true)}
                                  className="gap-1"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                  Assign First Task
                                </Button>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="courses">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium">Recommended Courses</h4>
                            <Dialog open={showAddCourseDialog} onOpenChange={setShowAddCourseDialog}>
                              <DialogTrigger asChild>
                                <Button size="sm" className="gap-1">
                                  <Plus className="h-3.5 w-3.5" />
                                  Recommend Course
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Recommend a Course</DialogTitle>
                                  <DialogDescription>
                                    Recommend learning materials for {activeMentorship.menteeName}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="course-title">
                                      Course Title
                                    </label>
                                    <Input
                                      id="course-title"
                                      placeholder="e.g., Advanced React Patterns"
                                      value={newCourseTitle}
                                      onChange={(e) => setNewCourseTitle(e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="course-description">
                                      Description
                                    </label>
                                    <Textarea
                                      id="course-description"
                                      placeholder="Brief description of the course content..."
                                      value={newCourseDescription}
                                      onChange={(e) => setNewCourseDescription(e.target.value)}
                                      className="resize-none"
                                      rows={3}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowAddCourseDialog(false)}>Cancel</Button>
                                  <Button onClick={handleAddCourse} disabled={!newCourseTitle || !newCourseDescription}>Recommend</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          
                          <div className="space-y-4">
                            {activeMentorship.courses.map(course => (
                              <Card key={course.id}>
                                <div className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium">{course.title}</h4>
                                    <Badge 
                                      variant={course.progress === 100 ? 'default' : 'secondary'}
                                    >
                                      {course.progress}% complete
                                    </Badge>
                                  </div>
                                  <p className="text-sm mb-3">
                                    {course.description}
                                  </p>
                                  <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary rounded-full" 
                                      style={{ width: `${course.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </Card>
                            ))}
                            
                            {activeMentorship.courses.length === 0 && (
                              <div className="text-center py-8">
                                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Courses Recommended</h3>
                                <p className="text-muted-foreground mb-4">
                                  You haven't recommended any courses to this mentee yet.
                                </p>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setShowAddCourseDialog(true)}
                                  className="gap-1"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                  Recommend First Course
                                </Button>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveMentorships;
