
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Star, Calendar, MessageSquare, BookOpen, Award, User, Check, Clock, FileText, MapPin, BarChart, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// This would be fetched from an API in a real application
const getMentorById = (id: string) => {
  const numId = parseInt(id);
  
  return {
    id: numId,
    name: numId === 1 ? "Dr. Sarah Johnson" : "Michael Chen",
    title: numId === 1 ? "Senior Data Scientist" : "Product Manager",
    image: numId === 1 
      ? "https://randomuser.me/api/portraits/women/44.jpg" 
      : "https://randomuser.me/api/portraits/men/32.jpg",
    rating: numId === 1 ? 4.9 : 4.8,
    reviews: numId === 1 ? 38 : 27,
    topics: numId === 1 
      ? ["Data Analysis", "Machine Learning", "Statistics"] 
      : ["Product Management", "UX Design", "Agile Methodologies"],
    experience: numId === 1 ? "10+ years" : "8 years",
    availability: numId === 1 ? "Weekdays" : "Evenings",
    languages: numId === 1 ? ["English", "Spanish"] : ["English", "Mandarin"],
    department: numId === 1 ? "Engineering" : "Product",
    location: numId === 1 ? "San Francisco, CA" : "New York, NY",
    timezone: numId === 1 ? "PST (UTC-8)" : "EST (UTC-5)",
    bio: numId === 1 
      ? "Ph.D. in Computer Science with over 10 years of experience in data science and machine learning. I've worked at leading tech companies and have mentored dozens of data scientists throughout my career. My approach to mentoring focuses on practical, hands-on guidance combined with theoretical understanding."
      : "Experienced Product Manager with a background in UX design. I've launched multiple successful products and have a passion for mentoring the next generation of product leaders. My mentoring style emphasizes user-centered thinking and strategic product decision making.",
    expertise: numId === 1 
      ? ["Statistical Analysis", "Python", "Deep Learning", "Natural Language Processing", "Computer Vision", "Research Methods"]
      : ["Product Strategy", "User Research", "Roadmapping", "Stakeholder Management", "Agile/Scrum", "Go-to-Market Planning"],
    achievements: numId === 1 
      ? ["Published 15+ research papers", "Lead Data Scientist on award-winning project", "Developed patented ML algorithm"]
      : ["Launched 5 successful products", "Increased user engagement by 200%", "Product Management certification"],
    mentoringSince: numId === 1 ? "2015" : "2018",
    totalMentees: numId === 1 ? 45 : 32,
    currentMentees: numId === 1 ? 3 : 2,
    availableSlots: [
      { day: "Monday", time: "2:00 PM - 3:00 PM" },
      { day: "Wednesday", time: "10:00 AM - 11:00 AM" },
      { day: "Friday", time: "4:00 PM - 5:00 PM" }
    ],
    testimonials: [
      { 
        id: 1, 
        author: "Alex Thompson", 
        role: "Data Analyst", 
        text: "Sarah's guidance was instrumental in helping me transition from data analysis to data science. Her practical advice and technical expertise were exactly what I needed.", 
        rating: 5 
      },
      { 
        id: 2, 
        author: "Jamie Rodriguez", 
        role: "ML Engineer", 
        text: "Working with this mentor has significantly accelerated my career growth. The mentorship was tailored to my goals and the feedback was always constructive.", 
        rating: 4 
      }
    ],
    recommendedCourses: [
      { id: 101, title: "Advanced Data Analysis", category: "Data Science" },
      { id: 102, title: "Machine Learning Fundamentals", category: "AI" },
      { id: 103, title: "Statistical Modeling", category: "Mathematics" }
    ]
  };
};

