
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenteeRequests from './mentor/MenteeRequests';
import ActiveMentorships from './mentor/ActiveMentorships';
import MentorshipHistory from './mentor/MentorshipHistory';
import { 
  ClipboardList, 
  Users, 
  History,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MentorJourney = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Mock banner data - would be fetched from an API in a real implementation
  const banners = [
    {
      id: 1,
      title: "Effective Mentoring Practices",
      description: "Learn how to provide constructive feedback and guide your mentees to success.",
      imageUrl: "/lovable-uploads/7fa0a67a-4873-42ad-9abb-953c60322b3c.png"
    },
    {
      id: 2,
      title: "Upcoming Mentoring Webinar",
      description: "Join us for a special webinar on advanced mentoring techniques next Thursday.",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 3,
      title: "New Mentoring Resources",
      description: "Access our updated mentoring toolkit with templates and guides for effective sessions.",
      imageUrl: "/placeholder.svg"
    }
  ];

  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden mb-6">
        <div className="absolute inset-0">
          <img 
            src={banners[currentBannerIndex].imageUrl} 
            alt={banners[currentBannerIndex].title}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <CardContent className="relative z-10 p-4 flex items-center justify-between">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-8 w-8 bg-background/80" 
            onClick={prevBanner}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-center flex-1 px-6">
            <h3 className="text-lg font-semibold">{banners[currentBannerIndex].title}</h3>
            <p className="text-sm text-muted-foreground">{banners[currentBannerIndex].description}</p>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-8 w-8 bg-background/80" 
            onClick={nextBanner}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      
      <h2 className="text-xl font-semibold mb-4">My Mentor Journey</h2>
      
      <Tabs defaultValue="requests" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="requests" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Requests</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Users className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Active Mentorships</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests">
          <MenteeRequests />
        </TabsContent>
        
        <TabsContent value="active">
          <ActiveMentorships />
        </TabsContent>
        
        <TabsContent value="history">
          <MentorshipHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorJourney;
