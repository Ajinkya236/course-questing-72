
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
import Profile from "./pages/Profile";
import Milestones from "./pages/Milestones"; // New Milestones page
import Actionables from "./pages/Actionables"; // New Actionables page
import Mentoring from "./pages/Mentoring"; // New Mentoring page
import SearchResults from "./pages/SearchResults"; // New Search Results page
import { Helmet } from "react-helmet";
import RecommendedMentorsPage from "./pages/RecommendedMentorsPage"; // New Recommended Mentors page
import { SpinTheWheelProvider } from "./contexts/SpinTheWheelContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Helmet>
        <title>Learning Management System</title>
        <meta name="description" content="A modern learning management system with gamification features" />
      </Helmet>
      <SpinTheWheelProvider>
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
                <Route path="/profile" element={<Profile />} />
                <Route path="/milestones" element={<Milestones />} />
                <Route path="/actionables" element={<Actionables />} />
                <Route path="/mentoring" element={<Mentoring />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/recommended-mentors" element={<RecommendedMentorsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </SpinTheWheelProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
