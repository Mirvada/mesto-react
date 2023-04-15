import React from "react";

const Card = (props) => {
  function handleClick() {
    props.onCardClick(props.cardData);
  }

  return (
    <div className="card">
      <img
        className="card__img"
        alt={props.name}
        src={props.link}
        onClick={handleClick}
      />
      <button
        className="card__button-delete"
        type="button"
        aria-label="удалить"
      ></button>
      <div className="card__caption">
        <h2 className="card__text">{props.name}</h2>
        <div className="card__like-zone">
          <button
            className="card__button-like"
            type="button"
            aria-label="нравится"
          ></button>
          <span className="card__count-like">{props.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
