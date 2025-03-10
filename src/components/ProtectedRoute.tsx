import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/contexts/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticating } = useContext(AuthContext);
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Log authentication status for debugging
    console.log('ProtectedRoute - Auth status:', { 
      isAuthenticated: !!user, 
      isAuthenticating,
      userId: user?.id,
      path: location.pathname
    });

    // Only set redirect after auth is complete and user is not present
    if (!isAuthenticating && !user) {
      setShouldRedirect(true);
    }
  }, [user, isAuthenticating, location.pathname]);

  // Show loading state while authenticating
  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3 text-primary">Verifying authentication...</span>
      </div>
    );
  }

  // Only redirect after we've confirmed auth is complete and user is not present
  if (shouldRedirect) {
    console.log('User not authenticated, redirecting to sign-in from:', location.pathname);
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If we have a user, render the protected content
  if (user) {
    console.log('User authenticated, allowing access to:', location.pathname);
    return <>{children}</>;
  }

  // Default loading state while we determine auth status
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      <span className="ml-3 text-primary">Loading...</span>
    </div>
  );
};

export default ProtectedRoute;
