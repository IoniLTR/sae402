import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// Fonction utilitaire pour récupérer l'utilisateur connecté depuis le localStorage
function getConnectedUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export default function RepondreMessage() {
  const { id } = useParams(); // ID du message auquel on répond (depuis l'URL)
  const navigate = useNavigate(); // Pour rediriger après soumission
  const location = useLocation(); // Pour accéder à l'état transmis lors de la navigation
  const [content, setContent] = useState(""); // Contenu de la réponse

  // forumId est transmis depuis la page précédente (optionnel, utile pour redirection ciblée)
  const forumId = location.state?.forumId;

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const user = getConnectedUser(); // Récupère l'utilisateur connecté
    if (!user) {
      alert("Vous devez être connecté pour répondre.");
      return navigate("/login"); // Redirection vers la page de login si non connecté
    }

    try {
      // Envoi de la réponse à l'API
      const response = await fetch("http://rsantacruz.fr/backForum/api/answers/addAnswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: id,           // ID du message auquel on répond
          author: user.user,     // Auteur connecté
          content,               // Contenu de la réponse
        }),
      });

      if (response.ok) {
        alert("Réponse envoyée !");
        // Redirection vers la bonne page après réponse
        if (forumId) {
          navigate(`/forums/${forumId}`); // Si on connaît le forum, on y retourne
        } else {
          navigate(`/messages/${id}`);    // Sinon on retourne à la page du message
        }
      } else {
        alert("Erreur lors de l'envoi de la réponse.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur est survenue.");
    }
  };

  // Affichage du formulaire de réponse
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Répondre au message</h2>
        <label>Votre réponse :</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
