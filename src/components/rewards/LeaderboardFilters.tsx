
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Briefcase, Building, Compass, Target, Users } from 'lucide-react';

interface LeaderboardFiltersProps {
  activeLeaderboardType: string;
  leaderboardFilter: string;
  setLeaderboardFilter: (filter: string) => void;
  filterValueSelect: string;
  setFilterValueSelect: (value: string) => void;
  filterValues: string[];
}

const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  activeLeaderboardType,
  leaderboardFilter,
  setLeaderboardFilter,
  filterValueSelect,
  setFilterValueSelect,
  filterValues
}) => {
  const handleFilterClick = (filter: string) => {
    setLeaderboardFilter(filter);
    setFilterValueSelect('all');
  };
  
  return (
    <>
      {/* Filter Pills for Individual Leaderboards */}
      {activeLeaderboardType === 'individual' && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant={leaderboardFilter === 'all' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('all')}
          >
            <Users className="h-3 w-3 mr-1" /> All
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'team' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('team')}
          >
            <Users className="h-3 w-3 mr-1" /> Team
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'department' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('department')}
          >
            <BookOpen className="h-3 w-3 mr-1" /> Department
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'role' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('role')}
          >
            <Briefcase className="h-3 w-3 mr-1" /> Job Role
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'location' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('location')}
          >
            <Compass className="h-3 w-3 mr-1" /> Location
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'personal' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => setLeaderboardFilter('personal')}
          >
            <Target className="h-3 w-3 mr-1" /> Personal Best
          </Badge>
        </div>
      )}
      
      {/* Group Type Selector for Team Leaderboards */}
      {activeLeaderboardType === 'team' && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant={leaderboardFilter === 'team' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('team')}
          >
            <Users className="h-3 w-3 mr-1" /> Teams
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'department' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('department')}
          >
            <BookOpen className="h-3 w-3 mr-1" /> Departments
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'job-family' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('job-family')}
          >
            <Briefcase className="h-3 w-3 mr-1" /> Job Families
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'role' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('role')}
          >
            <Target className="h-3 w-3 mr-1" /> Roles
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'location' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('location')}
          >
            <Compass className="h-3 w-3 mr-1" /> Locations
          </Badge>
          <Badge 
            variant={leaderboardFilter === 'job-segment' ? 'default' : 'outline'} 
            className="cursor-pointer"
            onClick={() => handleFilterClick('job-segment')}
          >
            <Building className="h-3 w-3 mr-1" /> Job Segments
          </Badge>
        </div>
      )}
      
      {/* Filter Value Selector */}
      {((activeLeaderboardType === 'team' || 
         (activeLeaderboardType === 'individual' && leaderboardFilter !== 'all' && leaderboardFilter !== 'personal')) && 
         leaderboardFilter !== '') && (
        <div className="mb-4">
          <Select 
            value={filterValueSelect} 
            onValueChange={setFilterValueSelect}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder={`Select ${leaderboardFilter}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {leaderboardFilter === 'team' ? 'Teams' : 
                                         leaderboardFilter === 'department' ? 'Departments' : 
                                         leaderboardFilter === 'role' ? 'Roles' : 
                                         leaderboardFilter === 'location' ? 'Locations' : 
                                         leaderboardFilter === 'job-segment' ? 'Job Segments' : 
                                         leaderboardFilter === 'job-family' ? 'Job Families' : ''}</SelectItem>
              {filterValues.map(value => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default LeaderboardFilters;
