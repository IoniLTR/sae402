import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ForumPage() {
  const { id } = useParams(); // ID du forum
  const [messages, setMessages] = useState([]);
  const [forumInfo, setForumInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    fetch(`http://rsantacruz.fr/backForum/api/messages/getMessagesByForum?id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur API');
        return res.json();
      })
      .then(data => {
        setMessages(data);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des messages :', err);
      })
      fetch('http://rsantacruz.fr/backForum/api/forums/getForums')
      .then(res => res.json())
      .then(data => {
        const forum = data.find(f => String(f.id) === id);
        setForumInfo(forum);
      })
      .catch(err => {
        console.error('Erreur récupération forum info :', err);
      })
      .finally(() => setLoading(false));
  }, [id]);
    

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 >{forumInfo ? forumInfo.name : "Forum"}</h1>
      <Link to={`/forums/${id}/poster`}>Poster un message</Link>
      {messages.length === 0 ? (
        <p>Aucun message trouvé pour ce forum.</p>
      ) : (
        <div >
          {messages.map((message, index) => (
            <div key={index} >
              <h2 >{message.title}</h2>
              <p >Par {message.author}</p>
              <p>{message.content}</p>
              <Link
                to={`/messages/${message.id}`}
              >
                Voir les réponses →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
