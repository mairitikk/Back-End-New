import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Root from './Root.jsx'; // Import the Root component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root /> {/* Use the Root component */}
  </StrictMode>
);