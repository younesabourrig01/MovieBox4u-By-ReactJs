import axios from "axios";
import { useEffect, useState } from "react";
import { BoxMovies } from "../../Components/BoxMovies/BoxMovies";
import InfiniteScroll from "react-infinite-scroll-component";
import { UseMovies } from "../../Context/MoviesContext";

export const All = () => {
  const API_kEY = import.meta.env.VITE_TMDB_KEY;
  const API_BASE = import.meta.env.VITE_TMDB_BASE_URL;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { searchQuery, searchResults, search } = UseMovies();

  // Fetch all movies (default list)
  const getAllMovies = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/movie/popular?page=${page}&api_key=${API_kEY}&language=en`
      );

      const newMovies = response.data.results;

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
      }
    } catch (error) {
      console.error("Error detected :" + error);
    } finally {
      setLoading(false);
    }
  };

  // Search effect
  useEffect(() => {
    if (searchQuery.trim() === "") return;
    const timer = setTimeout(() => search(), 600);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      getAllMovies();
    }
  }, [page, searchQuery]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore && !searchQuery}
        loader={<h4 className="text-center text-light">Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", color: "gray" }}>
            <b>🎬 You have seen them all!</b>
          </p>
        }
      >
        <BoxMovies
          movies={searchQuery ? searchResults : movies}
          title="All Movies"
          path={"/"}
          btn="Go Home"
        />
      </InfiniteScroll>
    </div>
  );
};
