import React, { useContext } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

const Card = (props) => {
  const userData = useContext(CurrentUserContext);
  const isOwn = props.cardData.owner._id === userData._id;
  const isLiked = props.cardData.likes.some((i) => i._id === userData._id);
  const cardLikeButtonClassName = `card__button-like ${
    isLiked && "card__button-like_active"
  }`;
  function handleClick() {
    props.onCardClick(props.cardData);
  }
  function handleLikeClick() {
    props.onCardLike(props.cardData);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.cardData);
  }

  return (
    <div className="card">
      <img
        className="card__img"
        alt={props.name}
        src={props.link}
        onClick={handleClick}
      />

      {isOwn && (
        <button
          className="card__button-delete"
          type="button"
          aria-label="удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="card__caption">
        <h2 className="card__text">{props.name}</h2>
        <div className="card__like-zone">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="card__count-like">{props.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
