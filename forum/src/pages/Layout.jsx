// src/pages/Layout.jsx
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar"; // Assure-toi que le fichier a bien été renommé

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Ajouterunforum">Ajouter un forum</Link></li>
            <li><Link to="/Ajouterutilisateur">Ajouter un utilisateur</Link></li>
            {/* <li><Link to="/forums">forum</Link></li>
            <li><Link to="/messages">message</Link></li> */}
            <li><NavBar /></li> {/* Ici on affiche Login ou Bienvenue/Déconnexion */}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
