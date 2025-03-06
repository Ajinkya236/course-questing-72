
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, CheckCircle, Clock, FileText, Paperclip, Plus, Video } from 'lucide-react';
import { toast } from 'sonner';
import { coursesList } from '@/data/mockData';

// Type definitions
type Session = {
  id: number;
  title: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  tasks?: Task[];
};

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: Date;
  attachments?: Attachment[];
};

type Attachment = {
  id: number;
  name: string;
  type: 'document' | 'file' | 'video';
  url: string;
};

type Course = {
  id: number;
  title: string;
  description: string;
  progress: number;
};

type Mentorship = {
  id: number;
  menteeName: string;
  menteeTitle: string;
  menteeImage: string;
  topic: string;
  startDate: string;
  progress: number;
  sessions: Session[];
  courses: Course[];
  status: 'active' | 'completed' | 'withdrawn';
};

const ActiveMentorships = () => {
  const [mentorships, setMentorships] = useState<Mentorship[]>([
    {
      id: 1,
      menteeName: "Alex Johnson",
      menteeTitle: "Junior Software Developer",
      menteeImage: "https://randomuser.me/api/portraits/men/32.jpg",
      topic: "Software Development Career Path",
      startDate: "April 10, 2023",
      progress: 65,
      status: 'active',
      sessions: [
        {
          id: 1,
          title: "Introduction and Goal Setting",
          date: new Date(2023, 3, 15),
          status: 'completed',
          notes: "Alex has a strong foundation in frontend development but wants to expand into backend technologies. We've set quarterly goals focused on NodeJS and database skills.",
          tasks: [
            {
              id: 1,
              title: "Complete personal development plan",
              description: "Fill out the development plan template with short and long-term goals.",
              status: 'completed',
              dueDate: new Date(2023, 3, 22),
              attachments: [
                {
                  id: 1,
                  name: "Development Plan Template",
                  type: "document",
                  url: "#"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          title: "Technical Skills Assessment",
          date: new Date(2023, 4, 2),
          status: 'completed',
          notes: "Reviewed Alex's coding projects. Strong in React, needs work on REST API design principles.",
          tasks: [
            {
              id: 2,
              title: "Create a simple REST API",
              description: "Build a simple CRUD API using Express and MongoDB",
              status: 'completed',
              dueDate: new Date(2023, 4, 16),
            }
          ]
        },
        {
          id: 3,
          title: "Progress Review",
          date: new Date(2023, 4, 30),
          status: 'scheduled',
        }
      ],
      courses: [
        {
          id: 101,
          title: "Advanced Node.js Development",
          description: "Master server-side JavaScript with Node.js, Express, and MongoDB",
          progress: 45
        },
        {
          id: 102,
          title: "Database Design Fundamentals",
          description: "Learn relational database concepts and SQL for application development",
          progress: 70
        }
      ]
    },
    {
      id: 2,
      menteeName: "Sarah Miller",
      menteeTitle: "UX Designer",
      menteeImage: "https://randomuser.me/api/portraits/women/44.jpg",
      topic: "Leadership in Design Teams",
      startDate: "May 5, 2023",
      progress: 30,
      status: 'active',
      sessions: [
        {
          id: 1,
          title: "Mentorship Kickoff",
          date: new Date(2023, 4, 10),
          status: 'completed',
          notes: "Sarah is looking to transition into a lead design role. We discussed leadership styles and common challenges in design team management."
        },
        {
          id: 2,
          title: "Team Communication Strategies",
          date: new Date(2023, 5, 1),
          status: 'scheduled'
        }
      ],
      courses: [
        {
          id: 201,
          title: "Design Leadership Essentials",
          description: "Learn key strategies for leading creative teams effectively",
          progress: 25
        }
      ]
    }
  ]);

  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState<Mentorship | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [newSessionDate, setNewSessionDate] = useState<Date | undefined>(new Date());
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | undefined>(new Date());
  const [newSessionNotes, setNewSessionNotes] = useState('');
  const [assignableCourses, setAssignableCourses] = useState(
    coursesList.slice(0, 8).map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      progress: 0
    }))
  );
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const handleAddSession = () => {
    if (!selectedMentorship || !newSessionTitle || !newSessionDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newSession: Session = {
      id: Math.max(0, ...selectedMentorship.sessions.map(s => s.id)) + 1,
      title: newSessionTitle,
      date: newSessionDate,
      status: 'scheduled'
    };

    setMentorships(mentorships.map(mentorship => 
      mentorship.id === selectedMentorship.id 
        ? { ...mentorship, sessions: [...mentorship.sessions, newSession] }
        : mentorship
    ));

    toast.success("Session scheduled successfully");
    setShowSessionDialog(false);
    setNewSessionTitle('');
    setNewSessionDate(new Date());
  };

  const handleAddTask = () => {
    if (!selectedMentorship || !selectedSession || !newTaskTitle || !newTaskDescription || !newTaskDueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTask: Task = {
      id: Math.max(0, ...(selectedSession.tasks?.map(t => t.id) || [0])) + 1,
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'pending',
      dueDate: newTaskDueDate,
    };

    setMentorships(mentorships.map(mentorship => 
      mentorship.id === selectedMentorship.id 
        ? { 
            ...mentorship, 
            sessions: mentorship.sessions.map(session => 
              session.id === selectedSession.id 
                ? { 
                    ...session, 
                    tasks: session.tasks ? [...session.tasks, newTask] : [newTask] 
                  }
                : session
            ) 
          }
        : mentorship
    ));

    toast.success("Task assigned successfully");
    setShowTaskDialog(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate(new Date());
  };

  const handleAddCourse = () => {
    if (!selectedMentorship || !selectedCourse) {
      toast.error("Please select a course");
      return;
    }

    const courseToAdd = assignableCourses.find(course => course.id.toString() === selectedCourse);
    
    if (!courseToAdd) {
      toast.error("Invalid course selection");
      return;
    }

    // Check if course is already assigned
    if (selectedMentorship.courses.some(course => course.id.toString() === selectedCourse)) {
      toast.error("This course is already assigned to the mentee");
      return;
    }

    setMentorships(mentorships.map(mentorship => 
      mentorship.id === selectedMentorship.id 
        ? { 
            ...mentorship, 
            courses: [...mentorship.courses, courseToAdd]
          }
        : mentorship
    ));

    toast.success("Course assigned successfully");
    setShowCourseDialog(false);
    setSelectedCourse('');
  };

  const handleSaveNotes = () => {
    if (!selectedMentorship || !selectedSession) {
      return;
    }

    setMentorships(mentorships.map(mentorship => 
      mentorship.id === selectedMentorship.id 
        ? { 
            ...mentorship, 
            sessions: mentorship.sessions.map(session => 
              session.id === selectedSession.id 
                ? { ...session, notes: newSessionNotes }
                : session
            ) 
          }
        : mentorship
    ));

    toast.success("Session notes saved");
  };

  const handleMarkTaskCompleted = (mentorshipId: number, sessionId: number, taskId: number) => {
    setMentorships(mentorships.map(mentorship => 
      mentorship.id === mentorshipId 
        ? { 
            ...mentorship, 
            sessions: mentorship.sessions.map(session => 
              session.id === sessionId 
                ? { 
                    ...session, 
                    tasks: session.tasks?.map(task => 
                      task.id === taskId 
                        ? { ...task, status: 'completed' as const }
                        : task
                    ) 
                  }
                : session
            ) 
          }
        : mentorship
    ));

    toast.success("Task marked as completed");
  };

  const handleMarkSessionCompleted = (mentorshipId: number, sessionId: number) => {
    setMentorships(mentorships.map(mentorship => 
      mentorship.id === mentorshipId 
        ? { 
            ...mentorship, 
            sessions: mentorship.sessions.map(session => 
              session.id === sessionId 
                ? { ...session, status: 'completed' as const }
                : session
            ) 
          }
        : mentorship
    ));

    toast.success("Session marked as completed");
  };

  const handleEndMentorship = (mentorshipId: number) => {
    setMentorships(mentorships.map(mentorship => 
      mentorship.id === mentorshipId 
        ? { ...mentorship, status: 'completed' as const }
        : mentorship
    ));

    toast.success("Mentorship marked as completed");
  };

  // Filter active mentorships
  const activeMentorships = mentorships.filter(m => m.status === 'active');
  const completedMentorships = mentorships.filter(m => m.status === 'completed');

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active">Active Mentorships</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="space-y-4 mt-4">
        {activeMentorships.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              You don't have any active mentorships.
            </CardContent>
          </Card>
        ) : (
          activeMentorships.map(mentorship => (
            <Card key={mentorship.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentorship.menteeImage} alt={mentorship.menteeName} />
                      <AvatarFallback>{mentorship.menteeName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{mentorship.menteeName}</CardTitle>
                      <CardDescription>{mentorship.menteeTitle}</CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{mentorship.topic}</Badge>
                        <span className="text-xs text-muted-foreground">Started: {mentorship.startDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 flex items-center justify-end gap-2">
                      <span className="text-sm font-medium">{mentorship.progress}% Complete</span>
                    </div>
                    <Progress value={mentorship.progress} className="h-2 w-[180px]" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <Tabs defaultValue="sessions">
                  <TabsList className="mb-4">
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                    <TabsTrigger value="courses">Assigned Courses</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sessions" className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-semibold">Scheduled Sessions</h4>
                      <Dialog open={showSessionDialog && selectedMentorship?.id === mentorship.id} 
                              onOpenChange={(open) => {
                                setShowSessionDialog(open);
                                if (open) setSelectedMentorship(mentorship);
                              }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Plus className="h-3.5 w-3.5" />
                            Schedule Session
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule a New Session</DialogTitle>
                            <DialogDescription>
                              Schedule a mentoring session with {mentorship.menteeName}.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="session-title">Session Title</Label>
                              <Input
                                id="session-title"
                                placeholder="e.g., Career Planning Discussion"
                                value={newSessionTitle}
                                onChange={(e) => setNewSessionTitle(e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Session Date</Label>
                              <Calendar
                                mode="single"
                                selected={newSessionDate}
                                onSelect={setNewSessionDate}
                                className="border rounded-md p-3"
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
                      {mentorship.sessions.map(session => (
                        <Card key={session.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{session.title}</h3>
                                  <Badge variant={
                                    session.status === 'completed' ? 'success' : 
                                    session.status === 'cancelled' ? 'destructive' : 'outline'
                                  }>
                                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                  <CalendarDays className="h-3.5 w-3.5" />
                                  <span>
                                    {session.date.toLocaleDateString('en-US', { 
                                      weekday: 'short', 
                                      month: 'short', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    })}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                {session.status === 'scheduled' && (
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleMarkSessionCompleted(mentorship.id, session.id)}
                                  >
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    Mark Completed
                                  </Button>
                                )}

                                <Dialog 
                                  onOpenChange={(open) => {
                                    if (open) {
                                      setSelectedMentorship(mentorship);
                                      setSelectedSession(session);
                                      setNewSessionNotes(session.notes || '');
                                    }
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <FileText className="h-3.5 w-3.5 mr-1" />
                                      Notes
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Session Notes</DialogTitle>
                                      <DialogDescription>
                                        Add or update notes for this session with {mentorship.menteeName}.
                                      </DialogDescription>
                                    </DialogHeader>
                                    
                                    <div className="mt-4 space-y-4">
                                      <Textarea 
                                        placeholder="Enter session notes here..."
                                        className="min-h-[150px]"
                                        value={newSessionNotes}
                                        onChange={(e) => setNewSessionNotes(e.target.value)}
                                      />
                                    </div>
                                    
                                    <DialogFooter className="mt-4">
                                      <Button variant="outline" onClick={() => setShowSessionDialog(false)}>Cancel</Button>
                                      <Button onClick={handleSaveNotes}>Save Notes</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                
                                <Dialog 
                                  open={showTaskDialog && selectedSession?.id === session.id} 
                                  onOpenChange={(open) => {
                                    setShowTaskDialog(open);
                                    if (open) {
                                      setSelectedMentorship(mentorship);
                                      setSelectedSession(session);
                                    }
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Paperclip className="h-3.5 w-3.5 mr-1" />
                                      Tasks
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Session Tasks</DialogTitle>
                                      <DialogDescription>
                                        Manage tasks for this session with {mentorship.menteeName}.
                                      </DialogDescription>
                                    </DialogHeader>
                                    
                                    {session.tasks && session.tasks.length > 0 && (
                                      <div className="mt-4 space-y-3">
                                        <h4 className="text-sm font-medium">Existing Tasks</h4>
                                        {session.tasks.map(task => (
                                          <div key={task.id} className="p-3 border rounded-md">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <div className="flex items-center gap-2">
                                                  <h3 className="font-medium">{task.title}</h3>
                                                  <Badge variant={task.status === 'completed' ? 'success' : 'outline'}>
                                                    {task.status}
                                                  </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                                                  <Clock className="h-3 w-3" />
                                                  <span>Due: {task.dueDate.toLocaleDateString()}</span>
                                                </div>
                                              </div>
                                              
                                              {task.status === 'pending' && (
                                                <Button 
                                                  size="sm" 
                                                  variant="outline"
                                                  onClick={() => handleMarkTaskCompleted(mentorship.id, session.id, task.id)}
                                                >
                                                  Complete
                                                </Button>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    
                                    <Separator className="my-4" />
                                    
                                    <div className="space-y-3">
                                      <h4 className="text-sm font-medium">Assign New Task</h4>
                                      <div className="space-y-2">
                                        <Label htmlFor="task-title">Task Title</Label>
                                        <Input
                                          id="task-title"
                                          placeholder="e.g., Research on leadership styles"
                                          value={newTaskTitle}
                                          onChange={(e) => setNewTaskTitle(e.target.value)}
                                        />
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <Label htmlFor="task-description">Description</Label>
                                        <Textarea
                                          id="task-description"
                                          placeholder="Task description..."
                                          value={newTaskDescription}
                                          onChange={(e) => setNewTaskDescription(e.target.value)}
                                        />
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <Label>Due Date</Label>
                                        <Calendar
                                          mode="single"
                                          selected={newTaskDueDate}
                                          onSelect={setNewTaskDueDate}
                                          className="border rounded-md p-3"
                                        />
                                      </div>
                                    </div>
                                    
                                    <DialogFooter className="mt-4">
                                      <Button variant="outline" onClick={() => setShowTaskDialog(false)}>Cancel</Button>
                                      <Button onClick={handleAddTask}>Assign Task</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="courses">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-semibold">Assigned Courses</h4>
                      <Dialog 
                        open={showCourseDialog && selectedMentorship?.id === mentorship.id} 
                        onOpenChange={(open) => {
                          setShowCourseDialog(open);
                          if (open) setSelectedMentorship(mentorship);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Plus className="h-3.5 w-3.5" />
                            Assign Course
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign a Course</DialogTitle>
                            <DialogDescription>
                              Select a course to assign to {mentorship.menteeName}.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="mt-4 space-y-4">
                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                              </SelectTrigger>
                              <SelectContent>
                                {assignableCourses.map(course => (
                                  <SelectItem key={course.id} value={course.id.toString()}>
                                    {course.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <DialogFooter className="mt-4">
                            <Button variant="outline" onClick={() => setShowCourseDialog(false)}>Cancel</Button>
                            <Button onClick={handleAddCourse}>Assign Course</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {mentorship.courses.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No courses assigned yet.
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {mentorship.courses.map(course => (
                          <Card key={course.id}>
                            <CardContent className="p-4">
                              <div>
                                <h3 className="font-medium">{course.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                                <div className="mt-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-muted-foreground">Progress</span>
                                    <span className="text-xs font-medium">{course.progress}%</span>
                                  </div>
                                  <Progress value={course.progress} className="h-2" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 text-right">
                  <Button variant="outline" size="sm" onClick={() => handleEndMentorship(mentorship.id)}>
                    End Mentorship
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="space-y-4 mt-4">
        {completedMentorships.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              You don't have any completed mentorships.
            </CardContent>
          </Card>
        ) : (
          completedMentorships.map(mentorship => (
            <Card key={mentorship.id}>
              <CardHeader className="bg-muted/30">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentorship.menteeImage} alt={mentorship.menteeName} />
                      <AvatarFallback>{mentorship.menteeName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{mentorship.menteeName}</CardTitle>
                      <CardDescription>{mentorship.menteeTitle}</CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{mentorship.topic}</Badge>
                        <span className="text-xs text-muted-foreground">Started: {mentorship.startDate}</span>
                      </div>
                    </div>
                  </div>
                  <Badge>Completed</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Sessions</h4>
                    <p className="text-sm text-muted-foreground">
                      Completed {mentorship.sessions.filter(s => s.status === 'completed').length} sessions
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Courses</h4>
                    <p className="text-sm text-muted-foreground">
                      Assigned {mentorship.courses.length} courses
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm">View Feedback</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ActiveMentorships;
