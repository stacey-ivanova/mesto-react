const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("Ошибка");
};

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(handleResponse);
  }

  changeUserInfo(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(handleResponse);
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(handleResponse);
  }

  newCard(value) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(value),
    }).then(handleResponse);
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(handleResponse);
  }

  disLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "0c1a437a-6e52-4fdd-9796-28127f1dce6c",
    "Content-Type": "application/json",
  },
});
export default api;
