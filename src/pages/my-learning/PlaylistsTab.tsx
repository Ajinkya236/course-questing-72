
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  List, 
  Plus, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  X,
  Save,
  Users,
  Lock
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import CourseCard from '@/components/CourseCard';
import { mockCourses } from '@/data/mockCoursesData';

interface PlaylistsTabProps {
  teamMemberId?: string;
}

interface Playlist {
  id: string;
  name: string;
  isPublic: boolean;
  courseCount: number;
  createdAt: string;
  description?: string;
}

const PlaylistsTab: React.FC<PlaylistsTabProps> = ({ teamMemberId }) => {
  const { toast } = useToast();
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [deletePlaylistId, setDeletePlaylistId] = useState<string | null>(null);
  
  // Form states
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [newPlaylistIsPublic, setNewPlaylistIsPublic] = useState(false);

  // Mock playlists data
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { 
      id: 'watch-later', 
      name: 'Watch Later', 
      isPublic: false, 
      courseCount: 5, 
      createdAt: '2024-01-15',
      description: 'Courses I want to watch later'
    },
    { 
      id: 'leadership', 
      name: 'Leadership Skills', 
      isPublic: true, 
      courseCount: 12, 
      createdAt: '2024-02-01',
      description: 'Building leadership and management capabilities'
    },
    { 
      id: 'tech-skills', 
      name: 'Technical Skills', 
      isPublic: false, 
      courseCount: 8, 
      createdAt: '2024-02-15',
      description: 'Programming and technical development courses'
    },
  ]);

  // Get courses for selected playlist (mock implementation)
  const getPlaylistCourses = (playlistId: string) => {
    // Return subset of mock courses based on playlist
    const courseCount = playlists.find(p => p.id === playlistId)?.courseCount || 0;
    return mockCourses.slice(0, courseCount);
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a playlist name",
        variant: "destructive"
      });
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      description: newPlaylistDescription,
      isPublic: newPlaylistIsPublic,
      courseCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPlaylists(prev => [...prev, newPlaylist]);
    
    // Reset form
    setNewPlaylistName('');
    setNewPlaylistDescription('');
    setNewPlaylistIsPublic(false);
    setShowCreateDialog(false);

    toast({
      title: "Playlist Created",
      description: `"${newPlaylist.name}" has been created successfully`
    });
  };

  const handleEditPlaylist = () => {
    if (!editingPlaylist || !editingPlaylist.name.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a playlist name",
        variant: "destructive"
      });
      return;
    }

    setPlaylists(prev => prev.map(playlist => 
      playlist.id === editingPlaylist.id ? editingPlaylist : playlist
    ));

    setShowEditDialog(false);
    setEditingPlaylist(null);

    toast({
      title: "Playlist Updated",
      description: `"${editingPlaylist.name}" has been updated successfully`
    });
  };

  const handleDeletePlaylist = () => {
    if (!deletePlaylistId) return;

    const playlistToDelete = playlists.find(p => p.id === deletePlaylistId);
    
    setPlaylists(prev => prev.filter(playlist => playlist.id !== deletePlaylistId));
    
    // If we're viewing the deleted playlist, go back to playlist list
    if (selectedPlaylist === deletePlaylistId) {
      setSelectedPlaylist(null);
    }

    setShowDeleteDialog(false);
    setDeletePlaylistId(null);

    toast({
      title: "Playlist Deleted",
      description: `"${playlistToDelete?.name}" has been deleted successfully`
    });
  };

  const openEditDialog = (playlist: Playlist) => {
    setEditingPlaylist({ ...playlist });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (playlistId: string) => {
    setDeletePlaylistId(playlistId);
    setShowDeleteDialog(true);
  };

  // If a playlist is selected, show its courses
  if (selectedPlaylist) {
    const playlist = playlists.find(p => p.id === selectedPlaylist);
    const courses = getPlaylistCourses(selectedPlaylist);

    return (
      <div className="space-y-6">
        {/* Back to playlists button */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setSelectedPlaylist(null)}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Back to Playlists
          </Button>
        </div>

        {/* Playlist header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{playlist?.name}</h2>
              <Badge variant={playlist?.isPublic ? "default" : "secondary"}>
                {playlist?.isPublic ? (
                  <>
                    <Eye className="h-3 w-3 mr-1" />
                    Public
                  </>
                ) : (
                  <>
                    <Lock className="h-3 w-3 mr-1" />
                    Private
                  </>
                )}
              </Badge>
            </div>
            {playlist?.description && (
              <p className="text-muted-foreground">{playlist.description}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              {courses.length} courses • Created {new Date(playlist?.createdAt || '').toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => playlist && openEditDialog(playlist)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openDeleteDialog(selectedPlaylist)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              category={course.category}
              duration={course.duration}
              rating={course.rating}
              trainingCategory={course.trainingCategory}
              isBookmarked={course.isBookmarked}
              previewUrl={course.previewUrl}
              videoUrl={course.videoUrl}
              isHot={course.isHot}
              isNew={course.isNew}
            />
          ))}
        </div>

        {courses.length === 0 && (
          <Card className="p-8 text-center">
            <List className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No courses in this playlist</h3>
            <p className="text-muted-foreground">
              Start adding courses to this playlist from the course pages.
            </p>
          </Card>
        )}
      </div>
    );
  }

  // Show playlists overview
  return (
    <div className="space-y-6">
      {/* Header with create button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">My Playlists</h2>
          <p className="text-muted-foreground">Organize your courses into custom playlists</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      {/* Playlists grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map(playlist => (
          <Card 
            key={playlist.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedPlaylist(playlist.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <List className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{playlist.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant={playlist.isPublic ? "default" : "secondary"} className="text-xs">
                    {playlist.isPublic ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <Lock className="h-3 w-3" />
                    )}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditDialog(playlist);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteDialog(playlist.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {playlist.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {playlist.description}
                </p>
              )}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{playlist.courseCount} courses</span>
                <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {playlists.length === 0 && (
        <Card className="p-8 text-center">
          <List className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No playlists yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first playlist to organize your courses.
          </p>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Playlist
          </Button>
        </Card>
      )}

      {/* Create Playlist Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Playlist</DialogTitle>
            <DialogDescription>
              Create a new playlist to organize your courses
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Playlist Name</Label>
              <Input
                id="name"
                placeholder="Enter playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Enter playlist description"
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="public"
                checked={newPlaylistIsPublic}
                onCheckedChange={setNewPlaylistIsPublic}
              />
              <Label htmlFor="public" className="text-sm">
                Make playlist public
              </Label>
              {newPlaylistIsPublic ? (
                <Eye className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePlaylist} disabled={!newPlaylistName.trim()}>
              <Save className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Playlist Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Playlist</DialogTitle>
            <DialogDescription>
              Update your playlist information
            </DialogDescription>
          </DialogHeader>
          
          {editingPlaylist && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Playlist Name</Label>
                <Input
                  id="edit-name"
                  placeholder="Enter playlist name"
                  value={editingPlaylist.name}
                  onChange={(e) => setEditingPlaylist(prev => 
                    prev ? { ...prev, name: e.target.value } : null
                  )}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Input
                  id="edit-description"
                  placeholder="Enter playlist description"
                  value={editingPlaylist.description || ''}
                  onChange={(e) => setEditingPlaylist(prev => 
                    prev ? { ...prev, description: e.target.value } : null
                  )}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-public"
                  checked={editingPlaylist.isPublic}
                  onCheckedChange={(checked) => setEditingPlaylist(prev => 
                    prev ? { ...prev, isPublic: checked } : null
                  )}
                />
                <Label htmlFor="edit-public" className="text-sm">
                  Make playlist public
                </Label>
                {editingPlaylist.isPublic ? (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPlaylist} disabled={!editingPlaylist?.name.trim()}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Playlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this playlist? This action cannot be undone.
              The courses in this playlist will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlaylist}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PlaylistsTab;
