export default class Card {
  
  constructor(myId, dataForСard, template, {handleDelete}, {handleAddLikeClick}, {handleRemoveLikeClick}, {handleCardClick}) {
    this.handleDelete = handleDelete;
    this.handleAddLikeClick = handleAddLikeClick;
    this.handleRemoveLikeClick = handleRemoveLikeClick;
    this._handleCardClick = handleCardClick;
    this._dataForСard = dataForСard;
    this._template = template;
    this._myId = myId;
  }

  getCard() {
    this.contentTemplate = document.querySelector(`.${this._template}`).content;
    this._card = this.contentTemplate.querySelector('.element').cloneNode(true);
    this._deleteButton = this._card.querySelector('.element__delete');

    this._displayButtonDelete();

    this._setValuesCard();
    this._setEventListener();
    this._checkMyLike();

    return this._card;
  }

  _displayButtonDelete() {
    if(this._dataForСard.owner._id !== this._myId) {
      this._deleteButton.style.display = 'none';
  }

  }

  _setValuesCard() {
    this._card.querySelector('.element__title').textContent = this._dataForСard.name;
    this._card.querySelector('.element__like-quantity').textContent = this._dataForСard.likes.length;
    this._card.id = this._dataForСard._id;
    const elementImage = this._card.querySelector('.element__image');
    elementImage.src = this._dataForСard.link;
    elementImage.alt = this._dataForСard.name;
  }

  _setEventListener() {
    this._card.querySelector('.element__delete')
    .addEventListener('click', () => this.handleDelete(this._card));
    this._card.querySelector('.element__like')
    .addEventListener('click', () => this._handleLike(this._card));
    this._card.querySelector('.element__image')
    .addEventListener('click', (evt) => this._handleCardClick(evt));
  }

  deletCard() {
    this._card.remove();
    this._card = null;
  }

  _checkMyLike() {
    this._like = this._card.querySelector('.element__like');

    this._dataForСard.likes.forEach((elem) => {
      if(elem._id === this._myId) {
        this._like.classList.add('element__like_active');
      }
    })
  }

  addLikeAndQuantity(dataСard) {
    this._likeQuantity.textContent = dataСard.likes.length;
    this._like.classList.add('element__like_active');
  }

  removeLikeAndQuantity(dataСard) {
    this._likeQuantity.textContent = dataСard.likes.length;
    this._like.classList.remove('element__like_active');
  }

  _handleLike() {
    this._like = this._card.querySelector('.element__like');
    this._likeQuantity = this._card.querySelector('.element__like-quantity');

    if(!this._like.classList.contains('element__like_active')) {
      this.handleAddLikeClick(this._card);
    } else {
      this.handleRemoveLikeClick(this._card);

    }
  }
}