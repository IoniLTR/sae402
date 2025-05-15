import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import VoirForum from "./pages/Home1"; 
import FormulaireAjouterForum from "./pages/ajouter_formulaire";
import FormulaireAjouterUtilisateur from "./pages/ajouterutilisateur";
import ForumPage from './pages/ForumPage';
import MessagePage from './pages/MessagePage';
import LoginPage from './components/LoginPage';

export default function App() {

  const [inputname, setInputname] = useState('');
  const [inputdescription, setInputdescription] = useState('');
  const [inputtheme, setInputtheme] = useState('');

  const [inputuser, setInputuser] = useState('');
  const [inputpassword, setInputpassword] = useState('');
  const [inputrole, setInputrole] = useState('');

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
            <Route path="/" element={<VoirForum />} />
      <Route path="/forums" element={<ForumPage />} />
      <Route path="/messages" element={<MessagePage />} />
      <Route path="/login" element={<LoginPage />} />
          <Route 
            path="Ajouterunforum" 
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
            path="Ajouterutilisateur" 
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
    </>
  );
}