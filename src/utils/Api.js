import { apiConfig } from "./constants.js";

class Api {
  constructor(apiConfig) {
    this._headers = apiConfig.headers;
    this._link = apiConfig.link;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  sendEditedUserData(data) {
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._checkResponse(res))
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  addCard(card) {
    return fetch(`${this._link}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => this._checkResponse(res))
  }

  getLikes() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then(res => this._checkResponse(res))
    }
    else {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
        .then(res => this._checkResponse(res))
    }
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }
}

export const api = new Api(apiConfig);