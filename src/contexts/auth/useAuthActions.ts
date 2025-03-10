
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { AuthResponse } from './types';

export const useAuthActions = (setIsAuthenticating: (value: boolean) => void) => {
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

  return {
    login,
    signup,
    logout,
    resetPassword,
  };
};
