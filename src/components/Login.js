import React from "react";
import { Link } from "react-router-dom";
import * as auth from "../utils/Auth.js";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //   const history = useHistory();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail("");
          setPassword("");
          localStorage.setItem("token", data.token);
          props.setemail(email);
          props.handleLogin();
          props.history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form__title">Вход</h1>
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
          Войти
        </button>
      </form>
    </>
  );
}

export default Login;
