
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  Target, 
  BarChart3, 
  Layers, 
  Search,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    coursesCompleted: 12,
    goalsAchieved: 7,
    lastActivity: "2 hours ago",
    skills: ["JavaScript", "React", "CSS"]
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "UX Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    coursesCompleted: 8,
    goalsAchieved: 5,
    lastActivity: "Yesterday",
    skills: ["UI Design", "User Research", "Figma"]
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    coursesCompleted: 15,
    goalsAchieved: 9,
    lastActivity: "3 days ago",
    skills: ["Java", "Spring", "SQL"]
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    coursesCompleted: 10,
    goalsAchieved: 4,
    lastActivity: "4 hours ago",
    skills: ["Product Strategy", "Agile", "User Stories"]
  },
  {
    id: 5,
    name: "Daniel Rodriguez",
    role: "Data Analyst",
    image: "https://randomuser.me/api/portraits/men/91.jpg",
    coursesCompleted: 13,
    goalsAchieved: 6,
    lastActivity: "1 week ago",
    skills: ["Python", "Data Visualization", "SQL"]
  }
];

const MyTeam = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  // Filter team members based on search and role filter
  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = searchTerm === '' || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = filterRole === 'all' || member.role.includes(filterRole);
    
    return matchesSearch && matchesRole;
  });

  // Navigate to view member's learning or goals
  const viewMemberLearning = (memberId: number) => {
    // In a real implementation, this would navigate to the member's learning page
    // For now, we'll just navigate to the MyLearning page
    navigate('/my-learning');
  };

  const viewMemberGoals = (memberId: number) => {
    // In a real implementation, this would navigate to the member's goals page
    // For now, we'll just navigate to the MyLearning page with the goals tab selected
    navigate('/my-learning?tab=goals');
  };

  return (
    <>
      <Helmet>
        <title>My Team | Learning Management System</title>
      </Helmet>
      
      <div className="container py-8 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">My Team</h1>
            <p className="text-muted-foreground">
              Monitor and support your team's learning journey
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="gap-1">
              <BarChart3 className="h-4 w-4" />
              Export Report
            </Button>
            <Button size="sm" className="gap-1">
              <Layers className="h-4 w-4" />
              Team Dashboard
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="members" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Team Members
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Learning Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  View and manage your team's learning progress
                </CardDescription>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by name, role, or skill..." 
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Filter by role" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Designer">Designer</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {filteredTeamMembers.map(member => (
                    <div 
                      key={member.id} 
                      className="border rounded-lg p-4 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex gap-4 mb-4 md:mb-0">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-medium text-lg">{member.name}</h3>
                            <p className="text-muted-foreground">{member.role}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Last active: {member.lastActivity}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                          <div className="flex flex-col items-center px-4 py-2 bg-muted rounded-md">
                            <span className="text-lg font-bold">{member.coursesCompleted}</span>
                            <span className="text-xs text-muted-foreground">Courses Completed</span>
                          </div>
                          
                          <div className="flex flex-col items-center px-4 py-2 bg-muted rounded-md">
                            <span className="text-lg font-bold">{member.goalsAchieved}</span>
                            <span className="text-xs text-muted-foreground">Goals Achieved</span>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1 w-full md:w-auto"
                              onClick={() => viewMemberLearning(member.id)}
                            >
                              <BookOpen className="h-4 w-4" />
                              View Learning
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1 w-full md:w-auto"
                              onClick={() => viewMemberGoals(member.id)}
                            >
                              <Target className="h-4 w-4" />
                              View Goals
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-sm text-muted-foreground mb-1">Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredTeamMembers.length} of {teamMembers.length} team members
                </div>
                
                <Button variant="link" className="gap-1">
                  View All Team Reports <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics</CardTitle>
                <CardDescription>
                  Comprehensive view of your team's learning metrics
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="p-8 text-center">
                  <div className="mb-4 text-5xl font-bold text-primary">Coming Soon</div>
                  <p className="text-muted-foreground">
                    Team learning analytics will be available in the next update
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MyTeam;
