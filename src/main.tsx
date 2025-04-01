
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Directly initialize the app without event listeners
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
