import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Filter, List, Grid, ChevronDown, MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown, UserPlus, Bookmark, Share2, ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  name: string;
  academy: string;
  status: 'OPEN' | 'CLOSED';
  image: string;
  startDate: string;
  endDate: string;
  description: string;
}

// Mock events data
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'RIL Test Event',
    academy: 'JFP - Construction',
    status: 'CLOSED',
    image: '/placeholder.svg',
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    description: 'Construction skills assessment and training event'
  },
  {
    id: '2',
    name: 'Ril test event',
    academy: 'JFP - Sales',
    status: 'CLOSED',
    image: '/placeholder.svg',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    description: 'Sales team training and evaluation'
  },
  {
    id: '3',
    name: 'Test event',
    academy: 'Workera',
    status: 'CLOSED',
    image: '/placeholder.svg',
    startDate: '2024-02-10',
    endDate: '2024-02-15',
    description: 'Technical skills workshop'
  },
  {
    id: '4',
    name: 'demo event 3129873721',
    academy: 'Human Resource',
    status: 'OPEN',
    image: '/placeholder.svg',
    startDate: '2024-03-01',
    endDate: '2024-03-10',
    description: 'HR processes and policies training'
  },
  {
    id: '5',
    name: 'CTO event 2025',
    academy: 'Mobility JC',
    status: 'CLOSED',
    image: '/placeholder.svg',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
    description: 'Leadership and technology strategy'
  },
  {
    id: '6',
    name: 'CTO Event',
    academy: 'Workera',
    status: 'CLOSED',
    image: '/placeholder.svg',
    startDate: '2024-04-01',
    endDate: '2024-04-05',
    description: 'Technology leadership workshop'
  }
];

const academies = [
  'JFP - Construction',
  'JFP - Sales', 
  'Workera',
  'Human Resource',
  'Mobility JC',
  'Corporate Services',
  'Enterprise Products',
  'Facility Operations',
  'Supply Chain Management (SCM)',
  'JioFiber Partner'
];

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Date(↑)');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAcademy, setSelectedAcademy] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Open');
  const [showEventDetail, setShowEventDetail] = useState<Event | null>(null);
  const [showShareDialog, setShowShareDialog] = useState<Event | null>(null);
  const [shareEmployeeIds, setShareEmployeeIds] = useState('');
  const [showAcademyFilters, setShowAcademyFilters] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const sortOptions = [
    'Date(↑)', 'Date(↓)', 'Name (A-Z)', 'Name (Z-A)'
  ];

  const getSortIcon = (option: string) => {
    if (option.includes('↑')) return <ArrowUp className="h-3 w-3" />;
    if (option.includes('↓')) return <ArrowDown className="h-3 w-3" />;
    return <ArrowUpDown className="h-3 w-3" />;
  };

  const filteredAndSortedEvents = React.useMemo(() => {
    let filtered = mockEvents.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.id.includes(searchQuery);
      const matchesAcademy = selectedAcademy === 'All' || event.academy === selectedAcademy;
      const matchesStatus = statusFilter === 'All' || event.status === statusFilter.toUpperCase();
      
      return matchesSearch && matchesAcademy && matchesStatus;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Date(↑)':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'Date(↓)':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'Name (A-Z)':
          return a.name.localeCompare(b.name);
        case 'Name (Z-A)':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedAcademy, statusFilter, sortBy]);

  const handleEventClick = (event: Event) => {
    navigate(`/events/${event.id}`);
  };

  const handleAssignToMe = (event: Event) => {
    toast({
      title: "Event Assigned",
      description: `"${event.name}" has been assigned to you and will appear in My Learning > Events > My Events`,
      duration: 3000,
    });
  };

  const handleSaveEvent = (event: Event) => {
    toast({
      title: "Event Saved",
      description: `"${event.name}" has been saved and will appear in My Learning > Events > Saved Events`,
      duration: 3000,
    });
  };

  const handleShareEvent = (event: Event) => {
    setShowShareDialog(event);
  };

  const handleShareSubmit = () => {
    if (!shareEmployeeIds.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one employee ID",
        variant: "destructive"
      });
      return;
    }

    const employeeList = shareEmployeeIds.split(',').map(id => id.trim()).filter(id => id);
    
    toast({
      title: "Event Shared",
      description: `"${showShareDialog?.name}" has been shared with ${employeeList.length} employee(s)`,
      duration: 3000,
    });
    
    setShowShareDialog(null);
    setShareEmployeeIds('');
  };

  const handleAcademySelect = (academy: string) => {
    setSelectedAcademy(academy);
    setShowAcademyFilters(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Events | Learning Management System</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Events</h1>
                <p className="text-gray-600 mt-1">Discover and participate in learning events</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-2xl font-bold text-primary">{filteredAndSortedEvents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* White Navigation Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by event name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 bg-white hover:bg-gray-50">
                        {getSortIcon(sortBy)}
                        {sortBy}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border shadow-lg">
                      {sortOptions.map((option) => (
                        <DropdownMenuItem
                          key={option}
                          onClick={() => setSortBy(option)}
                          className="flex items-center gap-2 hover:bg-gray-50"
                        >
                          {getSortIcon(option)}
                          {option}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Academy Filter */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-700">Academy:</span>
                <Button
                  variant={showAcademyFilters ? 'default' : 'outline'}
                  onClick={() => setShowAcademyFilters(!showAcademyFilters)}
                  className="flex items-center gap-2"
                >
                  {selectedAcademy === 'All' ? 'All Academies' : selectedAcademy}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAcademyFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
              
              {showAcademyFilters && (
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border animate-fade-in">
                  <Button
                    variant={selectedAcademy === 'All' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAcademySelect('All')}
                    className="rounded-full"
                  >
                    All Academies
                  </Button>
                  {academies.map((academy) => (
                    <Button
                      key={academy}
                      variant={selectedAcademy === academy ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAcademySelect(academy)}
                      className="rounded-full"
                    >
                      {academy}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'All' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('All')}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'Open' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('Open')}
              className="rounded-full"
            >
              Open
            </Button>
            <Button
              variant={statusFilter === 'Closed' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('Closed')}
              className="rounded-full"
            >
              Closed
            </Button>
          </div>
        </div>

        {/* Events Grid/List */}
        <div className="container mx-auto px-4 pb-8">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredAndSortedEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
            }>
              {filteredAndSortedEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-105 bg-white">
                  <div className="relative group">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                      onClick={() => handleEventClick(event)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Calendar className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">View Event</p>
                      </div>
                    </div>
                    <Badge 
                      variant={event.status === 'OPEN' ? 'default' : 'secondary'}
                      className="absolute top-3 left-3 shadow-sm"
                    >
                      {event.status}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.academy}
                        </p>
                        <h3 
                          className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors line-clamp-2"
                          onClick={() => handleEventClick(event)}
                        >
                          {event.name}
                        </h3>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border shadow-lg">
                          <DropdownMenuItem onClick={() => handleAssignToMe(event)} className="hover:bg-gray-50">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign to me
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSaveEvent(event)} className="hover:bg-gray-50">
                            <Bookmark className="h-4 w-4 mr-2" />
                            Save
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareEvent(event)} className="hover:bg-gray-50">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={!!showShareDialog} onOpenChange={() => setShowShareDialog(null)}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Share Event</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-gray-600">Share "{showShareDialog?.name}" with:</p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Employee IDs (comma-separated):</label>
              <Input
                placeholder="EMP001, EMP002, EMP003..."
                value={shareEmployeeIds}
                onChange={(e) => setShareEmployeeIds(e.target.value)}
                className="bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleShareSubmit}>
              Share Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Events;
