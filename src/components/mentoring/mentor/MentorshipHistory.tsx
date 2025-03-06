
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';

type CompletedMentorship = {
  id: number;
  menteeName: string;
  menteeTitle: string;
  menteeImage: string;
  topic: string;
  startDate: string;
  endDate: string;
  sessions: number;
  courses: number;
  rating?: number;
  feedback?: string;
};

type WithdrawnMentorship = {
  id: number;
  menteeName: string;
  menteeTitle: string;
  menteeImage: string;
  topic: string;
  startDate: string;
  endDate: string;
  reason: string;
};

const MentorshipHistory = () => {
  const completedMentorships: CompletedMentorship[] = [
    {
      id: 1,
      menteeName: "Robert Chen",
      menteeTitle: "Marketing Coordinator",
      menteeImage: "https://randomuser.me/api/portraits/men/54.jpg",
      topic: "Digital Marketing Strategy",
      startDate: "January 15, 2023",
      endDate: "May 10, 2023",
      sessions: 12,
      courses: 3,
      rating: 4.8,
      feedback: "John was an exceptional mentor who provided practical guidance on digital marketing strategies. His insights on analytics and campaign optimization were particularly valuable. I've already been able to implement several of his suggestions with great results."
    },
    {
      id: 2,
      menteeName: "Lisa Wong",
      menteeTitle: "Product Associate",
      menteeImage: "https://randomuser.me/api/portraits/women/54.jpg",
      topic: "Product Management Fundamentals",
      startDate: "February 3, 2023",
      endDate: "June 20, 2023",
      sessions: 10,
      courses: 2,
      rating: 5.0,
      feedback: "An incredible mentoring experience that exceeded my expectations. John helped me develop a structured approach to product development and stakeholder management. The resources he shared were extremely helpful, and his guidance has been instrumental in my recent promotion."
    }
  ];
  
  const withdrawnMentorships: WithdrawnMentorship[] = [
    {
      id: 1,
      menteeName: "Michael Stevens",
      menteeTitle: "Junior Developer",
      menteeImage: "https://randomuser.me/api/portraits/men/22.jpg",
      topic: "Career Development",
      startDate: "March 5, 2023",
      endDate: "April 10, 2023",
      reason: "Mentee relocated to a different country and was unable to continue due to time zone differences."
    }
  ];

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Tabs defaultValue="completed" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="withdrawn">Withdrawn</TabsTrigger>
      </TabsList>
      
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
              <CardHeader className="pb-2">
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
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Period</p>
                      <p>{mentorship.startDate} - {mentorship.endDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sessions</p>
                      <p>{mentorship.sessions} completed</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Courses</p>
                      <p>{mentorship.courses} assigned</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rating</p>
                      {mentorship.rating ? renderStarRating(mentorship.rating) : <p>Not rated</p>}
                    </div>
                  </div>
                  
                  {mentorship.feedback && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Mentee Feedback</p>
                      <p className="text-sm italic">"{mentorship.feedback.length > 150 ? `${mentorship.feedback.substring(0, 150)}...` : mentorship.feedback}"</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl">
                        <DialogHeader>
                          <DialogTitle>Mentorship Summary</DialogTitle>
                          <DialogDescription>
                            Complete details about your mentorship with {mentorship.menteeName}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="mt-4 space-y-6">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={mentorship.menteeImage} alt={mentorship.menteeName} />
                              <AvatarFallback>{mentorship.menteeName.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-medium">{mentorship.menteeName}</h3>
                              <p className="text-muted-foreground">{mentorship.menteeTitle}</p>
                              <Badge variant="outline" className="mt-1">{mentorship.topic}</Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Start Date</p>
                              <p>{mentorship.startDate}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">End Date</p>
                              <p>{mentorship.endDate}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Total Sessions</p>
                              <p>{mentorship.sessions}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Courses Assigned</p>
                              <p>{mentorship.courses}</p>
                            </div>
                          </div>
                          
                          {mentorship.rating && (
                            <div>
                              <p className="text-muted-foreground mb-2">Mentee Rating & Feedback</p>
                              {renderStarRating(mentorship.rating)}
                              {mentorship.feedback && (
                                <p className="mt-2 italic">"{mentorship.feedback}"</p>
                              )}
                            </div>
                          )}
                          
                          <div className="pt-4 text-center">
                            <p className="text-sm text-muted-foreground mb-2">Mentorship Certificate</p>
                            <Button>Download Certificate</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>
      
      <TabsContent value="withdrawn" className="space-y-4 mt-4">
        {withdrawnMentorships.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              You don't have any withdrawn mentorships.
            </CardContent>
          </Card>
        ) : (
          withdrawnMentorships.map(mentorship => (
            <Card key={mentorship.id}>
              <CardHeader className="pb-2">
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
                      </div>
                    </div>
                  </div>
                  <Badge variant="destructive">Withdrawn</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Period</p>
                      <p>{mentorship.startDate} - {mentorship.endDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Reason for Withdrawal</p>
                    <p className="text-sm">{mentorship.reason}</p>
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

export default MentorshipHistory;
