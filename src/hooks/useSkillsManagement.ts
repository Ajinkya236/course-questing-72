
import { useCallback } from 'react';
import { useSupabaseCore } from './useSupabaseCore';

/**
 * Hook for skills management functionality
 */
export function useSkillsManagement() {
  const { loading, error, fetchData } = useSupabaseCore();

  // Skills management
  const followSkill = useCallback(async (skillId: string) => {
    return fetchData('user-skills', 'follow', { skillId });
  }, [fetchData]);

  const unfollowSkill = useCallback(async (skillId: string) => {
    return fetchData('user-skills', 'unfollow', { skillId });
  }, [fetchData]);

  const getFollowedSkills = useCallback(async () => {
    return fetchData('user-skills', 'get-followed');
  }, [fetchData]);

  const updateSkillProficiency = useCallback(async (skillId: string, proficiency: number) => {
    return fetchData('user-skills', 'update-proficiency', { skillId, proficiency });
  }, [fetchData]);

  const getSkillProficiencies = useCallback(async () => {
    return fetchData('user-skills', 'get-proficiencies');
  }, [fetchData]);

  const getSkillGaps = useCallback(async () => {
    return fetchData('user-skills', 'get-skill-gaps');
  }, [fetchData]);

  return {
    loading,
    error,
    followSkill,
    unfollowSkill,
    getFollowedSkills,
    updateSkillProficiency,
    getSkillProficiencies,
    getSkillGaps
  };
}
