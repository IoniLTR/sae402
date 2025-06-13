import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ForumPage() {
  const { id } = useParams();
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
    setVisibleAnswers(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));

    if (!answersByMessage[messageId]) {
      await reloadAnswers(messageId);
    }
  };

  const reloadAnswers = async (messageId) => {
    try {
      const res = await fetch(`http://rsantacruz.fr/backForum/api/answers/getAnswersByMessage?id=${messageId}`);
      const data = await res.json();
      const tree = buildAnswerTree(data);
      setAnswersByMessage(prev => ({
        ...prev,
        [messageId]: tree
      }));
    } catch (err) {
      console.error("Erreur lors de la récupération des réponses :", err);
    }
  };

  const handlePostClick = () => {
    if (!user) navigate("/login");
    else navigate(`/forums/${id}/poster`);
  };

  const handleReplyClick = (messageId) => {
    if (!user) navigate("/login");
    else navigate(`/repondre/${messageId}`, { state: { forumId: id } });
  };

  function buildAnswerTree(answers) {
    const answerMap = {};
    const roots = [];

    answers.forEach(ans => {
      ans.children = [];
      answerMap[ans.id] = ans;
    });

    answers.forEach(ans => {
      if (answerMap[ans.message]) {
        answerMap[ans.message].children.push(ans);
      } else {
        roots.push(ans);
      }
    });

    return roots;
  }

  function AnswerNode({ answer, messageId }) {
    const handleReplyToAnswer = () => {
      if (!user) navigate("/login");
      else navigate(`/repondre-a-reponse/${messageId}/${answer.id}`, {
        state: { forumId: id, messageId }
      });
    };

    return (
      <div style={{
        marginLeft: "1.5rem",
        borderLeft: "2px solid #ccc",
        paddingLeft: "1rem",
        marginTop: "1rem",
        background: "#f9f9f9",
        borderRadius: "4px"
      }}>
        <p style={{ fontWeight: "bold", marginBottom: 0 }}>{answer.author}</p>
        {answer.content.startsWith('> @') ? (
          <>
            <blockquote style={{
              background: '#f5f5f5',
              borderLeft: '4px solid #aaa',
              padding: '0.5rem',
              margin: '0.5rem 0',
              fontStyle: 'italic'
            }}>
              {answer.content.split('\n')[0]}
            </blockquote>
            <p>{answer.content.split('\n').slice(1).join('\n') || <i>(Pas de contenu)</i>}</p>
          </>
        ) : (
          <p>{answer.content}</p>
        )}
        <button
          onClick={handleReplyToAnswer}
          style={{
            backgroundColor: '#e0e0e0',
            border: 'none',
            padding: '0.3rem 0.6rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Répondre
        </button>

        {answer.children.length > 0 && answer.children.map(child => (
          <AnswerNode key={child.id} answer={child} messageId={messageId} />
        ))}
      </div>
    );
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
        {forumInfo ? forumInfo.name : "Forum"}
      </h1>

      <button
        onClick={handlePostClick}
        style={{
          backgroundColor: '#2d72d9',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px',
          marginBottom: '1.5rem',
          cursor: 'pointer'
        }}
      >
        Poster un message
      </button>

      {messages.length === 0 ? (
        <p>Aucun message trouvé pour ce forum.</p>
      ) : (
        messages.map((message) => (
          <div key={message.id} style={{
            borderBottom: "1px solid #ddd",
            paddingBottom: "1rem",
            marginBottom: "1.5rem"
          }}>
            <h2>{message.title}</h2>
            <p style={{ fontWeight: "bold" }}>Par : {message.author}</p>
            <p>{message.content}</p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => toggleAnswers(message.id)}
                style={{
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {visibleAnswers[message.id] ? "Masquer les réponses" : "Voir les réponses"}
              </button>

              <button
                onClick={() => handleReplyClick(message.id)}
                state={{ forumId: id }}
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Répondre au message
              </button>
            </div>

            {visibleAnswers[message.id] && (
              <div style={{ marginTop: '1rem' }}>
                {!answersByMessage[message.id] ? (
                  <p>Chargement des réponses...</p>
                ) : answersByMessage[message.id].length === 0 ? (
                  <p>Aucune réponse pour ce message.</p>
                ) : (
                  answersByMessage[message.id].map(answer => (
                    <AnswerNode key={answer.id} answer={answer} messageId={message.id} />
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
