
import React, { createContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, UserData } from './types';
import { useUserProfile } from './useUserProfile';
import { useAuthActions } from './useAuthActions';

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

  const { updateUserState } = useUserProfile();
  const authActions = useAuthActions(setIsAuthenticating);

  useEffect(() => {
    let isMounted = true;
    let authTimeoutId: NodeJS.Timeout | null = null;
    
    // Initial auth state check
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth state...');
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Initial auth session:', currentSession?.user?.id || 'No session');
        
        if (!isMounted) return;
        
        setSession(currentSession);
        
        if (currentSession?.user) {
          const userData = await updateUserState(currentSession.user);
          setUser(userData);
        } else {
          setUser(null);
        }

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

    // Create a faster failsafe timeout (3 seconds instead of 5)
    authTimeoutId = setTimeout(() => {
      if (isMounted && !authInitialized) {
        console.log('Auth initialization timeout reached (3s)');
        setIsAuthenticating(false);
        setAuthInitialized(true);
      }
    }, 3000);

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.id || 'No user');
        
        if (!isMounted) return;

        // Clear any pending timeout when auth state changes
        if (authTimeoutId) {
          clearTimeout(authTimeoutId);
          authTimeoutId = null;
        }
        
        setSession(newSession);
        setIsAuthenticating(true);
        
        try {
          switch(event) {
            case 'SIGNED_IN':
            case 'USER_UPDATED':
              if (newSession?.user) {
                const userData = await updateUserState(newSession.user);
                setUser(userData);
              }
              break;
            case 'SIGNED_OUT':
              setUser(null);
              break;
            default:
              if (newSession?.user) {
                const userData = await updateUserState(newSession.user);
                setUser(userData);
              } else {
                setUser(null);
              }
          }
        } finally {
          if (isMounted) {
            setIsAuthenticating(false);
            setAuthInitialized(true);
          }
        }
      }
    );

    return () => {
      isMounted = false;
      if (authTimeoutId) {
        clearTimeout(authTimeoutId);
      }
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user,
      session,
      ...authActions,
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
