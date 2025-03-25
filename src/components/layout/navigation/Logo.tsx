
import React from 'react';
import { NavLink } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'compact';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', className = '' }) => {
  return (
    <NavLink 
      to="/" 
      className={`text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 ${className}`}
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
        {variant === 'default' && <span className="text-foreground">EduSphere</span>}
      </span>
    </NavLink>
  );
};

export default Logo;
