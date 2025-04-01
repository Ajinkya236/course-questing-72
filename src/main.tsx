
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root element
const root = document.getElementById("root");

// Immediately render the app to avoid loading issues
if (root) {
  createRoot(root).render(<App />);
} else {
  console.error("Root element not found");
}
