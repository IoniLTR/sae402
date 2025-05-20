// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import VoirForum from "./pages/Home1";
import FormulaireAjouterForum from "./pages/ajouter_formulaire";
import FormulaireAjouterUtilisateur from "./pages/ajouterutilisateur";
import ForumPage from './pages/ForumPage';
import MessagePage from './pages/MessagePage';
import LoginForm from './pages/LoginForm';
import { AuthProvider } from "./context/AuthContext";
import PosterMessage from "./pages/PosterMessage";
import RepondreMessage from './pages/RepondreMessage';
import RepondreAReponse from './pages/RepondreAReponse';
import RepondreAReponseWrapper from "./pages/RepondreAReponseWrapper";

export default function App() {
  const [inputname, setInputname] = useState('');
  const [inputdescription, setInputdescription] = useState('');
  const [inputtheme, setInputtheme] = useState('');

  const [inputuser, setInputuser] = useState('');
  const [inputpassword, setInputpassword] = useState('');
  const [inputrole, setInputrole] = useState('');

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<VoirForum />} />
            <Route path="/forums" element={<ForumPage />} /> {/* ✅ Ajout ici */}
            <Route path="/forums/:id" element={<ForumPage />} />
            <Route path="/forums/:id/poster" element={<PosterMessage />} />
            <Route path="/repondre/:id" element={<RepondreMessage />} />
            <Route path="/repondre-a-reponse/:id" element={<RepondreAReponseWrapper />} />
            <Route path="/messages/:id" element={<MessagePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route 
              path="/Ajouterunforum" 
              element={
                <FormulaireAjouterForum
                  inputname={inputname}
                  inputdescription={inputdescription}
                  inputtheme={inputtheme}
                  setInputname={setInputname}
                  setInputdescription={setInputdescription}
                  setInputtheme={setInputtheme}
                />
              }
            />
            <Route 
              path="/Ajouterutilisateur" 
              element={
                <FormulaireAjouterUtilisateur
                  inputuser={inputuser}
                  inputpassword={inputpassword}
                  inputrole={inputrole}
                  setInputuser={setInputuser}
                  setInputpassword={setInputpassword}
                  setInputrole={setInputrole}
                />
              }
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
