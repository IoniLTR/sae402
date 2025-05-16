import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Fonction pour récupérer l'utilisateur connecté
function getConnectedUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export default function RepondreAReponse({ reponseOriginale }) {
  const { id } = useParams(); // id du message parent
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getConnectedUser();
    if (!user) {
      alert("Vous devez être connecté pour répondre.");
      return navigate("/login");
    }

    // Préparer citation (Markdown style)
    const citation = `> @${reponseOriginale.author} : ${reponseOriginale.content}\n\n`;
    const fullContent = citation + content;

    try {
      const response = await fetch("http://rsantacruz.fr/backForum/api/answers/addAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: id, // ID du message initial
          author: user.user,
          content: fullContent,
        }),
      });

      if (response.ok) {
        alert("Réponse envoyée avec succès !");
        navigate(`/messages/${id}`);
      } else {
        alert("Erreur lors de l'envoi.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div>
      <h3>Répondre à la réponse de {reponseOriginale.author}</h3>
      <blockquote >
        {reponseOriginale.content}
      </blockquote>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Votre réponse..."
          required
        />
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
