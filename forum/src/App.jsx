import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Home1 from "./pages/Home1";
import VoirForum from "./pages/VoirForum";
import FormulaireAjouterForum from "./pages/ajouter_formulaire";
import FormulaireAjouterUtilisateur from "./pages/ajouterutilisateur";
import ForumPage from "./pages/ForumPage";
import MessagePage from "./pages/MessagePage";
import LoginForm from "./pages/LoginForm";
import { AuthProvider } from "./context/AuthContext";
import PosterMessage from "./pages/PosterMessage";
import RepondreMessage from "./pages/RepondreMessage";
import RepondreAReponse from "./pages/RepondreAReponse";

export default function App() {
  const [inputname, setInputname] = useState('');
  const [inputdescription, setInputdescription] = useState('');
  const [inputtheme, setInputtheme] = useState('');

  const [inputuser, setInputuser] = useState('');
  const [inputpassword, setInputpassword] = useState('');
  const [inputrole, setInputrole] = useState('');

  return (
    <AuthProvider>{/*composant qui gere la connection*/}
      <BrowserRouter>
        <Routes> {/*affiche le composant Layout */}
          {/*Layout, il y a <Outlet /> qui affiche le composant enfant selon la route.*/}
          {/*affiche layout*/}
          <Route path="/" element={<Layout />}>
          {/*path="/monURL1" element={<Composant1 />} */}
            <Route index element={<Home1 />} /> 
            <Route path="/forums" element={<VoirForum />} /> *
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
