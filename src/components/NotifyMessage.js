import "./NotifyMessage.css";

const NotifyMessage = ({ message, movieName, displayPopUp }) => {
  return (
    <div
      style={{ marginBottom: displayPopUp ? "0" : "-100px" }}
      className="notify_block"
    >
      <div className="pop_up_message">
        <p>
          You <span>{message}</span> <span>{movieName}</span>
        </p>
      </div>
    </div>
  );
};

export default NotifyMessage;
