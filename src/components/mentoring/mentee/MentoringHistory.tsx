
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Star,
  MessageSquare,
  Award
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data for completed engagements
const historyData = [
  {
    id: 1,
    mentorName: "Elena Rodriguez",
    mentorTitle: "Executive Coach",
    topic: "Leadership Development",
    startDate: "2023-03-10",
    endDate: "2023-06-20",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 4.8,
    feedback: "Elena was an exceptional mentor who helped me develop my leadership skills and provided valuable insights on team management.",
    progress: 100,
    sessionsCompleted: 8,
    hasCertificate: true,
    sessions: [
      {
        id: 1,
        title: "Leadership Assessment",
        date: "2023-03-15",
        status: "completed",
        notes: "Conducted a leadership style assessment and identified areas for growth."
      },
      {
        id: 2,
        title: "Team Communication Strategies",
        date: "2023-04-05",
        status: "completed",
        notes: "Discussed effective communication techniques for different team scenarios."
      },
      {
        id: 3,
        title: "Conflict Resolution",
        date: "2023-04-25",
        status: "completed",
        notes: "Explored conflict resolution models and practiced with role-play scenarios."
      },
      {
        id: 4,
        title: "Strategic Decision Making",
        date: "2023-05-15",
        status: "completed",
        notes: "Analyzed decision-making frameworks and applied them to real business cases."
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Leadership Self-Assessment",
        description: "Complete the leadership style assessment and reflect on the results.",
        dueDate: "2023-03-20",
        status: "completed"
      },
      {
        id: 2,
        title: "Team Communication Plan",
        description: "Develop a communication plan for your team addressing key challenges.",
        dueDate: "2023-04-15",
        status: "completed"
      },
      {
        id: 3,
        title: "Conflict Resolution Case Study",
        description: "Analyze the provided case study and develop a resolution strategy.",
        dueDate: "2023-05-05",
        status: "completed"
      }
    ],
    resources: [
      {
        id: 1,
        title: "Effective Leadership Guide",
        type: "PDF"
      },
      {
        id: 2,
        title: "Communication Strategies Toolkit",
        type: "PDF"
      },
      {
        id: 3,
        title: "Team Building Exercises",
        type: "PDF"
      }
    ]
  },
  {
    id: 2,
    mentorName: "James Wilson",
    mentorTitle: "Software Engineering Lead",
    topic: "Software Architecture",
    startDate: "2023-01-05",
    endDate: "2023-04-15",
    imageUrl: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 4.5,
    feedback: "James provided excellent guidance on software architecture principles and helped me redesign our application for better scalability.",
    progress: 100,
    sessionsCompleted: 6,
    hasCertificate: true,
    sessions: [
      {
        id: 1,
        title: "Architecture Principles",
        date: "2023-01-10",
        status: "completed",
        notes: "Covered fundamental principles of software architecture and design patterns."
      },
      {
        id: 2,
        title: "Scalability Strategies",
        date: "2023-02-05",
        status: "completed",
        notes: "Discussed approaches to building scalable applications and infrastructure."
      },
      {
        id: 3,
        title: "System Design Review",
        date: "2023-03-02",
        status: "completed",
        notes: "Reviewed my system design and provided recommendations for improvement."
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Architecture Diagram",
        description: "Create a high-level architecture diagram for your application.",
        dueDate: "2023-01-25",
        status: "completed"
      },
      {
        id: 2,
        title: "Scalability Analysis",
        description: "Analyze potential scalability bottlenecks in your current system.",
        dueDate: "2023-02-20",
        status: "completed"
      }
    ],
    resources: [
      {
        id: 1,
        title: "Software Architecture Patterns",
        type: "PDF"
      },
      {
        id: 2,
        title: "Scaling Web Applications",
        type: "PDF"
      }
    ]
  }
];

const MentoringHistory = () => {
  const { toast } = useToast();
  const [selectedEngagement, setSelectedEngagement] = useState<any | null>(null);
  const [showEngagementDetails, setShowEngagementDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("sessions");
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  const handleDownloadMaterials = (engagement: any) => {
    toast({
      title: "Materials Downloaded",
      description: `All materials for the engagement with ${engagement.mentorName} have been downloaded.`
    });
  };

  const handleDownloadCertificate = (engagement: any) => {
    toast({
      title: "Certificate Downloaded",
      description: `Your certificate for ${engagement.topic} with ${engagement.mentorName} has been downloaded.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Completed Mentoring Engagements
          </CardTitle>
          <CardDescription>
            View your past mentoring relationships and achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {historyData.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-muted-foreground">You don't have any completed mentoring engagements</p>
            </div>
          ) : (
            historyData.map(engagement => (
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
                        <span>Completion</span>
                        <span>{engagement.progress}%</span>
                      </div>
                      <Progress value={engagement.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 mt-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {new Date(engagement.startDate).toLocaleDateString()} - {" "}
                          {new Date(engagement.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{engagement.sessionsCompleted} Sessions Completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-amber-500" />
                        <span>{engagement.rating} Rating</span>
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
                      {engagement.hasCertificate && (
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="w-full gap-1"
                          onClick={() => handleDownloadCertificate(engagement)}
                        >
                          <Award className="h-4 w-4" />
                          Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 md:w-2/3">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Feedback & Reflection
                    </h3>
                    
                    <div className="p-3 border rounded-md mb-4">
                      <h4 className="text-sm font-medium mb-2">Your Feedback on this Mentorship</h4>
                      <p className="text-sm">{engagement.feedback}</p>
                    </div>
                    
                    <div className="p-3 border rounded-md bg-muted/20">
                      <h4 className="text-sm font-medium mb-2">Key Achievements</h4>
                      <ul className="text-sm space-y-1 pl-5 list-disc">
                        <li>Completed {engagement.sessionsCompleted} mentoring sessions</li>
                        <li>Submitted {engagement.tasks.length} assignments</li>
                        <li>Gained expertise in {engagement.topic}</li>
                      </ul>
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
                
                {/* Certificate Section */}
                {engagement.hasCertificate && (
                  <div className="p-4 border-t bg-primary/5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Certificate of Completion</h4>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleDownloadCertificate(engagement)}
                      >
                        <Download className="h-4 w-4" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </CardContent>
      </Card>
      
      {/* Engagement Details Dialog */}
      <Dialog open={showEngagementDetails} onOpenChange={setShowEngagementDetails}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Mentoring Engagement History</DialogTitle>
            <DialogDescription>
              {selectedEngagement && `${selectedEngagement.topic} mentoring with ${selectedEngagement.mentorName}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEngagement && (
            <div className="py-4">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sessions" className="space-y-4">
                  {selectedEngagement.sessions.map((session: any) => (
                    <Card key={session.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{session.title}</h3>
                          <Badge variant="default">Completed</Badge>
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
                  {selectedEngagement.tasks.map((task: any) => (
                    <Card key={task.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            {task.title}
                          </h3>
                          <Badge variant="default">
                            Completed
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{task.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="resources" className="space-y-4">
                  <h3 className="font-medium mb-2">Materials & Resources</h3>
                  {selectedEngagement.resources.map((resource: any) => (
                    <Card key={resource.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            {resource.title}
                          </h4>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                        <div className="mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="gap-1 w-full"
                      onClick={() => handleDownloadMaterials(selectedEngagement)}
                    >
                      <Download className="h-4 w-4" />
                      Download All Materials
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentoringHistory;
