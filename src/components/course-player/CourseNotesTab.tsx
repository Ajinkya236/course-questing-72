
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { PlusCircle, Download, Trash2, Edit, Clock, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  videoTimestamp?: string;
}

interface CourseNotesTabProps {
  courseId: string;
}

const CourseNotesTab = ({ courseId }: CourseNotesTabProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const { toast } = useToast();
  
  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`course-notes-${courseId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [courseId]);
  
  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`course-notes-${courseId}`, JSON.stringify(notes));
  }, [notes, courseId]);
  
  const addNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: newNoteTitle,
      content: newNoteContent,
      timestamp: formattedDate,
      videoTimestamp: "02:15" // In a real app, this would come from the video player's current time
    };
    
    setNotes([newNote, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingNote(false);
    
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
  };
  
  const startEditingNote = (note: Note) => {
    setEditingNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };
  
  const saveEditedNote = (noteId: string) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          title: editTitle,
          content: editContent
        };
      }
      return note;
    });
    
    setNotes(updatedNotes);
    setEditingNoteId(null);
    
    toast({
      title: "Note updated",
      description: "Your note has been updated successfully.",
    });
  };
  
  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    
    toast({
      title: "Note deleted",
      description: "Your note has been deleted.",
    });
  };
  
  const downloadNotes = () => {
    // Create a text version of all notes
    const notesText = notes.map(note => (
      `${note.title}\n${note.timestamp}\n${note.videoTimestamp ? `Video Position: ${note.videoTimestamp}\n` : ''}${note.content}\n\n`
    )).join('---\n\n');
    
    // Create a blob and download link
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Course_${courseId}_Notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Notes downloaded",
      description: "Your notes have been downloaded as a text file.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">My Notes</h3>
        
        <div className="flex gap-2">
          {notes.length > 0 && (
            <Button variant="outline" size="sm" onClick={downloadNotes}>
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          )}
          <Button 
            variant={isAddingNote ? "ghost" : "default"} 
            size="sm" 
            onClick={() => setIsAddingNote(!isAddingNote)}
          >
            {isAddingNote ? (
              <>
                <X className="h-4 w-4 mr-2" /> Cancel
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" /> Add Note
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Add new note form */}
      {isAddingNote && (
        <div className="space-y-4 border p-4 rounded-lg bg-card">
          <Input 
            placeholder="Note title" 
            value={newNoteTitle}
            onChange={e => setNewNoteTitle(e.target.value)}
          />
          <Textarea 
            placeholder="Write your note here..." 
            value={newNoteContent}
            onChange={e => setNewNoteContent(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex justify-end">
            <Button 
              onClick={addNote}
              disabled={!newNoteTitle.trim() || !newNoteContent.trim()}
            >
              <Save className="h-4 w-4 mr-2" /> Save Note
            </Button>
          </div>
        </div>
      )}
      
      {/* Notes list */}
      <div className="space-y-4">
        {notes.length === 0 && !isAddingNote ? (
          <div className="text-center p-8 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No notes yet. Add your first note!</p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="border rounded-lg p-4 bg-card">
              {editingNoteId === note.id ? (
                <div className="space-y-4">
                  <Input 
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                  <Textarea 
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingNoteId(null)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => saveEditedNote(note.id)}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{note.title}</h4>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEditingNote(note)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {note.timestamp}
                    </div>
                    {note.videoTimestamp && (
                      <div className="bg-primary/10 px-2 py-0.5 rounded">
                        Video: {note.videoTimestamp}
                      </div>
                    )}
                  </div>
                  
                  <p className="whitespace-pre-wrap text-sm">{note.content}</p>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseNotesTab;
