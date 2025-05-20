import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function getConnectedUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export default function RepondreMessage() {
  const { id } = useParams(); // ID du message auquel on répond
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getConnectedUser();

    if (!user) {
      alert("Vous devez être connecté pour répondre.");
      return navigate("/login");
    }

    try {
      const response = await fetch("http://rsantacruz.fr/backForum/api/answers/addAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: id, // ID du message d'origine
          author: user.user, // s'adapte à un objet ou une chaîne
          content,
        }),
      });

      if (response.ok) {
        alert("Réponse envoyée !");
        navigate(`/messages/${id}`);
      } else {
        alert("Erreur lors de l'envoi de la réponse.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div>
      <h2>Répondre au message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Votre réponse :</label>
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
