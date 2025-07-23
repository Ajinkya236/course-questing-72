
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { SpinTheWheelProvider } from '@/contexts/SpinTheWheelContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import Home from '@/pages/Home';
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Router>
            <AuthProvider>
              <SpinTheWheelProvider>
                <div className="min-h-screen bg-background">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                  </Routes>
                </div>
                <Toaster />
              </SpinTheWheelProvider>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
