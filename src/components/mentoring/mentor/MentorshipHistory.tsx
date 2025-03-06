
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { History, Calendar, CheckCircle, Star, Download, Award, Users, FileText, BookOpen, ArrowDown } from 'lucide-react';
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
  submission?: string;
  feedback?: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
}

interface CompletedMentorship {
  id: number;
  menteeName: string;
  menteeTitle: string;
  menteeImage: string;
  topic: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'completed' | 'withdrawn';
  progress: number;
  sessions: Session[];
  tasks: Task[];
  courses: Course[];
  sessionsCompleted: number;
  tasksCompleted: number;
  coursesCompleted: number;
  certificate: boolean;
  goalsSet: boolean;
  mentorFeedback?: string;
  menteeFeedback?: {
    rating: number;
    comment: string;
  };
}

const MentorshipHistory = () => {
  const { toast } = useToast();
  const [completedMentorships, setCompletedMentorships] = useState<CompletedMentorship[]>([
    {
      id: 1,
      menteeName: "John Doe",
      menteeTitle: "Software Developer",
      menteeImage: "https://randomuser.me/api/portraits/men/32.jpg",
      topic: "React Development",
      startDate: "2023-06-10",
      endDate: "2023-09-15",
      duration: "3 months",
      status: 'completed',
      progress: 100,
      sessionsCompleted: 8,
      tasksCompleted: 6,
      coursesCompleted: 2,
      certificate: true,
      goalsSet: true,
      sessions: [
        { id: 1, title: "Introduction to React", date: "2023-06-15", status: "completed", mentorNotes: "Covered basic concepts, John seems to grasp them well", menteeNotes: "Learned about components and JSX" },
        { id: 2, title: "State Management", date: "2023-07-01", status: "completed", mentorNotes: "Discussed Redux and Context API", menteeNotes: "Context API seems simpler for smaller apps" },
        { id: 3, title: "Advanced Hooks", date: "2023-07-15", status: "completed", mentorNotes: "John is making good progress with custom hooks" },
        { id: 4, title: "Performance Optimization", date: "2023-08-01", status: "completed" },
        { id: 5, title: "Final Project Review", date: "2023-09-01", status: "completed" }
      ],
      tasks: [
        { id: 1, title: "Create a Component Library", dueDate: "2023-06-25", status: "completed", description: "Build 5 reusable components", feedback: "Excellent work, very clean code" },
        { id: 2, title: "Implement Context API", dueDate: "2023-07-10", status: "completed", description: "Create a theme switcher using Context API", feedback: "Good implementation" },
        { id: 3, title: "Build a Mini Project", dueDate: "2023-08-15", status: "completed", description: "Create a todo app with React", feedback: "Feature complete and works well" }
      ],
      courses: [
        { id: 1, title: "Advanced React Patterns", description: "Learn advanced patterns used in React applications", progress: 100 },
        { id: 2, title: "Testing React Applications", description: "Unit and integration testing for React apps", progress: 100 }
      ],
      mentorFeedback: "John has been an exceptional mentee. He consistently completed assignments on time and showed great aptitude for React development. His final project demonstrated a solid understanding of React concepts.",
      menteeFeedback: {
        rating: 5,
        comment: "The mentorship program was extremely valuable. My mentor provided clear guidance and constructive feedback that helped me grow as a developer."
      }
    },
    {
      id: 2,
      menteeName: "Emily Johnson",
      menteeTitle: "UX Designer",
      menteeImage: "https://randomuser.me/api/portraits/women/44.jpg",
      topic: "UI/UX Design",
      startDate: "2023-04-05",
      endDate: "2023-07-15",
      duration: "3.5 months",
      status: 'withdrawn',
      progress: 65,
      sessionsCompleted: 5,
      tasksCompleted: 3,
      coursesCompleted: 1,
      certificate: false,
      goalsSet: true,
      sessions: [
        { id: 1, title: "Design Principles", date: "2023-04-10", status: "completed", mentorNotes: "Covered fundamental design principles" },
        { id: 2, title: "User Research", date: "2023-04-25", status: "completed", mentorNotes: "Discussed various research methods" },
        { id: 3, title: "Wireframing", date: "2023-05-10", status: "completed" },
        { id: 4, title: "Prototyping", date: "2023-05-25", status: "completed" },
        { id: 5, title: "User Testing", date: "2023-06-10", status: "completed" },
        { id: 6, title: "Final Review", date: "2023-07-10", status: "cancelled" }
      ],
      tasks: [
        { id: 1, title: "Competitor Analysis", dueDate: "2023-04-20", status: "completed", description: "Analyze 3 competing products", feedback: "Good insights" },
        { id: 2, title: "Create User Personas", dueDate: "2023-05-05", status: "completed", description: "Develop 2-3 user personas", feedback: "Well thought out" },
        { id: 3, title: "Design System", dueDate: "2023-05-30", status: "completed", description: "Create a simple design system", feedback: "Needs more consistency" },
        { id: 4, title: "Final Project", dueDate: "2023-06-30", status: "pending", description: "Complete app redesign" }
      ],
      courses: [
        { id: 1, title: "Interaction Design", description: "Learn principles of good interaction design", progress: 100 },
        { id: 2, title: "Figma Masterclass", description: "Advanced Figma techniques", progress: 40 }
      ],
      mentorFeedback: "Emily showed promise but withdrew from the program due to personal reasons. She had made good progress up to that point.",
      menteeFeedback: {
        rating: 4,
        comment: "The mentorship was going well but I had to withdraw due to unexpected work commitments. The guidance I received was very helpful."
      }
    }
  ]);
  
  const [activeEngagement, setActiveEngagement] = useState<CompletedMentorship | null>(
    completedMentorships.length > 0 ? completedMentorships[0] : null
  );
  
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showSessionDetailsSheet, setShowSessionDetailsSheet] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  
  const handleDownloadAllMaterials = () => {
    toast({
      title: "Download Started",
      description: "All tasks, notes and materials are being prepared for download."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Mentorship History
          </CardTitle>
          <CardDescription>
            View your completed and withdrawn mentorships
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedMentorships.length === 0 ? (
            <div className="text-center py-12">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Completed Mentorships</h3>
              <p className="text-muted-foreground">You haven't completed any mentorships yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium mb-4">Completed Mentorships</h3>
                <div className="space-y-3">
                  {completedMentorships.map(mentorship => (
                    <Card 
                      key={mentorship.id} 
                      className={`overflow-hidden cursor-pointer hover:border-primary/50 transition-colors ${
                        activeEngagement?.id === mentorship.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setActiveEngagement(mentorship)}
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
                              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span>{mentorship.startDate} - {mentorship.endDate}</span>
                            </div>
                            <div className="flex items-center text-xs">
                              <Badge variant={mentorship.status === 'completed' ? 'default' : 'outline'} className="text-xs">
                                {mentorship.status === 'completed' ? 'Completed' : 'Withdrawn'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {activeEngagement && (
                  <div className="mt-6 space-y-2">                      
                    <Button variant="outline" className="w-full gap-2" size="sm" onClick={handleDownloadAllMaterials}>
                      <Download className="h-4 w-4" />
                      Download All Materials
                    </Button>
                    
                    {activeEngagement.certificate && (
                      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full gap-2" size="sm">
                            <Award className="h-4 w-4" />
                            View Certificate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Certificate of Completion</DialogTitle>
                          </DialogHeader>
                          <div className="py-6">
                            {activeEngagement.status === 'completed' ? (
                              <div className="border p-8 rounded-md text-center space-y-4">
                                <Award className="h-12 w-12 mx-auto text-primary" />
                                <h3 className="text-xl font-bold">Certificate of Achievement</h3>
                                <p className="text-muted-foreground">This certifies that</p>
                                <p className="text-xl">{activeEngagement.menteeName}</p>
                                <p className="text-muted-foreground">has successfully completed</p>
                                <p className="text-lg font-medium">{activeEngagement.topic} Mentorship</p>
                                <p className="text-muted-foreground">under the guidance of</p>
                                <p className="text-lg">[Mentor Name]</p>
                                <p className="text-sm text-muted-foreground mt-4">
                                  {activeEngagement.startDate} - {activeEngagement.endDate}
                                </p>
                              </div>
                            ) : (
                              <div className="text-center py-6">
                                <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">Certificate Not Available</h3>
                                <p className="text-muted-foreground mb-4">
                                  This mentorship was withdrawn before completion, so no certificate is available.
                                </p>
                              </div>
                            )}
                            
                            {activeEngagement.status === 'completed' && (
                              <div className="flex justify-center mt-4">
                                <Button className="gap-2">
                                  <Download className="h-4 w-4" />
                                  Download Certificate
                                </Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                {activeEngagement && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Mentorship with {activeEngagement.menteeName}</h3>
                      <Badge variant={activeEngagement.status === 'completed' ? 'default' : 'outline'}>
                        {activeEngagement.status === 'completed' ? 'Completed' : 'Withdrawn'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          <Calendar className="inline-block h-3.5 w-3.5 mr-1" />
                          {activeEngagement.startDate} - {activeEngagement.endDate} ({activeEngagement.duration})
                        </p>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {activeEngagement.sessionsCompleted} sessions
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                          {activeEngagement.tasksCompleted} tasks
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                          {activeEngagement.coursesCompleted} courses
                        </span>
                      </div>
                    </div>
                    
                    {activeEngagement.menteeFeedback && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-2">Mentee Feedback</h4>
                        <div className="bg-muted/30 p-3 rounded-md">
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < activeEngagement.menteeFeedback!.rating 
                                    ? 'text-amber-500 fill-amber-500' 
                                    : 'text-muted'
                                }`} 
                              />
                            ))}
                            <span className="ml-2 text-sm font-medium">
                              {activeEngagement.menteeFeedback.rating}/5
                            </span>
                          </div>
                          <p className="text-sm">{activeEngagement.menteeFeedback.comment}</p>
                        </div>
                      </div>
                    )}
                    
                    {activeEngagement.mentorFeedback && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-2">Your Feedback</h4>
                        <div className="bg-primary/5 p-3 rounded-md">
                          <p className="text-sm">{activeEngagement.mentorFeedback}</p>
                        </div>
                      </div>
                    )}
                    
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
                                    variant={
                                      session.status === 'completed' 
                                        ? 'default' 
                                        : session.status === 'cancelled' 
                                          ? 'outline'
                                          : 'secondary'
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
                                
                                <Sheet 
                                  open={showSessionDetailsSheet && selectedSession?.id === session.id} 
                                  onOpenChange={(open) => {
                                    setShowSessionDetailsSheet(open);
                                    if (open) setSelectedSession(session);
                                  }}
                                >
                                  <SheetTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      View Session Details
                                    </Button>
                                  </SheetTrigger>
                                  <SheetContent className="sm:max-w-md">
                                    <SheetHeader>
                                      <SheetTitle>{session.title}</SheetTitle>
                                      <SheetDescription>
                                        {new Date(session.date).toLocaleDateString('en-US', {
                                          weekday: 'long',
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric'
                                        })}
                                      </SheetDescription>
                                    </SheetHeader>
                                    <div className="py-6 space-y-6">
                                      {session.mentorNotes && (
                                        <div>
                                          <h4 className="text-sm font-medium mb-2">Your Notes</h4>
                                          <div className="bg-primary/5 p-3 rounded-md">
                                            <p className="text-sm">{session.mentorNotes}</p>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {session.menteeNotes && (
                                        <div>
                                          <h4 className="text-sm font-medium mb-2">Mentee's Notes</h4>
                                          <div className="bg-muted/30 p-3 rounded-md">
                                            <p className="text-sm">{session.menteeNotes}</p>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {!session.mentorNotes && !session.menteeNotes && (
                                        <div className="text-center py-6">
                                          <p className="text-muted-foreground">No notes available for this session.</p>
                                        </div>
                                      )}
                                    </div>
                                  </SheetContent>
                                </Sheet>
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
                                
                                <div className="bg-muted/30 p-3 rounded-md mb-3">
                                  <p className="text-sm">{task.description}</p>
                                </div>
                                
                                {task.feedback && task.status === 'completed' && (
                                  <div className="bg-primary/5 p-3 rounded-md mb-3">
                                    <h5 className="text-sm font-medium mb-1">Your Feedback</h5>
                                    <p className="text-sm">{task.feedback}</p>
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
                                <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">{course.progress}% completed</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
                      <DialogTrigger asChild>
                        <Button variant="link" size="sm" className="mt-4 p-0">
                          View Complete Feedback Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Mentorship Feedback</DialogTitle>
                          <DialogDescription>
                            Feedback exchanged between you and {activeEngagement.menteeName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-6">
                          {activeEngagement.menteeFeedback && (
                            <div>
                              <h4 className="font-medium mb-2">Mentee's Feedback</h4>
                              <div className="bg-muted/30 p-4 rounded-md">
                                <div className="flex items-center mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < activeEngagement.menteeFeedback!.rating 
                                          ? 'text-amber-500 fill-amber-500' 
                                          : 'text-muted'
                                      }`} 
                                    />
                                  ))}
                                  <span className="ml-2 text-sm font-medium">
                                    {activeEngagement.menteeFeedback.rating}/5
                                  </span>
                                </div>
                                <p>{activeEngagement.menteeFeedback.comment}</p>
                              </div>
                            </div>
                          )}
                          
                          {activeEngagement.mentorFeedback && (
                            <div>
                              <h4 className="font-medium mb-2">Your Feedback</h4>
                              <div className="bg-primary/5 p-4 rounded-md">
                                <p>{activeEngagement.mentorFeedback}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
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

export default MentorshipHistory;
