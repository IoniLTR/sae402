import React from "react";
import './ajouterutilisateur.css';
import { Link, useNavigate } from 'react-router-dom';

export default function FormulaireAjouterUtilisateur({
  inputuser,
  setInputuser,
  inputpassword,
  setInputpassword,
  inputrole,
  setInputrole
}) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputuser || !inputpassword || !inputrole) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    fetch("http://rsantacruz.fr/backForum/api/users/addUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputuser,
        role: inputrole,
        password: inputpassword,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Erreur réponse serveur :", errorText);
          throw new Error("Erreur lors de l’ajout de l’utilisateur");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Utilisateur ajouté avec succès:", data);
        // Réinitialise le formulaire
        setInputuser("");
        setInputpassword("");
        setInputrole("user");
        // Redirige vers la page d'accueil
        navigate("/");
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Une erreur est survenue lors de l'ajout.");
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={inputuser}
          onChange={(e) => setInputuser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={inputpassword}
          onChange={(e) => setInputpassword(e.target.value)}
        />

        <select
          id="role"
          value={inputrole}
          onChange={(e) => setInputrole(e.target.value)}
        >
          <option value="">Sélectionner un rôle</option>
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>

        <button type="submit">Ajouter</button>

        <div className="signup-link">
          Vous avez déjà un compte ?{" "}
          <Link to="/login">Connectez-vous</Link>
        </div>
      </form>
    </div>
  );
}
