import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");

  const [description, setDescription] = React.useState("");

  const user = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="name"
          value={name || ""}
          onChange={handleNameChange}
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
          value={description || ""}
          onChange={handleDescriptionChange}
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
  );
}

export default EditProfilePopup;
