
import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider as ShadcnThemeProvider } from "./components/theme-provider";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpinTheWheelProvider } from './contexts/SpinTheWheelContext';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import SkillAssessment from './pages/SkillAssessment';
import Index from './pages/Index';
import Events from './pages/Events';
import EvaluatorDashboard from './pages/EvaluatorDashboard';
import EvaluationForm from './pages/EvaluationForm';

// Import non-lazy components first
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Skills from './pages/Skills';
import SkillDetail from './pages/SkillDetail';

// Lazy load other components
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

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <ShadcnThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <SpinTheWheelProvider>
              <Router>
                <AuthProvider>
                  <Routes>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    
                    <Route element={<ProtectedRoute />}>
                      <Route path="/" element={<PageLayout><Home /></PageLayout>} />
                      <Route path="/discover" element={<PageLayout><Suspense fallback={<PageLoader />}><Discover /></Suspense></PageLayout>} />
                      <Route path="/my-learning" element={<PageLayout><Suspense fallback={<PageLoader />}><MyLearning /></Suspense></PageLayout>} />
                      <Route path="/my-learning/:tab" element={<PageLayout><Suspense fallback={<PageLoader />}><MyLearning /></Suspense></PageLayout>} />
                      <Route path="/course/:courseId" element={<PageLayout><Suspense fallback={<PageLoader />}><CoursePlayer /></Suspense></PageLayout>} />
                      <Route path="/notifications" element={<PageLayout><Suspense fallback={<PageLoader />}><Notifications /></Suspense></PageLayout>} />
                      <Route path="/profile" element={<PageLayout><Suspense fallback={<PageLoader />}><Profile /></Suspense></PageLayout>} />
                      <Route path="/view-all/:category" element={<PageLayout><Suspense fallback={<PageLoader />}><ViewAllPage /></Suspense></PageLayout>} />
                      <Route path="/search" element={<PageLayout><Suspense fallback={<PageLoader />}><SearchResults /></Suspense></PageLayout>} />
                      <Route path="/actionables" element={<PageLayout><Suspense fallback={<PageLoader />}><Actionables /></Suspense></PageLayout>} />
                      <Route path="/milestones" element={<PageLayout><Suspense fallback={<PageLoader />}><LeaderboardFullView /></Suspense></PageLayout>} />
                      <Route path="/mentoring" element={<PageLayout><Suspense fallback={<PageLoader />}><Mentoring /></Suspense></PageLayout>} />
                      <Route path="/my-team" element={<PageLayout><Suspense fallback={<PageLoader />}><MyTeam /></Suspense></PageLayout>} />
                      <Route path="/my-team/member/:memberId" element={<PageLayout><Suspense fallback={<PageLoader />}><Profile /></Suspense></PageLayout>} />
                      <Route path="/my-team/member/:memberId/learning" element={<PageLayout><Suspense fallback={<PageLoader />}><MyLearning /></Suspense></PageLayout>} />
                      <Route path="/my-team/member/:memberId/goals" element={<PageLayout><Suspense fallback={<PageLoader />}><MyLearning /></Suspense></PageLayout>} />
                      <Route path="/faq" element={<PageLayout><Suspense fallback={<PageLoader />}><FAQ /></Suspense></PageLayout>} />
                      <Route path="/view-all/domains" element={<PageLayout><Suspense fallback={<PageLoader />}><ViewAllDomainsPage /></Suspense></PageLayout>} />
                      <Route path="/domain/:domainId" element={<PageLayout><Suspense fallback={<PageLoader />}><DomainCoursesPage /></Suspense></PageLayout>} />
                      <Route path="/mentoring/recommended-mentors" element={<PageLayout><Suspense fallback={<PageLoader />}><RecommendedMentorsPage /></Suspense></PageLayout>} />
                      <Route path="/leaderboard" element={<PageLayout><Suspense fallback={<PageLoader />}><LeaderboardFullView /></Suspense></PageLayout>} />
                      
                      <Route path="/skills" element={<PageLayout><Skills /></PageLayout>} />
                      <Route path="/skills/:skillId" element={<PageLayout><SkillDetail /></PageLayout>} />
                      <Route path="/skills/role" element={<PageLayout><Skills /></PageLayout>} />
                      <Route path="/skills/recommended" element={<PageLayout><Skills /></PageLayout>} />
                      <Route path="/skills/trending" element={<PageLayout><Skills /></PageLayout>} />
                      
                      <Route path="/skills/:skillId/assessment" element={<SkillAssessment />} />
                      
                      <Route path="/evaluator" element={<PageLayout><EvaluatorDashboard /></PageLayout>} />
                      <Route path="/evaluator/evaluate/:submissionId" element={<PageLayout><EvaluationForm /></PageLayout>} />
                      <Route path="/evaluator/view/:submissionId" element={<PageLayout><EvaluationForm /></PageLayout>} />
                      
                      <Route path="/admin/dashboard" element={<PageLayout><Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense></PageLayout>} />
                      <Route path="/admin/courses" element={<PageLayout><Suspense fallback={<PageLoader />}><AdminCourses /></Suspense></PageLayout>} />
                      <Route path="/admin/modules" element={<PageLayout><Suspense fallback={<PageLoader />}><AdminModules /></Suspense></PageLayout>} />
                      <Route path="/admin/activities" element={<PageLayout><Suspense fallback={<PageLoader />}><AdminActivities /></Suspense></PageLayout>} />
                      <Route path="/admin/courses/create" element={<PageLayout><Suspense fallback={<PageLoader />}><CourseCreation /></Suspense></PageLayout>} />
                      
                      <Route 
                        path="/events" 
                        element={
                          <PageLayout>
                            <Events />
                          </PageLayout>
                        } 
                      />
                    </Route>
                    
                    <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
                  </Routes>
                </AuthProvider>
              </Router>
            </SpinTheWheelProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ShadcnThemeProvider>
    </div>
  );
}

export default App;
