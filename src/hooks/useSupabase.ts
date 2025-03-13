
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRecommendations } from './useRecommendations';
import { useSkillsManagement } from './useSkillsManagement';
import { useCourseManagement } from './useCourseManagement';
import { useGamification } from './useGamification';
import { useDomainsAndSkills } from './useDomainsAndSkills';

/**
 * Main hook that combines all Supabase functionality
 * This maintains backward compatibility with existing code
 */
export function useSupabase() {
  const { user } = useContext(AuthContext);
  
  const recommendations = useRecommendations();
  const skillsManagement = useSkillsManagement();
  const courseManagement = useCourseManagement();
  const gamification = useGamification();
  const domainsAndSkills = useDomainsAndSkills();

  // Combine loading and error states
  const loading = 
    recommendations.loading || 
    skillsManagement.loading || 
    courseManagement.loading || 
    gamification.loading || 
    domainsAndSkills.loading;
  
  const error = 
    recommendations.error || 
    skillsManagement.error || 
    courseManagement.error || 
    gamification.error || 
    domainsAndSkills.error;

  return {
    // Core states
    loading,
    error,
    
    // Recommendations
    getRecommendations: recommendations.getRecommendations,
    
    // Skills management
    ...skillsManagement,
    
    // Course progress and bookmarks
    ...courseManagement,
    
    // Gamification
    ...gamification,
    
    // Domains and skills
    ...domainsAndSkills,
  };
}
