
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <NavLink 
              to="/" 
              className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    className="fill-primary"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    className="stroke-primary"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    className="stroke-primary"
                    strokeWidth="2"
                  />
                </svg>
                <span className="text-foreground">EduSphere</span>
              </span>
            </NavLink>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empower your learning journey with our intuitive and engaging learning management system.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Homepage</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Discover</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">My Learning</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Rewards</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EduSphere. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Subscribe to our newsletter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
