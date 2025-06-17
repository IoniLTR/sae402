// On importe React et le hook useState pour gérer l'état du composant
import React, { useState } from 'react';

// On importe un hook personnalisé qui gère l'authentification
import { useAuth } from '../context/AuthContext';

// On importe Link (pour créer des liens sans recharger la page) et useNavigate (pour rediriger)
import { Link, useNavigate } from 'react-router-dom';

// On importe le fichier CSS pour le style du formulaire
import '../components/login.css';

// Déclaration du composant LoginForm
export default function LoginForm() {
  // Récupération de la fonction login depuis le contexte Auth (sert à "connecter" l'utilisateur)
  const { login } = useAuth();

  // Déclaration des états : user (nom), password (mot de passe), message (feedback)
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Hook pour rediriger vers une autre page
  const navigate = useNavigate();

  // Fonction appelée lors de la soumission du formulaire
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Envoi des données de connexion au serveur
      const response = await fetch('http://rsantacruz.fr/backForum/api/users/checkUser', {
        method: 'POST', // Méthode HTTP pour envoyer des données
        headers: { 'Content-Type': 'application/json' }, // Type de contenu envoyé
        body: JSON.stringify({ name: user, password }), // Données envoyées au serveur
      });

      // On attend la réponse du serveur sous forme de JSON
      const isValidUser = await response.json();

      // Si l'utilisateur est valide
      if (isValidUser) {
        login({ user }); // On sauvegarde l'utilisateur dans le contexte (connexion réussie)
        setMessage('Connexion réussie !'); // Message de succès
        navigate('/'); // Redirection vers la page d'accueil
      } else {
        // Sinon, on affiche un message d'erreur
        setMessage("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      // En cas d'erreur réseau ou autre
      console.error('Erreur:', error);
      setMessage('Erreur lors de la connexion.');
    }
  };

  // JSX : ce qui sera affiché à l'écran
  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Connexion</h2>

        {/* Champ pour le nom d'utilisateur */}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={user}
          onChange={(e) => setUser(e.target.value)} // Mise à jour de l'état 'user'
          required
        />

        {/* Champ pour le mot de passe */}
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état 'password'
          required
        />

        {/* Bouton de soumission */}
        <button type="submit">Se connecter</button>

        {/* Affiche un message s'il existe */}
        {message && <p>{message}</p>}

        {/* Lien vers la page de création de compte */}
        <div className="signup-link">
          Vous n'avez pas de compte ? <Link to="/Ajouterutilisateur">Créez-en un</Link>
        </div>
      </form>
    </div>
  );
}
