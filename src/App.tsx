
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import MyLearning from "./pages/MyLearning";
import CoursePlayer from "./pages/CoursePlayer";
import ViewAllPage from "./pages/ViewAllPage";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Actionables from "./pages/Actionables";
import LearningStreak from "./pages/LearningStreak";
import Milestones from "./pages/Milestones";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/course/:courseId" element={<CoursePlayer />} />
        <Route path="/view-all/:category" element={<ViewAllPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/actionables" element={<Actionables />} />
        <Route path="/learning-streak" element={<LearningStreak />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
