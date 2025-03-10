
import { supabase } from '@/integrations/supabase/client';
import { UserData } from './types';
import { User } from '@supabase/supabase-js';

export const useUserProfile = () => {
  const fetchUserProfile = async (userId: string): Promise<any> => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      return profile;
    } catch (err) {
      console.error('Unexpected error fetching user profile:', err);
      return null;
    }
  };

  const updateUserState = async (sessionUser: User | null): Promise<UserData | null> => {
    if (!sessionUser) {
      return null;
    }

    try {
      const profile = await fetchUserProfile(sessionUser.id);
      
      const userData: UserData = {
        id: sessionUser.id,
        email: sessionUser.email || '',
        first_name: profile?.first_name || '',
        last_name: profile?.last_name || '',
        avatar_url: profile?.avatar_url || '',
      };
      
      console.log('User state updated:', sessionUser.id);
      return userData;
    } catch (err) {
      console.error('Error updating user state:', err);
      // Set basic user info if profile fetch fails
      return {
        id: sessionUser.id,
        email: sessionUser.email || '',
      };
    }
  };

  return {
    fetchUserProfile,
    updateUserState,
  };
};
