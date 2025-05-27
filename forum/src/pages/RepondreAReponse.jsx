import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RepondreAReponse({ reponseOriginale }) {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!reponseOriginale || !reponseOriginale.id) {
      console.error("ID du message manquant dans reponseOriginale :", reponseOriginale);
      return;
    }
  
    const payload = {
      message: reponseOriginale.id,
      author: "TonNomOuPseudo", // Remplace par l'utilisateur connecté
      content: content
    };
  
    try {
      const response = await fetch("http://rsantacruz.fr/backForum/api/answers/addAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errMessage = await response.text();
        throw new Error(errMessage);
      }
  
      console.log("Réponse postée avec succès");
      navigate(-1);
  
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réponse :", error);
    }
  };
  

  return (
    <div>
      <h2>Répondre à la réponse de {reponseOriginale.author}</h2>
      <blockquote >
        {reponseOriginale.content}
      </blockquote>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          style={{ width: "100%" }}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
