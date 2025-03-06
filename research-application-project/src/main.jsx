import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/global-styles/App.css'
import App from './App.jsx'
import CreateStudy from './components/dashboard/CreateStudy/CreateStudy.jsx'
import CurrentStudy from './components/dashboard/CurrentStudy/CurrentStudy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
