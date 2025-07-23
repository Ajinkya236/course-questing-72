
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Search, List, Grid, ChevronDown, MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown, UserPlus, Bookmark, Share2, Calendar, Clock, MapPin } from 'lucide-react';
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
import PageLayout from '@/components/layout/PageLayout';

interface Event {
  id: string;
  name: string;
  academy: string;
  status: 'OPEN' | 'CLOSED';
  image: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
  capacity?: number;
  enrolled?: number;
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
    description: 'Construction skills assessment and training event',
    location: 'Mumbai Training Center',
    capacity: 50,
    enrolled: 45
  },
  {
    id: '2',
    name: 'Ril test event',
    academy: 'JFP - Sales',
    status: 'CLOSED',
    image: '/placeholder.svg',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    description: 'Sales team training and evaluation',
    location: 'Delhi Regional Office',
    capacity: 30,
    enrolled: 28
  },
  {
    id: '3',
    name: 'Test event',
    academy: 'Workera',
    status: 'CLOSED',
    image: '/placeholder.svg',
    startDate: '2024-02-10',
    endDate: '2024-02-15',
    description: 'Technical skills workshop',
    location: 'Bangalore Tech Hub',
    capacity: 40,
    enrolled: 35
  },
  {
    id: '4',
    name: 'demo event 3129873721',
    academy: 'Human Resource',
    status: 'OPEN',
    image: '/placeholder.svg',
    startDate: '2024-03-01',
    endDate: '2024-03-10',
    description: 'HR processes and policies training',
    location: 'Corporate Headquarters',
    capacity: 60,
    enrolled: 25
  },
  {
    id: '5',
    name: 'CTO event 2025',
    academy: 'Mobility JC',
    status: 'CLOSED',
    image: '/placeholder.svg',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
    description: 'Leadership and technology strategy',
    location: 'Innovation Center',
    capacity: 25,
    enrolled: 25
  },
  {
    id: '6',
    name: 'CTO Event',
    academy: 'Workera',
    status: 'CLOSED',
    image: '/placeholder.svg',
    startDate: '2024-04-01',
    endDate: '2024-04-05',
    description: 'Technology leadership workshop',
    location: 'Tech Campus',
    capacity: 35,
    enrolled: 32
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
  const [selectedAcademy, setSelectedAcademy] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('Open');
  const [showShareDialog, setShowShareDialog] = useState<Event | null>(null);
  const [shareEmployeeIds, setShareEmployeeIds] = useState('');
  const [showAcademyDropdown, setShowAcademyDropdown] = useState(false);
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
      const matchesAcademy = selectedAcademy === null || event.academy === selectedAcademy;
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

  const handleAcademySelect = (academy: string) => {
    setSelectedAcademy(academy);
    setShowAcademyDropdown(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'OPEN' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Events | Learning Management System</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Events Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-6 mb-6">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Events</h1>
              <div className="text-sm text-gray-600">
                Total search result: {filteredAndSortedEvents.length}
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-gray-300">
                      {getSortIcon(sortBy)}
                      {sortBy}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
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
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="border-gray-300"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="border-gray-300"
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Academy Filter */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-700">Filter by Academy:</span>
                <DropdownMenu open={showAcademyDropdown} onOpenChange={setShowAcademyDropdown}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      {selectedAcademy || 'All Academies'}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg max-h-64 overflow-y-auto">
                    <DropdownMenuItem
                      onClick={() => handleAcademySelect('')}
                      className="hover:bg-gray-50"
                    >
                      All Academies
                    </DropdownMenuItem>
                    {academies.map((academy) => (
                      <DropdownMenuItem
                        key={academy}
                        onClick={() => handleAcademySelect(academy)}
                        className="hover:bg-gray-50"
                      >
                        {academy}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Academy Bubble Filters */}
              {selectedAcademy && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1"
                  >
                    {selectedAcademy}
                    <button
                      onClick={() => setSelectedAcademy(null)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="container mx-auto px-4 mb-6">
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'All' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('All')}
              className="border-gray-300"
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'Open' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('Open')}
              className="border-gray-300"
            >
              Open
            </Button>
            <Button
              variant={statusFilter === 'Closed' ? 'outline' : 'outline'}
              onClick={() => setStatusFilter('Closed')}
              className="border-gray-300"
            >
              Closed
            </Button>
          </div>
        </div>

        {/* Events Grid/List */}
        <div className="container mx-auto px-4 pb-8">
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }>
            {filteredAndSortedEvents.map((event) => (
              <Card key={event.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 bg-white">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                    onClick={() => handleEventClick(event)}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getStatusColor(event.status)} font-medium`}>
                      {event.status}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
                
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <p className="text-sm text-blue-600 font-medium mb-1">{event.academy}</p>
                      <h3 
                        className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
                        onClick={() => handleEventClick(event)}
                      >
                        {event.name}
                      </h3>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
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

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.startDate)} - {formatDate(event.endDate)}
                    </div>
                    {event.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    )}
                    {event.capacity && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.enrolled || 0}/{event.capacity} enrolled
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAndSortedEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No events found</div>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
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
            <p>Share "{showShareDialog?.name}" with:</p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee IDs (comma-separated):</label>
              <Input
                placeholder="EMP001, EMP002, EMP003..."
                value={shareEmployeeIds}
                onChange={(e) => setShareEmployeeIds(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
    </PageLayout>
  );
};

export default Events;
