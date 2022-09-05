import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_photo ${
        props.card.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__content popup__content_type_photo">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <figure className="popup__photo-group">
          <img className="popup__photo" src={props.card.link} alt="" />
          <figcaption className="popup__photo-caption">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
