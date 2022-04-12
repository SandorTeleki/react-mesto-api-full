class Api {
    constructor({baseURL, headers}) {
      this._URL = baseURL;
      this._headers = headers;
    }
  
    _handleError(res, errorText) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${errorText}. Статус ошибки: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(this._URL + '/users/me', {
        method: 'GET', headers: this._headers,
      })
        .then((res) => {
          return this._handleError(res, 'Ошибка! Не удалось загрузить данные пользователя');
        });
    }
  
  
    getInitialCards() {
      return fetch(this._URL + '/cards', {
        method: 'GET', headers: this._headers,
      })
        .then(res => {
          return this._handleError(res, 'Ошибка! Не удалось загрузить карточки')
        });
    }
  
    editProfile({name, description}) {
      return fetch(this._URL + '/users/me', {
        method: 'PATCH', headers: this._headers, body: JSON.stringify({
          name: name, about: description
        })
      })
        .then(res => {
          return this._handleError(res, 'Ошибка! Не удалось загрузить профиль пользователя')
        });
    }
  
    updateUserAvatar(avatarLink) {
      return fetch(this._URL + '/users/me/avatar', {
        method: "PATCH", headers: this._headers, body: JSON.stringify({
          avatar: avatarLink
        })
      })
        .then(res => {
          return this._handleError(res, 'Ошибка! Не удалось загрузить новую аватарку пользователя')
        });
    }
  
    addNewCard({name, link}) {
      return fetch(this._URL + '/cards', {
        method: 'POST', headers: this._headers, body: JSON.stringify({
          name: name, link: link
        })
      })
        .then(res => {
          return this._handleError(res, 'Ошибка! Не удалось добавить карточку')
        });
    }
  
    deleteCard(cardId) {
      return fetch(this._URL + '/cards/' + cardId, {
        method: 'DELETE', headers: this._headers,
      })
        .then(res => {
          return this._handleError(res, 'Ошибка! Не удалось удалить карточку')
        });
    }
  
    likeCard(cardId) {
      return fetch(this._URL + '/cards/' + cardId + '/likes/', {
        method: 'PUT', headers: this._headers,
      })
        .then(res => {
          return this._handleError(res, 'Ошибка! Не удалось поставить лайк карточке')
        });
    }
  
    dislikeCard(cardId) {
      return fetch(this._URL + '/cards/' + cardId + '/likes/', {
        method: 'DELETE', headers: this._headers,
      })
        .then(res => {
          return this._handleError(res, 'Ошибка! Не удалось удалить лайк карточки')
        });
    }
  }

export const api = new Api ({
    baseURL: 'https://mesto.nomoreparties.co/v1/cohort-31',
    headers: {
        authorization: '740b2dd9-b0c6-4001-a722-b6687d6e9ed0',
        'Content-Type': 'application/json'
    }
});