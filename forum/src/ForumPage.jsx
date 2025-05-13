import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ForumPage() {
  const { id } = useParams(); // ID du forum dans l'URL
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`http://rsantacruz.fr/backForum/api/messages/getMessagesByForum?id=${id}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [id]);

  return (
    <div>
      <h1>Messages du forum</h1>

      {messages.length === 0 ? (
        <p>Aucun message pour ce forum.</p>
      ) : (
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message._id} >
              <h2 >{message.title}</h2>
              <p >Par {message.author}</p>
              <p >{message.content}</p>
              <p >{new Date(message.date).toLocaleString()}</p>
              <Link
                to={`/messages/${message._id}`}
                
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
