
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root element and render app immediately
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found");
}
