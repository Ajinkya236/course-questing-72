
import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home'; // Direct import to avoid lazy loading issues

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Discover = lazy(() => import('./pages/Discover'));
const MyLearning = lazy(() => import('./pages/MyLearning'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Profile = lazy(() => import('./pages/Profile'));
const ViewAllPage = lazy(() => import('./pages/ViewAllPage'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const Actionables = lazy(() => import('./pages/Actionables'));
const LeaderboardFullView = lazy(() => import('./pages/LeaderboardFullView'));
const Mentoring = lazy(() => import('./pages/Mentoring'));
const MyTeam = lazy(() => import('./pages/MyTeam'));
const FAQ = lazy(() => import('./pages/FAQ'));
const NotFound = lazy(() => import('./pages/NotFound'));
const RecommendedMentorsPage = lazy(() => import('./pages/RecommendedMentorsPage'));
const ViewAllDomainsPage = lazy(() => import('./pages/ViewAllDomainsPage'));
const DomainCoursesPage = lazy(() => import('./pages/DomainCoursesPage'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminCourses = lazy(() => import('./pages/admin/Courses'));
const AdminModules = lazy(() => import('./pages/admin/Modules'));
const AdminActivities = lazy(() => import('./pages/admin/Activities'));
const CourseCreation = lazy(() => import('./pages/admin/CourseCreation'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
    <span className="ml-3 text-primary">Loading...</span>
  </div>
);

const ProtectedRoute = () => {
  const { user, session } = useContext(AuthContext);

  if (!user || !session) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              <Route element={<ProtectedRoute />}>
                {/* Learner Routes */}
                <Route path="/" element={<PageLayout><Home /></PageLayout>} />
                <Route path="/discover" element={<PageLayout><Discover /></PageLayout>} />
                <Route path="/my-learning" element={<PageLayout><MyLearning /></PageLayout>} />
                <Route path="/my-learning/:tab" element={<PageLayout><MyLearning /></PageLayout>} />
                <Route path="/course/:courseId" element={<PageLayout><CoursePlayer /></PageLayout>} />
                <Route path="/notifications" element={<PageLayout><Notifications /></PageLayout>} />
                <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
                <Route path="/view-all/:category" element={<PageLayout><ViewAllPage /></PageLayout>} />
                <Route path="/search" element={<PageLayout><SearchResults /></PageLayout>} />
                <Route path="/actionables" element={<PageLayout><Actionables /></PageLayout>} />
                <Route path="/milestones" element={<PageLayout><LeaderboardFullView /></PageLayout>} />
                <Route path="/mentoring" element={<PageLayout><Mentoring /></PageLayout>} />
                <Route path="/my-team" element={<PageLayout><MyTeam /></PageLayout>} />
                <Route path="/my-team/member/:memberId" element={<PageLayout><Profile /></PageLayout>} />
                <Route path="/my-team/member/:memberId/learning" element={<PageLayout><MyLearning /></PageLayout>} />
                <Route path="/my-team/member/:memberId/goals" element={<PageLayout><MyLearning /></PageLayout>} />
                <Route path="/faq" element={<PageLayout><FAQ /></PageLayout>} />
                <Route path="/view-all/domains" element={<PageLayout><ViewAllDomainsPage /></PageLayout>} />
                <Route path="/domain/:domainId" element={<PageLayout><DomainCoursesPage /></PageLayout>} />
                <Route path="/mentoring/recommended-mentors" element={<PageLayout><RecommendedMentorsPage /></PageLayout>} />
                <Route path="/leaderboard" element={<PageLayout><LeaderboardFullView /></PageLayout>} />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<PageLayout><AdminDashboard /></PageLayout>} />
                <Route path="/admin/courses" element={<PageLayout><AdminCourses /></PageLayout>} />
                <Route path="/admin/modules" element={<PageLayout><AdminModules /></PageLayout>} />
                <Route path="/admin/activities" element={<PageLayout><AdminActivities /></PageLayout>} />
                <Route path="/admin/courses/create" element={<PageLayout><CourseCreation /></PageLayout>} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
