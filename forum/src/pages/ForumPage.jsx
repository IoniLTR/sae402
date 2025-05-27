import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ForumPage() {
  const { id } = useParams(); // ID du forum
  const [messages, setMessages] = useState([]);
  const [forumInfo, setForumInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answersByMessage, setAnswersByMessage] = useState({});
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const msgRes = await fetch(`http://rsantacruz.fr/backForum/api/messages/getMessagesByForum?id=${id}`);
        const msgData = await msgRes.json();
        setMessages(msgData);

        const forumRes = await fetch('http://rsantacruz.fr/backForum/api/forums/getForums');
        const forumData = await forumRes.json();
        const forum = forumData.find(f => String(f.id) === id);
        setForumInfo(forum);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const toggleAnswers = async (messageId) => {
    // Toggle visibility
    setVisibleAnswers(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));

    // Load only if not already loaded
    if (!answersByMessage[messageId]) {
      try {
        const res = await fetch(`http://rsantacruz.fr/backForum/api/answers/getAnswersByMessage?id=${messageId}`);
        const data = await res.json();
        setAnswersByMessage(prev => ({
          ...prev,
          [messageId]: data
        }));
      } catch (err) {
        console.error("Erreur lors de la récupération des réponses :", err);
      }
    }
  };

  const handlePostClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/forums/${id}/poster`);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{forumInfo ? forumInfo.name : "Forum"}</h1>
      <button onClick={handlePostClick}>Poster un message</button>

      {messages.length === 0 ? (
        <p>Aucun message trouvé pour ce forum.</p>
      ) : (
        messages.map((message) => (
          <div key={message.id} style={{ borderBottom: "1px solid #ccc", paddingBottom: "1rem", marginBottom: "1rem" }}>
            <h2>{message.title}</h2>
            <p><strong>Par :</strong> {message.author}</p>
            <p>{message.content}</p>
            
            <button onClick={() => toggleAnswers(message.id)}>
              {visibleAnswers[message.id] ? "Masquer les réponses" : "Voir les réponses"}
            </button>

            <Link to={`/repondre/${message.id}`} style={{ marginLeft: "1rem" }}>
              Répondre à ce message
            </Link>

            {visibleAnswers[message.id] && (
              <div style={{ marginTop: "1rem", paddingLeft: "5rem", borderLeft: "2px solid #ddd" }}>
                {!answersByMessage[message.id] ? (
                  <p>Chargement des réponses...</p>
                ) : answersByMessage[message.id].length === 0 ? (
                  <p>Aucune réponse pour ce message.</p>
                ) : (
                  answersByMessage[message.id].map((answer) => (
                    <div key={answer.id} style={{ marginBottom: "1rem" }}>
                      <p><strong>{answer.author}</strong></p>
                      
                      {answer.content.startsWith('> @') ? (
                        <>
                          <blockquote style={{
                            background: '#f5f5f5',
                            borderLeft: '4px solid #ccc',
                            padding: '0.5rem',
                            margin: 0,
                            fontStyle: 'italic'
                          }}>
                            {answer.content.split('\n')[0]}
                          </blockquote>
                          <p style={{ marginTop: '0.5rem' }}>
                            {answer.content.split('\n').slice(1).join('\n') || <i>(Pas de contenu)</i>}
                          </p>
                        </>
                      ) : (
                        <p>{answer.content}</p>
                      )}

                      <Link
                        to={`/repondre-a-reponse/${answer.id}`}
                        state={{ reponseOriginale: answer }}
                      >
                        Répondre à cette réponse
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
