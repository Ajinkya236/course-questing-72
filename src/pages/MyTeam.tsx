
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, FileSpreadsheet, LineChart, BarChart, ChevronDownSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import TeamLearningActivity from '../components/TeamLearningActivity';

// Mock team data
const teamMembers = [
  {
    id: 'user1',
    name: 'Rahul Sharma',
    role: 'UI Designer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    completedCourses: 12,
    inProgressCourses: 3,
    notStartedCourses: 2,
  },
  {
    id: 'user2',
    name: 'Priya Patel',
    role: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    completedCourses: 8,
    inProgressCourses: 2,
    notStartedCourses: 5,
  },
  {
    id: 'user3',
    name: 'Amit Kumar',
    role: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    completedCourses: 15,
    inProgressCourses: 1,
    notStartedCourses: 0,
  },
  {
    id: 'user4',
    name: 'Neha Gupta',
    role: 'UX Researcher',
    avatar: 'https://i.pravatar.cc/150?img=10',
    completedCourses: 7,
    inProgressCourses: 4,
    notStartedCourses: 3,
  },
  {
    id: 'user5',
    name: 'Vivek Singh',
    role: 'Full Stack Developer',
    avatar: 'https://i.pravatar.cc/150?img=7',
    completedCourses: 20,
    inProgressCourses: 0,
    notStartedCourses: 1,
  },
];

// Training categories
const trainingCategories = [
  { id: 'self', name: 'Self-assigned', count: 18, color: 'bg-blue-500' },
  { id: 'manager', name: 'Manager-assigned', count: 12, color: 'bg-purple-500' },
  { id: 'role', name: 'Ready for Role', count: 8, color: 'bg-orange-500' },
  { id: 'leadership', name: 'Leadership', count: 5, color: 'bg-green-500' },
  { id: 'mandatory', name: 'Mandatory', count: 10, color: 'bg-red-500' },
  { id: 'special', name: 'Special Drive', count: 6, color: 'bg-yellow-500' },
];

const MyTeam: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>My Team | Learning Management System</title>
      </Helmet>
      
      <div className="container mx-auto space-y-8">
        <h1 className="text-3xl font-bold">My Team</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team learning activity chart */}
          <div className="lg:col-span-2">
            <TeamLearningActivity />
          </div>
          
          {/* Training categories */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Training Categories</CardTitle>
                <CardDescription>Course distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span>{category.name}</span>
                      </div>
                      <Badge variant="outline">{category.count} courses</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Team members section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>View your team's learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {teamMembers.map((member) => (
                  <div key={member.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-sm font-medium">{member.completedCourses}</p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{member.inProgressCourses}</p>
                            <p className="text-xs text-muted-foreground">In Progress</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{member.notStartedCourses}</p>
                            <p className="text-xs text-muted-foreground">Not Started</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/my-team/member/${member.id}/learning`)}
                          >
                            View Learning
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/my-team/member/${member.id}/goals`)}
                          >
                            View Goals
                          </Button>
                        </div>
                      </div>
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
