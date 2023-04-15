import React, { useState } from "react";

const ImagePopup = (props) => {
  return (
    <div
      className={`popup popup_viewer ${props.isOpen ? "popup_opened" : ""}`}
      onClick={props.onClose}
    >
      <div
        className="popup__viewer-container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__viewer-img"
          alt={props.card.name}
          src={props.card.link}
        />
        <h2 className="popup__viewer-title">{props.card.name}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;
