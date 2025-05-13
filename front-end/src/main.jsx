import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/global-styles/App.css';
import App from './App.jsx';
import { ProjectProvider } from "./context/projectContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </StrictMode>
);


