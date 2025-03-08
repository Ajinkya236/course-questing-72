
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, UserCircle } from "lucide-react";

interface LeaderboardTabsProps {
  setFilterType: (value: string) => void;
  setLeaderboardType: (value: string) => void;
}

export const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({
  setFilterType,
  setLeaderboardType
}) => {
  return (
    <Tabs defaultValue="individual" className="mb-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="individual" onClick={() => setFilterType('all')}>
          <User className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Individual</span>
        </TabsTrigger>
        <TabsTrigger value="team" onClick={() => setFilterType('team')}>
          <Users className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Team</span>
        </TabsTrigger>
        <TabsTrigger value="personal" onClick={() => setLeaderboardType('relative')}>
          <UserCircle className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Personal</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
