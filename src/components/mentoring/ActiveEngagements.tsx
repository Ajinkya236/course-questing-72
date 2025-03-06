
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  BookOpen, 
  Calendar, 
  Check, 
  CheckCircle, 
  FileText, 
  LogOut, 
  Plus, 
  Star, 
  Target, 
  Upload, 
  UserRound 
} from 'lucide-react';
import SessionDialog from './SessionDialog';
import TaskDialog from './TaskDialog';
import NoteDialog from './NoteDialog';
import GoalDialog from './GoalDialog';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app this would come from the database
const mockEngagements = [
  {
    id: "eng1",
    mentorId: "1",
    mentorName: "Sarah Johnson",
    mentorRole: "Senior Product Manager",
    mentorAvatar: "https://i.pravatar.cc/150?img=1",
    topic: "Leadership",
    startDate: "2023-05-01T12:00:00Z",
    hasGoals: true,
    goalsCompleted: 1,
    totalGoals: 3,
    sessions: [
      {
        id: "ses1",
        title: "Initial Discussion",
        date: "2023-05-05T14:00:00Z",
        status: "completed",
        notes: "We discussed my leadership challenges and set initial goals."
      },
      {
        id: "ses2",
        title: "Goal Setting and Planning",
        date: "2023-05-15T15:00:00Z",
        status: "completed",
        notes: "We finalized the mentorship goals and created an action plan."
      },
      {
        id: "ses3",
        title: "Progress Review",
        date: "2023-06-01T16:00:00Z",
        status: "scheduled",
        notes: ""
      }
    ],
    tasks: [
      {
        id: "task1",
        title: "Read 'Leaders Eat Last'",
        description: "Read the first 3 chapters and prepare discussion points.",
        dueDate: "2023-05-10T23:59:59Z",
        status: "completed",
        feedback: "Great insights shared during our discussion."
      },
      {
        id: "task2",
        title: "Shadow a Team Meeting",
        description: "Attend a senior leadership meeting and take notes on leadership styles observed.",
        dueDate: "2023-05-20T23:59:59Z",
        status: "completed",
        feedback: "Good observations, let's discuss further in our next session."
      },
      {
        id: "task3",
        title: "Prepare Development Plan",
        description: "Create a 90-day leadership development plan using the template provided.",
        dueDate: "2023-06-05T23:59:59Z",
        status: "in-progress",
        feedback: ""
      }
    ],
    courses: [
      {
        id: "course1",
        title: "Effective Leadership Communication",
        progress: 75
      },
      {
        id: "course2",
        title: "Conflict Resolution for Leaders",
        progress: 30
      }
    ],
    journal: [
      {
        id: "note1",
        date: "2023-05-05T15:30:00Z",
        content: "Had a great first session with Sarah. She provided insights on how to handle difficult team conversations that I hadn't considered before.",
        isPrivate: true
      },
      {
        id: "note2",
        date: "2023-05-15T16:45:00Z",
        content: "Sarah suggested I focus more on active listening. I need to practice this more in my team meetings.",
        isPrivate: true
      }
    ]
  },
  {
    id: "eng2",
    mentorId: "4",
    mentorName: "Marcus Williams",
    mentorRole: "Data Science Director",
    mentorAvatar: "https://i.pravatar.cc/150?img=7",
    topic: "Data Analysis",
    startDate: "2023-06-01T12:00:00Z",
    hasGoals: false,
    goalsCompleted: 0,
    totalGoals: 0,
    sessions: [
      {
        id: "ses4",
        title: "Initial Discussion",
        date: "2023-06-05T15:00:00Z",
        status: "completed",
        notes: "We discussed my background in data analysis and areas I want to improve."
      }
    ],
    tasks: [],
    courses: [],
    journal: [
      {
        id: "note3",
        date: "2023-06-05T16:30:00Z",
        content: "Marcus is very knowledgeable. We need to set more specific goals in our next session.",
        isPrivate: true
      }
    ]
  }
];

interface ActiveEngagementsProps {
  isEnabled: boolean;
}

