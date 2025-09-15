import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Startpunkten för React-applikationen!
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)