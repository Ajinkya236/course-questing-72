
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  ClipboardList, 
  Download, 
  FileText, 
  CheckSquare,
  Target,
  AlertCircle,
  Award 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data for active engagements
type Session = {
  id: number;
  title: string;
  date: string;
  status: "completed" | "upcoming";
  notes?: string;
};

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "completed" | "pending";
};

type Course = {
  id: number;
  title: string;
  progress: number;
};

type Engagement = {
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
};

const activeEngagementsData: Engagement[] = [
  {
    id: 1,
    mentorName: "Dr. Sarah Johnson",
    mentorTitle: "Senior Data Scientist",
    topic: "Data Science",
    startDate: "2023-09-15",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    progress: 65,
    goalsSet: true,
    sessionsCompleted: 3,
    sessions: [
      {
        id: 1,
        title: "Introduction to Data Science Journey",
        date: "2023-09-20",
        status: "completed",
        notes: "Discussed learning path and set initial goals."
      },
      {
        id: 2,
        title: "Data Analysis Fundamentals",
        date: "2023-10-05",
        status: "completed",
        notes: "Covered pandas library basics and data cleaning techniques."
      },
      {
        id: 3,
        title: "Visualization Best Practices",
        date: "2023-10-20",
        status: "completed",
        notes: "Explored data visualization using matplotlib and seaborn."
      },
      {
        id: 4,
        title: "Machine Learning Basics",
        date: "2023-11-05",
        status: "upcoming"
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Data Cleaning Exercise",
        description: "Clean the provided dataset and prepare it for analysis.",
        dueDate: "2023-10-10",
        status: "completed"
      },
      {
        id: 2,
        title: "Visualization Project",
        description: "Create 3 different visualizations from the cleaned dataset.",
        dueDate: "2023-10-25",
        status: "completed"
      },
      {
        id: 3,
        title: "Build a Simple Predictive Model",
        description: "Using scikit-learn, build a simple predictive model with the dataset.",
        dueDate: "2023-11-10",
        status: "pending"
      }
    ],
    courses: [
      {
        id: 1,
        title: "Python for Data Science",
        progress: 100
      },
      {
        id: 2,
        title: "Statistical Analysis with Python",
        progress: 75
      },
      {
        id: 3,
        title: "Introduction to Machine Learning",
        progress: 30
      }
    ]
  },
  {
    id: 2,
    mentorName: "Michael Chen",
    mentorTitle: "Product Manager",
    topic: "Product Management",
    startDate: "2023-10-01",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    progress: 35,
    goalsSet: false,
    sessionsCompleted: 1,
    sessions: [
      {
        id: 1,
        title: "Product Management Overview",
        date: "2023-10-10",
        status: "completed",
        notes: "Introduced key product management concepts and frameworks."
      },
      {
        id: 2,
        title: "User Research Techniques",
        date: "2023-10-25",
        status: "upcoming"
      },
      {
        id: 3,
        title: "Product Roadmapping",
        date: "2023-11-10",
        status: "upcoming"
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Competitive Analysis",
        description: "Analyze 3 competing products and identify strengths and weaknesses.",
        dueDate: "2023-10-20",
        status: "completed"
      },
      {
        id: 2,
        title: "User Persona Development",
        description: "Create 2-3 user personas for your product idea.",
        dueDate: "2023-11-05",
        status: "pending"
      }
    ],
    courses: [
      {
        id: 1,
        title: "Product Management Fundamentals",
        progress: 60
      },
      {
        id: 2,
        title: "User Research for Product Managers",
        progress: 20
      }
    ]
  }
];

