
import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

interface AuthResponse {
  error: AuthError | Error | null;
  data: any;
}

interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResponse>;
  signup: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  isAuthenticating: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  login: async () => ({ error: null, data: null }),
  signup: async () => ({ error: null, data: null }),
  logout: async () => {},
  resetPassword: async () => ({ error: null, data: null }),
  isAuthenticating: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Helper function to fetch user profile
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

  // Helper function to set user state
  const updateUserState = async (sessionUser: User | null) => {
    if (!sessionUser) {
      setUser(null);
      return;
    }

    try {
      const profile = await fetchUserProfile(sessionUser.id);
      
      setUser({
        id: sessionUser.id,
        email: sessionUser.email || '',
        first_name: profile?.first_name || '',
        last_name: profile?.last_name || '',
        avatar_url: profile?.avatar_url || '',
      });
      
      console.log('User state updated:', sessionUser.id);
    } catch (err) {
      console.error('Error updating user state:', err);
      // Set basic user info if profile fetch fails
      setUser({
        id: sessionUser.id,
        email: sessionUser.email || '',
      });
    }
  };

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    
    // Initial auth state check
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth state...');
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Initial auth session:', currentSession?.user?.id || 'No session');
        
        if (!isMounted) return;
        
        setSession(currentSession);
        
        if (currentSession?.user) {
          await updateUserState(currentSession.user);
        } else {
          setUser(null);
        }

        // Only set authInitialized after we've handled the session
        setAuthInitialized(true);
        setIsAuthenticating(false);
        console.log('Auth initialization complete');
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (isMounted) {
          setUser(null);
          setSession(null);
          setAuthInitialized(true);
          setIsAuthenticating(false);
        }
      }
    };

    // Start initialization
    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.id || 'No user');
        
        if (!isMounted) return;

        // Clear any pending timeout when auth state changes
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        setSession(newSession);
        setIsAuthenticating(true);
        
        try {
          switch(event) {
            case 'SIGNED_IN':
            case 'USER_UPDATED':
              if (newSession?.user) {
                await updateUserState(newSession.user);
              }
              break;
            case 'SIGNED_OUT':
              setUser(null);
              break;
            default:
              if (newSession?.user) {
                await updateUserState(newSession.user);
              } else {
                setUser(null);
              }
          }
        } finally {
          // Always ensure we update our loading states
          if (isMounted) {
            setIsAuthenticating(false);
            setAuthInitialized(true);
          }
        }
      }
    );

    // Timeout as a fallback, but longer to allow for initial auth check
    timeoutId = setTimeout(() => {
      if (isMounted && !authInitialized) {
        console.log('Auth initialization timeout reached');
        setIsAuthenticating(false);
        setAuthInitialized(true);
      }
    }, 5000); // Increased to 5 seconds to allow more time for initial auth

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, rememberMe = false): Promise<AuthResponse> => {
    setIsAuthenticating(true);
    
    try {
      console.log('Attempting login for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password
      });
      
      if (error) {
        console.error('Login error from Supabase:', error);
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: null };
      }
      
      console.log('Login successful, user:', data?.user?.id);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      return { error: null, data };
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signup = async (email: string, password: string): Promise<AuthResponse> => {
    setIsAuthenticating(true);
    
    try {
      console.log('Attempting signup for:', email);
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password 
      });
      
      if (error) {
        console.error('Signup error from Supabase:', error);
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: null };
      }
      
      // Check for specific conditions where Supabase returns success but there's an issue
      if (!data.user || data.user.identities?.length === 0) {
        const errorMsg = "This email is already registered. Please sign in instead.";
        console.warn('Signup issue - likely existing user:', errorMsg);
        toast({
          title: "Signup Failed",
          description: errorMsg,
          variant: "destructive",
        });
        return { 
          error: new Error(errorMsg), 
          data: null 
        };
      }
      
      console.log('Signup successful, user:', data?.user?.id);
      toast({
        title: "Signup Successful",
        description: "Please check your email to verify your account.",
      });
      
      return { error: null, data };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    setIsAuthenticating(true);
    
    try {
      console.log('Attempting logout');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Logout Error",
          description: "Failed to log you out. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('Logout successful');
        setUser(null);
        setSession(null);
        toast({
          title: "Logged Out",
          description: "You have successfully logged out.",
        });
      }
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast({
        title: "Logout Error",
        description: "Failed to log you out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const resetPassword = async (email: string): Promise<AuthResponse> => {
    setIsAuthenticating(true);
    
    try {
      console.log('Attempting password reset for:', email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error('Password reset error:', error);
        toast({
          title: "Password Reset Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: null };
      }
      
      console.log('Password reset email sent');
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for the password reset link.",
      });
      return { error: null, data: { message: 'Password reset email sent' } };
    } catch (error) {
      console.error('Unexpected password reset error:', error);
      toast({
        title: "Password Reset Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      session,
      login, 
      signup,
      logout, 
      resetPassword, 
      isAuthenticating 
    }}>
      {authInitialized ? children : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
          <span className="ml-3 text-primary">Loading authentication...</span>
        </div>
      )}
    </AuthContext.Provider>
  );
};
