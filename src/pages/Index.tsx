
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // User is logged in, redirect to home
          navigate('/home', { replace: true });
        } else {
          // No session, toast a welcome message
          toast({
            title: "Welcome to Jio Learning",
            description: "Please sign in to access your learning resources.",
          });
          
          // Redirect to sign-in after 2 seconds
          setTimeout(() => {
            navigate('/sign-in', { replace: true });
          }, 2000);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // Fallback navigation in case of error
        navigate('/sign-in', { replace: true });
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Show loading state while checking auth
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 jio-text-gradient">Jio Learning</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Redirecting you to the right place...</p>
      </div>
    </div>
  );
};

export default Index;
