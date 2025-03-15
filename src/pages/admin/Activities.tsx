
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, PlusCircle, Trash, Edit, Eye } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Dummy data for activities
const dummyActivities = [
  {
    id: '1',
    title: 'Python Basics Quiz',
    type: 'Quiz',
    moduleName: 'Introduction to Python',
    courseName: 'Data Science Fundamentals',
    duration: '30 min',
    createdAt: '2023-10-16',
  },
  {
    id: '2',
    title: 'Introduction to Python Variables',
    type: 'Video',
    moduleName: 'Introduction to Python',
    courseName: 'Data Science Fundamentals',
    duration: '15 min',
    createdAt: '2023-10-17',
  },
  {
    id: '3',
    title: 'Pandas DataFrames Exercise',
    type: 'Exercise',
    moduleName: 'Data Analysis with Pandas',
    courseName: 'Data Science Fundamentals',
    duration: '45 min',
    createdAt: '2023-10-20',
  },
  {
    id: '4',
    title: 'Active Listening Techniques',
    type: 'Video',
    moduleName: 'Effective Communication',
    courseName: 'Advanced Leadership Skills',
    duration: '20 min',
    createdAt: '2023-11-12',
  },
  {
    id: '5',
    title: 'AWS EC2 Instance Setup',
    type: 'Practical Exercise',
    moduleName: 'AWS EC2 Fundamentals',
    courseName: 'Cloud Infrastructure Basics',
    duration: '60 min',
    createdAt: '2023-12-08',
  },
];

const AdminActivities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState(dummyActivities);

  const filteredActivities = activities.filter(activity => 
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.moduleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Activity Management</CardTitle>
            <CardDescription>Manage all your course activities</CardDescription>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Activity
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search activities by title, module, course or type..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No activities found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.title}</TableCell>
                      <TableCell>
                        <Badge variant={
                          activity.type === 'Quiz' ? 'default' :
                          activity.type === 'Video' ? 'secondary' : 
                          'outline'
                        }>
                          {activity.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.moduleName}</TableCell>
                      <TableCell>{activity.courseName}</TableCell>
                      <TableCell>{activity.duration}</TableCell>
                      <TableCell>{activity.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-red-500"
                              onClick={() => handleDelete(activity.id)}
                            >
                              <Trash className="h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminActivities;
