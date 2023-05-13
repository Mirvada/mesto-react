import React from "react";

const ImagePopup = ({ card, onClose, isOpen }) => {
  return (
    <div
      className={`popup popup_viewer ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__viewer-container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__viewer-img" alt={card.name} src={card.link} />
        <h2 className="popup__viewer-title">{card.name}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;
