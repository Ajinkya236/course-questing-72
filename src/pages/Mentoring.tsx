
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import MenteeJourney from '@/components/mentoring/MenteeJourney';
import MentorJourney from '@/components/mentoring/MentorJourney';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import BannerCarousel from '@/components/BannerCarousel';
import RecommendedMentorsCarousel from '@/components/mentoring/mentee/RecommendedMentorsCarousel';

const Mentoring = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mentee');
  
  const banners = [
    {
      id: 1,
      title: "HR Update: New Mentoring Guidelines",
      description: "Learn about the updated mentoring program policies and best practices.",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Mentoring Excellence Workshop",
      description: "Join our upcoming workshop to enhance your mentoring skills - Thursday at 2 PM.",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
    },
    {
      id: 3,
      title: "Mentoring Resources Hub",
      description: "Access our updated knowledge base with templates and guides for effective mentoring.",
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Mentoring | Learning Management System</title>
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Mentoring</h1>
        
        <Tabs defaultValue="mentee" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="mentee">Mentee Journey</TabsTrigger>
            <TabsTrigger value="mentor">Mentor Journey</TabsTrigger>
          </TabsList>
          
          <Card className="mb-6 overflow-hidden">
            <BannerCarousel banners={banners} />
          </Card>
          
          <TabsContent value="mentee">
            {/* Recommended Mentors Section placed above the Mentee Journey */}
            <Card className="mb-6 overflow-visible">
              <CardContent className="p-6">
                <RecommendedMentorsCarousel 
                  selectedTopics={["Leadership", "Software Development"]}
                />
              </CardContent>
            </Card>
            
            <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Welcome to Your Mentee Journey</h2>
                  <p className="text-muted-foreground">Set your preferences, connect with mentors, and track your progress</p>
                </div>
              </CardContent>
            </Card>
            
            <MenteeJourney />
          </TabsContent>
          
          <TabsContent value="mentor">
            <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Welcome to Your Mentor Journey</h2>
                  <p className="text-muted-foreground">Set up your mentor profile, manage requests, and guide your mentees to success</p>
                </div>
              </CardContent>
            </Card>
            
            <MentorJourney />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Mentoring;
