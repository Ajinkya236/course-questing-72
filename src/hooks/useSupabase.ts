
import { useState, useCallback, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Course } from '@/types/course';

export function useSupabase() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Generic fetch function to avoid repetitive code
  const fetchData = useCallback(async <T>(
    functionName: string,
    action: string,
    params: Record<string, any> = {}
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { action, ...params }
      });
      
      if (error) throw new Error(error.message);
      return data as T;
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Course recommendations
  const getRecommendations = useCallback(async (
    type: 'continue_learning' | 'top_courses' | 'for_your_role' | 'followed_skills' | 'similar_learners',
    limit: number = 10,
    skillIds?: string[]
  ): Promise<Course[]> => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `get-recommendations?type=${type}&limit=${limit}`;
      
      if (skillIds && skillIds.length > 0) {
        url += `&skillIds=${skillIds.join(',')}`;
      }
      
      const { data, error } = await supabase.functions.invoke(url);
      
      if (error) throw new Error(error.message);
      return data || [];
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch recommendations",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

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

  // Course progress and bookmarks
  const bookmarkCourse = useCallback(async (courseId: string) => {
    return fetchData('course-progress', 'bookmark', { courseId });
  }, [fetchData]);

  const unbookmarkCourse = useCallback(async (courseId: string) => {
    return fetchData('course-progress', 'unbookmark', { courseId });
  }, [fetchData]);

  const getBookmarks = useCallback(async () => {
    return fetchData('course-progress', 'get-bookmarks');
  }, [fetchData]);

  const updateCourseProgress = useCallback(async (
    courseId: string, 
    progress: number, 
    position?: string,
    status?: 'not_started' | 'in_progress' | 'completed' | 'saved'
  ) => {
    return fetchData('course-progress', 'update-progress', { 
      courseId, 
      progress, 
      position, 
      status 
    });
  }, [fetchData]);

  const getCourseProgress = useCallback(async (courseId: string) => {
    return fetchData('course-progress', 'get-progress', { courseId });
  }, [fetchData]);

  const getAllProgress = useCallback(async () => {
    return fetchData('course-progress', 'get-all-progress');
  }, [fetchData]);

  const saveCourseNote = useCallback(async (courseId: string, content: string) => {
    return fetchData('course-progress', 'save-note', { courseId, content });
  }, [fetchData]);

  const getCourseNote = useCallback(async (courseId: string) => {
    return fetchData('course-progress', 'get-note', { courseId });
  }, [fetchData]);

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

  // Domains and skills
  const getDomains = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('domains-skills?action=get-domains');
      
      if (error) throw new Error(error.message);
      return data?.data || [];
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch domains",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getDomain = useCallback(async (domainId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke(
        `domains-skills?action=get-domain&domainId=${domainId}`
      );
      
      if (error) throw new Error(error.message);
      return data?.data || null;
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch domain",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSkills = useCallback(async (domainId?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      let url = 'domains-skills?action=get-skills';
      if (domainId) {
        url += `&domainId=${domainId}`;
      }
      
      const { data, error } = await supabase.functions.invoke(url);
      
      if (error) throw new Error(error.message);
      return data?.data || [];
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch skills",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getSkill = useCallback(async (skillId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke(
        `domains-skills?action=get-skill&skillId=${skillId}`
      );
      
      if (error) throw new Error(error.message);
      return data?.data || null;
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch skill",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getDomainWithSkills = useCallback(async (domainId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke(
        `domains-skills?action=get-domain-with-skills&domainId=${domainId}`
      );
      
      if (error) throw new Error(error.message);
      return data?.data || null;
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch domain with skills",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSkillWithCourses = useCallback(async (skillId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke(
        `domains-skills?action=get-skill-with-courses&skillId=${skillId}`
      );
      
      if (error) throw new Error(error.message);
      return data?.data || null;
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch skill with courses",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    
    // Recommendations
    getRecommendations,
    
    // Skills
    followSkill,
    unfollowSkill,
    getFollowedSkills,
    updateSkillProficiency,
    getSkillProficiencies,
    getSkillGaps,
    
    // Course progress
    bookmarkCourse,
    unbookmarkCourse,
    getBookmarks,
    updateCourseProgress,
    getCourseProgress,
    getAllProgress,
    saveCourseNote,
    getCourseNote,
    
    // Gamification
    getUserPoints,
    getPointsHistory,
    awardPoints,
    openMysteryBox,
    spinWheel,
    getUserBadges,
    getRewardsHistory,
    getLeaderboard,
    getUserRank,
    
    // Domains and skills
    getDomains,
    getDomain,
    getSkills,
    getSkill,
    getDomainWithSkills,
    getSkillWithCourses,
  };
}
