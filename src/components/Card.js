import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import trashButton from "../images/group.svg";

function Card(props) {
  const { onCardClick, cardElement, onCardLike, onCardDelete } = props;

  const user = React.useContext(CurrentUserContext);

  const isOwn = cardElement.owner._id === user._id;

  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "" : "element_trash-inactive"
  }`;

  const isLiked = cardElement.likes.some((i) => i._id === user._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick(cardElement);
  }

  function handleLikeClick() {
    onCardLike(cardElement);
  }

  function handleDeleteClick() {
    onCardDelete(cardElement);
  }

  return (
    <li className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      >
        <img src={trashButton} width="18px" height="19px" />
      </button>
      <img
        className="element__photo"
        src={cardElement.link}
        alt={cardElement.name}
        onClick={handleClick}
      ></img>
      <div className="element__info">
        <h2 className="element__text">{cardElement.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-number">{cardElement.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
