import React, { useState } from "react";

const Login = (props) => {
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
    props.onLogin({ password, email });
  };

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__from" onSubmit={handleSubmit}>
        <input
          className="login__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          className="login__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
