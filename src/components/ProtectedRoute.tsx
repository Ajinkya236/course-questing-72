
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/contexts/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticating } = useContext(AuthContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Debug log auth status
    console.log('ProtectedRoute - Auth status:', { 
      isAuthenticated: !!user, 
      isAuthenticating,
      userId: user?.id,
      path: location.pathname
    });

    // Set a short timeout to prevent immediate loading indicators flashing
    const timeoutId = setTimeout(() => {
      setIsLoading(isAuthenticating);
      
      // Only redirect if auth check is complete and no user is found
      if (!isAuthenticating && !user) {
        console.log('No authenticated user found, will redirect from:', location.pathname);
        setShouldRedirect(true);
      } else if (!isAuthenticating && user) {
        console.log('Authenticated user found, allowing access to:', location.pathname);
        setShouldRedirect(false);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [user, isAuthenticating, location.pathname]);

  // Handle loading state with a more optimized approach
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
          <span className="mt-4 text-primary font-medium">Verifying access...</span>
        </div>
      </div>
    );
  }

  // Redirect if authentication has finished and no user was found
  if (shouldRedirect) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If we have a user, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
