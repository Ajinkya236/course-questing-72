
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavigationLinkProps {
  to: string;
  label: string;
  icon?: LucideIcon;
  activeClassName?: string;
  inactiveClassName?: string;
  onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  label,
  icon: Icon,
  activeClassName = 'bg-secondary rounded-md',
  inactiveClassName = 'text-foreground/60 hover:text-foreground',
  onClick
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-1.5 text-sm font-medium ${
        isActive ? activeClassName : inactiveClassName
      }`}
      onClick={onClick}
    >
      {Icon && <Icon className="mr-1 h-4 w-4" />}
      {label}
    </Link>
  );
};

export default NavigationLink;
