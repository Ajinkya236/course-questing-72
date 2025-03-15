
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

// Dummy data for modules
const dummyModules = [
  {
    id: '1',
    title: 'Introduction to Python',
    courseName: 'Data Science Fundamentals',
    activitiesCount: 5,
    duration: '2 hours',
    createdAt: '2023-10-15',
  },
  {
    id: '2',
    title: 'Data Analysis with Pandas',
    courseName: 'Data Science Fundamentals',
    activitiesCount: 4,
    duration: '3 hours',
    createdAt: '2023-10-18',
  },
  {
    id: '3',
    title: 'Effective Communication',
    courseName: 'Advanced Leadership Skills',
    activitiesCount: 3,
    duration: '1.5 hours',
    createdAt: '2023-11-10',
  },
  {
    id: '4',
    title: 'AWS EC2 Fundamentals',
    courseName: 'Cloud Infrastructure Basics',
    activitiesCount: 4,
    duration: '2.5 hours',
    createdAt: '2023-12-05',
  },
  {
    id: '5',
    title: 'React Hooks Deep Dive',
    courseName: 'Frontend Development Masterclass',
    activitiesCount: 6,
    duration: '4 hours',
    createdAt: '2024-02-25',
  },
];

const AdminModules: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modules, setModules] = useState(dummyModules);

  const filteredModules = modules.filter(module => 
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setModules(modules.filter(module => module.id !== id));
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Module Management</CardTitle>
            <CardDescription>Manage all your course modules</CardDescription>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Module
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search modules by title or course..."
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
                  <TableHead>Course</TableHead>
                  <TableHead>Activities</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredModules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No modules found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredModules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">{module.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {module.courseName}
                        </Badge>
                      </TableCell>
                      <TableCell>{module.activitiesCount}</TableCell>
                      <TableCell>{module.duration}</TableCell>
                      <TableCell>{module.createdAt}</TableCell>
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
                              onClick={() => handleDelete(module.id)}
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

export default AdminModules;
