
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Search, Filter, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Open' | 'Closed'>('Open');
  const [selectedAcademy, setSelectedAcademy] = useState<string>('');
  const [showAcademyFilter, setShowAcademyFilter] = useState(false);

  const academies = Array.from(new Set(mockEvents.map(event => event.academy)));

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.academy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || 
                         (selectedStatus === 'Open' && event.status === 'OPEN') ||
                         (selectedStatus === 'Closed' && event.status === 'CLOSED');
    const matchesAcademy = !selectedAcademy || event.academy === selectedAcademy;
    
    return matchesSearch && matchesStatus && matchesAcademy;
  });

  const handleAcademySelect = (academy: string) => {
    setSelectedAcademy(academy);
    setShowAcademyFilter(false);
  };

  const clearAcademyFilter = () => {
    setSelectedAcademy('');
    setShowAcademyFilter(false);
  };

  return (
    <>
      <Helmet>
        <title>Events | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover and participate in learning events, workshops, and training sessions across different academies.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Status Filter */}
            <div className="flex bg-muted rounded-lg p-1">
              {['All', 'Open', 'Closed'].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedStatus(status as 'All' | 'Open' | 'Closed')}
                  className="px-3 py-1 text-sm"
                >
                  {status}
                </Button>
              ))}
            </div>

            {/* Academy Filter */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAcademyFilter(!showAcademyFilter)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                All Academies
                {selectedAcademy && (
                  <Badge variant="secondary" className="ml-1">
                    1
                  </Badge>
                )}
              </Button>
              
              {showAcademyFilter && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-background border rounded-lg shadow-lg p-4 z-10">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-foreground">Filter by Academy</h3>
                    <div className="flex flex-wrap gap-2">
                      {academies.map((academy) => (
                        <Button
                          key={academy}
                          variant={selectedAcademy === academy ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleAcademySelect(academy)}
                          className="text-xs"
                        >
                          {academy}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAcademyFilter}
                        className="text-xs"
                      >
                        Clear
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAcademyFilter(false)}
                        className="text-xs"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {selectedAcademy && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedAcademy}
              <button
                onClick={() => setSelectedAcademy('')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-all duration-200 border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Link to={`/events/${event.id}`}>
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </Link>
                  <Badge 
                    variant={event.status === 'OPEN' ? 'default' : 'secondary'}
                    className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm"
                  >
                    {event.status}
                  </Badge>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.academy}</span>
                  </div>
                  
                  <div>
                    <Link to={`/events/${event.id}`}>
                      <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors cursor-pointer line-clamp-2">
                        {event.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                    </div>
                    
                    {event.status === 'OPEN' && (
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Users className="h-4 w-4 mr-2" />
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find events.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Events;
