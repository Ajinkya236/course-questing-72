
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import CoursesTab from './my-learning/CoursesTab';
import LearningGoalsTab from './my-learning/LearningGoalsTab';
import BadgesTab from './my-learning/BadgesTab';
import RewardsTab from './my-learning/RewardsTab';

interface MyLearningProps {
  teamMemberId?: string;
}

const MyLearning: React.FC<MyLearningProps> = ({ teamMemberId }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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

  // Only add the status parameter for the courses tab
  useEffect(() => {
    if (activeTab === 'courses' && !searchParams.get('status')) {
      const basePath = memberId 
        ? `/my-team/member/${memberId}/learning` 
        : '/my-learning';
      
      navigate(`${basePath}?tab=courses&status=in-progress`, { replace: true });
    }
  }, [activeTab, searchParams, navigate, memberId]);
  
  // Title suffix based on if viewing team member's learning
  const titleSuffix = memberId ? ` - Team Member` : '';

  // Handle tab changes - fix navigation bug
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    const basePath = memberId 
      ? `/my-team/member/${memberId}/learning`
      : '/my-learning';
      
    if (value === 'courses') {
      navigate(`${basePath}?tab=courses&status=in-progress`);
    } else {
      // Navigate properly for non-course tabs
      navigate(`${basePath}?tab=${value}`);
    }
  };

  // Handle back button for team member view
  const handleBack = () => {
    navigate('/my-team');
  };

  // Mock user data for team member view
  const teamMemberData = memberId ? {
    name: "Alex Johnson",
    role: "Software Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  } : null;

  return (
    <>
      <Helmet>
        <title>My Learning{titleSuffix} | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Back button and user info for team member view */}
        {memberId && (
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2" 
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Team
            </Button>
            
            {teamMemberData && (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={teamMemberData.avatar} alt={teamMemberData.name} />
                </Avatar>
                <div>
                  <h3 className="font-medium">{teamMemberData.name}</h3>
                  <p className="text-sm text-muted-foreground">{teamMemberData.role}</p>
                </div>
              </div>
            )}
          </div>
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
