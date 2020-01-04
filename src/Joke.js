import React from "react";
import "./Joke.css";
import { getColor, getEmoji } from "./helper";
const Joke = ({ votes, text, upvote, downvote }) => {
  return (
    <div className="joke">
      <div className="joke-btns">
        <i className="fas fa-arrow-up" onClick={upvote} />
        <span className="joke-votes" style={{ borderColor: getColor(votes) }}>
          {votes}
        </span>
        <i className="fas fa-arrow-down" onClick={downvote} />
      </div>
      <div className="joke-text">{text}</div>
      <span className={`joke-smiley ${getEmoji(votes)}`}></span>
    </div>
  );
};

export default Joke;
