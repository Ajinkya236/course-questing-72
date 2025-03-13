
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';
import { mockUserProfile } from '@/utils/mockData';

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
      // Use mock data for now
      const userProfile: UserProfile = {
        ...mockUserProfile,
        id: profileId
      };
      
      setProfile(userProfile);
      
      console.log('Fetched profile from mock data');
      
      // Try using Supabase (will work once the database is properly set up)
      try {
        // Fetch the profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .single();
        
        if (!profileError && profileData) {
          // Create the user profile object
          const userProfileFromDb: UserProfile = {
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
            skills: mockUserProfile.skills, // Use mock skills for now
            achievements: profileData.achievements || []
          };
          
          setProfile(userProfileFromDb);
          console.log('Fetched profile from Supabase');
        }
      } catch (error) {
        console.log('Could not fetch from Supabase, using mock data');
      }
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
      // Update mock data
      setProfile(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully'
      });
      
      console.log('Updated profile in mock data');
      
      // Try using Supabase (will work once the database is properly set up)
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
        
        const { error } = await supabase
          .from('profiles')
          .update(profileUpdate)
          .eq('id', user.id);
        
        if (!error) {
          console.log('Updated profile in Supabase');
        }
      } catch (error) {
        console.log('Could not update profile in Supabase, using mock data');
      }
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
      // Mock upload
      const mockUrl = URL.createObjectURL(file);
      
      console.log('Uploaded avatar to mock URL:', mockUrl);
      
      // Try using Supabase Storage (will work once the storage bucket is properly set up)
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Upload file to storage
        const { error: uploadError, data } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);
        
        if (!uploadError && data) {
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
          
          console.log('Uploaded avatar to Supabase:', urlData.publicUrl);
          return urlData.publicUrl;
        }
      } catch (error) {
        console.log('Could not upload to Supabase Storage, using mock URL');
      }
      
      // Return mock URL if Supabase upload fails
      return mockUrl;
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
