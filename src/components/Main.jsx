import React, { useContext } from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "./contexts/CurrentUserContext.jsx";

const Main = (props) => {
  const userData = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="секция с профилем">
        <div className="profile__wrapper-avatar" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={userData.avatar}
            alt="фото профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__nickname">{userData.name}</h1>
          <button
            className="profile__button-edit"
            type="button"
            aria-label="редактировать"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__user-info">{userData.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="секция блога">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              cardData={card}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
