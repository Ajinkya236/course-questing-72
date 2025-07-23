import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, MapPin, Clock, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Mock event data (in a real app, this would come from an API)
const mockEvents = [{
  id: '1',
  name: 'RIL Test Event',
  academy: 'JFP - Construction',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-01-15',
  endDate: '2024-01-20',
  description: 'Construction skills assessment and training event focused on modern building techniques and safety protocols.',
  participants: 45,
  location: 'Mumbai Training Center',
  agenda: ['Safety protocols and guidelines', 'Modern construction techniques', 'Quality assurance methods', 'Team coordination exercises']
}, {
  id: '2',
  name: 'Ril test event',
  academy: 'JFP - Sales',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-02-01',
  endDate: '2024-02-05',
  description: 'Sales team training and evaluation focused on customer relationship management and sales techniques.',
  participants: 32,
  location: 'Delhi Sales Hub',
  agenda: ['Customer relationship management', 'Sales presentation skills', 'Product knowledge enhancement', 'Market analysis techniques']
}, {
  id: '3',
  name: 'Test event',
  academy: 'Workera',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-02-10',
  endDate: '2024-02-15',
  description: 'Technical skills workshop covering latest technologies and development practices.',
  participants: 28,
  location: 'Bangalore Tech Center',
  agenda: ['Latest technology trends', 'Development best practices', 'Code review sessions', 'Project management tools']
}, {
  id: '4',
  name: 'demo event 3129873721',
  academy: 'Human Resource',
  status: 'OPEN',
  image: '/placeholder.svg',
  startDate: '2024-03-01',
  endDate: '2024-03-10',
  description: 'HR processes and policies training covering employee relations and compliance.',
  participants: 18,
  location: 'Corporate Office',
  agenda: ['Employee relations strategies', 'Compliance requirements', 'Performance management', 'Recruitment best practices']
}, {
  id: '5',
  name: 'CTO event 2025',
  academy: 'Mobility JC',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-03-15',
  endDate: '2024-03-20',
  description: 'Leadership and technology strategy focused on driving innovation and digital transformation.',
  participants: 12,
  location: 'Pune Innovation Center',
  agenda: ['Digital transformation strategies', 'Innovation leadership', 'Technology roadmap planning', 'Team building exercises']
}, {
  id: '6',
  name: 'CTO Event',
  academy: 'Workera',
  status: 'CLOSED',
  image: '/placeholder.svg',
  startDate: '2024-04-01',
  endDate: '2024-04-05',
  description: 'Technology leadership workshop focusing on strategic planning and team management.',
  participants: 15,
  location: 'Hyderabad Tech Hub',
  agenda: ['Strategic technology planning', 'Team leadership skills', 'Innovation management', 'Cross-functional collaboration']
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/events')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>;
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return <>
      <Helmet>
        <title>{event.name} | Events</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* White Navigation Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => navigate('/events')} className="flex items-center gap-2 hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
          </div>
        </div>

        {/* Event Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={event.status === 'OPEN' ? 'default' : 'secondary'} className="text-sm">
                    {event.status}
                  </Badge>
                  <span className="text-sm text-gray-600">{event.academy}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
                <p className="text-gray-600 mb-6">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Start Date</p>
                      <p className="text-sm">{formatDate(event.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <div>
                      <p className="font-medium">End Date</p>
                      <p className="text-sm">{formatDate(event.endDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    
                    
                  </div>
                </div>
              </div>
              
              <div>
                <img src={event.image} alt={event.name} className="w-full h-80 object-cover rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        
      </div>
    </>;
};
export default EventDetail;