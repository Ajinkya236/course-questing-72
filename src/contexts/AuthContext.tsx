import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: Error | null }>;
  signup: (email: string, password: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  isAuthenticating: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  login: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  logout: async () => {},
  resetPassword: async () => ({ error: null }),
  isAuthenticating: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { user } = session;
          setSession(session);
          
          // Fetch user profile data
          if (user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();
              
            setUser({
              id: user.id,
              email: user.email || '',
              first_name: profile?.first_name || '',
              last_name: profile?.last_name || '',
              avatar_url: profile?.avatar_url || '',
            });
          }
        } else {
          setSession(null);
          setUser(null);
        }
      }
    );

    // Initial session check
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        
        // Fetch user profile data
        if (session.user) {
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
        }
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    setIsAuthenticating(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
        options: { 
          // If rememberMe is true, keep the session for 30 days, otherwise use default
          persistSession: rememberMe
        } 
      });
      
      if (error) {
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { error: error as Error };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsAuthenticating(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password 
      });
      
      if (error) {
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { error: error as Error };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    setIsAuthenticating(true);
    
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "Failed to log you out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsAuthenticating(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      return { error };
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
      {children}
    </AuthContext.Provider>
  );
};
