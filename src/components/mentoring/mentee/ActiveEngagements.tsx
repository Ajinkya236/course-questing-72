
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
  ChevronRight,
  Download,
  Target,
  BookMarked,
  Award,
  Video,
  Plus,
  Edit,
  Trash
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MarkSessionCompleteButton from './MarkSessionCompleteButton';

// Define the types as mentioned in the error message
type SessionStatus = "completed" | "upcoming" | "cancelled";
type TaskStatus = "pending" | "completed";

interface Session {
  id: number;
  title: string;
  date: string;
  time?: string;
  status: SessionStatus;
  notes?: string;
  meetingLink?: string;
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: TaskStatus;
  description?: string;
  hasSample?: boolean;
}

interface Course {
  id: number;
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
}

interface Engagement {
  id: number;
  mentorName: string;
  mentorTitle: string;
  topic: string;
  startDate: string;
  imageUrl: string;
  progress: number;
  sessions: Session[];
  tasks: Task[];
  courses: Course[];
  goalsSet: boolean;
  sessionsCompleted: number;
  journalEntries?: { id: number; date: string; content: string }[];
}

// Mock data for active engagements with proper typing
const activeEngagementsData: Engagement[] = [
  {
    id: 1,
    mentorName: "Dr. Sarah Johnson",
    mentorTitle: "Senior Data Scientist",
    topic: "Data Analysis",
    startDate: "2023-10-20",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    progress: 40,
    goalsSet: false,
    sessionsCompleted: 1,
    sessions: [
      { id: 1, title: "Introduction to Data Analysis", date: "2023-10-25", time: "10:00 AM", status: "completed", notes: "Discussed key concepts and tools", meetingLink: "https://meet.zoom.us/j/123456789" },
      { id: 2, title: "Advanced Data Visualization", date: "2023-11-05", time: "2:30 PM", status: "upcoming", meetingLink: "https://meet.zoom.us/j/987654321" }
    ],
    tasks: [
      { id: 1, title: "Data Cleaning Exercise", dueDate: "2023-10-30", status: "completed", description: "Clean the provided dataset and normalize values." },
      { id: 2, title: "Visualization Project", dueDate: "2023-11-15", status: "pending", description: "Create visualizations using the cleaned dataset.", hasSample: true }
    ],
    courses: [
      { id: 1, title: "Fundamentals of Data Analysis", progress: 75, totalModules: 8, completedModules: 6 }
    ],
    journalEntries: [
      { id: 1, date: "2023-10-25", content: "Today I learned about data cleaning techniques and how to identify outliers." }
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
    goalsSet: true,
    sessionsCompleted: 3,
    sessions: [
      { id: 1, title: "Product Requirements", date: "2023-09-20", time: "11:00 AM", status: "completed", notes: "Learned how to gather and document requirements", meetingLink: "https://meet.zoom.us/j/111222333" },
      { id: 2, title: "Stakeholder Management", date: "2023-10-05", time: "1:00 PM", status: "completed", notes: "Discussed effective communication strategies", meetingLink: "https://meet.zoom.us/j/444555666" },
      { id: 3, title: "Product Roadmapping", date: "2023-10-20", time: "3:00 PM", status: "completed", notes: "Created a sample roadmap", meetingLink: "https://meet.zoom.us/j/777888999" },
      { id: 4, title: "Launch Strategies", date: "2023-11-10", time: "2:00 PM", status: "upcoming", meetingLink: "https://meet.zoom.us/j/000111222" }
    ],
    tasks: [
      { id: 1, title: "Competitive Analysis", dueDate: "2023-09-30", status: "completed", description: "Research 3-5 competing products and analyze their strengths and weaknesses." },
      { id: 2, title: "Create PRD Document", dueDate: "2023-10-15", status: "completed", description: "Develop a Product Requirements Document for your chosen product idea." },
      { id: 3, title: "User Persona Development", dueDate: "2023-11-05", status: "pending", description: "Create 3-4 user personas for your product.", hasSample: true }
    ],
    courses: [
      { id: 1, title: "Product Management Fundamentals", progress: 100, totalModules: 10, completedModules: 10 },
      { id: 2, title: "Agile Product Development", progress: 40, totalModules: 5, completedModules: 2 }
    ],
    journalEntries: [
      { id: 1, date: "2023-09-20", content: "Today's session on product requirements was insightful. I learned how to properly scope features and prioritize based on user needs." },
      { id: 2, date: "2023-10-05", content: "Stakeholder management is challenging but crucial. I need to work on my communication skills with technical teams." }
    ]
  }
];

const ActiveEngagements = () => {
  const { toast } = useToast();
  const [engagements, setEngagements] = useState<Engagement[]>(activeEngagementsData);
  const [activeEngagementId, setActiveEngagementId] = useState<number | null>(
    engagements.length > 0 ? engagements[0].id : null
  );
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [showTaskSubmissionDialog, setShowTaskSubmissionDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sessionNote, setSessionNote] = useState('');
  const [taskFile, setTaskFile] = useState<File | null>(null);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completionFeedback, setCompletionFeedback] = useState('');
  const [showGoalSettingDialog, setShowGoalSettingDialog] = useState(false);
  const [goal, setGoal] = useState('');
  const [showJournalSheet, setShowJournalSheet] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  
  // New states for session management
  const [showScheduleSessionDialog, setShowScheduleSessionDialog] = useState(false);
  const [showEditSessionDialog, setShowEditSessionDialog] = useState(false);
  const [showDeleteSessionDialog, setShowDeleteSessionDialog] = useState(false);
  const [showJoinSessionDialog, setShowJoinSessionDialog] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionDate, setNewSessionDate] = useState('');
  const [newSessionTime, setNewSessionTime] = useState('');
  const [newSessionLink, setNewSessionLink] = useState('');

  const activeEngagement = engagements.find(e => e.id === activeEngagementId) || null;

  const handleAddNote = () => {
    if (!activeEngagement || !selectedSession || !sessionNote.trim()) return;
    
    // Update the session notes in the state
    setEngagements(engagements.map(e => 
      e.id === activeEngagementId 
        ? {
            ...e,
            sessions: e.sessions.map(s => 
              s.id === selectedSession.id ? { ...s, notes: sessionNote } : s
            )
          }
        : e
    ));
    
    toast({
      title: "Note Added",
      description: "Your note has been saved successfully."
    });
    
    setSessionNote('');
    setShowNoteDialog(false);
  };

  const handleTaskSubmission = () => {
    if (!activeEngagement || !selectedTask || !taskFile) return;
    
    // Update the task status in the state
    setEngagements(engagements.map(e => 
      e.id === activeEngagementId 
        ? {
            ...e,
            tasks: e.tasks.map(t => 
              t.id === selectedTask.id ? { ...t, status: "completed" as TaskStatus } : t
            )
          }
        : e
    ));
    
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
    if (!activeEngagementId) return;
    
    // Check if completion requirements are met
    const engagement = engagements.find(e => e.id === activeEngagementId);
    if (!engagement?.goalsSet || engagement.sessionsCompleted === 0) {
      toast({
        title: "Cannot Complete Engagement",
        description: "You must set goals and complete at least one session before completing the engagement.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Engagement Completed",
      description: "You have successfully completed this mentoring engagement."
    });
    
    setShowCompletionDialog(false);
  };

  const handleSetGoals = () => {
    if (!activeEngagementId || !goal.trim()) return;
    
    setEngagements(engagements.map(e => 
      e.id === activeEngagementId ? { ...e, goalsSet: true } : e
    ));
    
    toast({
      title: "Goals Set",
      description: "Your mentoring goals have been saved successfully."
    });
    
    setShowGoalSettingDialog(false);
  };

  const handleAddJournalEntry = () => {
    if (!activeEngagement || !journalEntry.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      content: journalEntry
    };
    
    setEngagements(engagements.map(e => 
      e.id === activeEngagementId 
        ? { 
            ...e, 
            journalEntries: [...(e.journalEntries || []), newEntry]
          } 
        : e
    ));
    
    toast({
      title: "Journal Entry Added",
      description: "Your journal entry has been saved successfully."
    });
    
    setJournalEntry('');
  };

  const handleDownloadAllMaterials = () => {
    toast({
      title: "Download Started",
      description: "All tasks, notes and materials are being prepared for download."
    });
  };
  
  // Session management handlers
  const handleScheduleSession = () => {
    if (!activeEngagement || !newSessionTitle || !newSessionDate || !newSessionTime) return;
    
    const newSession: Session = {
      id: Date.now(),
      title: newSessionTitle,
      date: newSessionDate,
      time: newSessionTime,
      status: "upcoming",
      meetingLink: newSessionLink
    };
    
    setEngagements(engagements.map(e => 
      e.id === activeEngagementId 
        ? {
            ...e,
            sessions: [...e.sessions, newSession]
          }
        : e
    ));
    
    toast({
      title: "Session Scheduled",
      description: "Your new mentoring session has been scheduled."
    });
    
    setNewSessionTitle('');
    setNewSessionDate('');
    setNewSessionTime('');
    setNewSessionLink('');
    setShowScheduleSessionDialog(false);
  };
  
  const handleEditSession = () => {
    if (!activeEngagement || !selectedSession || !newSessionTitle || !newSessionDate || !newSessionTime) return;
    
    setEngagements(engagements.map(e => 
      e.id === activeEngagementId 
        ? {
            ...e,
            sessions: e.sessions.map(s => 
              s.id === selectedSession.id 
                ? { 
                    ...s, 
                    title: newSessionTitle, 
                    date: newSessionDate, 
                    time: newSessionTime,
                    meetingLink: newSessionLink || s.meetingLink
                  } 
                : s
            )
          }
        : e
    ));
    
    toast({
      title: "Session Updated",
      description: "Your mentoring session has been updated."
    });
    
    setShowEditSessionDialog(false);
  };
  
  const handleDeleteSession = () => {
    if (!activeEngagement || !selectedSession) return;
    
    // Remove the session
    setEngagements(engagements.map(e => 
      e.id === activeEngagementId 
        ? {
            ...e,
            sessions: e.sessions.filter(s => s.id !== selectedSession.id)
          }
        : e
    ));
    
    toast({
      title: "Session Deleted",
      description: "The mentoring session has been deleted."
    });
    
    setShowDeleteSessionDialog(false);
  };
  
  const handleJoinSession = () => {
    if (!selectedSession?.meetingLink) return;
    
    // In a real app, this would open the meeting link
    window.open(selectedSession.meetingLink, '_blank');
    
    toast({
      title: "Joining Session",
      description: "Opening your mentoring session..."
    });
    
    setShowJoinSessionDialog(false);
  };
  
  const handleCancelSession = () => {
    if (!activeEngagement || !selectedSession) return;
    
    // Mark the session as cancelled
    setEngagements(engagements.map(e => 
      e.id === activeEngagementId 
        ? {
            ...e,
            sessions: e.sessions.map(s => 
              s.id === selectedSession.id ? { ...s, status: "cancelled" as SessionStatus } : s
            )
          }
        : e
    ));
    
    toast({
      title: "Session Cancelled",
      description: "Your mentoring session has been cancelled."
    });
    
    setShowDeleteSessionDialog(false);
  };
  
  const canCompleteEngagement = activeEngagement?.goalsSet && activeEngagement?.sessionsCompleted > 0;

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
            <div>
              <div className="p-4 mb-6 border border-amber-200 bg-amber-50 rounded-md">
                <h3 className="text-sm font-medium text-amber-800 mb-1">Completion Requirements</h3>
                <p className="text-xs text-amber-700">
                  To complete an engagement, you must set your learning goals and complete at least one session with your mentor.
                </p>
              </div>
              
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
                            <div className="flex flex-col gap-1 mt-2">
                              <div className="flex items-center text-xs">
                                <Target className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>{engagement.goalsSet ? 'Goals set' : 'Goals not set'}</span>
                              </div>
                              <div className="flex items-center text-xs">
                                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>{engagement.sessionsCompleted} session(s) completed</span>
                              </div>
                            </div>
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
                    <div className="mt-6 space-y-2">
                      <Sheet open={showJournalSheet} onOpenChange={setShowJournalSheet}>
                        <SheetTrigger asChild>
                          <Button variant="outline" className="w-full gap-2" size="sm">
                            <BookMarked className="h-4 w-4" />
                            Mentee Journal
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Mentee Journal</SheetTitle>
                            <SheetDescription>
                              Keep private notes about your mentoring journey with {activeEngagement.mentorName}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="py-6">
                            <div className="mb-6">
                              <h4 className="font-medium mb-2">New Entry</h4>
                              <Textarea 
                                placeholder="Write your thoughts, learnings, questions, or notes here..."
                                value={journalEntry}
                                onChange={(e) => setJournalEntry(e.target.value)}
                                className="resize-none"
                                rows={6}
                              />
                              <Button 
                                onClick={handleAddJournalEntry} 
                                className="mt-2"
                                disabled={!journalEntry.trim()}
                              >
                                Add Entry
                              </Button>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-3">Previous Entries</h4>
                              {activeEngagement.journalEntries && activeEngagement.journalEntries.length > 0 ? (
                                <div className="space-y-4">
                                  {activeEngagement.journalEntries.map(entry => (
                                    <div key={entry.id} className="p-3 border rounded-md">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                                      </div>
                                      <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">No journal entries yet</p>
                              )}
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                      
                      <Button variant="outline" className="w-full gap-2" size="sm" onClick={handleDownloadAllMaterials}>
                        <Download className="h-4 w-4" />
                        Download Materials
                      </Button>

                      <Dialog open={showGoalSettingDialog} onOpenChange={setShowGoalSettingDialog}>
                        <DialogTrigger asChild>
                          <Button 
                            variant={activeEngagement.goalsSet ? "outline" : "default"} 
                            className="w-full gap-2" 
                            size="sm"
                          >
                            <Target className="h-4 w-4" />
                            {activeEngagement.goalsSet ? "Update Goals" : "Set Goals"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Set Your Learning Goals</DialogTitle>
                            <DialogDescription>
                              Define what you want to achieve through this mentoring engagement
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <Textarea 
                              placeholder="Describe your specific learning goals for this mentoring relationship..."
                              value={goal}
                              onChange={(e) => setGoal(e.target.value)}
                              className="resize-none"
                              rows={6}
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              Setting clear, specific goals will help your mentor guide you more effectively.
                            </p>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowGoalSettingDialog(false)}>Cancel</Button>
                            <Button onClick={handleSetGoals} disabled={!goal.trim()}>Save Goals</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

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
                            {canCompleteEngagement ? (
                              <div className="border p-8 rounded-md text-center space-y-4">
                                <Award className="h-12 w-12 mx-auto text-primary" />
                                <h3 className="text-xl font-bold">Certificate of Achievement</h3>
                                <p className="text-muted-foreground">This certifies that</p>
                                <p className="text-xl">[Your Name]</p>
                                <p className="text-muted-foreground">has successfully completed</p>
                                <p className="text-lg font-medium">{activeEngagement?.topic} Mentorship</p>
                                <p className="text-muted-foreground">under the guidance of</p>
                                <p className="text-lg">{activeEngagement?.mentorName}</p>
                                <div className="pt-4 text-sm text-muted-foreground">
                                  <p>This certificate will be available for download after</p>
                                  <p>you complete this engagement</p>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-6">
                                <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">Certificate Not Available Yet</h3>
                                <p className="text-muted-foreground mb-4">
                                  You need to set goals and complete at least one session before earning a certificate.
                                </p>
                                <div className="space-y-2 text-sm mt-4">
                                  <div className="flex items-center gap-2">
                                    <Checkbox id="goals" checked={activeEngagement.goalsSet} disabled />
                                    <label htmlFor="goals" className={activeEngagement.goalsSet ? "" : "text-muted-foreground"}>
                                      Set learning goals
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Checkbox id="sessions" checked={activeEngagement.sessionsCompleted > 0} disabled />
                                    <label htmlFor="sessions" className={activeEngagement.sessionsCompleted > 0 ? "" : "text-muted-foreground"}>
                                      Complete at least one session
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
                          <Button 
                            variant="default" 
                            className="w-full mt-2" 
                            size="sm" 
                            disabled={!canCompleteEngagement}
                          >
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
                            <Button onClick={handleCompleteEngagement} disabled={!completionFeedback.trim()}>Complete & Send Feedback</Button>
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
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-md font-medium">Mentoring Sessions</h3>
                            <Dialog open={showScheduleSessionDialog} onOpenChange={setShowScheduleSessionDialog}>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-1">
                                  <Plus className="h-4 w-4" />
                                  Schedule Session
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Schedule New Session</DialogTitle>
                                  <DialogDescription>
                                    Plan a new mentoring session with {activeEngagement.mentorName}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium" htmlFor="session-title">Session Title</label>
                                    <Input
                                      id="session-title"
                                      placeholder="e.g., Career Growth Discussion"
                                      value={newSessionTitle}
                                      onChange={(e) => setNewSessionTitle(e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium" htmlFor="session-date">Date</label>
                                    <Input
                                      id="session-date"
                                      type="date"
                                      value={newSessionDate}
                                      onChange={(e) => setNewSessionDate(e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium" htmlFor="session-time">Time</label>
                                    <Input
                                      id="session-time"
                                      type="time"
                                      value={newSessionTime}
                                      onChange={(e) => setNewSessionTime(e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium" htmlFor="session-link">Meeting Link (Optional)</label>
                                    <Input
                                      id="session-link"
                                      placeholder="e.g., https://zoom.us/j/123456789"
                                      value={newSessionLink}
                                      onChange={(e) => setNewSessionLink(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowScheduleSessionDialog(false)}>Cancel</Button>
                                  <Button 
                                    onClick={handleScheduleSession}
                                    disabled={!newSessionTitle || !newSessionDate || !newSessionTime}
                                  >
                                    Schedule
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          
                          <div className="space-y-4">
                            {activeEngagement.sessions.map(session => (
                              <Card key={session.id}>
                                <div className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium">{session.title}</h4>
                                    <Badge 
                                      variant={
                                        session.status === 'completed' 
                                          ? 'default' 
                                          : session.status === 'cancelled' 
                                            ? 'destructive' 
                                            : 'outline'
                                      }
                                    >
                                      {session.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-1">
                                    {new Date(session.date).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                    {session.time && ` at ${session.time}`}
                                  </p>
                                  
                                  {session.meetingLink && session.status === 'upcoming' && (
                                    <p className="text-sm text-primary mb-3">
                                      <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                        <Video className="h-3.5 w-3.5" />
                                        Meeting Link
                                      </a>
                                    </p>
                                  )}
                                  
                                  {session.notes && (
                                    <div className="bg-muted/30 p-3 rounded-md mb-3">
                                      <h5 className="text-sm font-medium mb-1">Your Notes</h5>
                                      <p className="text-sm">{session.notes}</p>
                                    </div>
                                  )}
                                  
                                  <div className="flex flex-wrap justify-end gap-2 mt-3">
                                    {session.status === 'completed' && (
                                      <Dialog open={showNoteDialog && selectedSession?.id === session.id} onOpenChange={(open) => {
                                        setShowNoteDialog(open);
                                        if (open) {
                                          setSelectedSession(session);
                                          setSessionNote(session.notes || '');
                                        }
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
                                    )}
                                    
                                    {session.status === 'upcoming' && (
                                      <>
                                        <Dialog open={showJoinSessionDialog && selectedSession?.id === session.id} onOpenChange={(open) => {
                                          setShowJoinSessionDialog(open);
                                          if (open) setSelectedSession(session);
                                        }}>
                                          <DialogTrigger asChild>
                                            <Button variant="default" size="sm" className="gap-1">
                                              <Video className="h-3.5 w-3.5" />
                                              Join Session
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Join Mentoring Session</DialogTitle>
                                              <DialogDescription>
                                                You're about to join your session with {activeEngagement.mentorName}
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="py-4">
                                              <div className="mb-4">
                                                <h4 className="text-sm font-medium mb-1">Session Details</h4>
                                                <p className="text-sm">{session.title}</p>
                                                <p className="text-sm">
                                                  {new Date(session.date).toLocaleDateString()} at {session.time}
                                                </p>
                                              </div>
                                              <div className="p-3 bg-muted/30 rounded-md">
                                                <p className="text-sm text-muted-foreground mb-2">Tips before joining:</p>
                                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                                                  <li>Ensure you have a stable internet connection</li>
                                                  <li>Test your audio and video</li>
                                                  <li>Have any questions or topics ready</li>
                                                </ul>
                                              </div>
                                            </div>
                                            <DialogFooter>
                                              <Button variant="outline" onClick={() => setShowJoinSessionDialog(false)}>Cancel</Button>
                                              <Button onClick={handleJoinSession}>
                                                Join Now
                                              </Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                        
                                        <Dialog open={showEditSessionDialog && selectedSession?.id === session.id} onOpenChange={(open) => {
                                          setShowEditSessionDialog(open);
                                          if (open) {
                                            setSelectedSession(session);
                                            setNewSessionTitle(session.title);
                                            setNewSessionDate(session.date);
                                            setNewSessionTime(session.time || '');
                                            setNewSessionLink(session.meetingLink || '');
                                          }
                                        }}>
                                          <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="gap-1">
                                              <Edit className="h-3.5 w-3.5" />
                                              Edit
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Edit Session</DialogTitle>
                                              <DialogDescription>
                                                Update the details of your mentoring session
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="py-4 space-y-4">
                                              <div className="space-y-2">
                                                <label className="text-sm font-medium" htmlFor="edit-session-title">Session Title</label>
                                                <Input
                                                  id="edit-session-title"
                                                  value={newSessionTitle}
                                                  onChange={(e) => setNewSessionTitle(e.target.value)}
                                                />
                                              </div>
                                              <div className="space-y-2">
                                                <label className="text-sm font-medium" htmlFor="edit-session-date">Date</label>
                                                <Input
                                                  id="edit-session-date"
                                                  type="date"
                                                  value={newSessionDate}
                                                  onChange={(e) => setNewSessionDate(e.target.value)}
                                                />
                                              </div>
                                              <div className="space-y-2">
                                                <label className="text-sm font-medium" htmlFor="edit-session-time">Time</label>
                                                <Input
                                                  id="edit-session-time"
                                                  type="time"
                                                  value={newSessionTime}
                                                  onChange={(e) => setNewSessionTime(e.target.value)}
                                                />
                                              </div>
                                              <div className="space-y-2">
                                                <label className="text-sm font-medium" htmlFor="edit-session-link">Meeting Link</label>
                                                <Input
                                                  id="edit-session-link"
                                                  value={newSessionLink}
                                                  onChange={(e) => setNewSessionLink(e.target.value)}
                                                />
                                              </div>
                                            </div>
                                            <DialogFooter>
                                              <Button variant="outline" onClick={() => setShowEditSessionDialog(false)}>Cancel</Button>
                                              <Button 
                                                onClick={handleEditSession}
                                                disabled={!newSessionTitle || !newSessionDate || !newSessionTime}
                                              >
                                                Save Changes
                                              </Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                        
                                        <Dialog open={showDeleteSessionDialog && selectedSession?.id === session.id} onOpenChange={(open) => {
                                          setShowDeleteSessionDialog(open);
                                          if (open) setSelectedSession(session);
                                        }}>
                                          <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                                              <Trash className="h-3.5 w-3.5" />
                                              Cancel
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Cancel Session</DialogTitle>
                                              <DialogDescription>
                                                Are you sure you want to cancel this session?
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="py-4">
                                              <p className="text-sm text-muted-foreground mb-2">
                                                Your mentor will be notified that this session has been cancelled.
                                              </p>
                                              <div className="mt-4 p-3 border rounded-md">
                                                <h5 className="text-sm font-medium">{session.title}</h5>
                                                <p className="text-sm text-muted-foreground">
                                                  {new Date(session.date).toLocaleDateString()} at {session.time}
                                                </p>
                                              </div>
                                            </div>
                                            <DialogFooter>
                                              <Button variant="outline" onClick={() => setShowDeleteSessionDialog(false)}>
                                                Keep Session
                                              </Button>
                                              <Button variant="destructive" onClick={handleCancelSession}>
                                                Cancel Session
                                              </Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                      </>
                                    )}
                                    
                                    {session.status === 'upcoming' && (
                                      <MarkSessionCompleteButton session={session} />
                                    )}
                                  </div>
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
                                      variant={task.status === 'completed' ? 'default' : 'outline'}
                                    >
                                      {task.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                  </p>
                                  
                                  {task.description && (
                                    <div className="bg-muted/30 p-3 rounded-md mb-3">
                                      <p className="text-sm">{task.description}</p>
                                    </div>
                                  )}
                                  
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {task.hasSample && (
                                      <Button variant="outline" size="sm" className="gap-1">
                                        <Download className="h-3.5 w-3.5" />
                                        Download Sample
                                      </Button>
                                    )}
                                    
                                    {task.status === 'pending' && (
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
                                              Accepted file types: PDF, DOC, DOCX, PPT, PPTX, MP4, MOV (Max: 10MB)
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
                                    )}
                                    
                                    {task.status === 'completed' && (
                                      <Badge variant="outline" className="gap-1">
                                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                                        Completed
                                      </Badge>
                                    )}
                                  </div>
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveEngagements;
