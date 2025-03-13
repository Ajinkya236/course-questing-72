
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import CoursesTab from './my-learning/CoursesTab';
import LearningGoalsTab from './my-learning/LearningGoalsTab';
import BadgesTab from './my-learning/BadgesTab';
import RewardsTab from './my-learning/RewardsTab';

interface MyLearningProps {
  teamMemberId?: string;
}

const MyLearning: React.FC<MyLearningProps> = ({ teamMemberId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { tab } = useParams();
  const tabFromUrl = tab || searchParams.get('tab') || 'courses';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const params = useParams();
  
  // Use the teamMemberId from props or from URL params
  const memberId = teamMemberId || params.memberId;
  
  // Update active tab when URL params change
  useEffect(() => {
    if (tab || searchParams.get('tab')) {
      setActiveTab(tab || searchParams.get('tab') || 'courses');
    }
  }, [tab, searchParams]);

  // Default to 'in-progress' status for courses if no status is specified
  useEffect(() => {
    if (activeTab === 'courses' && !searchParams.get('status')) {
      if (memberId) {
        navigate(`/my-team/member/${memberId}/learning?tab=courses&status=in-progress`, { replace: true });
      } else {
        navigate('/my-learning?tab=courses&status=in-progress', { replace: true });
      }
    }
  }, [activeTab, searchParams, navigate, memberId]);
  
  // Title suffix based on if viewing team member's learning
  const titleSuffix = memberId ? ` - Team Member` : '';

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    let basePath = memberId 
      ? `/my-team/member/${memberId}/${params.tab === 'goals' ? 'goals' : 'learning'}`
      : '/my-learning';
      
    if (value === 'courses') {
      navigate(`${basePath}?tab=courses&status=in-progress`);
    } else {
      navigate(`${basePath}?tab=${value}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Learning{titleSuffix} | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">
            {memberId ? "Team Member's Learning" : "My Learning"}
          </h1>
          <p className="text-muted-foreground">
            {memberId 
              ? "View and manage this team member's learning journey" 
              : "Track your progress and manage your learning journey"}
          </p>
        </div>

        <Tabs 
          defaultValue="courses" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="goals">Learning Goals</TabsTrigger>
            <TabsTrigger value="badges">Badges & Certifications</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-4">
            <CoursesTab teamMemberId={memberId} />
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-4">
            <LearningGoalsTab teamMemberId={memberId} />
          </TabsContent>
          
          <TabsContent value="badges" className="space-y-4">
            <BadgesTab teamMemberId={memberId} />
          </TabsContent>
          
          <TabsContent value="rewards" className="space-y-4">
            <RewardsTab teamMemberId={memberId} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MyLearning;
