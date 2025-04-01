
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Simplify the initialization process to reduce potential errors
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
