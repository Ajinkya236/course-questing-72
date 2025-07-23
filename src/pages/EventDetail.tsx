
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

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
          <Button onClick={() => navigate('/events')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{event.name} | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/events')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Button>
        </div>

        {/* Event Details */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-card shadow-lg">
            {/* Event Image */}
            <div className="relative">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-80 object-cover"
              />
              <Badge 
                variant={event.status === 'OPEN' ? 'default' : 'secondary'}
                className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm"
              >
                {event.status}
              </Badge>
            </div>

            <CardContent className="p-8">
              {/* Event Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-medium text-muted-foreground">{event.academy}</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-4">{event.name}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">{event.description}</p>
              </div>

              {/* Event Timeline */}
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Event Timeline
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                      <p className="text-lg font-semibold text-foreground">
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">End Date</p>
                      <p className="text-lg font-semibold text-foreground">
                        {new Date(event.endDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Duration */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Duration: {Math.ceil((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {event.status === 'OPEN' && (
                  <Button size="lg" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Register for Event
                  </Button>
                )}
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
