// src/pages/Home1.jsx
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import './home.css'

export default function Home1() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleRedirect = (theme) => {
    if (theme === 'all') {
      navigate('/forums');
    } else {
      navigate(`/forums?theme=${theme}`);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }
  };

  return (
    <div className="main-home">
      <div className="title-home">
        <h1>Bienvenue sur notre Forum</h1>
        <h2>Vous trouverez le meilleur du <strong>Sport</strong>, du <strong>Cinéma</strong> et de la <strong>Musique</strong></h2>

        {/* Carousel */}
        <div className="carousel-wrapper">
          <button className="carousel-btn left" onClick={scrollLeft}>←</button>
          <div className="carousel-scroll" ref={carouselRef}>
            <div className="carousel-slide">
              <img src="/images/sport.jpg" alt="Sport" />
            </div>
            <div className="carousel-slide">
              <img src="/images/cinema.jpg" alt="Cinéma" />
            </div>
            <div className="carousel-slide">
              <img src="/images/musique.jpg" alt="Musique" />
            </div>
          </div>
          <button className="carousel-btn right" onClick={scrollRight}>→</button>
        </div>
      </div>

      {/* Sections thématiques */}
      <div className="content-home wow slideInLeft">
        <img src="/images/sport.jpg" alt="sport" onClick={() => handleRedirect('sport')} />
        <div className="text-content-home">
          <h1 className='title'>Sport</h1>
          <p className='para'>Bienvenue dans l’arène des passionnés ! Ici, on vibre au rythme des grandes compétitions, des records battus et des exploits sportifs. Que vous soyez un supporter inconditionnel, un pratiquant amateur ou un simple curieux, cette section est ouverte à tous les amateurs d’émotions fortes. Discutez des matchs en direct, partagez vos analyses d’avant ou d’après-match, débattez sur les transferts, les stratégies d’équipes ou les classements. Football, basketball, tennis, Formule 1, cyclisme, arts martiaux, e-sport et bien plus encore : chaque discipline a sa place.</p>
          <p className='para'>Vous suivez les Jeux Olympiques, la Ligue des Champions, Roland-Garros ou la NBA ? Vous aimez parler des grands noms comme Mbappé, Djokovic, LeBron James ou Verstappen ? Vous êtes au bon endroit. N’hésitez pas à lancer vos propres sujets, proposer des sondages ou créer des discussions autour des événements locaux et internationaux.</p>
          <button onClick={() => handleRedirect('sport')} className='btn'>Accéder</button>
        </div>
      </div>

      <div className="content-home wow slideInRight">
        <img src="/images/cinema.jpg" alt="ciné" />
        <div className="text-content-home">
          <h1 className='title'>Cinéma</h1>
          <p className='para'>Installez-vous confortablement, le générique commence ! Cette section est le rendez-vous des cinéphiles, des sériephiles et de tous ceux qui aiment s’évader à travers les écrans. Que vous soyez amateur de blockbusters hollywoodiens, de films d’auteur, de thrillers psychologiques ou de comédies romantiques, vous trouverez ici un espace pour échanger, critiquer, conseiller et découvrir.</p>
      <p className='para'>Parlez des dernières sorties en salle ou sur les plateformes de streaming, donnez votre avis sur les performances d’acteurs, partagez des anecdotes de tournage ou discutez des grandes œuvres du cinéma mondial. Un débat sur Christopher Nolan, un top 5 des films de Tarantino, une discussion sur les Oscars ou un retour sur une série culte comme "Breaking Bad" ou "The Crown" ? Cette section vous tend les bras. Et si vous êtes un créateur en herbe, n’hésitez pas à partager vos projets ou courts-métrages pour recueillir des avis !</p>
          <button onClick={() => handleRedirect('cinema')} className='btn'>Accéder</button>
        </div>
<<<<<<< RevoirForum
        <img src="/images/cinema.jpg" alt="ciné" />
=======
>>>>>>> main
      </div>

      <div className="content-home wow slideInLeft">
        <img src="/images/musique.jpg" alt="musique" onClick={() => handleRedirect('musique')} />
        <div className="text-content-home">
          <h1 className='title'>Musique</h1>
          <p className='para'>Que serait un forum sans une bande-son ? Ici, la musique est à l’honneur sous toutes ses formes. Rock, rap, pop, électro, reggae, métal, jazz, classique ou musiques du monde : tous les genres sont les bienvenus. Que vous soyez mélomane, musicien, chanteur ou simple amateur, vous pouvez partager vos coups de cœur, faire découvrir des artistes, commenter les sorties d’albums, et suivre l’actualité musicale.</p>
          <p className='para'>Vous aimez analyser les textes, comparer les styles, débattre sur les performances en live ou découvrir des talents émergents ? Vous êtes au bon endroit. Créez vos playlists, parlez de vos concerts préférés ou échangez des recommandations !</p>
          <button onClick={() => handleRedirect('musique')} className='btn'>Accéder</button>
        </div>
      </div>
    </div>
  );
}
