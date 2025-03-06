
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Plus, 
  Upload, 
  BookOpen,
  Target, 
  Video
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for active mentorships
const mentorshipsData = [
  {
    id: 1,
    menteeName: "Alex Johnson",
    menteeTitle: "Junior Software Developer",
    topic: "Career Development",
    startDate: "2023-10-20",
    progress: 45,
    imageUrl: "https://randomuser.me/api/portraits/men/34.jpg",
    sessions: [
      {
        id: 101,
        title: "Initial Assessment & Goal Setting",
        date: "2023-10-25",
        status: "completed",
        notes: "Discussed career aspirations and set initial SMART goals. Alex wants to focus on developing leadership skills and improving system design capabilities.",
        tasks: [
          { id: 1001, title: "Complete self-assessment worksheet", status: "completed" },
          { id: 1002, title: "Research two leadership books to read", status: "completed" }
        ]
      },
      {
        id: 102,
        title: "Technical Skills Assessment",
        date: "2023-11-08",
        status: "completed",
        notes: "Reviewed technical skills and identified areas for growth. Will focus on system design and architecture principles.",
        tasks: [
          { id: 1003, title: "Complete coding challenge", status: "completed" },
          { id: 1004, title: "Start system design primer", status: "in-progress" }
        ]
      },
      {
        id: 103,
        title: "Leadership Fundamentals",
        date: "2023-11-22",
        status: "scheduled",
        tasks: []
      }
    ],
    courses: [
      { id: 201, title: "Fundamentals of Software Architecture", progress: 65 },
      { id: 202, title: "Leadership for Technical Professionals", progress: 30 }
    ]
  },
  {
    id: 2,
    menteeName: "Sarah Williams",
    menteeTitle: "Product Manager",
    topic: "Leadership Development",
    startDate: "2023-10-17",
    progress: 30,
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    sessions: [
      {
        id: 201,
        title: "Leadership Style Assessment",
        date: "2023-10-23",
        status: "completed",
        notes: "Discussed different leadership styles and identified Sarah's natural tendencies. She leans toward democratic leadership but wants to develop situational leadership skills.",
        tasks: [
          { id: 2001, title: "Complete leadership style assessment", status: "completed" },
          { id: 2002, title: "Read 'Situational Leadership' article", status: "completed" }
        ]
      },
      {
        id: 202,
        title: "Conflict Resolution Strategies",
        date: "2023-11-06",
        status: "scheduled",
        tasks: []
      }
    ],
    courses: [
      { id: 301, title: "Effective Team Leadership", progress: 45 },
      { id: 302, title: "Conflict Resolution in the Workplace", progress: 15 }
    ]
  }
];

