
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for team learning activity
const weeklyData = [
  { name: 'Mon', courses: 12, hours: 24 },
  { name: 'Tue', courses: 19, hours: 38 },
  { name: 'Wed', courses: 15, hours: 30 },
  { name: 'Thu', courses: 8, hours: 16 },
  { name: 'Fri', courses: 17, hours: 34 },
  { name: 'Sat', courses: 3, hours: 6 },
  { name: 'Sun', courses: 2, hours: 4 },
];

const monthlyData = [
  { name: 'Week 1', courses: 45, hours: 90 },
  { name: 'Week 2', courses: 37, hours: 74 },
  { name: 'Week 3', courses: 52, hours: 104 },
  { name: 'Week 4', courses: 60, hours: 120 },
];

const quarterlyData = [
  { name: 'Jan', courses: 180, hours: 360 },
  { name: 'Feb', courses: 200, hours: 400 },
  { name: 'Mar', courses: 220, hours: 440 },
  { name: 'Apr', courses: 190, hours: 380 },
  { name: 'May', courses: 240, hours: 480 },
  { name: 'Jun', courses: 210, hours: 420 },
  { name: 'Jul', courses: 230, hours: 460 },
  { name: 'Aug', courses: 250, hours: 500 },
  { name: 'Sep', courses: 270, hours: 540 },
  { name: 'Oct', courses: 290, hours: 580 },
  { name: 'Nov', courses: 280, hours: 560 },
  { name: 'Dec', courses: 310, hours: 620 },
];

const TeamLearningActivity: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Team Learning Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip formatter={(value, name) => [value, name === 'courses' ? 'Courses Completed' : 'Learning Hours']} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="courses" name="Courses Completed" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="hours" name="Learning Hours" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-primary/10 rounded-md">
                <span className="text-3xl font-bold text-primary">76</span>
                <span className="text-sm text-muted-foreground">Total Courses</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-primary/10 rounded-md">
                <span className="text-3xl font-bold text-primary">152</span>
                <span className="text-sm text-muted-foreground">Learning Hours</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip formatter={(value, name) => [value, name === 'courses' ? 'Courses Completed' : 'Learning Hours']} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="courses" name="Courses Completed" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="hours" name="Learning Hours" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-primary/10 rounded-md">
                <span className="text-3xl font-bold text-primary">194</span>
                <span className="text-sm text-muted-foreground">Total Courses</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-primary/10 rounded-md">
                <span className="text-3xl font-bold text-primary">388</span>
                <span className="text-sm text-muted-foreground">Learning Hours</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="quarterly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={quarterlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip formatter={(value, name) => [value, name === 'courses' ? 'Courses Completed' : 'Learning Hours']} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="courses" name="Courses Completed" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="hours" name="Learning Hours" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-primary/10 rounded-md">
                <span className="text-3xl font-bold text-primary">2,670</span>
                <span className="text-sm text-muted-foreground">Total Courses</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-primary/10 rounded-md">
                <span className="text-3xl font-bold text-primary">5,340</span>
                <span className="text-sm text-muted-foreground">Learning Hours</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TeamLearningActivity;
