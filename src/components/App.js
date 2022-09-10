import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth.js";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const [cardIsOpen, setCardIsOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [isInfoTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);

  const [isSuccessRegister, setIsSuccessRegister] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState("");

  const history = useHistory();

  function handleTokenCheck() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        auth
          .getContent(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setUserEmail(res.data.email);
              history.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  function handleLogin() {
    setLoggedIn(!loggedIn);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((deleteCard) => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleInfoTooltipPopupOpen(success) {
    setIsTooltipPopupOpen(true);
    setIsSuccessRegister(success);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      name: "",
      link: "",
    });
    setCardIsOpen(false);
    setIsTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard({ ...card });
    setCardIsOpen(true);
  }

  function handleUpdateUser(user) {
    api
      .changeUserInfo(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(user) {
    api
      .changeAvatar(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .newCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards([...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-content">
        <div className="page">
          <Switch>
            <Route exact path="/">
              {loggedIn ? (
                <>
                  <Header
                    email={userEmail}
                    text="Выйти"
                    link="/signin"
                    history={history}
                    loggedin={loggedIn}
                    loggedout={handleLogin}
                  />
                  <ProtectedRoute
                    path="/"
                    loggedIn={loggedIn}
                    component={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  ></ProtectedRoute>
                </>
              ) : (
                <Redirect to="/signup" />
              )}
            </Route>

            <Route path="/signup">
              {!loggedIn && <Header text="Войти" link="/signin" />}
              <InfoTooltip
                isOpen={isInfoTooltipPopupOpen}
                success={isSuccessRegister}
                onClose={closeAllPopups}
                name="tooltip"
                history={history}
              ></InfoTooltip>
              <Register
                history={history}
                handleInfoTooltipPopupOpen={handleInfoTooltipPopupOpen}
              />
            </Route>
            <Route path="/signin">
              {!loggedIn && <Header text="Регистрация" link="/signup" />}
              <Login
                handleLogin={handleLogin}
                history={history}
                setemail={setUserEmail}
              />
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={cardIsOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