const ActiveEngagements = () => {
  const { toast } = useToast();
  const [engagements, setEngagements] = useState<Engagement[]>(activeEngagementsData);
  const [activeTab, setActiveTab] = useState<string>("sessions");
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);
  const [showEngagementDetails, setShowEngagementDetails] = useState(false);
  const [journalNote, setJournalNote] = useState("");
  const [goals, setGoals] = useState("");
  const [showGoalsDialog, setShowGoalsDialog] = useState(false);

  const handleMarkTaskCompleted = (engagementId: number, taskId: number) => {
    setEngagements(engagements.map(engagement => {
      if (engagement.id === engagementId) {
        return {
          ...engagement,
          tasks: engagement.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, status: "completed" };
            }
            return task;
          })
        };
      }
      return engagement;
    }));

    toast({
      title: "Task Completed",
      description: "Your task has been marked as completed."
    });
  };

  const handleSaveJournalNote = () => {
    toast({
      title: "Journal Saved",
      description: "Your journal notes have been saved."
    });
    setJournalNote("");
  };

  const handleSaveGoals = (engagementId: number) => {
    setEngagements(engagements.map(engagement => {
      if (engagement.id === engagementId) {
        return { ...engagement, goalsSet: true };
      }
      return engagement;
    }));

    toast({
      title: "Goals Saved",
      description: "Your mentoring goals have been set successfully."
    });
    setShowGoalsDialog(false);
  };

  const handleDownloadMaterials = (engagement: Engagement) => {
    toast({
      title: "Materials Downloaded",
      description: `All materials for the engagement with ${engagement.mentorName} have been downloaded.`
    });
  };

  const isEngagementCompleted = (engagement: Engagement) => {
    return engagement.goalsSet && engagement.sessionsCompleted > 0;
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
            Manage your ongoing mentoring relationships
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {engagements.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-muted-foreground">You don't have any active mentoring engagements</p>
            </div>
          ) : (
            engagements.map(engagement => (
              <Card key={engagement.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="p-4 md:w-1/3 border-b md:border-b-0 md:border-r">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={engagement.imageUrl} alt={engagement.mentorName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">{engagement.mentorName}</h3>
                        <p className="text-sm text-muted-foreground">{engagement.mentorTitle}</p>
                        <Badge className="mt-1">{engagement.topic}</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>{engagement.progress}%</span>
                      </div>
                      <Progress value={engagement.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Started: {new Date(engagement.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{engagement.sessionsCompleted} Sessions</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setSelectedEngagement(engagement);
                          setShowEngagementDetails(true);
                        }}
                      >
                        Details
                      </Button>
                      <Button 
                        variant={engagement.goalsSet ? "outline" : "default"} 
                        size="sm" 
                        className="w-full gap-1"
                        onClick={() => {
                          setSelectedEngagement(engagement);
                          setShowGoalsDialog(true);
                          setGoals("");
                        }}
                      >
                        <Target className="h-4 w-4" />
                        {engagement.goalsSet ? "Update Goals" : "Set Goals"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 md:w-2/3">
                    <h3 className="font-medium mb-3">Upcoming Activities</h3>
                    <div className="space-y-3">
                      {engagement.sessions.filter(s => s.status === "upcoming").slice(0, 1).map(session => (
                        <div key={session.id} className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <h4 className="font-medium flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              {session.title}
                            </h4>
                            <Badge variant="outline">
                              {new Date(session.date).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      
                      {engagement.tasks.filter(t => t.status === "pending").slice(0, 1).map(task => (
                        <div key={task.id} className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <h4 className="font-medium flex items-center gap-2">
                              <ClipboardList className="h-4 w-4 text-primary" />
                              {task.title}
                            </h4>
                            <Badge variant="outline">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {task.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleDownloadMaterials(engagement)}
                      >
                        <Download className="h-4 w-4" />
                        Download Materials
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Certificate Preview Section */}
                {isEngagementCompleted(engagement) && (
                  <div className="p-4 border-t bg-muted/20">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Certificate of Completion</h4>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
          
          {/* Completion Requirements Notice */}
          <div className="bg-muted/30 p-4 rounded-lg mt-4 border border-muted">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              Completion Requirements
            </h3>
            <p className="text-sm text-muted-foreground">
              An engagement is considered complete when both of the following requirements are met:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
              <li>At least one mentoring session has been completed</li>
              <li>Mentoring goals have been set and acknowledged by both parties</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Once an engagement is completed, you will be able to download your certificate and provide feedback for your mentor.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Engagement Details Dialog */}
      <Dialog open={showEngagementDetails} onOpenChange={setShowEngagementDetails}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Mentoring Engagement Details</DialogTitle>
            <DialogDescription>
              {selectedEngagement && `${selectedEngagement.topic} mentoring with ${selectedEngagement.mentorName}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEngagement && (
            <div className="py-4">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="journal">Journal</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sessions" className="space-y-4">
                  {selectedEngagement.sessions.map(session => (
                    <Card key={session.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{session.title}</h3>
                          <Badge variant={session.status === "completed" ? "default" : "outline"}>
                            {session.status === "completed" ? "Completed" : "Upcoming"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                        {session.notes && (
                          <div className="mt-3 p-3 bg-muted/30 rounded-md">
                            <h4 className="text-sm font-medium mb-1">Session Notes</h4>
                            <p className="text-sm">{session.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="tasks" className="space-y-4">
                  {selectedEngagement.tasks.map(task => (
                    <Card key={task.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium flex items-center gap-2">
                            {task.status === "completed" ? (
                              <CheckSquare className="h-4 w-4 text-primary" />
                            ) : (
                              <ClipboardList className="h-4 w-4 text-primary" />
                            )}
                            {task.title}
                          </h3>
                          <Badge variant={task.status === "completed" ? "default" : "outline"}>
                            {task.status === "completed" ? "Completed" : `Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{task.description}</p>
                        
                        {task.status === "pending" && (
                          <div className="mt-4 flex justify-between">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                            >
                              <Download className="h-4 w-4" />
                              Download Sample
                            </Button>
                            <div className="space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                Submit Work
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleMarkTaskCompleted(selectedEngagement.id, task.id)}
                              >
                                Mark Complete
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="resources" className="space-y-4">
                  <h3 className="font-medium mb-2">Recommended Courses</h3>
                  {selectedEngagement.courses.map(course => (
                    <Card key={course.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            {course.title}
                          </h4>
                          <span className="text-sm">{course.progress}% completed</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 w-full"
                      onClick={() => handleDownloadMaterials(selectedEngagement)}
                    >
                      <Download className="h-4 w-4" />
                      Download All Materials
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="journal" className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-3">Private Mentoring Journal</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        This journal is private and only visible to you. Use it to track your progress, insights, and questions.
                      </p>
                      <textarea 
                        className="w-full p-3 border rounded-md resize-none h-40"
                        placeholder="Write your private notes about this mentoring journey..."
                        value={journalNote}
                        onChange={(e) => setJournalNote(e.target.value)}
                      />
                      <div className="mt-2 flex justify-end">
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={handleSaveJournalNote}
                          disabled={!journalNote.trim()}
                        >
                          Save Journal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Set Goals Dialog */}
      <Dialog open={showGoalsDialog} onOpenChange={setShowGoalsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Mentoring Goals</DialogTitle>
            <DialogDescription>
              Define specific goals for your mentoring journey
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-sm font-medium mb-2">What do you want to achieve?</h4>
            <textarea 
              className="w-full p-2 border rounded-md resize-none h-40"
              placeholder="Describe your specific goals for this mentoring engagement..."
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
            <div className="mt-4 p-3 bg-muted/30 rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Tip:</strong> Setting clear, specific goals will help your mentor guide you more effectively. 
                Consider including skills you want to develop, career milestones you want to reach, or specific projects you need help with.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGoalsDialog(false)}>Cancel</Button>
            <Button 
              onClick={() => selectedEngagement && handleSaveGoals(selectedEngagement.id)} 
              disabled={!goals.trim()}
            >
              Save Goals
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActiveEngagements;
