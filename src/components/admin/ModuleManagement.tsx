
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  BookText, 
  PlusCircle, 
  MoreHorizontal, 
  ArrowUpDown, 
  Check, 
  ChevronsUpDown, 
  Pencil, 
  Trash, 
  GripVertical, 
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Sample module bank
const moduleBankItems = [
  { id: 'mb-1', title: 'Introduction to JavaScript', description: 'Learn the basics of JavaScript programming.', activitiesCount: 5, duration: '2 hours' },
  { id: 'mb-2', title: 'React Fundamentals', description: 'Introduction to React components and lifecycle.', activitiesCount: 4, duration: '3 hours' },
  { id: 'mb-3', title: 'Advanced React Patterns', description: 'Advanced React patterns and best practices.', activitiesCount: 6, duration: '4 hours' },
  { id: 'mb-4', title: 'Node.js Basics', description: 'Getting started with Node.js and Express.', activitiesCount: 5, duration: '2.5 hours' },
  { id: 'mb-5', title: 'Leadership Principles', description: 'Core leadership principles and techniques.', activitiesCount: 3, duration: '1.5 hours' },
  { id: 'mb-6', title: 'Data Analysis with Python', description: 'Using Python for data analysis with pandas.', activitiesCount: 7, duration: '5 hours' },
  { id: 'mb-7', title: 'Cloud Computing Fundamentals', description: 'Introduction to cloud services and deployment.', activitiesCount: 4, duration: '3 hours' },
];

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  activities: any[];
}

interface SortableModuleItemProps {
  module: Module;
  onEdit: (module: Module) => void;
  onDelete: (id: string) => void;
}

const SortableModuleItem: React.FC<SortableModuleItemProps> = ({ module, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: module.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} className="rounded-md border mb-3">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-medium">{module.title}</h4>
            <p className="text-sm text-muted-foreground">{module.description}</p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-muted-foreground">Duration: {module.duration}</span>
              <span className="text-xs text-muted-foreground">Activities: {module.activities.length}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(module)}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(module.id)}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ModuleManagementProps {
  courseData: any;
  updateCourseData: (data: any) => void;
}

const ModuleManagement: React.FC<ModuleManagementProps> = ({ courseData, updateCourseData }) => {
  const [modules, setModules] = useState<Module[]>(courseData.modules || []);
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isModuleBankOpen, setIsModuleBankOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [bankSearchTerm, setBankSearchTerm] = useState('');
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        // Update order property for each module
        return newItems.map((item, index) => ({
          ...item,
          order: index + 1,
        }));
      });
    }
  };

  const handleAddModule = (module: Partial<Module>) => {
    if (isEditMode && currentModule) {
      // Update existing module
      const updatedModules = modules.map((m) => 
        m.id === currentModule.id ? { ...m, ...module } : m
      );
      setModules(updatedModules);
      updateCourseData({ modules: updatedModules });
      toast({ title: "Module updated successfully" });
    } else {
      // Add new module
      const newModule: Module = {
        id: `m-${Date.now()}`,
        title: module.title || '',
        description: module.description || '',
        duration: module.duration || '',
        order: modules.length + 1,
        activities: []
      };
      
      const updatedModules = [...modules, newModule];
      setModules(updatedModules);
      updateCourseData({ modules: updatedModules });
      toast({ title: "Module added successfully" });
    }
    
    setIsAddModuleOpen(false);
    setIsEditMode(false);
    setCurrentModule(null);
  };

  const handleAddFromBank = (bankModule: any) => {
    const newModule: Module = {
      id: `m-${Date.now()}`,
      title: bankModule.title,
      description: bankModule.description,
      duration: bankModule.duration,
      order: modules.length + 1,
      activities: []
    };
    
    const updatedModules = [...modules, newModule];
    setModules(updatedModules);
    updateCourseData({ modules: updatedModules });
    toast({ title: "Module added from bank successfully" });
    setIsModuleBankOpen(false);
  };
  
  const handleEditModule = (module: Module) => {
    setCurrentModule(module);
    setIsEditMode(true);
    setIsAddModuleOpen(true);
  };
  
  const handleDeleteModule = (id: string) => {
    const updatedModules = modules.filter((m) => m.id !== id).map((m, index) => ({
      ...m,
      order: index + 1
    }));
    setModules(updatedModules);
    updateCourseData({ modules: updatedModules });
    toast({ title: "Module deleted successfully" });
  };

  const filteredBankModules = moduleBankItems.filter((module) => 
    module.title.toLowerCase().includes(bankSearchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(bankSearchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Module Management</CardTitle>
          <CardDescription>
            Add modules to your course or select from existing ones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Button 
              onClick={() => {
                setIsEditMode(false);
                setCurrentModule(null);
                setIsAddModuleOpen(true);
              }} 
              className="flex-1"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Module
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsModuleBankOpen(true)} 
              className="flex-1"
            >
              <BookText className="mr-2 h-4 w-4" />
              Select From Module Bank
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Course Modules</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop to reorder modules. You have {modules.length} module(s) in this course.
            </p>
          </div>

          {modules.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg">
              <BookText className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground mb-4">No modules added to this course yet</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditMode(false);
                  setCurrentModule(null);
                  setIsAddModuleOpen(true);
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add First Module
              </Button>
            </div>
          ) : (
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={modules.map(m => m.id)}
                strategy={verticalListSortingStrategy}
              >
                {modules.map((module) => (
                  <SortableModuleItem 
                    key={module.id} 
                    module={module} 
                    onEdit={handleEditModule}
                    onDelete={handleDeleteModule}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Module Dialog */}
      <Dialog open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Module" : "Add New Module"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update the details of this module" 
                : "Fill in the details to create a new module"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Module Title</Label>
              <Input 
                id="title" 
                placeholder="Enter module title" 
                defaultValue={currentModule?.title || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter module description" 
                className="min-h-20 resize-none"
                defaultValue={currentModule?.description || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input 
                id="duration" 
                placeholder="e.g., 2 hours" 
                defaultValue={currentModule?.duration || ''}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => {
              const title = (document.getElementById('title') as HTMLInputElement)?.value;
              const description = (document.getElementById('description') as HTMLTextAreaElement)?.value;
              const duration = (document.getElementById('duration') as HTMLInputElement)?.value;
              
              if (!title) {
                toast({ title: "Title is required", variant: "destructive" });
                return;
              }
              
              handleAddModule({ title, description, duration });
            }}>
              {isEditMode ? "Update Module" : "Add Module"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Module Bank Dialog */}
      <Dialog open={isModuleBankOpen} onOpenChange={setIsModuleBankOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Module Bank</DialogTitle>
            <DialogDescription>
              Browse and select existing modules to add to your course
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search modules..."
                className="pl-9"
                value={bankSearchTerm}
                onChange={(e) => setBankSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Activities</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBankModules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                        No modules found matching your search
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBankModules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{module.title}</p>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{module.activitiesCount}</TableCell>
                        <TableCell>{module.duration}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            onClick={() => handleAddFromBank(module)}
                          >
                            Add
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleManagement;
