import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  let {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards,
  } = props;
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile-info">
        <div className="profile">
          <div className="profile__user">
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${user.avatar})` }}
            ></div>

            <button
              type="button"
              className="profile__avatar-edit"
              onClick={onEditAvatar}
            ></button>
            <div className="profile__text">
              <div className="profile__text-edit">
                <h1 className="profile__title">{user.name}</h1>
                <button
                  type="button"
                  className="profile__edit-button"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className="profile__subtitle">{user.about}</p>
            </div>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={onAddPlace}
          ></button>
        </div>
      </section>
      <section className="articles">
        <ul className="elements">
          {props.cards.map((card) => (
            <li className="element" key={card._id}>
              <Card
                cardElement={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
