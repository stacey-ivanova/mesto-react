class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.handleResponse);
  }

  changeUserInfo(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(this.handleResponse);
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this.handleResponse);
  }

  newCard(value) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(value),
    }).then(this.handleResponse);
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.handleResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.handleResponse);
  }

  disLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.handleResponse);
  }

  handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка");
  };
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "0c1a437a-6e52-4fdd-9796-28127f1dce6c",
    "Content-Type": "application/json",
  },
});
export default api;
