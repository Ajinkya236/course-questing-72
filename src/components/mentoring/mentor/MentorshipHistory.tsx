
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Star, Clock, Award, CheckSquare, Calendar, BookOpen, FileText } from 'lucide-react';

const MentorshipHistory = () => {
  // Sample completed mentorships data
  const completedMentorships = [
    {
      id: 1,
      menteeName: "Alex Johnson",
      menteeImage: "https://randomuser.me/api/portraits/men/32.jpg",
      topic: "Career Development",
      duration: "3 months",
      sessionsCompleted: 12,
      tasksCompleted: 8,
      coursesCompleted: 2,
      endDate: "2023-10-15",
      rating: 4.8,
      feedback: "Great mentorship experience. Helped me achieve my career goals.",
      hasCertificate: true
    },
    {
      id: 2,
      menteeName: "Jamie Smith",
      menteeImage: "https://randomuser.me/api/portraits/women/44.jpg",
      topic: "Leadership Skills",
      duration: "4 months",
      sessionsCompleted: 16,
      tasksCompleted: 10,
      coursesCompleted: 3,
      endDate: "2023-09-20",
      rating: 5.0,
      feedback: "Excellent mentorship! Provided valuable guidance for my leadership journey.",
      hasCertificate: true
    },
    {
      id: 3,
      menteeName: "Taylor Perez",
      menteeImage: "https://randomuser.me/api/portraits/men/67.jpg",
      topic: "Technical Skill Development",
      duration: "2 months",
      sessionsCompleted: 6,
      tasksCompleted: 4,
      coursesCompleted: 1,
      endDate: "2023-11-05",
      rating: 4.5,
      feedback: "Good technical guidance and resources shared.",
      hasCertificate: true
    }
  ];

  // Sample withdrawn mentorships data
  const withdrawnMentorships = [
    {
      id: 4,
      menteeName: "Morgan Lee",
      menteeImage: "https://randomuser.me/api/portraits/women/22.jpg",
      topic: "Project Management",
      duration: "1 month",
      sessionsCompleted: 2,
      tasksCompleted: 1,
      coursesCompleted: 0,
      endDate: "2023-08-10",
      reason: "Mentee changed career direction"
    },
    {
      id: 5,
      menteeName: "Casey Rivera",
      menteeImage: "https://randomuser.me/api/portraits/men/54.jpg",
      topic: "Data Science Fundamentals",
      duration: "2 weeks",
      sessionsCompleted: 1,
      tasksCompleted: 0,
      coursesCompleted: 0,
      endDate: "2023-07-28",
      reason: "Scheduling conflicts"
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="completed" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="withdrawn">Withdrawn</TabsTrigger>
        </TabsList>
        
        <TabsContent value="completed" className="space-y-6">
          {completedMentorships.map(mentorship => (
            <Card key={mentorship.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={mentorship.menteeImage} 
                        alt={mentorship.menteeName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{mentorship.menteeName}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {mentorship.topic}
                        </Badge>
                        <Badge variant="outline" className="bg-muted">
                          <Clock className="h-3 w-3 mr-1" />
                          {mentorship.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-amber-500 flex items-center">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span className="ml-1 font-medium">{mentorship.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-5">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-muted/50 p-3 rounded-md flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Sessions Completed</p>
                      <p className="font-medium">{mentorship.sessionsCompleted}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Tasks Completed</p>
                      <p className="font-medium">{mentorship.tasksCompleted}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Courses Completed</p>
                      <p className="font-medium">{mentorship.coursesCompleted}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Mentee Feedback:</p>
                  <p className="text-sm italic">"{mentorship.feedback}"</p>
                </div>
                
                <div className="flex flex-wrap justify-end gap-3">
                  <Button variant="outline" className="gap-2" disabled>
                    <Download className="h-4 w-4" />
                    Materials
                  </Button>
                  
                  {mentorship.hasCertificate && (
                    <Button className="gap-2">
                      <Award className="h-4 w-4" />
                      Certificate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="withdrawn" className="space-y-6">
          {withdrawnMentorships.map(mentorship => (
            <Card key={mentorship.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={mentorship.menteeImage} 
                        alt={mentorship.menteeName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{mentorship.menteeName}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {mentorship.topic}
                        </Badge>
                        <Badge variant="outline" className="bg-muted">
                          <Clock className="h-3 w-3 mr-1" />
                          {mentorship.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-5">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-muted/50 p-3 rounded-md flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Sessions Completed</p>
                      <p className="font-medium">{mentorship.sessionsCompleted}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Tasks Completed</p>
                      <p className="font-medium">{mentorship.tasksCompleted}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Courses Completed</p>
                      <p className="font-medium">{mentorship.coursesCompleted}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Withdrawal Reason:</p>
                  <p className="text-sm italic">{mentorship.reason}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorshipHistory;
