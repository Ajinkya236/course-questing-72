
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

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
      className={cn(
        "flex items-center px-4 py-1.5 text-sm font-medium transition-all duration-300",
        isActive ? activeClassName : inactiveClassName,
        isActive ? "scale-105" : "hover:scale-105"
      )}
      onClick={onClick}
    >
      {Icon && <Icon className={cn("mr-1 h-4 w-4 transition-transform duration-300", isActive ? "text-primary" : "")} />}
      {label}
    </Link>
  );
};

export default NavigationLink;
