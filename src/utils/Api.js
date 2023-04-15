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

  //1. Загрузка информации о пользователе с сервера - ГОТОВО
  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  //3. Редактирование профиля -ГОТОВО
  sendEditedUserData(data) {
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.info
      })
    })
      .then(res => this._checkResponse(res))
  }

  //9. Обновление аватара пользователя
  updateAvatar({ avatar }) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => this._checkResponse(res))
  }

  //2. Загрузка карточек с сервера - ГОТОВО
  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }
  //4. Добавление новой карточки - ГОТОВО
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
  //5. Отображение количества лайков карточки
  getLikes() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }
  // Поставить лайк -ГОТОВО
  putLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }
  // Удалить лайк карточки -ГОТОВО
  deleteLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }
  //6. Попап удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }
}

export const api = new Api(apiConfig);