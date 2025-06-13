import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Home1 from "./pages/Home1"; // ✅ Page d'accueil
import VoirForum from "./pages/VoirForum"; // ✅ Affiche la liste des forums filtrés
import FormulaireAjouterForum from "./pages/ajouter_formulaire";
import FormulaireAjouterUtilisateur from "./pages/ajouterutilisateur";
import ForumPage from "./pages/ForumPage";
import MessagePage from "./pages/MessagePage";
import LoginForm from "./pages/LoginForm";
import { AuthProvider } from "./context/AuthContext";
import PosterMessage from "./pages/PosterMessage";
import RepondreMessage from "./pages/RepondreMessage";
import RepondreAReponseWrapper from "./pages/RepondreAReponseWrapper";
import RepondreAReponse from "./pages/RepondreAReponse";

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
            <Route index element={<Home1 />} /> {/* ✅ Page d'accueil */}
            <Route path="/forums" element={<VoirForum />} /> {/* ✅ Liste forums */}
            <Route path="/forums/:id" element={<ForumPage />} />
            <Route path="/forums/:id/poster" element={<PosterMessage />} />
            <Route path="/repondre/:id" element={<RepondreMessage />} />
            <Route path="/repondre-a-reponse/:messageId/:answerId" element={<RepondreAReponse />} />
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
