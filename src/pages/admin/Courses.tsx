
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
import { Link } from 'react-router-dom';
import { MoreHorizontal, PlusCircle, Search, Trash, Edit, Eye } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Dummy data for courses
const dummyCourses = [
  {
    id: '1',
    title: 'Data Science Fundamentals',
    skills: ['Python', 'Data Analysis', 'Statistics'],
    published: true,
    createdAt: '2023-10-12',
    modulesCount: 5,
    activitiesCount: 15
  },
  {
    id: '2',
    title: 'Advanced Leadership Skills',
    skills: ['Communication', 'Management', 'Strategy'],
    published: true,
    createdAt: '2023-11-05',
    modulesCount: 4,
    activitiesCount: 12
  },
  {
    id: '3',
    title: 'Cloud Infrastructure Basics',
    skills: ['AWS', 'Azure', 'DevOps'],
    published: false,
    createdAt: '2023-12-01',
    modulesCount: 6,
    activitiesCount: 18
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    skills: ['SEO', 'Social Media', 'Content Marketing'],
    published: true,
    createdAt: '2024-01-15',
    modulesCount: 3,
    activitiesCount: 9
  },
  {
    id: '5',
    title: 'Frontend Development Masterclass',
    skills: ['React', 'JavaScript', 'CSS'],
    published: false,
    createdAt: '2024-02-20',
    modulesCount: 8,
    activitiesCount: 24
  }
];

const AdminCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(dummyCourses);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Course Management</CardTitle>
            <CardDescription>Manage all your courses</CardDescription>
          </div>
          <Button asChild>
            <Link to="/admin/courses/create" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Course
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses by title or skills..."
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
                  <TableHead>Skills</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Activities</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No courses found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {course.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="mr-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.published ? "default" : "secondary"}>
                          {course.published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.createdAt}</TableCell>
                      <TableCell>{course.modulesCount}</TableCell>
                      <TableCell>{course.activitiesCount}</TableCell>
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
                              onClick={() => handleDelete(course.id)}
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

export default AdminCourses;