const ActiveEngagements = ({ isEnabled }: ActiveEngagementsProps) => {
  const [engagements, setEngagements] = useState(mockEngagements);
  const [currentEngagementId, setCurrentEngagementId] = useState(engagements[0]?.id || '');
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  const currentEngagement = engagements.find(e => e.id === currentEngagementId) || engagements[0];
  
  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const handleAddNote = (note: string) => {
    // In a real app, this would call an API to add a note
    const newNote = {
      id: `note${Math.random().toString(36).substring(7)}`,
      date: new Date().toISOString(),
      content: note,
      isPrivate: true
    };
    
    const updatedEngagements = engagements.map(eng => {
      if (eng.id === currentEngagementId) {
        return {
          ...eng,
          journal: [newNote, ...eng.journal]
        };
      }
      return eng;
    });
    
    setEngagements(updatedEngagements);
    setIsNoteDialogOpen(false);
    
    toast({
      title: "Note Added",
      description: "Your journal entry has been saved.",
    });
  };
  
  const handleWithdrawEngagement = () => {
    // In a real app, this would call an API to withdraw from the engagement
    setEngagements(engagements.filter(eng => eng.id !== currentEngagementId));
    
    toast({
      title: "Engagement Withdrawn",
      description: "You have successfully withdrawn from this engagement.",
    });
    
    setWithdrawDialogOpen(false);
    
    if (engagements.length > 1) {
      setCurrentEngagementId(engagements.find(e => e.id !== currentEngagementId)?.id || '');
    }
  };
  
  const handleCompleteEngagement = () => {
    // In a real app, this would call an API to complete the engagement
    toast({
      title: "Engagement Completed",
      description: "Congratulations! You've successfully completed this mentorship engagement.",
    });
    
    setCompleteDialogOpen(false);
    
    // Redirect to history page in a real app
  };
  
  const handleAddGoal = (goal: string) => {
    // In a real app, this would call an API to add a goal
    const updatedEngagements = engagements.map(eng => {
      if (eng.id === currentEngagementId) {
        return {
          ...eng,
          hasGoals: true,
          totalGoals: eng.totalGoals + 1
        };
      }
      return eng;
    });
    
    setEngagements(updatedEngagements);
    setIsGoalDialogOpen(false);
    
    toast({
      title: "Goal Added",
      description: "Your mentorship goal has been added.",
    });
  };

  return (
    <div className={`${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <h2 className="text-xl font-bold mb-4">Active Engagements</h2>
      
      {engagements.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">You don't have any active mentorship engagements.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.history.back()}
          >
            Find Mentors
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">My Engagements</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {engagements.map(engagement => (
                    <div 
                      key={engagement.id}
                      className={`p-4 cursor-pointer hover:bg-muted transition-colors ${engagement.id === currentEngagementId ? 'bg-muted' : ''}`}
                      onClick={() => setCurrentEngagementId(engagement.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={engagement.mentorAvatar} alt={engagement.mentorName} />
                          <AvatarFallback>
                            {engagement.mentorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{engagement.mentorName}</p>
                          <Badge variant="secondary">{engagement.topic}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            {currentEngagement && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={currentEngagement.mentorAvatar} alt={currentEngagement.mentorName} />
                          <AvatarFallback>
                            {currentEngagement.mentorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{currentEngagement.mentorName}</CardTitle>
                          <p className="text-muted-foreground">{currentEngagement.mentorRole}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="default">{currentEngagement.topic}</Badge>
                        <Badge variant="outline">
                          Started {new Date(currentEngagement.startDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-muted-foreground" />
                        <div>
                          {currentEngagement.hasGoals ? (
                            <span>
                              Goals: {currentEngagement.goalsCompleted} of {currentEngagement.totalGoals} completed
                            </span>
                          ) : (
                            <span className="text-warning">No goals set</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => setIsGoalDialogOpen(true)}
                        >
                          {currentEngagement.hasGoals ? (
                            <>
                              <Plus className="h-4 w-4" />
                              Add Goal
                            </>
                          ) : (
                            <>
                              <Target className="h-4 w-4" />
                              Set Goals
                            </>
                          )}
                        </Button>
                        
                        <AlertDialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <LogOut className="h-4 w-4" />
                              Withdraw
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Withdraw from Engagement</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to withdraw from this mentorship engagement with {currentEngagement.mentorName}?
                                This action cannot be undone and may affect your relationship with this mentor.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleWithdrawEngagement}
                              >
                                Withdraw
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        
                        {currentEngagement.goalsCompleted > 0 && currentEngagement.goalsCompleted === currentEngagement.totalGoals && (
                          <AlertDialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="default" 
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Complete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Complete Mentorship</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Congratulations on reaching your goals! Are you ready to complete this mentorship engagement?
                                  You'll have an opportunity to provide feedback and receive a certificate.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Not Yet</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleCompleteEngagement}
                                >
                                  Complete Mentorship
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Tabs defaultValue="sessions">
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="sessions" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Sessions</span>
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>Tasks</span>
                    </TabsTrigger>
                    <TabsTrigger value="courses" className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Courses</span>
                    </TabsTrigger>
                    <TabsTrigger value="journal" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>Journal</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sessions" className="pt-4">
                    <div className="flex justify-end mb-4">
                      <Button 
                        size="sm"
                        className="flex items-center gap-1"
                        disabled
                      >
                        <Plus className="h-4 w-4" />
                        Schedule Session
                      </Button>
                    </div>
                    
                    {currentEngagement.sessions.length === 0 ? (
                      <Card className="p-4 text-center">
                        <p className="text-muted-foreground">No sessions scheduled yet.</p>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {currentEngagement.sessions.map(session => (
                          <Card key={session.id}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{session.title}</CardTitle>
                                <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
                                  {session.status === 'completed' ? 'Completed' : 'Scheduled'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(session.date)}
                              </p>
                            </CardHeader>
                            <CardContent>
                              {session.notes ? (
                                <div className="p-3 bg-muted rounded-md text-sm">
                                  {session.notes}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground italic">No notes yet.</p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="tasks" className="pt-4">
                    <div className="flex justify-end mb-4">
                      <Button 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => setIsTaskDialogOpen(true)}
                        disabled
                      >
                        <Upload className="h-4 w-4" />
                        Submit Task
                      </Button>
                    </div>
                    
                    {currentEngagement.tasks.length === 0 ? (
                      <Card className="p-4 text-center">
                        <p className="text-muted-foreground">No tasks assigned yet.</p>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {currentEngagement.tasks.map(task => (
                          <Card key={task.id}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{task.title}</CardTitle>
                                <Badge variant={
                                  task.status === 'completed' ? 'default' :
                                  task.status === 'in-progress' ? 'secondary' : 'outline'
                                }>
                                  {task.status === 'completed' ? 'Completed' :
                                   task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Due: {formatDate(task.dueDate)}
                              </p>
                            </CardHeader>
                            <CardContent>
                              <p className="mb-3">{task.description}</p>
                              
                              {task.status === 'in-progress' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex items-center gap-1"
                                >
                                  <Upload className="h-4 w-4" />
                                  Upload Submission
                                </Button>
                              )}
                              
                              {task.feedback && (
                                <div className="mt-4">
                                  <p className="text-sm font-medium mb-1">Feedback</p>
                                  <div className="p-3 bg-muted rounded-md text-sm">
                                    {task.feedback}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="courses" className="pt-4">
                    {currentEngagement.courses.length === 0 ? (
                      <Card className="p-4 text-center">
                        <p className="text-muted-foreground">No courses assigned yet.</p>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {currentEngagement.courses.map(course => (
                          <Card key={course.id}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{course.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                Continue Course
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="journal" className="pt-4">
                    <div className="flex justify-end mb-4">
                      <Button 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => setIsNoteDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4" />
                        Add Journal Entry
                      </Button>
                    </div>
                    
                    {currentEngagement.journal.length === 0 ? (
                      <Card className="p-4 text-center">
                        <p className="text-muted-foreground">No journal entries yet.</p>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {currentEngagement.journal.map(note => (
                          <Card key={note.id}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(note.date)}
                                </p>
                                {note.isPrivate && (
                                  <Badge variant="outline" className="text-xs">Private</Badge>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="whitespace-pre-wrap">{note.content}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Dialogs */}
      <SessionDialog 
        open={isSessionDialogOpen} 
        onOpenChange={setIsSessionDialogOpen}
        onSubmit={() => {
          setIsSessionDialogOpen(false);
          toast({
            title: "Session Added",
            description: "Your session has been scheduled.",
          });
        }} 
      />
      
      <TaskDialog 
        open={isTaskDialogOpen} 
        onOpenChange={setIsTaskDialogOpen}
        onSubmit={() => {
          setIsTaskDialogOpen(false);
          toast({
            title: "Task Submitted",
            description: "Your task submission has been received.",
          });
        }} 
      />
      
      <NoteDialog 
        open={isNoteDialogOpen} 
        onOpenChange={setIsNoteDialogOpen}
        onSubmit={handleAddNote} 
      />
      
      <GoalDialog 
        open={isGoalDialogOpen} 
        onOpenChange={setIsGoalDialogOpen}
        onSubmit={handleAddGoal} 
      />
    </div>
  );
};

export default ActiveEngagements;
