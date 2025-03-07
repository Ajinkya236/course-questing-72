
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenteeRequests from './mentor/MenteeRequests';
import ActiveMentorships from './mentor/ActiveMentorships';
import MentorshipHistory from './mentor/MentorshipHistory';
import BannerCarousel from '@/components/BannerCarousel';
import { 
  ClipboardList, 
  Users, 
  History
} from 'lucide-react';

// Mock data for the banners
const mentorBanners = [
  {
    id: 1,
    title: "Mentoring Best Practices",
    description: "Learn effective strategies to provide valuable guidance to your mentees",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },
  {
    id: 2,
    title: "Monthly Mentorship Workshops",
    description: "Join our upcoming workshops to enhance your mentoring skills",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978"
  },
  {
    id: 3,
    title: "Guide: Providing Effective Feedback",
    description: "Tips for delivering constructive and motivating feedback to mentees",
    imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca"
  }
];

const MentorJourney = () => {
  const [activeTab, setActiveTab] = useState('requests');
  
  return (
    <div className="space-y-6">
      <BannerCarousel banners={mentorBanners} smallSize={true} className="mb-4" />
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
