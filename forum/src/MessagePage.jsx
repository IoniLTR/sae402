import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MessagePage() {
  const { id } = useParams(); // id du message
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch(`http://rsantacruz.fr/backForum/api/answers/getAnswersByMessage?id=${id}`)
      .then(res => res.json())
      .then(data => setAnswers(data));
  }, [id]);

  return (
    <div>
      <h1>Réponses au message</h1>
      <div>
        {answers.map(answer => (
          <div key={answer._id} >
            <p><strong>{answer.author}</strong></p>
            <p>{answer.content}</p>
            <p>{new Date(answer.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
