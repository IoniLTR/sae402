import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Fonction utilitaire pour récupérer l'utilisateur connecté depuis le localStorage
function getConnectedUser() {
  const user = localStorage.getItem("user"); // Cherche la clé 'user'
  return user ? JSON.parse(user) : null;     // Si elle existe, on la parse, sinon null
}

export default function PosterMessage() {
  const navigate = useNavigate(); // Hook pour naviguer entre les pages
  const { id } = useParams(); // Récupère l'ID du forum depuis l'URL (paramètre dynamique)

  // États pour stocker les champs du formulaire
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fonction exécutée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const user = getConnectedUser(); // Récupère l'utilisateur connecté

    if (!user) {
      alert("Vous devez être connecté pour poster un message.");
      return navigate("/login"); // Redirige vers la page de login si pas connecté
    }

    try {
      // Envoie la requête POST à l'API pour ajouter un message
      const response = await fetch("http://rsantacruz.fr/backForum/api/messages/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          forum: id,             // ID du forum dans lequel poster
          author: user.user,     // Nom d'utilisateur (depuis localStorage)
          title,                 // Titre saisi
          content,               // Contenu saisi
        }),
      });

      // Si la requête réussit
      if (response.ok) {
        alert("Message posté avec succès !");
        navigate(`/forums/${id}`); // Redirige vers la page du forum
      } else {
        alert("Erreur lors de l'envoi du message."); // En cas d'erreur serveur
      }
    } catch (error) {
      console.error("Erreur réseau :", error); // Log dans la console
      alert("Une erreur est survenue."); // Alerte à l'utilisateur
    }
  };

  // Rendu du formulaire HTML
  return (
    <section class="login-container">
      <div class="login-form">
        <h2>Poster un nouveau message</h2>

        {/* Formulaire avec champs contrôlés */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Titre :</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Met à jour le state
              required
            />
          </div>

          <div>
            <label>Contenu :</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)} // Met à jour le state
              required
            />
          </div>

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </section>
  );
}
