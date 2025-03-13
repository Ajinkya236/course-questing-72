
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio: string;
  jobTitle: string;
  department: string;
  role: string;
  experiencePoints: number;
  streakDays: number;
  lastActive: string;
  skills: { name: string; proficiency: number; target: number }[];
  achievements: { name: string; date: string; description: string }[];
}

export function useUserProfile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  // Fetch profile data
  const fetchProfile = async (userId?: string) => {
    // Use provided userId or fall back to current user
    const profileId = userId || user?.id;
    
    if (!profileId) return;
    
    setIsLoading(true);
    
    try {
      // Fetch the profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single();
      
      if (profileError) throw profileError;
      
      // Fetch user skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('user_skills')
        .select(`
          proficiency_level,
          target_level,
          skill:skills(name)
        `)
        .eq('user_id', profileId);
      
      if (skillsError) throw skillsError;
      
      // Format the skills data
      const formattedSkills = skillsData.map(item => ({
        name: (item.skill as any)?.name || 'Unnamed Skill',
        proficiency: item.proficiency_level,
        target: item.target_level
      }));
      
      // Create the user profile object
      const userProfile: UserProfile = {
        id: profileData.id,
        firstName: profileData.first_name || '',
        lastName: profileData.last_name || '',
        avatarUrl: profileData.avatar_url || '',
        bio: profileData.bio || '',
        jobTitle: profileData.job_title || '',
        department: profileData.department || '',
        role: profileData.role || '',
        experiencePoints: profileData.experience_points || 0,
        streakDays: profileData.streak_days || 0,
        lastActive: profileData.last_active || '',
        skills: formattedSkills,
        achievements: profileData.achievements || []
      };
      
      setProfile(userProfile);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Failed to load profile',
        description: error.message || 'An error occurred while loading profile data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update profile data
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      // Map data to database format
      const profileUpdate = {
        first_name: data.firstName,
        last_name: data.lastName,
        avatar_url: data.avatarUrl,
        bio: data.bio,
        job_title: data.jobTitle,
        department: data.department,
        role: data.role,
      };
      
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully'
      });
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Failed to update profile',
        description: error.message || 'An error occurred while updating your profile',
        variant: 'destructive',
      });
    }
  };
  
  // Upload avatar
  const uploadAvatar = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  };

  // Use effect to load profile when user changes
  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  return {
    profile,
    isLoading,
    fetchProfile,
    updateProfile,
    uploadAvatar
  };
}
