
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MentorDiscovery from './mentee/MentorDiscovery';
import MentorshipRequests from './mentee/MentorshipRequests';
import ActiveEngagements from './mentee/ActiveEngagements';
import MentoringHistory from './mentee/MentoringHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserCog, 
  Search, 
  ClipboardList, 
  Users, 
  History
} from 'lucide-react';

const MenteeJourney = () => {
  const [activeTab, setActiveTab] = useState('discovery');

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">My Mentee Journey</h2>
      
      <Tabs defaultValue="discovery" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="discovery" className="flex items-center gap-1">
            <Search className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Mentor Discovery</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Requests</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Users className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Active Engagements</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discovery">
          <MentorDiscovery />
        </TabsContent>
        
        <TabsContent value="requests">
          <MentorshipRequests />
        </TabsContent>
        
        <TabsContent value="active">
          <ActiveEngagements />
        </TabsContent>
        
        <TabsContent value="history">
          <MentoringHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenteeJourney;
