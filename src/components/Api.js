export default class Api {
  constructor(url, token) {
    this.url = url;
    this.token = token;

  }

  getUserInfo() {
    return fetch(this.url, {
      headers: {
        'Content-type': 'application/json', 
        authorization: this.token
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject('Ошбка');  
      }
    })
    .then((result) => {
      return result;
    })
  }

  getInfo() {
    return fetch(this.url, {
      headers: {
        'Content-type': 'application/json', 
        authorization: this.token
      }  
    })

    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject('Ошбка');  
      }
    })
    .then((result) => {
      return result;
    })
  }

  editUserInfo(name, about) {
  
    return fetch( this.url, {
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
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject('Ошбка');  
      }
    })
    .then((result) => {
      console.log(result)
      return result;
    })

  }

  addCard(title, link) {
  
    return fetch( this.url, {
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
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject('Ошбка');  
      }
    })
    .then((result) => {
      return result;
    })
  }

  deleteCard(cardId) {
    return fetch( `${this.url}${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
        }
    })

    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject('Ошбка');  
      }
    })
    .then((result) => {
      return result;
    })
  }


  setLikeCard(cardId) {
    return fetch( `${this.url}${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
        }
    })

    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject('Ошбка');  
      }
    })
    .then((result) => {
      return result;
    })
  }
  
  removeLikeCard(cardId) {
    return fetch( `${this.url}${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
        }
    })

    .then((res) => {
      if(res.ok) {
        return res.json()
      } else {
        return Promise.reject('Ошбка');  
      }
    })
    .then((result) => {
      return result;
    })
  }

}
