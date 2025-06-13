import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function VoirForum() {
  const [forums, setForums] = useState([]);
  const [themeFilter, setThemeFilter] = useState('all');
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const themeFromURL = searchParams.get('theme');
    setThemeFilter(themeFromURL || 'all');
  }, [searchParams]);

  useEffect(() => {
    fetch('http://rsantacruz.fr/backForum/api/forums/getForums')
      .then(res => res.json())
      .then(data => setForums(data))
      .catch(err => console.error('Erreur lors du chargement des forums :', err));
  }, []);

  const filteredForums = themeFilter === 'all'
    ? forums
    : forums.filter(forum => forum.theme === themeFilter);

  const toggleExpanded = (index) => {
    setExpandedIndexes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Liste des forums</h1>

      {/* Filtres */}
      <div style={{ marginBottom: '1rem' }}>
        {['all', 'sport', 'cinema', 'musique'].map(theme => (
          <button
            key={theme}
            onClick={() => setThemeFilter(theme)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: themeFilter === theme ? '#0ea5e9' : '#e2e8f0',
              color: themeFilter === theme ? '#fff' : '#1e293b',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            {theme === 'all' ? 'Tous' : theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      {/* Liste des forums */}
      <div>
        {filteredForums.map((forum, index) => {
          const isExpanded = expandedIndexes.includes(index);
          const isLong = forum.description.length > 500;
          const displayText = isExpanded || !isLong
            ? forum.description
            : forum.description.substring(0, 500) + '...';

          return (
            <div
              key={forum.id}
              style={{
                marginBottom: '2rem',
                padding: '1rem',
                background: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h2>{forum.name}</h2>
              <p>{displayText}</p>
              {isLong && (
                <button
                  onClick={() => toggleExpanded(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0ea5e9',
                    cursor: 'pointer',
                    padding: '0',
                    fontSize: '0.95rem'
                  }}
                >
                  {isExpanded ? 'Voir moins' : 'Voir plus'}
                </button>
              )}
              <p><strong>Thème :</strong> {forum.theme}</p>
              <Link
                to={`/forums/${forum.id}`}
                style={{
                  color: '#1e293b',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  marginTop: '0.5rem',
                  display: 'inline-block'
                }}
              >
                Voir les messages →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
