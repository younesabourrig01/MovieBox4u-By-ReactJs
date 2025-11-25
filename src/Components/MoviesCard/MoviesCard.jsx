import { Link } from "react-router-dom";
import "./MoviesCard.css";
import { Card, Button } from "react-bootstrap";
import { UseMovies } from "../../Context/MoviesContext";

export const MoviesCard = ({ movie }) => {
  const { removeFavorite, favorites } = UseMovies();
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="moviesCard">
      <Button
        variant="danger"
        onClick={() => removeFavorite(movie.id)}
        style={{ display: isFavorite ? "block" : "none", marginBottom : '.5rem' }}
      >
      ❌
      </Button>
      <Card
        className="movie-card shadow-lg border-0"
        as={Link}
        to={`/movie/${movie.id}`}
      >
        <div className="movie-image-wrapper">
          <Card.Img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-img"
          />
          <div className="movie-overlay">
            <h5 className="movie-title">{movie.title}</h5>

            <div className="movie-info">
              <span className="movie-pop">{movie.vote_average.toFixed(1)}</span>
              <span className="movie-date">{movie.release_date}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
