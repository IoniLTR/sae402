import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Composant principal qui affiche la liste des forums
export default function VoirForum() {
  const [forums, setForums] = useState([]); // Liste des forums récupérés de l'API
  const [themeFilter, setThemeFilter] = useState('all'); // Filtre actuel (par thème)
  const [expandedIndexes, setExpandedIndexes] = useState([]); // Indices des descriptions développées
  const [searchParams] = useSearchParams(); // Pour lire les paramètres de l’URL (ex: ?theme=musique)

  // Applique le filtre de thème selon l'URL au chargement ou changement de paramètre
  useEffect(() => {
    const themeFromURL = searchParams.get('theme'); // Extrait le paramètre "theme"
    setThemeFilter(themeFromURL || 'all'); // Applique le filtre ou "all" par défaut
  }, [searchParams]);

  // Charge les forums depuis l'API une seule fois au montage
  useEffect(() => {
    fetch('http://rsantacruz.fr/backForum/api/forums/getForums')
      .then(res => res.json())         // Transforme la réponse en JSON
      .then(data => setForums(data))   // Stocke les forums dans le state
      .catch(err => console.error('Erreur lors du chargement des forums :', err));
  }, []);

  // Filtrage des forums selon le thème sélectionné
  const filteredForums = themeFilter === 'all'
    ? forums
    : forums.filter(forum => forum.theme === themeFilter);

  // Ouvre ou ferme une description longue (voir plus / voir moins)
  const toggleExpanded = (index) => {
    setExpandedIndexes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index) // Supprime l’index si déjà ouvert
        : [...prev, index]              // Ajoute l’index sinon
    );
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Liste des forums</h1>

      {/* Filtres de thème (boutons dynamiques) */}
      <div style={{ marginBottom: '1rem' }}>
        {['all', 'sport', 'cinema', 'musique'].map(theme => (
          <button
            key={theme}
            onClick={() => setThemeFilter(theme)} // Met à jour le filtre
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
            {/* Affiche "Tous" ou le thème avec la première lettre en majuscule */}
            {theme === 'all' ? 'Tous' : theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      {/* Liste des forums filtrés */}
      <div>
        {filteredForums.map((forum, index) => {
          const isExpanded = expandedIndexes.includes(index); // Description ouverte ?
          const isLong = forum.description.length > 500; // Description longue ?
          const displayText = isExpanded || !isLong
            ? forum.description                            // Tout le texte si ouvert ou court
            : forum.description.substring(0, 500) + '...';  // Sinon résumé

          return (
            <div
              key={forum.id}
              style={{
                marginBottom: '2rem',
                padding: '1rem',
                background: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)' // Légère ombre
              }}
            >
              <h2>{forum.name}</h2>
              <p>{displayText}</p>

              {/* Bouton Voir plus / Voir moins si nécessaire */}
              {isLong && (
                <button
                  onClick={() => toggleExpanded(index)} // Alterne entre voir plus / moins
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

              {/* Affiche le thème du forum */}
              <p><strong>Thème :</strong> {forum.theme}</p>

              {/* Lien vers la page du forum avec ses messages */}
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
