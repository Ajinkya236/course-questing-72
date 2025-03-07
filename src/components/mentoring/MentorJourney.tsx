
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
  { id: 1, name: "Emma Johnson", role: "Junior Developer", lastActivity: "2 days ago" },
  { id: 2, name: "Michael Chen", role: "Marketing Specialist", lastActivity: "Yesterday" },
  { id: 3, name: "Sarah Williams", role: "Product Manager", lastActivity: "Today" },
  { id: 4, name: "David Kim", role: "Data Scientist", lastActivity: "3 days ago" },
  { id: 5, name: "Olivia Martinez", role: "UX Designer", lastActivity: "5 days ago" }
];

const MentorJourney = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedMentee, setSelectedMentee] = useState(1);
  
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
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 lg:w-72 border rounded-lg p-4 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Active Mentees</h3>
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {activeMentees.map(mentee => (
                  <div 
                    key={mentee.id}
                    onClick={() => setSelectedMentee(mentee.id)}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${selectedMentee === mentee.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-secondary'}`}
                  >
                    <div className="font-medium">{mentee.name}</div>
                    <div className="text-sm text-muted-foreground">{mentee.role}</div>
                    <div className="text-xs text-muted-foreground mt-1">Last active: {mentee.lastActivity}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              {/* Pass the selectedMentee as a regular prop instead of selectedMenteeId */}
              <ActiveMentorships selectedMentee={selectedMentee} />
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
