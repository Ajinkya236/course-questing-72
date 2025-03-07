
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenteeRequests from './mentor/MenteeRequests';
import ActiveMentorships from './mentor/ActiveMentorships';
import MentorshipHistory from './mentor/MentorshipHistory';
import BannerCarousel from '@/components/BannerCarousel';
import { 
  ClipboardList, 
  Users, 
  History,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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

// Mock data for active mentees
const activeMentees = [
  { id: 1, name: "Alex Johnson", role: "Junior Developer", progress: 45 },
  { id: 2, name: "Sarah Williams", role: "Content Creator", progress: 70 },
  { id: 3, name: "Michael Chen", role: "UX Designer", progress: 30 },
  { id: 4, name: "Priya Sharma", role: "Data Analyst", progress: 60 },
  { id: 5, name: "Thomas Miller", role: "Product Manager", progress: 25 },
];

const MentorJourney = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedMentee, setSelectedMentee] = useState<number | null>(null);
  
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
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Active Mentees</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <Separator className="mb-3" />
              <div className="space-y-2">
                {activeMentees.map((mentee) => (
                  <div 
                    key={mentee.id}
                    className={`p-2 rounded-md cursor-pointer transition-colors ${selectedMentee === mentee.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
                    onClick={() => setSelectedMentee(mentee.id)}
                  >
                    <div className="font-medium text-sm">{mentee.name}</div>
                    <div className="text-xs opacity-80">{mentee.role}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-3">
              <ActiveMentorships selectedMenteeId={selectedMentee} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <MentorshipHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorJourney;
