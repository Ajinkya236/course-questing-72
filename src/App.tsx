
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from "@/components/ui/toaster";
import Home from '@/pages/Home';
import Mentoring from '@/pages/Mentoring';
import Discover from '@/pages/Discover';
import MyLearning from '@/pages/MyLearning';
import CoursePlayer from '@/pages/CoursePlayer';
import Notifications from '@/pages/Notifications';
import SearchResults from '@/pages/SearchResults';
import ViewAllPage from '@/pages/ViewAllPage';
import LeaderboardFullView from '@/pages/LeaderboardFullView';
import NotFound from '@/pages/NotFound';
import RecommendedMentorsPage from '@/pages/RecommendedMentorsPage';
import Actionables from '@/pages/Actionables';
import Milestones from '@/pages/Milestones';
import Profile from '@/pages/Profile';
import HeaderWithThemeToggle from '@/components/layout/HeaderWithThemeToggle';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <HeaderWithThemeToggle />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mentoring" element={<Mentoring />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/course/:id" element={<CoursePlayer />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/view-all/:category" element={<ViewAllPage />} />
            <Route path="/leaderboard" element={<LeaderboardFullView />} />
            <Route path="/recommended-mentors" element={<RecommendedMentorsPage />} />
            <Route path="/actionables" element={<Actionables />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
