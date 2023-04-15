import React, { useEffect, useState } from "react";
import { api } from "../utils/Api.js";
import Card from "./Card.jsx";

const Main = (props) => {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardList]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(...cards, cardList);
      })
      .catch((err) => console.log(`ошибка: ${err}`));
  }, []);

  return (
    <main>
      <section className="profile" aria-label="секция с профилем">
        <div className="profile__wrapper-avatar" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="фото профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__nickname">{userName}</h1>
          <button
            className="profile__button-edit"
            type="button"
            aria-label="редактировать"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__user-info">{userDescription}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="секция блога">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              cardData={card}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
