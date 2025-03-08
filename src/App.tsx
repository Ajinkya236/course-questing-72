import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "@/components/hooks/use-theme"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/toaster"
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Discover from './pages/Discover';
import MyLearning from './pages/MyLearning';
import CoursePlayer from './pages/CoursePlayer';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ViewAllPage from './pages/ViewAllPage';
import SearchResults from './pages/SearchResults';
import Actionables from './pages/Actionables';
import LeaderboardFullView from './pages/LeaderboardFullView';
import Mentoring from './pages/Mentoring';
import MyTeam from './pages/MyTeam';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import RecommendedMentorsPage from './pages/RecommendedMentorsPage';

// Add the new domain-related page imports
import ViewAllDomainsPage from './pages/ViewAllDomainsPage';
import DomainCoursesPage from './pages/DomainCoursesPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { theme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const [isOnline, setIsOnline] = React.useState(true)
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r flex-none hidden md:block">
        <ScrollArea className="h-screen">
          <div className="p-4 space-y-4">
            <h1 className="font-bold text-lg">LMS</h1>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = "/"}>Home</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = "/discover"}>Discover</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = "/my-learning"}>My Learning</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = "/notifications"}>Notifications</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = "/profile"}>Profile</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = "/my-team"}>My Team</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = "/mentoring"}>Mentoring</Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = "/faq"}>FAQ</Button>
            <ModeToggle />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bio" className="text-right">
                      Bio
                    </Label>
                    <Input id="bio" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="online" className="text-right">
                      Online
                    </Label>
                    <Switch
                      id="online"
                      defaultChecked={isOnline}
                      onCheckedChange={(checked) => setIsOnline(checked)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button>Open</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[400px] rounded-md border bg-popover text-popover-foreground p-4" side="bottom" align="center">
                    <p className="text-sm font-medium leading-none">shadcn</p>
                    <p className="text-sm text-muted-foreground">
                      Beautifully designed components that you can copy and paste into your apps.
                    </p>
                  </HoverCardContent>
                </HoverCard>
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <ScrollArea className="h-screen">
          {children}
          <Toaster />
        </ScrollArea>
      </div>
    </div>
  );
};

function App() {
  const { theme, setTheme } = useTheme()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
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
            <Route path="/my-team/member/:memberId/learning" element={<MyLearning teamMemberId=":memberId" />} />
            <Route path="/my-team/member/:memberId/goals" element={<MyLearning teamMemberId=":memberId" />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* New routes for domains */}
            <Route path="/view-all/domains" element={<ViewAllDomainsPage />} />
            <Route path="/domain/:domainId" element={<DomainCoursesPage />} />
            
            <Route path="/mentoring/recommended-mentors" element={<RecommendedMentorsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
