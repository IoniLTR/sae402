import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Fonction utilitaire pour vérifier l'utilisateur connecté
function getConnectedUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export default function RepondreAReponse() {
  const [originalReply, setOriginalReply] = useState(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { messageId, answerId } = useParams();

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await fetch(`http://rsantacruz.fr/backForum/api/answers/getAnswersByMessage?id=${messageId}`);
        if (!response.ok) throw new Error("Erreur récupération réponses");

        const allReplies = await response.json();
        const targetReply = allReplies.find((r) => r.id === parseInt(answerId));

        if (!targetReply) throw new Error("Réponse introuvable");
        setOriginalReply(targetReply);
      } catch (error) {
        console.error("Erreur lors de la récupération de la réponse :", error);
      }
    };

    fetchReplies();
  }, [messageId, answerId]);

  const handleSubmit = async (e) => {
    const connectedUser = getConnectedUser();
    console.log(connectedUser);
    if (!connectedUser) {
      // Rediriger vers login ou afficher un message
      console.error("Utilisateur non connecté");
      return null;
    }
    e.preventDefault();

    if (!originalReply?.id) {
      console.error("ID réponse originale manquant");
      return;
    }

    const payload = {
      message: messageId,
      author: connectedUser.user, 
      content: `@${originalReply.author}: ${content}`,
    };

    try {
      const response = await fetch("http://rsantacruz.fr/backForum/api/answers/addAnswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(await response.text());
      console.log("Réponse postée avec succès");
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  if (!originalReply) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Répondre à la réponse de {originalReply.author}</h2>
      <blockquote>{originalReply.content}</blockquote>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          style={{ width: "100%" }}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
