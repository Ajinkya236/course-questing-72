
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { SpinTheWheelProvider } from '@/contexts/SpinTheWheelContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import PageLayout from '@/components/layout/PageLayout';

// Import all pages
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
import Notifications from '@/pages/Notifications';
import SearchResults from '@/pages/SearchResults';
import Actionables from '@/pages/Actionables';
import Milestones from '@/pages/Milestones';
import CoursePlayer from '@/pages/CoursePlayer';
import DomainCoursesPage from '@/pages/DomainCoursesPage';
import ViewAllPage from '@/pages/ViewAllPage';
import ViewAllDomainsPage from '@/pages/ViewAllDomainsPage';
import LeaderboardFullView from '@/pages/LeaderboardFullView';
import RecommendedMentorsPage from '@/pages/RecommendedMentorsPage';
import EvaluationForm from '@/pages/EvaluationForm';
import EvaluatorDashboard from '@/pages/EvaluatorDashboard';
import FAQ from '@/pages/FAQ';

// Auth pages (these should NOT have PageLayout)
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminCourses from '@/pages/admin/Courses';
import AdminCourseCreation from '@/pages/admin/CourseCreation';
import AdminModules from '@/pages/admin/Modules';
import AdminActivities from '@/pages/admin/Activities';

// 404 page
import NotFound from '@/pages/NotFound';

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
                    {/* Auth routes - NO PageLayout */}
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    
                    {/* Main app routes - WITH PageLayout */}
                    <Route path="/" element={<PageLayout><Home /></PageLayout>} />
                    <Route path="/discover" element={<PageLayout><Discover /></PageLayout>} />
                    <Route path="/my-learning" element={<PageLayout><MyLearning /></PageLayout>} />
                    <Route path="/my-team" element={<PageLayout><MyTeam /></PageLayout>} />
                    <Route path="/events" element={<PageLayout><Events /></PageLayout>} />
                    <Route path="/events/:id" element={<PageLayout><EventDetail /></PageLayout>} />
                    <Route path="/skills" element={<PageLayout><Skills /></PageLayout>} />
                    <Route path="/skills/:skillId" element={<PageLayout><SkillDetail /></PageLayout>} />
                    <Route path="/skills/:skillId/assessment" element={<PageLayout><SkillAssessment /></PageLayout>} />
                    <Route path="/mentoring" element={<PageLayout><Mentoring /></PageLayout>} />
                    <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
                    <Route path="/notifications" element={<PageLayout><Notifications /></PageLayout>} />
                    <Route path="/search" element={<PageLayout><SearchResults /></PageLayout>} />
                    <Route path="/actionables" element={<PageLayout><Actionables /></PageLayout>} />
                    <Route path="/milestones" element={<PageLayout><Milestones /></PageLayout>} />
                    <Route path="/course/:courseId" element={<PageLayout><CoursePlayer /></PageLayout>} />
                    <Route path="/domain/:domainId" element={<PageLayout><DomainCoursesPage /></PageLayout>} />
                    <Route path="/view-all" element={<PageLayout><ViewAllPage /></PageLayout>} />
                    <Route path="/view-all-domains" element={<PageLayout><ViewAllDomainsPage /></PageLayout>} />
                    <Route path="/leaderboard" element={<PageLayout><LeaderboardFullView /></PageLayout>} />
                    <Route path="/recommended-mentors" element={<PageLayout><RecommendedMentorsPage /></PageLayout>} />
                    <Route path="/evaluation" element={<PageLayout><EvaluationForm /></PageLayout>} />
                    <Route path="/evaluator-dashboard" element={<PageLayout><EvaluatorDashboard /></PageLayout>} />
                    <Route path="/faq" element={<PageLayout><FAQ /></PageLayout>} />
                    
                    {/* Admin routes - WITH PageLayout */}
                    <Route path="/admin/dashboard" element={<PageLayout><AdminDashboard /></PageLayout>} />
                    <Route path="/admin/courses" element={<PageLayout><AdminCourses /></PageLayout>} />
                    <Route path="/admin/course-creation" element={<PageLayout><AdminCourseCreation /></PageLayout>} />
                    <Route path="/admin/modules" element={<PageLayout><AdminModules /></PageLayout>} />
                    <Route path="/admin/activities" element={<PageLayout><AdminActivities /></PageLayout>} />
                    
                    {/* 404 route */}
                    <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
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
