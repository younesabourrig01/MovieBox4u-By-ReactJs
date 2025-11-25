import { Card, Button } from "react-bootstrap";
import "./Details.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UseMovies } from "../../Context/MoviesContext";

export const Details = ({ autherContent }) => {
  const API_kEY = import.meta.env.VITE_TMDB_KEY;
  const API_BASE = import.meta.env.VITE_TMDB_BASE_URL;

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToFavorites } = UseMovies();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/movie/${id}?api_key=${API_kEY}&language=en-US`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to load movie details.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!movie) return <div className="text-center mt-5">Movie not found!</div>;

  return (
    <div>
      <Card
        style={{ margin: "auto", position: "relative" }}
        className="details p-3 container"
      >
        <div
          onClick={() => {
            addToFavorites(movie);
          }}
          className="favorite-btn"
          title="add to favorite"
        >
          <i className="fa-solid fa-heart"></i>
        </div>

        <div className="d-flex gap-3">
          <Card.Img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            style={{
              width: "250px",
              height: "350px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />

          <div className="d-flex flex-column" style={{ flex: 1 }}>
            <div className="d-flex flex-column justify-content-center flex-grow-1">
              <Card.Title className="mb-3 textTitleColor">
                {movie.title}
              </Card.Title>
              <Card.Title className="mb-3" style={{ color: "gold" }}>
                {movie.release_date}
              </Card.Title>

              <p className="textBodyColor">
                <span style={{ color: "rgb(255, 111, 0)" }}>Overview :</span>
                {movie.overview}
              </p>
              <div className="mb-3 textRatingColor">
                <strong style={{ color: "rgb(255, 111, 0)" }}>Rating : </strong>
                {movie.vote_average.toFixed(1)} TMDB
              </div>
            </div>
            <div className="d-flex gap-2 mt-3">
              <Button
                variant="primary"
                href="https://www.themoviedb.org/"
                target="_blank"
              >
                Watch Now
              </Button>
              <Button variant="secondary" as={Link} to={"/"}>
                Return Home
              </Button>
            </div>
          </div>
        </div>
      </Card>
      {autherContent}
    </div>
  );
};
