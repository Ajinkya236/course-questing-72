
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, Mail, MapPin, Briefcase, Building, Users, Star, Award, Trophy, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeaderboardEnhanced from '@/components/LeaderboardEnhanced';

// Mock data for personal stats over time
const mockTimeStats = [
  { period: 'Last Month', points: 850, rank: 18, completed: 3 },
  { period: 'Two Months Ago', points: 720, rank: 22, completed: 2 },
  { period: '3 Months Ago', points: 640, rank: 25, completed: 2 },
  { period: '4 Months Ago', points: 450, rank: 31, completed: 1 },
  { period: '5 Months Ago', points: 380, rank: 35, completed: 1 },
  { period: '6 Months Ago', points: 320, rank: 38, completed: 1 },
];

// Mock leaderboard data
const mockLeaderboardUsers = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  avatar: `https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${(i % 70) + 1}.jpg`,
  points: Math.floor(10000 - i * (100 + Math.random() * 50)),
  position: i + 1,
  positionChange: i % 5 === 0 ? 2 : i % 7 === 0 ? -1 : 0,
  department: ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations'][i % 6],
  team: ['Frontend', 'Backend', 'DevOps', 'Design', 'Content', 'Support'][i % 6],
  location: ['New York', 'San Francisco', 'London', 'Tokyo', 'Singapore', 'Berlin'][i % 6],
  role: ['Developer', 'Manager', 'Director', 'VP', 'C-Level', 'Analyst'][i % 6],
  jobFamily: ['Technology', 'Business', 'Creative', 'Support', 'Leadership'][i % 5],
  details: {
    assessmentScore: Math.floor(70 + Math.random() * 30),
    engagementScore: Math.floor(60 + Math.random() * 40),
    completionRate: Math.floor(75 + Math.random() * 25)
  }
}));

// Current user is the one at position 15
const currentUser = mockLeaderboardUsers.find(user => user.position === 15);

const Profile = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>My Profile | Learning Management System</title>
      </Helmet>
      
      <div className="container py-8 mb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>Senior Developer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>Developer</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Engineering</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Frontend Team</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined: January 2022</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-6">
                <div className="text-center p-3 rounded-lg bg-secondary/20">
                  <Trophy className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                  <p className="text-xs text-muted-foreground">Rank</p>
                  <p className="font-bold">#15</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/20">
                  <Star className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Points</p>
                  <p className="font-bold">8,450</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/20">
                  <Award className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                  <p className="text-xs text-muted-foreground">Badges</p>
                  <p className="font-bold">12</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          
          {/* Leaderboard and Stats */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="leaderboard">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="leaderboard">
                  <Trophy className="h-4 w-4 mr-2" /> Leaderboard
                </TabsTrigger>
                <TabsTrigger value="personal">
                  <User className="h-4 w-4 mr-2" /> Personal Progress
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  <Award className="h-4 w-4 mr-2" /> Achievements
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="leaderboard" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Leaderboard</CardTitle>
                    <CardDescription>See how you compare to others</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LeaderboardEnhanced 
                      users={mockLeaderboardUsers.slice(0, 10)} 
                      currentUser={currentUser} 
                    />
                    <Button className="w-full mt-4" onClick={() => navigate('/leaderboard')}>
                      View Full Leaderboard
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="personal" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Progress Over Time</CardTitle>
                    <CardDescription>See how your learning journey has progressed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTimeStats.map((stat, index) => (
                        <div key={index} className="p-3 rounded-lg border flex justify-between items-center">
                          <div>
                            <p className="font-medium">{stat.period}</p>
                            <div className="flex items-center gap-6 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Trophy className="h-3 w-3" /> Rank: #{stat.rank}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3" /> Points: {stat.points}
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="h-3 w-3" /> Completed: {stat.completed}
                              </span>
                            </div>
                          </div>
                          <div className={`text-sm ${index > 0 && stat.rank < mockTimeStats[index-1].rank ? 'text-green-500' : index > 0 && stat.rank > mockTimeStats[index-1].rank ? 'text-red-500' : ''}`}>
                            {index > 0 && stat.rank < mockTimeStats[index-1].rank 
                              ? `↑${mockTimeStats[index-1].rank - stat.rank}` 
                              : index > 0 && stat.rank > mockTimeStats[index-1].rank 
                                ? `↓${stat.rank - mockTimeStats[index-1].rank}` 
                                : '-'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Achievements</CardTitle>
                    <CardDescription>Badges and rewards you've earned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-4 border rounded-lg">
                          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                            <Award className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="font-medium text-sm">Achievement {i+1}</h3>
                          <p className="text-xs text-muted-foreground mt-1">Earned 2 months ago</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-6">
                      View All Achievements
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
