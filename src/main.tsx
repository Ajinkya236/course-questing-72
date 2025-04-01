
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Add event listener to render the app only after the page has fully loaded
// This improves perceived performance by ensuring critical content loads first
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
}
