import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  let { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props;
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
      ([userD, cards]) => {
        setUserName(userD.name);
        setUserDescription(userD.about);
        setUserAvatar(userD.avatar);
        setCards([...cards]);
      }
    );
  }, []);

  return (
    <main className="content">
      <section className="profile-info">
        <div className="profile">
          <div className="profile__user">
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${userAvatar})` }}
            ></div>

            <button
              type="button"
              className="profile__avatar-edit"
              onClick={onEditAvatar}
            ></button>
            <div className="profile__text">
              <div className="profile__text-edit">
                <h1 className="profile__title">{userName}</h1>
                <button
                  type="button"
                  className="profile__edit-button"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className="profile__subtitle">{userDescription}</p>
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
          {cards.map((card) => (
            <li className="element" key={card._id}>
              <Card cardElement={card} onCardClick={onCardClick} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
