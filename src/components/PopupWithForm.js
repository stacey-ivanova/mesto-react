import React from "react";

function PopupWithForm(props) {
  let { title, name, onClose } = props;
  return (
    <div
      className={`popup popup_type_${name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{`${title}`}</h2>
        <form
          className={`popup__form popup_type_${name}`}
          name={`${name}`}
          noValidate
        >
          {props.children}
          <button type="submit" className="popup__submit-button">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
