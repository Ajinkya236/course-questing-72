
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { AuthContext } from '@/contexts/AuthContext';
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
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, isAuthenticating } = useContext(AuthContext);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Get the intended destination from location state, or default to '/'
  const from = location.state?.from?.pathname || '/';

  // React Hook Form with Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setLoginError(null);
    
    try {
      const { error, data: authData } = await login(data.email, data.password, data.rememberMe);
      
      if (error) {
        setLoginError(error.message);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (authData?.user) {
        toast({
          title: "Welcome to the Learning Portal!",
          description: "You have successfully signed in.",
        });
        // Navigate after successful login
        navigate(from, { replace: true });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "There was a problem signing you in.";
      setLoginError(errorMessage);
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Learning Management System</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <BrainCircuit className="h-10 w-10 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Learning Portal</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
              <CardDescription>
                Enter your email to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loginError && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
                  {loginError}
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="name@company.com" 
                            type="email" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-xs"
                            type="button"
                            onClick={() => navigate('/forgot-password')}
                          >
                            Forgot password?
                          </Button>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Remember me
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isAuthenticating}>
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  By signing in, you agree to our terms of service and privacy policy.
                </p>
              </div>
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <Link to="/sign-up">Sign up</Link>
                  </Button>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignIn;
