
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award, Medal, Filter, Calendar, User, Users, Building, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  position: number;
  details?: {
    assessmentScore?: number;
    engagementScore?: number;
    completionRate?: number;
  };
}

interface LeaderboardCardProps {
  users: LeaderboardUser[];
  currentUser?: LeaderboardUser;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ users, currentUser }) => {
  const [timeRange, setTimeRange] = useState("all-time");
  const [showDetails, setShowDetails] = useState(false);
  
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="font-medium text-muted-foreground">{position}</span>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Leaderboard</CardTitle>
          <Select onValueChange={(value) => setTimeRange(value)} defaultValue={timeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="flex items-center gap-2 mt-2">
          <Calendar className="h-4 w-4" />
          {timeRange === 'all-time' ? 'Showing all-time rankings' : 
           timeRange === 'this-week' ? 'Showing this week\'s rankings' :
           timeRange === 'this-month' ? 'Showing this month\'s rankings' : 
           'Showing this quarter\'s rankings'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide Details' : 'Show Score Details'}
          </Button>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Filter className="h-3 w-3" />
            <span>Filtered by points earned</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {users.slice(0, 5).map((user) => (
            <div
              key={user.id}
              className={`flex flex-col rounded-lg ${
                user.id === currentUser?.id ? "bg-primary/10" : ""
              }`}
            >
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getPositionIcon(user.position)}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="badge-glow">
                  <span className="font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {user.points.toLocaleString()} pts
                  </span>
                </div>
              </div>
              
              {showDetails && user.details && (
                <div className="bg-secondary/20 p-2 text-xs grid grid-cols-3 gap-2 rounded-b-lg">
                  {user.details.assessmentScore !== undefined && (
                    <div className="text-center">
                      <p className="text-muted-foreground">Assessment</p>
                      <p className="font-semibold">{user.details.assessmentScore}%</p>
                    </div>
                  )}
                  {user.details.engagementScore !== undefined && (
                    <div className="text-center">
                      <p className="text-muted-foreground">Engagement</p>
                      <p className="font-semibold">{user.details.engagementScore}%</p>
                    </div>
                  )}
                  {user.details.completionRate !== undefined && (
                    <div className="text-center">
                      <p className="text-muted-foreground">Completion</p>
                      <p className="font-semibold">{user.details.completionRate}%</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {currentUser && currentUser.position > 5 && (
            <>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-xs text-muted-foreground">
                    Your Ranking
                  </span>
                </div>
              </div>

              <div className="flex flex-col rounded-lg bg-primary/10">
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      <span className="font-medium text-muted-foreground">{currentUser.position}</span>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{currentUser.name}</span>
                  </div>
                  <div className="badge-glow">
                    <span className="font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {currentUser.points.toLocaleString()} pts
                    </span>
                  </div>
                </div>
                
                {showDetails && currentUser.details && (
                  <div className="bg-secondary/20 p-2 text-xs grid grid-cols-3 gap-2 rounded-b-lg">
                    {currentUser.details.assessmentScore !== undefined && (
                      <div className="text-center">
                        <p className="text-muted-foreground">Assessment</p>
                        <p className="font-semibold">{currentUser.details.assessmentScore}%</p>
                      </div>
                    )}
                    {currentUser.details.engagementScore !== undefined && (
                      <div className="text-center">
                        <p className="text-muted-foreground">Engagement</p>
                        <p className="font-semibold">{currentUser.details.engagementScore}%</p>
                      </div>
                    )}
                    {currentUser.details.completionRate !== undefined && (
                      <div className="text-center">
                        <p className="text-muted-foreground">Completion</p>
                        <p className="font-semibold">{currentUser.details.completionRate}%</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
              <ChevronRight className="h-4 w-4" />
              <span>See Full Leaderboard</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
