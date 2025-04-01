
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create a root
  const root = createRoot(rootElement);
  
  // Render the app immediately without any dynamic imports
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
