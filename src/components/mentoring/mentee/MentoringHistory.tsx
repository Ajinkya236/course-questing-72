
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  History, 
  Award, 
  Calendar, 
  CheckCircle,
  Star,
  Download,
  FileText,
  BookOpen
} from 'lucide-react';

// Mock data for completed engagements
const completedEngagementsData = [
  {
    id: 1,
    mentorName: "James Wilson",
    mentorTitle: "Software Engineering Lead",
    topic: "Software Development",
    startDate: "2023-06-10",
    endDate: "2023-09-15",
    duration: "3 months",
    imageUrl: "https://randomuser.me/api/portraits/men/86.jpg",
    sessionsCompleted: 8,
    tasksCompleted: 6,
    coursesCompleted: 2,
    certificate: true,
    feedback: {
      rating: 5,
      comment: "James was an excellent mentor who provided practical guidance and constructive feedback. He helped me improve my coding skills and guided me through best practices for software architecture."
    },
    mentorFeedback: "It was a pleasure working with you. You showed great dedication and made significant progress in your software development skills. Keep up the good work!"
  },
  {
    id: 2,
    mentorName: "Elena Rodriguez",
    mentorTitle: "Executive Coach",
    topic: "Leadership",
    startDate: "2023-03-05",
    endDate: "2023-05-30",
    duration: "3 months",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    sessionsCompleted: 6,
    tasksCompleted: 4,
    coursesCompleted: 1,
    certificate: true,
    feedback: {
      rating: 4,
      comment: "Elena helped me develop my leadership skills and provided valuable insights on team management. I appreciated her practical approach and real-world examples."
    },
    mentorFeedback: "You've made great strides in developing your leadership style. Your willingness to embrace feedback and implement changes shows your commitment to growth."
  }
];

const MentoringHistory = () => {
  const [completedEngagements] = useState(completedEngagementsData);
  const [selectedEngagement, setSelectedEngagement] = useState<any | null>(null);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Mentoring History
          </CardTitle>
          <CardDescription>
            Review your completed mentoring engagements and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedEngagements.length === 0 ? (
            <div className="text-center py-12">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Completed Engagements</h3>
              <p className="text-muted-foreground">You haven't completed any mentoring engagements yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {completedEngagements.map(engagement => (
                <Card key={engagement.id} className="overflow-hidden border-muted">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-1/4">
                        <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img 
                              src={engagement.imageUrl} 
                              alt={engagement.mentorName} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{engagement.mentorName}</h4>
                            <p className="text-sm text-muted-foreground">{engagement.mentorTitle}</p>
                            <Badge variant="secondary" className="mt-2">{engagement.topic}</Badge>
                            {engagement.certificate && (
                              <div className="mt-3">
                                <Dialog open={showCertificateDialog && selectedEngagement?.id === engagement.id} onOpenChange={(open) => {
                                  setShowCertificateDialog(open);
                                  if (open) setSelectedEngagement(engagement);
                                }}>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-1">
                                      <Award className="h-3.5 w-3.5" />
                                      Certificate
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Certificate of Completion</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-6">
                                      <div className="border p-8 rounded-md text-center space-y-4">
                                        <Award className="h-12 w-12 mx-auto text-primary" />
                                        <h3 className="text-xl font-bold">Certificate of Achievement</h3>
                                        <p className="text-muted-foreground">This certifies that</p>
                                        <p className="text-xl">John Doe</p>
                                        <p className="text-muted-foreground">has successfully completed</p>
                                        <p className="text-lg font-medium">{selectedEngagement?.topic} Mentorship</p>
                                        <p className="text-muted-foreground">under the guidance of</p>
                                        <p className="text-lg">{selectedEngagement?.mentorName}</p>
                                        <p className="text-sm text-muted-foreground mt-4">
                                          {selectedEngagement?.startDate} - {selectedEngagement?.endDate}
                                        </p>
                                      </div>
                                      <div className="flex justify-center mt-4">
                                        <Button className="gap-2">
                                          <Download className="h-4 w-4" />
                                          Download Certificate
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Duration</h4>
                            <p className="text-sm">
                              <Calendar className="inline-block h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {engagement.startDate} - {engagement.endDate} ({engagement.duration})
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <h4 className="text-sm font-medium mb-1">Stats</h4>
                            <div className="flex gap-3 text-sm">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                {engagement.sessionsCompleted} sessions
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                                {engagement.tasksCompleted} tasks
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                                {engagement.coursesCompleted} courses
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Your Feedback</h4>
                          <div className="bg-muted/30 p-3 rounded-md">
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < engagement.feedback.rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`} 
                                />
                              ))}
                              <span className="ml-2 text-sm font-medium">{engagement.feedback.rating}/5</span>
                            </div>
                            <p className="text-sm">{engagement.feedback.comment}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Mentor's Feedback</h4>
                          <div className="bg-primary/5 p-3 rounded-md">
                            <p className="text-sm">{engagement.mentorFeedback}</p>
                          </div>
                        </div>
                        
                        <Dialog open={showFeedbackDialog && selectedEngagement?.id === engagement.id} onOpenChange={(open) => {
                          setShowFeedbackDialog(open);
                          if (open) setSelectedEngagement(engagement);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="link" size="sm" className="mt-3">
                              View Complete Feedback
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Engagement Feedback</DialogTitle>
                            </DialogHeader>
                            <div className="py-4 space-y-6">
                              <div>
                                <h4 className="font-medium mb-2">Your Feedback on {selectedEngagement?.mentorName}</h4>
                                <div className="bg-muted/30 p-4 rounded-md">
                                  <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${i < (selectedEngagement?.feedback.rating || 0) ? 'text-amber-500 fill-amber-500' : 'text-muted'}`} 
                                      />
                                    ))}
                                    <span className="ml-2 text-sm font-medium">{selectedEngagement?.feedback.rating}/5</span>
                                  </div>
                                  <p>{selectedEngagement?.feedback.comment}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Mentor's Feedback on Your Progress</h4>
                                <div className="bg-primary/5 p-4 rounded-md">
                                  <p>{selectedEngagement?.mentorFeedback}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {completedEngagements.length > 0 && (
            <div className="flex items-center justify-center mt-8">
              <div className="flex gap-3 items-center text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>All completed engagements shown</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentoringHistory;
