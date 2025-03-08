
import React, { useState, useEffect, createContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import MyLearning from "./pages/MyLearning";
import CoursePlayer from "./pages/CoursePlayer";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar"; // Fixed casing to match the file
import ViewAllPage from "./pages/ViewAllPage";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Milestones from "./pages/Milestones";
import Actionables from "./pages/Actionables";
import Mentoring from "./pages/Mentoring";
import SearchResults from "./pages/SearchResults";
import RecommendedMentorsPage from "./pages/RecommendedMentorsPage";
import { SpinTheWheelProvider } from "./contexts/SpinTheWheelContext";
import MyTeam from "./pages/MyTeam";
import SignIn from "./pages/SignIn";

const queryClient = new QueryClient();

// Create auth context
export const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

type User = {
  email: string;
  name: string;
  role: string;
};

// This layout component handles the page content padding
const PageLayout = () => {
  return (
    <div className="p-4 md:p-6">
      <Outlet />
    </div>
  );
};

// Auth protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (email: string, password: string) => {
    // In a real app, this would validate with a backend
    // For now, just create a user account with the email
    const newUser = {
      email,
      name: email.split('@')[0], // Simple name extraction from email
      role: 'Employee',
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SpinTheWheelProvider>
          <AuthContext.Provider value={{ user, login, logout }}>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                
                <Route element={
                  <ProtectedRoute>
                    <PageLayout />
                  </ProtectedRoute>
                }>
                  <Route path="/" element={<Home />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/my-learning" element={<MyLearning />} />
                  <Route path="/course/:courseId" element={<CoursePlayer />} />
                  <Route path="/view-all/:category" element={<ViewAllPage />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/milestones" element={<Milestones />} />
                  <Route path="/actionables" element={<Actionables />} />
                  <Route path="/mentoring" element={<Mentoring />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/recommended-mentors" element={<RecommendedMentorsPage />} />
                  <Route path="/my-team" element={<MyTeam />} />
                  <Route path="/my-team/member/:memberId/learning" element={<MyLearning initialTab="courses" />} />
                  <Route path="/my-team/member/:memberId/goals" element={<MyLearning initialTab="goals" />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthContext.Provider>
        </SpinTheWheelProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
