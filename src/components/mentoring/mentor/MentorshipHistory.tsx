
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  CalendarDays, 
  Download, 
  FileEdit, 
  Star, 
  CheckCircle, 
  MessageSquare, 
  FileText, 
  Award,
  Filter,
  FileDown,
  BookOpen,
  Clock
} from 'lucide-react';

// Mock data for completed mentorships
const mockCompletedMentorships = [
  {
    id: 1,
    mentee: {
      id: 'mentee5',
      name: 'Michael Brown',
      role: 'Frontend Developer',
      avatar: 'https://i.pravatar.cc/150?img=12',
      department: 'Engineering'
    },
    startDate: '2023-01-10',
    endDate: '2023-06-10',
    progress: 100,
    goalsSet: true,
    sessionsCompleted: 12,
    totalSessions: 12,
    status: 'completed',
    feedback: {
      mentorRating: 4.8,
      menteeRating: 4.9,
      mentorComment: "Michael showed exceptional growth during our mentorship. He was always prepared and implemented feedback promptly.",
      menteeComment: "This mentorship has been invaluable to my career development. I learned practical skills that I've already applied to my work."
    },
    tasks: [
      {
        id: 't5',
        title: 'Build a React Component Library',
        description: 'Create a reusable component library with documentation.',
        dueDate: '2023-03-15',
        status: 'completed',
        feedback: {
          rating: 5,
          comment: "Excellent work! The components are well-structured and documented.",
          date: '2023-03-16'
        }
      },
      {
        id: 't6',
        title: 'Implement State Management',
        description: 'Add Redux or Context API to manage application state.',
        dueDate: '2023-04-20',
        status: 'completed',
        feedback: {
          rating: 4,
          comment: "Good implementation of Redux, but could use more comments in complex reducers.",
          date: '2023-04-22'
        }
      }
    ],
    notes: [
      {
        id: 'n5',
        date: '2023-02-15',
        content: 'Michael is progressing well with React fundamentals, moving to advanced patterns next session.',
      },
      {
        id: 'n6',
        date: '2023-04-01',
        content: 'Discussed career progression and specific skills Michael needs to reach senior level.',
      }
    ],
    recommendedCourses: [
      {
        id: 'c5',
        title: 'Advanced React Patterns',
      },
      {
        id: 'c6',
        title: 'Modern Frontend Testing',
      }
    ]
  },
  {
    id: 2,
    mentee: {
      id: 'mentee6',
      name: 'Lisa Wong',
      role: 'Product Manager',
      avatar: 'https://i.pravatar.cc/150?img=25',
      department: 'Product'
    },
    startDate: '2022-11-05',
    endDate: '2023-05-05',
    progress: 100,
    goalsSet: true,
    sessionsCompleted: 10,
    totalSessions: 10,
    status: 'completed',
    feedback: {
      mentorRating: 5.0,
      menteeRating: 4.7,
      mentorComment: "Lisa showed exceptional leadership potential and strategic thinking. Her growth in stakeholder management was particularly impressive.",
      menteeComment: "I gained valuable insights into product strategy and roadmap planning. Would highly recommend this mentor!"
    },
    tasks: [
      {
        id: 't7',
        title: 'Product Roadmap Creation',
        description: 'Develop a 12-month roadmap for your product area.',
        dueDate: '2023-01-15',
        status: 'completed',
        feedback: {
          rating: 5,
          comment: "Comprehensive roadmap with clear priorities and success metrics.",
          date: '2023-01-17'
        }
      },
      {
        id: 't8',
        title: 'Competitive Analysis',
        description: 'Analyze 3 key competitors and identify opportunities.',
        dueDate: '2023-02-28',
        status: 'completed',
        feedback: {
          rating: 4,
          comment: "Good analysis with clear insights, consider adding more quantitative data next time.",
          date: '2023-03-01'
        }
      }
    ],
    notes: [
      {
        id: 'n7',
        date: '2022-12-10',
        content: 'Lisa has strong communication skills but needs more practice with technical discussions.',
      },
      {
        id: 'n8',
        date: '2023-03-15',
        content: 'Significant improvement in stakeholder management and technical conversations.',
      }
    ],
    recommendedCourses: [
      {
        id: 'c7',
        title: 'Product Strategy Fundamentals',
      },
      {
        id: 'c8',
        title: 'Metrics that Matter for Product Managers',
      }
    ]
  }
];

