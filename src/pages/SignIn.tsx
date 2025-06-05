
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
import { Alert, AlertDescription } from '@/components/ui/alert';

// Form validation schema
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { user, login, isAuthenticating } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

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
      navigate('/');
    }
  }, [user, navigate]);

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      await login(data.email, data.password, data.rememberMe);
      
      toast({
        title: "Welcome to LearnForge Enterprise!",
        description: "You have successfully signed in.",
      });
      
      navigate('/');
    } catch (error: any) {
      setError(error.message || "Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | LearnForge Enterprise</title>
      </Helmet>
      <div className="min-h-screen flex relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-4">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-3 text-white">
                <BrainCircuit className="h-12 w-12" />
                <div className="text-center">
                  <h1 className="text-3xl font-bold">LearnForge</h1>
                  <p className="text-sm opacity-90">Enterprise Learning Platform</p>
                </div>
              </div>
            </div>
            
            <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to access your learning dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="name@company.com" 
                              type="email" 
                              className="h-11 border-gray-300 focus:border-primary"
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
                            <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-xs text-primary hover:text-primary/80"
                              type="button"
                              onClick={() => navigate('/forgot-password')}
                            >
                              Forgot password?
                            </Button>
                          </div>
                          <FormControl>
                            <Input 
                              type="password" 
                              className="h-11 border-gray-300 focus:border-primary"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-700">
                              Keep me signed in
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full h-11 text-base font-medium bg-primary hover:bg-primary/90" 
                      disabled={isAuthenticating}
                    >
                      {isAuthenticating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-0">
                <div className="text-center text-sm">
                  <p className="text-gray-600">
                    New to LearnForge?{' '}
                    <Button variant="link" className="p-0 text-primary font-medium" onClick={() => navigate('/sign-up')}>
                      Create an account
                    </Button>
                  </p>
                </div>
                <div className="text-center text-xs text-gray-500">
                  <p>
                    Secure enterprise learning platform for professional development
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
