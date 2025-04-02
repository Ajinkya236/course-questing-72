
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkillDetail from './pages/SkillDetail';
import SkillAssessment from './pages/SkillAssessment';
import ConceptMapPage from './pages/ConceptMapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/skills/:skillId" element={<SkillDetail />} />
        <Route path="/skills/:skillId/assessment" element={<SkillAssessment />} />
        <Route path="/concept-map/:skillId" element={<ConceptMapPage />} />
        <Route path="*" element={<SkillDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
