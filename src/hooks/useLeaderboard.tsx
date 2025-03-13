
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';
import { UserRank, TeamRank } from '@/components/rewards/types';
import { mockUserRankings, mockTeamRankings } from '@/utils/mockData';

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
      // Use mock data for now
      let filteredRankings = [...mockUserRankings];
      
      // Apply any filters if provided
      if (filterType && filterValue) {
        filteredRankings = filteredRankings.filter(user => {
          const value = user[filterType as keyof UserRank];
          return value === filterValue;
        });
      }
      
      setUserRankings(filteredRankings);
      
      // Find current user in rankings
      if (user) {
        const currentUser = filteredRankings.find(rank => rank.id === user.id) || null;
        setCurrentUserRank(currentUser);
      }
      
      console.log('Fetched leaderboard from mock data');
      
      // Try using Supabase (will work once the database is properly set up)
      try {
        const { data, error } = await supabase
          .from('leaderboard_entries')
          .select(`
            *,
            user:profiles(*)
          `)
          .eq('period', period)
          .order('position', { ascending: true });
        
        if (!error && data && data.length > 0) {
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
                assessmentScore: 0,
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
          
          console.log('Fetched leaderboard from Supabase');
        }
      } catch (error) {
        console.log('Could not fetch from Supabase, using mock data');
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
      // Use mock team rankings
      setTeamRankings(mockTeamRankings);
      
      console.log('Fetched team rankings from mock data');
      
      // In the future, update this to use actual Supabase data
    } catch (error: any) {
      console.error('Error fetching team rankings:', error);
      toast({
        title: 'Failed to load team rankings',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
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
