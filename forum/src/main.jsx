import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VoirForum from './VoirForum.jsx'
import MessagePage from './MessagePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VoirForum />
  </StrictMode>,
)
