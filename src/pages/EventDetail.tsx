
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Share2, Bookmark, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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

// Mock event data (in real app, this would come from API)
const mockEvent: Event = {
  id: '1',
  name: 'Advanced Leadership Workshop 2024',
  academy: 'JFP - Construction',
  status: 'OPEN',
  image: '/placeholder.svg',
  startDate: '2024-03-15',
  endDate: '2024-03-20',
  description: 'A comprehensive leadership development program designed to enhance management skills and strategic thinking capabilities. This workshop covers advanced leadership techniques, team management, conflict resolution, and strategic planning methods.',
  location: 'Mumbai Training Center, Conference Hall A',
  capacity: 50,
  enrolled: 35
};

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // In real app, you'd fetch event data based on ID
  const event = mockEvent;

  const handleBack = () => {
    navigate('/events');
  };

  const handleEnroll = () => {
    toast({
      title: "Event Enrollment",
      description: `You have successfully enrolled in "${event.name}"`
    });
  };

  const handleSave = () => {
    toast({
      title: "Event Saved",
      description: `"${event.name}" has been saved to your bookmarks`
    });
  };

  const handleShare = () => {
    toast({
      title: "Event Shared",
      description: "Event link has been copied to clipboard"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'OPEN' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getEnrollmentPercentage = () => {
    if (!event.capacity || !event.enrolled) return 0;
    return (event.enrolled / event.capacity) * 100;
  };

  if (!event) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
            <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Helmet>
        <title>{event.name} | Events</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(event.status)} font-medium`}>
                  {event.status}
                </Badge>
                <span className="text-sm text-gray-600">{event.academy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-200 shadow-sm">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-64 sm:h-80 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(event.status)} font-medium`}>
                      {event.status}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.name}</h1>
                    <p className="text-lg text-blue-600 font-medium">{event.academy}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Event Timeline</p>
                        <p className="text-gray-600">
                          <span className="font-medium">Start:</span> {formatDate(event.startDate)}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">End:</span> {formatDate(event.endDate)}
                        </p>
                      </div>
                    </div>

                    {event.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Location</p>
                          <p className="text-gray-600">{event.location}</p>
                        </div>
                      </div>
                    )}

                    {event.capacity && (
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Enrollment</p>
                          <p className="text-gray-600">
                            {event.enrolled || 0} of {event.capacity} participants enrolled
                          </p>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getEnrollmentPercentage()}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Event</h3>
                    <p className="text-gray-700 leading-relaxed">{event.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                    {event.status === 'OPEN' && (
                      <Button onClick={handleEnroll} className="bg-blue-600 hover:bg-blue-700">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Enroll Now
                      </Button>
                    )}
                    <Button variant="outline" onClick={handleSave} className="border-gray-300">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save Event
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="border-gray-300">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-sm text-gray-600">Academy: {event.academy}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      <span className="text-sm text-gray-600">Status: {event.status}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full" />
                      <span className="text-sm text-gray-600">Duration: 6 days</span>
                    </div>
                    {event.capacity && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full" />
                        <span className="text-sm text-gray-600">
                          Capacity: {event.capacity} participants
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Events</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 text-sm">Advanced Sales Training</h4>
                      <p className="text-xs text-gray-600">JFP - Sales • March 25-30</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 text-sm">Technical Skills Workshop</h4>
                      <p className="text-xs text-gray-600">Workera • April 5-10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EventDetail;
