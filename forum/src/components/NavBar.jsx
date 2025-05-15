// src/components/NavBar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <>
          <button onClick={logout}>Déconnexion</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};

export default NavBar;
