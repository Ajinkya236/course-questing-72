
import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, session, isAuthenticating } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    // Log authentication status for debugging
    console.log('ProtectedRoute - Auth status:', { 
      isAuthenticated: !!user, 
      isAuthenticating,
      userId: user?.id,
      path: location.pathname
    });
  }, [user, isAuthenticating, location.pathname]);

  // Show loading state while authentication status is being determined
  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3 text-primary">Verifying authentication...</span>
      </div>
    );
  }

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
