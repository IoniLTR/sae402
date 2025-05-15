import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VoirForum from './VoirForum.jsx'
import MessagePage from './MessagePage.jsx'
import App from './App.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
