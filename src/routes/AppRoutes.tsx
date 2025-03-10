
import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageLayout from '@/components/layout/PageLayout';

// Lazy load pages
const SignIn = lazy(() => import('@/pages/SignIn'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const Home = lazy(() => import('@/pages/Home'));
const Discover = lazy(() => import('@/pages/Discover'));
const MyLearning = lazy(() => import('@/pages/MyLearning'));
const CoursePlayer = lazy(() => import('@/pages/CoursePlayer'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const Profile = lazy(() => import('@/pages/Profile'));
const ViewAllPage = lazy(() => import('@/pages/ViewAllPage'));
const SearchResults = lazy(() => import('@/pages/SearchResults'));
const Actionables = lazy(() => import('@/pages/Actionables'));
const LeaderboardFullView = lazy(() => import('@/pages/LeaderboardFullView'));
const Mentoring = lazy(() => import('@/pages/Mentoring'));
const MyTeam = lazy(() => import('@/pages/MyTeam'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const RecommendedMentorsPage = lazy(() => import('@/pages/RecommendedMentorsPage'));
const MentorProfilePage = lazy(() => import('@/pages/MentorProfilePage'));
const ViewAllDomainsPage = lazy(() => import('@/pages/ViewAllDomainsPage'));
const DomainCoursesPage = lazy(() => import('@/pages/DomainCoursesPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
    <span className="ml-3 text-primary">Loading...</span>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <PageLayout>
              <Outlet />
            </PageLayout>
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/course/:courseId" element={<CoursePlayer />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-all/:category" element={<ViewAllPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/actionables" element={<Actionables />} />
          <Route path="/milestones" element={<LeaderboardFullView />} />
          <Route path="/mentoring" element={<Mentoring />} />
          <Route path="/my-team" element={<MyTeam />} />
          <Route path="/my-team/member/:memberId" element={<Profile />} />
          <Route path="/faq" element={<FAQ />} />
          
          <Route path="/view-all/domains" element={<ViewAllDomainsPage />} />
          <Route path="/domain/:domainId" element={<DomainCoursesPage />} />
          
          <Route path="/mentoring/recommended-mentors" element={<RecommendedMentorsPage />} />
          <Route path="/mentoring/mentor/:mentorId" element={<MentorProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardFullView />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
