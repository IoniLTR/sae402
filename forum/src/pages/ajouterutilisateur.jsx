import React from "react";

export default function FormulaireAjouterUtilisateur({
  inputuser,
  setInputuser,
  inputpassword,
  setInputpassword,
  inputrole,
  setInputrole
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
      if (!inputuser || !inputpassword || !inputrole) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  console.log("Données envoyées:", { inputuser, inputpassword, inputrole });

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
        setInputuser("");
        setInputpassword("");
        setInputrole("user");
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  };

  return (
    <div>
      <h1>Ajouter un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur :
          <input
            type="text"
            value={inputuser}
            onChange={(e) => setInputuser(e.target.value)}
          />
        </label>
        <br />
        <label>
          Mot de passe :
          <input
            type="password"
            value={inputpassword}
            onChange={(e) => setInputpassword(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="role">Rôle :</label>
        <select
          id="role"
          value={inputrole}
          onChange={(e) => setInputrole(e.target.value)}
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
          <option value="user"></option>
        </select>
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
