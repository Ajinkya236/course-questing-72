
import { useCallback } from 'react';
import { useSupabaseCore } from './useSupabaseCore';

/**
 * Hook for gamification functionality
 */
export function useGamification() {
  const { loading, error, fetchData } = useSupabaseCore();

  // Gamification
  const getUserPoints = useCallback(async () => {
    return fetchData('gamification', 'get-points');
  }, [fetchData]);

  const getPointsHistory = useCallback(async () => {
    return fetchData('gamification', 'get-points-history');
  }, [fetchData]);

  const awardPoints = useCallback(async (
    points: number, 
    reason: string,
    referenceType?: string,
    referenceId?: string
  ) => {
    return fetchData('gamification', 'award-points', { 
      points, 
      reason, 
      referenceType, 
      referenceId 
    });
  }, [fetchData]);

  const openMysteryBox = useCallback(async () => {
    return fetchData('gamification', 'open-mystery-box');
  }, [fetchData]);

  const spinWheel = useCallback(async () => {
    return fetchData('gamification', 'spin-wheel');
  }, [fetchData]);

  const getUserBadges = useCallback(async () => {
    return fetchData('gamification', 'get-badges');
  }, [fetchData]);

  const getRewardsHistory = useCallback(async () => {
    return fetchData('gamification', 'get-rewards-history');
  }, [fetchData]);

  const getLeaderboard = useCallback(async () => {
    return fetchData('gamification', 'get-leaderboard');
  }, [fetchData]);

  const getUserRank = useCallback(async () => {
    return fetchData('gamification', 'get-user-rank');
  }, [fetchData]);

  return {
    loading,
    error,
    getUserPoints,
    getPointsHistory,
    awardPoints,
    openMysteryBox,
    spinWheel,
    getUserBadges,
    getRewardsHistory,
    getLeaderboard,
    getUserRank
  };
}
