import React from "react";
import { useHistory } from "react-router-dom";
import { register, login } from "../utils/Auth";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password)
      .then((res) => {
        if (res) {
          setEmail("");
          setPassword("");
          props.handleInfoTooltipPopupOpen(true);
        } else {
          props.handleInfoTooltipPopupOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
        // handleInfoTooltipPopupOpen(false);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1 className="form__title">Регистрация</h1>
      <input
        className="form__item"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <span className="form__item-error"></span>
      <input
        className="form__item"
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={handlePasswordChange}
      />
      <span className="form__item-error"></span>
      <button type="submit" className="form__submit-button">
        Зарегистрироваться
      </button>
      <div className="form__signin-container">
        <p className="form__text">Уже зарегестрированы?</p>
        <button
          className="form__signin-link"
          onClick={() => props.history.push("/signin")}
        >
          Войти
        </button>
      </div>
    </form>
  );
}

export default Register;
