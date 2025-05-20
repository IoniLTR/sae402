// src/pages/Layout.jsx
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar"; 


const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#f0f0f0"
};

const navStyle = {
  display: "flex",
  gap: "15px",
  listStyle: "none",
  padding: 0,
  margin: 0
};


const Layout = () => {
  return (
    <>
      <header style={headerStyle}>
        <nav>
          <ul style={navStyle}>
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
