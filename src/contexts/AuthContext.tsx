
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
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    // Initial auth state check
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial auth session:', session);
        
        setSession(session);
        
        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              first_name: profile?.first_name || '',
              last_name: profile?.last_name || '',
              avatar_url: profile?.avatar_url || '',
            });
            console.log('User profile loaded:', profile);
          } catch (err) {
            console.error('Error fetching user profile:', err);
            // Still set the basic user even if profile fetch fails
            setUser({
              id: session.user.id,
              email: session.user.email || '',
            });
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setAuthInitialized(true);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              first_name: profile?.first_name || '',
              last_name: profile?.last_name || '',
              avatar_url: profile?.avatar_url || '',
            });
          } catch (err) {
            console.error('Error fetching user profile on auth change:', err);
            // Still set the basic user even if profile fetch fails
            setUser({
              id: session.user.id,
              email: session.user.email || '',
            });
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => {
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
        return { error, data: null };
      }
      
      console.log('Login successful, data:', data);
      return { error: null, data };
    } catch (error) {
      console.error('Unexpected login error:', error);
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
        return { error, data: null };
      }
      
      console.log('Signup successful, data:', data);
      return { error: null, data };
    } catch (error) {
      console.error('Unexpected signup error:', error);
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
        return { error, data: null };
      }
      
      console.log('Password reset email sent');
      return { error: null, data: { message: 'Password reset email sent' } };
    } catch (error) {
      console.error('Unexpected password reset error:', error);
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
