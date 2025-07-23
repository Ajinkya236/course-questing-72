
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Search, Filter, List, Grid, ChevronDown, MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown, UserPlus, Bookmark, Share2, ArrowLeft } from 'lucide-react';
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
import { CarouselFilters } from '@/components/ui/carousel/carousel-filters';

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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Date(↑)');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAcademy, setSelectedAcademy] = useState('');
  const [showAcademyFilters, setShowAcademyFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Open');
  const [showShareDialog, setShowShareDialog] = useState<Event | null>(null);
  const [shareEmployeeIds, setShareEmployeeIds] = useState('');
  const { toast } = useToast();

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
      const matchesAcademy = !selectedAcademy || event.academy === selectedAcademy;
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
      description: `"${event.name}" has been assigned to you and will appear in My Learning > Events > My Events`
    });
  };

  const handleSaveEvent = (event: Event) => {
    toast({
      title: "Event Saved",
      description: `"${event.name}" has been saved and will appear in My Learning > Events > Saved Events`
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
      description: `"${showShareDialog?.name}" has been shared with ${employeeList.length} employee(s)`
    });
    
    setShowShareDialog(null);
    setShareEmployeeIds('');
  };

  const handleAcademyFilterToggle = () => {
    setShowAcademyFilters(!showAcademyFilters);
  };

  const handleAcademySelect = (academy: string) => {
    setSelectedAcademy(academy);
    setShowAcademyFilters(false);
  };

  const clearAcademyFilter = () => {
    setSelectedAcademy('');
    setShowAcademyFilters(false);
  };

  return (
    <>
      <Helmet>
        <title>Events | Learning Management System</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* White Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="container mx-auto">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Events</h1>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Event Name or ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
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
                        className="flex items-center gap-2"
                      >
                        {getSortIcon(option)}
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* All Academies Filter */}
            <div className="mt-4">
              <Button
                variant={showAcademyFilters ? 'default' : 'outline'}
                onClick={handleAcademyFilterToggle}
                className="rounded-full"
              >
                All Academies
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              {selectedAcademy && (
                <Button
                  variant="outline"
                  onClick={clearAcademyFilter}
                  className="rounded-full ml-2"
                >
                  {selectedAcademy} ✕
                </Button>
              )}
            </div>

            {/* Academy Filter Bubbles */}
            {showAcademyFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-2">
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
              </div>
            )}
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
          <div className="mb-6 text-right">
            <span className="text-sm text-gray-600">
              Total search result: {filteredAndSortedEvents.length}
            </span>
          </div>

          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }>
            {filteredAndSortedEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 bg-white border border-gray-200">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleEventClick(event)}
                  />
                  <Badge 
                    variant={event.status === 'OPEN' ? 'default' : 'secondary'}
                    className="absolute top-3 left-3 bg-white/90 text-gray-800 border"
                  >
                    {event.status}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1 font-medium">{event.academy}</p>
                      <h3 
                        className="font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors leading-tight"
                        onClick={() => handleEventClick(event)}
                      >
                        {event.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border shadow-lg">
                        <DropdownMenuItem onClick={() => handleAssignToMe(event)}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Assign to me
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSaveEvent(event)}>
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShareEvent(event)}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={!!showShareDialog} onOpenChange={() => setShowShareDialog(null)}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Share Event</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>Share "{showShareDialog?.name}" with:</p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee IDs (comma-separated):</label>
              <Input
                placeholder="EMP001, EMP002, EMP003..."
                value={shareEmployeeIds}
                onChange={(e) => setShareEmployeeIds(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(null)}>
              Cancel
            </Button>
            <Button onClick={handleShareSubmit}>
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Events;
