export default class Card {

  _handleCardClick;
  _dataForСard;
  _template;
  
  constructor(dataForСard, template, {handleCardClick}) {
    this._handleCardClick = handleCardClick;
    this._dataForСard = dataForСard;
    this._template = template;
  }

  getCard() {
    this.contentTemplate = document.querySelector(`.${this._template}`).content;
    this.card = this.contentTemplate.querySelector('.element').cloneNode(true);

    this._setValuesCard();
    this._setEventListener();

    return this.card;
  }

  _setValuesCard() {
    this.card.querySelector('.element__title').textContent = this._dataForСard.name;
    this.card.querySelector('.element__image').src = this._dataForСard.link;
    this.card.querySelector('.element__image').alt = this._dataForСard.name;
  }

  _setEventListener() {
    this.card.querySelector('.element__delete')
    .addEventListener('click', () => this._deletCard());
    this.card.querySelector('.element__like')
    .addEventListener('click', () => this._getLikeCard());
    this.card.querySelector('.element__image')
    .addEventListener('click', (evt) => this._handleCardClick(evt));
  }

  _deletCard() {
    this.card.remove();
  }

  _getLikeCard() {
    this.card.querySelector('.element__like').classList.toggle('element__like_active');
  }

  // _openImagePopap() {
  //   popupPhotoElement.src = this.card.querySelector('.element__image').src;
  //   popupPhotoElement.alt = this.card.querySelector('.element__image').alt;
  //   popupPhotoTitle.textContent = this.card.querySelector('.element__image').alt;
  
  //   openPopup(popupPhotoContainer); 
  // }
}