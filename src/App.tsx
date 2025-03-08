
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import MyLearning from "./pages/MyLearning";
import CoursePlayer from "./pages/CoursePlayer";
import NotFound from "./pages/NotFound";
import NavbarWithSidebar from "./components/layout/NavbarWithSidebar"; // New sidebar navbar
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

const queryClient = new QueryClient();

// This layout component handles the page content padding
const PageLayout = () => {
  return (
    <div className="p-4 md:p-6">
      <Outlet />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SpinTheWheelProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavbarWithSidebar />
          <Routes>
            <Route element={<PageLayout />}>
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
              <Route path="/my-team/member/:memberId/:tab" element={<MyLearning />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SpinTheWheelProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
