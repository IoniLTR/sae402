import React from "react";
import './ajouterutilisateur.css';
import { useNavigate } from 'react-router-dom';


export default function formulaireajouterfurom({
  //props fournie par le composant parent
  inputname,
  setInputname,
  inputdescription,
  setInputdescription,
  inputtheme,
  setInputtheme
}) {
  const navigate = useNavigate()
const handleSubmit = (e) => {
  e.preventDefault(); // Empêche le rechargement de la page

   // Vérifie que tous les champs sont remplis  
  if (!inputname || !inputdescription || !inputtheme) {
    alert("Tous les champs sont obligatoires !");
    return;
  }
  
  // Fonction exécutée quand le formulaire est soumis
  fetch("http://rsantacruz.fr/backForum/api/forums/addForum", {
    method: "POST",
    headers: {
      Accept: "application/json",          // On accepte du JSON
      "Content-Type": "application/json", // On envoie du JSON
    },
    body: JSON.stringify({ //convertie les object javacript en json
      name: inputname,
      description: inputdescription,
      theme: inputtheme,
    }),
  })
  // Vérifie si la réponse du serveur est correcte
    .then(async (response) => {
      console.log("Status:", response.status);
      if (!response.ok) {
        const errorText = await response.text(); // Récupère le message d'erreur
        throw new Error(`Erreur API: ${response.status} - ${errorText}`);
      }
      return response.json(); //retourne promesse
    })
    .then((data) => {
      console.log("Forum ajouté avec succès:", data);
      // rafraichie les donnée
      setInputname("");
      setInputdescription("");
      setInputtheme("cinema");
      //naviguate
      navigate("/");
    })
    .catch((error) => {
      console.error("Erreur:", error);
      alert(error.message);
    });
};


  return (
    <div className="login-container">     
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>Ajouter un forum</h2>
        <label>
          Nom :
          <input
            type="text"
            value={inputname}
            onChange={(e) => setInputname(e.target.value)} // implement la de l'imput 
          />
        </label>
        <br />
        <label>
          Description :
      <textarea
  value={inputdescription}
  onChange={(e) => setInputdescription(e.target.value)}
/>

        </label>
        <br />
        <label htmlFor="theme">Thème :</label>
        <select
          id="theme"
          value={inputtheme}
          onChange={(e) => setInputtheme(e.target.value)} // implement la de l'imput 
        >
          <option value="cinema">cinema</option>
          <option value="sport">sport</option>
          <option value="quatre">musique</option>
        </select>
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

