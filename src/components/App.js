import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";

function App() {
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

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
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
  }

  function handleCardClick(card) {
    setSelectedCard({ ...card });
    setCardIsOpen(true);
  }

  return (
    <div className="page-content">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="avatar"
        title="Обновить аватар"
      >
        <label className="popup__form-field">
          <input
            type="url"
            name="avatar"
            id="avatar-input"
            placeholder="Введите ссылку"
            className="popup__input popup__input_type_avatar"
            required
          />
          <span className="popup__input-error avatar-input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="profile"
        title="Редактировать профиль"
      >
        <label className="popup__form-field">
          <input
            type="text"
            name="name"
            id="name-input"
            placeholder="Введите имя"
            className="popup__input popup__input_type_name"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error name-input-error"></span>
        </label>
        <label className="popup__form-field">
          <input
            type="text"
            name="about"
            id="job-input"
            placeholder="Введите профессию"
            className="popup__input popup__input_type_job"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error job-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="card"
        title="Новое место"
      >
        <label className="popup__form-field">
          <input
            type="text"
            id="title-input"
            name="name"
            placeholder="Название"
            className="popup__input popup__input_type_title"
            minLength="1"
            maxLength="30"
            required
          />
          <span className="popup__input-error title-input-error"></span>
        </label>
        <label className="popup__form-field">
          <input
            name="link"
            id="link-input"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link"
            type="url"
            required
          />
          <span className="popup__input-error link-input-error"></span>
        </label>
      </PopupWithForm>
      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
        isOpen={cardIsOpen}
      />
    </div>
  );
}
export default App;
