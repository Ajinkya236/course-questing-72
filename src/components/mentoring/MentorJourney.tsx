
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenteeRequests from './mentor/MenteeRequests';
import ActiveMentorships from './mentor/ActiveMentorships';
import MentorshipHistory from './mentor/MentorshipHistory';
import { 
  ClipboardList, 
  Users, 
  History
} from 'lucide-react';

const MentorJourney = () => {
  const [activeTab, setActiveTab] = useState('requests');
  
  return (
    <div className="space-y-6">
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
