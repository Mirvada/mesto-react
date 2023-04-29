import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link: link,
    });

    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      name="popup_add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName="Создать"
    >
      <input
        id="title-input"
        className="popup__input popup__input_type_title"
        type="text"
        value={name ?? ""}
        onChange={(e) => setName(e.target.value)}
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
        value={link ?? ""}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
