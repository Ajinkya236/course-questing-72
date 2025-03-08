
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Trophy, 
  Target, 
  BarChart,
  BookOpen,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  avatar: string;
  completedCourses: number;
  inProgressCourses: number;
  learningGoals: number;
  completedGoals: number;
  lastActive: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sofia Rodriguez',
    position: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    completedCourses: 12,
    inProgressCourses: 3,
    learningGoals: 5,
    completedGoals: 3,
    lastActive: '2 days ago'
  },
  {
    id: '2',
    name: 'James Wilson',
    position: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    completedCourses: 8,
    inProgressCourses: 2,
    learningGoals: 4,
    completedGoals: 2,
    lastActive: 'Yesterday'
  },
  {
    id: '3',
    name: 'Aisha Johnson',
    position: 'Marketing Specialist',
    avatar: 'https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    completedCourses: 15,
    inProgressCourses: 1,
    learningGoals: 6,
    completedGoals: 5,
    lastActive: 'Today'
  },
  {
    id: '4',
    name: 'Michael Chen',
    position: 'Data Analyst',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    completedCourses: 10,
    inProgressCourses: 4,
    learningGoals: 7,
    completedGoals: 4,
    lastActive: '3 days ago'
  },
  {
    id: '5',
    name: 'Elena Petrova',
    position: 'UX Researcher',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    completedCourses: 7,
    inProgressCourses: 2,
    learningGoals: 3,
    completedGoals: 2,
    lastActive: 'Today'
  }
];

const MyTeam: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewLearning = (memberId: string) => {
    navigate(`/my-team/member/${memberId}/learning`);
  };

  const handleViewGoals = (memberId: string) => {
    navigate(`/my-team/member/${memberId}/goals`);
  };

  const getTotalStats = () => {
    return teamMembers.reduce((acc, member) => {
      return {
        completedCourses: acc.completedCourses + member.completedCourses,
        inProgressCourses: acc.inProgressCourses + member.inProgressCourses,
        learningGoals: acc.learningGoals + member.learningGoals,
        completedGoals: acc.completedGoals + member.completedGoals
      };
    }, { 
      completedCourses: 0, 
      inProgressCourses: 0, 
      learningGoals: 0, 
      completedGoals: 0 
    });
  };

  const stats = getTotalStats();

  return (
    <>
      <Helmet>
        <title>My Team | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Team</h1>
            <p className="text-muted-foreground">Manage your team's learning progress and goals</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search team members..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Completed Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedCourses}</div>
                <p className="text-xs text-muted-foreground">Team total</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-500" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.inProgressCourses}</div>
                <p className="text-xs text-muted-foreground">Team total</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4 text-indigo-500" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.learningGoals}</div>
                <p className="text-xs text-muted-foreground">Team total</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-500" />
                  Completed Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedGoals}</div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((stats.completedGoals / stats.learningGoals) * 100)}% completion rate
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Team Learning Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Team Learning Activity</CardTitle>
              <CardDescription>Recent learning progress across your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 bg-muted/30 rounded-md">
                <TrendingUp className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Learning activity charts will appear here</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Team Members Section */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage individual learning progress</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {filteredTeamMembers.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No team members found</p>
                  </div>
                ) : (
                  filteredTeamMembers.map(member => (
                    <div key={member.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center w-full md:w-auto">
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="font-medium">{member.completedCourses}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">In Progress</p>
                          <p className="font-medium">{member.inProgressCourses}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Goals</p>
                          <p className="font-medium">{member.completedGoals}/{member.learningGoals}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Active</p>
                          <p className="font-medium">{member.lastActive}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <Button 
                          variant="outline" 
                          size={isMobile ? "sm" : "default"}
                          className="flex-1"
                          onClick={() => handleViewLearning(member.id)}
                        >
                          <Trophy className="h-4 w-4 mr-1" />
                          View Learning
                        </Button>
                        <Button 
                          variant="outline" 
                          size={isMobile ? "sm" : "default"}
                          className="flex-1"
                          onClick={() => handleViewGoals(member.id)}
                        >
                          <Target className="h-4 w-4 mr-1" />
                          View Goals
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Top Team Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Team Performers</CardTitle>
              <CardDescription>Team members with highest learning engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.slice(0, 3).map(member => (
                  <div key={member.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span className="font-medium">{member.completedCourses}</span>
                        <span className="text-xs text-muted-foreground">courses</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MyTeam;
