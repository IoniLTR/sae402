import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function VoirForum() {
  const [forums, setForums] = useState([]);
  const [themeFilter, setThemeFilter] = useState('all');
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  useEffect(() => {
    fetch('http://rsantacruz.fr/backForum/api/forums/getForums')
      .then(res => res.json())
      .then(data => {
        setForums(data);
      });
  }, []);

  const toggleExpanded = (index) => {
    setExpandedIndexes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredForums = themeFilter === 'all'
    ? forums
    : forums.filter(forum => forum.theme === themeFilter);

  return (
    <div>
      <h1>Liste des forums</h1>

      <div>
        <button onClick={() => setThemeFilter('all')}>Tous</button>
        <button onClick={() => setThemeFilter('sport')}>Sport</button>
        <button onClick={() => setThemeFilter('cinema')}>Cinéma</button>
        <button onClick={() => setThemeFilter('musique')}>Musique</button>
      </div>

      <div>
        {filteredForums.map((forum, index) => {
          const isExpanded = expandedIndexes.includes(index);
          const isLong = forum.description.length > 500;
          const displayText = isExpanded || !isLong
            ? forum.description
            : `${forum.description.substring(0, 500)}...`;

          return (
            <div key={index}>
              <h2>{forum.name}</h2>
              <p>{displayText}</p>
              {isLong && (
                <button onClick={() => toggleExpanded(index)}>
                  {isExpanded ? 'Voir moins' : 'Voir plus'}
                </button>
              )}
              <p>Thème : {forum.theme}</p>
              <Link to={`/forums/${forum.id}`}>
                Voir les messages →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
