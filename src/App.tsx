import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import SkillAssessment from './pages/SkillAssessment';

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

const Skills = lazy(() => import('./pages/Skills'));
const SkillDetail = lazy(() => import('./pages/SkillDetail'));

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

// Create an array of route objects with unique keys
const routeObjects = [
  { path: "/sign-in", element: <SignIn />, key: "sign-in" },
  { path: "/sign-up", element: <SignUp />, key: "sign-up" },
  { path: "/forgot-password", element: <ForgotPassword />, key: "forgot-password" },
  { path: "/reset-password", element: <ResetPassword />, key: "reset-password" },
  
  { path: "/", element: <ProtectedRoute />, key: "protected", children: [
    { path: "/", element: <PageLayout><Home /></PageLayout>, key: "home" },
    { path: "/discover", element: <PageLayout><Discover /></PageLayout>, key: "discover" },
    { path: "/my-learning", element: <PageLayout><MyLearning /></PageLayout>, key: "my-learning" },
    { path: "/my-learning/:tab", element: <PageLayout><MyLearning /></PageLayout>, key: "my-learning-tab" },
    { path: "/course/:courseId", element: <PageLayout><CoursePlayer /></PageLayout>, key: "course-player" },
    { path: "/notifications", element: <PageLayout><Notifications /></PageLayout>, key: "notifications" },
    { path: "/profile", element: <PageLayout><Profile /></PageLayout>, key: "profile" },
    { path: "/view-all/:category", element: <PageLayout><ViewAllPage /></PageLayout>, key: "view-all" },
    { path: "/search", element: <PageLayout><SearchResults /></PageLayout>, key: "search" },
    { path: "/actionables", element: <PageLayout><Actionables /></PageLayout>, key: "actionables" },
    { path: "/milestones", element: <PageLayout><LeaderboardFullView /></PageLayout>, key: "milestones" },
    { path: "/mentoring", element: <PageLayout><Mentoring /></PageLayout>, key: "mentoring" },
    { path: "/my-team", element: <PageLayout><MyTeam /></PageLayout>, key: "my-team" },
    { path: "/my-team/member/:memberId", element: <PageLayout><Profile /></PageLayout>, key: "member-profile" },
    { path: "/my-team/member/:memberId/learning", element: <PageLayout><MyLearning /></PageLayout>, key: "member-learning" },
    { path: "/my-team/member/:memberId/goals", element: <PageLayout><MyLearning /></PageLayout>, key: "member-goals" },
    { path: "/faq", element: <PageLayout><FAQ /></PageLayout>, key: "faq" },
    { path: "/view-all/domains", element: <PageLayout><ViewAllDomainsPage /></PageLayout>, key: "view-all-domains" },
    { path: "/domain/:domainId", element: <PageLayout><DomainCoursesPage /></PageLayout>, key: "domain-courses" },
    { path: "/mentoring/recommended-mentors", element: <PageLayout><RecommendedMentorsPage /></PageLayout>, key: "recommended-mentors" },
    { path: "/leaderboard", element: <PageLayout><LeaderboardFullView /></PageLayout>, key: "leaderboard" },
    
    { path: "/skills", element: <PageLayout><Skills /></PageLayout>, key: "skills" },
    { path: "/skills/:skillId", element: <PageLayout><SkillDetail /></PageLayout>, key: "skill-detail" },
    { path: "/skills/role", element: <PageLayout><Skills /></PageLayout>, key: "skills-role" },
    { path: "/skills/recommended", element: <PageLayout><Skills /></PageLayout>, key: "skills-recommended" },
    { path: "/skills/trending", element: <PageLayout><Skills /></PageLayout>, key: "skills-trending" },
    
    { path: "/skills/:skillId/assessment", element: <SkillAssessment />, key: "skill-assessment" },
    
    { path: "/skills/:skillId/concept-map", element={<ConceptMapFullPage />} },
    
    { path: "/admin/dashboard", element: <PageLayout><AdminDashboard /></PageLayout>, key: "admin-dashboard" },
    { path: "/admin/courses", element: <PageLayout><AdminCourses /></PageLayout>, key: "admin-courses" },
    { path: "/admin/modules", element: <PageLayout><AdminModules /></PageLayout>, key: "admin-modules" },
    { path: "/admin/activities", element: <PageLayout><AdminActivities /></PageLayout>, key: "admin-activities" },
    { path: "/admin/courses/create", element: <PageLayout><CourseCreation /></PageLayout>, key: "courses-create" },
  ]},
  
  { path: "*", element: <NotFound />, key: "not-found" }
];

// Helper function to convert the route objects to Route components
const renderRoutes = (routes) => {
  return routes.map(route => {
    if (route.children) {
      return (
        <Route key={route.key} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return <Route key={route.key} path={route.path} element={route.element} />;
  });
};

function ProtectedRoute() {
  const { user, session } = React.useContext(AuthContext);

  if (!user || !session) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
}

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
              {renderRoutes(routeObjects)}
            </Routes>
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
