import React from "react";
import trashButton from "../images/group.svg";

function Card(props) {
  let { onCardClick, cardElement } = props;
  function handleClick() {
    onCardClick(cardElement);
  }
  return (
    <>
      <button type="button" className="element__trash">
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
          <button type="button" className="element__like-button"></button>
          <p className="element__like-number">{cardElement.likes.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
