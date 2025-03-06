
import React, { useState } from 'react';
import { BookOpen, UserPlus, Calendar, CheckCircle, Star, Briefcase, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import MentorCard from './MentorCard';
import MenteePreferences from './MenteePreferences';

const MenteeOverview = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('find');
  
  // Mock data for mentors
  const recommendedMentors = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Senior Product Manager',
      department: 'Product',
      topics: ['Leadership', 'Product Strategy', 'Career Growth'],
      rating: 4.8,
      sessions: 24,
      availability: 'Available',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Tech Lead',
      department: 'Engineering',
      topics: ['Software Architecture', 'Team Management', 'Technical Leadership'],
      rating: 4.9,
      sessions: 36,
      availability: 'Busy until April 28',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      name: 'Michael Patel',
      role: 'Learning & Development Lead',
      department: 'HR',
      topics: ['Professional Development', 'Communication Skills', 'Presentation Skills'],
      rating: 4.7,
      sessions: 18,
      availability: 'Available',
      imageUrl: 'https://randomuser.me/api/portraits/men/64.jpg'
    }
  ];
  
  const topics = [
    'Leadership', 'Technical Skills', 'Career Growth', 'Communication', 
    'Project Management', 'Work-Life Balance', 'Skill Development', 
    'Networking', 'Industry Knowledge'
  ];

  return (
    <div>
      {showPreferences ? (
        <MenteePreferences onClose={() => setShowPreferences(false)} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold">Find Your Mentor</h2>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowPreferences(true)}
            >
              <Star className="h-4 w-4" />
              Update Preferences
            </Button>
          </div>
          
          <Tabs defaultValue={activeSubTab} onValueChange={setActiveSubTab} className="w-full mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="find" className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                Find a Mentor
              </TabsTrigger>
              <TabsTrigger value="sessions" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                My Sessions
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                My Requests
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="find">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Popular Topics</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary/10">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Recommended Mentors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {recommendedMentors.map(mentor => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
              
              <div className="text-center">
                <Button className="gap-2">
                  View All Mentors
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="sessions">
              <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <Calendar className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No Scheduled Sessions</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                  You don't have any mentoring sessions scheduled. Connect with a mentor to book your first session.
                </p>
                <Button size="lg" className="gap-2" onClick={() => setActiveSubTab('find')}>
                  <UserPlus className="h-4 w-4" />
                  Find a Mentor
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="requests">
              <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No Pending Requests</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                  You don't have any pending mentorship requests. Find a mentor and send your first request.
                </p>
                <Button size="lg" className="gap-2" onClick={() => setActiveSubTab('find')}>
                  <UserPlus className="h-4 w-4" />
                  Find a Mentor
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default MenteeOverview;
