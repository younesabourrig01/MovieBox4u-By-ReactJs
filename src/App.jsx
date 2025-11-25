import "bootstrap/dist/css/bootstrap.min.css";
import { NavBarCom } from "./Components/NavBarCom/NavBarCom";
import { Slider } from "./Components/Slider/Slider";
import { BoxMovies } from "./Components/BoxMovies/BoxMovies";
import { UseMovies } from "./Context/MoviesContext";
import { Footer } from "./Components/Footer/Footer";
import { BluryContainer } from "./Components/BluryContainer/BluryContainer";
import { Genres } from "./Components/Genres/Genres";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./Pages/About/About";
import { Details } from "./Pages/Details/Details";
import { All } from "./Pages/All/All";
import { MoviesByGen } from "./Pages/MoviesByGen/MoviesByGen";
import { FavoriteList } from "./Pages/Favorite List/FavoriteList";
import { Alert } from "./Components/Alert/Alert";

function App() {
  const { boxMovies, trending, searchContent } = UseMovies();
  const { message } = UseMovies();

  return (
    <Router>
      <NavBarCom searchContent={searchContent} />
      <Alert message={message} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="font container">
              <BluryContainer
                content={<Slider />}
                path={"/allmovies"}
                title="Suggested For You"
                btn="Show All"
              />
              <BoxMovies
                movies={boxMovies}
                path={"/allmovies"}
                title="The best for the Month"
                btn="Show More"
              />
              {/* WHARNING! path ikhtalf */}

              <BoxMovies
                movies={trending}
                path={"/allmovies"}
                title="Trending Today"
                btn="Show All"
              />
              <BluryContainer
                content={<Genres />}
                title="Our Movie genres"
                path={"/allmovies"}
                btn="Show All Movies"
              />
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/movie/:id"
          element={
            <Details
              autherContent={
                <BoxMovies
                  movies={trending}
                  path={"/"}
                  title="Trending Today"
                  btn="Go Home"
                />
              }
            />
          }
        />
        <Route path="/allmovies" element={<All />} />
        <Route path="/allgenres/:id" element={<MoviesByGen />} />
        <Route path="/favoriteList" element={<FavoriteList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
