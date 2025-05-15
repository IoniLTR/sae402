import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home1";
import AjouterForum from "./ajouter_forum"; 

export default function App() {
  const [inputname, setInputname] = useState('');
  const [inputdescription, setInputdescription] = useState('');
  const [inputtheme, setInputtheme] = useState('');
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ajouter" element={<AjouterForum />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <AjouterForum inputname={inputname}
        inputdescription={inputdescription}
        inputtheme={inputtheme}
        setInputname={setInputname}
        setInputdescription={setInputdescription}
        setInputtheme={setInputtheme}></AjouterForum>
    </>
  );
}
