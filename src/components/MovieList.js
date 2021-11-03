/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { movies$ } from "../api/movies";
import MovieCard from "./MovieCard";
import "./MovieList.css";
import { add, filter } from "../reducers/movieSlice";
import Pagination from "./Pagination";

const MovieList = () => {
  const [activePage, setActivePage] = useState(1); //actual page number
  const [perPage, setPerPage] = useState(12); // item to show per page

  // Redux states
  const movies = useSelector((state) => state.movies);
  const movieFilter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  // useEffect to get all movies from movies.js file
  useEffect(() => {
    movies$ // movies$ returns a promise
      .then((data) => {
        console.log(data);
        dispatch(add({ data }));
      })
      .catch((err) => console.log(err));
  }, []);

  //create a types array and set default value "All"
  const types = ["All"];

  let moviesToDisplay = movies; // if there is no filter or page limitation show all movies
  let total = 0; // Total movies to show. its value is 0 until movies loaded

  // movies loading asynchronously so we use if  statement to be sure
  if (movies) {
    // total movies length to calculate pagination
    total = moviesToDisplay.length;

    // Add all categories to types array
    movies.forEach((element) => {
      if (types.indexOf(element.category) === -1) {
        types.push(element.category);
      }
    });

    // We verify wheter a filter applied. if it is different from "All" filter results
    if (movieFilter !== "All") {
      moviesToDisplay = movies.filter((elem) => {
        return elem.category === movieFilter;
      });
      // update also total value  after filtering results
      total = moviesToDisplay.length;
    }

    // lastly we need to apply pagination limitation with slice function
    moviesToDisplay = moviesToDisplay.slice(
      (activePage - 1) * perPage,
      activePage * perPage
    );
  }

  console.log("moviesToDisplay==>", moviesToDisplay);
  return (
    <div className="home">
      <h1>Movies</h1>
      {moviesToDisplay ? (
        <main>
          <div className="filter">
            <span>Filter:</span>
            <select
              onChange={(e) => {
                dispatch(filter({ filter: e.target.value }));
                setActivePage(1); // We will have new results so reset active page number
              }}
            >
              {types.map((elem) => {
                return (
                  <option key={elem} value={elem}>
                    {elem}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="movie_list">
            {moviesToDisplay.map((elem) => {
              return <MovieCard key={elem.id} movie={elem} />;
            })}
          </div>
          <div className="bottom">
            <Pagination
              activePage={activePage}
              setActivePage={setActivePage}
              perPage={perPage}
              total={total}
            />
            <div className="per_page">
              <span>Show</span>
              <select onChange={(e) => setPerPage(Number(e.target.value))}>
                {[12, 8, 4].map((elem) => {
                  return <option key={elem}>{elem}</option>;
                })}
              </select>
              <span> item per page</span>
            </div>
          </div>
        </main>
      ) : (
        <h1 className="no_movie">No Movie! 🔎 !</h1>
      )}
    </div>
  );
};

export default MovieList;
