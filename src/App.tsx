
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SkillDetail from './pages/SkillDetail';
import SkillAssessment from './pages/SkillAssessment';
import ConceptMapPage from './pages/ConceptMapPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills/:skillId" element={<SkillDetail />} />
        <Route path="/skills/:skillId/assessment" element={<SkillAssessment />} />
        <Route path="/concept-map" element={<ConceptMapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
