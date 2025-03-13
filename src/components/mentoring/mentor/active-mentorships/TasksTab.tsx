
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Plus,
  ThumbsUp,
  Star,
  Download,
  Trash
} from 'lucide-react';

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: string;
  description: string;
  hasSample: boolean;
  submission: {
    id: number;
    fileName: string;
    submittedDate: string;
    feedback?: string;
    rating?: number;
  } | null;
}

interface TasksTabProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksTab: React.FC<TasksTabProps> = ({ tasks, setTasks }) => {
  const { toast } = useToast();
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  
  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskSampleFile, setTaskSampleFile] = useState<File | null>(null);
  
  // Feedback form state
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  
  // Handle adding a new task
  const handleAddTask = () => {
    if (!taskTitle || !taskDueDate) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and due date for the task.",
        variant: "destructive"
      });
      return;
    }
    
    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      dueDate: taskDueDate,
      status: "pending",
      description: taskDescription,
      hasSample: !!taskSampleFile,
      submission: null
    };
    
    setTasks([...tasks, newTask]);
    
    toast({
      title: "Task Added",
      description: "The task has been assigned to the mentee successfully."
    });
    
    // Reset form
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskSampleFile(null);
    setShowAddTaskDialog(false);
  };
  
  // Handle providing feedback
  const handleProvideFeedback = () => {
    if (!selectedTaskId || !feedbackText || rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide both feedback text and a rating.",
        variant: "destructive"
      });
      return;
    }
    
    setTasks(tasks.map(task => 
      task.id === selectedTaskId 
        ? {
            ...task,
            submission: {
              ...task.submission,
              feedback: feedbackText,
              rating: rating
            }
          }
        : task
    ));
    
    toast({
      title: "Feedback Provided",
      description: "Your feedback has been saved and will be visible to the mentee."
    });
    
    // Reset form
    setFeedbackText('');
    setRating(0);
    setSelectedTaskId(null);
    setShowFeedbackDialog(false);
  };
  
  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <div key={task.id} className="p-3 border rounded-md flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-sm">{task.title}</h4>
              <p className="text-xs text-muted-foreground">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            <Badge variant={task.status === 'completed' ? 'default' : 'outline'}>
              {task.status}
            </Badge>
          </div>
          
          {task.description && (
            <p className="text-sm mt-2">{task.description}</p>
          )}
          
          {task.submission && (
            <div className="mt-3 p-2 bg-muted/30 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>{task.submission.fileName}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Submitted: {new Date(task.submission.submittedDate).toLocaleDateString()}
                </span>
              </div>
              
              {task.submission.feedback && (
                <div className="mt-2">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-xs font-medium">Your Feedback:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= (task.submission?.rating || 0) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs">{task.submission.feedback}</p>
                </div>
              )}
              
              {!task.submission.feedback && (
                <Dialog
                  open={showFeedbackDialog && selectedTaskId === task.id}
                  onOpenChange={(open) => {
                    setShowFeedbackDialog(open);
                    if (open) setSelectedTaskId(task.id);
                    else setSelectedTaskId(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      Provide Feedback
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Provide Feedback</DialogTitle>
                      <DialogDescription>
                        Rate and provide feedback for the submitted task
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Rating</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  star <= rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Feedback</label>
                        <Textarea
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Provide constructive feedback on the submission..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>Cancel</Button>
                      <Button onClick={handleProvideFeedback}>Submit Feedback</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3">
            {task.hasSample && (
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-3.5 w-3.5" />
                Download Sample
              </Button>
            )}
          </div>
        </div>
      ))}
      
      <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for your mentee
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Task Title</label>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Create a portfolio website"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Provide details about the task..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Due Date</label>
              <Input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Sample File (Optional)</label>
              <Input
                type="file"
                onChange={(e) => setTaskSampleFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksTab;
