import React from "react";
import './ajouterutilisateur.css'

export default function formulaireajouterfurom({
  inputname,
  setInputname,
  inputdescription,
  setInputdescription,
  inputtheme,
  setInputtheme
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://rsantacruz.fr/backForum/api/forums/addForum", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputname,
        description: inputdescription,
        theme: inputtheme,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l’ajout du forum");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Forum ajouté avec succès:", data);
        setInputname("");
        setInputdescription("");
        setInputtheme("cinema");
      })
      .catch((error) => {
        console.error("Erreur:", error);
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
            onChange={(e) => setInputname(e.target.value)} // Utilisation de setInputname
          />
        </label>
        <br />
        <label>
          Description :
          <input
            type="text"
            value={inputdescription}
            onChange={(e) => setInputdescription(e.target.value)} // Utilisation de setInputdescription
          />
        </label>
        <br />
        <label htmlFor="theme">Thème :</label>
        <select
          id="theme"
          value={inputtheme}
          onChange={(e) => setInputtheme(e.target.value)} // Utilisation de setInputtheme
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

