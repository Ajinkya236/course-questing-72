
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3 } from "lucide-react";

interface LeaderboardFiltersProps {
  leaderboardType: string;
  setLeaderboardType: (value: string) => void;
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
  filterType: string;
  setFilterType: (value: string) => void;
  setFilterValue: (value: string) => void;
}

export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  leaderboardType,
  setLeaderboardType,
  showDetails,
  setShowDetails,
  filterType,
  setFilterType,
  setFilterValue
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
      <div className="flex gap-2">
        <Button 
          variant={leaderboardType === 'relative' ? "default" : "outline"} 
          size="sm" 
          className="text-xs" 
          onClick={() => setLeaderboardType('relative')}
        >
          Relative
        </Button>
        <Button 
          variant={leaderboardType === 'absolute' ? "default" : "outline"} 
          size="sm" 
          className="text-xs" 
          onClick={() => setLeaderboardType('absolute')}
        >
          Absolute
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs" 
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <>
              <BarChart3 className="h-3.5 w-3.5 mr-1" /> Hide Details
            </>
          ) : (
            <>
              <BarChart3 className="h-3.5 w-3.5 mr-1" /> Show Details
            </>
          )}
        </Button>
        
        <Select 
          value={filterType} 
          onValueChange={(value) => { 
            setFilterType(value); 
            setFilterValue(""); 
          }}
        >
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Filter By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="team">Team</SelectItem>
            <SelectItem value="department">Department</SelectItem>
            <SelectItem value="location">Location</SelectItem>
            <SelectItem value="role">Role</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
