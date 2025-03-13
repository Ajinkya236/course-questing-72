
import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { first_name?: string; last_name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { first_name?: string; last_name?: string; avatar_url?: string }) => Promise<void>;
  setUserActivity: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize auth state from Supabase
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
      }
      
      setSession(data.session);
      setUser(data.session?.user || null);
      setIsLoading(false);

      // If there's an active session, update last_active
      if (data.session?.user) {
        updateLastActive(data.session.user.id);
      }
    };

    fetchSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        if (currentSession?.user) {
          updateLastActive(currentSession.user.id);
        }
      }
    );

    // Update last_active every 5 minutes if user is logged in
    const activityInterval = setInterval(() => {
      if (user) {
        updateLastActive(user.id);
      }
    }, 5 * 60 * 1000);

    // Cleanup subscriptions on unmount
    return () => {
      subscription.unsubscribe();
      clearInterval(activityInterval);
    };
  }, []);

  const updateLastActive = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ last_active: new Date().toISOString() })
        .eq('id', userId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error updating last active timestamp:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      navigate('/');
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Sign in failed",
        description: authError.message || "An error occurred while signing in",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata?: { first_name?: string; last_name?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account.",
      });
      
      navigate('/sign-in');
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Sign up failed",
        description: authError.message || "An error occurred while creating your account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/sign-in');
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Sign out failed",
        description: authError.message || "An error occurred while signing out",
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for the password reset link.",
      });
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Password reset failed",
        description: authError.message || "An error occurred while sending the reset email",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProfile = async (data: { first_name?: string; last_name?: string; avatar_url?: string }) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Profile update failed",
        description: error.message || "An error occurred while updating your profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  const setUserActivity = async () => {
    if (!user) return;
    await updateLastActive(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        setUserActivity
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
