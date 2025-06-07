
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PartyPopper, Calendar, Clock } from 'lucide-react';

const Events: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Events | Learning Management System</title>
      </Helmet>
      
      <div className="container mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-6 rounded-full">
              <PartyPopper className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">Events</h1>
          <p className="text-xl text-muted-foreground">
            Exciting learning events coming soon!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Workshops</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Interactive learning workshops with industry experts
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Live Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Real-time learning sessions with Q&A opportunities
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <PartyPopper className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Special Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Exclusive learning events and celebrations
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Stay Tuned!</h3>
              <p className="text-muted-foreground">
                We're working on bringing you amazing learning events. 
                Check back soon for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Events;
