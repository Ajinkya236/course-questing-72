
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-background py-8 mb-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Unlock Your Potential with Personalized Learning
            </h1>
            <p className="text-muted-foreground mb-6">
              Discover tailored courses, connect with mentors, and track your progress 
              as you build skills that matter for your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Recommended for You</span>
              </Button>
              <Button variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                <span>Explore Courses</span>
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80" 
              alt="Learning together" 
              className="rounded-lg shadow-xl w-96 h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
