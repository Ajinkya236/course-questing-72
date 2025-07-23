import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient } from 'react-query';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';
import { SpinTheWheelProvider } from './context/SpinTheWheelContext';
import { Toaster } from '@/components/ui/sonner';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Events from './pages/Events';
import SpinTheWheel from './pages/SpinTheWheel';
import Rewards from './pages/Rewards';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import Users from './pages/Users';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import EventDetail from './pages/EventDetail';

function App() {
  return (
    <BrowserRouter>
      <QueryClient>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AuthProvider>
            <SpinTheWheelProvider>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<CourseDetail />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/spin-the-wheel" element={<ProtectedRoute><SpinTheWheel /></ProtectedRoute>} />
                  <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
                  <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard />} />
                  <Route path="/profile" element={<ProtectedRoute><Profile />} />
                  <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                  <Route path="/admin/courses/create" element={<AdminRoute><CreateCourse /></AdminRoute>} />
                  <Route path="/admin/courses/edit/:id" element={<AdminRoute><EditCourse /></AdminRoute>} />
                  <Route path="/admin/events/create" element={<AdminRoute><CreateEvent /></AdminRoute>} />
                  <Route path="/admin/events/edit/:id" element={<AdminRoute><EditEvent /></AdminRoute>} />
                  <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
                  <Route path="/events/:id" element={<EventDetail />} />
                </Routes>
                <Toaster />
              </div>
            </SpinTheWheelProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClient>
    </BrowserRouter>
  );
}

export default App;
