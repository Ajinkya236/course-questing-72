
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, ChevronUp, Users, User, Target, Calendar, Filter, Medal, Trophy, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

// Mock user data for leaderboard
const leaderboardUsers = [
  { id: 1, name: 'Sarah Johnson', points: 2750, avatar: '/placeholder.svg', team: 'Marketing', role: 'Content Strategist', trend: 'up', coursePoints: 950, assessmentPoints: 800, engagementPoints: 1000 },
  { id: 2, name: 'David Chen', points: 2580, avatar: '/placeholder.svg', team: 'Marketing', role: 'SEO Specialist', trend: 'down', coursePoints: 880, assessmentPoints: 750, engagementPoints: 950 },
  { id: 3, name: 'You', points: 2450, avatar: '/placeholder.svg', team: 'Marketing', role: 'Digital Marketer', trend: 'up', coursePoints: 850, assessmentPoints: 700, engagementPoints: 900, isCurrentUser: true },
  { id: 4, name: 'Priya Sharma', points: 2300, avatar: '/placeholder.svg', team: 'Marketing', role: 'Social Media Manager', trend: 'up', coursePoints: 800, assessmentPoints: 650, engagementPoints: 850 },
  { id: 5, name: 'Michael Rodriguez', points: 2100, avatar: '/placeholder.svg', team: 'Marketing', role: 'Marketing Analyst', trend: 'down', coursePoints: 750, assessmentPoints: 600, engagementPoints: 750 },
];

// Mock teams for team leaderboard
const teamLeaderboard = [
  { id: 1, name: 'Marketing Team', points: 12500, members: 5, trend: 'up', avatar: '/placeholder.svg' },
  { id: 2, name: 'Development Team', points: 11800, members: 6, trend: 'up', avatar: '/placeholder.svg' },
  { id: 3, name: 'Your Team', points: 10200, members: 4, trend: 'down', avatar: '/placeholder.svg', isCurrentTeam: true },
  { id: 4, name: 'Customer Support', points: 9500, members: 7, trend: 'up', avatar: '/placeholder.svg' },
  { id: 5, name: 'Sales Team', points: 8700, members: 5, trend: 'down', avatar: '/placeholder.svg' },
];

// Mock personal best data
const personalBestData = [
  { week: 'Week 1', points: 1800 },
  { week: 'Week 2', points: 2100 },
  { week: 'Week 3', points: 1950 },
  { week: 'Week 4', points: 2450 },
];

