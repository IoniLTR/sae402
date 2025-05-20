import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Fonction utilitaire pour vérifier l'utilisateur connecté
function getConnectedUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export default function PosterMessage() {
  const navigate = useNavigate();
  const { id } = useParams(); // ID du forum
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getConnectedUser();
    console.log(user);
    if (!user) {
      alert("Vous devez être connecté pour poster un message.");
      return navigate("/login"); // Redirection vers page de connexion
    }
    try {
      const response = await fetch("http://rsantacruz.fr/backForum/api/messages/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          forum: id,
          author: user.user,
          title,
          content,
        }),
      });

      if (response.ok) {
        alert("Message posté avec succès !");
        navigate(`/forums/${id}`);
      } else {
        alert("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div>
      <h2>Poster un nouveau message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contenu :</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
