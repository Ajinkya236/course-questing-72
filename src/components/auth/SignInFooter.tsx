
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SignInFooter: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default SignInFooter;
