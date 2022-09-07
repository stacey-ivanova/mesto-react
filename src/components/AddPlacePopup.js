import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");

  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="card"
      title="Новое место"
    >
      <label className="popup__form-field">
        <input
          value={name}
          onChange={handleNameChange}
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
          value={link}
          onChange={handleLinkChange}
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
  );
}

export default AddPlacePopup;
