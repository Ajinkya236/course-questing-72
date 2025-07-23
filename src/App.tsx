
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { SpinTheWheelProvider } from '@/contexts/SpinTheWheelContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import PageLayout from '@/components/layout/PageLayout';
import Home from '@/pages/Home';
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';
import Discover from '@/pages/Discover';
import MyLearning from '@/pages/MyLearning';
import MyTeam from '@/pages/MyTeam';
import Skills from '@/pages/Skills';
import SkillDetail from '@/pages/SkillDetail';
import SkillAssessment from '@/pages/SkillAssessment';
import Mentoring from '@/pages/Mentoring';
import Profile from '@/pages/Profile';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import NotFound from '@/pages/NotFound';
import SearchResults from '@/pages/SearchResults';
import Notifications from '@/pages/Notifications';
import CoursePlayer from '@/pages/CoursePlayer';
import DomainCoursesPage from '@/pages/DomainCoursesPage';
import ViewAllPage from '@/pages/ViewAllPage';
import ViewAllDomainsPage from '@/pages/ViewAllDomainsPage';
import LeaderboardFullView from '@/pages/LeaderboardFullView';
import RecommendedMentorsPage from '@/pages/RecommendedMentorsPage';
import Actionables from '@/pages/Actionables';
import Milestones from '@/pages/Milestones';
import FAQ from '@/pages/FAQ';
import EvaluationForm from '@/pages/EvaluationForm';
import EvaluatorDashboard from '@/pages/EvaluatorDashboard';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminCourses from '@/pages/admin/Courses';
import AdminModules from '@/pages/admin/Modules';
import AdminActivities from '@/pages/admin/Activities';
import AdminCourseCreation from '@/pages/admin/CourseCreation';

const queryClient = new QueryClient();

// Auth-only pages that don't need layout
const AuthPages = () => (
  <Routes>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
  </Routes>
);

// Main app pages with layout
const AppPages = () => (
  <PageLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/my-learning" element={<MyLearning />} />
      <Route path="/my-team" element={<MyTeam />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/skills/:id" element={<SkillDetail />} />
      <Route path="/skills/:id/assessment" element={<SkillAssessment />} />
      <Route path="/mentoring" element={<Mentoring />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/course/:id" element={<CoursePlayer />} />
      <Route path="/domain/:domain" element={<DomainCoursesPage />} />
      <Route path="/view-all/:type" element={<ViewAllPage />} />
      <Route path="/view-all-domains" element={<ViewAllDomainsPage />} />
      <Route path="/leaderboard" element={<LeaderboardFullView />} />
      <Route path="/recommended-mentors" element={<RecommendedMentorsPage />} />
      <Route path="/actionables" element={<Actionables />} />
      <Route path="/milestones" element={<Milestones />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/evaluation" element={<EvaluationForm />} />
      <Route path="/evaluator-dashboard" element={<EvaluatorDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
      <Route path="/admin/modules" element={<AdminModules />} />
      <Route path="/admin/activities" element={<AdminActivities />} />
      <Route path="/admin/course-creation" element={<AdminCourseCreation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </PageLayout>
);

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
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/*" element={<AppPages />} />
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
