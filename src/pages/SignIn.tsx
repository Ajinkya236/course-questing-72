
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Import our components
import AuthHeader from '@/components/auth/AuthHeader';
import SignInForm, { SignInFormValues } from '@/components/auth/SignInForm';
import SignInFooter from '@/components/auth/SignInFooter';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, isAuthenticating } = useContext(AuthContext);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [attemptedRedirect, setAttemptedRedirect] = useState(false);

  // Get the intended destination from location state, or default to '/'
  const from = location.state?.from?.pathname || '/';

  console.log('SignIn page - Location state:', location.state);
  console.log('SignIn page - Redirect destination:', from);
  console.log('SignIn page - Current auth state:', { isAuthenticated: !!user, isAuthenticating });

  // If already logged in, redirect to home or previous location
  useEffect(() => {
    if (user && !attemptedRedirect) {
      console.log('User is already logged in, redirecting to:', from);
      setAttemptedRedirect(true);
      
      // Use a small timeout to ensure the redirect happens after state updates
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 10);
    }
  }, [user, navigate, from, attemptedRedirect]);

  // Set a maximum timeout for auth checking to prevent infinite loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isAuthenticating && !user && !attemptedRedirect) {
        console.log('Auth checking timeout reached, enabling sign-in form interaction');
        // We don't redirect, but we ensure the user can interact with the form
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [isAuthenticating, user, attemptedRedirect]);

  // Form submission handler
  const onSubmit = async (data: SignInFormValues) => {
    console.log('Attempting to sign in with:', data.email);
    setLoginError(null);
    
    try {
      const { error, data: authData } = await login(data.email, data.password, data.rememberMe);
      
      if (error) {
        console.error('Sign in error:', error);
        setLoginError(error.message);
        return;
      }
      
      if (authData?.user) {
        console.log('Sign in successful, user:', authData.user);
        toast({
          title: "Welcome to the Learning Portal!",
          description: "You have successfully signed in.",
        });
        // Navigate after successful login
        setAttemptedRedirect(true);
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 10);
      } else {
        console.warn('No user data returned after login');
        setLoginError("Login succeeded but no user data was returned.");
      }
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      const errorMessage = error instanceof Error ? error.message : "There was a problem signing you in.";
      setLoginError(errorMessage);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Learning Management System</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
        <div className="w-full max-w-md">
          <AuthHeader />
          
          <Card>
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
              <CardDescription>
                Enter your email to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm 
                onSubmit={onSubmit}
                isAuthenticating={isAuthenticating}
                loginError={loginError}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <SignInFooter />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignIn;
