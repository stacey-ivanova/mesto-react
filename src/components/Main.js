import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then((data) => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
    });
  });

  React.useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards([...data]);
    });
  });

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
              onClick={props.onEditAvatar}
            ></button>
            <div className="profile__text">
              <div className="profile__text-edit">
                <h1 className="profile__title">{userName}</h1>
                <button
                  type="button"
                  className="profile__edit-button"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__subtitle">{userDescription}</p>
            </div>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={props.onAddPlace}
          ></button>
        </div>
      </section>
      <section className="articles">
        <ul className="elements">
          {cards.map((card) => (
            <Card cardElement={card} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

// React.useEffect(() => {
//   api
//     .getUserInfo()
//     .then((data) => {
//       setUserName(data.name);
//       setUserDescription(data.about);
//       setUserAvatar(data.avatar);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);

// {cards.map((card, i) => (
//   <li key={i} className="element">
//     <button type="button" className="element__trash">
//       <img
//         src="<%=require('./images/group.svg')%>"
//         width="18px"
//         height="19px"
//       />
//     </button>
//     <div
//       className="element__photo"
//       style={{ backgroundImage: `url(${card.avatar})` }}
//     ></div>
//     <div className="element__info">
//       <h2 className="element__text">{card.name}</h2>
//       <div className="element__like">
//         <button
//           type="button"
//           className="element__like-button"
//         ></button>
//         <p className="element__like-number"></p>
//       </div>
//     </div>
//   </li>
// ))}
