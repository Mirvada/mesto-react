import { useEffect, useState } from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Main from "./Main.jsx";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "./contexts/CurrentUserContext.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cardList]) => {
        setCurrentUser(user);
        setCards(cardList);
      })
      .catch((err) => console.log(`ошибка: ${err}`));
  }, []);

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImgPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImgPopupOpen(false);
  }

  function handleCardLike(cardData) {
    const isLiked = cardData.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(cardData._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === cardData._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`ошибка: ${err}`));
  }

  function handleCardDelete(cardData) {
    api
      .deleteCard(cardData._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardData._id));
      })
      .catch((err) => console.log(`ошибка: ${err}`));
  }

  function handleUpdateUser(user) {
    api
      .sendEditedUserData(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`ошибка: ${err}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar({ avatar })
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`ошибка: ${err}`));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`ошибка: ${err}`));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImgPopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
