
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  BookOpen, 
  Gift, 
  Target
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

import CoursesTab from './my-learning/CoursesTab';
import RewardsTab from './my-learning/RewardsTab';
import BadgesTab from './my-learning/BadgesTab';
import LearningGoalsTab from './my-learning/LearningGoalsTab';

const MyLearning = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('courses');
  
  // Get badge count for badge number indicator
  const badgeCount = 3; // This would come from a real data source/API
  
  // Check if we have state with a specified tab
  useEffect(() => {
    if (location.state) {
      const { activeTab: tabFromState } = location.state as { activeTab?: string, courseTab?: string };
      if (tabFromState) {
        setActiveTab(tabFromState);
      }
    }
  }, [location.state]);

  return (
    <>
      <Helmet>
        <title>My Learning | Learning Management System</title>
      </Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">My Learning</h1>
        
        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4 mb-8">
            <TabsTrigger value="courses" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Learning Goals FY 24-25</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-1">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-1 relative">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Badges</span>
              {badgeCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {badgeCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            <CoursesTab initialActiveTab={location.state?.courseTab} />
          </TabsContent>
          
          <TabsContent value="goals">
            <LearningGoalsTab />
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
