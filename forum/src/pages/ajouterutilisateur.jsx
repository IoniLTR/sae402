// On importe React pour pouvoir utiliser JSX et créer des composants
import React from "react";

// On importe le fichier CSS pour styliser le formulaire
import './ajouterutilisateur.css';

// On importe Link (pour créer des liens) et useNavigate (pour rediriger)
import { Link, useNavigate } from 'react-router-dom';

// Composant principal. Il reçoit en props : les valeurs et setters pour les inputs
export default function FormulaireAjouterUtilisateur({
  inputuser,          // Nom d'utilisateur saisi
  setInputuser,       // Fonction pour changer le nom
  inputpassword,      // Mot de passe saisi
  setInputpassword,   // Fonction pour changer le mot de passe
  inputrole,          // Rôle sélectionné (admin ou user)
  setInputrole        // Fonction pour changer le rôle
}) {
  // Hook pour rediriger l'utilisateur vers une autre page
  const navigate = useNavigate();

  // Fonction exécutée quand le formulaire est soumis
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifie que tous les champs sont remplis
    if (!inputuser || !inputpassword || !inputrole) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Envoie des données vers le serveur pour créer l'utilisateur
    fetch("http://rsantacruz.fr/backForum/api/users/addUser", {
      method: "POST", // Méthode HTTP utilisée
      headers: {
        Accept: "application/json",               // On accepte du JSON
        "Content-Type": "application/json",       // On envoie du JSON
      },
      body: JSON.stringify({
        name: inputuser,
        role: inputrole,
        password: inputpassword,
      }),
    })
      .then(async (response) => {
        // Vérifie si la réponse du serveur est correcte
        if (!response.ok) {
          const errorText = await response.text(); // Récupère le message d'erreur
          console.error("Erreur réponse serveur :", errorText);
          throw new Error("Erreur lors de l’ajout de l’utilisateur");
        }
        return response.json(); // Transforme la réponse en objet JS
      })
      .then((data) => {
        // Si tout s’est bien passé, on affiche un message dans la console
        console.log("Utilisateur ajouté avec succès:", data);

        // On vide les champs du formulaire
        setInputuser("");
        setInputpassword("");
        setInputrole("user");

        // Redirection vers la page d’accueil
        navigate("/");
      })
      .catch((error) => {
        // Si une erreur s’est produite, on l'affiche
        console.error("Erreur:", error);
        alert("Une erreur est survenue lors de l'ajout.");
      });
  };

  // JSX : Ce qui sera affiché à l’écran
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>

        {/* Champ pour entrer le nom d'utilisateur */}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={inputuser}
          onChange={(e) => setInputuser(e.target.value)}
        />

        {/* Champ pour entrer le mot de passe */}
        <input
          type="password"
          placeholder="Mot de passe"
          value={inputpassword}
          onChange={(e) => setInputpassword(e.target.value)}
        />

        {/* Menu déroulant pour choisir le rôle */}
        <select
          id="role"
          value={inputrole}
          onChange={(e) => setInputrole(e.target.value)}
        >
          <option value="">Sélectionner un rôle</option>
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>

        {/* Bouton pour envoyer le formulaire */}
        <button type="submit">Ajouter</button>

        {/* Lien vers la page de connexion */}
        <div className="signup-link">
          Vous avez déjà un compte ?{" "}
          <Link to="/login">Connectez-vous</Link>
        </div>
      </form>
    </div>
  );
}
