import { data, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




export default function MessagePage() {
  const { id } = useParams(); // id du message
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    fetch(`http://rsantacruz.fr/backForum/api/answers/getAnswersByMessage?id=${id}`)
      .then(res => res.json())
      .then(data => setAnswers(data));
  }, [id]);

  return (
    <div>
      <h1>Réponses au message</h1>
      <Link to={`/repondre/${id}`}>Répondre au message principal</Link>

      <div>
        {answers.map((answer, index) => (
          <div key={index} >
            <p><strong>{answer.author}</strong></p>
            {answer.content.startsWith('> @') ? (
      <>
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
          {answer.content.split('\n')[0]} {/* ligne de citation */}
        </blockquote>
        <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
          {answer.content.split('\n').slice(1).join('\n') || <i>(Pas de contenu)</i>}
        </p>
      </>
    ) : (
      <p style={{ whiteSpace: 'pre-wrap' }}>{answer.content}</p>
    )}
            <Link
              to={`/repondre-a-reponse/${id}`}
              state={{ reponseOriginale: answer }}
            >
              Répondre à cette réponse
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
