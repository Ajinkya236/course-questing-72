import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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

// Mock events data (same as in Events.tsx)
const mockEvents: Event[] = [{
  id: '1',
  name: 'RIL Test Event',
  academy: 'JFP - Construction',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-01-15',
  endDate: '2024-01-20',
  description: 'Construction skills assessment and training event'
}, {
  id: '2',
  name: 'Ril test event',
  academy: 'JFP - Sales',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-02-01',
  endDate: '2024-02-05',
  description: 'Sales team training and evaluation'
}, {
  id: '3',
  name: 'Test event',
  academy: 'Workera',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-02-10',
  endDate: '2024-02-15',
  description: 'Technical skills workshop'
}, {
  id: '4',
  name: 'demo event 3129873721',
  academy: 'Human Resource',
  status: 'OPEN',
  image: '/placeholder.svg',
  startDate: '2024-03-01',
  endDate: '2024-03-10',
  description: 'HR processes and policies training'
}, {
  id: '5',
  name: 'CTO event 2025',
  academy: 'Mobility JC',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-03-15',
  endDate: '2024-03-20',
  description: 'Leadership and technology strategy'
}, {
  id: '6',
  name: 'CTO Event',
  academy: 'Workera',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-04-01',
  endDate: '2024-04-05',
  description: 'Technology leadership workshop'
}];
const EventDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);
  if (!event) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Button onClick={() => navigate('/events')}>Back to Events</Button>
        </div>
      </div>;
  }
  return <>
      <Helmet>
        <title>{event.name} | Learning Management System</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* White Navigation Bar with Back Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/events')} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Button>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <h1 className="text-xl font-semibold text-gray-900">{event.name}</h1>
            </div>
          </div>
        </div>

        {/* Horizontal Menu Bar with Event Info and Register Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              {/* Event Info */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">{event.academy}</span>
                </div>
                <Badge variant={event.status === 'OPEN' ? 'default' : 'secondary'} className="text-xs">
                  {event.status}
                </Badge>
                {event.status === 'OPEN' && <Button size="sm" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Register for Event
                  </Button>}
              </div>

              {/* Sub-menu Navigation */}
              <nav className="flex items-center gap-6">
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Leaderboard
                </button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  FAQ
                </button>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Support
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
          </div>
        </div>
      </div>
    </>;
};
export default EventDetail;