
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Render the app immediately to avoid loading issues
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
