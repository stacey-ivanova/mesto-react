import React from "react";
import signin from "../images/signedIn.svg";
import denied from "../images/denied.svg";

function InfoTooltip(props) {
  const { name, onClose, history } = props;

  function handleRedirect() {
    if (props.success) {
      onClose();
      history.push("/signin");
    } else {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__content popup__content_type_${name}`}>
        <button
          type="button"
          className="popup__close-button"
          onClick={handleRedirect}
        ></button>
        {props.success ? (
          <>
            <img className="popup__icon" src={signin} />
            <h2 className={`popup__title  popup__title_type_${name}`}>
              Вы успешно зарегистрировались!
            </h2>
            {/* {props.history.push("/signin")} */}
          </>
        ) : (
          <>
            <img className="popup__icon" src={denied} />
            <h2 className={`popup__title  popup__title_type_${name}`}>
              Что-то пошло не так! Попробуйте ещё раз.
            </h2>
          </>
        )}
      </div>
    </div>
  );
}
export default InfoTooltip;
