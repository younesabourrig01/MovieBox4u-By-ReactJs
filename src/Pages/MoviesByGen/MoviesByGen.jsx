import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { UseMovies } from "../../Context/MoviesContext";
import { BoxMovies } from "../../Components/BoxMovies/BoxMovies";
import InfiniteScroll from "react-infinite-scroll-component";

export const MoviesByGen = () => {
  const { id } = useParams();
  const [moviesByGen, setMoviesByGen] = useState([]);
  const { genres } = UseMovies();
  const [genName, setGenName] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const genreFound = genres.find((gen) => gen.id == id);
    setGenName(genreFound?.name || "");
  }, [id, genres]);

  const API_kEY = import.meta.env.VITE_TMDB_KEY;

  const getMoviesByGen = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_kEY}&with_genres=${id}&language=en`
      );
      const newMovies = response.data.results;

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMoviesByGen((prev) => [...prev, ...newMovies]);
      }
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  useEffect(() => {
    getMoviesByGen();
  }, [id, page]);
  console.log(id);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <InfiniteScroll
      dataLength={moviesByGen.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4 className="text-center text-light">Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center", color: "gray" }}>
          <b>🎬 You have seen them all!</b>
        </p>
      }
    >
      <BoxMovies
        movies={moviesByGen}
        title={genName}
        path={"/"}
        btn="Go Home"
      />
      ;
    </InfiniteScroll>
  );
};
