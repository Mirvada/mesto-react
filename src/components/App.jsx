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
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isError, setError] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cardList]) => {
          setCurrentUser(user);
          setCards(cardList);
        })
        .catch((err) => console.log(`ошибка: ${err}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
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

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImgPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
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

  function handleRegister({ password, email }) {
    auth
      .register({ password, email })
      .then(() => {
        setError(false);
        navigate("/signin");
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  function handleLogin({ password, email }) {
    auth
      .authorization({ password, email })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        setError(true);
        handleInfoTooltip();
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((user) => {
          setUserEmail(user.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch(() => {
          setError(true);
          handleInfoTooltip();
        });
    }
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onSignOut={handleLogout}
        />
        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route path="*" element={navigate("/", { replace: true })} />
        </Routes>

        {loggedIn && <Footer />}

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

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipPopupOpen}
          isError={isError}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
