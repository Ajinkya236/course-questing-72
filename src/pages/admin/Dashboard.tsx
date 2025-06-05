
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Book, Activity, Users, FileText, PlusCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-archivo-black">Admin Dashboard</h1>
        <Button asChild>
          <Link to="/admin/courses/create" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Course
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-archivo-black">24</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <Book className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-archivo-black">76</div>
            <p className="text-xs text-muted-foreground">
              +15 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-archivo-black">193</div>
            <p className="text-xs text-muted-foreground">
              +32 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-archivo-black">312</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-archivo-black">Recent Courses</CardTitle>
            <CardDescription>
              Most recently created courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Data Science Fundamentals", 
                "Advanced Leadership Skills", 
                "Cloud Infrastructure Basics", 
                "Digital Marketing Strategy"
              ].map((course, i) => (
                <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>{course}</span>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/admin/courses">View All Courses</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-archivo-black">Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <Button asChild>
                <Link to="/admin/courses/create" className="flex items-center justify-between">
                  <span>Create New Course</span>
                  <PlusCircle className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/modules" className="flex items-center justify-between">
                  <span>Manage Modules</span>
                  <Book className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/activities" className="flex items-center justify-between">
                  <span>Manage Activities</span>
                  <Activity className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="#" className="flex items-center justify-between">
                  <span>Generate Reports</span>
                  <FileText className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
