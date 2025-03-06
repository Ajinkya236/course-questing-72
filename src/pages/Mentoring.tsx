import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog, Search, Users, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import MenteePreferences from '@/components/mentoring/mentee/MenteePreferences';
import MenteeJourney from '@/components/mentoring/MenteeJourney';
import MentorJourney from '@/components/mentoring/MentorJourney';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Mentoring = () => {
  const [activeTab, setActiveTab] = useState('mentee');
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);

  // Mock recommended mentors data
  const recommendedMentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Senior Data Scientist",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.9,
      reviews: 38,
      topics: ["Data Analysis", "Machine Learning", "Statistics"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      reviews: 27,
      topics: ["Product Management", "UX Design", "Agile Methodologies"]
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      title: "Executive Coach",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5.0,
      reviews: 42,
      topics: ["Leadership", "Communication", "Career Development"]
    },
    {
      id: 4,
      name: "James Wilson",
      title: "Software Engineering Lead",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
      rating: 4.7,
      reviews: 31,
      topics: ["Software Development", "Cloud Computing", "System Architecture"]
    },
    {
      id: 5,
      name: "Priya Patel",
      title: "Marketing Director",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4.6,
      reviews: 24,
      topics: ["Digital Marketing", "Content Strategy", "Brand Management"]
    },
    {
      id: 6,
      name: "David Lee",
      title: "UX Designer",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      rating: 4.9,
      reviews: 35,
      topics: ["UI/UX Design", "Product Design", "User Research"]
    }
  ];

  // Banner carousel data
  const bannerItems = [
    {
      id: 1,
      title: "Mentoring Excellence Program",
      description: "Join our flagship mentoring program for accelerated career growth.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      id: 2,
      title: "New: Technical Mentoring Track",
      description: "Connect with expert technical mentors in software engineering, data science, and more.",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: 3,
      title: "Leadership Development Series",
      description: "Build essential leadership skills through our structured mentoring program.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      color: "from-amber-500/20 to-orange-500/20"
    }
  ];

  const handleSendRequest = (mentorId: number) => {
    console.log(`Sending request to mentor ${mentorId}`);
    // Implementation to send request to mentor
  };

  return (
    <>
      <Helmet>
        <title>Mentoring | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Mentoring</h1>
        
        <Tabs defaultValue="mentee" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="mentee">Mentee Journey</TabsTrigger>
            <TabsTrigger value="mentor">Mentor Journey</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mentee">
            {/* Banner Carousel */}
            <div className="mb-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {bannerItems.map((item) => (
                    <CarouselItem key={item.id}>
                      <Card className={`bg-gradient-to-r ${item.color} border-0 overflow-hidden`}>
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-2/3 p-6 flex flex-col justify-center">
                            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                            <p className="text-muted-foreground">{item.description}</p>
                            <div className="mt-4">
                              <Dialog open={showPreferencesDialog} onOpenChange={setShowPreferencesDialog}>
                                <DialogTrigger asChild>
                                  <Button className="gap-2">
                                    <UserCog className="h-4 w-4" />
                                    Set Preferences
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>Mentee Preferences</DialogTitle>
                                    <DialogDescription>
                                      Configure your mentoring preferences to help us match you with the right mentors
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <MenteePreferences inDialog={true} onSave={() => setShowPreferencesDialog(false)} />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                          <div className="md:w-1/3 h-48 md:h-auto relative">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                  <CarouselPrevious className="relative -left-0 translate-y-0 h-9 w-9" />
                  <CarouselNext className="relative -right-0 translate-y-0 h-9 w-9" />
                </div>
              </Carousel>
            </div>
            
            {/* Recommended Mentors */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recommended Mentors</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    id="carousel-prev" 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-8 w-8"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    id="carousel-next" 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-8 w-8 mr-1"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="link" size="sm" className="gap-1">
                    <Search className="h-4 w-4" />
                    View All
                  </Button>
                </div>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {recommendedMentors.map(mentor => (
                    <CarouselItem key={mentor.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <Card className="overflow-hidden h-full">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center h-full">
                            <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                              <img 
                                src={mentor.image} 
                                alt={mentor.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <h3 className="font-medium">{mentor.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
                            <div className="flex items-center gap-1 mb-3">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                              <span className="text-sm font-medium">{mentor.rating}</span>
                              <span className="text-xs text-muted-foreground">({mentor.reviews} reviews)</span>
                            </div>
                            <div className="flex flex-wrap gap-1 justify-center mb-4">
                              {mentor.topics.slice(0, 2).map(topic => (
                                <span key={topic} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  {topic}
                                </span>
                              ))}
                              {mentor.topics.length > 2 && (
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                                  +{mentor.topics.length - 2}
                                </span>
                              )}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-auto w-full"
                              onClick={() => handleSendRequest(mentor.id)}
                            >
                              Send Request
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious id="recommended-prev" className="hidden" />
                <CarouselNext id="recommended-next" className="hidden" />
              </Carousel>
              
              <script dangerouslySetInnerHTML={{
                __html: `
                  document.getElementById('carousel-prev').addEventListener('click', () => {
                    document.getElementById('recommended-prev').click();
                  });
                  document.getElementById('carousel-next').addEventListener('click', () => {
                    document.getElementById('recommended-next').click();
                  });
                `
              }} />
            </div>
            
            {/* Mentee Journey */}
            <MenteeJourney />
          </TabsContent>
          
          <TabsContent value="mentor">
            <MentorJourney />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Mentoring;
