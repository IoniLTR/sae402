import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Fonction pour récupérer l'utilisateur connecté depuis le localStorage
function getConnectedUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export default function RepondreAReponse() {
  const [originalReply, setOriginalReply] = useState(null); // La réponse à laquelle on va répondre
  const [content, setContent] = useState(""); // Contenu de la réponse
  const navigate = useNavigate(); // Permet de rediriger
  const { messageId, answerId } = useParams(); // Récupération des paramètres de l'URL

  // Récupération de la réponse originale à afficher dans le formulaire
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

  // Soumission du formulaire de réponse
  const handleSubmit = async (e) => {
    const connectedUser = getConnectedUser();
    console.log(connectedUser);

    if (!connectedUser) {
      console.error("Utilisateur non connecté");
      return null; // Retourne null si l'utilisateur n'est pas connecté
    }

    e.preventDefault(); // Empêche le rechargement de la page

    if (!originalReply?.id) {
      console.error("ID réponse originale manquant");
      return;
    }

    // Création du contenu avec mention de l'auteur original
    const payload = {
      message: messageId,
      author: connectedUser.user,
      content: `> @${originalReply.author}\n${content}`, // Format markdown avec citation
    };

    try {
      const response = await fetch("http://rsantacruz.fr/backForum/api/answers/addAnswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(await response.text());
      console.log("Réponse postée avec succès");
      navigate(-1); // Revenir à la page précédente
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  // Pendant le chargement de la réponse originale
  if (!originalReply) return <p>Chargement...</p>;

  // Affichage du formulaire de réponse
  return (
    <section className="login-container">
      <div className="login-form">
        <h2>Répondre à la réponse de {originalReply.author}</h2>
        
        {/* Affichage de la réponse originale sous forme de citation */}
        <blockquote>
          {originalReply.content}
        </blockquote>

        {/* Formulaire de réponse */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            style={{ width: "100%" }}
            required
          />
          <button type="submit" style={{ marginTop: "1rem" }}>
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
