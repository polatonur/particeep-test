import "./MovieCard.css";
import { Trash, ThumbsDown, ThumbsUp } from "phosphor-react";
import { useDispatch } from "react-redux";
import { del, like, dislike } from "../reducers/movieSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  //abbraviate like and dislike numbers if > 1000
  const numberAbbreviate = (number) => {
    if (number < 1e3) {
      return number;
    } else {
      return (number / 1e3).toFixed(1) + "K";
    }
  };
  numberAbbreviate(12356);

  return (
    <div className="movie_card">
      <h2>{movie.title}</h2>
      <p>{movie.category}</p>
      <div className="movie_card_buttons">
        <div className="trash">
          <span className="icon">
            <Trash
              className="trash"
              onClick={() => dispatch(del({ id: movie.id }))}
              size={24}
            />
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