const MentorProfilePage: React.FC = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [requestMessage, setRequestMessage] = useState("");
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  
  if (!mentorId) {
    navigate('/mentoring/recommended-mentors');
    return null;
  }
  
  const mentor = getMentorById(mentorId);
  
  const handleSendRequest = () => {
    toast({
      title: "Mentorship Request Sent",
      description: `Your request has been sent to ${mentor.name}. You'll be notified when they respond.`,
    });
    setShowRequestDialog(false);
    setRequestMessage("");
  };
  
  return (
    <>
      <Helmet>
        <title>{mentor.name} | Mentor Profile</title>
      </Helmet>
      
      <div className="container mx-auto mb-10">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-2 p-2"
            onClick={() => navigate('/mentoring/recommended-mentors')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Mentor Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mentor Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h2 className="text-2xl font-bold">{mentor.name}</h2>
                <p className="text-muted-foreground mb-2">{mentor.title}</p>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {mentor.topics.map(topic => (
                    <Badge key={topic} variant="secondary">{topic}</Badge>
                  ))}
                </div>
                
                <div className="w-full text-left space-y-2 mb-6">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{mentor.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{mentor.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Timezone</p>
                      <p className="font-medium">{mentor.timezone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <p className="font-medium">{mentor.availability}</p>
                    </div>
                  </div>
                </div>
                
                <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Request Mentorship</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Mentorship</DialogTitle>
                      <DialogDescription>
                        Send a message to {mentor.name} explaining what you'd like to learn and how they can help you.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Textarea 
                        placeholder="Describe your learning goals and what you'd like to gain from this mentorship..."
                        className="min-h-[150px]"
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowRequestDialog(false)}>Cancel</Button>
                      <Button onClick={handleSendRequest}>Send Request</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          
          {/* Mentor Details */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="expertise">Expertise & Experience</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>About {mentor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 leading-relaxed">{mentor.bio}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Mentoring Experience</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Mentoring since:</span>
                            <span className="font-medium">{mentor.mentoringSince}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total mentees:</span>
                            <span className="font-medium">{mentor.totalMentees}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Current mentees:</span>
                            <span className="font-medium">{mentor.currentMentees}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {mentor.languages.map(language => (
                            <Badge key={language} variant="outline">{language}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="text-lg font-medium mb-4">Key Achievements</h3>
                    <ul className="space-y-2">
                      {mentor.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="text-lg font-medium mb-4">Recommended Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mentor.recommendedCourses.map(course => (
                        <Card key={course.id} className="bg-secondary/10">
                          <CardContent className="p-4 flex items-start gap-3">
                            <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">{course.category}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="expertise">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                    <CardDescription>
                      Specific skills and knowledge areas where {mentor.name} can provide guidance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mentor.expertise.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="text-lg font-medium mb-4">Mentoring Approach</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-medium">1-on-1 Guidance</h4>
                          <p className="text-sm text-muted-foreground">Personalized advice for your specific needs</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-medium">Practical Exercises</h4>
                          <p className="text-sm text-muted-foreground">Hands-on learning with real-world examples</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <BarChart className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-medium">Progress Tracking</h4>
                          <p className="text-sm text-muted-foreground">Regular feedback and growth measurement</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Session Availability</CardTitle>
                    <CardDescription>
                      Book a mentoring session in one of these available time slots
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mentor.availableSlots.map((slot, index) => (
                        <Card key={index} className="bg-card">
                          <CardContent className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{slot.day}</p>
                                <p className="text-sm text-muted-foreground">{slot.time}</p>
                              </div>
                            </div>
                            <Button size="sm">Book Session</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="bg-secondary/10 p-4 rounded-md">
                      <h3 className="font-medium flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4" />
                        Session Information
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Sessions typically last 45-60 minutes</li>
                        <li>• You can book up to 2 sessions per month</li>
                        <li>• 24-hour notice required for cancellations</li>
                        <li>• Video calls conducted via Teams or Zoom</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Mentee Testimonials</CardTitle>
                    <CardDescription>
                      Feedback from previous and current mentees
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mentor.testimonials.map(testimonial => (
                        <Card key={testimonial.id} className="bg-card">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                            <p className="italic mb-3">"{testimonial.text}"</p>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{testimonial.author}</p>
                              <span className="text-muted-foreground">•</span>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline" className="flex items-center gap-1 mx-auto">
                        <Send className="h-4 w-4" />
                        Submit Your Feedback
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorProfilePage;
