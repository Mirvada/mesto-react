import { useState } from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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
  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="popup_edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <form
          className="popup__form popup__form_edit"
          name="form-edit"
          noValidate
        >
          <input
            id="edit-input"
            className="popup__input popup__input_type_name"
            type="text"
            placeholder="Имя"
            name="name"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__error edit-input-error"></span>
          <input
            id="info-input"
            className="popup__input popup__input_type_info"
            type="text"
            placeholder="О себе"
            name="info"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error info-input-error"></span>
          <button className="popup__button-save" type="submit">
            Сохранить
          </button>
        </form>
      </PopupWithForm>
      <PopupWithForm
        name="popup_add"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <form
          className="popup__form popup__form_add"
          name="form-add"
          noValidate
        >
          <input
            id="title-input"
            className="popup__input popup__input_type_title"
            type="text"
            placeholder="Название"
            name="title"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__error title-input-error"></span>
          <input
            id="link-input"
            className="popup__input popup__input_type_link"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required
          />
          <span className="popup__error link-input-error"></span>
          <button className="popup__button-save" type="submit">
            Создать
          </button>
        </form>
      </PopupWithForm>
      <PopupWithForm
        name="popup_add-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <form
          className="popup__form popup__form_avatar"
          name="form-avatar"
          noValidate
        >
          <input
            id="avatar-input"
            className="popup__input popup__input_type_link-avatar"
            type="url"
            placeholder="Ссылка на аватар"
            name="avatar"
            required
          />
          <span className="popup__error avatar-input-error"></span>
          <button className="popup__button-save" type="submit">
            Сохранить
          </button>
        </form>
      </PopupWithForm>

      <PopupWithForm name="popup_deletion-request" title="Вы уверены?">
        <form
          className="popup__form popup__form_deletion-request"
          name="form-deletion-request"
          noValidate
        >
          <button className="popup__button-save" type="button">
            Да
          </button>
        </form>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        isOpen={isImgPopupOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
