
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';
import { UserRank, TeamRank } from '@/components/rewards/types';

export type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all-time';

export function useLeaderboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userRankings, setUserRankings] = useState<UserRank[]>([]);
  const [teamRankings, setTeamRankings] = useState<TeamRank[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<UserRank | null>(null);
  
  // Fetch leaderboard data
  const fetchLeaderboard = async (period: LeaderboardPeriod = 'weekly', filterType?: string, filterValue?: string) => {
    setIsLoading(true);
    
    try {
      // Fetch from leaderboard_entries table
      let query = supabase
        .from('leaderboard_entries')
        .select(`
          *,
          user:profiles(*)
        `)
        .eq('period', period)
        .order('position', { ascending: true });
      
      // Apply any filters
      if (filterType && filterValue) {
        query = query.eq(filterType, filterValue);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
        const formattedRankings: UserRank[] = data.map(item => {
          const userData = item.user as any;
          return {
            id: item.user_id,
            name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'User',
            position: item.position,
            positionChange: item.position_change,
            points: item.points,
            avatar: userData.avatar_url || '',
            department: item.department,
            team: item.team,
            role: userData.role,
            details: {
              assessmentScore: 0, // These could be added to the leaderboard_entries table
              engagementScore: 0,
              completionRate: 0
            }
          };
        });
        
        setUserRankings(formattedRankings);
        
        // Find current user in rankings
        if (user) {
          const currentUser = formattedRankings.find(rank => rank.id === user.id) || null;
          setCurrentUserRank(currentUser);
        }
      }
    } catch (error: any) {
      console.error('Error fetching leaderboard:', error);
      toast({
        title: 'Failed to load leaderboard',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch team rankings
  const fetchTeamRankings = async (period: LeaderboardPeriod = 'weekly') => {
    setIsLoading(true);
    
    try {
      // This would be a more complex query in a real app
      // Here we're simulating team rankings
      const mockTeams: TeamRank[] = [
        {
          id: 'team1',
          name: 'Frontend Team',
          position: 1,
          positionChange: 2,
          points: 5430,
          avatar: '',
          memberCount: 8,
          department: 'Engineering',
          winStreak: 3,
          isCurrentUserGroup: true
        },
        {
          id: 'team2',
          name: 'Backend Team',
          position: 2,
          positionChange: -1,
          points: 5240,
          avatar: '',
          memberCount: 7,
          department: 'Engineering',
          winStreak: 0,
          isCurrentUserGroup: false
        },
        {
          id: 'team3',
          name: 'Design Team',
          position: 3,
          positionChange: -1,
          points: 4980,
          avatar: '',
          memberCount: 6,
          department: 'Design',
          winStreak: 0,
          isCurrentUserGroup: false
        },
        {
          id: 'team4',
          name: 'QA Team',
          position: 4,
          positionChange: 1,
          points: 4650,
          avatar: '',
          memberCount: 5,
          department: 'Engineering',
          winStreak: 0,
          isCurrentUserGroup: false
        },
        {
          id: 'team5',
          name: 'Product Team',
          position: 5,
          positionChange: 0,
          points: 4320,
          avatar: '',
          memberCount: 4,
          department: 'Product',
          winStreak: 0,
          isCurrentUserGroup: false
        }
      ];
      
      setTeamRankings(mockTeams);
    } catch (error: any) {
      console.error('Error fetching team rankings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userRankings,
    teamRankings,
    currentUserRank,
    isLoading,
    fetchLeaderboard,
    fetchTeamRankings
  };
}
