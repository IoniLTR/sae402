// src/pages/Layout.jsx
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar"; 
import './layout.css';

const Layout = () => {
  return (
    <>
    <header className="main-header">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="nav-left">
            <li><Link to="/">Home</Link></li>
          </div>

          <div className="nav-right">
            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="burger">&#9776;</label>

            <ul className="nav-links">
            <li><Link to="/forums">forum</Link></li>
              <li><Link to="/Ajouterunforum">Ajouter un forum</Link></li>
              <li><button className="button"><Link to="/Ajouterutilisateur">inscription</Link></button></li>
              {/*<li><Link to="/messages">Message</Link></li> */}
              <li><NavBar /></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    </>
  );
};

export default Layout;
