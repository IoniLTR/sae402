import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function VoirForum() {
  const [forums, setForums] = useState([]);
  const [themeFilter, setThemeFilter] = useState('all');

  useEffect(() => {
    fetch('http://rsantacruz.fr/backForum/api/forums/getForums')
      .then(res => res.json())
      .then(data => setForums(data));
  }, []);

  const filteredForums = themeFilter === 'all'
    ? forums
    : forums.filter(forum => forum.theme === themeFilter);

  return (
    <div>
      <h1>Liste des forums</h1>
      
      <div >
        <button onClick={() => setThemeFilter('all')}>Tous</button>
        <button onClick={() => setThemeFilter('sport')}>Sport</button>
        <button onClick={() => setThemeFilter('cinema')}>Cinéma</button>
        <button onClick={() => setThemeFilter('musique')}>Musique</button>
      </div>

      // ...
{filteredForums.map(forum => (
  <div key={forum._id} >
    <h2 >{forum.name}</h2>
    <p>{forum.description}</p>
    <p >Thème : {forum.theme}</p>
    <Link to={`/forums/${forum._id}`} >
      Voir les messages →
    </Link>
  </div>
        ))}
      </div>
  );
}



