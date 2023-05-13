import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister({ password, email });
  };

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          className="register__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__singin">
        <p>Уже зарегистрированы? </p>
        <Link to="/signin" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
