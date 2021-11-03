/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { movies$ } from "../api/movies";
import MovieCard from "./MovieCard";
import "./MovieList.css";
import { add, filter } from "../reducers/movieSlice";

const MovieList = () => {
  const movies = useSelector((state) => state.movies);
  const movieFilter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  console.log(movies);
  // dispatch(del({ mov: "hey" }));

  useEffect(() => {
    movies$
      .then((data) => {
        console.log(data);
        dispatch(add({ data }));
      })
      .catch((err) => console.log(err));
  }, []);

  const types = ["All"];
  let moviesToDisplay = movies;

  if (movies) {
    movies.forEach((element) => {
      if (types.indexOf(element.category) === -1) {
        types.push(element.category);
      }
    });
    console.log(movieFilter);
    if (movieFilter !== "All") {
      console.log("filtering");
      moviesToDisplay = movies.filter((elem) => {
        return elem.category === movieFilter;
      });
    }
  }
  console.log("moviesToDisplay==>", moviesToDisplay);
  return (
    <div className="home">
      <h1>Movies</h1>
      {movies && (
        <div className="filter">
          <span>Filter:</span>
          <select
            onChange={(e) => dispatch(filter({ filter: e.target.value }))}
          >
            {types.map((elem) => {
              return <option value={elem}>{elem}</option>;
            })}
          </select>
        </div>
      )}
      <div className="movie_list">
        {moviesToDisplay &&
          moviesToDisplay.map((elem) => {
            return <MovieCard key={elem.id} movie={elem} />;
          })}
      </div>
    </div>
  );
};

export default MovieList;
