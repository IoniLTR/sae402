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
            <input type="checkbox" id="menu-toggle" className="menu-toggle" />{/*interupteur*/}
            <label htmlFor="menu-toggle" className="burger">&#9776;</label>{/*visuelle bouton*/}

            <ul className="nav-links">
            <li><Link to="/forums">Forum</Link></li>
            {/* affiche ajoutforum si user connecter*/}
            {/*user && <A />*/}
              {user && ( 
                  <li><Link to="/Ajouterunforum">Ajouter un forum</Link></li>
                )}
              {!user && ( 
              <li><button className='button'><Link to="/Ajouterutilisateur">Inscription</Link></button></li>
              )}

              {/*si utilisateur connecter bouton login ou deconnecter visible*/}
              {/*user ? <A /> : <B />*/}
              {user ? (
                      <>
                        <button className='button' onClick={logout}>Déconnexion</button>
                      </>
                    ) : (
                      <button className='button'><Link to="/login">Login</Link></button>
                    )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <Outlet /> {/*affiche dans toute les pages*/}
    </main>
    </>
  );
};

export default Layout;
