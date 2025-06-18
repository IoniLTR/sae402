import { useParams } from 'react-router-dom'; // Pour récupérer les paramètres de l’URL
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Pour la navigation interne

export default function MessagePage() {
  const { id } = useParams(); // Récupère l'ID du message depuis l'URL
  const [answers, setAnswers] = useState([]); // Stocke les réponses liées à ce message
  const [message, setMessage] = useState(null); // (Non utilisé ici, à enlever ou compléter)

  // Charge les réponses liées au message au montage ou si l'ID change
  useEffect(() => {
    fetch(`http://rsantacruz.fr/backForum/api/answers/getAnswersByMessage?id=${id}`)
      .then(res => res.json())
      .then(data => setAnswers(data)); // Stocke les réponses dans le state
  }, [id]);

  return (
    <div>
      <h1>Réponses au message</h1>

      {/* Lien pour poster une nouvelle réponse au message */}
      <Link to={`/repondre/${id}`}>Poster un message</Link>

      <div>
        {/* Parcours de toutes les réponses reçues */}
        {answers.map((answer, index) => (
          <div key={index}>
            <p><strong>{answer.author}</strong></p>

            {/* Affiche différemment si la réponse commence par une citation (> @...) */}
            {answer.content.startsWith('> @') ? (
              <>
                {/* Bloc de citation */}
                <blockquote
                  style={{
                    margin: 0,
                    padding: '0.5rem 1rem',
                    background: '#f5f5f5',
                    borderLeft: '4px solid #ccc',
                    fontStyle: 'italic',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {/* Première ligne = citation */}
                  {answer.content.split('\n')[0]}
                </blockquote>

                {/* Contenu après la citation */}
                <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                  {answer.content.split('\n').slice(1).join('\n') || <i>(Pas de contenu)</i>}
                </p>
              </>
            ) : (
              // Réponse simple sans citation
              <p style={{ whiteSpace: 'pre-wrap' }}>{answer.content}</p>
            )}

            {/* Lien pour répondre à cette réponse spécifique */}
            <Link
              to={`/repondre-a-reponse/${id}`} // Navigue vers la route de réponse
              state={{ reponseOriginale: answer }} // Passe l'objet de la réponse comme state
            >
              Répondre à cette réponse
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
