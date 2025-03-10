
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, Link } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ModeToggle } from './components/ui/mode-toggle';
import { Button } from '@/components/ui/button';
import { 
  Home as HomeIcon, 
  Compass, 
  BookOpen, 
  Bell, 
  User, 
  Users, 
  Headphones, 
  HelpCircle,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

// Lazy load pages
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Home = lazy(() => import('./pages/Home'));
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

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
    <span className="ml-3 text-primary">Loading...</span>
  </div>
);

interface PageLayoutProps {
  children: React.ReactNode;
}

const courseCategories = [
  "Leadership & Management",
  "Technical Skills",
  "Data & Analytics",
  "Marketing & Digital",
  "Product Management",
  "Design & Innovation",
  "Soft Skills",
  "Project Management",
  "Compliance & Safety"
];

const TopNavigation: React.FC = () => {
  const [isDiscoverHovered, setIsDiscoverHovered] = React.useState(false);
  const { user, logout } = React.useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="w-full border-b bg-background sticky top-0 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="font-bold text-lg">Jio Learning</h1>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild size="sm">
              <Link to="/" className="flex items-center gap-1">
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
            
            <DropdownMenu open={isDiscoverHovered} onOpenChange={setIsDiscoverHovered}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onMouseEnter={() => setIsDiscoverHovered(true)}
                  onMouseLeave={() => setIsDiscoverHovered(false)}
                  asChild
                >
                  <Link to="/discover" className="flex items-center gap-1">
                    <Compass className="h-4 w-4" />
                    <span>Discover</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Link>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-56"
                onMouseEnter={() => setIsDiscoverHovered(true)}
                onMouseLeave={() => setIsDiscoverHovered(false)}
              >
                {courseCategories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link to={`/discover?category=${encodeURIComponent(category)}`}>
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/discover">View All Categories</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" asChild size="sm">
              <Link to="/my-learning" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>My Learning</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/my-team" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>My Team</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/mentoring" className="flex items-center gap-1">
                <Headphones className="h-4 w-4" />
                <span>Mentoring</span>
              </Link>
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/faq">
              <HelpCircle className="h-5 w-5" />
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                <img 
                  src={user?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/faq">FAQs</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavigation />
      
      <div className="flex-1 py-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
        <Toaster />
      </div>
    </div>
  );
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
                <Route path="/leaderboard" element={<LeaderboardFullView />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
