
import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CourseNotesTabProps {
  courseId: string;
}

const CourseNotesTab: React.FC<CourseNotesTabProps> = ({ courseId }) => {
  const [notes, setNotes] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  // In a real app, we would load notes from localStorage or API
  useEffect(() => {
    const savedNotes = localStorage.getItem(`course_notes_${courseId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [courseId]);
  
  const handleSaveNotes = () => {
    setIsSaving(true);
    
    // Simulate API call or storage operation
    setTimeout(() => {
      localStorage.setItem(`course_notes_${courseId}`, notes);
      setIsSaving(false);
      toast.success('Notes saved successfully');
    }, 500);
  };
  
  const handleDownloadNotes = () => {
    // Create file and trigger download
    const element = document.createElement('a');
    const file = new Blob([notes], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Course_${courseId}_Notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('Notes downloaded');
  };
  
  const handleClearNotes = () => {
    if (window.confirm('Are you sure you want to clear all your notes? This cannot be undone.')) {
      setNotes('');
      localStorage.removeItem(`course_notes_${courseId}`);
      toast.info('Notes cleared');
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Notes</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadNotes} disabled={!notes} className="gap-1">
            <Download className="h-4 w-4" /> Download
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearNotes} disabled={!notes} className="gap-1 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>
      </div>
      
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Type your notes here..."
        className="min-h-[400px] font-mono text-sm"
      />
      
      <Button onClick={handleSaveNotes} disabled={isSaving} className="gap-2">
        <Save className="h-4 w-4" />
        {isSaving ? 'Saving...' : 'Save Notes'}
      </Button>
    </div>
  );
};

export default CourseNotesTab;