const ActiveMentorships = () => {
  const { toast } = useToast();
  const [mentorships, setMentorships] = useState(mentorshipsData);
  const [selectedMentorship, setSelectedMentorship] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: ''
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: ''
  });

  const handleScheduleSession = () => {
    if (selectedMentorship && newSession.title && newSession.date) {
      const sessionId = Math.floor(Math.random() * 1000);
      const updatedMentorships = mentorships.map(mentorship => {
        if (mentorship.id === selectedMentorship.id) {
          return {
            ...mentorship,
            sessions: [
              ...mentorship.sessions,
              {
                id: sessionId,
                title: newSession.title,
                date: `${newSession.date}T${newSession.time || '10:00'}`,
                status: 'scheduled',
                tasks: []
              }
            ]
          };
        }
        return mentorship;
      });
      
      setMentorships(updatedMentorships);
      setShowSessionDialog(false);
      setNewSession({ title: '', date: '', time: '' });
      toast({
        title: "Session Scheduled",
        description: `You've scheduled a new session with ${selectedMentorship.menteeName}.`
      });
    }
  };

  const handleAddTask = () => {
    if (selectedSession && newTask.title) {
      const taskId = Math.floor(Math.random() * 10000);
      const updatedMentorships = mentorships.map(mentorship => {
        if (mentorship.id === selectedMentorship.id) {
          return {
            ...mentorship,
            sessions: mentorship.sessions.map(session => {
              if (session.id === selectedSession.id) {
                return {
                  ...session,
                  tasks: [
                    ...(session.tasks || []),
                    {
                      id: taskId,
                      title: newTask.title,
                      description: newTask.description,
                      dueDate: newTask.dueDate,
                      status: 'assigned'
                    }
                  ]
                };
              }
              return session;
            })
          };
        }
        return mentorship;
      });
      
      setMentorships(updatedMentorships);
      setShowTaskDialog(false);
      setNewTask({ title: '', description: '', dueDate: '' });
      toast({
        title: "Task Assigned",
        description: `You've assigned a new task to ${selectedMentorship.menteeName}.`
      });
    }
  };

  const handleSaveNotes = () => {
    if (selectedSession && sessionNotes) {
      const updatedMentorships = mentorships.map(mentorship => {
        if (mentorship.id === selectedMentorship.id) {
          return {
            ...mentorship,
            sessions: mentorship.sessions.map(session => {
              if (session.id === selectedSession.id) {
                return {
                  ...session,
                  notes: sessionNotes
                };
              }
              return session;
            })
          };
        }
        return mentorship;
      });
      
      setMentorships(updatedMentorships);
      setShowNotesDialog(false);
      toast({
        title: "Notes Saved",
        description: "Your session notes have been saved successfully."
      });
    }
  };

  const handleAssignCourse = () => {
    if (selectedMentorship && newCourse.title) {
      const courseId = Math.floor(Math.random() * 1000);
      const updatedMentorships = mentorships.map(mentorship => {
        if (mentorship.id === selectedMentorship.id) {
          return {
            ...mentorship,
            courses: [
              ...(mentorship.courses || []),
              {
                id: courseId,
                title: newCourse.title,
                description: newCourse.description,
                progress: 0
              }
            ]
          };
        }
        return mentorship;
      });
      
      setMentorships(updatedMentorships);
      setShowCourseDialog(false);
      setNewCourse({ title: '', description: '' });
      toast({
        title: "Course Assigned",
        description: `You've assigned a new course to ${selectedMentorship.menteeName}.`
      });
    }
  };

  const getSessionStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Completed</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="gap-1"><Calendar className="h-3 w-3" /> Scheduled</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> In Progress</Badge>;
      default:
        return null;
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Completed</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> In Progress</Badge>;
      case 'assigned':
        return <Badge variant="outline" className="gap-1"><FileText className="h-3 w-3" /> Assigned</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Active Mentorships
          </CardTitle>
          <CardDescription>
            Manage your ongoing mentoring relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mentorships.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60 bg-muted/20 rounded-lg">
              <Users className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">You don't have any active mentorships</p>
            </div>
          ) : (
            <div className="space-y-6">
              {mentorships.map(mentorship => (
                <Card key={mentorship.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 md:p-6 md:border-r md:w-1/3">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden">
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
                          <span className="text-muted-foreground">Started:</span>
                          <span>{new Date(mentorship.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Sessions:</span>
                          <span>{mentorship.sessions.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Courses:</span>
                          <span>{mentorship.courses?.length || 0}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-1">Overall Progress</h4>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${mentorship.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-end mt-1">
                          <span className="text-xs text-muted-foreground">{mentorship.progress}%</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          variant="default" 
                          className="w-full"
                          onClick={() => setSelectedMentorship(mentorship)}
                        >
                          Manage Relationship
                        </Button>
                      </div>
                    </div>
                    
                    {selectedMentorship?.id === mentorship.id && (
                      <div className="md:w-2/3 border-t md:border-t-0 p-4 md:p-6">
                        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="w-full grid grid-cols-3 mb-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="sessions">Sessions</TabsTrigger>
                            <TabsTrigger value="courses">Courses</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview">
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-sm font-medium mb-2">Next Session</h3>
                                {mentorship.sessions.find(s => s.status === 'scheduled') ? (
                                  <div className="bg-muted/30 p-3 rounded-lg">
                                    <div className="flex justify-between">
                                      <h4 className="font-medium">
                                        {mentorship.sessions.find(s => s.status === 'scheduled')?.title}
                                      </h4>
                                      <Badge variant="outline" className="gap-1">
                                        <Calendar className="h-3 w-3" /> 
                                        {new Date(mentorship.sessions.find(s => s.status === 'scheduled')?.date || '').toLocaleDateString()}
                                      </Badge>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-muted/30 p-3 rounded-lg text-muted-foreground">
                                    No upcoming sessions scheduled
                                  </div>
                                )}
                              </div>
                              
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <h3 className="text-sm font-medium">Active Tasks</h3>
                                </div>
                                <div className="space-y-2">
                                  {mentorship.sessions.flatMap(s => s.tasks || [])
                                    .filter(t => t.status !== 'completed')
                                    .slice(0, 3)
                                    .map(task => (
                                      <div key={task.id} className="bg-muted/30 p-3 rounded-lg">
                                        <div className="flex justify-between items-start">
                                          <div className="flex-1">
                                            <div className="font-medium">{task.title}</div>
                                          </div>
                                          <div>
                                            {getTaskStatusBadge(task.status)}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  
                                  {mentorship.sessions.flatMap(s => s.tasks || [])
                                    .filter(t => t.status !== 'completed').length === 0 && (
                                    <div className="bg-muted/30 p-3 rounded-lg text-muted-foreground">
                                      No active tasks
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-sm font-medium mb-2">Course Progress</h3>
                                <div className="space-y-3">
                                  {mentorship.courses && mentorship.courses.length > 0 ? (
                                    mentorship.courses.map(course => (
                                      <div key={course.id} className="bg-muted/30 p-3 rounded-lg">
                                        <div className="font-medium mb-1">{course.title}</div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                          <div 
                                            className="bg-primary h-2 rounded-full" 
                                            style={{ width: `${course.progress}%` }}
                                          ></div>
                                        </div>
                                        <div className="flex justify-end mt-1">
                                          <span className="text-xs text-muted-foreground">{course.progress}% completed</span>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="bg-muted/30 p-3 rounded-lg text-muted-foreground">
                                      No courses assigned
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="sessions">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium">All Sessions</h3>
                                <Dialog open={showSessionDialog} onOpenChange={setShowSessionDialog}>
                                  <DialogTrigger asChild>
                                    <Button size="sm" className="gap-1">
                                      <Plus className="h-4 w-4" />
                                      Schedule Session
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Schedule New Session</DialogTitle>
                                      <DialogDescription>
                                        Schedule a new mentoring session with {selectedMentorship.menteeName}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                      <div>
                                        <label className="text-sm font-medium block mb-1">Session Title</label>
                                        <Input 
                                          placeholder="e.g. Career Development Strategy" 
                                          value={newSession.title}
                                          onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-3">
                                        <div>
                                          <label className="text-sm font-medium block mb-1">Date</label>
                                          <Input 
                                            type="date" 
                                            value={newSession.date}
                                            onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                                          />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium block mb-1">Time</label>
                                          <Input 
                                            type="time" 
                                            value={newSession.time}
                                            onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setShowSessionDialog(false)}>Cancel</Button>
                                      <Button onClick={handleScheduleSession}>Schedule Session</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              
                              <div className="space-y-3">
                                {mentorship.sessions.map(session => (
                                  <Card key={session.id} className="overflow-hidden">
                                    <div className="p-4">
                                      <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-medium">{session.title}</h4>
                                        <div>{getSessionStatusBadge(session.status)}</div>
                                      </div>
                                      
                                      <div className="mb-3">
                                        <div className="text-sm flex items-center gap-1 text-muted-foreground mb-1">
                                          <Calendar className="h-3.5 w-3.5" />
                                          {new Date(session.date).toLocaleDateString()} 
                                          {session.date.includes('T') && 
                                            new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                        
                                        {session.notes && (
                                          <div className="text-sm bg-muted/30 p-2 rounded-md mt-2">
                                            <h5 className="font-medium text-xs mb-1">Session Notes:</h5>
                                            <p className="text-muted-foreground">{session.notes}</p>
                                          </div>
                                        )}
                                      </div>
                                      
                                      {session.tasks && session.tasks.length > 0 && (
                                        <div className="mb-3">
                                          <h5 className="text-xs font-medium mb-2">Tasks:</h5>
                                          <div className="space-y-1">
                                            {session.tasks.map(task => (
                                              <div key={task.id} className="flex justify-between items-center bg-muted/20 p-2 rounded-md">
                                                <span className="text-sm">{task.title}</span>
                                                {getTaskStatusBadge(task.status)}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      
                                      <div className="flex justify-end gap-2 mt-3">
                                        <Dialog open={showNotesDialog && selectedSession?.id === session.id} onOpenChange={(open) => {
                                          setShowNotesDialog(open);
                                          if (open) {
                                            setSelectedSession(session);
                                            setSessionNotes(session.notes || '');
                                          }
                                        }}>
                                          <DialogTrigger asChild>
                                            <Button 
                                              variant="outline" 
                                              size="sm" 
                                              className="gap-1"
                                            >
                                              <FileText className="h-4 w-4" />
                                              {session.notes ? "Edit Notes" : "Add Notes"}
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Session Notes</DialogTitle>
                                              <DialogDescription>
                                                Add or edit notes for this session
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="py-4">
                                              <Textarea 
                                                placeholder="Enter your session notes here..." 
                                                className="min-h-[200px]"
                                                value={sessionNotes}
                                                onChange={(e) => setSessionNotes(e.target.value)}
                                              />
                                            </div>
                                            <DialogFooter>
                                              <Button variant="outline" onClick={() => setShowNotesDialog(false)}>Cancel</Button>
                                              <Button onClick={handleSaveNotes}>Save Notes</Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                        
                                        <Dialog open={showTaskDialog && selectedSession?.id === session.id} onOpenChange={(open) => {
                                          setShowTaskDialog(open);
                                          if (open) setSelectedSession(session);
                                        }}>
                                          <DialogTrigger asChild>
                                            <Button 
                                              variant="outline" 
                                              size="sm" 
                                              className="gap-1"
                                            >
                                              <Plus className="h-4 w-4" />
                                              Add Task
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Assign New Task</DialogTitle>
                                              <DialogDescription>
                                                Create a new task for {selectedMentorship.menteeName} related to this session
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="py-4 space-y-4">
                                              <div>
                                                <label className="text-sm font-medium block mb-1">Task Title</label>
                                                <Input 
                                                  placeholder="e.g. Read leadership article" 
                                                  value={newTask.title}
                                                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                                />
                                              </div>
                                              <div>
                                                <label className="text-sm font-medium block mb-1">Description</label>
                                                <Textarea 
                                                  placeholder="Provide details about this task..." 
                                                  value={newTask.description}
                                                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                                />
                                              </div>
                                              <div>
                                                <label className="text-sm font-medium block mb-1">Due Date (Optional)</label>
                                                <Input 
                                                  type="date" 
                                                  value={newTask.dueDate}
                                                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                                                />
                                              </div>
                                              <div className="flex gap-2">
                                                <Button variant="outline" className="gap-1 flex-1">
                                                  <Upload className="h-4 w-4" />
                                                  Attach Document
                                                </Button>
                                                <Button variant="outline" className="gap-1 flex-1">
                                                  <Video className="h-4 w-4" />
                                                  Attach Video
                                                </Button>
                                              </div>
                                            </div>
                                            <DialogFooter>
                                              <Button variant="outline" onClick={() => setShowTaskDialog(false)}>Cancel</Button>
                                              <Button onClick={handleAddTask}>Assign Task</Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="courses">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium">Assigned Courses</h3>
                                <Dialog open={showCourseDialog} onOpenChange={setShowCourseDialog}>
                                  <DialogTrigger asChild>
                                    <Button size="sm" className="gap-1">
                                      <Plus className="h-4 w-4" />
                                      Assign Course
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Assign New Course</DialogTitle>
                                      <DialogDescription>
                                        Assign a course to {selectedMentorship.menteeName} to support their learning journey
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                      <div>
                                        <label className="text-sm font-medium block mb-1">Course Title</label>
                                        <Input 
                                          placeholder="e.g. Advanced Leadership Principles" 
                                          value={newCourse.title}
                                          onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium block mb-1">Description</label>
                                        <Textarea 
                                          placeholder="Provide a brief description of this course..." 
                                          value={newCourse.description}
                                          onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setShowCourseDialog(false)}>Cancel</Button>
                                      <Button onClick={handleAssignCourse}>Assign Course</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              
                              {mentorship.courses && mentorship.courses.length > 0 ? (
                                <div className="space-y-3">
                                  {mentorship.courses.map(course => (
                                    <Card key={course.id} className="overflow-hidden">
                                      <div className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                          <div>
                                            <h4 className="font-medium flex items-center gap-2">
                                              <BookOpen className="h-4 w-4" />
                                              {course.title}
                                            </h4>
                                            {course.description && (
                                              <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                                            )}
                                          </div>
                                        </div>
                                        
                                        <div className="mt-3">
                                          <div className="flex justify-between items-center mb-1 text-sm">
                                            <span>Progress</span>
                                            <span className="font-medium">{course.progress}%</span>
                                          </div>
                                          <div className="w-full bg-muted rounded-full h-2">
                                            <div 
                                              className="bg-primary h-2 rounded-full" 
                                              style={{ width: `${course.progress}%` }}
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-40 bg-muted/20 rounded-lg">
                                  <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-muted-foreground">No courses assigned yet</p>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveMentorships;
