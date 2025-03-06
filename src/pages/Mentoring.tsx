
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenteeJourney from '@/components/mentoring/MenteeJourney';

const Mentoring = () => {
  const [activeTab, setActiveTab] = useState('mentee');

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
            <MenteeJourney />
          </TabsContent>
          
          <TabsContent value="mentor">
            <div className="p-6 border rounded-lg bg-muted/30">
              <h2 className="text-xl font-semibold mb-4">Mentor Journey</h2>
              <p>Mentor features are coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Mentoring;
