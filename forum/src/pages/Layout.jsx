// pages/Layout.jsx
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Ajouterunforum">Ajouter un forum</Link></li>
            <li><Link to="/Ajouterutilisateur">Ajouter un utilisateur</Link></li>
            <li><Link to="/forums">forum</Link></li>
            <li><Link to="/messages">message</Link></li>
            <li><Link to="/login">login</Link></li>
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
