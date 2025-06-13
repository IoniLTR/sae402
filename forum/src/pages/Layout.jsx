// src/pages/Layout.jsx
import { Outlet, Link } from "react-router-dom";
// import NavBar from "../components/NavBar"; 
import { useAuth } from '../context/AuthContext';
import './layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
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
            <li><Link to="/forums">Forum</Link></li>
              {user && (
                  <li><Link to="/Ajouterunforum">Ajouter un forum</Link></li>
                )}
            

              <li><button className="button"><Link to="/Ajouterutilisateur">Inscription</Link></button></li>
              {/*<li><Link to="/messages">Message</Link></li> */}
              {user ? (
                      <>
                        <button className='button' onClick={logout}>Déconnexion</button>
                      </>
                    ) : (
                      <button className='button'><Link to="/login">Login</Link></button>
                    )}
              {/* <li><NavBar /></li> */}
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
