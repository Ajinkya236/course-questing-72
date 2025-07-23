
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MainNav = () => {
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/discover', label: 'Discover' },
    { href: '/my-learning', label: 'My Learning' },
    { href: '/my-team', label: 'My Team' },
    { href: '/events', label: 'Events' },
    { href: '/skills', label: 'Skills' },
    { href: '/mentoring', label: 'Mentoring' },
  ];

  return (
    <nav className="hidden md:flex items-center gap-4 lg:gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