const LeaderboardSection: React.FC = () => {
  const navigate = useNavigate();
  const [leaderboardType, setLeaderboardType] = useState('individual');
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [groupFilter, setGroupFilter] = useState('role');
  
  // Find current user's position
  const currentUserIndex = leaderboardUsers.findIndex(user => user.isCurrentUser);
  
  // Create relative view (2 above, current user, 2 below)
  const getRelativeLeaderboard = () => {
    if (currentUserIndex === -1) return leaderboardUsers.slice(0, 5);
    
    const start = Math.max(0, currentUserIndex - 2);
    const end = Math.min(leaderboardUsers.length, currentUserIndex + 3);
    return leaderboardUsers.slice(start, end);
  };
  
  const relativeLeaderboard = getRelativeLeaderboard();
  
  // Calculate next milestone
  const nextMilestone = () => {
    if (currentUserIndex <= 0) return null;
    const pointsToNext = leaderboardUsers[currentUserIndex - 1].points - leaderboardUsers[currentUserIndex].points;
    return {
      name: leaderboardUsers[currentUserIndex - 1].name,
      points: pointsToNext
    };
  };
  
  // Get personal best progress
  const personalBestProgress = () => {
    const currentPoints = personalBestData[personalBestData.length - 1].points;
    const previousBest = Math.max(...personalBestData.slice(0, -1).map(item => item.points));
    return {
      current: currentPoints,
      previous: previousBest,
      improvement: ((currentPoints - previousBest) / previousBest) * 100
    };
  };
  
  const handleViewFullLeaderboard = () => {
    navigate('/leaderboard');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Leaderboard
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleViewFullLeaderboard}>
              View Full Leaderboard
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="individual" onValueChange={setLeaderboardType} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList className="mb-0">
                <TabsTrigger value="individual" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Individual</span>
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </TabsTrigger>
                <TabsTrigger value="personal" className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>Personal Best</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-[130px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                
                {leaderboardType !== 'personal' && (
                  <Select value={groupFilter} onValueChange={setGroupFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Group By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="role">Role</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="skill">Skill</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            
            <TabsContent value="individual" className="mt-0">
              <div className="space-y-4">
                {relativeLeaderboard.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      user.isCurrentUser ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold min-w-8 text-center">
                        {index + 1}
                        {index === 0 && <Trophy className="h-4 w-4 text-amber-500 inline ml-1" />}
                        {index === 1 && <Medal className="h-4 w-4 text-slate-400 inline ml-1" />}
                        {index === 2 && <Award className="h-4 w-4 text-amber-700 inline ml-1" />}
                      </span>
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {user.name} 
                          {user.isCurrentUser && <Badge variant="outline" className="ml-2">You</Badge>}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.role} · {user.team}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden md:block">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="gap-1">
                            <span className="text-xs">Courses: {user.coursePoints}</span>
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <span className="text-xs">Assessments: {user.assessmentPoints}</span>
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <span className="text-xs">Engagement: {user.engagementPoints}</span>
                          </Badge>
                        </div>
                      </div>
                      <p className="font-bold">
                        {user.points.toLocaleString()} pts
                        {user.trend === 'up' ? (
                          <ChevronUp className="h-4 w-4 text-green-500 inline ml-1" />
                        ) : (
                          <ChevronUp className="h-4 w-4 text-red-500 inline ml-1 rotate-180" />
                        )}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Next milestone prompt */}
                {nextMilestone() && (
                  <div className="mt-4 p-3 bg-secondary/30 rounded-lg border border-secondary/50">
                    <p className="text-sm flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>
                        <strong>Next Milestone:</strong> Earn {nextMilestone()?.points} more points to overtake {nextMilestone()?.name}!
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="mt-0">
              <div className="space-y-4">
                {teamLeaderboard.map((team, index) => (
                  <div 
                    key={team.id} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      team.isCurrentTeam ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold min-w-8 text-center">
                        {index + 1}
                        {index === 0 && <Trophy className="h-4 w-4 text-amber-500 inline ml-1" />}
                      </span>
                      <Avatar>
                        <AvatarImage src={team.avatar} alt={team.name} />
                        <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {team.name}
                          {team.isCurrentTeam && <Badge variant="outline" className="ml-2">Your Team</Badge>}
                        </p>
                        <p className="text-xs text-muted-foreground">{team.members} members</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold">
                        {team.points.toLocaleString()} pts
                        {team.trend === 'up' ? (
                          <ChevronUp className="h-4 w-4 text-green-500 inline ml-1" />
                        ) : (
                          <ChevronUp className="h-4 w-4 text-red-500 inline ml-1 rotate-180" />
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="personal" className="mt-0">
              <div className="space-y-6">
                <div className="p-4 bg-muted/20 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">Your Personal Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Current Score</span>
                        <span className="text-sm font-medium">{personalBestProgress().current} pts</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Previous Best</span>
                        <span className="text-sm font-medium">{personalBestProgress().previous} pts</span>
                      </div>
                      <Progress
                        value={(personalBestProgress().previous / personalBestProgress().current) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Your improvement</span>
                    <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                      +{personalBestProgress().improvement.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-3">Weekly Point History</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {personalBestData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-primary/10 rounded-md w-full"
                          style={{
                            height: `${(data.points / Math.max(...personalBestData.map(d => d.points))) * 100}px`,
                            minHeight: '40px'
                          }}
                        />
                        <p className="text-xs mt-1">{data.week}</p>
                        <p className="text-xs font-medium">{data.points}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardSection;
