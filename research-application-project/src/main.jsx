import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.jsx'
import CreateStudy from './components/dashboard/CreateStudy.jsx'
import CurrentStudy from './components/dashboard/CurrentStudy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
