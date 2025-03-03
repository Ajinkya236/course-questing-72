
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Award, BookOpen, Gift, Medal, Target, ChevronRight } from 'lucide-react';

import CoursesTab from './my-learning/CoursesTab';
import RewardsTab from './my-learning/RewardsTab';
import BadgesTab from './my-learning/BadgesTab';

const MyLearning = () => {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <>
      <Helmet>
        <title>My Learning | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <h1 className="text-3xl font-bold tracking-tight mb-6">My Learning</h1>
        
        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="courses" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-1">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            <CoursesTab />
          </TabsContent>
          
          <TabsContent value="rewards">
            <RewardsTab />
          </TabsContent>
          
          <TabsContent value="badges">
            <BadgesTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MyLearning;
