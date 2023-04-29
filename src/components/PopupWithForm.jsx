import React from "react";

const PopupWithForm = (props) => {
  return (
    <div
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
      onClick={props.onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__${props.name}`}
          name={`form-${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__button-save" type="submit">
            {props.buttonName}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
