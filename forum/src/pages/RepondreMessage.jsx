import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function getConnectedUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export default function RepondreMessage() {
  const { id } = useParams(); // ID du message auquel on répond
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState("");

  const forumId = location.state?.forumId;



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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: id,
          author: user.user,
          content,
        }),
      });

      if (response.ok) {
        alert("Réponse envoyée !");
        // Redirection vers la page du forum
        if (forumId) {
          navigate(`/forums/${forumId}`);
        } else {
          navigate(`/messages/${id}`);
        }
      } else {
        alert("Erreur lors de l'envoi de la réponse.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2 className="login-form">Répondre au message</h2>
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
