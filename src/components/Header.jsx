import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ loggedIn, userEmail, onSignOut }) => {
  const location = useLocation();
  const locationName =
    location.pathname === "/signin" ? (
      <Link to="/signup" className="header__link">
        Регистрация
      </Link>
    ) : (
      <Link to="/signin" className="header__link">
        Вход
      </Link>
    );

  return (
    <header className="header">
      <div className="header__logo"></div>
      {loggedIn ? (
        <div className="header__user-zone">
          <p className="header__email">{userEmail}</p>{" "}
          <button className="header__button" onClick={onSignOut}>
            Выход
          </button>
        </div>
      ) : (
        locationName
      )}
    </header>
  );
};

export default Header;
