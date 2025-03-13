
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import CoursesTab from './my-learning/CoursesTab';
import LearningGoalsTab from './my-learning/LearningGoalsTab';
import BadgesTab from './my-learning/BadgesTab';
import RewardsTab from './my-learning/RewardsTab';

interface MyLearningProps {
  teamMemberId?: string;
  tab?: string;
}

const MyLearning: React.FC<MyLearningProps> = ({ teamMemberId, tab: propTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { tab } = useParams();
  const tabFromUrl = tab || searchParams.get('tab') || propTab || 'courses';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const params = useParams();
  
  // Use the teamMemberId from props or from URL params
  const memberId = teamMemberId || params.memberId;
  
  // Update active tab when URL params change
  useEffect(() => {
    const newTab = tab || searchParams.get('tab') || propTab || 'courses';
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [tab, searchParams, propTab, activeTab]);

  // Default to 'in-progress' status for courses if no status is specified
  useEffect(() => {
    if (activeTab === 'courses' && !searchParams.get('status') && !location.pathname.includes('goals')) {
      if (memberId) {
        navigate(`/my-team/member/${memberId}/learning?tab=courses&status=in-progress`, { replace: true });
      } else {
        navigate('/my-learning?tab=courses&status=in-progress', { replace: true });
      }
    }
  }, [activeTab, searchParams, navigate, memberId, location.pathname]);
  
  // Title suffix based on if viewing team member's learning
  const titleSuffix = memberId ? ` - Team Member` : '';

  // Handle tab changes - Fixed to ensure proper navigation
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    let basePath = memberId 
      ? `/my-team/member/${memberId}/learning`
      : '/my-learning';
    
    // Special handling for goals tab when viewing team member
    if (value === 'goals' && memberId) {
      navigate(`/my-team/member/${memberId}/goals?tab=goals`);
      return;
    }
      
    // Direct navigation to the appropriate tab
    if (value === 'courses') {
      navigate(`${basePath}?tab=${value}&status=in-progress`);
    } else {
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

  // Determine if we're in goals view mode
  const isGoalsView = location.pathname.includes('goals') || params.tab === 'goals' || propTab === 'goals';

  // Render different content based on whether we're viewing a team member's learning or goals
  const renderContent = () => {
    // For team member's goals view
    if (memberId && isGoalsView) {
      return <LearningGoalsTab teamMemberId={memberId} />;
    }
    
    // For team member's learning view (courses only)
    if (memberId) {
      return <CoursesTab teamMemberId={memberId} />;
    }
    
    // For personal learning view (with tabs)
    return (
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
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {isGoalsView && memberId 
            ? "Team Member's Learning Goals" 
            : memberId 
              ? "Team Member's Learning" 
              : `My Learning${titleSuffix}`}
        </title>
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
            {isGoalsView && memberId 
              ? "Team Member's Learning Goals" 
              : memberId 
                ? "Team Member's Learning" 
                : "My Learning"}
          </h1>
          <p className="text-muted-foreground">
            {isGoalsView && memberId 
              ? "View and manage this team member's learning goals" 
              : memberId 
                ? "View and manage this team member's learning journey" 
                : "Track your progress and manage your learning journey"}
          </p>
        </div>

        {renderContent()}
      </div>
    </>
  );
};

export default MyLearning;
