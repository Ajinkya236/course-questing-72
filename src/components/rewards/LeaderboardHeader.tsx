
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Calendar, User, Users, UserPlus } from 'lucide-react';

interface LeaderboardHeaderProps {
  activeLeaderboardType: string;
  setActiveLeaderboardType: (type: string) => void;
  teamLeaderboardScope: string;
  setTeamLeaderboardScope: (scope: string) => void;
  leaderboardPeriod: string;
  setLeaderboardPeriod: (period: string) => void;
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({
  activeLeaderboardType,
  setActiveLeaderboardType,
  teamLeaderboardScope,
  setTeamLeaderboardScope,
  leaderboardPeriod,
  setLeaderboardPeriod
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
      <h2 className="text-xl font-bold tracking-tight mb-2 sm:mb-0">Learning Leaderboards</h2>
      
      <div className="flex flex-wrap gap-2">
        {/* Leaderboard Type Selector */}
        <Tabs value={activeLeaderboardType} onValueChange={setActiveLeaderboardType} className="w-auto">
          <TabsList>
            <TabsTrigger value="individual" className="text-xs px-2 py-1">
              <User className="h-3 w-3 mr-1" />
              Individual
            </TabsTrigger>
            <TabsTrigger value="team" className="text-xs px-2 py-1">
              <Users className="h-3 w-3 mr-1" />
              Group
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Team Leaderboard Scope */}
        {activeLeaderboardType === 'team' && (
          <Tabs value={teamLeaderboardScope} onValueChange={setTeamLeaderboardScope} className="w-auto">
            <TabsList>
              <TabsTrigger value="intra" className="text-xs px-2 py-1">
                <UserPlus className="h-3 w-3 mr-1" />
                Intra-Group
              </TabsTrigger>
              <TabsTrigger value="inter" className="text-xs px-2 py-1">
                <Building className="h-3 w-3 mr-1" />
                Inter-Group
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        
        {/* Period Selector */}
        <Select 
          value={leaderboardPeriod} 
          onValueChange={setLeaderboardPeriod}
        >
          <SelectTrigger className="h-8 text-xs w-[110px]">
            <Calendar className="h-3 w-3 mr-1" />
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
