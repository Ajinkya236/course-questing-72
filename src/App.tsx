import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, Link } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider"
import { useTheme } from "./components/hooks/use-theme"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/toaster"
import { ModeToggle } from './components/ui/mode-toggle';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon, Compass, BookOpen, Bell, User, Users, Headphones, HelpCircle, LogOut } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

interface PageLayoutProps {
  children: React.ReactNode;
}

const TopNavigation: React.FC = () => {
  return (
    <div className="w-full border-b bg-background sticky top-0 z-10">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="font-bold text-lg">Jio Learning</h1>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild size="sm">
              <Link to="/" className="flex items-center gap-1">
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Compass className="h-4 w-4" />
                  <span>Discover</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/view-all/domains">All Domains</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/view-all/trending">Trending Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/view-all/popular">Popular Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/view-all/new">New Releases</Link>
                </DropdownMenuItem>
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>View Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/faq" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQs</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/sign-in" className="flex items-center gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Link>
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
    <div className="flex flex-col h-screen bg-background">
      <TopNavigation />
      
      <div className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full">
          {children}
          <Toaster />
        </ScrollArea>
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
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
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
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
