
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenteeJourney from '@/components/mentoring/MenteeJourney';
import MentorJourney from '@/components/mentoring/MentorJourney';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import MenteePreferencesForm from '@/components/mentoring/MenteePreferencesForm';
import MentoringDashboard from '@/components/mentoring/MentoringDashboard';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserCog } from 'lucide-react';

const Mentoring = () => {
  const [activeTab, setActiveTab] = useState('mentee');
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  const navigate = useNavigate();

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
          
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-0 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold mb-2">
                  {activeTab === 'mentee' ? 'Welcome to Your Mentee Journey' : 'Welcome to Your Mentor Journey'}
                </h2>
                <p className="text-muted-foreground">
                  {activeTab === 'mentee' 
                    ? 'Find the perfect mentor to help you achieve your learning goals'
                    : 'Share your expertise and help others grow in their careers'}
                </p>
              </div>
              
              {activeTab === 'mentee' && (
                <Dialog open={showPreferencesDialog} onOpenChange={setShowPreferencesDialog}>
                  <DialogTrigger asChild>
                    <Button className="gap-2" size="lg">
                      <UserCog className="h-4 w-4" />
                      Set Your Preferences
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Mentee Preferences</DialogTitle>
                    </DialogHeader>
                    <MenteePreferencesForm onComplete={() => setShowPreferencesDialog(false)} />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </Card>
          
          <TabsContent value="mentee">
            <MentoringDashboard />
          </TabsContent>
          
          <TabsContent value="mentor">
            <div className="p-6 border rounded-lg bg-muted/30">
              <h2 className="text-xl font-semibold mb-4">Mentor Journey</h2>
              <p className="mb-6">Mentor features are coming soon!</p>
              <MentorJourney />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Mentoring;
