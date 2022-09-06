import React from "react";

function ImagePopup(props) {
  let { onClose, card, isOpen } = props;
  return (
    <div className={`popup popup_type_photo ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content popup__content_type_photo">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <figure className="popup__photo-group">
          <img className="popup__photo" src={card.link} alt={card.name} />
          <figcaption className="popup__photo-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
