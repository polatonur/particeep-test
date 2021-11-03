import "./MovieCard.css";
import { Trash, ThumbsDown, ThumbsUp } from "phosphor-react";
import { useDispatch } from "react-redux";
import { del, like, dislike } from "../reducers/movieSlice";
import { useState } from "react";
import NotifyMessage from "./NotifyMessage";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false); // State for delete animation
  const [message, setMessage] = useState(null); //State for pop up message "liked" or "disliked"
  const [displayPopUp, setDisplayPopUp] = useState(false);

  //abbraviate like and dislike numbers if > 1000 to avoid show large number
  const numberAbbreviate = (number) => {
    if (number < 1e3) {
      return number;
    } else {
      return (number / 1e3).toFixed(1) + "K";
    }
  };

  const handleClickDelete = () => {
    // first apply disappear effect
    setDeleted(true);
    // than dispatch to delete item
    setTimeout(() => {
      dispatch(del({ id: movie.id }));
    }, 1000);
  };

  const handleClickLike = () => {
    dispatch(like({ id: movie.id }));
    if (message === "liked") {
      // undo your like
      setMessage(null);
    } else {
      // You liked this movie show messages
      setMessage("liked");
      setDisplayPopUp(true);
    }
  };

  const handleClickDislike = () => {
    dispatch(dislike({ id: movie.id }));
    if (message === "disliked") {
      // undo your dislike
      setMessage(null);
    } else {
      // You disliked this movie show messages
      setMessage("disliked");
      setDisplayPopUp(true);
    }
  };

  // hide notify messages after 2 seconds
  if (displayPopUp) {
    setTimeout(() => {
      setDisplayPopUp(false);
    }, 2000);
  }

  return (
    <div className={`${deleted ? "card_deleted" : ""} movie_card`}>
      <h2>{movie.title}</h2>
      <p>{movie.category}</p>
      <div className="movie_card_buttons">
        <div className="trash">
          <span className="icon">
            <Trash
              className="trash"
              onClick={() => handleClickDelete()}
              size={24}
            />
          </span>
        </div>
        <div className="like_dislike">
          <div className="like">
            <span className="icon icon-dislike">
              <ThumbsDown
                size={24}
                onClick={() => handleClickDislike()}
                weight={movie.isDisliked ? "fill" : "regular"}
                color={movie.isDisliked ? "#EB0000" : "#000000"}
              />
            </span>
            <span className="counter">{numberAbbreviate(movie.dislikes)}</span>
          </div>
          <div className="dislike">
            <span className="icon icon-like">
              <ThumbsUp
                onClick={() => handleClickLike()}
                size={24}
                weight={movie.isLiked ? "fill" : "regular"}
                color={movie.isLiked ? "#2f9300" : "#000000"}
              />
            </span>
            <span className="counter">{numberAbbreviate(movie.likes)}</span>
          </div>
        </div>
      </div>
      <NotifyMessage
        message={message}
        movieName={movie.title}
        displayPopUp={displayPopUp}
      />
    </div>
  );
};

export default MovieCard;
