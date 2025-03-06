
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarDays, 
  MessageSquare, 
  Download, 
  FileEdit, 
  Star, 
  BookOpen, 
  CheckCircle, 
  FileCheck,
  Clock,
  FileText,
  Calendar,
  File,
  FileDown,
  Award,
  X,
  Filter,
  Users
} from 'lucide-react';

// Mock data for active mentorships
const mockActiveMentorships = [
  {
    id: 1,
    mentee: {
      id: 'mentee1',
      name: 'Alex Johnson',
      role: 'Junior Developer',
      avatar: 'https://i.pravatar.cc/150?img=11',
      department: 'Engineering'
    },
    startDate: '2023-08-15',
    endDate: '2023-12-15',
    progress: 45,
    goalsSet: true,
    sessionsCompleted: 3,
    totalSessions: 12,
    nextSession: '2023-10-12',
    tasks: [
      {
        id: 't1',
        title: 'Complete JavaScript Basics',
        description: 'Finish the introductory JavaScript modules and submit code examples.',
        dueDate: '2023-10-15',
        status: 'in-progress',
        submission: null
      },
      {
        id: 't2',
        title: 'API Integration Exercise',
        description: 'Create a small application that integrates with a public API.',
        dueDate: '2023-10-22',
        status: 'assigned',
        submission: null
      }
    ],
    notes: [
      {
        id: 'n1',
        date: '2023-09-01',
        content: 'Alex is making good progress with fundamentals, but needs more practice with async concepts.',
      },
      {
        id: 'n2',
        date: '2023-09-15',
        content: 'Discussed career path options and set priority learning areas for next two months.',
      }
    ],
    recommendedCourses: [
      {
        id: 'c1',
        title: 'Advanced JavaScript Patterns',
      },
      {
        id: 'c2',
        title: 'Building Resilient APIs',
      }
    ]
  },
  {
    id: 2,
    mentee: {
      id: 'mentee2',
      name: 'Sarah Miller',
      role: 'UX Designer',
      avatar: 'https://i.pravatar.cc/150?img=5',
      department: 'Design'
    },
    startDate: '2023-07-10',
    endDate: '2023-11-10',
    progress: 65,
    goalsSet: true,
    sessionsCompleted: 5,
    totalSessions: 10,
    nextSession: '2023-10-05',
    tasks: [
      {
        id: 't3',
        title: 'User Research Plan',
        description: 'Create a comprehensive user research plan for the new product initiative.',
        dueDate: '2023-10-08',
        status: 'submitted',
        submission: {
          date: '2023-10-01',
          files: ['research_plan.pdf']
        }
      },
      {
        id: 't4',
        title: 'Competitive Analysis',
        description: 'Analyze the UX of our top 3 competitors and summarize findings.',
        dueDate: '2023-10-25',
        status: 'in-progress',
        submission: null
      }
    ],
    notes: [
      {
        id: 'n3',
        date: '2023-08-05',
        content: 'Sarah shows excellent initiative in user research methods, but could improve prototyping skills.',
      },
      {
        id: 'n4',
        date: '2023-09-10',
        content: 'Identified gaps in knowledge around accessibility standards, will focus on this area next.',
      }
    ],
    recommendedCourses: [
      {
        id: 'c3',
        title: 'Accessible Design Principles',
      },
      {
        id: 'c4',
        title: 'Advanced Figma Prototyping',
      }
    ]
  }
];

