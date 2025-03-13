
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for domains and skills functionality
 */
export function useDomainsAndSkills() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Domains
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

  // Skills
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
    getDomains,
    getDomain,
    getSkills,
    getSkill,
    getDomainWithSkills,
    getSkillWithCourses
  };
}
