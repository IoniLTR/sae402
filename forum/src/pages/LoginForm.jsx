import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../components/login.css';

export default function LoginForm() {
  const { login } = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://rsantacruz.fr/backForum/api/users/checkUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user, password }),
      });

      const isValidUser = await response.json();

      if (isValidUser) {
        login({ user }); // met à jour le contexte utilisateur
        setMessage('Connexion réussie !');
        navigate('-1'); // redirige vers l'accueil
      } else {
        setMessage("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de la connexion.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Connexion</h2>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Se connecter</button>

        {message && <p>{message}</p>}

        <div className="signup-link">
          Vous n'avez pas de compte ? <Link to="/Ajouterutilisateur">Créez-en un</Link>
        </div>
      </form>
    </div>
  );
}
