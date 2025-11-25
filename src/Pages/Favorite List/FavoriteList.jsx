import { UseMovies } from "../../Context/MoviesContext";
import { BoxMovies } from "../../Components/BoxMovies/BoxMovies";

export const FavoriteList = () => {
  const { favorites } = UseMovies();
  return (
    <div>
      <BoxMovies movies={favorites} title="⭐ Favorite Movies" path={'/'} btn="Go Home"/>
    </div>
  );
};
