export default class Api {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  _getResponseServer(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getCardsInfo() {
    return fetch(`${this.url}/cards`, {
      headers: {
        'Content-type': 'application/json', 
        authorization: this.token
      }  
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
    .then((result) => {
      return result;
    })
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Content-type': 'application/json', 
        authorization: this.token
      }  
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
    .then((result) => {
      return result;
    })
  }

  editUserInfo(name, about) {

    return fetch( `${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })

    .then((res) => {
      return this._getResponseServer(res);
    })
    .then((result) => {
      return result;
    })
  }

  editAvatar(link) {

    return fetch( `${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      })
    })

    .then((res) => {
      return this._getResponseServer(res);
    })
    .then((result) => {
      return result;
    })
  }

  addCard(title, link) {

    return fetch( `${this.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        link: link
      })
    })

    .then((res) => {
      return this._getResponseServer(res);
    })
    .then((result) => {
      return result;
    })
  }

  deleteCard(cardId) {
    return fetch( `${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
        }
    })

    .then((res) => {
      return this._getResponseServer(res);
    })
    .then((result) => {
      return result;
    })
  }


  setLikeCard(cardId) {
    return fetch( `${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
        }
    })

    .then((res) => {
      return this._getResponseServer(res);
    })
    .then((result) => {
      return result;
    })
  }

  removeLikeCard(cardId) {
    return fetch( `${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
        }
    })

    .then((res) => {
      return this._getResponseServer(res);
    })
    .then((result) => {
      return result;
    })
  }

}