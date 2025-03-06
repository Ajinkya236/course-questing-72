
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog, Search, Users, Star } from 'lucide-react';
import MenteePreferences from '@/components/mentoring/mentee/MenteePreferences';
import MenteeJourney from '@/components/mentoring/MenteeJourney';
import MentorJourney from '@/components/mentoring/MentorJourney';

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
    }
  ];

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
            {/* Banner */}
            <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Welcome to Your Mentee Journey</h2>
                  <p className="text-muted-foreground">Set your preferences, connect with mentors, and track your progress</p>
                </div>
                <Dialog open={showPreferencesDialog} onOpenChange={setShowPreferencesDialog}>
                  <DialogTrigger asChild>
                    <Button className="mt-4 md:mt-0 gap-2">
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
              </CardContent>
            </Card>
            
            {/* Recommended Mentors */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recommended Mentors</h2>
                <Button variant="link" size="sm" className="gap-1">
                  <Search className="h-4 w-4" />
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedMentors.map(mentor => (
                  <Card key={mentor.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
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
                        <div className="flex flex-wrap gap-1 justify-center">
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Mentee Journey */}
            <MenteeJourney />
          </TabsContent>
          
          <TabsContent value="mentor">
            <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Welcome to Your Mentor Journey</h2>
                  <p className="text-muted-foreground">Set up your mentor profile, manage requests, and guide your mentees to success</p>
                </div>
                <Button className="mt-4 md:mt-0 gap-2" variant="outline">
                  <UserCog className="h-4 w-4" />
                  Mentor Dashboard
                </Button>
              </CardContent>
            </Card>
            
            {/* Mentor Journey */}
            <MentorJourney />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Mentoring;
