import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TeamLearningActivity from '@/components/TeamLearningActivity';

// Mock team members data
const teamMembers = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    completedCourses: 12,
    inProgressCourses: 3,
    assignedCourses: 2,
    topSkills: ['JavaScript', 'React', 'Node.js'],
    recentActivity: 'Completed "Advanced React Patterns" course'
  },
  {
    id: '2',
    name: 'Samantha Williams',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    completedCourses: 8,
    inProgressCourses: 2,
    assignedCourses: 1,
    topSkills: ['UI Design', 'User Research', 'Figma'],
    recentActivity: 'Started "Design Systems" course'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    completedCourses: 15,
    inProgressCourses: 1,
    assignedCourses: 0,
    topSkills: ['Product Strategy', 'Agile', 'User Stories'],
    recentActivity: 'Completed "Product Analytics" course'
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    role: 'Data Scientist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    completedCourses: 10,
    inProgressCourses: 2,
    assignedCourses: 3,
    topSkills: ['Python', 'Machine Learning', 'Data Visualization'],
    recentActivity: 'Started "Deep Learning Fundamentals" course'
  },
  {
    id: '5',
    name: 'David Patel',
    role: 'QA Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    completedCourses: 7,
    inProgressCourses: 1,
    assignedCourses: 2,
    topSkills: ['Test Automation', 'Selenium', 'API Testing'],
    recentActivity: 'Completed "Advanced Test Automation" course'
  },
  {
    id: '6',
    name: 'Sarah Kim',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    completedCourses: 9,
    inProgressCourses: 2,
    assignedCourses: 1,
    topSkills: ['TypeScript', 'React', 'CSS'],
    recentActivity: 'Started "Advanced CSS Techniques" course'
  }
];

// Mock learning activity data
const learningActivityData = [
  { date: '2024-01-01', coursesCompleted: 5, coursesInProgress: 10 },
  { date: '2024-01-08', coursesCompleted: 8, coursesInProgress: 12 },
  { date: '2024-01-15', coursesCompleted: 6, coursesInProgress: 15 },
  { date: '2024-01-22', coursesCompleted: 10, coursesInProgress: 18 },
  { date: '2024-01-29', coursesCompleted: 7, coursesInProgress: 20 },
  { date: '2024-02-05', coursesCompleted: 12, coursesInProgress: 22 },
  { date: '2024-02-12', coursesCompleted: 9, coursesInProgress: 25 },
];

const MyTeam = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
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
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">My Team</h1>
          <p className="text-muted-foreground">
            Manage your team's learning and development
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assign">Assign Courses</TabsTrigger>
            <TabsTrigger value="progress">Track Progress</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Team Members Section */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>View and manage your team members</CardDescription>
                  </div>
                  <div className="w-72">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search team members..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredTeamMembers.map((member) => (
                    <Card key={member.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/my-team/member/${member.id}`)}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <div className="mt-2 text-xs flex gap-4">
                            <div>
                              <span className="font-semibold">{member.completedCourses}</span> Completed
                            </div>
                            <div>
                              <span className="font-semibold">{member.inProgressCourses}</span> In Progress
                            </div>
                            <div>
                              <span className="font-semibold">{member.assignedCourses}</span> Assigned
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Team Learning Activity Graph */}
            <Card>
              <CardHeader>
                <CardTitle>Team Learning Activity</CardTitle>
                <CardDescription>Track your team's learning engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamLearningActivity />
              </CardContent>
            </Card>
            
            {/* Skills Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Team Skills Distribution</CardTitle>
                <CardDescription>Overview of skills across your team</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {/* Chart would go here */}
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Skills distribution chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assign" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assign Learning Content</CardTitle>
                <CardDescription>Assign courses, paths, and resources to your team members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Assignment interface will appear here</p>
                <Button className="mt-4">Create New Assignment</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress Tracker</CardTitle>
                <CardDescription>Monitor your team's advancement through assigned content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Progress tracking interface will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics & Reports</CardTitle>
                <CardDescription>Gain insights into your team's learning performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Reporting dashboard will appear here</p>
                <Button className="mt-4">Generate Report</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MyTeam;
