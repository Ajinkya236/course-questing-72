
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './components/ThemeProvider';
import Home from './pages/Home';
import Discover from './pages/Discover';
import MyLearning from './pages/MyLearning';
import CoursePlayer from './pages/CoursePlayer';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import MyTeam from './pages/MyTeam';
import Notifications from './pages/Notifications';
import SearchResults from './pages/SearchResults';
import ViewAllPage from './pages/ViewAllPage';
import DomainCoursesPage from './pages/DomainCoursesPage';
import ViewAllDomainsPage from './pages/ViewAllDomainsPage';
import { AuthProvider } from './contexts/AuthContext';
import LeaderboardFullView from './pages/LeaderboardFullView';
import { Toaster } from './components/ui/toaster';
import Mentoring from './pages/Mentoring';
import RecommendedMentorsPage from './pages/RecommendedMentorsPage';
import Milestones from './pages/Milestones';
import FAQ from './pages/FAQ';
import Actionables from './pages/Actionables';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/course/:courseId" element={<CoursePlayer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/my-team" element={<MyTeam />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/view-all/:categoryId" element={<ViewAllPage />} />
            <Route path="/domain/:domainId" element={<DomainCoursesPage />} />
            <Route path="/domains" element={<ViewAllDomainsPage />} />
            <Route path="/leaderboard" element={<LeaderboardFullView />} />
            <Route path="/mentoring/*" element={<Mentoring />} />
            <Route path="/recommended-mentors" element={<RecommendedMentorsPage />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/actionables" element={<Actionables />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
