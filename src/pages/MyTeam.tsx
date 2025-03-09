
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import team components
import TeamLearningActivity from '@/components/TeamLearningActivity';

const MyTeam = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock team members data
  const teamMembers = [
    { id: '1', name: 'Alex Johnson', role: 'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=1', completedCourses: 12, inProgressCourses: 3 },
    { id: '2', name: 'Taylor Smith', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?img=2', completedCourses: 8, inProgressCourses: 2 },
    { id: '3', name: 'Jordan Lee', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=3', completedCourses: 15, inProgressCourses: 1 },
    { id: '4', name: 'Casey Wilson', role: 'Backend Developer', avatar: 'https://i.pravatar.cc/150?img=4', completedCourses: 10, inProgressCourses: 4 },
    { id: '5', name: 'Riley Brown', role: 'DevOps Engineer', avatar: 'https://i.pravatar.cc/150?img=5', completedCourses: 7, inProgressCourses: 2 },
    { id: '6', name: 'Jamie Garcia', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?img=6', completedCourses: 9, inProgressCourses: 3 },
  ];
  
  // Filter team members based on search query
  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>My Team | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Team</h1>
          <p className="text-muted-foreground">
            Manage your team's learning and development.
          </p>
        </div>
        
        <Tabs defaultValue="members" className="space-y-4">
          <TabsList>
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="activity">Learning Activity</TabsTrigger>
            <TabsTrigger value="insights">Team Insights</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="space-y-4">
            {/* Search bar for team members */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTeamMembers.map(member => (
                <Card key={member.id} className="overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="p-4 flex items-center space-x-4" onClick={() => navigate(`/my-learning/${member.id}`)}>
                    <img src={member.avatar} alt={member.name} className="h-12 w-12 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium">{member.completedCourses}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium">{member.inProgressCourses}</div>
                      <div className="text-xs text-muted-foreground">In Progress</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredTeamMembers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No team members found matching "{searchQuery}"</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <TeamLearningActivity />
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Team Skills Overview</h3>
              <p className="text-muted-foreground">Visualization of your team's skills distribution and proficiency will appear here.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Recommended for Your Team</h3>
              <p className="text-muted-foreground">Personalized course recommendations for your team based on current skills and goals will appear here.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MyTeam;
