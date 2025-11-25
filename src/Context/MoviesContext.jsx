import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// 1 create context
const MoviesContext = createContext();

const API_kEY = import.meta.env.VITE_TMDB_KEY;
const API_BASE = import.meta.env.VITE_TMDB_BASE_URL;

// creat the globale provider
export const MoviesProvider = ({ children }) => {
  const [sliderMovies, setSliderMovies] = useState([]);
  const [boxMovies, setBoxMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");

  // movies for the Slider
  const getSliderMovies = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/movie/popular?api_key=${API_kEY}&language=en`
      );
      setSliderMovies(response.data.results.slice(0, 5));
    } catch (error) {
      console.error("error has been detected", error);
    } finally {
      setLoading(false);
    }
  };

  // movies for the box
  const getBoxMovies = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/movie/popular?api_key=${API_kEY}&language=en`
      );
      setBoxMovies(response.data.results.slice(5, 13));
    } catch (error) {
      console.error("error has been detected", error);
    } finally {
      setLoading(false);
    }
  };

  // getting genres
  const getGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_kEY}&language=en`
      );
      setGenres(response.data.genres.slice(0, 18));
    } catch (error) {
      console.error("error has been detected", error);
    } finally {
      setLoading(false);
    }
  };

  //Trending to day
  const getTrending = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_kEY}&language=en`
      );
      setTrending(response.data.results.slice(0, 4));
    } catch (error) {
      console.error("error has been detected", error);
    } finally {
      setLoading(false);
    }
  };

  //search logic
  const search = async () => {
    if (searchQuery.trim() === "") return;
    try {
      const response = await axios.get(
        `${API_BASE}/search/movie?api_key=${API_kEY}&query=${searchQuery}&language=en-US`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Search error:" + error);
    }
  };

  //add to favorite
  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === movie.id);
      if (exists) {
        setMessage("⚠️ Movie already in favorites!");
        return prev;
      }

      setMessage("❤️ Movie added to favorites!");
      return [...prev, movie];
    });
  };

  //delet from favorites
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  };

  useEffect(() => {
    getSliderMovies();
    getBoxMovies();
    getGenres();
    getTrending();
    search();
  }, []);

  //auto delet msg after 2sec
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <MoviesContext.Provider
      value={{
        sliderMovies,
        loading,
        boxMovies,
        genres,
        trending,
        searchQuery,
        setSearchQuery,
        searchResults,
        search,
        favorites,
        addToFavorites,
        removeFavorite,
        message,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const UseMovies = () => {
  return useContext(MoviesContext);
};
