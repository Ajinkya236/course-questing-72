
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, session, isAuthenticating } = useContext(AuthContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTimeoutReached, setLoadingTimeoutReached] = useState(false);

  useEffect(() => {
    // Log authentication status for debugging
    console.log('ProtectedRoute - Auth status:', { 
      isAuthenticated: !!user, 
      isAuthenticating,
      userId: user?.id,
      path: location.pathname
    });

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setLoadingTimeoutReached(true);
      setIsLoading(false);
    }, 3000); // 3 second timeout

    // If auth state is determined, update loading state
    if (!isAuthenticating) {
      setIsLoading(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, isAuthenticating, location.pathname]);

  // If we're still loading and haven't reached the timeout, show loading
  if (isLoading && !loadingTimeoutReached) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3 text-primary">Verifying authentication...</span>
      </div>
    );
  }

  // If we're no longer loading or timeout reached, check auth status
  if (!user) {
    console.log('User not authenticated, redirecting to sign-in from:', location.pathname);
    // Redirect to the login page, but save the current location they were
    // trying to go to so we can redirect them back after logging in
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  console.log('User authenticated, allowing access to:', location.pathname);
  return <>{children}</>;
};

export default ProtectedRoute;
