import "./MovieCard.css";
import { Trash, ThumbsDown, ThumbsUp } from "phosphor-react";
import { useDispatch } from "react-redux";
import { del, like, dislike } from "../reducers/movieSlice";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);

  //abbraviate like and dislike numbers if > 1000 to avoid show large number
  const numberAbbreviate = (number) => {
    if (number < 1e3) {
      return number;
    } else {
      return (number / 1e3).toFixed(1) + "K";
    }
  };

  const handleClick = () => {
    setDeleted(true);
    setTimeout(() => {
      dispatch(del({ id: movie.id }));
    }, 1000);
  };

  return (
    <div className={`${deleted ? "deleted" : ""} movie_card`}>
      <h2>{movie.title}</h2>
      <p>{movie.category}</p>
      <div className="movie_card_buttons">
        <div className="trash">
          <span className="icon">
            <Trash className="trash" onClick={() => handleClick()} size={24} />
          </span>
        </div>
        <div className="like_dislike">
          <div className="like">
            <span className="icon icon-dislike">
              <ThumbsDown
                size={24}
                onClick={() => dispatch(dislike({ id: movie.id }))}
                weight={movie.isDisliked ? "fill" : "regular"}
                color={movie.isDisliked ? "#EB0000" : "#000000"}
              />
            </span>
            <span className="counter">{numberAbbreviate(movie.dislikes)}</span>
          </div>
          <div className="dislike">
            <span className="icon icon-like">
              <ThumbsUp
                onClick={() => dispatch(like({ id: movie.id }))}
                size={24}
                weight={movie.isLiked ? "fill" : "regular"}
                color={movie.isLiked ? "#2f9300" : "#000000"}
              />
            </span>
            <span className="counter">{numberAbbreviate(movie.likes)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
