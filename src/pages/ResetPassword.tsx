
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrainCircuit, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const formSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // React Hook Form with Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Check for hash in URL
  useEffect(() => {
    const checkHash = async () => {
      const hash = window.location.hash.substring(1);
      if (!hash) {
        setError("Invalid or expired password reset link");
      }
    };

    checkHash();
  }, [navigate]);

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: data.password 
      });
      
      if (error) {
        toast({
          title: "Error resetting password",
          description: error.message,
          variant: "destructive",
        });
        setError(error.message);
        return;
      }
      
      setResetComplete(true);
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully reset.",
      });
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: "Error resetting password",
        description: "There was a problem resetting your password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | Learning Management System</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <BrainCircuit className="h-10 w-10 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Learning Portal</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Reset your password</CardTitle>
              <CardDescription>
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="text-center py-4">
                  <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-4">
                    <p className="font-medium">{error}</p>
                    <p className="text-sm mt-2">Please request a new password reset link.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Back to Forgot Password
                  </Button>
                </div>
              ) : resetComplete ? (
                <div className="text-center py-4">
                  <div className="bg-green-500/10 text-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Password Reset Complete</h3>
                  <p className="text-muted-foreground mb-4">
                    Your password has been successfully reset. You will be redirected to the sign-in page shortly.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => navigate('/sign-in')}
                  >
                    Go to Sign In
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Resetting password...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
