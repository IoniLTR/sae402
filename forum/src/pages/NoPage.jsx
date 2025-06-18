import { Link } from 'react-router-dom';

// Définition du composant NoPage
export default function NoPage() {
  return (
    // Retourne un élément div avec une classe "not-found"
    <div className="not-found">
      {/* Image avec l'URL vers 'public/images/404.webp' et texte alternatif "404" */}
      <img src="public/images/404.webp" alt="404" />
      {/* Titre de niveau 2 indiquant "Page Introuvable" */}
      <h2>Page Introuvable</h2>
      {/* Utilisation de React Router pour naviguer vers la page d'accueil */}
      <Link to="/">
        {/* Bouton avec le texte "Page d'accueil" */}
        <button>Page d'accueil</button>
      </Link>
    </div>
  );
}
