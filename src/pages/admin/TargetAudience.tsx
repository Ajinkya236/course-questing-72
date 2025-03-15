
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data for target audiences - this would come from API in a real app
const mockAudiences = [
  {
    id: '1',
    name: 'New Hires - Engineering',
    criteria: 'Job Role: Engineer, Date of Joining: < 3 months',
    numberOfCourses: 5,
    createdAt: '2023-04-15',
  },
  {
    id: '2',
    name: 'Marketing Team Development',
    criteria: 'Job Role: Marketing, Location: Mumbai',
    numberOfCourses: 3,
    createdAt: '2023-05-20',
  },
  {
    id: '3',
    name: 'Leadership Training Program',
    criteria: 'Job Role: Manager and above',
    numberOfCourses: 7,
    createdAt: '2023-06-10',
  },
];

const AdminTargetAudience: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [audiences, setAudiences] = useState(mockAudiences);

  const filteredAudiences = audiences.filter(
    audience => audience.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteAudience = (audienceId: string) => {
    if (window.confirm('Are you sure you want to delete this target audience?')) {
      setAudiences(audiences.filter(audience => audience.id !== audienceId));
      toast({
        title: "Target audience deleted",
        description: "The target audience has been successfully deleted.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Target Audiences</h1>
        <Button asChild>
          <Link to="/admin/target-audience/create">
            <Plus className="mr-2 h-4 w-4" /> Create Audience
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Target Audiences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search audiences..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredAudiences.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Criteria</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAudiences.map((audience) => (
                    <TableRow key={audience.id}>
                      <TableCell className="font-medium">{audience.name}</TableCell>
                      <TableCell>{audience.criteria}</TableCell>
                      <TableCell>{audience.numberOfCourses}</TableCell>
                      <TableCell>{audience.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/target-audience/view/${audience.id}`}>
                                <Eye className="mr-2 h-4 w-4" /> View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/target-audience/edit/${audience.id}`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteAudience(audience.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? "No audiences found matching your search." : "No target audiences available."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTargetAudience;
