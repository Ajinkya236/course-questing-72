
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

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
  const tabFromUrl = searchParams.get('tab') || 'courses';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const params = useParams();
  
  // Use the teamMemberId from props or from URL params
  const memberId = teamMemberId || params.memberId;
  
  // Title suffix based on if viewing team member's learning
  const titleSuffix = memberId ? ` - Team Member` : '';
  
  // Update active tab when URL params change
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Default to 'in-progress' status for courses if no status is specified
  useEffect(() => {
    if (activeTab === 'courses' && !searchParams.get('status')) {
      navigate(memberId 
        ? `/my-team/member/${memberId}/learning?tab=courses&status=in-progress`
        : `/my-learning?tab=courses&status=in-progress`, 
        { replace: true });
    }
  }, [activeTab, searchParams, navigate, memberId]);

  // Handle tab change with direct navigation
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'courses') {
      navigate(memberId 
        ? `/my-team/member/${memberId}/learning?tab=${value}&status=in-progress`
        : `/my-learning?tab=${value}&status=in-progress`);
    } else {
      navigate(memberId 
        ? `/my-team/member/${memberId}/learning?tab=${value}`
        : `/my-learning?tab=${value}`);
    }
  };

  // Handle back button click for team member view
  const handleBackClick = () => {
    navigate('/my-team');
  };

  return (
    <>
      <Helmet>
        <title>My Learning{titleSuffix} | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-6">
        {memberId && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackClick} 
            className="mb-4 -ml-2 flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to My Team
          </Button>
        )}
        
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
