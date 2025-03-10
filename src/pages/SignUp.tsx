
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { AuthContext } from '@/contexts/auth/AuthContext';
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
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { user, signup, isAuthenticating } = useContext(AuthContext);
  const [signupError, setSignupError] = useState<string | null>(null);

  // React Hook Form with Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      console.log('User is already logged in, redirecting to home');
      navigate('/');
    }
  }, [user, navigate]);

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    console.log('Attempting to sign up with email:', data.email);
    setSignupError(null);
    
    try {
      const { error, data: authData } = await signup(data.email, data.password);
      
      if (error) {
        console.error('Sign up error:', error);
        setSignupError(error.message);
        return;
      }
      
      // Supabase can return success but with empty identities, which means the user already exists
      if (!authData?.user || authData.user.identities?.length === 0) {
        const errorMsg = "This email is already registered. Please sign in instead.";
        console.warn('Sign up issue - likely existing user:', errorMsg);
        setSignupError(errorMsg);
        return;
      }
      
      console.log('Sign up successful');
      toast({
        title: "Sign up successful!",
        description: "Please check your email to verify your account.",
      });
      
      navigate('/sign-in');
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      const errorMessage = error instanceof Error ? error.message : "There was a problem with your signup.";
      setSignupError(errorMessage);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Learning Management System</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <BrainCircuit className="h-10 w-10 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Learning Portal</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Enter your details to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {signupError && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
                  {signupError}
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
                        <FormLabel>Password</FormLabel>
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
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="terms"
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
                            I agree to the terms of service and privacy policy
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isAuthenticating}>
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  By signing up, you agree to our terms of service and privacy policy.
                </p>
              </div>
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <Link to="/sign-in">Sign in</Link>
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

export default SignUp;