const ActiveMentorships = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeMentorships, setActiveMentorships] = useState(mockActiveMentorships);
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  
  // Task editing and feedback states
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskFeedback, setTaskFeedback] = useState({ rating: 0, comment: '' });
  
  // Task form state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    sampleFile: null
  });

  // Filter state
  const [filterDepartment, setFilterDepartment] = useState('All');
  
  const handleEditTask = (mentorshipId, task) => {
    const mentorship = activeMentorships.find(m => m.id === mentorshipId);
    setSelectedMentorship(mentorship);
    setEditingTask({...task});
  };
  
  const handleSaveTask = () => {
    if (!selectedMentorship || !editingTask) return;
    
    const updatedMentorships = activeMentorships.map(mentorship => {
      if (mentorship.id === selectedMentorship.id) {
        const updatedTasks = mentorship.tasks.map(task => 
          task.id === editingTask.id ? editingTask : task
        );
        return {...mentorship, tasks: updatedTasks};
      }
      return mentorship;
    });
    
    setActiveMentorships(updatedMentorships);
    setEditingTask(null);
    
    toast({
      title: "Task Updated",
      description: "The task has been successfully updated.",
    });
  };
  
  const handleAddTask = () => {
    if (!selectedMentorship || !newTask.title || !newTask.description || !newTask.dueDate) return;
    
    const newTaskObj = {
      id: `t${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      status: 'assigned',
      submission: null
    };
    
    const updatedMentorships = activeMentorships.map(mentorship => {
      if (mentorship.id === selectedMentorship.id) {
        return {
          ...mentorship,
          tasks: [...mentorship.tasks, newTaskObj]
        };
      }
      return mentorship;
    });
    
    setActiveMentorships(updatedMentorships);
    setTaskFormOpen(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      sampleFile: null
    });
    
    toast({
      title: "Task Added",
      description: "A new task has been assigned to the mentee.",
    });
  };
  
  const handleDownloadSubmission = (task) => {
    toast({
      title: "Downloading Submission",
      description: `Downloading ${task.submission.files.join(', ')}`,
    });
    // In a real app, this would trigger an actual file download
  };
  
  const handleProvideFeedback = (mentorshipId, task) => {
    const mentorship = activeMentorships.find(m => m.id === mentorshipId);
    setSelectedMentorship(mentorship);
    setSelectedTask(task);
    setTaskFeedback({ rating: 0, comment: '' });
    setFeedbackDialogOpen(true);
  };
  
  const handleSubmitFeedback = () => {
    if (!selectedMentorship || !selectedTask || taskFeedback.rating === 0) return;
    
    const updatedMentorships = activeMentorships.map(mentorship => {
      if (mentorship.id === selectedMentorship.id) {
        const updatedTasks = mentorship.tasks.map(task => {
          if (task.id === selectedTask.id) {
            return {
              ...task,
              feedback: {
                rating: taskFeedback.rating,
                comment: taskFeedback.comment,
                date: new Date().toISOString().split('T')[0]
              },
              status: 'completed'
            };
          }
          return task;
        });
        return {...mentorship, tasks: updatedTasks};
      }
      return mentorship;
    });
    
    setActiveMentorships(updatedMentorships);
    setFeedbackDialogOpen(false);
    
    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been submitted and the task has been marked as completed.",
    });
  };
  
  const handleMarkComplete = (mentorshipId, taskId) => {
    const updatedMentorships = activeMentorships.map(mentorship => {
      if (mentorship.id === mentorshipId) {
        const updatedTasks = mentorship.tasks.map(task => {
          if (task.id === taskId) {
            return {...task, status: 'completed'};
          }
          return task;
        });
        return {...mentorship, tasks: updatedTasks};
      }
      return mentorship;
    });
    
    setActiveMentorships(updatedMentorships);
    
    toast({
      title: "Task Completed",
      description: "The task has been marked as completed.",
    });
  };
  
  const handleWithdraw = () => {
    if (!selectedMentorship) return;
    
    const updatedMentorships = activeMentorships.filter(
      mentorship => mentorship.id !== selectedMentorship.id
    );
    
    setActiveMentorships(updatedMentorships);
    setWithdrawDialogOpen(false);
    
    toast({
      title: "Mentorship Withdrawn",
      description: "You have withdrawn from this mentorship. No certificate will be issued.",
    });
  };
  
  const handleDownloadAllMaterials = (mentorship) => {
    toast({
      title: "Downloading Materials",
      description: "All tasks and notes for this mentorship are being downloaded as a zip file.",
    });
    // In a real app, this would trigger an actual zip file download
  };
  
  const handleRecommendCourse = () => {
    // Redirect to discover page
    navigate('/discover');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Active Mentorship Engagements</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mb-4">
        <p>
          Engagements are active when goal setting is complete and at least one session is scheduled. 
          You can manage tasks, provide feedback, and download materials for each engagement.
        </p>
      </div>
      
      {activeMentorships.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-muted p-3 mb-3">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No Active Mentorships</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              You don't have any active mentorships at the moment. Check the Requests tab for new mentee requests.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {activeMentorships.map((mentorship) => (
            <Card key={mentorship.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentorship.mentee.avatar} alt={mentorship.mentee.name} />
                      <AvatarFallback>{mentorship.mentee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{mentorship.mentee.name}</CardTitle>
                      <CardDescription>{mentorship.mentee.role} - {mentorship.mentee.department}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>Started: {mentorship.startDate}</span>
                    </Badge>
                    <Badge variant="outline" className="bg-primary/5">
                      {mentorship.sessionsCompleted} of {mentorship.totalSessions} sessions completed
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-medium">{mentorship.progress}%</span>
                  </div>
                  <Progress value={mentorship.progress} className="h-2" />
                </div>
                
                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
                    <TabsTrigger value="sessions" className="text-xs">Sessions</TabsTrigger>
                    <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
                    <TabsTrigger value="courses" className="text-xs">Courses</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tasks" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Assigned Tasks</h4>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedMentorship(mentorship);
                          setTaskFormOpen(true);
                        }}
                      >
                        <FileEdit className="h-4 w-4 mr-1.5" />
                        Add Task
                      </Button>
                    </div>
                    
                    {mentorship.tasks.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No tasks assigned yet.</div>
                    ) : (
                      <div className="space-y-3">
                        {mentorship.tasks.map((task) => (
                          <Card key={task.id} className="bg-secondary/10">
                            <CardContent className="p-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-semibold text-sm">{task.title}</h5>
                                    <Badge variant={
                                      task.status === 'completed' ? 'default' : 
                                      task.status === 'submitted' ? 'secondary' : 
                                      'outline'
                                    }>
                                      {task.status === 'completed' ? 'Completed' : 
                                       task.status === 'submitted' ? 'Submitted' :
                                       task.status === 'in-progress' ? 'In Progress' : 
                                       'Assigned'}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleEditTask(mentorship.id, task)}
                                  >
                                    <FileEdit className="h-3.5 w-3.5 mr-1.5" />
                                    Edit
                                  </Button>
                                  
                                  {task.status === 'submitted' && (
                                    <>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => handleDownloadSubmission(task)}
                                      >
                                        <Download className="h-3.5 w-3.5 mr-1.5" />
                                        Download
                                      </Button>
                                      
                                      <Button 
                                        size="sm" 
                                        onClick={() => handleProvideFeedback(mentorship.id, task)}
                                      >
                                        <Star className="h-3.5 w-3.5 mr-1.5" />
                                        Feedback
                                      </Button>
                                    </>
                                  )}
                                  
                                  {(task.status === 'in-progress' || task.status === 'assigned') && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleMarkComplete(mentorship.id, task.id)}
                                    >
                                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                                      Mark Complete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="sessions" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Mentoring Sessions</h4>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        Schedule Session
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-md">
                      <div>
                        <h5 className="font-medium text-sm">Next session</h5>
                        <p className="text-xs text-muted-foreground">{mentorship.nextSession}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1.5" />
                        Add Notes
                      </Button>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-sm mb-2">Session History</h5>
                      <div className="space-y-2">
                        {Array.from({ length: mentorship.sessionsCompleted }).map((_, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-secondary/5 rounded-md">
                            <div>
                              <p className="text-xs font-medium">Session {index + 1}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(new Date(mentorship.startDate).getTime() + index * 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                              </p>
                            </div>
                            <Button size="sm" variant="ghost">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Mentoring Notes</h4>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1.5" />
                        Add Note
                      </Button>
                    </div>
                    
                    {mentorship.notes.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No notes added yet.</div>
                    ) : (
                      <div className="space-y-3">
                        {mentorship.notes.map((note) => (
                          <Card key={note.id} className="bg-secondary/10">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-sm">{note.date}</h5>
                                <Button size="icon" variant="ghost" className="h-6 w-6">
                                  <FileEdit className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                              <p className="text-xs">{note.content}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="courses" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Recommended Courses</h4>
                      <Button 
                        size="sm" 
                        onClick={handleRecommendCourse}
                      >
                        <BookOpen className="h-4 w-4 mr-1.5" />
                        Recommend Course
                      </Button>
                    </div>
                    
                    {mentorship.recommendedCourses.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No courses recommended yet.</div>
                    ) : (
                      <div className="space-y-3">
                        {mentorship.recommendedCourses.map((course) => (
                          <Card key={course.id} className="bg-secondary/10">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-sm">{course.title}</h5>
                                <Button size="sm" variant="ghost" className="h-7">
                                  <BookOpen className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex flex-wrap justify-between gap-2 pt-0 pb-4 px-6">
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleDownloadAllMaterials(mentorship)}
                  >
                    <FileDown className="h-4 w-4 mr-1.5" />
                    Download Materials
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setSelectedMentorship(mentorship);
                      setCompletionDialogOpen(true);
                    }}
                  >
                    <Award className="h-4 w-4 mr-1.5" />
                    View Certificate
                  </Button>
                </div>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedMentorship(mentorship);
                    setWithdrawDialogOpen(true);
                  }}
                >
                  <X className="h-4 w-4 mr-1.5" />
                  Withdraw from Engagement
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Edit Task Dialog */}
      <Dialog open={editingTask !== null} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update the details of this task for your mentee.
            </DialogDescription>
          </DialogHeader>
          
          {editingTask && (
            <div className="space-y-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="task-title" className="text-sm font-medium">Task Title</label>
                <Input 
                  id="task-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="task-description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="task-description"
                  rows={3}
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="task-due-date" className="text-sm font-medium">Due Date</label>
                <Input 
                  id="task-due-date"
                  type="date"
                  value={editingTask.dueDate}
                  onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTask(null)}>Cancel</Button>
            <Button onClick={handleSaveTask}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Task Dialog */}
      <Dialog open={taskFormOpen} onOpenChange={setTaskFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Assign a new task to your mentee.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="new-task-title" className="text-sm font-medium">Task Title</label>
              <Input 
                id="new-task-title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="Enter task title"
              />
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="new-task-description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="new-task-description"
                rows={3}
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Provide detailed instructions for the task"
              />
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="new-task-due-date" className="text-sm font-medium">Due Date</label>
              <Input 
                id="new-task-due-date"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="task-sample" className="text-sm font-medium">Sample File (Optional)</label>
              <div className="flex gap-2">
                <Input 
                  id="task-sample"
                  type="file"
                  className="flex-1"
                  onChange={(e) => setNewTask({...newTask, sampleFile: e.target.files[0]})}
                />
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1.5" />
                  <span>Sample</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                You can upload a sample file for your mentee to reference.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setTaskFormOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>
              Rate and provide feedback on the submitted task.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTask && (
            <div className="space-y-4 py-4">
              <div className="bg-secondary/10 p-3 rounded-md">
                <h4 className="font-medium">{selectedTask.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Rating</h4>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={taskFeedback.rating === rating ? "default" : "outline"}
                      size="sm"
                      className="h-10 w-10 p-0"
                      onClick={() => setTaskFeedback({...taskFeedback, rating})}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  5 = Excellent, 1 = Needs Improvement
                </p>
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="feedback-comment" className="text-sm font-medium">Comments</label>
                <Textarea 
                  id="feedback-comment"
                  rows={4}
                  value={taskFeedback.comment}
                  onChange={(e) => setTaskFeedback({...taskFeedback, comment: e.target.value})}
                  placeholder="Provide constructive feedback on this task submission"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitFeedback} disabled={taskFeedback.rating === 0}>
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Certificate Dialog */}
      <Dialog open={completionDialogOpen} onOpenChange={setCompletionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Mentorship Certificate</DialogTitle>
            <DialogDescription>
              This certificate will be available once the engagement is completed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="border border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center text-center bg-muted/30">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground">Certificate of Completion</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-6">
                This certificate is currently locked and will be available when the mentorship is successfully completed.
              </p>
              <Button variant="outline" disabled>
                <Download className="h-4 w-4 mr-1.5" />
                Download Certificate
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setCompletionDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Withdraw from Engagement</DialogTitle>
            <DialogDescription>
              Are you sure you want to withdraw from this mentorship engagement?
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive/90">
              <p>
                <strong>Important:</strong> Withdrawing from this engagement will:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>End the mentorship relationship immediately</li>
                <li>Remove access to this engagement for both you and your mentee</li>
                <li>Prevent a certificate from being issued</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleWithdraw}>
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActiveMentorships;
