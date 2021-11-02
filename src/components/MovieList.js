/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { movies$ } from "../api/movies";
import { useSelector, useDispatch } from "react-redux";
import { add, del, like, dislike, filter } from "../reducers/movieSlice";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const movieFilter = useSelector((state) => state.filter);

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

  const handleClick = (id) => {
    dispatch(del({ id }));
  };
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
    <div className="movie_list">
      {movies && (
        <select onChange={(e) => dispatch(filter({ filter: e.target.value }))}>
          {types.map((elem) => {
            return <option value={elem}>{elem}</option>;
          })}
        </select>
      )}
      {moviesToDisplay &&
        moviesToDisplay.map((elem) => {
          return (
            <div key={elem.id}>
              <p onClick={() => handleClick(elem.id)}> {elem.title}</p>
              <p style={{ color: "red" }}>{elem.category}</p>
              <button onClick={() => dispatch(like({ id: elem.id }))}>
                likes:{elem.likes}
              </button>
              <button onClick={() => dispatch(dislike({ id: elem.id }))}>
                dislikes:{elem.dislikes}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default MovieList;
