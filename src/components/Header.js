import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const { email, text, link, loggedin } = props;
  function signOut() {
    localStorage.removeItem("token");
    props.history.push("/signin");
    props.loggedout();
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип сайта" />
      <div className="header__menu">
        <p className="header__menu-email">{email}</p>
        {!loggedin ? (
          <Link className="header__menu-link" to={link}>
            {text}
          </Link>
        ) : (
          <div className="header__menu-link" onClick={signOut}>
            {text}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
