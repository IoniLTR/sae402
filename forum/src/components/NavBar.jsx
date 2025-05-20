// src/components/NavBar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../pages/Layout.css';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <>
          <button className='button' onClick={logout}>Déconnexion</button>
        </>
      ) : (
        <button className='button'><Link to="/login">Login</Link></button>
      )}
    </>
  );
};

export default NavBar;
