
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Target, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Courses Management
            </CardTitle>
            <CardDescription>Create and manage learning courses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Add new courses, update existing courses, create course modules and activities.
            </p>
            <Button asChild>
              <Link to="/admin/courses">Manage Courses</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Target Audience
            </CardTitle>
            <CardDescription>Create audience groups and assign courses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Create audience groups based on job roles, locations, and other criteria.
            </p>
            <Button asChild>
              <Link to="/admin/target-audience">Manage Audience</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Statistics
            </CardTitle>
            <CardDescription>View learner progress and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Track user engagement, course completions, and overall platform usage.
            </p>
            <Button disabled variant="outline">
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Courses</CardTitle>
            <CardDescription>The latest courses added to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground text-center py-4">No recent courses added.</p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/admin/courses/create">Add New Course</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Target Audiences</CardTitle>
            <CardDescription>Recently created target audience groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground text-center py-4">No recent target audiences created.</p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/admin/target-audience/create">Create Target Audience</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
