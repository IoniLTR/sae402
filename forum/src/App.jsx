
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ForumPage from './ForumPage';
import MessagePage from './MessagePage';
import VoirForum from './VoirForum';

function AppRoutes() {
  

  return (
    <Routes>
      <Route path="/" element={<VoirForum />} />
      <Route path="/forums/:id" element={<ForumPage />} />
      <Route path="/messages/:id" element={<MessagePage />} />
      {/* Route 404 */}
      <Route path="*" element={<div>Page non trouvée</div>} />
    </Routes>
  );
}

export default function App() {
  return (
    
      <Router>
        
        <main >
          <AppRoutes />
        </main>
      </Router>
  );
}
