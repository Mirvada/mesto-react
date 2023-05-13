import React from "react";
import ok from "../images/ok.svg";
import fail from "../images/fail.svg";

const InfoTooltip = (props) => {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      onClick={props.onClose}
    >
      <div
        className="popup__container popup__info-tooltip"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__button-close"
          onClick={props.onClose}
        ></button>
        <img
          src={props.isError ? fail : ok}
          alt={props.isError ? "красный крест" : "зеленая галочка"}
          className="popup__img"
        />
        <p className="popup__info-text">
          {props.isError
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
