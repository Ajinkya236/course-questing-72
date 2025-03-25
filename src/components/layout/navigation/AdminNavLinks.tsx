
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, BookOpen, Compass, Headphones } from 'lucide-react';

const AdminNavLinks: React.FC = () => {
  return (
    <>
      <Button variant="ghost" asChild size="sm">
        <Link to="/admin/dashboard" className="flex items-center gap-1">
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      </Button>
      <Button variant="ghost" asChild size="sm">
        <Link to="/admin/courses" className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          <span>Courses</span>
        </Link>
      </Button>
      <Button variant="ghost" asChild size="sm">
        <Link to="/admin/modules" className="flex items-center gap-1">
          <Compass className="h-4 w-4" />
          <span>Modules</span>
        </Link>
      </Button>
      <Button variant="ghost" asChild size="sm">
        <Link to="/admin/activities" className="flex items-center gap-1">
          <Headphones className="h-4 w-4" />
          <span>Activities</span>
        </Link>
      </Button>
    </>
  );
};

export default AdminNavLinks;
