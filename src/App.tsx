
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import MyLearning from "./pages/MyLearning";
import CoursePlayer from "./pages/CoursePlayer";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/NavbarEnhanced"; // Enhanced premium navbar
import ViewAllPage from "./pages/ViewAllPage";
import Notifications from "./pages/Notifications";
import LeaderboardFullView from "./pages/LeaderboardFullView";
import Profile from "./pages/Profile";
import Milestones from "./pages/Milestones"; // New Milestones page
import Actionables from "./pages/Actionables"; // New Actionables page
import { Helmet } from "react-helmet";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Helmet>
        <title>Learning Management System</title>
        <meta name="description" content="A modern learning management system with gamification features" />
      </Helmet>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/my-learning" element={<MyLearning />} />
              <Route path="/course/:courseId" element={<CoursePlayer />} />
              <Route path="/view-all/:category" element={<ViewAllPage />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/leaderboard" element={<LeaderboardFullView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/milestones" element={<Milestones />} />
              <Route path="/actionables" element={<Actionables />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