const MentorshipHistory = () => {
  const { toast } = useToast();
  const [completedMentorships, setCompletedMentorships] = useState(mockCompletedMentorships);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  
  // Filter state
  const [filterStatus, setFilterStatus] = useState('all');
  
  const handleViewCertificate = (mentorship) => {
    setSelectedMentorship(mentorship);
    setCertificateDialogOpen(true);
  };
  
  const handleViewFeedback = (mentorship) => {
    setSelectedMentorship(mentorship);
    setFeedbackDialogOpen(true);
  };
  
  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Downloaded",
      description: "Your mentorship certificate has been downloaded successfully.",
    });
    // In a real app, this would trigger the download
  };
  
  const handleDownloadAllMaterials = (mentorship) => {
    toast({
      title: "Downloading Materials",
      description: "All tasks and notes for this mentorship are being downloaded as a zip file.",
    });
    // In a real app, this would trigger an actual zip file download
  };
  
  const filteredMentorships = completedMentorships.filter(mentorship => {
    if (filterStatus === 'all') return true;
    return mentorship.status === filterStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mentorship History</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      
      {filteredMentorships.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-muted p-3 mb-3">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No Completed Mentorships</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              You haven't completed any mentorships yet. They will appear here once finished.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredMentorships.map((mentorship) => (
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
                      <span>{mentorship.startDate} - {mentorship.endDate}</span>
                    </Badge>
                    <Badge className="bg-green-500/10 text-green-700 dark:text-green-500">
                      Completed
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium">{mentorship.feedback.menteeRating}</span>
                    <span className="text-xs text-muted-foreground">mentee rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium">{mentorship.feedback.mentorRating}</span>
                    <span className="text-xs text-muted-foreground">your rating</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleViewFeedback(mentorship)}
                  >
                    View Feedback
                  </Button>
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
                      <h4 className="font-medium">Completed Tasks</h4>
                    </div>
                    
                    {mentorship.tasks.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No tasks were assigned.</div>
                    ) : (
                      <div className="space-y-3">
                        {mentorship.tasks.map((task) => (
                          <Card key={task.id} className="bg-secondary/10">
                            <CardContent className="p-3">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-semibold text-sm">{task.title}</h5>
                                    <Badge variant="default">Completed</Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-0.5">
                                      {Array.from({ length: 5 }).map((_, index) => (
                                        <Star 
                                          key={index} 
                                          className={`h-3.5 w-3.5 ${index < task.feedback.rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`} 
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{task.feedback.date}</span>
                                  </div>
                                  <p className="text-xs mt-1 italic">"{task.feedback.comment}"</p>
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
                    </div>
                    
                    {mentorship.notes.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No notes were added.</div>
                    ) : (
                      <div className="space-y-3">
                        {mentorship.notes.map((note) => (
                          <Card key={note.id} className="bg-secondary/10">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-sm">{note.date}</h5>
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
                    </div>
                    
                    {mentorship.recommendedCourses.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No courses were recommended.</div>
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
                  size="sm"
                  onClick={() => handleViewCertificate(mentorship)}
                >
                  <Award className="h-4 w-4 mr-1.5" />
                  View Certificate
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Certificate Dialog */}
      <Dialog open={certificateDialogOpen} onOpenChange={setCertificateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Mentorship Certificate</DialogTitle>
            <DialogDescription>
              This certificate recognizes your successful completion of the mentorship program.
            </DialogDescription>
          </DialogHeader>
          
          {selectedMentorship && (
            <div className="py-6">
              <div className="border border-solid border-primary/30 rounded-md p-8 flex flex-col items-center justify-center text-center bg-primary/5">
                <Award className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-primary">Certificate of Completion</h3>
                <p className="mt-2 mb-4 text-muted-foreground">This certifies that</p>
                <p className="text-lg font-medium">{selectedMentorship.mentee.name}</p>
                <p className="mt-2 mb-1 text-muted-foreground">has successfully completed</p>
                <p className="text-lg font-medium">Professional Mentorship Program</p>
                <p className="mt-4 mb-6 text-sm text-muted-foreground">
                  {selectedMentorship.startDate} - {selectedMentorship.endDate}
                </p>
                <div className="w-32 border-t border-primary/20 mt-2 mb-4"></div>
                <p className="font-medium">Your Name</p>
                <p className="text-sm text-muted-foreground">Mentor</p>
                
                <Button className="mt-6" onClick={handleDownloadCertificate}>
                  <Download className="h-4 w-4 mr-1.5" />
                  Download Certificate
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCertificateDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Mentorship Feedback</DialogTitle>
            <DialogDescription>
              Review feedback exchanged at the end of the mentorship.
            </DialogDescription>
          </DialogHeader>
          
          {selectedMentorship && (
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  Mentee Feedback ({selectedMentorship.feedback.menteeRating}/5)
                </h4>
                <div className="bg-secondary/10 p-3 rounded-md">
                  <p className="text-sm italic">"{selectedMentorship.feedback.menteeComment}"</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  Your Feedback ({selectedMentorship.feedback.mentorRating}/5)
                </h4>
                <div className="bg-secondary/10 p-3 rounded-md">
                  <p className="text-sm italic">"{selectedMentorship.feedback.mentorComment}"</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setFeedbackDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorshipHistory;
