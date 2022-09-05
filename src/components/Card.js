import React from "react";
import trashButton from "../images/group.svg";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.cardElement);
  }
  return (
    <li className="element">
      <button type="button" className="element__trash">
        <img src={trashButton} width="18px" height="19px" />
      </button>
      <img
        className="element__photo"
        src={props.cardElement.link}
        onClick={handleClick}
      ></img>
      <div className="element__info">
        <h2 className="element__text">{props.cardElement.name}</h2>
        <div className="element__like">
          <button type="button" className="element__like-button"></button>
          <p className="element__like-number">
            {props.cardElement.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
