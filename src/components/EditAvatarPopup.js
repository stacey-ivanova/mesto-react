import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatar.current.value });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
    >
      <label className="popup__form-field">
        <input
          ref={avatar}
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
  );
}

export default EditAvatarPopup;
